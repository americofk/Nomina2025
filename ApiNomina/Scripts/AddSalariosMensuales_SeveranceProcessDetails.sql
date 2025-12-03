-- Script para agregar campos de salarios y comisiones mensuales a SeveranceProcessDetails
-- Fecha: 2025
-- Autor: Equipo de Desarrollo

-- Agregar columnas de Salarios mensuales
IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[SeveranceProcessDetails]') AND name = 'SalarioMes1')
BEGIN
    ALTER TABLE [dbo].[SeveranceProcessDetails] ADD [SalarioMes1] DECIMAL(18,2) NOT NULL DEFAULT 0;
END
GO

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[SeveranceProcessDetails]') AND name = 'SalarioMes2')
BEGIN
    ALTER TABLE [dbo].[SeveranceProcessDetails] ADD [SalarioMes2] DECIMAL(18,2) NOT NULL DEFAULT 0;
END
GO

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[SeveranceProcessDetails]') AND name = 'SalarioMes3')
BEGIN
    ALTER TABLE [dbo].[SeveranceProcessDetails] ADD [SalarioMes3] DECIMAL(18,2) NOT NULL DEFAULT 0;
END
GO

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[SeveranceProcessDetails]') AND name = 'SalarioMes4')
BEGIN
    ALTER TABLE [dbo].[SeveranceProcessDetails] ADD [SalarioMes4] DECIMAL(18,2) NOT NULL DEFAULT 0;
END
GO

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[SeveranceProcessDetails]') AND name = 'SalarioMes5')
BEGIN
    ALTER TABLE [dbo].[SeveranceProcessDetails] ADD [SalarioMes5] DECIMAL(18,2) NOT NULL DEFAULT 0;
END
GO

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[SeveranceProcessDetails]') AND name = 'SalarioMes6')
BEGIN
    ALTER TABLE [dbo].[SeveranceProcessDetails] ADD [SalarioMes6] DECIMAL(18,2) NOT NULL DEFAULT 0;
END
GO

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[SeveranceProcessDetails]') AND name = 'SalarioMes7')
BEGIN
    ALTER TABLE [dbo].[SeveranceProcessDetails] ADD [SalarioMes7] DECIMAL(18,2) NOT NULL DEFAULT 0;
END
GO

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[SeveranceProcessDetails]') AND name = 'SalarioMes8')
BEGIN
    ALTER TABLE [dbo].[SeveranceProcessDetails] ADD [SalarioMes8] DECIMAL(18,2) NOT NULL DEFAULT 0;
END
GO

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[SeveranceProcessDetails]') AND name = 'SalarioMes9')
BEGIN
    ALTER TABLE [dbo].[SeveranceProcessDetails] ADD [SalarioMes9] DECIMAL(18,2) NOT NULL DEFAULT 0;
END
GO

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[SeveranceProcessDetails]') AND name = 'SalarioMes10')
BEGIN
    ALTER TABLE [dbo].[SeveranceProcessDetails] ADD [SalarioMes10] DECIMAL(18,2) NOT NULL DEFAULT 0;
END
GO

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[SeveranceProcessDetails]') AND name = 'SalarioMes11')
BEGIN
    ALTER TABLE [dbo].[SeveranceProcessDetails] ADD [SalarioMes11] DECIMAL(18,2) NOT NULL DEFAULT 0;
END
GO

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[SeveranceProcessDetails]') AND name = 'SalarioMes12')
BEGIN
    ALTER TABLE [dbo].[SeveranceProcessDetails] ADD [SalarioMes12] DECIMAL(18,2) NOT NULL DEFAULT 0;
END
GO

-- Agregar columnas de Comisiones mensuales
IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[SeveranceProcessDetails]') AND name = 'ComisionMes1')
BEGIN
    ALTER TABLE [dbo].[SeveranceProcessDetails] ADD [ComisionMes1] DECIMAL(18,2) NOT NULL DEFAULT 0;
END
GO

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[SeveranceProcessDetails]') AND name = 'ComisionMes2')
BEGIN
    ALTER TABLE [dbo].[SeveranceProcessDetails] ADD [ComisionMes2] DECIMAL(18,2) NOT NULL DEFAULT 0;
END
GO

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[SeveranceProcessDetails]') AND name = 'ComisionMes3')
BEGIN
    ALTER TABLE [dbo].[SeveranceProcessDetails] ADD [ComisionMes3] DECIMAL(18,2) NOT NULL DEFAULT 0;
END
GO

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[SeveranceProcessDetails]') AND name = 'ComisionMes4')
BEGIN
    ALTER TABLE [dbo].[SeveranceProcessDetails] ADD [ComisionMes4] DECIMAL(18,2) NOT NULL DEFAULT 0;
END
GO

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[SeveranceProcessDetails]') AND name = 'ComisionMes5')
BEGIN
    ALTER TABLE [dbo].[SeveranceProcessDetails] ADD [ComisionMes5] DECIMAL(18,2) NOT NULL DEFAULT 0;
END
GO

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[SeveranceProcessDetails]') AND name = 'ComisionMes6')
BEGIN
    ALTER TABLE [dbo].[SeveranceProcessDetails] ADD [ComisionMes6] DECIMAL(18,2) NOT NULL DEFAULT 0;
END
GO

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[SeveranceProcessDetails]') AND name = 'ComisionMes7')
BEGIN
    ALTER TABLE [dbo].[SeveranceProcessDetails] ADD [ComisionMes7] DECIMAL(18,2) NOT NULL DEFAULT 0;
END
GO

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[SeveranceProcessDetails]') AND name = 'ComisionMes8')
BEGIN
    ALTER TABLE [dbo].[SeveranceProcessDetails] ADD [ComisionMes8] DECIMAL(18,2) NOT NULL DEFAULT 0;
END
GO

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[SeveranceProcessDetails]') AND name = 'ComisionMes9')
BEGIN
    ALTER TABLE [dbo].[SeveranceProcessDetails] ADD [ComisionMes9] DECIMAL(18,2) NOT NULL DEFAULT 0;
END
GO

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[SeveranceProcessDetails]') AND name = 'ComisionMes10')
BEGIN
    ALTER TABLE [dbo].[SeveranceProcessDetails] ADD [ComisionMes10] DECIMAL(18,2) NOT NULL DEFAULT 0;
END
GO

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[SeveranceProcessDetails]') AND name = 'ComisionMes11')
BEGIN
    ALTER TABLE [dbo].[SeveranceProcessDetails] ADD [ComisionMes11] DECIMAL(18,2) NOT NULL DEFAULT 0;
END
GO

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[SeveranceProcessDetails]') AND name = 'ComisionMes12')
BEGIN
    ALTER TABLE [dbo].[SeveranceProcessDetails] ADD [ComisionMes12] DECIMAL(18,2) NOT NULL DEFAULT 0;
END
GO

PRINT 'Columnas de salarios y comisiones mensuales agregadas correctamente.';
