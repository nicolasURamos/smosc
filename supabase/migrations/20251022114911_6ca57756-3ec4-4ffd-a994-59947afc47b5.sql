-- Update the trigger function to use cpf_hash instead of cpf
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (id, full_name, company, position, cpf_hash)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'company',
    NEW.raw_user_meta_data->>'position',
    NEW.raw_user_meta_data->>'cpf_hash'
  );
  
  -- Adicionar role padrão de 'user'
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$function$;