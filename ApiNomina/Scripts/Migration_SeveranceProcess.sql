-- =============================================================================
-- Migración: Crear tablas para Prestaciones Laborales (Severance Process)
-- Fecha: 2025-11-30
-- Descripción: Crea las tablas SeveranceProcesses y SeveranceProcessDetails
--              junto con sus secuencias para IDs autogenerados
-- =============================================================================

-- ============================================
-- PASO 1: Crear secuencias para IDs
-- ============================================

-- Secuencia para SeveranceProcessId (formato: PRES-000000001)
IF NOT EXISTS (SELECT * FROM sys.sequences WHERE name = 'SeveranceProcessId')
BEGIN
    CREATE SEQUENCE [dbo].[SeveranceProcessId]
        AS bigint
        START WITH 1
        INCREMENT BY 1
        MINVALUE 1
        NO MAXVALUE
        NO CACHE;
    PRINT 'Secuencia SeveranceProcessId creada correctamente.';
END
ELSE
BEGIN
    PRINT 'La secuencia SeveranceProcessId ya existe.';
END
GO

-- Secuencia para SeveranceProcessDetailId
IF NOT EXISTS (SELECT * FROM sys.sequences WHERE name = 'SeveranceProcessDetailId')
BEGIN
    CREATE SEQUENCE [dbo].[SeveranceProcessDetailId]
        AS bigint
        START WITH 1
        INCREMENT BY 1
        MINVALUE 1
        NO MAXVALUE
        NO CACHE;
    PRINT 'Secuencia SeveranceProcessDetailId creada correctamente.';
END
ELSE
BEGIN
    PRINT 'La secuencia SeveranceProcessDetailId ya existe.';
END
GO

-- ============================================
-- PASO 2: Crear tabla SeveranceProcesses
-- ============================================

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'SeveranceProcesses')
BEGIN
    CREATE TABLE [dbo].[SeveranceProcesses] (
        -- Clave primaria con formato PRES-000000001
        [SeveranceProcessId] nvarchar(20) NOT NULL DEFAULT (FORMAT((NEXT VALUE FOR dbo.SeveranceProcessId),'PRES-000000000#')),

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

        -- Estado del proceso (0=Creado, 1=Calculado, 2=Cerrado, 3=Cancelado)
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

    -- Índices
    CREATE NONCLUSTERED INDEX [IX_SeveranceProcesses_DataAreaId]
        ON [dbo].[SeveranceProcesses] ([DataAreaId]);

    CREATE NONCLUSTERED INDEX [IX_SeveranceProcesses_ProcessDate]
        ON [dbo].[SeveranceProcesses] ([ProcessDate]);

    CREATE NONCLUSTERED INDEX [IX_SeveranceProcesses_Status]
        ON [dbo].[SeveranceProcesses] ([SeveranceProcessStatus]);

    CREATE UNIQUE NONCLUSTERED INDEX [IX_SeveranceProcesses_RecId]
        ON [dbo].[SeveranceProcesses] ([RecId]);

    PRINT 'Tabla SeveranceProcesses creada correctamente.';
END
ELSE
BEGIN
    PRINT 'La tabla SeveranceProcesses ya existe.';
END
GO

-- ============================================
-- PASO 3: Crear tabla SeveranceProcessDetails
-- ============================================

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'SeveranceProcessDetails')
BEGIN
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
        [CalculationType] int NOT NULL DEFAULT 0, -- 0=Renuncia, 1=Despido, 2=Desahucio
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
        [WasNotified] bit NOT NULL DEFAULT 0, -- Fue preavisado?
        [IncludeCesantia] bit NOT NULL DEFAULT 1, -- Incluir cesantía?
        [TookVacations] bit NOT NULL DEFAULT 0, -- Tomó vacaciones?
        [IncludeNavidad] bit NOT NULL DEFAULT 1, -- Incluir navidad?

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

    -- Índices
    CREATE NONCLUSTERED INDEX [IX_SeveranceProcessDetails_EmployeeId]
        ON [dbo].[SeveranceProcessDetails] ([EmployeeId]);

    CREATE NONCLUSTERED INDEX [IX_SeveranceProcessDetails_ProcessId]
        ON [dbo].[SeveranceProcessDetails] ([SeveranceProcessId], [DataAreaId]);

    CREATE UNIQUE NONCLUSTERED INDEX [IX_SeveranceProcessDetails_RecId]
        ON [dbo].[SeveranceProcessDetails] ([RecId]);

    PRINT 'Tabla SeveranceProcessDetails creada correctamente.';
END
ELSE
BEGIN
    PRINT 'La tabla SeveranceProcessDetails ya existe.';
END
GO

-- ============================================
-- VERIFICACION FINAL
-- ============================================

-- Verificar tablas creadas
SELECT
    t.name AS TableName,
    (SELECT COUNT(*) FROM sys.columns c WHERE c.object_id = t.object_id) AS ColumnCount,
    t.create_date AS CreatedDate
FROM sys.tables t
WHERE t.name IN ('SeveranceProcesses', 'SeveranceProcessDetails')
ORDER BY t.name;

-- Verificar secuencias
SELECT
    name AS SequenceName,
    current_value AS CurrentValue,
    start_value AS StartValue,
    increment AS Increment
FROM sys.sequences
WHERE name IN ('SeveranceProcessId', 'SeveranceProcessDetailId');

PRINT '=============================================================';
PRINT 'Migracion de Prestaciones Laborales completada exitosamente.';
PRINT '=============================================================';
GO
