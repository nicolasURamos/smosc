-- Add database-level constraints for input validation
-- Ensures data integrity even if client-side validation is bypassed

ALTER TABLE public.profiles 
ADD CONSTRAINT full_name_length CHECK (length(full_name) > 0 AND length(full_name) <= 100),
ADD CONSTRAINT company_length CHECK (length(company) > 0 AND length(company) <= 100),
ADD CONSTRAINT position_length CHECK (length(position) > 0 AND length(position) <= 100);