-- Fix Issue #1: Telemedicine appointment hijacking vulnerability
-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Users can book available slots" ON telemedicine_slots;

-- Create separate policies for booking and canceling
CREATE POLICY "Users can book unassigned slots" ON telemedicine_slots
FOR UPDATE
USING (available = true AND user_id IS NULL)
WITH CHECK (available = false AND user_id = auth.uid());

CREATE POLICY "Users can cancel own bookings" ON telemedicine_slots
FOR UPDATE
USING (user_id = auth.uid())
WITH CHECK (available = true AND user_id IS NULL);

-- Fix Issue #2: CPF plaintext storage (LGPD compliance)
-- Add hashed CPF column and hash existing data
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS cpf_hash text;

-- Hash all existing CPF values
UPDATE profiles 
SET cpf_hash = encode(digest(cpf, 'sha256'), 'hex')
WHERE cpf_hash IS NULL;

-- Make cpf_hash not null after data migration
ALTER TABLE profiles ALTER COLUMN cpf_hash SET NOT NULL;

-- Drop the plaintext CPF column
ALTER TABLE profiles DROP COLUMN cpf;

-- Create index on cpf_hash for efficient lookups
CREATE INDEX IF NOT EXISTS idx_profiles_cpf_hash ON profiles(cpf_hash);