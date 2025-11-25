-- Script de migración manual para preservar datos durante la transición InCompany -> DataAreaId
USE [DC365_PayrollDataApp];
GO

BEGIN TRANSACTION;

PRINT 'Iniciando migración manual de auditoría...';

-- PASO 1: Renombrar InCompany a DataAreaId en lugar de eliminar/agregar
-- Esto preserva los datos existentes

-- Para tabla Taxes
IF EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Taxes' AND COLUMN_NAME = 'InCompany')
BEGIN
    EXEC sp_rename 'Taxes.InCompany', 'DataAreaId', 'COLUMN';
    PRINT 'Taxes.InCompany renombrado a DataAreaId';
END

-- Para tabla TaxDetails
IF EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'TaxDetails' AND COLUMN_NAME = 'InCompany')
BEGIN
    EXEC sp_rename 'TaxDetails.InCompany', 'DataAreaId', 'COLUMN';
    PRINT 'TaxDetails.InCompany renombrado a DataAreaId';
END

-- Renombrar para todas las demás tablas que tienen InCompany
DECLARE @sql NVARCHAR(MAX);
DECLARE @tableName NVARCHAR(128);

DECLARE tableCursor CURSOR FOR
SELECT DISTINCT TABLE_NAME
FROM INFORMATION_SCHEMA.COLUMNS
WHERE COLUMN_NAME = 'InCompany'
  AND TABLE_NAME NOT IN ('Taxes', 'TaxDetails');

OPEN tableCursor;
FETCH NEXT FROM tableCursor INTO @tableName;

WHILE @@FETCH_STATUS = 0
BEGIN
    SET @sql = 'EXEC sp_rename ''' + @tableName + '.InCompany'', ''DataAreaId'', ''COLUMN'';';
    EXEC sp_executesql @sql;
    PRINT @tableName + '.InCompany renombrado a DataAreaId';

    FETCH NEXT FROM tableCursor INTO @tableName;
END

CLOSE tableCursor;
DEALLOCATE tableCursor;

PRINT 'Todos los campos InCompany renombrados a DataAreaId.';

-- PASO 2: Renombrar CreatedDateTime y ModifiedDateTime
PRINT 'Renombrando campos de auditoría...';

DECLARE @auditTable NVARCHAR(128);
DECLARE auditCursor CURSOR FOR
SELECT DISTINCT TABLE_NAME
FROM INFORMATION_SCHEMA.COLUMNS
WHERE COLUMN_NAME IN ('CreatedDateTime', 'ModifiedDateTime');

OPEN auditCursor;
FETCH NEXT FROM auditCursor INTO @auditTable;

WHILE @@FETCH_STATUS = 0
BEGIN
    IF EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = @auditTable AND COLUMN_NAME = 'CreatedDateTime')
    BEGIN
        SET @sql = 'EXEC sp_rename ''' + @auditTable + '.CreatedDateTime'', ''CreatedOn'', ''COLUMN'';';
        EXEC sp_executesql @sql;
    END

    IF EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = @auditTable AND COLUMN_NAME = 'ModifiedDateTime')
    BEGIN
        SET @sql = 'EXEC sp_rename ''' + @auditTable + '.ModifiedDateTime'', ''ModifiedOn'', ''COLUMN'';';
        EXEC sp_executesql @sql;
    END

    PRINT @auditTable + ': Campos de auditoría renombrados';

    FETCH NEXT FROM auditCursor INTO @auditTable;
END

CLOSE auditCursor;
DEALLOCATE auditCursor;

PRINT 'Campos de auditoría renombrados completados.';

-- PASO 3: Marcar las migraciones como aplicadas
INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20251125000000_AddRecIdSequence', N'9.0.2');

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20251125215507_AuditSystem_ISO27001', N'9.0.2');

PRINT 'Migraciones marcadas como aplicadas en __EFMigrationsHistory';

COMMIT TRANSACTION;
PRINT 'Migración manual completada exitosamente!';
GO
