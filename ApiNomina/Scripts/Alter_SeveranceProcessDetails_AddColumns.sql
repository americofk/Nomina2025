-- =============================================================================
-- Script: Agregar columnas faltantes a SeveranceProcessDetails
-- Fecha: 2025-12-01
-- Descripción: Agrega las columnas que faltan en la tabla SeveranceProcessDetails
--              si la tabla ya existe
-- =============================================================================

-- Verificar si la tabla existe
IF EXISTS (SELECT * FROM sys.tables WHERE name = 'SeveranceProcessDetails')
BEGIN
    PRINT 'Tabla SeveranceProcessDetails encontrada. Verificando columnas...';

    -- Agregar InternalId si no existe
    IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('SeveranceProcessDetails') AND name = 'InternalId')
    BEGIN
        ALTER TABLE [dbo].[SeveranceProcessDetails] ADD [InternalId] int NOT NULL IDENTITY(1,1);
        PRINT 'Columna InternalId agregada.';
    END
    ELSE
        PRINT 'Columna InternalId ya existe.';

    -- Agregar YearsWorked si no existe
    IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('SeveranceProcessDetails') AND name = 'YearsWorked')
    BEGIN
        ALTER TABLE [dbo].[SeveranceProcessDetails] ADD [YearsWorked] int NOT NULL DEFAULT 0;
        PRINT 'Columna YearsWorked agregada.';
    END
    ELSE
        PRINT 'Columna YearsWorked ya existe.';

    -- Agregar MonthsWorked si no existe
    IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('SeveranceProcessDetails') AND name = 'MonthsWorked')
    BEGIN
        ALTER TABLE [dbo].[SeveranceProcessDetails] ADD [MonthsWorked] int NOT NULL DEFAULT 0;
        PRINT 'Columna MonthsWorked agregada.';
    END
    ELSE
        PRINT 'Columna MonthsWorked ya existe.';

    -- Agregar DaysWorked si no existe
    IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('SeveranceProcessDetails') AND name = 'DaysWorked')
    BEGIN
        ALTER TABLE [dbo].[SeveranceProcessDetails] ADD [DaysWorked] int NOT NULL DEFAULT 0;
        PRINT 'Columna DaysWorked agregada.';
    END
    ELSE
        PRINT 'Columna DaysWorked ya existe.';

    -- Agregar DiasPreaviso si no existe
    IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('SeveranceProcessDetails') AND name = 'DiasPreaviso')
    BEGIN
        ALTER TABLE [dbo].[SeveranceProcessDetails] ADD [DiasPreaviso] int NOT NULL DEFAULT 0;
        PRINT 'Columna DiasPreaviso agregada.';
    END
    ELSE
        PRINT 'Columna DiasPreaviso ya existe.';

    -- Agregar DiasCesantia si no existe
    IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('SeveranceProcessDetails') AND name = 'DiasCesantia')
    BEGIN
        ALTER TABLE [dbo].[SeveranceProcessDetails] ADD [DiasCesantia] int NOT NULL DEFAULT 0;
        PRINT 'Columna DiasCesantia agregada.';
    END
    ELSE
        PRINT 'Columna DiasCesantia ya existe.';

    -- Agregar MesesTrabajadosAnio si no existe
    IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('SeveranceProcessDetails') AND name = 'MesesTrabajadosAnio')
    BEGIN
        ALTER TABLE [dbo].[SeveranceProcessDetails] ADD [MesesTrabajadosAnio] int NOT NULL DEFAULT 0;
        PRINT 'Columna MesesTrabajadosAnio agregada.';
    END
    ELSE
        PRINT 'Columna MesesTrabajadosAnio ya existe.';

    PRINT '=============================================================';
    PRINT 'Verificacion de columnas completada.';
    PRINT '=============================================================';
END
ELSE
BEGIN
    PRINT 'La tabla SeveranceProcessDetails no existe. Ejecute primero Migration_SeveranceProcess.sql';
END
GO

-- Verificar estructura final de la tabla
SELECT
    c.name AS ColumnName,
    t.name AS DataType,
    c.max_length AS MaxLength,
    c.is_nullable AS IsNullable,
    dc.definition AS DefaultValue
FROM sys.columns c
INNER JOIN sys.types t ON c.user_type_id = t.user_type_id
LEFT JOIN sys.default_constraints dc ON c.default_object_id = dc.object_id
WHERE c.object_id = OBJECT_ID('SeveranceProcessDetails')
ORDER BY c.column_id;
GO
