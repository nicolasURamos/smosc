-- 1. Criar tipos enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user', 'manager');
CREATE TYPE public.exam_status AS ENUM ('pending', 'scheduled', 'completed', 'cancelled');
CREATE TYPE public.training_status AS ENUM ('not_started', 'in_progress', 'completed', 'expired');
CREATE TYPE public.epi_status AS ENUM ('active', 'expired', 'pending_signature');
CREATE TYPE public.appointment_status AS ENUM ('scheduled', 'confirmed', 'completed', 'cancelled');

-- 2. Tabela de perfis (profiles)
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    company TEXT NOT NULL,
    position TEXT NOT NULL,
    cpf TEXT UNIQUE NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Tabela de roles (SEPARADA - requisito de segurança)
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    UNIQUE(user_id, role)
);

-- 4. Tabela de exames
CREATE TABLE public.exams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    status exam_status NOT NULL DEFAULT 'pending',
    scheduled_date TIMESTAMPTZ,
    result_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Tabela de treinamentos
CREATE TABLE public.trainings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    status training_status NOT NULL DEFAULT 'not_started',
    duration INTEGER NOT NULL,
    due_date TIMESTAMPTZ NOT NULL,
    scheduled_time TIME,
    certificate_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Tabela de EPIs
CREATE TABLE public.epis (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    status epi_status NOT NULL DEFAULT 'pending_signature',
    issue_date TIMESTAMPTZ NOT NULL,
    expiry_date TIMESTAMPTZ NOT NULL,
    term_url TEXT,
    signature_url TEXT,
    signed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Tabela de agendamentos
CREATE TABLE public.appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    scheduled_date TIMESTAMPTZ NOT NULL,
    location TEXT,
    status appointment_status NOT NULL DEFAULT 'scheduled',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Tabela de procedimentos
CREATE TABLE public.procedures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    version TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'active',
    effective_date TIMESTAMPTZ NOT NULL,
    review_date TIMESTAMPTZ,
    description TEXT,
    document_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Tabela de notificações
CREATE TABLE public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL,
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Tabela de horários disponíveis (telemedicina)
CREATE TABLE public.telemedicine_slots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE NOT NULL,
    time TIME NOT NULL,
    available BOOLEAN DEFAULT TRUE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(date, time)
);

-- Enable RLS em todas as tabelas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trainings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.epis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.procedures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.telemedicine_slots ENABLE ROW LEVEL SECURITY;

-- Função de segurança para verificar roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS para profiles (usuário vê apenas seu perfil)
CREATE POLICY "Users can view own profile"
ON public.profiles FOR SELECT
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id);

-- RLS para exams (usuário vê apenas seus exames)
CREATE POLICY "Users can view own exams"
ON public.exams FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own exams"
ON public.exams FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- RLS para trainings (usuário vê apenas seus treinamentos)
CREATE POLICY "Users can view own trainings"
ON public.trainings FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- RLS para EPIs (usuário vê apenas seus EPIs)
CREATE POLICY "Users can view own epis"
ON public.epis FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can update own epis"
ON public.epis FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- RLS para appointments (usuário vê apenas seus agendamentos)
CREATE POLICY "Users can view own appointments"
ON public.appointments FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own appointments"
ON public.appointments FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- RLS para procedures (todos podem ler, apenas admin pode modificar)
CREATE POLICY "Everyone can view procedures"
ON public.procedures FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Only admins can modify procedures"
ON public.procedures FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- RLS para notifications (usuário vê apenas suas notificações)
CREATE POLICY "Users can view own notifications"
ON public.notifications FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications"
ON public.notifications FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- RLS para telemedicine_slots (todos podem ver, apenas disponíveis podem ser reservados)
CREATE POLICY "Everyone can view telemedicine slots"
ON public.telemedicine_slots FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Users can book available slots"
ON public.telemedicine_slots FOR UPDATE
TO authenticated
USING (available = true);

-- Função para criar perfil automaticamente
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE PLPGSQL
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, company, position, cpf)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'company',
    NEW.raw_user_meta_data->>'position',
    NEW.raw_user_meta_data->>'cpf'
  );
  
  -- Adicionar role padrão de 'user'
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$;

-- Trigger para executar a função
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Trigger para atualizar updated_at em profiles
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE PLPGSQL
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();