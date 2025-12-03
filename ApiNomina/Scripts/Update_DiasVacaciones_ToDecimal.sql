-- Script para cambiar DiasVacaciones de INT a DECIMAL
-- Fecha: 2025-12-02

-- Verificar el tipo actual
SELECT COLUMN_NAME, DATA_TYPE, NUMERIC_PRECISION, NUMERIC_SCALE
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'SeveranceProcessDetails' AND COLUMN_NAME = 'DiasVacaciones';

-- Modificar la columna
ALTER TABLE SeveranceProcessDetails
ALTER COLUMN DiasVacaciones DECIMAL(18,2) NOT NULL;

-- Establecer valor por defecto
ALTER TABLE SeveranceProcessDetails
ADD CONSTRAINT DF_SeveranceProcessDetails_DiasVacaciones DEFAULT 0 FOR DiasVacaciones;

-- Verificar el cambio
SELECT COLUMN_NAME, DATA_TYPE, NUMERIC_PRECISION, NUMERIC_SCALE
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'SeveranceProcessDetails' AND COLUMN_NAME = 'DiasVacaciones';

PRINT 'Columna DiasVacaciones actualizada a DECIMAL(18,2)';
