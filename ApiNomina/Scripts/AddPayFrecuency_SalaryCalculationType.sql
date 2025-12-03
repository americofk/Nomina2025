-- Script para agregar campos PayFrecuency y SalaryCalculationType a SeveranceProcessDetails
-- Fecha: 2025
-- Autor: Equipo de Desarrollo

-- Agregar columna PayFrecuency
IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[SeveranceProcessDetails]') AND name = 'PayFrecuency')
BEGIN
    ALTER TABLE [dbo].[SeveranceProcessDetails] ADD [PayFrecuency] INT NOT NULL DEFAULT -1;
END
GO

-- Agregar columna SalaryCalculationType
IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[SeveranceProcessDetails]') AND name = 'SalaryCalculationType')
BEGIN
    ALTER TABLE [dbo].[SeveranceProcessDetails] ADD [SalaryCalculationType] INT NOT NULL DEFAULT -1;
END
GO

PRINT 'Columnas PayFrecuency y SalaryCalculationType agregadas correctamente.';
