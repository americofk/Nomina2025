-- Script para agregar campo IsSeverance a EarningCodes
-- Este campo indica si el código de ganancia aplica para el cálculo de prestaciones laborales
-- Fecha: 2025
-- Autor: Equipo de Desarrollo

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[EarningCodes]') AND name = 'IsSeverance')
BEGIN
    ALTER TABLE [dbo].[EarningCodes] ADD [IsSeverance] BIT NOT NULL DEFAULT 0;
    PRINT 'Columna IsSeverance agregada correctamente a EarningCodes.';
END
ELSE
BEGIN
    PRINT 'La columna IsSeverance ya existe en EarningCodes.';
END
GO
