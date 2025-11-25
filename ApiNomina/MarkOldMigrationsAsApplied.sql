-- Script para marcar migraciones antiguas como aplicadas
-- Ejecutar ANTES de aplicar las migraciones de auditoría

USE [DC365_PayrollDataApp];
GO

-- Marcar migración des-48 como aplicada sin ejecutarla
IF NOT EXISTS (SELECT 1 FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210827192330_des-48')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210827192330_des-48', N'9.0.2');

    PRINT 'Migración des-48 marcada como aplicada.';
END
ELSE
BEGIN
    PRINT 'Migración des-48 ya estaba aplicada.';
END
GO

-- Verificar migraciones pendientes
SELECT 'Migraciones aplicadas:' AS Estado, COUNT(*) AS Total
FROM [__EFMigrationsHistory];
GO
