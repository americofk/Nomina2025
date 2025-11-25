-- Script para aplicar cambios de auditoría faltantes
USE [DC365_PayrollDataApp];
GO

BEGIN TRANSACTION;
PRINT 'Aplicando cambios de auditoría faltantes...';

-- PASO 1: Crear SEQUENCE RecId si no existe
IF NOT EXISTS (SELECT * FROM sys.sequences WHERE name = 'RecId')
BEGIN
    CREATE SEQUENCE [dbo].[RecId]
        START WITH 20260100
        INCREMENT BY 1
        MINVALUE 20260100
        NO MAXVALUE
        NO CYCLE
        CACHE 50;
    PRINT 'SEQUENCE RecId creado.';
END
ELSE
BEGIN
    PRINT 'SEQUENCE RecId ya existe.';
END

-- PASO 2: Crear tabla AuditLogs si no existe
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'AuditLogs')
BEGIN
    CREATE TABLE [AuditLogs] (
        [RecId] bigint NOT NULL DEFAULT (NEXT VALUE FOR dbo.RecId),
        [EntityName] nvarchar(100) NOT NULL,
        [FieldName] nvarchar(100) NOT NULL,
        [OldValue] nvarchar(max) NULL,
        [NewValue] nvarchar(max) NULL,
        [ChangedBy] nvarchar(50) NOT NULL,
        [ChangedAt] datetime2 NOT NULL DEFAULT (GETDATE()),
        [EntityRefRecId] bigint NOT NULL,
        [CreatedBy] nvarchar(20) NULL,
        [CreatedOn] datetime2 NOT NULL,
        [ModifiedBy] nvarchar(20) NULL,
        [ModifiedOn] datetime2 NOT NULL,
        [IsDeleted] bit NOT NULL,
        [DeletedBy] nvarchar(20) NULL,
        [DeletedOn] datetime2 NULL,
        [DataAreaId] nvarchar(10) NOT NULL,
        CONSTRAINT [PK_AuditLogs] PRIMARY KEY ([RecId])
    );

    -- Crear índices para AuditLogs
    CREATE INDEX [IX_AuditLog_ChangedAt] ON [AuditLogs]([ChangedAt]);
    CREATE INDEX [IX_AuditLog_ChangedBy] ON [AuditLogs]([ChangedBy]);
    CREATE INDEX [IX_AuditLog_DataAreaId] ON [AuditLogs]([DataAreaId]);
    CREATE INDEX [IX_AuditLog_EntityName_EntityRefRecId] ON [AuditLogs]([EntityName], [EntityRefRecId]);

    PRINT 'Tabla AuditLogs creada con índices.';
END
ELSE
BEGIN
    PRINT 'Tabla AuditLogs ya existe.';
END

-- PASO 3: Agregar columnas de auditoría a todas las tablas que heredan de AuditableEntity o AuditableCompanyEntity
DECLARE @sql NVARCHAR(MAX);
DECLARE @tableName NVARCHAR(128);
DECLARE @columnName NVARCHAR(128);

-- Lista de tablas que necesitan las nuevas columnas (todas las que tienen CreatedBy/CreatedOn)
DECLARE tablesCursor CURSOR FOR
SELECT DISTINCT TABLE_NAME
FROM INFORMATION_SCHEMA.COLUMNS
WHERE COLUMN_NAME = 'CreatedBy'
  AND TABLE_NAME != 'AuditLogs';

OPEN tablesCursor;
FETCH NEXT FROM tablesCursor INTO @tableName;

WHILE @@FETCH_STATUS = 0
BEGIN
    -- Agregar RecId si no existe
    IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = @tableName AND COLUMN_NAME = 'RecId')
    BEGIN
        SET @sql = 'ALTER TABLE [' + @tableName + '] ADD [RecId] bigint NOT NULL DEFAULT 0;';
        EXEC sp_executesql @sql;
        PRINT @tableName + ': Columna RecId agregada';
    END

    -- Agregar IsDeleted si no existe
    IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = @tableName AND COLUMN_NAME = 'IsDeleted')
    BEGIN
        SET @sql = 'ALTER TABLE [' + @tableName + '] ADD [IsDeleted] bit NOT NULL DEFAULT 0;';
        EXEC sp_executesql @sql;
        PRINT @tableName + ': Columna IsDeleted agregada';
    END

    -- Agregar DeletedBy si no existe
    IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = @tableName AND COLUMN_NAME = 'DeletedBy')
    BEGIN
        SET @sql = 'ALTER TABLE [' + @tableName + '] ADD [DeletedBy] nvarchar(20) NULL;';
        EXEC sp_executesql @sql;
        PRINT @tableName + ': Columna DeletedBy agregada';
    END

    -- Agregar DeletedOn si no existe
    IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = @tableName AND COLUMN_NAME = 'DeletedOn')
    BEGIN
        SET @sql = 'ALTER TABLE [' + @tableName + '] ADD [DeletedOn] datetime2 NULL;';
        EXEC sp_executesql @sql;
        PRINT @tableName + ': Columna DeletedOn agregada';
    END

    -- Modificar CreatedBy y ModifiedBy a nvarchar(20) si es necesario
    SET @sql = 'ALTER TABLE [' + @tableName + '] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;';
    EXEC sp_executesql @sql;

    SET @sql = 'ALTER TABLE [' + @tableName + '] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;';
    EXEC sp_executesql @sql;

    FETCH NEXT FROM tablesCursor INTO @tableName;
END

CLOSE tablesCursor;
DEALLOCATE tablesCursor;

PRINT 'Columnas de auditoría agregadas a todas las tablas.';

COMMIT TRANSACTION;
PRINT 'Cambios de auditoría aplicados exitosamente!';
GO
