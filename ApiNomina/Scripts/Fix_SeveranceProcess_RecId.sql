-- =============================================================================
-- Script: Corregir RecId en SeveranceProcesses
-- El problema es que RecId fue creado como IDENTITY pero debe usar secuencia
-- =============================================================================

-- Paso 1: Eliminar la tabla de detalles primero (FK)
IF EXISTS (SELECT * FROM sys.tables WHERE name = 'SeveranceProcessDetails')
BEGIN
    DROP TABLE [dbo].[SeveranceProcessDetails];
    PRINT 'Tabla SeveranceProcessDetails eliminada.';
END
GO

-- Paso 2: Eliminar la tabla principal
IF EXISTS (SELECT * FROM sys.tables WHERE name = 'SeveranceProcesses')
BEGIN
    DROP TABLE [dbo].[SeveranceProcesses];
    PRINT 'Tabla SeveranceProcesses eliminada.';
END
GO

-- Paso 3: Recrear secuencia si no existe
IF NOT EXISTS (SELECT * FROM sys.sequences WHERE name = 'SeveranceProcessId')
BEGIN
    CREATE SEQUENCE [dbo].[SeveranceProcessId] AS bigint START WITH 1 INCREMENT BY 1;
    PRINT 'Secuencia SeveranceProcessId creada.';
END
GO

-- Paso 4: Crear tabla SeveranceProcesses con RecId usando SECUENCIA (no IDENTITY)
CREATE TABLE [dbo].[SeveranceProcesses] (
    [SeveranceProcessId] nvarchar(20) NOT NULL DEFAULT (FORMAT((NEXT VALUE FOR dbo.SeveranceProcessId),'PRES-00000000#')),
    [RecId] bigint NOT NULL DEFAULT (NEXT VALUE FOR dbo.RecId),
    [DataAreaId] nvarchar(10) NOT NULL,
    [ProcessDate] datetime2 NOT NULL,
    [Description] nvarchar(500) NULL,
    [EmployeeQuantity] int NOT NULL DEFAULT 0,
    [TotalPreaviso] decimal(18,2) NOT NULL DEFAULT 0,
    [TotalCesantia] decimal(18,2) NOT NULL DEFAULT 0,
    [TotalVacaciones] decimal(18,2) NOT NULL DEFAULT 0,
    [TotalNavidad] decimal(18,2) NOT NULL DEFAULT 0,
    [TotalGeneral] decimal(18,2) NOT NULL DEFAULT 0,
    [SeveranceProcessStatus] int NOT NULL DEFAULT 0,
    [CreatedBy] nvarchar(100) NOT NULL,
    [CreatedOn] datetime2 NOT NULL DEFAULT GETDATE(),
    [ModifiedBy] nvarchar(100) NULL,
    [ModifiedOn] datetime2 NULL,
    [IsDeleted] bit NOT NULL DEFAULT 0,
    [DeletedBy] nvarchar(100) NULL,
    [DeletedOn] datetime2 NULL,
    CONSTRAINT [PK_SeveranceProcesses] PRIMARY KEY ([SeveranceProcessId], [DataAreaId])
);

CREATE UNIQUE NONCLUSTERED INDEX [IX_SeveranceProcesses_RecId] ON [dbo].[SeveranceProcesses] ([RecId]);
PRINT 'Tabla SeveranceProcesses creada con RecId usando secuencia.';
GO

-- Paso 5: Crear tabla SeveranceProcessDetails
CREATE TABLE [dbo].[SeveranceProcessDetails] (
    [SeveranceProcessId] nvarchar(20) NOT NULL,
    [EmployeeId] nvarchar(50) NOT NULL,
    [DataAreaId] nvarchar(10) NOT NULL,
    [InternalId] int NOT NULL IDENTITY(1,1),
    [SeveranceRefRecId] bigint NOT NULL,
    [RecId] bigint NOT NULL DEFAULT (NEXT VALUE FOR dbo.RecId),
    [EmployeeName] nvarchar(200) NULL,
    [Document] nvarchar(50) NULL,
    [StartWorkDate] datetime2 NOT NULL,
    [EndWorkDate] datetime2 NOT NULL,
    [CalculationType] int NOT NULL DEFAULT 0,
    [TiempoLaborando] nvarchar(100) NULL,
    [YearsWorked] int NOT NULL DEFAULT 0,
    [MonthsWorked] int NOT NULL DEFAULT 0,
    [DaysWorked] int NOT NULL DEFAULT 0,
    [SumaSalarios] decimal(18,2) NOT NULL DEFAULT 0,
    [SalarioPromedioMensual] decimal(18,2) NOT NULL DEFAULT 0,
    [SalarioPromedioDiario] decimal(18,2) NOT NULL DEFAULT 0,
    [WasNotified] bit NOT NULL DEFAULT 0,
    [IncludeCesantia] bit NOT NULL DEFAULT 1,
    [TookVacations] bit NOT NULL DEFAULT 0,
    [IncludeNavidad] bit NOT NULL DEFAULT 1,
    [DiasPreaviso] int NOT NULL DEFAULT 0,
    [MontoPreaviso] decimal(18,2) NOT NULL DEFAULT 0,
    [DiasCesantia] int NOT NULL DEFAULT 0,
    [MontoCesantia] decimal(18,2) NOT NULL DEFAULT 0,
    [DiasVacaciones] int NOT NULL DEFAULT 0,
    [MontoVacaciones] decimal(18,2) NOT NULL DEFAULT 0,
    [MesesTrabajadosAnio] int NOT NULL DEFAULT 0,
    [MontoNavidad] decimal(18,2) NOT NULL DEFAULT 0,
    [TotalARecibir] decimal(18,2) NOT NULL DEFAULT 0,
    [Comments] nvarchar(500) NULL,
    [CreatedBy] nvarchar(100) NOT NULL,
    [CreatedOn] datetime2 NOT NULL DEFAULT GETDATE(),
    [ModifiedBy] nvarchar(100) NULL,
    [ModifiedOn] datetime2 NULL,
    [IsDeleted] bit NOT NULL DEFAULT 0,
    [DeletedBy] nvarchar(100) NULL,
    [DeletedOn] datetime2 NULL,
    CONSTRAINT [PK_SeveranceProcessDetails] PRIMARY KEY ([SeveranceProcessId], [EmployeeId], [DataAreaId]),
    CONSTRAINT [FK_SeveranceProcessDetails_SeveranceProcesses]
        FOREIGN KEY ([SeveranceProcessId], [DataAreaId])
        REFERENCES [dbo].[SeveranceProcesses] ([SeveranceProcessId], [DataAreaId])
        ON DELETE CASCADE
);

CREATE UNIQUE NONCLUSTERED INDEX [IX_SeveranceProcessDetails_RecId] ON [dbo].[SeveranceProcessDetails] ([RecId]);
PRINT 'Tabla SeveranceProcessDetails creada.';
GO

PRINT '¡Tablas recreadas correctamente!';
