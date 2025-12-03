-- =============================================================================
-- Script: Eliminar y recrear tablas de Prestaciones Laborales
-- Fecha: 2025-12-01
-- Descripción: Elimina las tablas existentes y las recrea con la estructura correcta
-- ADVERTENCIA: Este script BORRA TODOS LOS DATOS de las tablas de prestaciones
-- =============================================================================

PRINT '=============================================================';
PRINT 'INICIANDO PROCESO DE RECREACION DE TABLAS';
PRINT '=============================================================';

-- ============================================
-- PASO 1: Eliminar tablas existentes
-- ============================================

-- Primero eliminar la tabla de detalles (tiene FK)
IF EXISTS (SELECT * FROM sys.tables WHERE name = 'SeveranceProcessDetails')
BEGIN
    DROP TABLE [dbo].[SeveranceProcessDetails];
    PRINT 'Tabla SeveranceProcessDetails eliminada.';
END
ELSE
    PRINT 'Tabla SeveranceProcessDetails no existe.';

-- Luego eliminar la tabla principal
IF EXISTS (SELECT * FROM sys.tables WHERE name = 'SeveranceProcesses')
BEGIN
    DROP TABLE [dbo].[SeveranceProcesses];
    PRINT 'Tabla SeveranceProcesses eliminada.';
END
ELSE
    PRINT 'Tabla SeveranceProcesses no existe.';

GO

-- ============================================
-- PASO 2: Crear/Reiniciar secuencias
-- ============================================

-- Secuencia para SeveranceProcessId
IF EXISTS (SELECT * FROM sys.sequences WHERE name = 'SeveranceProcessId')
BEGIN
    DROP SEQUENCE [dbo].[SeveranceProcessId];
    PRINT 'Secuencia SeveranceProcessId eliminada.';
END

CREATE SEQUENCE [dbo].[SeveranceProcessId]
    AS bigint
    START WITH 1
    INCREMENT BY 1
    MINVALUE 1
    NO MAXVALUE
    NO CACHE;
PRINT 'Secuencia SeveranceProcessId creada.';

-- Secuencia para SeveranceProcessDetailId
IF EXISTS (SELECT * FROM sys.sequences WHERE name = 'SeveranceProcessDetailId')
BEGIN
    DROP SEQUENCE [dbo].[SeveranceProcessDetailId];
    PRINT 'Secuencia SeveranceProcessDetailId eliminada.';
END

CREATE SEQUENCE [dbo].[SeveranceProcessDetailId]
    AS bigint
    START WITH 1
    INCREMENT BY 1
    MINVALUE 1
    NO MAXVALUE
    NO CACHE;
PRINT 'Secuencia SeveranceProcessDetailId creada.';

GO

-- ============================================
-- PASO 3: Crear tabla SeveranceProcesses
-- ============================================

CREATE TABLE [dbo].[SeveranceProcesses] (
    -- Clave primaria con formato PRES-000000001
    [SeveranceProcessId] nvarchar(20) NOT NULL DEFAULT (FORMAT((NEXT VALUE FOR dbo.SeveranceProcessId),'PRES-00000000#')),

    -- RecId autoincremental para auditoría
    [RecId] bigint IDENTITY(1,1) NOT NULL,

    -- Multi-tenancy
    [DataAreaId] nvarchar(10) NOT NULL,

    -- Campos del proceso
    [ProcessDate] datetime2 NOT NULL,
    [Description] nvarchar(500) NULL,
    [EmployeeQuantity] int NOT NULL DEFAULT 0,

    -- Totales por concepto
    [TotalPreaviso] decimal(18,2) NOT NULL DEFAULT 0,
    [TotalCesantia] decimal(18,2) NOT NULL DEFAULT 0,
    [TotalVacaciones] decimal(18,2) NOT NULL DEFAULT 0,
    [TotalNavidad] decimal(18,2) NOT NULL DEFAULT 0,
    [TotalGeneral] decimal(18,2) NOT NULL DEFAULT 0,

    -- Estado del proceso (0=Creado, 1=Calculado, 2=Aprobado, 3=Pagado, 4=Cancelado)
    [SeveranceProcessStatus] int NOT NULL DEFAULT 0,

    -- Campos de auditoría ISO 27001
    [CreatedBy] nvarchar(100) NOT NULL,
    [CreatedOn] datetime2 NOT NULL DEFAULT GETDATE(),
    [ModifiedBy] nvarchar(100) NULL,
    [ModifiedOn] datetime2 NULL,
    [IsDeleted] bit NOT NULL DEFAULT 0,
    [DeletedBy] nvarchar(100) NULL,
    [DeletedOn] datetime2 NULL,

    -- Constraints
    CONSTRAINT [PK_SeveranceProcesses] PRIMARY KEY ([SeveranceProcessId], [DataAreaId])
);

-- Índices para SeveranceProcesses
CREATE NONCLUSTERED INDEX [IX_SeveranceProcesses_DataAreaId]
    ON [dbo].[SeveranceProcesses] ([DataAreaId]);

CREATE NONCLUSTERED INDEX [IX_SeveranceProcesses_ProcessDate]
    ON [dbo].[SeveranceProcesses] ([ProcessDate]);

CREATE NONCLUSTERED INDEX [IX_SeveranceProcesses_Status]
    ON [dbo].[SeveranceProcesses] ([SeveranceProcessStatus]);

CREATE UNIQUE NONCLUSTERED INDEX [IX_SeveranceProcesses_RecId]
    ON [dbo].[SeveranceProcesses] ([RecId]);

PRINT 'Tabla SeveranceProcesses creada correctamente.';

GO

-- ============================================
-- PASO 4: Crear tabla SeveranceProcessDetails
-- ============================================

CREATE TABLE [dbo].[SeveranceProcessDetails] (
    -- Claves
    [SeveranceProcessId] nvarchar(20) NOT NULL,
    [EmployeeId] nvarchar(50) NOT NULL,
    [DataAreaId] nvarchar(10) NOT NULL,

    -- Identificador interno del detalle
    [InternalId] int NOT NULL IDENTITY(1,1),

    -- RecId para auditoría
    [RecId] bigint NOT NULL DEFAULT (NEXT VALUE FOR dbo.SeveranceProcessDetailId),

    -- Datos del empleado (desnormalizados para historial)
    [EmployeeName] nvarchar(200) NULL,
    [Document] nvarchar(50) NULL,

    -- Fechas de empleo
    [StartWorkDate] datetime2 NOT NULL,
    [EndWorkDate] datetime2 NOT NULL,

    -- Configuración del cálculo
    [CalculationType] int NOT NULL DEFAULT 0,
    [TiempoLaborando] nvarchar(100) NULL,

    -- Tiempo trabajado desglosado
    [YearsWorked] int NOT NULL DEFAULT 0,
    [MonthsWorked] int NOT NULL DEFAULT 0,
    [DaysWorked] int NOT NULL DEFAULT 0,

    -- Salarios calculados
    [SumaSalarios] decimal(18,2) NOT NULL DEFAULT 0,
    [SalarioPromedioMensual] decimal(18,2) NOT NULL DEFAULT 0,
    [SalarioPromedioDiario] decimal(18,2) NOT NULL DEFAULT 0,

    -- Switches de inclusión
    [WasNotified] bit NOT NULL DEFAULT 0,
    [IncludeCesantia] bit NOT NULL DEFAULT 1,
    [TookVacations] bit NOT NULL DEFAULT 0,
    [IncludeNavidad] bit NOT NULL DEFAULT 1,

    -- Días y montos de Preaviso (Art. 76)
    [DiasPreaviso] int NOT NULL DEFAULT 0,
    [MontoPreaviso] decimal(18,2) NOT NULL DEFAULT 0,

    -- Días y montos de Cesantía (Art. 80)
    [DiasCesantia] int NOT NULL DEFAULT 0,
    [MontoCesantia] decimal(18,2) NOT NULL DEFAULT 0,

    -- Días y montos de Vacaciones (Art. 177)
    [DiasVacaciones] int NOT NULL DEFAULT 0,
    [MontoVacaciones] decimal(18,2) NOT NULL DEFAULT 0,

    -- Meses y monto de Navidad (Art. 219)
    [MesesTrabajadosAnio] int NOT NULL DEFAULT 0,
    [MontoNavidad] decimal(18,2) NOT NULL DEFAULT 0,

    -- Total a recibir
    [TotalARecibir] decimal(18,2) NOT NULL DEFAULT 0,

    -- Comentarios
    [Comments] nvarchar(500) NULL,

    -- Campos de auditoría ISO 27001
    [CreatedBy] nvarchar(100) NOT NULL,
    [CreatedOn] datetime2 NOT NULL DEFAULT GETDATE(),
    [ModifiedBy] nvarchar(100) NULL,
    [ModifiedOn] datetime2 NULL,
    [IsDeleted] bit NOT NULL DEFAULT 0,
    [DeletedBy] nvarchar(100) NULL,
    [DeletedOn] datetime2 NULL,

    -- Constraints
    CONSTRAINT [PK_SeveranceProcessDetails] PRIMARY KEY ([SeveranceProcessId], [EmployeeId], [DataAreaId]),

    CONSTRAINT [FK_SeveranceProcessDetails_SeveranceProcesses]
        FOREIGN KEY ([SeveranceProcessId], [DataAreaId])
        REFERENCES [dbo].[SeveranceProcesses] ([SeveranceProcessId], [DataAreaId])
        ON DELETE CASCADE
);

-- Índices para SeveranceProcessDetails
CREATE NONCLUSTERED INDEX [IX_SeveranceProcessDetails_EmployeeId]
    ON [dbo].[SeveranceProcessDetails] ([EmployeeId]);

CREATE NONCLUSTERED INDEX [IX_SeveranceProcessDetails_ProcessId]
    ON [dbo].[SeveranceProcessDetails] ([SeveranceProcessId], [DataAreaId]);

CREATE UNIQUE NONCLUSTERED INDEX [IX_SeveranceProcessDetails_RecId]
    ON [dbo].[SeveranceProcessDetails] ([RecId]);

PRINT 'Tabla SeveranceProcessDetails creada correctamente.';

GO

-- ============================================
-- VERIFICACION FINAL
-- ============================================

PRINT '';
PRINT '=============================================================';
PRINT 'VERIFICACION DE TABLAS CREADAS';
PRINT '=============================================================';

-- Verificar tablas
SELECT
    t.name AS TableName,
    (SELECT COUNT(*) FROM sys.columns c WHERE c.object_id = t.object_id) AS ColumnCount
FROM sys.tables t
WHERE t.name IN ('SeveranceProcesses', 'SeveranceProcessDetails')
ORDER BY t.name;

-- Verificar columnas de SeveranceProcesses
PRINT '';
PRINT 'Columnas de SeveranceProcesses:';
SELECT c.name AS ColumnName, ty.name AS DataType
FROM sys.columns c
INNER JOIN sys.types ty ON c.user_type_id = ty.user_type_id
WHERE c.object_id = OBJECT_ID('SeveranceProcesses')
ORDER BY c.column_id;

-- Verificar columnas de SeveranceProcessDetails
PRINT '';
PRINT 'Columnas de SeveranceProcessDetails:';
SELECT c.name AS ColumnName, ty.name AS DataType
FROM sys.columns c
INNER JOIN sys.types ty ON c.user_type_id = ty.user_type_id
WHERE c.object_id = OBJECT_ID('SeveranceProcessDetails')
ORDER BY c.column_id;

-- Verificar secuencias
PRINT '';
PRINT 'Secuencias:';
SELECT name, current_value, start_value
FROM sys.sequences
WHERE name IN ('SeveranceProcessId', 'SeveranceProcessDetailId');

PRINT '';
PRINT '=============================================================';
PRINT 'PROCESO COMPLETADO EXITOSAMENTE';
PRINT '=============================================================';
GO
