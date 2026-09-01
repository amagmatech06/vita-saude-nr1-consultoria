-- Pergunta qualificatoria do formulario: porte da empresa.
-- Rodar no SQL Editor do Supabase ANTES de publicar a versao com o campo novo:
-- sem a coluna, o insert falha e o lead so chega pelo e-mail de alerta.
alter table public.leads
  add column if not exists colaboradores text;
