/*
===================================================
   Script para crear la bbdd 'shadow_donaton_db'
===================================================

Esta bbdd debe crearse manualmente y, dado que no se hara
con el usuario 'root', sino que con 'donaton', a este ultimo
se le deben otorgar permisos para crear, modificar y eliminar
bases de datos (principalmente, la de crear o 'CREATE').
*/

-- Crear la base de datos 'shadow_donaton_db'
CREATE DATABASE IF NOT EXISTS shadow_donaton_db;

-- Se otorgan los permisos para crear, modificar, eliminar y
-- hacer referencias en todos objetos a usuario 'donaton' de cualquier host
-- Sintaxis:
--   GRANT [privilegios] ON db_name.table_name TO 'username'@'host';
GRANT CREATE, ALTER, DROP, REFERENCES ON *.* TO 'donaton'@'%';

-- Se aplica la modificacion de privilegios
FLUSH PRIVILEGES;

