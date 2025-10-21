-- Criar buckets para armazenamento de arquivos
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('certificates', 'certificates', false),
  ('exam-results', 'exam-results', false),
  ('epi-terms', 'epi-terms', false),
  ('epi-signatures', 'epi-signatures', false),
  ('procedures', 'procedures', true)
ON CONFLICT (id) DO NOTHING;

-- Políticas de acesso para certificates
CREATE POLICY "Users can view own certificates"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'certificates' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Users can upload own certificates"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'certificates' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Políticas de acesso para exam-results
CREATE POLICY "Users can view own exam results"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'exam-results' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Users can upload own exam results"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'exam-results' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Políticas de acesso para epi-terms
CREATE POLICY "Users can view own epi terms"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'epi-terms' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Políticas de acesso para epi-signatures
CREATE POLICY "Users can view own epi signatures"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'epi-signatures' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Users can upload own epi signatures"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'epi-signatures' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Políticas de acesso para procedures (público para leitura)
CREATE POLICY "Everyone can view procedures"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'procedures');

CREATE POLICY "Only admins can upload procedures"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'procedures' AND public.has_role(auth.uid(), 'admin'));