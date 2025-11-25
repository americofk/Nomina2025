IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210405234507_initial'
)
BEGIN
    CREATE SEQUENCE [ClassRoomId] AS int START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 999999999 NO CYCLE;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210405234507_initial'
)
BEGIN
    CREATE SEQUENCE [CourseLocationId] AS int START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 999999999 NO CYCLE;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210405234507_initial'
)
BEGIN
    CREATE SEQUENCE [CourseTypeId] AS int START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 999999999 NO CYCLE;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210405234507_initial'
)
BEGIN
    CREATE SEQUENCE [DeductionCodeId] AS int START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 999999999 NO CYCLE;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210405234507_initial'
)
BEGIN
    CREATE SEQUENCE [DepartmentId] AS int START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 999999999 NO CYCLE;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210405234507_initial'
)
BEGIN
    CREATE SEQUENCE [EarningCodeId] AS int START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 999999999 NO CYCLE;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210405234507_initial'
)
BEGIN
    CREATE SEQUENCE [IntructorId] AS int START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 999999999 NO CYCLE;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210405234507_initial'
)
BEGIN
    CREATE SEQUENCE [JobId] AS int START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 999999999 NO CYCLE;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210405234507_initial'
)
BEGIN
    CREATE SEQUENCE [MenuId] AS int START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 9999 NO CYCLE;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210405234507_initial'
)
BEGIN
    CREATE SEQUENCE [PayrollId] AS int START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 999999999 NO CYCLE;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210405234507_initial'
)
BEGIN
    CREATE SEQUENCE [PositionId] AS int START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 999999999 NO CYCLE;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210405234507_initial'
)
BEGIN
    CREATE TABLE [Country] (
        [CountryId] nvarchar(450) NOT NULL,
        [Name] nvarchar(max) NULL,
        CONSTRAINT [PK_Country] PRIMARY KEY ([CountryId])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210405234507_initial'
)
BEGIN
    CREATE TABLE [CourseLocations] (
        [CourseLocationId] nvarchar(20) NOT NULL DEFAULT (FORMAT((NEXT VALUE FOR dbo.CourseLocationId),'CLT-00000000#')),
        [Name] nvarchar(20) NOT NULL,
        [Phone] nvarchar(20) NOT NULL,
        [Mail] nvarchar(100) NOT NULL,
        [Address] nvarchar(500) NOT NULL,
        [ContactName] nvarchar(max) NULL,
        [Comment] nvarchar(100) NULL,
        CONSTRAINT [PK_CourseLocations] PRIMARY KEY ([CourseLocationId])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210405234507_initial'
)
BEGIN
    CREATE TABLE [CourseType] (
        [CourseTypeId] nvarchar(20) NOT NULL DEFAULT (FORMAT((NEXT VALUE FOR dbo.CourseTypeId),'CT-00000000#')),
        [Name] nvarchar(20) NOT NULL,
        [Description] nvarchar(20) NULL,
        CONSTRAINT [PK_CourseType] PRIMARY KEY ([CourseTypeId])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210405234507_initial'
)
BEGIN
    CREATE TABLE [Currency] (
        [CurrencyId] nvarchar(450) NOT NULL,
        [Name] nvarchar(max) NULL,
        CONSTRAINT [PK_Currency] PRIMARY KEY ([CurrencyId])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210405234507_initial'
)
BEGIN
    CREATE TABLE [DeductionCodes] (
        [DeductionCodeId] nvarchar(20) NOT NULL DEFAULT (FORMAT((NEXT VALUE FOR dbo.DeductionCodeId),'D-00000000#')),
        [Name] nvarchar(100) NOT NULL,
        [ProjId] nvarchar(30) NOT NULL,
        [ProjCategory] nvarchar(max) NULL,
        [ValidFrom] datetime2 NOT NULL,
        [ValidTo] datetime2 NOT NULL,
        [Description] nvarchar(max) NULL,
        [IsEnable] bit NOT NULL,
        [LedgerAccount] nvarchar(30) NOT NULL,
        [Department] nvarchar(100) NULL,
        [PayrollAction] int NOT NULL,
        [Ctbution_IndexBase] int NOT NULL,
        [Ctbution_MultiplyAmount] decimal(18,2) NOT NULL,
        [Ctbution_PayFrecuency] int NOT NULL,
        [Ctbution_LimitPeriod] int NOT NULL,
        [Ctbution_LimitAmount] decimal(18,2) NOT NULL,
        [Dduction_IndexBase] int NOT NULL,
        [Dduction_MultiplyAmount] decimal(18,2) NOT NULL,
        [Dduction_PayFrecuency] int NOT NULL,
        [Dduction_LimitPeriod] int NOT NULL,
        [Dduction_LimitAmount] decimal(18,2) NOT NULL,
        [CreatedBy] nvarchar(10) NULL,
        [CreatedOn] datetime2 NOT NULL,
        [ModifiedBy] nvarchar(10) NULL,
        [ModifiedOn] datetime2 NOT NULL,
        CONSTRAINT [PK_DeductionCodes] PRIMARY KEY ([DeductionCodeId])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210405234507_initial'
)
BEGIN
    CREATE TABLE [Departments] (
        [DepartmentId] nvarchar(20) NOT NULL DEFAULT (FORMAT((NEXT VALUE FOR dbo.DepartmentId),'Dpt-00000000#')),
        [Name] nvarchar(20) NOT NULL,
        [QtyWorkers] int NOT NULL,
        [StartDate] datetime2 NOT NULL,
        [EndDate] datetime2 NOT NULL,
        [Description] nvarchar(100) NULL,
        [CreatedBy] nvarchar(10) NULL,
        [CreatedOn] datetime2 NOT NULL,
        [ModifiedBy] nvarchar(10) NULL,
        [ModifiedOn] datetime2 NOT NULL,
        CONSTRAINT [PK_Departments] PRIMARY KEY ([DepartmentId])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210405234507_initial'
)
BEGIN
    CREATE TABLE [EarningCodes] (
        [EarningCodeId] nvarchar(20) NOT NULL DEFAULT (FORMAT((NEXT VALUE FOR dbo.EarningCodeId),'E-00000000#')),
        [Name] nvarchar(100) NOT NULL,
        [IsTSS] bit NOT NULL,
        [IsISR] bit NOT NULL,
        [ProjId] nvarchar(30) NOT NULL,
        [ValidFrom] datetime2 NOT NULL,
        [ValidTo] datetime2 NOT NULL,
        [Description] nvarchar(max) NULL,
        [IsEnabled] bit NOT NULL,
        [IndexBase] int NOT NULL,
        [MultiplyAmount] decimal(18,2) NOT NULL,
        [LedgerAccount] nvarchar(30) NOT NULL,
        [Department] nvarchar(100) NULL,
        [CreatedBy] nvarchar(10) NULL,
        [CreatedOn] datetime2 NOT NULL,
        [ModifiedBy] nvarchar(10) NULL,
        [ModifiedOn] datetime2 NOT NULL,
        CONSTRAINT [PK_EarningCodes] PRIMARY KEY ([EarningCodeId])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210405234507_initial'
)
BEGIN
    CREATE TABLE [FormatCode] (
        [FormatCodeId] nvarchar(5) NOT NULL,
        [Name] nvarchar(15) NOT NULL,
        CONSTRAINT [PK_FormatCode] PRIMARY KEY ([FormatCodeId])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210405234507_initial'
)
BEGIN
    CREATE TABLE [Instructor] (
        [IntructorId] nvarchar(20) NOT NULL DEFAULT (FORMAT((NEXT VALUE FOR dbo.IntructorId),'INT-00000000#')),
        [Name] nvarchar(20) NOT NULL,
        [Phone] nvarchar(20) NOT NULL,
        [Mail] nvarchar(100) NOT NULL,
        [Company] nvarchar(100) NOT NULL,
        [Comment] nvarchar(100) NULL,
        CONSTRAINT [PK_Instructor] PRIMARY KEY ([IntructorId])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210405234507_initial'
)
BEGIN
    CREATE TABLE [Jobs] (
        [JobId] nvarchar(20) NOT NULL DEFAULT (FORMAT((NEXT VALUE FOR dbo.JobId),'J-00000000#')),
        [Name] nvarchar(20) NOT NULL,
        [Description] nvarchar(100) NULL,
        [JobStatus] bit NOT NULL,
        [CreatedBy] nvarchar(10) NULL,
        [CreatedOn] datetime2 NOT NULL,
        [ModifiedBy] nvarchar(10) NULL,
        [ModifiedOn] datetime2 NOT NULL,
        CONSTRAINT [PK_Jobs] PRIMARY KEY ([JobId])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210405234507_initial'
)
BEGIN
    CREATE TABLE [MenusApp] (
        [MenuId] nvarchar(20) NOT NULL DEFAULT (FORMAT((NEXT VALUE FOR dbo.MenuId),'MENU-000#')),
        [MenuName] nvarchar(50) NOT NULL,
        [Description] nvarchar(max) NULL,
        [Action] nvarchar(100) NULL,
        [Icon] nvarchar(100) NOT NULL,
        [MenuFather] nvarchar(20) NULL,
        CONSTRAINT [PK_MenusApp] PRIMARY KEY ([MenuId]),
        CONSTRAINT [FK_MenusApp_MenusApp_MenuFather] FOREIGN KEY ([MenuFather]) REFERENCES [MenusApp] ([MenuId]) ON DELETE NO ACTION
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210405234507_initial'
)
BEGIN
    CREATE TABLE [Payrolls] (
        [PayrollId] nvarchar(20) NOT NULL DEFAULT (FORMAT((NEXT VALUE FOR dbo.PayrollId),'PAY-00000000#')),
        [Name] nvarchar(100) NOT NULL,
        [PayFrecuency] int NOT NULL,
        [ValidFrom] datetime2 NOT NULL,
        [ValidTo] datetime2 NOT NULL,
        [Description] nvarchar(300) NULL,
        [IsRoyaltyPayroll] bit NOT NULL,
        [CreatedBy] nvarchar(10) NULL,
        [CreatedOn] datetime2 NOT NULL,
        [ModifiedBy] nvarchar(10) NULL,
        [ModifiedOn] datetime2 NOT NULL,
        CONSTRAINT [PK_Payrolls] PRIMARY KEY ([PayrollId])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210405234507_initial'
)
BEGIN
    CREATE TABLE [ClassRooms] (
        [ClassRoomId] nvarchar(20) NOT NULL DEFAULT (FORMAT((NEXT VALUE FOR dbo.ClassRoomId),'CR-00000000#')),
        [Name] nvarchar(20) NOT NULL,
        [CourseLocationId] nvarchar(20) NOT NULL,
        [MaxStudentQty] int NOT NULL,
        [AvailableTimeStart] int NOT NULL,
        [AvailableTimeEnd] int NOT NULL,
        [Comment] nvarchar(100) NULL,
        CONSTRAINT [PK_ClassRooms] PRIMARY KEY ([ClassRoomId]),
        CONSTRAINT [FK_ClassRooms_CourseLocations_CourseLocationId] FOREIGN KEY ([CourseLocationId]) REFERENCES [CourseLocations] ([CourseLocationId]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210405234507_initial'
)
BEGIN
    CREATE TABLE [Companies] (
        [CompanyId] nvarchar(4) NOT NULL,
        [Name] nvarchar(100) NOT NULL,
        [Email] nvarchar(200) NOT NULL,
        [Phone] nvarchar(20) NULL,
        [Responsible] nvarchar(max) NULL,
        [CountryId] nvarchar(450) NULL,
        [CurrencyId] nvarchar(450) NULL,
        [CompanyLogo] nvarchar(max) NULL,
        CONSTRAINT [PK_Companies] PRIMARY KEY ([CompanyId]),
        CONSTRAINT [FK_Companies_Country_CountryId] FOREIGN KEY ([CountryId]) REFERENCES [Country] ([CountryId]) ON DELETE NO ACTION,
        CONSTRAINT [FK_Companies_Currency_CurrencyId] FOREIGN KEY ([CurrencyId]) REFERENCES [Currency] ([CurrencyId]) ON DELETE NO ACTION
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210405234507_initial'
)
BEGIN
    CREATE TABLE [Positions] (
        [PositionId] nvarchar(20) NOT NULL DEFAULT (FORMAT((NEXT VALUE FOR dbo.PositionId),'POS-00000000#')),
        [Name] nvarchar(20) NOT NULL,
        [IsVacant] bit NOT NULL,
        [IsEnabled] bit NOT NULL,
        [DepartmentId] nvarchar(max) NOT NULL,
        [JobId] nvarchar(20) NOT NULL,
        [PositionStatus] bit NOT NULL,
        [StartDate] datetime2 NOT NULL,
        [EndDate] datetime2 NOT NULL,
        [Description] nvarchar(100) NULL,
        [CreatedBy] nvarchar(10) NULL,
        [CreatedOn] datetime2 NOT NULL,
        [ModifiedBy] nvarchar(10) NULL,
        [ModifiedOn] datetime2 NOT NULL,
        CONSTRAINT [PK_Positions] PRIMARY KEY ([PositionId]),
        CONSTRAINT [FK_Positions_Jobs_JobId] FOREIGN KEY ([JobId]) REFERENCES [Jobs] ([JobId]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210405234507_initial'
)
BEGIN
    CREATE TABLE [PayCycles] (
        [PayCycleId] int NOT NULL,
        [PayrollId] nvarchar(20) NOT NULL,
        [PeriodStartDate] datetime2 NOT NULL,
        [PeriodEndDate] datetime2 NOT NULL,
        [DefaultPayDate] datetime2 NOT NULL,
        [PayDate] datetime2 NOT NULL,
        [AmountPaidPerPeriod] decimal(18,2) NOT NULL,
        [StatusPeriod] int NOT NULL,
        CONSTRAINT [PK_PayCycles] PRIMARY KEY ([PayCycleId], [PayrollId]),
        CONSTRAINT [FK_PayCycles_Payrolls_PayrollId] FOREIGN KEY ([PayrollId]) REFERENCES [Payrolls] ([PayrollId]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210405234507_initial'
)
BEGIN
    CREATE TABLE [Users] (
        [Alias] nvarchar(10) NOT NULL,
        [Email] nvarchar(200) NOT NULL,
        [Password] nvarchar(max) NOT NULL,
        [Name] nvarchar(100) NOT NULL,
        [FormatCodeId] nvarchar(5) NOT NULL,
        [ElevationType] int NOT NULL,
        [CompanyDefaultId] nvarchar(4) NULL,
        CONSTRAINT [PK_Users] PRIMARY KEY ([Alias]),
        CONSTRAINT [FK_Users_Companies_CompanyDefaultId] FOREIGN KEY ([CompanyDefaultId]) REFERENCES [Companies] ([CompanyId]) ON DELETE NO ACTION,
        CONSTRAINT [FK_Users_FormatCode_FormatCodeId] FOREIGN KEY ([FormatCodeId]) REFERENCES [FormatCode] ([FormatCodeId]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210405234507_initial'
)
BEGIN
    CREATE TABLE [PositionRequirements] (
        [Name] nvarchar(20) NOT NULL,
        [Detail] nvarchar(100) NOT NULL,
        [PositionId] nvarchar(20) NOT NULL,
        [CreatedBy] nvarchar(10) NULL,
        [CreatedOn] datetime2 NOT NULL,
        [ModifiedBy] nvarchar(10) NULL,
        [ModifiedOn] datetime2 NOT NULL,
        CONSTRAINT [FK_PositionRequirements_Positions_PositionId] FOREIGN KEY ([PositionId]) REFERENCES [Positions] ([PositionId]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210405234507_initial'
)
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'CompanyId', N'CompanyLogo', N'CountryId', N'CurrencyId', N'Email', N'Name', N'Phone', N'Responsible') AND [object_id] = OBJECT_ID(N'[Companies]'))
        SET IDENTITY_INSERT [Companies] ON;
    EXEC(N'INSERT INTO [Companies] ([CompanyId], [CompanyLogo], [CountryId], [CurrencyId], [Email], [Name], [Phone], [Responsible])
    VALUES (N''Root'', NULL, NULL, NULL, N'''', N''Empresa raiz'', NULL, N''Administrator'')');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'CompanyId', N'CompanyLogo', N'CountryId', N'CurrencyId', N'Email', N'Name', N'Phone', N'Responsible') AND [object_id] = OBJECT_ID(N'[Companies]'))
        SET IDENTITY_INSERT [Companies] OFF;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210405234507_initial'
)
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'CountryId', N'Name') AND [object_id] = OBJECT_ID(N'[Country]'))
        SET IDENTITY_INSERT [Country] ON;
    EXEC(N'INSERT INTO [Country] ([CountryId], [Name])
    VALUES (N''DOM'', N''República Dóminicana''),
    (N''CH'', N''Chile'')');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'CountryId', N'Name') AND [object_id] = OBJECT_ID(N'[Country]'))
        SET IDENTITY_INSERT [Country] OFF;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210405234507_initial'
)
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'CurrencyId', N'Name') AND [object_id] = OBJECT_ID(N'[Currency]'))
        SET IDENTITY_INSERT [Currency] ON;
    EXEC(N'INSERT INTO [Currency] ([CurrencyId], [Name])
    VALUES (N''USD'', N''Dólares''),
    (N''DOP'', N''Pesos Dominicanos'')');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'CurrencyId', N'Name') AND [object_id] = OBJECT_ID(N'[Currency]'))
        SET IDENTITY_INSERT [Currency] OFF;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210405234507_initial'
)
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'FormatCodeId', N'Name') AND [object_id] = OBJECT_ID(N'[FormatCode]'))
        SET IDENTITY_INSERT [FormatCode] ON;
    EXEC(N'INSERT INTO [FormatCode] ([FormatCodeId], [Name])
    VALUES (N''en-US'', N''Estado Únidos''),
    (N''es-ES'', N''España'')');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'FormatCodeId', N'Name') AND [object_id] = OBJECT_ID(N'[FormatCode]'))
        SET IDENTITY_INSERT [FormatCode] OFF;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210405234507_initial'
)
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'MenuId', N'Action', N'Description', N'Icon', N'MenuFather', N'MenuName') AND [object_id] = OBJECT_ID(N'[MenusApp]'))
        SET IDENTITY_INSERT [MenusApp] ON;
    EXEC(N'INSERT INTO [MenusApp] ([MenuId], [Action], [Description], [Icon], [MenuFather], [MenuName])
    VALUES (N''MENU-0001'', N''Click'', N''Título de configuración'', N''fa fa-setting'', NULL, N''Configuración'')');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'MenuId', N'Action', N'Description', N'Icon', N'MenuFather', N'MenuName') AND [object_id] = OBJECT_ID(N'[MenusApp]'))
        SET IDENTITY_INSERT [MenusApp] OFF;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210405234507_initial'
)
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'MenuId', N'Action', N'Description', N'Icon', N'MenuFather', N'MenuName') AND [object_id] = OBJECT_ID(N'[MenusApp]'))
        SET IDENTITY_INSERT [MenusApp] ON;
    EXEC(N'INSERT INTO [MenusApp] ([MenuId], [Action], [Description], [Icon], [MenuFather], [MenuName])
    VALUES (N''MENU-0002'', N''Click'', N''Listado de colaboradores'', N''fa fa-user'', N''MENU-0001'', N''Colaboradores'')');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'MenuId', N'Action', N'Description', N'Icon', N'MenuFather', N'MenuName') AND [object_id] = OBJECT_ID(N'[MenusApp]'))
        SET IDENTITY_INSERT [MenusApp] OFF;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210405234507_initial'
)
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Alias', N'CompanyDefaultId', N'ElevationType', N'Email', N'FormatCodeId', N'Name', N'Password') AND [object_id] = OBJECT_ID(N'[Users]'))
        SET IDENTITY_INSERT [Users] ON;
    EXEC(N'INSERT INTO [Users] ([Alias], [CompanyDefaultId], [ElevationType], [Email], [FormatCodeId], [Name], [Password])
    VALUES (N''Admin'', N''Root'', 1, N''fflores@dynacorp365.com'', N''en-US'', N''Admin'', N''e10adc3949ba59abbe56e057f20f883e'')');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Alias', N'CompanyDefaultId', N'ElevationType', N'Email', N'FormatCodeId', N'Name', N'Password') AND [object_id] = OBJECT_ID(N'[Users]'))
        SET IDENTITY_INSERT [Users] OFF;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210405234507_initial'
)
BEGIN
    CREATE INDEX [IX_ClassRooms_CourseLocationId] ON [ClassRooms] ([CourseLocationId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210405234507_initial'
)
BEGIN
    CREATE INDEX [IX_Companies_CountryId] ON [Companies] ([CountryId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210405234507_initial'
)
BEGIN
    CREATE INDEX [IX_Companies_CurrencyId] ON [Companies] ([CurrencyId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210405234507_initial'
)
BEGIN
    CREATE INDEX [IX_MenusApp_MenuFather] ON [MenusApp] ([MenuFather]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210405234507_initial'
)
BEGIN
    CREATE INDEX [IX_PayCycles_PayrollId] ON [PayCycles] ([PayrollId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210405234507_initial'
)
BEGIN
    CREATE INDEX [IX_PositionRequirements_PositionId] ON [PositionRequirements] ([PositionId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210405234507_initial'
)
BEGIN
    CREATE INDEX [IX_Positions_JobId] ON [Positions] ([JobId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210405234507_initial'
)
BEGIN
    CREATE INDEX [IX_Users_CompanyDefaultId] ON [Users] ([CompanyDefaultId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210405234507_initial'
)
BEGIN
    CREATE INDEX [IX_Users_FormatCodeId] ON [Users] ([FormatCodeId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210405234507_initial'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210405234507_initial', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210407220601_des-2'
)
BEGIN
    DECLARE @var sysname;
    SELECT @var = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Departments]') AND [c].[name] = N'DepartmentId');
    IF @var IS NOT NULL EXEC(N'ALTER TABLE [Departments] DROP CONSTRAINT [' + @var + '];');
    ALTER TABLE [Departments] ADD DEFAULT (FORMAT((NEXT VALUE FOR dbo.DepartmentId),'DPT-00000000#')) FOR [DepartmentId];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210407220601_des-2'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210407220601_des-2', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210410223401_des-3'
)
BEGIN
    ALTER TABLE [Departments] ADD [DepartamentStatus] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210410223401_des-3'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210410223401_des-3', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210413222605_des-4'
)
BEGIN
    ALTER TABLE [Users] DROP CONSTRAINT [FK_Users_FormatCode_FormatCodeId];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210413222605_des-4'
)
BEGIN
    ALTER TABLE [FormatCode] DROP CONSTRAINT [PK_FormatCode];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210413222605_des-4'
)
BEGIN
    EXEC sp_rename N'[FormatCode]', N'FormatCodes', 'OBJECT';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210413222605_des-4'
)
BEGIN
    DECLARE @var1 sysname;
    SELECT @var1 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Departments]') AND [c].[name] = N'Name');
    IF @var1 IS NOT NULL EXEC(N'ALTER TABLE [Departments] DROP CONSTRAINT [' + @var1 + '];');
    ALTER TABLE [Departments] ALTER COLUMN [Name] nvarchar(60) NOT NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210413222605_des-4'
)
BEGIN
    ALTER TABLE [FormatCodes] ADD CONSTRAINT [PK_FormatCodes] PRIMARY KEY ([FormatCodeId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210413222605_des-4'
)
BEGIN
    CREATE TABLE [CompaniesAssignedToUsers] (
        [CompanyId] nvarchar(4) NOT NULL,
        [Alias] nvarchar(10) NOT NULL,
        [CreatedBy] nvarchar(10) NULL,
        [CreatedOn] datetime2 NOT NULL,
        [ModifiedBy] nvarchar(10) NULL,
        [ModifiedOn] datetime2 NOT NULL,
        CONSTRAINT [PK_CompaniesAssignedToUsers] PRIMARY KEY ([Alias], [CompanyId]),
        CONSTRAINT [FK_CompaniesAssignedToUsers_Companies_CompanyId] FOREIGN KEY ([CompanyId]) REFERENCES [Companies] ([CompanyId]) ON DELETE CASCADE,
        CONSTRAINT [FK_CompaniesAssignedToUsers_Users_Alias] FOREIGN KEY ([Alias]) REFERENCES [Users] ([Alias]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210413222605_des-4'
)
BEGIN
    CREATE TABLE [MenuAssignedToUsers] (
        [Alias] nvarchar(10) NOT NULL,
        [MenuId] nvarchar(20) NOT NULL,
        [PrivilegeView] bit NOT NULL,
        [PrivilegeEdit] bit NOT NULL,
        [PrivilegeDelete] bit NOT NULL,
        [CreatedBy] nvarchar(10) NULL,
        [CreatedOn] datetime2 NOT NULL,
        [ModifiedBy] nvarchar(10) NULL,
        [ModifiedOn] datetime2 NOT NULL,
        CONSTRAINT [PK_MenuAssignedToUsers] PRIMARY KEY ([Alias], [MenuId]),
        CONSTRAINT [FK_MenuAssignedToUsers_MenusApp_MenuId] FOREIGN KEY ([MenuId]) REFERENCES [MenusApp] ([MenuId]) ON DELETE CASCADE,
        CONSTRAINT [FK_MenuAssignedToUsers_Users_Alias] FOREIGN KEY ([Alias]) REFERENCES [Users] ([Alias]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210413222605_des-4'
)
BEGIN
    EXEC(N'UPDATE [Users] SET [ElevationType] = 0
    WHERE [Alias] = N''Admin'';
    SELECT @@ROWCOUNT');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210413222605_des-4'
)
BEGIN
    CREATE INDEX [IX_CompaniesAssignedToUsers_CompanyId] ON [CompaniesAssignedToUsers] ([CompanyId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210413222605_des-4'
)
BEGIN
    CREATE INDEX [IX_MenuAssignedToUsers_MenuId] ON [MenuAssignedToUsers] ([MenuId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210413222605_des-4'
)
BEGIN
    ALTER TABLE [Users] ADD CONSTRAINT [FK_Users_FormatCodes_FormatCodeId] FOREIGN KEY ([FormatCodeId]) REFERENCES [FormatCodes] ([FormatCodeId]) ON DELETE CASCADE;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210413222605_des-4'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210413222605_des-4', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210414010903_des-5'
)
BEGIN
    ALTER TABLE [MenusApp] ADD [Sort] int NOT NULL DEFAULT 0;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210414010903_des-5'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210414010903_des-5', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210414172539_des-6'
)
BEGIN
    ALTER TABLE [Users] ADD [TemporaryPassword] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210414172539_des-6'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210414172539_des-6', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210414173034_des-7'
)
BEGIN
    ALTER TABLE [Users] ADD [DateTemporaryPassword] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210414173034_des-7'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210414173034_des-7', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210417182317_des-8'
)
BEGIN
    EXEC(N'DELETE FROM [MenusApp]
    WHERE [MenuId] = N''MENU-0001'';
    SELECT @@ROWCOUNT');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210417182317_des-8'
)
BEGIN
    CREATE TABLE [UserImages] (
        [Alias] nvarchar(450) NOT NULL,
        [Image] varbinary(max) NULL,
        [Extension] nvarchar(4) NOT NULL,
        CONSTRAINT [PK_UserImages] PRIMARY KEY ([Alias])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210417182317_des-8'
)
BEGIN
    EXEC(N'UPDATE [Country] SET [Name] = N''República Dominicana''
    WHERE [CountryId] = N''DOM'';
    SELECT @@ROWCOUNT');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210417182317_des-8'
)
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'MenuId', N'Action', N'Description', N'Icon', N'MenuFather', N'MenuName', N'Sort') AND [object_id] = OBJECT_ID(N'[MenusApp]'))
        SET IDENTITY_INSERT [MenusApp] ON;
    EXEC(N'INSERT INTO [MenusApp] ([MenuId], [Action], [Description], [Icon], [MenuFather], [MenuName], [Sort])
    VALUES (N''MENU-0006'', N''Click'', N''Título de configuración'', N''fa fa-setting'', NULL, N''Configuración'', 0)');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'MenuId', N'Action', N'Description', N'Icon', N'MenuFather', N'MenuName', N'Sort') AND [object_id] = OBJECT_ID(N'[MenusApp]'))
        SET IDENTITY_INSERT [MenusApp] OFF;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210417182317_des-8'
)
BEGIN
    EXEC(N'UPDATE [MenusApp] SET [MenuFather] = N''MENU-0006''
    WHERE [MenuId] = N''MENU-0002'';
    SELECT @@ROWCOUNT');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210417182317_des-8'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210417182317_des-8', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210422161329_des-9'
)
BEGIN
    ALTER TABLE [Instructor] DROP CONSTRAINT [PK_Instructor];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210422161329_des-9'
)
BEGIN
    ALTER TABLE [CourseType] DROP CONSTRAINT [PK_CourseType];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210422161329_des-9'
)
BEGIN
    EXEC sp_rename N'[Instructor]', N'Instructors', 'OBJECT';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210422161329_des-9'
)
BEGIN
    EXEC sp_rename N'[CourseType]', N'CourseTypes', 'OBJECT';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210422161329_des-9'
)
BEGIN
    EXEC sp_rename N'[Instructors].[IntructorId]', N'InstructorId', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210422161329_des-9'
)
BEGIN
    DECLARE @var2 sysname;
    SELECT @var2 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[CourseLocations]') AND [c].[name] = N'Phone');
    IF @var2 IS NOT NULL EXEC(N'ALTER TABLE [CourseLocations] DROP CONSTRAINT [' + @var2 + '];');
    ALTER TABLE [CourseLocations] ALTER COLUMN [Phone] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210422161329_des-9'
)
BEGIN
    DECLARE @var3 sysname;
    SELECT @var3 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[CourseLocations]') AND [c].[name] = N'Mail');
    IF @var3 IS NOT NULL EXEC(N'ALTER TABLE [CourseLocations] DROP CONSTRAINT [' + @var3 + '];');
    ALTER TABLE [CourseLocations] ALTER COLUMN [Mail] nvarchar(100) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210422161329_des-9'
)
BEGIN
    ALTER TABLE [CourseLocations] ADD [CourseLocationStatus] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210422161329_des-9'
)
BEGIN
    DECLARE @var4 sysname;
    SELECT @var4 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Instructors]') AND [c].[name] = N'Phone');
    IF @var4 IS NOT NULL EXEC(N'ALTER TABLE [Instructors] DROP CONSTRAINT [' + @var4 + '];');
    ALTER TABLE [Instructors] ALTER COLUMN [Phone] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210422161329_des-9'
)
BEGIN
    DECLARE @var5 sysname;
    SELECT @var5 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Instructors]') AND [c].[name] = N'Mail');
    IF @var5 IS NOT NULL EXEC(N'ALTER TABLE [Instructors] DROP CONSTRAINT [' + @var5 + '];');
    ALTER TABLE [Instructors] ALTER COLUMN [Mail] nvarchar(100) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210422161329_des-9'
)
BEGIN
    ALTER TABLE [Instructors] ADD CONSTRAINT [PK_Instructors] PRIMARY KEY ([InstructorId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210422161329_des-9'
)
BEGIN
    ALTER TABLE [CourseTypes] ADD CONSTRAINT [PK_CourseTypes] PRIMARY KEY ([CourseTypeId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210422161329_des-9'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210422161329_des-9', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210427163100_des-10'
)
BEGIN
    DECLARE @var6 sysname;
    SELECT @var6 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[CourseTypes]') AND [c].[name] = N'Name');
    IF @var6 IS NOT NULL EXEC(N'ALTER TABLE [CourseTypes] DROP CONSTRAINT [' + @var6 + '];');
    ALTER TABLE [CourseTypes] ALTER COLUMN [Name] nvarchar(50) NOT NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210427163100_des-10'
)
BEGIN
    DECLARE @var7 sysname;
    SELECT @var7 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[CourseTypes]') AND [c].[name] = N'Description');
    IF @var7 IS NOT NULL EXEC(N'ALTER TABLE [CourseTypes] DROP CONSTRAINT [' + @var7 + '];');
    ALTER TABLE [CourseTypes] ALTER COLUMN [Description] nvarchar(200) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210427163100_des-10'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210427163100_des-10', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210427223701_des-11'
)
BEGIN
    DECLARE @var8 sysname;
    SELECT @var8 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Instructors]') AND [c].[name] = N'Name');
    IF @var8 IS NOT NULL EXEC(N'ALTER TABLE [Instructors] DROP CONSTRAINT [' + @var8 + '];');
    ALTER TABLE [Instructors] ALTER COLUMN [Name] nvarchar(50) NOT NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210427223701_des-11'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210427223701_des-11', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210427235744_des-12'
)
BEGIN
    DECLARE @var9 sysname;
    SELECT @var9 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[CourseLocations]') AND [c].[name] = N'CourseLocationStatus');
    IF @var9 IS NOT NULL EXEC(N'ALTER TABLE [CourseLocations] DROP CONSTRAINT [' + @var9 + '];');
    ALTER TABLE [CourseLocations] DROP COLUMN [CourseLocationStatus];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210427235744_des-12'
)
BEGIN
    DECLARE @var10 sysname;
    SELECT @var10 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[CourseLocations]') AND [c].[name] = N'Name');
    IF @var10 IS NOT NULL EXEC(N'ALTER TABLE [CourseLocations] DROP CONSTRAINT [' + @var10 + '];');
    ALTER TABLE [CourseLocations] ALTER COLUMN [Name] nvarchar(50) NOT NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210427235744_des-12'
)
BEGIN
    DECLARE @var11 sysname;
    SELECT @var11 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[CourseLocations]') AND [c].[name] = N'ContactName');
    IF @var11 IS NOT NULL EXEC(N'ALTER TABLE [CourseLocations] DROP CONSTRAINT [' + @var11 + '];');
    EXEC(N'UPDATE [CourseLocations] SET [ContactName] = N'''' WHERE [ContactName] IS NULL');
    ALTER TABLE [CourseLocations] ALTER COLUMN [ContactName] nvarchar(50) NOT NULL;
    ALTER TABLE [CourseLocations] ADD DEFAULT N'' FOR [ContactName];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210427235744_des-12'
)
BEGIN
    DECLARE @var12 sysname;
    SELECT @var12 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[ClassRooms]') AND [c].[name] = N'Name');
    IF @var12 IS NOT NULL EXEC(N'ALTER TABLE [ClassRooms] DROP CONSTRAINT [' + @var12 + '];');
    ALTER TABLE [ClassRooms] ALTER COLUMN [Name] nvarchar(50) NOT NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210427235744_des-12'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210427235744_des-12', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210429200841_des-13'
)
BEGIN
    CREATE SEQUENCE [CourseId] AS int START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 999999 NO CYCLE;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210429200841_des-13'
)
BEGIN
    CREATE TABLE [Courses] (
        [CourseId] nvarchar(20) NOT NULL DEFAULT (FORMAT((NEXT VALUE FOR dbo.CourseId),'CO-00000000#')),
        [CourseName] nvarchar(max) NULL,
        [CourseTypeId] nvarchar(20) NOT NULL,
        [IsMatrixTraining] bit NOT NULL,
        [InternalExternal] int NOT NULL,
        [CourseParentId] nvarchar(20) NULL,
        [CourseLocationId] nvarchar(20) NOT NULL,
        [ClassRoomId] nvarchar(20) NOT NULL,
        [StartDateTime] datetime2 NOT NULL,
        [EndDateTime] datetime2 NOT NULL,
        [MinStudents] int NOT NULL,
        [MaxStudents] int NOT NULL,
        [Periodicity] int NOT NULL,
        [QtySessions] int NOT NULL,
        [Description] nvarchar(300) NULL,
        [Objetives] nvarchar(1000) NOT NULL,
        [Topics] nvarchar(1000) NOT NULL,
        [CourseStatus] int NOT NULL,
        [CreatedBy] nvarchar(10) NULL,
        [CreatedOn] datetime2 NOT NULL,
        [ModifiedBy] nvarchar(10) NULL,
        [ModifiedOn] datetime2 NOT NULL,
        CONSTRAINT [PK_Courses] PRIMARY KEY ([CourseId]),
        CONSTRAINT [FK_Courses_ClassRooms_ClassRoomId] FOREIGN KEY ([ClassRoomId]) REFERENCES [ClassRooms] ([ClassRoomId]),
        CONSTRAINT [FK_Courses_CourseLocations_CourseLocationId] FOREIGN KEY ([CourseLocationId]) REFERENCES [CourseLocations] ([CourseLocationId]),
        CONSTRAINT [FK_Courses_Courses_CourseParentId] FOREIGN KEY ([CourseParentId]) REFERENCES [Courses] ([CourseId]),
        CONSTRAINT [FK_Courses_CourseTypes_CourseTypeId] FOREIGN KEY ([CourseTypeId]) REFERENCES [CourseTypes] ([CourseTypeId])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210429200841_des-13'
)
BEGIN
    CREATE TABLE [CourseInstructors] (
        [CourseId] nvarchar(20) NOT NULL,
        [InstructorId] nvarchar(20) NOT NULL,
        [Comment] nvarchar(300) NOT NULL,
        CONSTRAINT [PK_CourseInstructors] PRIMARY KEY ([CourseId], [InstructorId]),
        CONSTRAINT [FK_CourseInstructors_Courses_CourseId] FOREIGN KEY ([CourseId]) REFERENCES [Courses] ([CourseId]) ON DELETE CASCADE,
        CONSTRAINT [FK_CourseInstructors_Instructors_InstructorId] FOREIGN KEY ([InstructorId]) REFERENCES [Instructors] ([InstructorId]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210429200841_des-13'
)
BEGIN
    CREATE INDEX [IX_CourseInstructors_InstructorId] ON [CourseInstructors] ([InstructorId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210429200841_des-13'
)
BEGIN
    CREATE INDEX [IX_Courses_ClassRoomId] ON [Courses] ([ClassRoomId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210429200841_des-13'
)
BEGIN
    CREATE INDEX [IX_Courses_CourseLocationId] ON [Courses] ([CourseLocationId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210429200841_des-13'
)
BEGIN
    CREATE INDEX [IX_Courses_CourseParentId] ON [Courses] ([CourseParentId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210429200841_des-13'
)
BEGIN
    CREATE INDEX [IX_Courses_CourseTypeId] ON [Courses] ([CourseTypeId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210429200841_des-13'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210429200841_des-13', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210429202221_des-14'
)
BEGIN
    ALTER TABLE [Courses] DROP CONSTRAINT [FK_Courses_CourseLocations_CourseLocationId];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210429202221_des-14'
)
BEGIN
    DROP INDEX [IX_Courses_CourseLocationId] ON [Courses];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210429202221_des-14'
)
BEGIN
    DECLARE @var13 sysname;
    SELECT @var13 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Courses]') AND [c].[name] = N'CourseLocationId');
    IF @var13 IS NOT NULL EXEC(N'ALTER TABLE [Courses] DROP CONSTRAINT [' + @var13 + '];');
    ALTER TABLE [Courses] DROP COLUMN [CourseLocationId];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210429202221_des-14'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210429202221_des-14', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210429211505_des-15'
)
BEGIN
    ALTER TABLE [Courses] DROP CONSTRAINT [FK_Courses_Courses_CourseParentId];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210429211505_des-15'
)
BEGIN
    DROP INDEX [IX_Courses_CourseParentId] ON [Courses];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210429211505_des-15'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210429211505_des-15', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210430192057_des-16'
)
BEGIN
    ALTER TABLE [Positions] DROP CONSTRAINT [FK_Positions_Jobs_JobId];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210430192057_des-16'
)
BEGIN
    DECLARE @var14 sysname;
    SELECT @var14 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Positions]') AND [c].[name] = N'IsEnabled');
    IF @var14 IS NOT NULL EXEC(N'ALTER TABLE [Positions] DROP CONSTRAINT [' + @var14 + '];');
    ALTER TABLE [Positions] DROP COLUMN [IsEnabled];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210430192057_des-16'
)
BEGIN
    EXEC sp_rename N'[Positions].[Name]', N'NotifyPositionId', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210430192057_des-16'
)
BEGIN
    DECLARE @var15 sysname;
    SELECT @var15 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Positions]') AND [c].[name] = N'Description');
    IF @var15 IS NOT NULL EXEC(N'ALTER TABLE [Positions] DROP CONSTRAINT [' + @var15 + '];');
    ALTER TABLE [Positions] ALTER COLUMN [Description] nvarchar(200) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210430192057_des-16'
)
BEGIN
    DECLARE @var16 sysname;
    SELECT @var16 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Positions]') AND [c].[name] = N'DepartmentId');
    IF @var16 IS NOT NULL EXEC(N'ALTER TABLE [Positions] DROP CONSTRAINT [' + @var16 + '];');
    ALTER TABLE [Positions] ALTER COLUMN [DepartmentId] nvarchar(20) NOT NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210430192057_des-16'
)
BEGIN
    ALTER TABLE [Positions] ADD [PositionName] nvarchar(50) NOT NULL DEFAULT N'';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210430192057_des-16'
)
BEGIN
    DECLARE @var17 sysname;
    SELECT @var17 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Jobs]') AND [c].[name] = N'Name');
    IF @var17 IS NOT NULL EXEC(N'ALTER TABLE [Jobs] DROP CONSTRAINT [' + @var17 + '];');
    ALTER TABLE [Jobs] ALTER COLUMN [Name] nvarchar(50) NOT NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210430192057_des-16'
)
BEGIN
    DECLARE @var18 sysname;
    SELECT @var18 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Jobs]') AND [c].[name] = N'Description');
    IF @var18 IS NOT NULL EXEC(N'ALTER TABLE [Jobs] DROP CONSTRAINT [' + @var18 + '];');
    ALTER TABLE [Jobs] ALTER COLUMN [Description] nvarchar(200) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210430192057_des-16'
)
BEGIN
    DECLARE @var19 sysname;
    SELECT @var19 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Courses]') AND [c].[name] = N'CourseName');
    IF @var19 IS NOT NULL EXEC(N'ALTER TABLE [Courses] DROP CONSTRAINT [' + @var19 + '];');
    EXEC(N'UPDATE [Courses] SET [CourseName] = N'''' WHERE [CourseName] IS NULL');
    ALTER TABLE [Courses] ALTER COLUMN [CourseName] nvarchar(50) NOT NULL;
    ALTER TABLE [Courses] ADD DEFAULT N'' FOR [CourseName];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210430192057_des-16'
)
BEGIN
    CREATE TABLE [CoursePositions] (
        [PositionId] nvarchar(20) NOT NULL,
        [CourseId] nvarchar(20) NOT NULL,
        [Comment] nvarchar(300) NOT NULL,
        CONSTRAINT [PK_CoursePositions] PRIMARY KEY ([CourseId], [PositionId]),
        CONSTRAINT [FK_CoursePositions_Courses_CourseId] FOREIGN KEY ([CourseId]) REFERENCES [Courses] ([CourseId]) ON DELETE CASCADE,
        CONSTRAINT [FK_CoursePositions_Instructors_PositionId] FOREIGN KEY ([PositionId]) REFERENCES [Instructors] ([InstructorId]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210430192057_des-16'
)
BEGIN
    CREATE INDEX [IX_Positions_DepartmentId] ON [Positions] ([DepartmentId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210430192057_des-16'
)
BEGIN
    CREATE INDEX [IX_CoursePositions_PositionId] ON [CoursePositions] ([PositionId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210430192057_des-16'
)
BEGIN
    ALTER TABLE [Positions] ADD CONSTRAINT [FK_Positions_Departments_DepartmentId] FOREIGN KEY ([DepartmentId]) REFERENCES [Departments] ([DepartmentId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210430192057_des-16'
)
BEGIN
    ALTER TABLE [Positions] ADD CONSTRAINT [FK_Positions_Jobs_JobId] FOREIGN KEY ([JobId]) REFERENCES [Jobs] ([JobId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210430192057_des-16'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210430192057_des-16', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210510224741_des-17'
)
BEGIN
    DECLARE @var20 sysname;
    SELECT @var20 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Positions]') AND [c].[name] = N'NotifyPositionId');
    IF @var20 IS NOT NULL EXEC(N'ALTER TABLE [Positions] DROP CONSTRAINT [' + @var20 + '];');
    ALTER TABLE [Positions] ALTER COLUMN [NotifyPositionId] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210510224741_des-17'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210510224741_des-17', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210511011824_des-18'
)
BEGIN
    ALTER TABLE [Companies] DROP CONSTRAINT [FK_Companies_Country_CountryId];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210511011824_des-18'
)
BEGIN
    ALTER TABLE [Country] DROP CONSTRAINT [PK_Country];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210511011824_des-18'
)
BEGIN
    EXEC(N'DELETE FROM [Country]
    WHERE [CountryId] = N''CH'';
    SELECT @@ROWCOUNT');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210511011824_des-18'
)
BEGIN
    EXEC(N'DELETE FROM [Country]
    WHERE [CountryId] = N''DOM'';
    SELECT @@ROWCOUNT');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210511011824_des-18'
)
BEGIN
    CREATE SEQUENCE [EmployeeId] AS int START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 999999999 NO CYCLE;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210511011824_des-18'
)
BEGIN
    DECLARE @var21 sysname;
    SELECT @var21 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Country]') AND [c].[name] = N'Name');
    IF @var21 IS NOT NULL EXEC(N'ALTER TABLE [Country] DROP CONSTRAINT [' + @var21 + '];');
    EXEC(N'UPDATE [Country] SET [Name] = N'''' WHERE [Name] IS NULL');
    ALTER TABLE [Country] ALTER COLUMN [Name] nvarchar(100) NOT NULL;
    ALTER TABLE [Country] ADD DEFAULT N'' FOR [Name];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210511011824_des-18'
)
BEGIN
    DECLARE @var22 sysname;
    SELECT @var22 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Country]') AND [c].[name] = N'CountryId');
    IF @var22 IS NOT NULL EXEC(N'ALTER TABLE [Country] DROP CONSTRAINT [' + @var22 + '];');
    ALTER TABLE [Country] ALTER COLUMN [CountryId] nvarchar(20) NOT NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210511011824_des-18'
)
BEGIN
    ALTER TABLE [Country] ADD [CountryId2] nvarchar(20) NOT NULL DEFAULT N'';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210511011824_des-18'
)
BEGIN
    DROP INDEX [IX_Companies_CountryId] ON [Companies];
    DECLARE @var23 sysname;
    SELECT @var23 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Companies]') AND [c].[name] = N'CountryId');
    IF @var23 IS NOT NULL EXEC(N'ALTER TABLE [Companies] DROP CONSTRAINT [' + @var23 + '];');
    ALTER TABLE [Companies] ALTER COLUMN [CountryId] nvarchar(20) NULL;
    CREATE INDEX [IX_Companies_CountryId] ON [Companies] ([CountryId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210511011824_des-18'
)
BEGIN
    ALTER TABLE [Country] ADD CONSTRAINT [PK_Country] PRIMARY KEY ([CountryId2]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210511011824_des-18'
)
BEGIN
    CREATE TABLE [Employee] (
        [EmployeeId] nvarchar(20) NOT NULL DEFAULT (FORMAT((NEXT VALUE FOR dbo.EmployeeId),'EMP-00000000#')),
        [Name] nvarchar(50) NOT NULL,
        [LastName] nvarchar(50) NOT NULL,
        [PersonalTreatment] nvarchar(50) NULL,
        [BirthDate] datetime2 NOT NULL,
        [Gender] int NOT NULL,
        [Age] int NOT NULL,
        [DependentsNumbers] int NOT NULL,
        [MaritalStatus] int NOT NULL,
        [NSS] nvarchar(20) NOT NULL,
        [ARS] nvarchar(20) NOT NULL,
        [AFP] nvarchar(20) NOT NULL,
        [AdmissionDate] datetime2 NOT NULL,
        [Country] nvarchar(20) NOT NULL,
        [EmployeeType] int NOT NULL,
        [HomeOffice] bit NOT NULL,
        [OwnCar] bit NOT NULL,
        [HasDisability] bit NOT NULL,
        [WorkFrom] time NOT NULL,
        [WorkTo] time NOT NULL,
        [BreakWorkFrom] time NOT NULL,
        [BreakWorkTo] time NOT NULL,
        [Image] nvarchar(max) NULL,
        CONSTRAINT [PK_Employee] PRIMARY KEY ([EmployeeId]),
        CONSTRAINT [FK_Employee_Country_Country] FOREIGN KEY ([Country]) REFERENCES [Country] ([CountryId2]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210511011824_des-18'
)
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'CountryId2', N'CountryId', N'Name') AND [object_id] = OBJECT_ID(N'[Country]'))
        SET IDENTITY_INSERT [Country] ON;
    EXEC(N'INSERT INTO [Country] ([CountryId2], [CountryId], [Name])
    VALUES (N''DOM'', N''DOM'', N''República Dominicana'')');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'CountryId2', N'CountryId', N'Name') AND [object_id] = OBJECT_ID(N'[Country]'))
        SET IDENTITY_INSERT [Country] OFF;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210511011824_des-18'
)
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'CountryId2', N'CountryId', N'Name') AND [object_id] = OBJECT_ID(N'[Country]'))
        SET IDENTITY_INSERT [Country] ON;
    EXEC(N'INSERT INTO [Country] ([CountryId2], [CountryId], [Name])
    VALUES (N''CH'', N''CH'', N''Chile'')');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'CountryId2', N'CountryId', N'Name') AND [object_id] = OBJECT_ID(N'[Country]'))
        SET IDENTITY_INSERT [Country] OFF;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210511011824_des-18'
)
BEGIN
    CREATE INDEX [IX_Employee_Country] ON [Employee] ([Country]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210511011824_des-18'
)
BEGIN
    ALTER TABLE [Companies] ADD CONSTRAINT [FK_Companies_Country_CountryId] FOREIGN KEY ([CountryId]) REFERENCES [Country] ([CountryId2]) ON DELETE NO ACTION;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210511011824_des-18'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210511011824_des-18', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210511011940_des-19'
)
BEGIN
    ALTER TABLE [Companies] DROP CONSTRAINT [FK_Companies_Country_CountryId];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210511011940_des-19'
)
BEGIN
    ALTER TABLE [Employee] DROP CONSTRAINT [FK_Employee_Country_Country];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210511011940_des-19'
)
BEGIN
    ALTER TABLE [Country] DROP CONSTRAINT [PK_Country];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210511011940_des-19'
)
BEGIN
    DECLARE @var24 sysname;
    SELECT @var24 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Country]') AND [c].[name] = N'CountryId2');
    IF @var24 IS NOT NULL EXEC(N'ALTER TABLE [Country] DROP CONSTRAINT [' + @var24 + '];');
    ALTER TABLE [Country] DROP COLUMN [CountryId2];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210511011940_des-19'
)
BEGIN
    ALTER TABLE [Country] ADD CONSTRAINT [PK_Country] PRIMARY KEY ([CountryId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210511011940_des-19'
)
BEGIN
    ALTER TABLE [Companies] ADD CONSTRAINT [FK_Companies_Country_CountryId] FOREIGN KEY ([CountryId]) REFERENCES [Country] ([CountryId]) ON DELETE NO ACTION;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210511011940_des-19'
)
BEGIN
    ALTER TABLE [Employee] ADD CONSTRAINT [FK_Employee_Country_Country] FOREIGN KEY ([Country]) REFERENCES [Country] ([CountryId]) ON DELETE CASCADE;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210511011940_des-19'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210511011940_des-19', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210511234110_des-20'
)
BEGIN
    ALTER TABLE [Companies] DROP CONSTRAINT [FK_Companies_Country_CountryId];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210511234110_des-20'
)
BEGIN
    ALTER TABLE [Employee] DROP CONSTRAINT [FK_Employee_Country_Country];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210511234110_des-20'
)
BEGIN
    ALTER TABLE [Employee] DROP CONSTRAINT [PK_Employee];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210511234110_des-20'
)
BEGIN
    ALTER TABLE [Country] DROP CONSTRAINT [PK_Country];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210511234110_des-20'
)
BEGIN
    EXEC sp_rename N'[Employee]', N'Employees', 'OBJECT';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210511234110_des-20'
)
BEGIN
    EXEC sp_rename N'[Country]', N'Countries', 'OBJECT';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210511234110_des-20'
)
BEGIN
    EXEC sp_rename N'[Employees].[IX_Employee_Country]', N'IX_Employees_Country', 'INDEX';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210511234110_des-20'
)
BEGIN
    ALTER TABLE [Employees] ADD [EmployeeStatus] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210511234110_des-20'
)
BEGIN
    ALTER TABLE [Employees] ADD CONSTRAINT [PK_Employees] PRIMARY KEY ([EmployeeId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210511234110_des-20'
)
BEGIN
    ALTER TABLE [Countries] ADD CONSTRAINT [PK_Countries] PRIMARY KEY ([CountryId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210511234110_des-20'
)
BEGIN
    CREATE TABLE [CourseEmployees] (
        [EmployeeId] nvarchar(20) NOT NULL,
        [CourseId] nvarchar(20) NOT NULL,
        [Comment] nvarchar(300) NOT NULL,
        CONSTRAINT [PK_CourseEmployees] PRIMARY KEY ([CourseId], [EmployeeId]),
        CONSTRAINT [FK_CourseEmployees_Courses_CourseId] FOREIGN KEY ([CourseId]) REFERENCES [Courses] ([CourseId]) ON DELETE CASCADE,
        CONSTRAINT [FK_CourseEmployees_Instructors_EmployeeId] FOREIGN KEY ([EmployeeId]) REFERENCES [Instructors] ([InstructorId]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210511234110_des-20'
)
BEGIN
    CREATE TABLE [EmployeeImages] (
        [EmployeeId] nvarchar(450) NOT NULL,
        [Image] varbinary(max) NULL,
        [Extension] nvarchar(4) NOT NULL,
        CONSTRAINT [PK_EmployeeImages] PRIMARY KEY ([EmployeeId])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210511234110_des-20'
)
BEGIN
    CREATE INDEX [IX_CourseEmployees_EmployeeId] ON [CourseEmployees] ([EmployeeId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210511234110_des-20'
)
BEGIN
    ALTER TABLE [Companies] ADD CONSTRAINT [FK_Companies_Countries_CountryId] FOREIGN KEY ([CountryId]) REFERENCES [Countries] ([CountryId]) ON DELETE NO ACTION;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210511234110_des-20'
)
BEGIN
    ALTER TABLE [Employees] ADD CONSTRAINT [FK_Employees_Countries_Country] FOREIGN KEY ([Country]) REFERENCES [Countries] ([CountryId]) ON DELETE CASCADE;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210511234110_des-20'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210511234110_des-20', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210514155357_des-21'
)
BEGIN
    DECLARE @var25 sysname;
    SELECT @var25 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[PositionRequirements]') AND [c].[name] = N'Name');
    IF @var25 IS NOT NULL EXEC(N'ALTER TABLE [PositionRequirements] DROP CONSTRAINT [' + @var25 + '];');
    ALTER TABLE [PositionRequirements] ALTER COLUMN [Name] nvarchar(30) NOT NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210514155357_des-21'
)
BEGIN
    ALTER TABLE [PositionRequirements] ADD [RequirementId] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210514155357_des-21'
)
BEGIN
    CREATE TABLE [EmployeesAddress] (
        [InternalId] int NOT NULL,
        [EmployeeId] nvarchar(20) NOT NULL,
        [Street] nvarchar(100) NOT NULL,
        [Home] nvarchar(10) NOT NULL,
        [Sector] nvarchar(50) NOT NULL,
        [City] nvarchar(50) NOT NULL,
        [Province] nvarchar(50) NOT NULL,
        [Comment] nvarchar(200) NULL,
        [IsPrincipal] bit NOT NULL,
        CONSTRAINT [PK_EmployeesAddress] PRIMARY KEY ([EmployeeId], [InternalId]),
        CONSTRAINT [FK_EmployeesAddress_Employees_EmployeeId] FOREIGN KEY ([EmployeeId]) REFERENCES [Employees] ([EmployeeId]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210514155357_des-21'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210514155357_des-21', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210515022046_des-22'
)
BEGIN
    DECLARE @var26 sysname;
    SELECT @var26 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[PositionRequirements]') AND [c].[name] = N'RequirementId');
    IF @var26 IS NOT NULL EXEC(N'ALTER TABLE [PositionRequirements] DROP CONSTRAINT [' + @var26 + '];');
    ALTER TABLE [PositionRequirements] DROP COLUMN [RequirementId];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210515022046_des-22'
)
BEGIN
    ALTER TABLE [PositionRequirements] ADD CONSTRAINT [PK_PositionRequirements] PRIMARY KEY ([Name]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210515022046_des-22'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210515022046_des-22', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210518223551_des-23'
)
BEGIN
    DECLARE @var27 sysname;
    SELECT @var27 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Employees]') AND [c].[name] = N'Image');
    IF @var27 IS NOT NULL EXEC(N'ALTER TABLE [Employees] DROP CONSTRAINT [' + @var27 + '];');
    ALTER TABLE [Employees] DROP COLUMN [Image];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210518223551_des-23'
)
BEGIN
    CREATE TABLE [EmployeeBankAccounts] (
        [EmployeeId] nvarchar(20) NOT NULL,
        [InternalId] int NOT NULL,
        [BankName] nvarchar(100) NOT NULL,
        [AccountType] int NOT NULL,
        [AccountNum] nvarchar(30) NOT NULL,
        [Comment] nvarchar(200) NULL,
        [IsPrincipal] bit NOT NULL,
        CONSTRAINT [PK_EmployeeBankAccounts] PRIMARY KEY ([EmployeeId], [InternalId]),
        CONSTRAINT [FK_EmployeeBankAccounts_Employees_EmployeeId] FOREIGN KEY ([EmployeeId]) REFERENCES [Employees] ([EmployeeId]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210518223551_des-23'
)
BEGIN
    CREATE TABLE [EmployeeContactsInf] (
        [InternalId] int NOT NULL,
        [EmployeeId] nvarchar(20) NOT NULL,
        [NumberAddress] nvarchar(200) NOT NULL,
        [Comment] nvarchar(200) NULL,
        [IsPrincipal] bit NOT NULL,
        [ContactType] int NOT NULL,
        CONSTRAINT [PK_EmployeeContactsInf] PRIMARY KEY ([EmployeeId], [InternalId]),
        CONSTRAINT [FK_EmployeeContactsInf_Employees_EmployeeId] FOREIGN KEY ([EmployeeId]) REFERENCES [Employees] ([EmployeeId]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210518223551_des-23'
)
BEGIN
    CREATE TABLE [EmployeeDocuments] (
        [InternalId] int NOT NULL,
        [EmployeeId] nvarchar(20) NOT NULL,
        [DocumentType] int NOT NULL,
        [DocumentNumber] nvarchar(30) NOT NULL,
        [DueDate] datetime2 NOT NULL,
        [Comment] nvarchar(200) NULL,
        [FileAttach] varbinary(max) NULL,
        CONSTRAINT [PK_EmployeeDocuments] PRIMARY KEY ([EmployeeId], [InternalId]),
        CONSTRAINT [FK_EmployeeDocuments_Employees_EmployeeId] FOREIGN KEY ([EmployeeId]) REFERENCES [Employees] ([EmployeeId]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210518223551_des-23'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210518223551_des-23', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210519192323_des-24'
)
BEGIN
    CREATE TABLE [EmployeeDeductionCodes] (
        [DeductionCodeId] nvarchar(20) NOT NULL,
        [EmployeeId] nvarchar(20) NOT NULL,
        [FromDate] datetime2 NOT NULL,
        [ToDate] datetime2 NOT NULL,
        [IndexDeduction] decimal(18,2) NOT NULL,
        [PercentDeduction] decimal(18,2) NOT NULL,
        [PercentContribution] decimal(18,2) NOT NULL,
        [PayrollId] nvarchar(20) NOT NULL,
        [Comment] nvarchar(200) NOT NULL,
        CONSTRAINT [PK_EmployeeDeductionCodes] PRIMARY KEY ([DeductionCodeId], [EmployeeId]),
        CONSTRAINT [FK_EmployeeDeductionCodes_DeductionCodes_DeductionCodeId] FOREIGN KEY ([DeductionCodeId]) REFERENCES [DeductionCodes] ([DeductionCodeId]) ON DELETE CASCADE,
        CONSTRAINT [FK_EmployeeDeductionCodes_Employees_EmployeeId] FOREIGN KEY ([EmployeeId]) REFERENCES [Employees] ([EmployeeId]) ON DELETE CASCADE,
        CONSTRAINT [FK_EmployeeDeductionCodes_Payrolls_PayrollId] FOREIGN KEY ([PayrollId]) REFERENCES [Payrolls] ([PayrollId]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210519192323_des-24'
)
BEGIN
    CREATE TABLE [EmployeeEarningCodes] (
        [EarningCodeId] nvarchar(20) NOT NULL,
        [EmployeeId] nvarchar(20) NOT NULL,
        [FromDate] datetime2 NOT NULL,
        [ToDate] datetime2 NOT NULL,
        [IndexEarning] decimal(18,2) NOT NULL,
        [Quantity] int NOT NULL,
        [PayrollId] nvarchar(20) NOT NULL,
        [Comment] nvarchar(200) NOT NULL,
        CONSTRAINT [PK_EmployeeEarningCodes] PRIMARY KEY ([EarningCodeId], [EmployeeId]),
        CONSTRAINT [FK_EmployeeEarningCodes_EarningCodes_EarningCodeId] FOREIGN KEY ([EarningCodeId]) REFERENCES [EarningCodes] ([EarningCodeId]) ON DELETE CASCADE,
        CONSTRAINT [FK_EmployeeEarningCodes_Employees_EmployeeId] FOREIGN KEY ([EmployeeId]) REFERENCES [Employees] ([EmployeeId]) ON DELETE CASCADE,
        CONSTRAINT [FK_EmployeeEarningCodes_Payrolls_PayrollId] FOREIGN KEY ([PayrollId]) REFERENCES [Payrolls] ([PayrollId]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210519192323_des-24'
)
BEGIN
    CREATE INDEX [IX_EmployeeDeductionCodes_EmployeeId] ON [EmployeeDeductionCodes] ([EmployeeId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210519192323_des-24'
)
BEGIN
    CREATE INDEX [IX_EmployeeDeductionCodes_PayrollId] ON [EmployeeDeductionCodes] ([PayrollId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210519192323_des-24'
)
BEGIN
    CREATE INDEX [IX_EmployeeEarningCodes_EmployeeId] ON [EmployeeEarningCodes] ([EmployeeId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210519192323_des-24'
)
BEGIN
    CREATE INDEX [IX_EmployeeEarningCodes_PayrollId] ON [EmployeeEarningCodes] ([PayrollId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210519192323_des-24'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210519192323_des-24', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210611154200_des-25'
)
BEGIN
    CREATE TABLE [EmployeeDepartments] (
        [EmployeeId] nvarchar(450) NOT NULL,
        [DepartmentId] nvarchar(450) NOT NULL,
        [FromDate] datetime2 NOT NULL,
        [ToDate] datetime2 NOT NULL,
        [EmployeeDepartmentStatus] bit NOT NULL,
        [Comment] nvarchar(200) NULL,
        CONSTRAINT [PK_EmployeeDepartments] PRIMARY KEY ([EmployeeId], [DepartmentId])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210611154200_des-25'
)
BEGIN
    CREATE TABLE [EmployeePositions] (
        [EmployeeId] nvarchar(20) NOT NULL,
        [PositionId] nvarchar(20) NOT NULL,
        [FromDate] datetime2 NOT NULL,
        [ToDate] datetime2 NOT NULL,
        [EmployeePositionStatus] bit NOT NULL,
        [Comment] nvarchar(200) NOT NULL,
        CONSTRAINT [PK_EmployeePositions] PRIMARY KEY ([PositionId], [EmployeeId]),
        CONSTRAINT [FK_EmployeePositions_Employees_EmployeeId] FOREIGN KEY ([EmployeeId]) REFERENCES [Employees] ([EmployeeId]) ON DELETE CASCADE,
        CONSTRAINT [FK_EmployeePositions_Positions_PositionId] FOREIGN KEY ([PositionId]) REFERENCES [Positions] ([PositionId]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210611154200_des-25'
)
BEGIN
    CREATE INDEX [IX_EmployeePositions_EmployeeId] ON [EmployeePositions] ([EmployeeId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210611154200_des-25'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210611154200_des-25', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210611162436_des-26'
)
BEGIN
    ALTER TABLE [EmployeesAddress] ADD [CountryId] nvarchar(20) NOT NULL DEFAULT N'';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210611162436_des-26'
)
BEGIN
    CREATE INDEX [IX_EmployeesAddress_CountryId] ON [EmployeesAddress] ([CountryId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210611162436_des-26'
)
BEGIN
    ALTER TABLE [EmployeesAddress] ADD CONSTRAINT [FK_EmployeesAddress_Countries_CountryId] FOREIGN KEY ([CountryId]) REFERENCES [Countries] ([CountryId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210611162436_des-26'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210611162436_des-26', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210623000625_des-27'
)
BEGIN
    ALTER TABLE [EmployeeBankAccounts] ADD [Currency] nvarchar(5) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210623000625_des-27'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210623000625_des-27', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210708194600_des-28'
)
BEGIN
    ALTER TABLE [Companies] DROP CONSTRAINT [FK_Companies_Currency_CurrencyId];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210708194600_des-28'
)
BEGIN
    ALTER TABLE [Currency] DROP CONSTRAINT [PK_Currency];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210708194600_des-28'
)
BEGIN
    EXEC sp_rename N'[Currency]', N'Currencies', 'OBJECT';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210708194600_des-28'
)
BEGIN
    ALTER TABLE [Payrolls] ADD [CurrencyId] nvarchar(5) NOT NULL DEFAULT N'';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210708194600_des-28'
)
BEGIN
    DROP INDEX [IX_Companies_CurrencyId] ON [Companies];
    DECLARE @var28 sysname;
    SELECT @var28 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Companies]') AND [c].[name] = N'CurrencyId');
    IF @var28 IS NOT NULL EXEC(N'ALTER TABLE [Companies] DROP CONSTRAINT [' + @var28 + '];');
    ALTER TABLE [Companies] ALTER COLUMN [CurrencyId] nvarchar(5) NULL;
    CREATE INDEX [IX_Companies_CurrencyId] ON [Companies] ([CurrencyId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210708194600_des-28'
)
BEGIN
    DECLARE @var29 sysname;
    SELECT @var29 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Currencies]') AND [c].[name] = N'Name');
    IF @var29 IS NOT NULL EXEC(N'ALTER TABLE [Currencies] DROP CONSTRAINT [' + @var29 + '];');
    EXEC(N'UPDATE [Currencies] SET [Name] = N'''' WHERE [Name] IS NULL');
    ALTER TABLE [Currencies] ALTER COLUMN [Name] nvarchar(100) NOT NULL;
    ALTER TABLE [Currencies] ADD DEFAULT N'' FOR [Name];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210708194600_des-28'
)
BEGIN
    DECLARE @var30 sysname;
    SELECT @var30 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Currencies]') AND [c].[name] = N'CurrencyId');
    IF @var30 IS NOT NULL EXEC(N'ALTER TABLE [Currencies] DROP CONSTRAINT [' + @var30 + '];');
    ALTER TABLE [Currencies] ALTER COLUMN [CurrencyId] nvarchar(5) NOT NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210708194600_des-28'
)
BEGIN
    ALTER TABLE [Currencies] ADD CONSTRAINT [PK_Currencies] PRIMARY KEY ([CurrencyId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210708194600_des-28'
)
BEGIN
    ALTER TABLE [Companies] ADD CONSTRAINT [FK_Companies_Currencies_CurrencyId] FOREIGN KEY ([CurrencyId]) REFERENCES [Currencies] ([CurrencyId]) ON DELETE NO ACTION;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210708194600_des-28'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210708194600_des-28', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210724200951_des-29'
)
BEGIN
    CREATE SEQUENCE [LoanId] AS int START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 999999999 NO CYCLE;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210724200951_des-29'
)
BEGIN
    CREATE SEQUENCE [PayrollProcessId] AS int START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 999999999 NO CYCLE;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210724200951_des-29'
)
BEGIN
    CREATE SEQUENCE [ProcessDetailsId] AS int START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 999999999 NO CYCLE;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210724200951_des-29'
)
BEGIN
    CREATE SEQUENCE [ProjCategoryId] AS int START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 999999999 NO CYCLE;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210724200951_des-29'
)
BEGIN
    CREATE SEQUENCE [ProjId] AS int START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 999999999 NO CYCLE;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210724200951_des-29'
)
BEGIN
    ALTER TABLE [Employees] ADD [EndWorkDate] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210724200951_des-29'
)
BEGIN
    ALTER TABLE [Employees] ADD [PayMethod] int NOT NULL DEFAULT 0;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210724200951_des-29'
)
BEGIN
    ALTER TABLE [Employees] ADD [StartWorkDate] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210724200951_des-29'
)
BEGIN
    ALTER TABLE [EmployeeDocuments] ADD [IsPrincipal] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210724200951_des-29'
)
BEGIN
    CREATE TABLE [EmployeeLoans] (
        [LoanId] nvarchar(450) NOT NULL,
        [EmployeeId] nvarchar(20) NOT NULL,
        [ValidTo] datetime2 NOT NULL,
        [ValidFrom] datetime2 NOT NULL,
        [LoanAmount] decimal(18,2) NOT NULL,
        [PayDays] int NOT NULL,
        [PaidAmount] decimal(18,2) NOT NULL,
        [PendingAmount] decimal(18,2) NOT NULL,
        [PayrollId] nvarchar(20) NOT NULL,
        [PayFrecuency] int NOT NULL,
        CONSTRAINT [PK_EmployeeLoans] PRIMARY KEY ([LoanId], [EmployeeId]),
        CONSTRAINT [FK_EmployeeLoans_Employees_EmployeeId] FOREIGN KEY ([EmployeeId]) REFERENCES [Employees] ([EmployeeId]) ON DELETE CASCADE,
        CONSTRAINT [FK_EmployeeLoans_Payrolls_PayrollId] FOREIGN KEY ([PayrollId]) REFERENCES [Payrolls] ([PayrollId]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210724200951_des-29'
)
BEGIN
    CREATE TABLE [PayrollsProcess] (
        [PayrollProcessId] nvarchar(20) NOT NULL DEFAULT (FORMAT((NEXT VALUE FOR dbo.PayrollProcessId),'PPAY-00000000#')),
        [PayrollId] nvarchar(20) NULL,
        [Description] nvarchar(200) NULL,
        [PaymentDate] datetime2 NOT NULL,
        [EmployeeQuantity] int NOT NULL,
        [ProjId] nvarchar(20) NULL,
        [ProjCategoryId] nvarchar(20) NULL,
        [PeriodStartDate] datetime2 NOT NULL,
        [PeriodEndDate] datetime2 NOT NULL,
        [PayCycleId] int NOT NULL,
        [EmployeeQuantityForPay] int NOT NULL,
        [PayrollProcessStatus] int NOT NULL,
        CONSTRAINT [PK_PayrollsProcess] PRIMARY KEY ([PayrollProcessId]),
        CONSTRAINT [FK_PayrollsProcess_Payrolls_PayrollId] FOREIGN KEY ([PayrollId]) REFERENCES [Payrolls] ([PayrollId])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210724200951_des-29'
)
BEGIN
    CREATE TABLE [ProjCategories] (
        [ProjCategoryId] nvarchar(20) NOT NULL DEFAULT (FORMAT((NEXT VALUE FOR dbo.ProjCategoryId),'PRJC-00000000#')),
        [CategoryName] nvarchar(100) NOT NULL,
        [LedgerAccount] nvarchar(20) NULL,
        [ProjCategoryStatus] bit NOT NULL,
        [CreatedBy] nvarchar(10) NULL,
        [CreatedOn] datetime2 NOT NULL,
        [ModifiedBy] nvarchar(10) NULL,
        [ModifiedOn] datetime2 NOT NULL,
        CONSTRAINT [PK_ProjCategories] PRIMARY KEY ([ProjCategoryId])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210724200951_des-29'
)
BEGIN
    CREATE TABLE [Projects] (
        [ProjId] nvarchar(20) NOT NULL DEFAULT (FORMAT((NEXT VALUE FOR dbo.ProjId),'PRJ-00000000#')),
        [Name] nvarchar(100) NOT NULL,
        [LedgerAccount] nvarchar(20) NULL,
        [ProjStatus] bit NOT NULL,
        [CreatedBy] nvarchar(10) NULL,
        [CreatedOn] datetime2 NOT NULL,
        [ModifiedBy] nvarchar(10) NULL,
        [ModifiedOn] datetime2 NOT NULL,
        CONSTRAINT [PK_Projects] PRIMARY KEY ([ProjId])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210724200951_des-29'
)
BEGIN
    CREATE TABLE [PayrollProcessAction] (
        [InternalId] int NOT NULL,
        [PayrollProcessId] nvarchar(20) NOT NULL,
        [EmployeeId] nvarchar(20) NOT NULL,
        [PayrollActionType] int NOT NULL,
        [ActionName] nvarchar(100) NOT NULL,
        [ActionAmount] decimal(18,2) NOT NULL,
        [ApplyTax] bit NOT NULL,
        [ApplyTSS] bit NOT NULL,
        CONSTRAINT [PK_PayrollProcessAction] PRIMARY KEY ([InternalId], [PayrollProcessId], [EmployeeId]),
        CONSTRAINT [FK_PayrollProcessAction_Employees_EmployeeId] FOREIGN KEY ([EmployeeId]) REFERENCES [Employees] ([EmployeeId]) ON DELETE CASCADE,
        CONSTRAINT [FK_PayrollProcessAction_PayrollsProcess_PayrollProcessId] FOREIGN KEY ([PayrollProcessId]) REFERENCES [PayrollsProcess] ([PayrollProcessId]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210724200951_des-29'
)
BEGIN
    CREATE TABLE [PayrollProcessDetails] (
        [PayrollProcessId] nvarchar(20) NOT NULL,
        [EmployeeId] nvarchar(20) NOT NULL,
        [TotalAmount] decimal(18,2) NOT NULL,
        [TotalTaxAmount] decimal(18,2) NOT NULL,
        [PayMethod] int NOT NULL,
        [BankAccount] nvarchar(30) NULL,
        [BankName] nvarchar(100) NULL,
        [Document] nvarchar(30) NULL,
        [DepartmentId] nvarchar(20) NULL,
        [DepartmentName] nvarchar(60) NULL,
        [PayrollProcessStatus] int NOT NULL,
        CONSTRAINT [PK_PayrollProcessDetails] PRIMARY KEY ([PayrollProcessId], [EmployeeId]),
        CONSTRAINT [FK_PayrollProcessDetails_Departments_DepartmentId] FOREIGN KEY ([DepartmentId]) REFERENCES [Departments] ([DepartmentId]) ON DELETE NO ACTION,
        CONSTRAINT [FK_PayrollProcessDetails_Employees_EmployeeId] FOREIGN KEY ([EmployeeId]) REFERENCES [Employees] ([EmployeeId]) ON DELETE CASCADE,
        CONSTRAINT [FK_PayrollProcessDetails_PayrollsProcess_PayrollProcessId] FOREIGN KEY ([PayrollProcessId]) REFERENCES [PayrollsProcess] ([PayrollProcessId]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210724200951_des-29'
)
BEGIN
    CREATE TABLE [Loans] (
        [LoanId] nvarchar(20) NOT NULL DEFAULT (FORMAT((NEXT VALUE FOR dbo.LoanId),'LO-00000000#')),
        [Name] nvarchar(50) NOT NULL,
        [ValidTo] datetime2 NOT NULL,
        [ValidFrom] datetime2 NOT NULL,
        [MultiplyAmount] decimal(18,2) NOT NULL,
        [LedgerAccount] nvarchar(30) NOT NULL,
        [Description] nvarchar(200) NULL,
        [PayFrecuency] int NOT NULL,
        [IndexBase] int NOT NULL,
        [DepartmentId] nvarchar(20) NULL,
        [ProjCategoryId] nvarchar(20) NULL,
        [ProjId] nvarchar(20) NULL,
        CONSTRAINT [PK_Loans] PRIMARY KEY ([LoanId]),
        CONSTRAINT [FK_Loans_Departments_DepartmentId] FOREIGN KEY ([DepartmentId]) REFERENCES [Departments] ([DepartmentId]) ON DELETE NO ACTION,
        CONSTRAINT [FK_Loans_ProjCategories_ProjCategoryId] FOREIGN KEY ([ProjCategoryId]) REFERENCES [ProjCategories] ([ProjCategoryId]) ON DELETE NO ACTION,
        CONSTRAINT [FK_Loans_Projects_ProjId] FOREIGN KEY ([ProjId]) REFERENCES [Projects] ([ProjId]) ON DELETE NO ACTION
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210724200951_des-29'
)
BEGIN
    CREATE TABLE [Taxes] (
        [TaxId] nvarchar(20) NOT NULL,
        [Name] nvarchar(100) NULL,
        [LedgerAccount] nvarchar(30) NULL,
        [ValidFrom] datetime2 NOT NULL,
        [ValidTo] datetime2 NOT NULL,
        [Currency] nvarchar(5) NOT NULL,
        [MultiplyAmount] decimal(18,2) NOT NULL,
        [PayFrecuency] int NOT NULL,
        [Description] nvarchar(200) NULL,
        [LimitPeriod] nvarchar(20) NULL,
        [LimitAmount] decimal(18,2) NOT NULL,
        [IndexBase] int NOT NULL,
        [ProjId] nvarchar(20) NOT NULL,
        [ProjCategory] nvarchar(20) NOT NULL,
        [DepartmentId] nvarchar(20) NOT NULL,
        [TaxStatus] bit NOT NULL,
        [CreatedBy] nvarchar(10) NULL,
        [CreatedOn] datetime2 NOT NULL,
        [ModifiedBy] nvarchar(10) NULL,
        [ModifiedOn] datetime2 NOT NULL,
        CONSTRAINT [PK_Taxes] PRIMARY KEY ([TaxId]),
        CONSTRAINT [FK_Taxes_Departments_DepartmentId] FOREIGN KEY ([DepartmentId]) REFERENCES [Departments] ([DepartmentId]) ON DELETE CASCADE,
        CONSTRAINT [FK_Taxes_ProjCategories_ProjCategory] FOREIGN KEY ([ProjCategory]) REFERENCES [ProjCategories] ([ProjCategoryId]) ON DELETE CASCADE,
        CONSTRAINT [FK_Taxes_Projects_ProjId] FOREIGN KEY ([ProjId]) REFERENCES [Projects] ([ProjId]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210724200951_des-29'
)
BEGIN
    CREATE TABLE [TaxDetails] (
        [InternalId] int NOT NULL,
        [TaxId] nvarchar(20) NOT NULL,
        [AnnualAmountHigher] decimal(18,2) NOT NULL,
        [AnnualAmountNotExceed] decimal(18,2) NOT NULL,
        [Percent] decimal(18,2) NOT NULL,
        [FixedAmount] decimal(18,2) NOT NULL,
        [ApplicableScale] decimal(18,2) NOT NULL,
        CONSTRAINT [PK_TaxDetails] PRIMARY KEY ([InternalId], [TaxId]),
        CONSTRAINT [FK_TaxDetails_Taxes_TaxId] FOREIGN KEY ([TaxId]) REFERENCES [Taxes] ([TaxId]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210724200951_des-29'
)
BEGIN
    CREATE INDEX [IX_EmployeeLoans_EmployeeId] ON [EmployeeLoans] ([EmployeeId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210724200951_des-29'
)
BEGIN
    CREATE INDEX [IX_EmployeeLoans_PayrollId] ON [EmployeeLoans] ([PayrollId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210724200951_des-29'
)
BEGIN
    CREATE INDEX [IX_Loans_DepartmentId] ON [Loans] ([DepartmentId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210724200951_des-29'
)
BEGIN
    CREATE INDEX [IX_Loans_ProjCategoryId] ON [Loans] ([ProjCategoryId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210724200951_des-29'
)
BEGIN
    CREATE INDEX [IX_Loans_ProjId] ON [Loans] ([ProjId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210724200951_des-29'
)
BEGIN
    CREATE INDEX [IX_PayrollProcessAction_EmployeeId] ON [PayrollProcessAction] ([EmployeeId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210724200951_des-29'
)
BEGIN
    CREATE INDEX [IX_PayrollProcessAction_PayrollProcessId] ON [PayrollProcessAction] ([PayrollProcessId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210724200951_des-29'
)
BEGIN
    CREATE INDEX [IX_PayrollProcessDetails_DepartmentId] ON [PayrollProcessDetails] ([DepartmentId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210724200951_des-29'
)
BEGIN
    CREATE INDEX [IX_PayrollProcessDetails_EmployeeId] ON [PayrollProcessDetails] ([EmployeeId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210724200951_des-29'
)
BEGIN
    CREATE INDEX [IX_PayrollsProcess_PayrollId] ON [PayrollsProcess] ([PayrollId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210724200951_des-29'
)
BEGIN
    CREATE INDEX [IX_TaxDetails_TaxId] ON [TaxDetails] ([TaxId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210724200951_des-29'
)
BEGIN
    CREATE INDEX [IX_Taxes_DepartmentId] ON [Taxes] ([DepartmentId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210724200951_des-29'
)
BEGIN
    CREATE INDEX [IX_Taxes_ProjCategory] ON [Taxes] ([ProjCategory]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210724200951_des-29'
)
BEGIN
    CREATE INDEX [IX_Taxes_ProjId] ON [Taxes] ([ProjId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210724200951_des-29'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210724200951_des-29', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210729203656_des-30'
)
BEGIN
    ALTER TABLE [PayrollsProcess] ADD [IsPayCycleTax] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210729203656_des-30'
)
BEGIN
    ALTER TABLE [PayrollsProcess] ADD [UsedForTax] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210729203656_des-30'
)
BEGIN
    ALTER TABLE [PayrollProcessDetails] ADD [EmployeeName] nvarchar(50) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210729203656_des-30'
)
BEGIN
    ALTER TABLE [PayCycles] ADD [IsForTax] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210729203656_des-30'
)
BEGIN
    ALTER TABLE [EmployeeEarningCodes] ADD [QtyPeriodForPaid] int NOT NULL DEFAULT 0;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210729203656_des-30'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210729203656_des-30', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210731183332_des-31'
)
BEGIN
    ALTER TABLE [PayrollProcessAction] DROP CONSTRAINT [FK_PayrollProcessAction_Employees_EmployeeId];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210731183332_des-31'
)
BEGIN
    ALTER TABLE [PayrollProcessAction] DROP CONSTRAINT [FK_PayrollProcessAction_PayrollsProcess_PayrollProcessId];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210731183332_des-31'
)
BEGIN
    ALTER TABLE [PayrollProcessAction] DROP CONSTRAINT [PK_PayrollProcessAction];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210731183332_des-31'
)
BEGIN
    EXEC sp_rename N'[PayrollProcessAction]', N'PayrollProcessActions', 'OBJECT';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210731183332_des-31'
)
BEGIN
    EXEC sp_rename N'[PayrollProcessActions].[IX_PayrollProcessAction_PayrollProcessId]', N'IX_PayrollProcessActions_PayrollProcessId', 'INDEX';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210731183332_des-31'
)
BEGIN
    EXEC sp_rename N'[PayrollProcessActions].[IX_PayrollProcessAction_EmployeeId]', N'IX_PayrollProcessActions_EmployeeId', 'INDEX';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210731183332_des-31'
)
BEGIN
    ALTER TABLE [Loans] ADD [LoanStatus] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210731183332_des-31'
)
BEGIN
    ALTER TABLE [PayrollProcessActions] ADD CONSTRAINT [PK_PayrollProcessActions] PRIMARY KEY ([InternalId], [PayrollProcessId], [EmployeeId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210731183332_des-31'
)
BEGIN
    ALTER TABLE [PayrollProcessActions] ADD CONSTRAINT [FK_PayrollProcessActions_Employees_EmployeeId] FOREIGN KEY ([EmployeeId]) REFERENCES [Employees] ([EmployeeId]) ON DELETE CASCADE;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210731183332_des-31'
)
BEGIN
    ALTER TABLE [PayrollProcessActions] ADD CONSTRAINT [FK_PayrollProcessActions_PayrollsProcess_PayrollProcessId] FOREIGN KEY ([PayrollProcessId]) REFERENCES [PayrollsProcess] ([PayrollProcessId]) ON DELETE CASCADE;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210731183332_des-31'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210731183332_des-31', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210802232007_des-32'
)
BEGIN
    EXEC sp_rename N'[EmployeeLoans].[PayFrecuency]', N'TotalDues', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210802232007_des-32'
)
BEGIN
    EXEC sp_rename N'[EmployeeLoans].[PayDays]', N'StartPeriodForPaid', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210802232007_des-32'
)
BEGIN
    ALTER TABLE [EmployeeLoans] ADD [PendingDues] int NOT NULL DEFAULT 0;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210802232007_des-32'
)
BEGIN
    ALTER TABLE [EmployeeLoans] ADD [QtyPeriodForPaid] int NOT NULL DEFAULT 0;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210802232007_des-32'
)
BEGIN
    ALTER TABLE [EmployeeEarningCodes] ADD [StartPeriodForPaid] int NOT NULL DEFAULT 0;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210802232007_des-32'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210802232007_des-32', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210803180051_des-33'
)
BEGIN
    ALTER TABLE [EmployeeLoans] ADD [AmountByDues] decimal(18,2) NOT NULL DEFAULT 0.0;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210803180051_des-33'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210803180051_des-33', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210809214000_des-34'
)
BEGIN
    DECLARE @var31 sysname;
    SELECT @var31 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeePositions]') AND [c].[name] = N'Comment');
    IF @var31 IS NOT NULL EXEC(N'ALTER TABLE [EmployeePositions] DROP CONSTRAINT [' + @var31 + '];');
    ALTER TABLE [EmployeePositions] ALTER COLUMN [Comment] nvarchar(200) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210809214000_des-34'
)
BEGIN
    CREATE TABLE [EmployeeTaxes] (
        [TaxId] nvarchar(450) NOT NULL,
        [EmployeeId] nvarchar(20) NOT NULL,
        [ValidTo] datetime2 NOT NULL,
        [ValidFrom] datetime2 NOT NULL,
        [PayrollId] nvarchar(20) NOT NULL,
        CONSTRAINT [PK_EmployeeTaxes] PRIMARY KEY ([TaxId], [EmployeeId]),
        CONSTRAINT [FK_EmployeeTaxes_Employees_EmployeeId] FOREIGN KEY ([EmployeeId]) REFERENCES [Employees] ([EmployeeId]) ON DELETE CASCADE,
        CONSTRAINT [FK_EmployeeTaxes_Payrolls_PayrollId] FOREIGN KEY ([PayrollId]) REFERENCES [Payrolls] ([PayrollId]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210809214000_des-34'
)
BEGIN
    CREATE INDEX [IX_EmployeeTaxes_EmployeeId] ON [EmployeeTaxes] ([EmployeeId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210809214000_des-34'
)
BEGIN
    CREATE INDEX [IX_EmployeeTaxes_PayrollId] ON [EmployeeTaxes] ([PayrollId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210809214000_des-34'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210809214000_des-34', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210810235353_des-35'
)
BEGIN
    ALTER TABLE [EmployeeEarningCodes] DROP CONSTRAINT [PK_EmployeeEarningCodes];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210810235353_des-35'
)
BEGIN
    DECLARE @var32 sysname;
    SELECT @var32 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeEarningCodes]') AND [c].[name] = N'Comment');
    IF @var32 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeEarningCodes] DROP CONSTRAINT [' + @var32 + '];');
    ALTER TABLE [EmployeeEarningCodes] ALTER COLUMN [Comment] nvarchar(200) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210810235353_des-35'
)
BEGIN
    ALTER TABLE [EmployeeEarningCodes] ADD CONSTRAINT [PK_EmployeeEarningCodes] PRIMARY KEY ([EarningCodeId], [EmployeeId], [PayrollId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210810235353_des-35'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210810235353_des-35', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210811021855_des-36'
)
BEGIN
    DECLARE @var33 sysname;
    SELECT @var33 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EarningCodes]') AND [c].[name] = N'ProjId');
    IF @var33 IS NOT NULL EXEC(N'ALTER TABLE [EarningCodes] DROP CONSTRAINT [' + @var33 + '];');
    ALTER TABLE [EarningCodes] ALTER COLUMN [ProjId] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210811021855_des-36'
)
BEGIN
    DECLARE @var34 sysname;
    SELECT @var34 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EarningCodes]') AND [c].[name] = N'LedgerAccount');
    IF @var34 IS NOT NULL EXEC(N'ALTER TABLE [EarningCodes] DROP CONSTRAINT [' + @var34 + '];');
    ALTER TABLE [EarningCodes] ALTER COLUMN [LedgerAccount] nvarchar(30) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210811021855_des-36'
)
BEGIN
    DECLARE @var35 sysname;
    SELECT @var35 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EarningCodes]') AND [c].[name] = N'Department');
    IF @var35 IS NOT NULL EXEC(N'ALTER TABLE [EarningCodes] DROP CONSTRAINT [' + @var35 + '];');
    ALTER TABLE [EarningCodes] ALTER COLUMN [Department] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210811021855_des-36'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210811021855_des-36', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210811201216_des-37'
)
BEGIN
    ALTER TABLE [EmployeeDeductionCodes] DROP CONSTRAINT [PK_EmployeeDeductionCodes];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210811201216_des-37'
)
BEGIN
    DECLARE @var36 sysname;
    SELECT @var36 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeDeductionCodes]') AND [c].[name] = N'Comment');
    IF @var36 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeDeductionCodes] DROP CONSTRAINT [' + @var36 + '];');
    ALTER TABLE [EmployeeDeductionCodes] ALTER COLUMN [Comment] nvarchar(200) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210811201216_des-37'
)
BEGIN
    ALTER TABLE [EmployeeDeductionCodes] ADD CONSTRAINT [PK_EmployeeDeductionCodes] PRIMARY KEY ([DeductionCodeId], [EmployeeId], [PayrollId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210811201216_des-37'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210811201216_des-37', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210811225552_des-38'
)
BEGIN
    DECLARE @var37 sysname;
    SELECT @var37 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[DeductionCodes]') AND [c].[name] = N'ProjId');
    IF @var37 IS NOT NULL EXEC(N'ALTER TABLE [DeductionCodes] DROP CONSTRAINT [' + @var37 + '];');
    ALTER TABLE [DeductionCodes] ALTER COLUMN [ProjId] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210811225552_des-38'
)
BEGIN
    DECLARE @var38 sysname;
    SELECT @var38 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[DeductionCodes]') AND [c].[name] = N'LedgerAccount');
    IF @var38 IS NOT NULL EXEC(N'ALTER TABLE [DeductionCodes] DROP CONSTRAINT [' + @var38 + '];');
    ALTER TABLE [DeductionCodes] ALTER COLUMN [LedgerAccount] nvarchar(30) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210811225552_des-38'
)
BEGIN
    DECLARE @var39 sysname;
    SELECT @var39 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[DeductionCodes]') AND [c].[name] = N'Department');
    IF @var39 IS NOT NULL EXEC(N'ALTER TABLE [DeductionCodes] DROP CONSTRAINT [' + @var39 + '];');
    ALTER TABLE [DeductionCodes] ALTER COLUMN [Department] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210811225552_des-38'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210811225552_des-38', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210812235809_des-39'
)
BEGIN
    DECLARE @var40 sysname;
    SELECT @var40 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EarningCodes]') AND [c].[name] = N'Description');
    IF @var40 IS NOT NULL EXEC(N'ALTER TABLE [EarningCodes] DROP CONSTRAINT [' + @var40 + '];');
    ALTER TABLE [EarningCodes] ALTER COLUMN [Description] nvarchar(200) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210812235809_des-39'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210812235809_des-39', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210813003307_des-40'
)
BEGIN
    DECLARE @var41 sysname;
    SELECT @var41 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EarningCodes]') AND [c].[name] = N'EarningCodeId');
    IF @var41 IS NOT NULL EXEC(N'ALTER TABLE [EarningCodes] DROP CONSTRAINT [' + @var41 + '];');
    ALTER TABLE [EarningCodes] ADD DEFAULT (FORMAT((NEXT VALUE FOR dbo.EarningCodeId),'EC-00000000#')) FOR [EarningCodeId];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210813003307_des-40'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210813003307_des-40', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210817232452_des-41'
)
BEGIN
    ALTER TABLE [Payrolls] ADD [PayrollStatus] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210817232452_des-41'
)
BEGIN
    ALTER TABLE [EarningCodes] ADD [EarningCodeStatus] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210817232452_des-41'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210817232452_des-41', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210819170658_des-42'
)
BEGIN
    ALTER TABLE [DeductionCodes] ADD [DeductionStatus] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210819170658_des-42'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210819170658_des-42', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210819172746_des-43'
)
BEGIN
    ALTER TABLE [Loans] DROP CONSTRAINT [FK_Loans_Departments_DepartmentId];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210819172746_des-43'
)
BEGIN
    ALTER TABLE [Loans] DROP CONSTRAINT [FK_Loans_ProjCategories_ProjCategoryId];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210819172746_des-43'
)
BEGIN
    ALTER TABLE [Loans] DROP CONSTRAINT [FK_Loans_Projects_ProjId];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210819172746_des-43'
)
BEGIN
    DROP INDEX [IX_Loans_DepartmentId] ON [Loans];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210819172746_des-43'
)
BEGIN
    DROP INDEX [IX_Loans_ProjCategoryId] ON [Loans];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210819172746_des-43'
)
BEGIN
    DROP INDEX [IX_Loans_ProjId] ON [Loans];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210819172746_des-43'
)
BEGIN
    DECLARE @var42 sysname;
    SELECT @var42 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Loans]') AND [c].[name] = N'LedgerAccount');
    IF @var42 IS NOT NULL EXEC(N'ALTER TABLE [Loans] DROP CONSTRAINT [' + @var42 + '];');
    ALTER TABLE [Loans] ALTER COLUMN [LedgerAccount] nvarchar(30) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210819172746_des-43'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210819172746_des-43', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210819203837_des-44'
)
BEGIN
    ALTER TABLE [EarningCodes] ADD [IsExtraHours] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210819203837_des-44'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210819203837_des-44', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210823173142_des-45'
)
BEGIN
    ALTER TABLE [PositionRequirements] DROP CONSTRAINT [PK_PositionRequirements];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210823173142_des-45'
)
BEGIN
    ALTER TABLE [PositionRequirements] ADD CONSTRAINT [PK_PositionRequirements] PRIMARY KEY ([Name], [PositionId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210823173142_des-45'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210823173142_des-45', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210824225813_des-46'
)
BEGIN
    ALTER TABLE [EmployeeLoans] DROP CONSTRAINT [PK_EmployeeLoans];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210824225813_des-46'
)
BEGIN
    ALTER TABLE [EmployeeLoans] ADD CONSTRAINT [PK_EmployeeLoans] PRIMARY KEY ([LoanId], [EmployeeId], [PayrollId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210824225813_des-46'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210824225813_des-46', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210825192130_des-47'
)
BEGIN
    ALTER TABLE [EmployeeLoans] DROP CONSTRAINT [PK_EmployeeLoans];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210825192130_des-47'
)
BEGIN
    DROP INDEX [IX_EmployeeLoans_EmployeeId] ON [EmployeeLoans];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210825192130_des-47'
)
BEGIN
    DECLARE @var43 sysname;
    SELECT @var43 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeLoans]') AND [c].[name] = N'LoanId');
    IF @var43 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeLoans] DROP CONSTRAINT [' + @var43 + '];');
    ALTER TABLE [EmployeeLoans] ALTER COLUMN [LoanId] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210825192130_des-47'
)
BEGIN
    ALTER TABLE [EmployeeLoans] ADD CONSTRAINT [PK_EmployeeLoans] PRIMARY KEY ([EmployeeId], [PayrollId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210825192130_des-47'
)
BEGIN
    CREATE TABLE [EmployeeExtraHours] (
        [WorkedDay] datetime2 NOT NULL,
        [PayrollId] nvarchar(20) NOT NULL,
        [EarningCodeId] nvarchar(20) NOT NULL,
        [StartHour] int NOT NULL,
        [EndHour] int NOT NULL,
        [TotalHour] int NOT NULL,
        [TotalExtraHour] int NOT NULL,
        [Amount] decimal(18,2) NOT NULL,
        [Indice] decimal(18,2) NOT NULL,
        [Quantity] int NOT NULL,
        [StatusExtraHour] int NOT NULL,
        [EmployeeId] nvarchar(20) NOT NULL,
        CONSTRAINT [PK_EmployeeExtraHours] PRIMARY KEY ([EarningCodeId], [WorkedDay], [PayrollId]),
        CONSTRAINT [FK_EmployeeExtraHours_EarningCodes_EarningCodeId] FOREIGN KEY ([EarningCodeId]) REFERENCES [EarningCodes] ([EarningCodeId]) ON DELETE CASCADE,
        CONSTRAINT [FK_EmployeeExtraHours_Employees_EmployeeId] FOREIGN KEY ([EmployeeId]) REFERENCES [Employees] ([EmployeeId]) ON DELETE CASCADE,
        CONSTRAINT [FK_EmployeeExtraHours_Payrolls_PayrollId] FOREIGN KEY ([PayrollId]) REFERENCES [Payrolls] ([PayrollId]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210825192130_des-47'
)
BEGIN
    CREATE INDEX [IX_EmployeeExtraHours_EmployeeId] ON [EmployeeExtraHours] ([EmployeeId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210825192130_des-47'
)
BEGIN
    CREATE INDEX [IX_EmployeeExtraHours_PayrollId] ON [EmployeeExtraHours] ([PayrollId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210825192130_des-47'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210825192130_des-47', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210827192330_des-48'
)
BEGIN
    ALTER TABLE [EmployeeLoans] DROP CONSTRAINT [PK_EmployeeLoans];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210827192330_des-48'
)
BEGIN
    ALTER TABLE [EmployeeExtraHours] DROP CONSTRAINT [PK_EmployeeExtraHours];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210827192330_des-48'
)
BEGIN
    DROP INDEX [IX_EmployeeExtraHours_EmployeeId] ON [EmployeeExtraHours];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210827192330_des-48'
)
BEGIN
    DECLARE @var44 sysname;
    SELECT @var44 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeExtraHours]') AND [c].[name] = N'TotalExtraHour');
    IF @var44 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeExtraHours] DROP CONSTRAINT [' + @var44 + '];');
    ALTER TABLE [EmployeeExtraHours] DROP COLUMN [TotalExtraHour];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210827192330_des-48'
)
BEGIN
    DECLARE @var45 sysname;
    SELECT @var45 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeExtraHours]') AND [c].[name] = N'TotalHour');
    IF @var45 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeExtraHours] DROP CONSTRAINT [' + @var45 + '];');
    ALTER TABLE [EmployeeExtraHours] DROP COLUMN [TotalHour];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210827192330_des-48'
)
BEGIN
    DECLARE @var46 sysname;
    SELECT @var46 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeLoans]') AND [c].[name] = N'LoanId');
    IF @var46 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeLoans] DROP CONSTRAINT [' + @var46 + '];');
    EXEC(N'UPDATE [EmployeeLoans] SET [LoanId] = N'''' WHERE [LoanId] IS NULL');
    ALTER TABLE [EmployeeLoans] ALTER COLUMN [LoanId] nvarchar(20) NOT NULL;
    ALTER TABLE [EmployeeLoans] ADD DEFAULT N'' FOR [LoanId];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210827192330_des-48'
)
BEGIN
    ALTER TABLE [EmployeeLoans] ADD CONSTRAINT [PK_EmployeeLoans] PRIMARY KEY ([LoanId], [EmployeeId], [PayrollId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210827192330_des-48'
)
BEGIN
    ALTER TABLE [EmployeeExtraHours] ADD CONSTRAINT [PK_EmployeeExtraHours] PRIMARY KEY ([EmployeeId], [EarningCodeId], [WorkedDay]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210827192330_des-48'
)
BEGIN
    CREATE INDEX [IX_EmployeeLoans_EmployeeId] ON [EmployeeLoans] ([EmployeeId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210827192330_des-48'
)
BEGIN
    CREATE INDEX [IX_EmployeeExtraHours_EarningCodeId] ON [EmployeeExtraHours] ([EarningCodeId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210827192330_des-48'
)
BEGIN
    ALTER TABLE [EmployeeLoans] ADD CONSTRAINT [FK_EmployeeLoans_Loans_LoanId] FOREIGN KEY ([LoanId]) REFERENCES [Loans] ([LoanId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210827192330_des-48'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210827192330_des-48', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210831214312_des-49'
)
BEGIN
    DECLARE @var47 sysname;
    SELECT @var47 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeExtraHours]') AND [c].[name] = N'EndHour');
    IF @var47 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeExtraHours] DROP CONSTRAINT [' + @var47 + '];');
    ALTER TABLE [EmployeeExtraHours] DROP COLUMN [EndHour];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210831214312_des-49'
)
BEGIN
    DECLARE @var48 sysname;
    SELECT @var48 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeExtraHours]') AND [c].[name] = N'StartHour');
    IF @var48 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeExtraHours] DROP CONSTRAINT [' + @var48 + '];');
    ALTER TABLE [EmployeeExtraHours] DROP COLUMN [StartHour];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210831214312_des-49'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210831214312_des-49', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210831214620_des-50'
)
BEGIN
    ALTER TABLE [EmployeeExtraHours] ADD [EndHour] time NOT NULL DEFAULT '00:00:00';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210831214620_des-50'
)
BEGIN
    ALTER TABLE [EmployeeExtraHours] ADD [StartHour] time NOT NULL DEFAULT '00:00:00';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210831214620_des-50'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210831214620_des-50', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210908193130_des-51'
)
BEGIN
    ALTER TABLE [EmployeeEarningCodes] ADD [IndexEarningMonthly] decimal(18,2) NOT NULL DEFAULT 0.0;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210908193130_des-51'
)
BEGIN
    ALTER TABLE [EmployeeEarningCodes] ADD [PayFrecuency] int NOT NULL DEFAULT 0;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210908193130_des-51'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210908193130_des-51', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210920174118_des-52'
)
BEGIN
    ALTER TABLE [Projects] ADD [InCompany] nvarchar(5) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210920174118_des-52'
)
BEGIN
    ALTER TABLE [ProjCategories] ADD [InCompany] nvarchar(5) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210920174118_des-52'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210920174118_des-52', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [Users] ADD [CreatedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [Users] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [Users] ADD [ModifiedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [Users] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [UserImages] ADD [CreatedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [UserImages] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [UserImages] ADD [ModifiedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [UserImages] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [Taxes] ADD [InCompany] nvarchar(5) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [TaxDetails] ADD [CreatedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [TaxDetails] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [TaxDetails] ADD [InCompany] nvarchar(5) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [TaxDetails] ADD [ModifiedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [TaxDetails] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [Positions] ADD [InCompany] nvarchar(5) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [PositionRequirements] ADD [InCompany] nvarchar(5) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [Payrolls] ADD [InCompany] nvarchar(5) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [PayCycles] ADD [CreatedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [PayCycles] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [PayCycles] ADD [InCompany] nvarchar(5) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [PayCycles] ADD [ModifiedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [PayCycles] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [Loans] ADD [CreatedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [Loans] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [Loans] ADD [InCompany] nvarchar(5) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [Loans] ADD [ModifiedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [Loans] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [Jobs] ADD [InCompany] nvarchar(5) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [Instructors] ADD [CreatedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [Instructors] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [Instructors] ADD [InCompany] nvarchar(5) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [Instructors] ADD [ModifiedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [Instructors] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [EmployeeTaxes] ADD [CreatedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [EmployeeTaxes] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [EmployeeTaxes] ADD [InCompany] nvarchar(5) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [EmployeeTaxes] ADD [ModifiedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [EmployeeTaxes] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [Employees] ADD [CreatedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [Employees] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [Employees] ADD [InCompany] nvarchar(5) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [Employees] ADD [ModifiedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [Employees] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [EmployeePositions] ADD [CreatedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [EmployeePositions] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [EmployeePositions] ADD [InCompany] nvarchar(5) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [EmployeePositions] ADD [ModifiedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [EmployeePositions] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [EmployeeLoans] ADD [CreatedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [EmployeeLoans] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [EmployeeLoans] ADD [InCompany] nvarchar(5) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [EmployeeLoans] ADD [ModifiedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [EmployeeLoans] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [EmployeeImages] ADD [CreatedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [EmployeeImages] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [EmployeeImages] ADD [InCompany] nvarchar(5) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [EmployeeImages] ADD [ModifiedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [EmployeeImages] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [EmployeeExtraHours] ADD [CreatedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [EmployeeExtraHours] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [EmployeeExtraHours] ADD [InCompany] nvarchar(5) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [EmployeeExtraHours] ADD [ModifiedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [EmployeeExtraHours] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [EmployeeEarningCodes] ADD [CreatedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [EmployeeEarningCodes] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [EmployeeEarningCodes] ADD [InCompany] nvarchar(5) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [EmployeeEarningCodes] ADD [ModifiedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [EmployeeEarningCodes] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [EmployeeDocuments] ADD [CreatedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [EmployeeDocuments] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [EmployeeDocuments] ADD [InCompany] nvarchar(5) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [EmployeeDocuments] ADD [ModifiedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [EmployeeDocuments] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [EmployeeDepartments] ADD [CreatedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [EmployeeDepartments] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [EmployeeDepartments] ADD [InCompany] nvarchar(5) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [EmployeeDepartments] ADD [ModifiedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [EmployeeDepartments] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [EmployeeDeductionCodes] ADD [CreatedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [EmployeeDeductionCodes] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [EmployeeDeductionCodes] ADD [InCompany] nvarchar(5) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [EmployeeDeductionCodes] ADD [ModifiedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [EmployeeDeductionCodes] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [EmployeeContactsInf] ADD [CreatedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [EmployeeContactsInf] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [EmployeeContactsInf] ADD [InCompany] nvarchar(5) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [EmployeeContactsInf] ADD [ModifiedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [EmployeeContactsInf] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [EmployeeBankAccounts] ADD [CreatedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [EmployeeBankAccounts] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [EmployeeBankAccounts] ADD [InCompany] nvarchar(5) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [EmployeeBankAccounts] ADD [ModifiedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [EmployeeBankAccounts] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [Departments] ADD [InCompany] nvarchar(5) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [DeductionCodes] ADD [InCompany] nvarchar(5) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [CourseTypes] ADD [CreatedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [CourseTypes] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [CourseTypes] ADD [InCompany] nvarchar(5) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [CourseTypes] ADD [ModifiedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [CourseTypes] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [Courses] ADD [InCompany] nvarchar(5) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [CoursePositions] ADD [CreatedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [CoursePositions] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [CoursePositions] ADD [InCompany] nvarchar(5) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [CoursePositions] ADD [ModifiedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [CoursePositions] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [CourseLocations] ADD [CreatedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [CourseLocations] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [CourseLocations] ADD [InCompany] nvarchar(5) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [CourseLocations] ADD [ModifiedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [CourseLocations] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [CourseInstructors] ADD [CreatedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [CourseInstructors] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [CourseInstructors] ADD [InCompany] nvarchar(5) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [CourseInstructors] ADD [ModifiedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [CourseInstructors] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [CourseEmployees] ADD [CreatedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [CourseEmployees] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [CourseEmployees] ADD [InCompany] nvarchar(5) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [CourseEmployees] ADD [ModifiedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [CourseEmployees] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [ClassRooms] ADD [CreatedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [ClassRooms] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [ClassRooms] ADD [InCompany] nvarchar(5) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [ClassRooms] ADD [ModifiedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    ALTER TABLE [ClassRooms] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921000748_des-53'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210921000748_des-53', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921203619_des-54'
)
BEGIN
    ALTER TABLE [Taxes] DROP CONSTRAINT [FK_Taxes_Departments_DepartmentId];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921203619_des-54'
)
BEGIN
    ALTER TABLE [Taxes] DROP CONSTRAINT [FK_Taxes_ProjCategories_ProjCategory];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921203619_des-54'
)
BEGIN
    ALTER TABLE [Taxes] DROP CONSTRAINT [FK_Taxes_Projects_ProjId];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921203619_des-54'
)
BEGIN
    DROP INDEX [IX_Taxes_DepartmentId] ON [Taxes];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921203619_des-54'
)
BEGIN
    DROP INDEX [IX_Taxes_ProjCategory] ON [Taxes];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921203619_des-54'
)
BEGIN
    DROP INDEX [IX_Taxes_ProjId] ON [Taxes];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921203619_des-54'
)
BEGIN
    ALTER TABLE [EmployeeTaxes] DROP CONSTRAINT [PK_EmployeeTaxes];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921203619_des-54'
)
BEGIN
    DECLARE @var49 sysname;
    SELECT @var49 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Taxes]') AND [c].[name] = N'ProjId');
    IF @var49 IS NOT NULL EXEC(N'ALTER TABLE [Taxes] DROP CONSTRAINT [' + @var49 + '];');
    ALTER TABLE [Taxes] ALTER COLUMN [ProjId] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921203619_des-54'
)
BEGIN
    DECLARE @var50 sysname;
    SELECT @var50 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Taxes]') AND [c].[name] = N'ProjCategory');
    IF @var50 IS NOT NULL EXEC(N'ALTER TABLE [Taxes] DROP CONSTRAINT [' + @var50 + '];');
    ALTER TABLE [Taxes] ALTER COLUMN [ProjCategory] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921203619_des-54'
)
BEGIN
    DECLARE @var51 sysname;
    SELECT @var51 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Taxes]') AND [c].[name] = N'DepartmentId');
    IF @var51 IS NOT NULL EXEC(N'ALTER TABLE [Taxes] DROP CONSTRAINT [' + @var51 + '];');
    ALTER TABLE [Taxes] ALTER COLUMN [DepartmentId] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921203619_des-54'
)
BEGIN
    DECLARE @var52 sysname;
    SELECT @var52 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeTaxes]') AND [c].[name] = N'TaxId');
    IF @var52 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeTaxes] DROP CONSTRAINT [' + @var52 + '];');
    ALTER TABLE [EmployeeTaxes] ALTER COLUMN [TaxId] nvarchar(20) NOT NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921203619_des-54'
)
BEGIN
    ALTER TABLE [Employees] ADD [WorkStatus] int NOT NULL DEFAULT 0;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921203619_des-54'
)
BEGIN
    ALTER TABLE [EmployeeTaxes] ADD CONSTRAINT [PK_EmployeeTaxes] PRIMARY KEY ([TaxId], [EmployeeId], [PayrollId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921203619_des-54'
)
BEGIN
    ALTER TABLE [EmployeeTaxes] ADD CONSTRAINT [FK_EmployeeTaxes_Taxes_TaxId] FOREIGN KEY ([TaxId]) REFERENCES [Taxes] ([TaxId]) ON DELETE CASCADE;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210921203619_des-54'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210921203619_des-54', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210923210311_des-55'
)
BEGIN
    CREATE TABLE [EarningCodeVersions] (
        [InternalId] int NOT NULL IDENTITY,
        [EarningCodeId] nvarchar(20) NOT NULL,
        [Name] nvarchar(100) NOT NULL,
        [IsTSS] bit NOT NULL,
        [IsISR] bit NOT NULL,
        [IsExtraHours] bit NOT NULL,
        [ProjId] nvarchar(20) NULL,
        [ValidFrom] datetime2 NOT NULL,
        [ValidTo] datetime2 NOT NULL,
        [Description] nvarchar(200) NULL,
        [IndexBase] int NOT NULL,
        [MultiplyAmount] decimal(18,2) NOT NULL,
        [LedgerAccount] nvarchar(30) NULL,
        [Department] nvarchar(20) NULL,
        [CreatedBy] nvarchar(10) NULL,
        [CreatedOn] datetime2 NOT NULL,
        [ModifiedBy] nvarchar(10) NULL,
        [ModifiedOn] datetime2 NOT NULL,
        CONSTRAINT [PK_EarningCodeVersions] PRIMARY KEY ([InternalId]),
        CONSTRAINT [FK_EarningCodeVersions_EarningCodes_EarningCodeId] FOREIGN KEY ([EarningCodeId]) REFERENCES [EarningCodes] ([EarningCodeId]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210923210311_des-55'
)
BEGIN
    CREATE INDEX [IX_EarningCodeVersions_EarningCodeId] ON [EarningCodeVersions] ([EarningCodeId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210923210311_des-55'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210923210311_des-55', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210924233646_des-56'
)
BEGIN
    ALTER TABLE [PayrollsProcess] ADD [TotalAmountToPay] decimal(18,2) NOT NULL DEFAULT 0.0;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210924233646_des-56'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210924233646_des-56', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210925232757_des-57'
)
BEGIN
    DECLARE @var53 sysname;
    SELECT @var53 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EarningCodes]') AND [c].[name] = N'IsEnabled');
    IF @var53 IS NOT NULL EXEC(N'ALTER TABLE [EarningCodes] DROP CONSTRAINT [' + @var53 + '];');
    ALTER TABLE [EarningCodes] DROP COLUMN [IsEnabled];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210925232757_des-57'
)
BEGIN
    DECLARE @var54 sysname;
    SELECT @var54 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[DeductionCodes]') AND [c].[name] = N'IsEnable');
    IF @var54 IS NOT NULL EXEC(N'ALTER TABLE [DeductionCodes] DROP CONSTRAINT [' + @var54 + '];');
    ALTER TABLE [DeductionCodes] DROP COLUMN [IsEnable];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210925232757_des-57'
)
BEGIN
    ALTER TABLE [DeductionCodes] ADD [Ctbution_LimitAmountToApply] decimal(18,2) NOT NULL DEFAULT 0.0;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210925232757_des-57'
)
BEGIN
    ALTER TABLE [DeductionCodes] ADD [Dduction_LimitAmountToApply] decimal(18,2) NOT NULL DEFAULT 0.0;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210925232757_des-57'
)
BEGIN
    CREATE TABLE [DeductionCodeVersions] (
        [InternalId] int NOT NULL IDENTITY,
        [DeductionCodeId] nvarchar(20) NOT NULL,
        [Name] nvarchar(100) NOT NULL,
        [ProjId] nvarchar(20) NULL,
        [ProjCategory] nvarchar(max) NULL,
        [ValidFrom] datetime2 NOT NULL,
        [ValidTo] datetime2 NOT NULL,
        [Description] nvarchar(max) NULL,
        [LedgerAccount] nvarchar(30) NULL,
        [Department] nvarchar(20) NULL,
        [PayrollAction] int NOT NULL,
        [Ctbution_IndexBase] int NOT NULL,
        [Ctbution_MultiplyAmount] decimal(18,2) NOT NULL,
        [Ctbution_PayFrecuency] int NOT NULL,
        [Ctbution_LimitPeriod] int NOT NULL,
        [Ctbution_LimitAmount] decimal(18,2) NOT NULL,
        [Ctbution_LimitAmountToApply] decimal(18,2) NOT NULL,
        [Dduction_IndexBase] int NOT NULL,
        [Dduction_MultiplyAmount] decimal(18,2) NOT NULL,
        [Dduction_PayFrecuency] int NOT NULL,
        [Dduction_LimitPeriod] int NOT NULL,
        [Dduction_LimitAmount] decimal(18,2) NOT NULL,
        [Dduction_LimitAmountToApply] decimal(18,2) NOT NULL,
        CONSTRAINT [PK_DeductionCodeVersions] PRIMARY KEY ([InternalId]),
        CONSTRAINT [FK_DeductionCodeVersions_DeductionCodes_DeductionCodeId] FOREIGN KEY ([DeductionCodeId]) REFERENCES [DeductionCodes] ([DeductionCodeId]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210925232757_des-57'
)
BEGIN
    CREATE INDEX [IX_DeductionCodeVersions_DeductionCodeId] ON [DeductionCodeVersions] ([DeductionCodeId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20210925232757_des-57'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210925232757_des-57', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211001194341_des-58'
)
BEGIN
    ALTER TABLE [PayrollsProcess] ADD [CreatedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211001194341_des-58'
)
BEGIN
    ALTER TABLE [PayrollsProcess] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211001194341_des-58'
)
BEGIN
    ALTER TABLE [PayrollsProcess] ADD [InCompany] nvarchar(5) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211001194341_des-58'
)
BEGIN
    ALTER TABLE [PayrollsProcess] ADD [ModifiedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211001194341_des-58'
)
BEGIN
    ALTER TABLE [PayrollsProcess] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211001194341_des-58'
)
BEGIN
    ALTER TABLE [PayrollProcessDetails] ADD [CreatedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211001194341_des-58'
)
BEGIN
    ALTER TABLE [PayrollProcessDetails] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211001194341_des-58'
)
BEGIN
    ALTER TABLE [PayrollProcessDetails] ADD [InCompany] nvarchar(5) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211001194341_des-58'
)
BEGIN
    ALTER TABLE [PayrollProcessDetails] ADD [ModifiedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211001194341_des-58'
)
BEGIN
    ALTER TABLE [PayrollProcessDetails] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211001194341_des-58'
)
BEGIN
    ALTER TABLE [PayrollProcessActions] ADD [CreatedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211001194341_des-58'
)
BEGIN
    ALTER TABLE [PayrollProcessActions] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211001194341_des-58'
)
BEGIN
    ALTER TABLE [PayrollProcessActions] ADD [InCompany] nvarchar(5) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211001194341_des-58'
)
BEGIN
    ALTER TABLE [PayrollProcessActions] ADD [ModifiedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211001194341_des-58'
)
BEGIN
    ALTER TABLE [PayrollProcessActions] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211001194341_des-58'
)
BEGIN
    ALTER TABLE [EmployeesAddress] ADD [CreatedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211001194341_des-58'
)
BEGIN
    ALTER TABLE [EmployeesAddress] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211001194341_des-58'
)
BEGIN
    ALTER TABLE [EmployeesAddress] ADD [InCompany] nvarchar(5) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211001194341_des-58'
)
BEGIN
    ALTER TABLE [EmployeesAddress] ADD [ModifiedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211001194341_des-58'
)
BEGIN
    ALTER TABLE [EmployeesAddress] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211001194341_des-58'
)
BEGIN
    ALTER TABLE [EarningCodeVersions] ADD [InCompany] nvarchar(5) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211001194341_des-58'
)
BEGIN
    ALTER TABLE [EarningCodes] ADD [InCompany] nvarchar(5) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211001194341_des-58'
)
BEGIN
    ALTER TABLE [DeductionCodeVersions] ADD [CreatedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211001194341_des-58'
)
BEGIN
    ALTER TABLE [DeductionCodeVersions] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211001194341_des-58'
)
BEGIN
    ALTER TABLE [DeductionCodeVersions] ADD [InCompany] nvarchar(5) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211001194341_des-58'
)
BEGIN
    ALTER TABLE [DeductionCodeVersions] ADD [ModifiedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211001194341_des-58'
)
BEGIN
    ALTER TABLE [DeductionCodeVersions] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211001194341_des-58'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20211001194341_des-58', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211006180654_des-59'
)
BEGIN
    CREATE TABLE [BatchHistories] (
        [InternalId] int NOT NULL IDENTITY,
        [StartDate] datetime2 NOT NULL,
        [EndDate] datetime2 NOT NULL,
        [BatchEntity] int NOT NULL,
        [Information] nvarchar(1000) NULL,
        [IsError] bit NOT NULL,
        [IsFinished] bit NOT NULL,
        CONSTRAINT [PK_BatchHistories] PRIMARY KEY ([InternalId])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211006180654_des-59'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20211006180654_des-59', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211012024057_des-60'
)
BEGIN
    ALTER TABLE [PayrollProcessActions] ADD [ActionId] nvarchar(25) NOT NULL DEFAULT N'';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211012024057_des-60'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20211012024057_des-60', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211016193245_des-61'
)
BEGIN
    ALTER TABLE [EmployeeDeductionCodes] ADD [DeductionAmount] decimal(18,2) NOT NULL DEFAULT 0.0;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211016193245_des-61'
)
BEGIN
    ALTER TABLE [DeductionCodeVersions] ADD [IsForTaxCalc] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211016193245_des-61'
)
BEGIN
    DECLARE @var55 sysname;
    SELECT @var55 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[DeductionCodes]') AND [c].[name] = N'Dduction_MultiplyAmount');
    IF @var55 IS NOT NULL EXEC(N'ALTER TABLE [DeductionCodes] DROP CONSTRAINT [' + @var55 + '];');
    ALTER TABLE [DeductionCodes] ALTER COLUMN [Dduction_MultiplyAmount] decimal(32,16) NOT NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211016193245_des-61'
)
BEGIN
    DECLARE @var56 sysname;
    SELECT @var56 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[DeductionCodes]') AND [c].[name] = N'Dduction_LimitAmount');
    IF @var56 IS NOT NULL EXEC(N'ALTER TABLE [DeductionCodes] DROP CONSTRAINT [' + @var56 + '];');
    ALTER TABLE [DeductionCodes] ALTER COLUMN [Dduction_LimitAmount] decimal(32,16) NOT NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211016193245_des-61'
)
BEGIN
    DECLARE @var57 sysname;
    SELECT @var57 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[DeductionCodes]') AND [c].[name] = N'Ctbution_MultiplyAmount');
    IF @var57 IS NOT NULL EXEC(N'ALTER TABLE [DeductionCodes] DROP CONSTRAINT [' + @var57 + '];');
    ALTER TABLE [DeductionCodes] ALTER COLUMN [Ctbution_MultiplyAmount] decimal(32,16) NOT NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211016193245_des-61'
)
BEGIN
    DECLARE @var58 sysname;
    SELECT @var58 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[DeductionCodes]') AND [c].[name] = N'Ctbution_LimitAmount');
    IF @var58 IS NOT NULL EXEC(N'ALTER TABLE [DeductionCodes] DROP CONSTRAINT [' + @var58 + '];');
    ALTER TABLE [DeductionCodes] ALTER COLUMN [Ctbution_LimitAmount] decimal(32,16) NOT NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211016193245_des-61'
)
BEGIN
    ALTER TABLE [DeductionCodes] ADD [IsForTaxCalc] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211016193245_des-61'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20211016193245_des-61', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211018214929_des-62'
)
BEGIN
    ALTER TABLE [PayrollsProcess] ADD [IsRoyaltyPayroll] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211018214929_des-62'
)
BEGIN
    ALTER TABLE [PayrollProcessActions] ADD [ApplyRoyaltyPayroll] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211018214929_des-62'
)
BEGIN
    ALTER TABLE [EarningCodes] ADD [IsRoyaltyPayroll] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211018214929_des-62'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20211018214929_des-62', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211019023748_des-63'
)
BEGIN
    ALTER TABLE [EarningCodeVersions] ADD [IsRoyaltyPayroll] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211019023748_des-63'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20211019023748_des-63', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211019183539_des-64'
)
BEGIN
    ALTER TABLE [EmployeeLoans] DROP CONSTRAINT [PK_EmployeeLoans];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211019183539_des-64'
)
BEGIN
    ALTER TABLE [EmployeeLoans] ADD [InternalId] int NOT NULL DEFAULT 0;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211019183539_des-64'
)
BEGIN
    ALTER TABLE [EmployeeLoans] ADD CONSTRAINT [PK_EmployeeLoans] PRIMARY KEY ([InternalId], [EmployeeId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211019183539_des-64'
)
BEGIN
    CREATE TABLE [EmployeeLoanHistory] (
        [InternalId] int NOT NULL,
        [ParentInternalId] int NOT NULL,
        [LoanId] nvarchar(20) NOT NULL,
        [EmployeeId] nvarchar(20) NOT NULL,
        [PeriodStartDate] datetime2 NOT NULL,
        [PeriodEndDate] datetime2 NOT NULL,
        [PayrollId] nvarchar(20) NOT NULL,
        [PayrollProcessId] nvarchar(max) NULL,
        [LoanAmount] decimal(18,2) NOT NULL,
        [PaidAmount] decimal(18,2) NOT NULL,
        [PendingAmount] decimal(18,2) NOT NULL,
        [TotalDues] int NOT NULL,
        [PendingDues] int NOT NULL,
        [AmountByDues] decimal(18,2) NOT NULL,
        CONSTRAINT [PK_EmployeeLoanHistory] PRIMARY KEY ([InternalId], [ParentInternalId]),
        CONSTRAINT [FK_EmployeeLoanHistory_Employees_EmployeeId] FOREIGN KEY ([EmployeeId]) REFERENCES [Employees] ([EmployeeId]) ON DELETE CASCADE,
        CONSTRAINT [FK_EmployeeLoanHistory_Loans_LoanId] FOREIGN KEY ([LoanId]) REFERENCES [Loans] ([LoanId]),
        CONSTRAINT [FK_EmployeeLoanHistory_Payrolls_PayrollId] FOREIGN KEY ([PayrollId]) REFERENCES [Payrolls] ([PayrollId]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211019183539_des-64'
)
BEGIN
    CREATE INDEX [IX_EmployeeLoans_LoanId] ON [EmployeeLoans] ([LoanId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211019183539_des-64'
)
BEGIN
    CREATE INDEX [IX_EmployeeLoanHistory_EmployeeId] ON [EmployeeLoanHistory] ([EmployeeId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211019183539_des-64'
)
BEGIN
    CREATE INDEX [IX_EmployeeLoanHistory_LoanId] ON [EmployeeLoanHistory] ([LoanId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211019183539_des-64'
)
BEGIN
    CREATE INDEX [IX_EmployeeLoanHistory_PayrollId] ON [EmployeeLoanHistory] ([PayrollId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211019183539_des-64'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20211019183539_des-64', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211019193520_des-65'
)
BEGIN
    ALTER TABLE [EmployeeLoanHistory] DROP CONSTRAINT [FK_EmployeeLoanHistory_Employees_EmployeeId];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211019193520_des-65'
)
BEGIN
    ALTER TABLE [EmployeeLoanHistory] DROP CONSTRAINT [FK_EmployeeLoanHistory_Loans_LoanId];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211019193520_des-65'
)
BEGIN
    ALTER TABLE [EmployeeLoanHistory] DROP CONSTRAINT [FK_EmployeeLoanHistory_Payrolls_PayrollId];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211019193520_des-65'
)
BEGIN
    ALTER TABLE [EmployeeLoanHistory] DROP CONSTRAINT [PK_EmployeeLoanHistory];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211019193520_des-65'
)
BEGIN
    EXEC sp_rename N'[EmployeeLoanHistory]', N'EmployeeLoanHistories', 'OBJECT';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211019193520_des-65'
)
BEGIN
    EXEC sp_rename N'[EmployeeLoanHistories].[IX_EmployeeLoanHistory_PayrollId]', N'IX_EmployeeLoanHistories_PayrollId', 'INDEX';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211019193520_des-65'
)
BEGIN
    EXEC sp_rename N'[EmployeeLoanHistories].[IX_EmployeeLoanHistory_LoanId]', N'IX_EmployeeLoanHistories_LoanId', 'INDEX';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211019193520_des-65'
)
BEGIN
    EXEC sp_rename N'[EmployeeLoanHistories].[IX_EmployeeLoanHistory_EmployeeId]', N'IX_EmployeeLoanHistories_EmployeeId', 'INDEX';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211019193520_des-65'
)
BEGIN
    ALTER TABLE [EmployeeLoanHistories] ADD CONSTRAINT [PK_EmployeeLoanHistories] PRIMARY KEY ([InternalId], [ParentInternalId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211019193520_des-65'
)
BEGIN
    ALTER TABLE [EmployeeLoanHistories] ADD CONSTRAINT [FK_EmployeeLoanHistories_Employees_EmployeeId] FOREIGN KEY ([EmployeeId]) REFERENCES [Employees] ([EmployeeId]) ON DELETE CASCADE;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211019193520_des-65'
)
BEGIN
    ALTER TABLE [EmployeeLoanHistories] ADD CONSTRAINT [FK_EmployeeLoanHistories_Loans_LoanId] FOREIGN KEY ([LoanId]) REFERENCES [Loans] ([LoanId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211019193520_des-65'
)
BEGIN
    ALTER TABLE [EmployeeLoanHistories] ADD CONSTRAINT [FK_EmployeeLoanHistories_Payrolls_PayrollId] FOREIGN KEY ([PayrollId]) REFERENCES [Payrolls] ([PayrollId]) ON DELETE CASCADE;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211019193520_des-65'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20211019193520_des-65', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211024015134_des-66'
)
BEGIN
    DECLARE @var59 sysname;
    SELECT @var59 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[ClassRooms]') AND [c].[name] = N'AvailableTimeStart');
    IF @var59 IS NOT NULL EXEC(N'ALTER TABLE [ClassRooms] DROP CONSTRAINT [' + @var59 + '];');
    ALTER TABLE [ClassRooms] ALTER COLUMN [AvailableTimeStart] time NOT NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211024015134_des-66'
)
BEGIN
    DECLARE @var60 sysname;
    SELECT @var60 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[ClassRooms]') AND [c].[name] = N'AvailableTimeEnd');
    IF @var60 IS NOT NULL EXEC(N'ALTER TABLE [ClassRooms] DROP CONSTRAINT [' + @var60 + '];');
    ALTER TABLE [ClassRooms] ALTER COLUMN [AvailableTimeEnd] time NOT NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211024015134_des-66'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20211024015134_des-66', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211024021216_des-67'
)
BEGIN
    DECLARE @var61 sysname;
    SELECT @var61 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[ClassRooms]') AND [c].[name] = N'AvailableTimeEnd');
    IF @var61 IS NOT NULL EXEC(N'ALTER TABLE [ClassRooms] DROP CONSTRAINT [' + @var61 + '];');
    ALTER TABLE [ClassRooms] DROP COLUMN [AvailableTimeEnd];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211024021216_des-67'
)
BEGIN
    DECLARE @var62 sysname;
    SELECT @var62 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[ClassRooms]') AND [c].[name] = N'AvailableTimeStart');
    IF @var62 IS NOT NULL EXEC(N'ALTER TABLE [ClassRooms] DROP CONSTRAINT [' + @var62 + '];');
    ALTER TABLE [ClassRooms] DROP COLUMN [AvailableTimeStart];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211024021216_des-67'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20211024021216_des-67', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211024021256_des-68'
)
BEGIN
    ALTER TABLE [ClassRooms] ADD [AvailableTimeEnd] time NOT NULL DEFAULT '00:00:00';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211024021256_des-68'
)
BEGIN
    ALTER TABLE [ClassRooms] ADD [AvailableTimeStart] time NOT NULL DEFAULT '00:00:00';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211024021256_des-68'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20211024021256_des-68', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211102003843_des-69'
)
BEGIN
    ALTER TABLE [EmployeeExtraHours] ADD [Comment] nvarchar(200) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211102003843_des-69'
)
BEGIN
    ALTER TABLE [Courses] ADD [URLDocuments] nvarchar(1000) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211102003843_des-69'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20211102003843_des-69', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211102184406_des-70'
)
BEGIN
    ALTER TABLE [EmployeeEarningCodes] DROP CONSTRAINT [PK_EmployeeEarningCodes];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211102184406_des-70'
)
BEGIN
    ALTER TABLE [Employees] ADD [EmployeeAction] int NOT NULL DEFAULT 0;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211102184406_des-70'
)
BEGIN
    ALTER TABLE [EmployeeEarningCodes] ADD CONSTRAINT [PK_EmployeeEarningCodes] PRIMARY KEY ([EarningCodeId], [EmployeeId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211102184406_des-70'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20211102184406_des-70', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211103175210_des-71'
)
BEGIN
    ALTER TABLE [CourseEmployees] DROP CONSTRAINT [FK_CourseEmployees_Instructors_EmployeeId];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211103175210_des-71'
)
BEGIN
    ALTER TABLE [EmployeeEarningCodes] DROP CONSTRAINT [PK_EmployeeEarningCodes];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211103175210_des-71'
)
BEGIN
    ALTER TABLE [EmployeeEarningCodes] ADD [InternalId] int NOT NULL DEFAULT 0;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211103175210_des-71'
)
BEGIN
    ALTER TABLE [EmployeeEarningCodes] ADD CONSTRAINT [PK_EmployeeEarningCodes] PRIMARY KEY ([InternalId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211103175210_des-71'
)
BEGIN
    CREATE INDEX [IX_EmployeeEarningCodes_EarningCodeId] ON [EmployeeEarningCodes] ([EarningCodeId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211103175210_des-71'
)
BEGIN
    ALTER TABLE [CourseEmployees] ADD CONSTRAINT [FK_CourseEmployees_Employees_EmployeeId] FOREIGN KEY ([EmployeeId]) REFERENCES [Employees] ([EmployeeId]) ON DELETE CASCADE;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211103175210_des-71'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20211103175210_des-71', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211104012227_des-72'
)
BEGIN
    ALTER TABLE [CoursePositions] DROP CONSTRAINT [FK_CoursePositions_Instructors_PositionId];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211104012227_des-72'
)
BEGIN
    ALTER TABLE [CoursePositions] ADD CONSTRAINT [FK_CoursePositions_Positions_PositionId] FOREIGN KEY ([PositionId]) REFERENCES [Positions] ([PositionId]) ON DELETE CASCADE;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211104012227_des-72'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20211104012227_des-72', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211108204548_des-73'
)
BEGIN
    CREATE TABLE [ReportsConfig] (
        [InternalId] int NOT NULL IDENTITY,
        [Salary] nvarchar(20) NULL,
        [Comission] nvarchar(20) NULL,
        [AFP] nvarchar(20) NULL,
        [SFS] nvarchar(20) NULL,
        [Cooperative] nvarchar(20) NULL,
        [CreatedBy] nvarchar(10) NULL,
        [CreatedOn] datetime2 NOT NULL,
        [ModifiedBy] nvarchar(10) NULL,
        [ModifiedOn] datetime2 NOT NULL,
        [DataAreaId] nvarchar(5) NULL,
        CONSTRAINT [PK_ReportsConfig] PRIMARY KEY ([InternalId])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211108204548_des-73'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20211108204548_des-73', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211108210952_des-74'
)
BEGIN
    ALTER TABLE [EmployeeEarningCodes] DROP CONSTRAINT [PK_EmployeeEarningCodes];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211108210952_des-74'
)
BEGIN
    ALTER TABLE [EmployeeEarningCodes] ADD CONSTRAINT [PK_EmployeeEarningCodes] PRIMARY KEY ([InternalId], [EmployeeId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211108210952_des-74'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20211108210952_des-74', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211111170353_des-75'
)
BEGIN
    ALTER TABLE [EmployeeTaxes] DROP CONSTRAINT [FK_EmployeeTaxes_Taxes_TaxId];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211111170353_des-75'
)
BEGIN
    ALTER TABLE [TaxDetails] DROP CONSTRAINT [FK_TaxDetails_Taxes_TaxId];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211111170353_des-75'
)
BEGIN
    ALTER TABLE [Taxes] DROP CONSTRAINT [PK_Taxes];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211111170353_des-75'
)
BEGIN
    DROP INDEX [IX_TaxDetails_TaxId] ON [TaxDetails];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211111170353_des-75'
)
BEGIN
    DECLARE @var63 sysname;
    SELECT @var63 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Taxes]') AND [c].[name] = N'InCompany');
    IF @var63 IS NOT NULL EXEC(N'ALTER TABLE [Taxes] DROP CONSTRAINT [' + @var63 + '];');
    EXEC(N'UPDATE [Taxes] SET [InCompany] = N'''' WHERE [InCompany] IS NULL');
    ALTER TABLE [Taxes] ALTER COLUMN [InCompany] nvarchar(5) NOT NULL;
    ALTER TABLE [Taxes] ADD DEFAULT N'' FOR [InCompany];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211111170353_des-75'
)
BEGIN
    DECLARE @var64 sysname;
    SELECT @var64 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[TaxDetails]') AND [c].[name] = N'InCompany');
    IF @var64 IS NOT NULL EXEC(N'ALTER TABLE [TaxDetails] DROP CONSTRAINT [' + @var64 + '];');
    EXEC(N'UPDATE [TaxDetails] SET [InCompany] = N'''' WHERE [InCompany] IS NULL');
    ALTER TABLE [TaxDetails] ALTER COLUMN [InCompany] nvarchar(5) NOT NULL;
    ALTER TABLE [TaxDetails] ADD DEFAULT N'' FOR [InCompany];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211111170353_des-75'
)
BEGIN
    DECLARE @var65 sysname;
    SELECT @var65 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeTaxes]') AND [c].[name] = N'InCompany');
    IF @var65 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeTaxes] DROP CONSTRAINT [' + @var65 + '];');
    EXEC(N'UPDATE [EmployeeTaxes] SET [InCompany] = N'''' WHERE [InCompany] IS NULL');
    ALTER TABLE [EmployeeTaxes] ALTER COLUMN [InCompany] nvarchar(5) NOT NULL;
    ALTER TABLE [EmployeeTaxes] ADD DEFAULT N'' FOR [InCompany];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211111170353_des-75'
)
BEGIN
    ALTER TABLE [Taxes] ADD CONSTRAINT [PK_Taxes] PRIMARY KEY ([TaxId], [InCompany]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211111170353_des-75'
)
BEGIN
    CREATE INDEX [IX_TaxDetails_TaxId_InCompany] ON [TaxDetails] ([TaxId], [InCompany]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211111170353_des-75'
)
BEGIN
    CREATE INDEX [IX_EmployeeTaxes_TaxId_InCompany] ON [EmployeeTaxes] ([TaxId], [InCompany]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211111170353_des-75'
)
BEGIN
    ALTER TABLE [EmployeeTaxes] ADD CONSTRAINT [FK_EmployeeTaxes_Taxes_TaxId_InCompany] FOREIGN KEY ([TaxId], [InCompany]) REFERENCES [Taxes] ([TaxId], [InCompany]) ON DELETE CASCADE;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211111170353_des-75'
)
BEGIN
    ALTER TABLE [TaxDetails] ADD CONSTRAINT [FK_TaxDetails_Taxes_TaxId_InCompany] FOREIGN KEY ([TaxId], [InCompany]) REFERENCES [Taxes] ([TaxId], [InCompany]) ON DELETE CASCADE;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211111170353_des-75'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20211111170353_des-75', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211115204859_des-76'
)
BEGIN
    ALTER TABLE [MenusApp] ADD [IsViewMenu] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211115204859_des-76'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20211115204859_des-76', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211221165347_des-77'
)
BEGIN
    ALTER TABLE [TaxDetails] DROP CONSTRAINT [PK_TaxDetails];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211221165347_des-77'
)
BEGIN
    EXEC(N'DELETE FROM [MenusApp]
    WHERE [MenuId] = N''MENU-0006'';
    SELECT @@ROWCOUNT');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211221165347_des-77'
)
BEGIN
    ALTER TABLE [TaxDetails] ADD CONSTRAINT [PK_TaxDetails] PRIMARY KEY ([InternalId], [TaxId], [InCompany]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211221165347_des-77'
)
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'MenuId', N'Action', N'Description', N'Icon', N'IsViewMenu', N'MenuFather', N'MenuName', N'Sort') AND [object_id] = OBJECT_ID(N'[MenusApp]'))
        SET IDENTITY_INSERT [MenusApp] ON;
    EXEC(N'INSERT INTO [MenusApp] ([MenuId], [Action], [Description], [Icon], [IsViewMenu], [MenuFather], [MenuName], [Sort])
    VALUES (N''MENU-0057'', N''Click'', N''Título de configuración'', N''fa fa-setting'', CAST(0 AS bit), NULL, N''Configuración'', 0)');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'MenuId', N'Action', N'Description', N'Icon', N'IsViewMenu', N'MenuFather', N'MenuName', N'Sort') AND [object_id] = OBJECT_ID(N'[MenusApp]'))
        SET IDENTITY_INSERT [MenusApp] OFF;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211221165347_des-77'
)
BEGIN
    EXEC(N'UPDATE [MenusApp] SET [MenuFather] = N''MENU-0057''
    WHERE [MenuId] = N''MENU-0002'';
    SELECT @@ROWCOUNT');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20211221165347_des-77'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20211221165347_des-77', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220111001708_des-78'
)
BEGIN
    ALTER TABLE [Companies] ADD [LicenseKey] nvarchar(500) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220111001708_des-78'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220111001708_des-78', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220117235825_des-79'
)
BEGIN
    CREATE SEQUENCE [EmployeeHistoryId] AS int START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 999999999 NO CYCLE;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220117235825_des-79'
)
BEGIN
    ALTER TABLE [Employees] ADD [DisabilityTypeId] nvarchar(20) NOT NULL DEFAULT N'';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220117235825_des-79'
)
BEGIN
    ALTER TABLE [Employees] ADD [EducationLevelId] nvarchar(20) NOT NULL DEFAULT N'';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220117235825_des-79'
)
BEGIN
    ALTER TABLE [Employees] ADD [OccupationId] nvarchar(20) NOT NULL DEFAULT N'';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220117235825_des-79'
)
BEGIN
    ALTER TABLE [Countries] ADD [NationalityCode] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220117235825_des-79'
)
BEGIN
    ALTER TABLE [Countries] ADD [NationalityName] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220117235825_des-79'
)
BEGIN
    CREATE TABLE [DisabilityTypes] (
        [DisabilityTypeId] nvarchar(20) NOT NULL,
        [Description] nvarchar(100) NULL,
        CONSTRAINT [PK_DisabilityTypes] PRIMARY KEY ([DisabilityTypeId])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220117235825_des-79'
)
BEGIN
    CREATE TABLE [EducationLevels] (
        [EducationLevelId] nvarchar(20) NOT NULL,
        [Description] nvarchar(100) NULL,
        CONSTRAINT [PK_EducationLevels] PRIMARY KEY ([EducationLevelId])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220117235825_des-79'
)
BEGIN
    CREATE TABLE [EmployeeHistories] (
        [EmployeeHistoryId] nvarchar(20) NOT NULL DEFAULT (FORMAT((NEXT VALUE FOR dbo.EmployeeHistoryId),'EH-00000000#')),
        [Type] nvarchar(5) NOT NULL,
        [Description] nvarchar(200) NOT NULL,
        [RegisterDate] datetime2 NOT NULL,
        [EmployeeId] nvarchar(20) NOT NULL,
        CONSTRAINT [PK_EmployeeHistories] PRIMARY KEY ([EmployeeHistoryId]),
        CONSTRAINT [FK_EmployeeHistories_Employees_EmployeeId] FOREIGN KEY ([EmployeeId]) REFERENCES [Employees] ([EmployeeId]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220117235825_des-79'
)
BEGIN
    CREATE TABLE [Occupations] (
        [OccupationId] nvarchar(20) NOT NULL,
        [Description] nvarchar(100) NULL,
        CONSTRAINT [PK_Occupations] PRIMARY KEY ([OccupationId])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220117235825_des-79'
)
BEGIN
    CREATE INDEX [IX_Employees_DisabilityTypeId] ON [Employees] ([DisabilityTypeId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220117235825_des-79'
)
BEGIN
    CREATE INDEX [IX_Employees_EducationLevelId] ON [Employees] ([EducationLevelId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220117235825_des-79'
)
BEGIN
    CREATE INDEX [IX_Employees_OccupationId] ON [Employees] ([OccupationId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220117235825_des-79'
)
BEGIN
    CREATE INDEX [IX_EmployeeHistories_EmployeeId] ON [EmployeeHistories] ([EmployeeId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220117235825_des-79'
)
BEGIN
    ALTER TABLE [Employees] ADD CONSTRAINT [FK_Employees_DisabilityTypes_DisabilityTypeId] FOREIGN KEY ([DisabilityTypeId]) REFERENCES [DisabilityTypes] ([DisabilityTypeId]) ON DELETE CASCADE;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220117235825_des-79'
)
BEGIN
    ALTER TABLE [Employees] ADD CONSTRAINT [FK_Employees_EducationLevels_EducationLevelId] FOREIGN KEY ([EducationLevelId]) REFERENCES [EducationLevels] ([EducationLevelId]) ON DELETE CASCADE;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220117235825_des-79'
)
BEGIN
    ALTER TABLE [Employees] ADD CONSTRAINT [FK_Employees_Occupations_OccupationId] FOREIGN KEY ([OccupationId]) REFERENCES [Occupations] ([OccupationId]) ON DELETE CASCADE;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220117235825_des-79'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220117235825_des-79', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220119183843_des-80'
)
BEGIN
    ALTER TABLE [Employees] ADD [Nationality] nvarchar(5) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220119183843_des-80'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220119183843_des-80', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220119214932_des-81'
)
BEGIN
    DECLARE @var66 sysname;
    SELECT @var66 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Occupations]') AND [c].[name] = N'Description');
    IF @var66 IS NOT NULL EXEC(N'ALTER TABLE [Occupations] DROP CONSTRAINT [' + @var66 + '];');
    ALTER TABLE [Occupations] ALTER COLUMN [Description] nvarchar(200) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220119214932_des-81'
)
BEGIN
    ALTER TABLE [Employees] ADD [LocationId] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220119214932_des-81'
)
BEGIN
    DECLARE @var67 sysname;
    SELECT @var67 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EducationLevels]') AND [c].[name] = N'Description');
    IF @var67 IS NOT NULL EXEC(N'ALTER TABLE [EducationLevels] DROP CONSTRAINT [' + @var67 + '];');
    ALTER TABLE [EducationLevels] ALTER COLUMN [Description] nvarchar(200) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220119214932_des-81'
)
BEGIN
    DECLARE @var68 sysname;
    SELECT @var68 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[DisabilityTypes]') AND [c].[name] = N'Description');
    IF @var68 IS NOT NULL EXEC(N'ALTER TABLE [DisabilityTypes] DROP CONSTRAINT [' + @var68 + '];');
    ALTER TABLE [DisabilityTypes] ALTER COLUMN [Description] nvarchar(200) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220119214932_des-81'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220119214932_des-81', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220125194021_des-82'
)
BEGIN
    ALTER TABLE [EmployeeEarningCodes] ADD [IndexEarningDiary] decimal(18,2) NOT NULL DEFAULT 0.0;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220125194021_des-82'
)
BEGIN
    ALTER TABLE [EarningCodeVersions] ADD [IsUseDGT] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220125194021_des-82'
)
BEGIN
    ALTER TABLE [EarningCodes] ADD [IsUseDGT] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220125194021_des-82'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220125194021_des-82', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220202224226_des-83'
)
BEGIN
    DECLARE @var69 sysname;
    SELECT @var69 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[BatchHistories]') AND [c].[name] = N'Information');
    IF @var69 IS NOT NULL EXEC(N'ALTER TABLE [BatchHistories] DROP CONSTRAINT [' + @var69 + '];');
    ALTER TABLE [BatchHistories] ALTER COLUMN [Information] nvarchar(MAX) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220202224226_des-83'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220202224226_des-83', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220217155536_des_84'
)
BEGIN
    ALTER TABLE [EmployeeHistories] ADD [IsUseDGT] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220217155536_des_84'
)
BEGIN
    ALTER TABLE [EmployeeEarningCodes] ADD [IsUseDGT] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220217155536_des_84'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220217155536_des_84', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220219230935_des-85'
)
BEGIN
    ALTER TABLE [Companies] ADD [Identification] nvarchar(50) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220219230935_des-85'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220219230935_des-85', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220225181710_des-86'
)
BEGIN
    ALTER TABLE [Companies] ADD [CompanyStatus] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220225181710_des-86'
)
BEGIN
    EXEC(N'UPDATE [Companies] SET [CompanyStatus] = CAST(1 AS bit)
    WHERE [CompanyId] = N''Root'';
    SELECT @@ROWCOUNT');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220225181710_des-86'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220225181710_des-86', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220414231607_des-87'
)
BEGIN
    ALTER TABLE [EmployeeLoanHistories] DROP CONSTRAINT [PK_EmployeeLoanHistories];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220414231607_des-87'
)
BEGIN
    ALTER TABLE [EmployeeLoanHistories] ADD CONSTRAINT [PK_EmployeeLoanHistories] PRIMARY KEY ([InternalId], [ParentInternalId], [EmployeeId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220414231607_des-87'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220414231607_des-87', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220414232653_des-88'
)
BEGIN
    ALTER TABLE [EmployeeLoanHistories] ADD [CreatedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220414232653_des-88'
)
BEGIN
    ALTER TABLE [EmployeeLoanHistories] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220414232653_des-88'
)
BEGIN
    ALTER TABLE [EmployeeLoanHistories] ADD [InCompany] nvarchar(5) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220414232653_des-88'
)
BEGIN
    ALTER TABLE [EmployeeLoanHistories] ADD [ModifiedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220414232653_des-88'
)
BEGIN
    ALTER TABLE [EmployeeLoanHistories] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220414232653_des-88'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220414232653_des-88', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220415001352_des-89'
)
BEGIN
    ALTER TABLE [Employees] ADD [ApplyforOvertime] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220415001352_des-89'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220415001352_des-89', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220419221342_des-90'
)
BEGIN
    ALTER TABLE [PayrollProcessDetails] ADD [StartWorkDate] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220419221342_des-90'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220419221342_des-90', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220420210007_des-91'
)
BEGIN
    CREATE TABLE [Provinces] (
        [ProvinceId] nvarchar(450) NOT NULL,
        [Name] nvarchar(max) NULL,
        CONSTRAINT [PK_Provinces] PRIMARY KEY ([ProvinceId])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220420210007_des-91'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220420210007_des-91', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220420210455_des-92'
)
BEGIN
    DECLARE @var70 sysname;
    SELECT @var70 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Provinces]') AND [c].[name] = N'Name');
    IF @var70 IS NOT NULL EXEC(N'ALTER TABLE [Provinces] DROP CONSTRAINT [' + @var70 + '];');
    EXEC(N'UPDATE [Provinces] SET [Name] = N'''' WHERE [Name] IS NULL');
    ALTER TABLE [Provinces] ALTER COLUMN [Name] nvarchar(100) NOT NULL;
    ALTER TABLE [Provinces] ADD DEFAULT N'' FOR [Name];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220420210455_des-92'
)
BEGIN
    DECLARE @var71 sysname;
    SELECT @var71 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Provinces]') AND [c].[name] = N'ProvinceId');
    IF @var71 IS NOT NULL EXEC(N'ALTER TABLE [Provinces] DROP CONSTRAINT [' + @var71 + '];');
    ALTER TABLE [Provinces] ALTER COLUMN [ProvinceId] nvarchar(10) NOT NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220420210455_des-92'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220420210455_des-92', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220421000821_des-93'
)
BEGIN
    ALTER TABLE [Provinces] DROP CONSTRAINT [PK_Provinces];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220421000821_des-93'
)
BEGIN
    ALTER TABLE [Provinces] ADD [ProvinceId2] nvarchar(450) NOT NULL DEFAULT N'';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220421000821_des-93'
)
BEGIN
    ALTER TABLE [Provinces] ADD CONSTRAINT [PK_Provinces] PRIMARY KEY ([ProvinceId2]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220421000821_des-93'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220421000821_des-93', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220421001136_des-94'
)
BEGIN
    ALTER TABLE [Provinces] DROP CONSTRAINT [PK_Provinces];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220421001136_des-94'
)
BEGIN
    DECLARE @var72 sysname;
    SELECT @var72 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Provinces]') AND [c].[name] = N'ProvinceId2');
    IF @var72 IS NOT NULL EXEC(N'ALTER TABLE [Provinces] DROP CONSTRAINT [' + @var72 + '];');
    ALTER TABLE [Provinces] DROP COLUMN [ProvinceId2];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220421001136_des-94'
)
BEGIN
    ALTER TABLE [Provinces] ADD CONSTRAINT [PK_Provinces] PRIMARY KEY ([ProvinceId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220421001136_des-94'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220421001136_des-94', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220422011017_des-95'
)
BEGIN
    ALTER TABLE [EmployeesAddress] ADD [ProvinceName] nvarchar(50) NOT NULL DEFAULT N'';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220422011017_des-95'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220422011017_des-95', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220524235648_des-96'
)
BEGIN
    DECLARE @var73 sysname;
    SELECT @var73 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeExtraHours]') AND [c].[name] = N'Quantity');
    IF @var73 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeExtraHours] DROP CONSTRAINT [' + @var73 + '];');
    ALTER TABLE [EmployeeExtraHours] ALTER COLUMN [Quantity] decimal(32,16) NOT NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20220524235648_des-96'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220524235648_des-96', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20221206205745_des-97'
)
BEGIN
    ALTER TABLE [BatchHistories] ADD [CreatedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20221206205745_des-97'
)
BEGIN
    ALTER TABLE [BatchHistories] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20221206205745_des-97'
)
BEGIN
    ALTER TABLE [BatchHistories] ADD [InCompany] nvarchar(5) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20221206205745_des-97'
)
BEGIN
    ALTER TABLE [BatchHistories] ADD [ModifiedBy] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20221206205745_des-97'
)
BEGIN
    ALTER TABLE [BatchHistories] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20221206205745_des-97'
)
BEGIN
    CREATE TABLE [EmployeeWorkCalendars] (
        [EmployeeId] nvarchar(20) NOT NULL,
        [CalendarDate] datetime2 NOT NULL,
        [CalendarDay] nvarchar(30) NOT NULL,
        [WorkFrom] time NOT NULL,
        [WorkTo] time NOT NULL,
        [BreakWorkFrom] time NOT NULL,
        [BreakWorkTo] time NOT NULL,
        [CreatedBy] nvarchar(10) NULL,
        [CreatedOn] datetime2 NOT NULL,
        [ModifiedBy] nvarchar(10) NULL,
        [ModifiedOn] datetime2 NOT NULL,
        [DataAreaId] nvarchar(5) NULL,
        CONSTRAINT [PK_EmployeeWorkCalendars] PRIMARY KEY ([EmployeeId], [CalendarDate]),
        CONSTRAINT [FK_EmployeeWorkCalendars_Employees_EmployeeId] FOREIGN KEY ([EmployeeId]) REFERENCES [Employees] ([EmployeeId])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20221206205745_des-97'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20221206205745_des-97', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20221209174508_des-98'
)
BEGIN
    CREATE TABLE [CalendarHolidays] (
        [CalendarDate] datetime2 NOT NULL,
        [Description] nvarchar(100) NOT NULL,
        CONSTRAINT [PK_CalendarHolidays] PRIMARY KEY ([CalendarDate])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20221209174508_des-98'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20221209174508_des-98', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20221213204853_des-99'
)
BEGIN
    ALTER TABLE [EmployeeWorkCalendars] DROP CONSTRAINT [PK_EmployeeWorkCalendars];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20221213204853_des-99'
)
BEGIN
    ALTER TABLE [EmployeeWorkCalendars] ADD [InternalId] int NOT NULL DEFAULT 0;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20221213204853_des-99'
)
BEGIN
    ALTER TABLE [EmployeeWorkCalendars] ADD CONSTRAINT [PK_EmployeeWorkCalendars] PRIMARY KEY ([InternalId], [EmployeeId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20221213204853_des-99'
)
BEGIN
    CREATE INDEX [IX_EmployeeWorkCalendars_EmployeeId] ON [EmployeeWorkCalendars] ([EmployeeId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20221213204853_des-99'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20221213204853_des-99', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20221213212956_des-100'
)
BEGIN
    ALTER TABLE [Employees] ADD [IsFixedWorkCalendar] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20221213212956_des-100'
)
BEGIN
    ALTER TABLE [EarningCodeVersions] ADD [IsHoliday] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20221213212956_des-100'
)
BEGIN
    ALTER TABLE [EarningCodeVersions] ADD [WorkFrom] time NOT NULL DEFAULT '00:00:00';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20221213212956_des-100'
)
BEGIN
    ALTER TABLE [EarningCodeVersions] ADD [WorkTo] time NOT NULL DEFAULT '00:00:00';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20221213212956_des-100'
)
BEGIN
    ALTER TABLE [EarningCodes] ADD [IsHoliday] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20221213212956_des-100'
)
BEGIN
    ALTER TABLE [EarningCodes] ADD [WorkFrom] time NOT NULL DEFAULT '00:00:00';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20221213212956_des-100'
)
BEGIN
    ALTER TABLE [EarningCodes] ADD [WorkTo] time NOT NULL DEFAULT '00:00:00';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20221213212956_des-100'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20221213212956_des-100', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20221216161121_des-101'
)
BEGIN
    EXEC sp_rename N'[ReportsConfig].[Cooperative]', N'LoanCooperative', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20221216161121_des-101'
)
BEGIN
    ALTER TABLE [ReportsConfig] ADD [DeductionCooperative] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20221216161121_des-101'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20221216161121_des-101', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20221226142747_des-102'
)
BEGIN
    ALTER TABLE [EmployeeDeductionCodes] ADD [PayFrecuency] int NOT NULL DEFAULT 0;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20221226142747_des-102'
)
BEGIN
    ALTER TABLE [EmployeeDeductionCodes] ADD [QtyPeriodForPaid] int NOT NULL DEFAULT 0;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20221226142747_des-102'
)
BEGIN
    ALTER TABLE [EmployeeDeductionCodes] ADD [StartPeriodForPaid] int NOT NULL DEFAULT 0;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20221226142747_des-102'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20221226142747_des-102', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20221227162017_des-103'
)
BEGIN
    CREATE TABLE [GeneralConfigs] (
        [Id] int NOT NULL IDENTITY,
        [Email] nvarchar(200) NOT NULL,
        [SMTP] nvarchar(50) NOT NULL,
        [SMTPPort] nvarchar(10) NOT NULL,
        [EmailPassword] nvarchar(max) NOT NULL,
        CONSTRAINT [PK_GeneralConfigs] PRIMARY KEY ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20221227162017_des-103'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20221227162017_des-103', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20230124010030_des-104'
)
BEGIN
    ALTER TABLE [EmployeeExtraHours] ADD [CalcPayrollDate] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20230124010030_des-104'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20230124010030_des-104', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20230214190536_des-105'
)
BEGIN
    ALTER TABLE [PayrollProcessDetails] ADD [TotalTssAmount] decimal(18,2) NOT NULL DEFAULT 0.0;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20230214190536_des-105'
)
BEGIN
    ALTER TABLE [PayCycles] ADD [IsForTss] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20230214190536_des-105'
)
BEGIN
    ALTER TABLE [DeductionCodeVersions] ADD [IsForTssCalc] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20230214190536_des-105'
)
BEGIN
    ALTER TABLE [DeductionCodes] ADD [IsForTssCalc] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20230214190536_des-105'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20230214190536_des-105', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20230214202340_des-106'
)
BEGIN
    ALTER TABLE [PayrollsProcess] ADD [IsPayCycleTss] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20230214202340_des-106'
)
BEGIN
    ALTER TABLE [PayrollsProcess] ADD [UsedForTss] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20230214202340_des-106'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20230214202340_des-106', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20230215192547_des-107'
)
BEGIN
    ALTER TABLE [PayrollProcessDetails] ADD [TotalTssAndTaxAmount] decimal(18,2) NOT NULL DEFAULT 0.0;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20230215192547_des-107'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20230215192547_des-107', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20230414225901_des-108'
)
BEGIN
    CREATE TABLE [EmployeeWorkControlCalendars] (
        [InternalId] int NOT NULL,
        [EmployeeId] nvarchar(20) NOT NULL,
        [CalendarDate] datetime2 NOT NULL,
        [CalendarDay] nvarchar(30) NOT NULL,
        [WorkFrom] time NOT NULL,
        [WorkTo] time NOT NULL,
        [BreakWorkFrom] time NOT NULL,
        [BreakWorkTo] time NOT NULL,
        [TotalHour] decimal(32,16) NOT NULL,
        [StatusExtraHour] int NOT NULL,
        [CreatedBy] nvarchar(10) NULL,
        [CreatedOn] datetime2 NOT NULL,
        [ModifiedBy] nvarchar(10) NULL,
        [ModifiedOn] datetime2 NOT NULL,
        [DataAreaId] nvarchar(5) NULL,
        CONSTRAINT [PK_EmployeeWorkControlCalendars] PRIMARY KEY ([InternalId], [EmployeeId]),
        CONSTRAINT [FK_EmployeeWorkControlCalendars_Employees_EmployeeId] FOREIGN KEY ([EmployeeId]) REFERENCES [Employees] ([EmployeeId])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20230414225901_des-108'
)
BEGIN
    CREATE INDEX [IX_EmployeeWorkControlCalendars_EmployeeId] ON [EmployeeWorkControlCalendars] ([EmployeeId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20230414225901_des-108'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20230414225901_des-108', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20230414231603_des-109'
)
BEGIN
    ALTER TABLE [Payrolls] ADD [IsForHourPayroll] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20230414231603_des-109'
)
BEGIN
    ALTER TABLE [EmployeeEarningCodes] ADD [IndexEarningHour] decimal(18,2) NOT NULL DEFAULT 0.0;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20230414231603_des-109'
)
BEGIN
    ALTER TABLE [EmployeeEarningCodes] ADD [IsUseCalcHour] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20230414231603_des-109'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20230414231603_des-109', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20230420205652_des-110'
)
BEGIN
    EXEC sp_rename N'[EmployeeWorkControlCalendars].[StatusExtraHour]', N'StatusWorkControl', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20230420205652_des-110'
)
BEGIN
    ALTER TABLE [PayrollsProcess] ADD [IsForHourPayroll] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20230420205652_des-110'
)
BEGIN
    ALTER TABLE [EmployeeWorkControlCalendars] ADD [PayrollProcessId] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20230420205652_des-110'
)
BEGIN
    ALTER TABLE [EmployeeEarningCodes] ADD [PayrollProcessId] nvarchar(max) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20230420205652_des-110'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20230420205652_des-110', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20230421223835_des-111'
)
BEGIN
    ALTER TABLE [Payrolls] ADD [BankSecuence] int NOT NULL DEFAULT 0;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20230421223835_des-111'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20230421223835_des-111', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125000000_AddRecIdSequence'
)
BEGIN

                    IF NOT EXISTS (SELECT * FROM sys.sequences WHERE name = 'RecId')
                    BEGIN
                        CREATE SEQUENCE [dbo].[RecId]
                        START WITH 20260100
                        INCREMENT BY 1
                        MINVALUE 20260100
                        NO MAXVALUE
                        NO CYCLE
                        CACHE 50;
                    END
                
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125000000_AddRecIdSequence'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20251125000000_AddRecIdSequence', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeTaxes] DROP CONSTRAINT [FK_EmployeeTaxes_Taxes_TaxId_InCompany];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [TaxDetails] DROP CONSTRAINT [FK_TaxDetails_Taxes_TaxId_InCompany];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Taxes] DROP CONSTRAINT [PK_Taxes];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [TaxDetails] DROP CONSTRAINT [PK_TaxDetails];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DROP INDEX [IX_TaxDetails_TaxId_InCompany] ON [TaxDetails];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DROP INDEX [IX_EmployeeTaxes_TaxId_InCompany] ON [EmployeeTaxes];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var74 sysname;
    SELECT @var74 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Taxes]') AND [c].[name] = N'InCompany');
    IF @var74 IS NOT NULL EXEC(N'ALTER TABLE [Taxes] DROP CONSTRAINT [' + @var74 + '];');
    ALTER TABLE [Taxes] DROP COLUMN [InCompany];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var75 sysname;
    SELECT @var75 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[TaxDetails]') AND [c].[name] = N'InCompany');
    IF @var75 IS NOT NULL EXEC(N'ALTER TABLE [TaxDetails] DROP CONSTRAINT [' + @var75 + '];');
    ALTER TABLE [TaxDetails] DROP COLUMN [InCompany];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var76 sysname;
    SELECT @var76 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[ReportsConfig]') AND [c].[name] = N'InCompany');
    IF @var76 IS NOT NULL EXEC(N'ALTER TABLE [ReportsConfig] DROP CONSTRAINT [' + @var76 + '];');
    ALTER TABLE [ReportsConfig] DROP COLUMN [InCompany];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var77 sysname;
    SELECT @var77 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Projects]') AND [c].[name] = N'InCompany');
    IF @var77 IS NOT NULL EXEC(N'ALTER TABLE [Projects] DROP CONSTRAINT [' + @var77 + '];');
    ALTER TABLE [Projects] DROP COLUMN [InCompany];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var78 sysname;
    SELECT @var78 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[ProjCategories]') AND [c].[name] = N'InCompany');
    IF @var78 IS NOT NULL EXEC(N'ALTER TABLE [ProjCategories] DROP CONSTRAINT [' + @var78 + '];');
    ALTER TABLE [ProjCategories] DROP COLUMN [InCompany];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var79 sysname;
    SELECT @var79 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Positions]') AND [c].[name] = N'InCompany');
    IF @var79 IS NOT NULL EXEC(N'ALTER TABLE [Positions] DROP CONSTRAINT [' + @var79 + '];');
    ALTER TABLE [Positions] DROP COLUMN [InCompany];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var80 sysname;
    SELECT @var80 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[PositionRequirements]') AND [c].[name] = N'InCompany');
    IF @var80 IS NOT NULL EXEC(N'ALTER TABLE [PositionRequirements] DROP CONSTRAINT [' + @var80 + '];');
    ALTER TABLE [PositionRequirements] DROP COLUMN [InCompany];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var81 sysname;
    SELECT @var81 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[PayrollsProcess]') AND [c].[name] = N'InCompany');
    IF @var81 IS NOT NULL EXEC(N'ALTER TABLE [PayrollsProcess] DROP CONSTRAINT [' + @var81 + '];');
    ALTER TABLE [PayrollsProcess] DROP COLUMN [InCompany];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var82 sysname;
    SELECT @var82 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Payrolls]') AND [c].[name] = N'InCompany');
    IF @var82 IS NOT NULL EXEC(N'ALTER TABLE [Payrolls] DROP CONSTRAINT [' + @var82 + '];');
    ALTER TABLE [Payrolls] DROP COLUMN [InCompany];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var83 sysname;
    SELECT @var83 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[PayrollProcessDetails]') AND [c].[name] = N'InCompany');
    IF @var83 IS NOT NULL EXEC(N'ALTER TABLE [PayrollProcessDetails] DROP CONSTRAINT [' + @var83 + '];');
    ALTER TABLE [PayrollProcessDetails] DROP COLUMN [InCompany];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var84 sysname;
    SELECT @var84 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[PayrollProcessActions]') AND [c].[name] = N'InCompany');
    IF @var84 IS NOT NULL EXEC(N'ALTER TABLE [PayrollProcessActions] DROP CONSTRAINT [' + @var84 + '];');
    ALTER TABLE [PayrollProcessActions] DROP COLUMN [InCompany];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var85 sysname;
    SELECT @var85 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[PayCycles]') AND [c].[name] = N'InCompany');
    IF @var85 IS NOT NULL EXEC(N'ALTER TABLE [PayCycles] DROP CONSTRAINT [' + @var85 + '];');
    ALTER TABLE [PayCycles] DROP COLUMN [InCompany];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var86 sysname;
    SELECT @var86 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Loans]') AND [c].[name] = N'InCompany');
    IF @var86 IS NOT NULL EXEC(N'ALTER TABLE [Loans] DROP CONSTRAINT [' + @var86 + '];');
    ALTER TABLE [Loans] DROP COLUMN [InCompany];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var87 sysname;
    SELECT @var87 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Jobs]') AND [c].[name] = N'InCompany');
    IF @var87 IS NOT NULL EXEC(N'ALTER TABLE [Jobs] DROP CONSTRAINT [' + @var87 + '];');
    ALTER TABLE [Jobs] DROP COLUMN [InCompany];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var88 sysname;
    SELECT @var88 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Instructors]') AND [c].[name] = N'InCompany');
    IF @var88 IS NOT NULL EXEC(N'ALTER TABLE [Instructors] DROP CONSTRAINT [' + @var88 + '];');
    ALTER TABLE [Instructors] DROP COLUMN [InCompany];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var89 sysname;
    SELECT @var89 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeWorkControlCalendars]') AND [c].[name] = N'InCompany');
    IF @var89 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeWorkControlCalendars] DROP CONSTRAINT [' + @var89 + '];');
    ALTER TABLE [EmployeeWorkControlCalendars] DROP COLUMN [InCompany];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var90 sysname;
    SELECT @var90 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeWorkCalendars]') AND [c].[name] = N'InCompany');
    IF @var90 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeWorkCalendars] DROP CONSTRAINT [' + @var90 + '];');
    ALTER TABLE [EmployeeWorkCalendars] DROP COLUMN [InCompany];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var91 sysname;
    SELECT @var91 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeTaxes]') AND [c].[name] = N'InCompany');
    IF @var91 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeTaxes] DROP CONSTRAINT [' + @var91 + '];');
    ALTER TABLE [EmployeeTaxes] DROP COLUMN [InCompany];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var92 sysname;
    SELECT @var92 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeesAddress]') AND [c].[name] = N'InCompany');
    IF @var92 IS NOT NULL EXEC(N'ALTER TABLE [EmployeesAddress] DROP CONSTRAINT [' + @var92 + '];');
    ALTER TABLE [EmployeesAddress] DROP COLUMN [InCompany];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var93 sysname;
    SELECT @var93 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Employees]') AND [c].[name] = N'InCompany');
    IF @var93 IS NOT NULL EXEC(N'ALTER TABLE [Employees] DROP CONSTRAINT [' + @var93 + '];');
    ALTER TABLE [Employees] DROP COLUMN [InCompany];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var94 sysname;
    SELECT @var94 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeePositions]') AND [c].[name] = N'InCompany');
    IF @var94 IS NOT NULL EXEC(N'ALTER TABLE [EmployeePositions] DROP CONSTRAINT [' + @var94 + '];');
    ALTER TABLE [EmployeePositions] DROP COLUMN [InCompany];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var95 sysname;
    SELECT @var95 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeLoans]') AND [c].[name] = N'InCompany');
    IF @var95 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeLoans] DROP CONSTRAINT [' + @var95 + '];');
    ALTER TABLE [EmployeeLoans] DROP COLUMN [InCompany];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var96 sysname;
    SELECT @var96 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeLoanHistories]') AND [c].[name] = N'InCompany');
    IF @var96 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeLoanHistories] DROP CONSTRAINT [' + @var96 + '];');
    ALTER TABLE [EmployeeLoanHistories] DROP COLUMN [InCompany];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var97 sysname;
    SELECT @var97 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeImages]') AND [c].[name] = N'InCompany');
    IF @var97 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeImages] DROP CONSTRAINT [' + @var97 + '];');
    ALTER TABLE [EmployeeImages] DROP COLUMN [InCompany];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var98 sysname;
    SELECT @var98 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeExtraHours]') AND [c].[name] = N'InCompany');
    IF @var98 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeExtraHours] DROP CONSTRAINT [' + @var98 + '];');
    ALTER TABLE [EmployeeExtraHours] DROP COLUMN [InCompany];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var99 sysname;
    SELECT @var99 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeEarningCodes]') AND [c].[name] = N'InCompany');
    IF @var99 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeEarningCodes] DROP CONSTRAINT [' + @var99 + '];');
    ALTER TABLE [EmployeeEarningCodes] DROP COLUMN [InCompany];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var100 sysname;
    SELECT @var100 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeDocuments]') AND [c].[name] = N'InCompany');
    IF @var100 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeDocuments] DROP CONSTRAINT [' + @var100 + '];');
    ALTER TABLE [EmployeeDocuments] DROP COLUMN [InCompany];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var101 sysname;
    SELECT @var101 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeDepartments]') AND [c].[name] = N'InCompany');
    IF @var101 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeDepartments] DROP CONSTRAINT [' + @var101 + '];');
    ALTER TABLE [EmployeeDepartments] DROP COLUMN [InCompany];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var102 sysname;
    SELECT @var102 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeDeductionCodes]') AND [c].[name] = N'InCompany');
    IF @var102 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeDeductionCodes] DROP CONSTRAINT [' + @var102 + '];');
    ALTER TABLE [EmployeeDeductionCodes] DROP COLUMN [InCompany];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var103 sysname;
    SELECT @var103 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeContactsInf]') AND [c].[name] = N'InCompany');
    IF @var103 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeContactsInf] DROP CONSTRAINT [' + @var103 + '];');
    ALTER TABLE [EmployeeContactsInf] DROP COLUMN [InCompany];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var104 sysname;
    SELECT @var104 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeBankAccounts]') AND [c].[name] = N'InCompany');
    IF @var104 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeBankAccounts] DROP CONSTRAINT [' + @var104 + '];');
    ALTER TABLE [EmployeeBankAccounts] DROP COLUMN [InCompany];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var105 sysname;
    SELECT @var105 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EarningCodeVersions]') AND [c].[name] = N'InCompany');
    IF @var105 IS NOT NULL EXEC(N'ALTER TABLE [EarningCodeVersions] DROP CONSTRAINT [' + @var105 + '];');
    ALTER TABLE [EarningCodeVersions] DROP COLUMN [InCompany];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var106 sysname;
    SELECT @var106 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EarningCodes]') AND [c].[name] = N'InCompany');
    IF @var106 IS NOT NULL EXEC(N'ALTER TABLE [EarningCodes] DROP CONSTRAINT [' + @var106 + '];');
    ALTER TABLE [EarningCodes] DROP COLUMN [InCompany];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var107 sysname;
    SELECT @var107 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Departments]') AND [c].[name] = N'InCompany');
    IF @var107 IS NOT NULL EXEC(N'ALTER TABLE [Departments] DROP CONSTRAINT [' + @var107 + '];');
    ALTER TABLE [Departments] DROP COLUMN [InCompany];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var108 sysname;
    SELECT @var108 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[DeductionCodeVersions]') AND [c].[name] = N'InCompany');
    IF @var108 IS NOT NULL EXEC(N'ALTER TABLE [DeductionCodeVersions] DROP CONSTRAINT [' + @var108 + '];');
    ALTER TABLE [DeductionCodeVersions] DROP COLUMN [InCompany];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var109 sysname;
    SELECT @var109 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[DeductionCodes]') AND [c].[name] = N'InCompany');
    IF @var109 IS NOT NULL EXEC(N'ALTER TABLE [DeductionCodes] DROP CONSTRAINT [' + @var109 + '];');
    ALTER TABLE [DeductionCodes] DROP COLUMN [InCompany];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var110 sysname;
    SELECT @var110 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[CourseTypes]') AND [c].[name] = N'InCompany');
    IF @var110 IS NOT NULL EXEC(N'ALTER TABLE [CourseTypes] DROP CONSTRAINT [' + @var110 + '];');
    ALTER TABLE [CourseTypes] DROP COLUMN [InCompany];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var111 sysname;
    SELECT @var111 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Courses]') AND [c].[name] = N'InCompany');
    IF @var111 IS NOT NULL EXEC(N'ALTER TABLE [Courses] DROP CONSTRAINT [' + @var111 + '];');
    ALTER TABLE [Courses] DROP COLUMN [InCompany];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var112 sysname;
    SELECT @var112 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[CoursePositions]') AND [c].[name] = N'InCompany');
    IF @var112 IS NOT NULL EXEC(N'ALTER TABLE [CoursePositions] DROP CONSTRAINT [' + @var112 + '];');
    ALTER TABLE [CoursePositions] DROP COLUMN [InCompany];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var113 sysname;
    SELECT @var113 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[CourseLocations]') AND [c].[name] = N'InCompany');
    IF @var113 IS NOT NULL EXEC(N'ALTER TABLE [CourseLocations] DROP CONSTRAINT [' + @var113 + '];');
    ALTER TABLE [CourseLocations] DROP COLUMN [InCompany];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var114 sysname;
    SELECT @var114 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[CourseInstructors]') AND [c].[name] = N'InCompany');
    IF @var114 IS NOT NULL EXEC(N'ALTER TABLE [CourseInstructors] DROP CONSTRAINT [' + @var114 + '];');
    ALTER TABLE [CourseInstructors] DROP COLUMN [InCompany];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var115 sysname;
    SELECT @var115 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[CourseEmployees]') AND [c].[name] = N'InCompany');
    IF @var115 IS NOT NULL EXEC(N'ALTER TABLE [CourseEmployees] DROP CONSTRAINT [' + @var115 + '];');
    ALTER TABLE [CourseEmployees] DROP COLUMN [InCompany];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var116 sysname;
    SELECT @var116 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[ClassRooms]') AND [c].[name] = N'InCompany');
    IF @var116 IS NOT NULL EXEC(N'ALTER TABLE [ClassRooms] DROP CONSTRAINT [' + @var116 + '];');
    ALTER TABLE [ClassRooms] DROP COLUMN [InCompany];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var117 sysname;
    SELECT @var117 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[BatchHistories]') AND [c].[name] = N'InCompany');
    IF @var117 IS NOT NULL EXEC(N'ALTER TABLE [BatchHistories] DROP CONSTRAINT [' + @var117 + '];');
    ALTER TABLE [BatchHistories] DROP COLUMN [InCompany];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[Users].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[Users].[CreatedDateTime]', N'CreatedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[UserImages].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[UserImages].[CreatedDateTime]', N'CreatedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[Taxes].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[Taxes].[CreatedDateTime]', N'CreatedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[TaxDetails].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[TaxDetails].[CreatedDateTime]', N'CreatedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[ReportsConfig].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[ReportsConfig].[CreatedDateTime]', N'CreatedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[Projects].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[Projects].[CreatedDateTime]', N'CreatedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[ProjCategories].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[ProjCategories].[CreatedDateTime]', N'CreatedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[Positions].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[Positions].[CreatedDateTime]', N'CreatedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[PositionRequirements].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[PositionRequirements].[CreatedDateTime]', N'CreatedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[PayrollsProcess].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[PayrollsProcess].[CreatedDateTime]', N'CreatedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[Payrolls].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[Payrolls].[CreatedDateTime]', N'CreatedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[PayrollProcessDetails].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[PayrollProcessDetails].[CreatedDateTime]', N'CreatedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[PayrollProcessActions].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[PayrollProcessActions].[CreatedDateTime]', N'CreatedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[PayCycles].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[PayCycles].[CreatedDateTime]', N'CreatedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[MenuAssignedToUsers].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[MenuAssignedToUsers].[CreatedDateTime]', N'CreatedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[Loans].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[Loans].[CreatedDateTime]', N'CreatedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[Jobs].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[Jobs].[CreatedDateTime]', N'CreatedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[Instructors].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[Instructors].[CreatedDateTime]', N'CreatedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[EmployeeWorkControlCalendars].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[EmployeeWorkControlCalendars].[CreatedDateTime]', N'CreatedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[EmployeeWorkCalendars].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[EmployeeWorkCalendars].[CreatedDateTime]', N'CreatedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[EmployeeTaxes].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[EmployeeTaxes].[CreatedDateTime]', N'CreatedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[EmployeesAddress].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[EmployeesAddress].[CreatedDateTime]', N'CreatedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[Employees].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[Employees].[CreatedDateTime]', N'CreatedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[EmployeePositions].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[EmployeePositions].[CreatedDateTime]', N'CreatedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[EmployeeLoans].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[EmployeeLoans].[CreatedDateTime]', N'CreatedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[EmployeeLoanHistories].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[EmployeeLoanHistories].[CreatedDateTime]', N'CreatedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[EmployeeImages].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[EmployeeImages].[CreatedDateTime]', N'CreatedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[EmployeeExtraHours].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[EmployeeExtraHours].[CreatedDateTime]', N'CreatedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[EmployeeEarningCodes].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[EmployeeEarningCodes].[CreatedDateTime]', N'CreatedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[EmployeeDocuments].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[EmployeeDocuments].[CreatedDateTime]', N'CreatedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[EmployeeDepartments].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[EmployeeDepartments].[CreatedDateTime]', N'CreatedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[EmployeeDeductionCodes].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[EmployeeDeductionCodes].[CreatedDateTime]', N'CreatedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[EmployeeContactsInf].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[EmployeeContactsInf].[CreatedDateTime]', N'CreatedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[EmployeeBankAccounts].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[EmployeeBankAccounts].[CreatedDateTime]', N'CreatedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[EarningCodeVersions].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[EarningCodeVersions].[CreatedDateTime]', N'CreatedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[EarningCodes].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[EarningCodes].[CreatedDateTime]', N'CreatedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[Departments].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[Departments].[CreatedDateTime]', N'CreatedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[DeductionCodeVersions].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[DeductionCodeVersions].[CreatedDateTime]', N'CreatedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[DeductionCodes].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[DeductionCodes].[CreatedDateTime]', N'CreatedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[CourseTypes].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[CourseTypes].[CreatedDateTime]', N'CreatedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[Courses].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[Courses].[CreatedDateTime]', N'CreatedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[CoursePositions].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[CoursePositions].[CreatedDateTime]', N'CreatedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[CourseLocations].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[CourseLocations].[CreatedDateTime]', N'CreatedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[CourseInstructors].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[CourseInstructors].[CreatedDateTime]', N'CreatedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[CourseEmployees].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[CourseEmployees].[CreatedDateTime]', N'CreatedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[CompaniesAssignedToUsers].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[CompaniesAssignedToUsers].[CreatedDateTime]', N'CreatedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[ClassRooms].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[ClassRooms].[CreatedDateTime]', N'CreatedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[BatchHistories].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC sp_rename N'[BatchHistories].[CreatedDateTime]', N'CreatedOn', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var118 sysname;
    SELECT @var118 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Users]') AND [c].[name] = N'ModifiedBy');
    IF @var118 IS NOT NULL EXEC(N'ALTER TABLE [Users] DROP CONSTRAINT [' + @var118 + '];');
    ALTER TABLE [Users] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var119 sysname;
    SELECT @var119 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Users]') AND [c].[name] = N'CreatedBy');
    IF @var119 IS NOT NULL EXEC(N'ALTER TABLE [Users] DROP CONSTRAINT [' + @var119 + '];');
    ALTER TABLE [Users] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Users] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Users] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Users] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Users] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var120 sysname;
    SELECT @var120 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[UserImages]') AND [c].[name] = N'ModifiedBy');
    IF @var120 IS NOT NULL EXEC(N'ALTER TABLE [UserImages] DROP CONSTRAINT [' + @var120 + '];');
    ALTER TABLE [UserImages] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var121 sysname;
    SELECT @var121 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[UserImages]') AND [c].[name] = N'CreatedBy');
    IF @var121 IS NOT NULL EXEC(N'ALTER TABLE [UserImages] DROP CONSTRAINT [' + @var121 + '];');
    ALTER TABLE [UserImages] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [UserImages] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [UserImages] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [UserImages] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [UserImages] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var122 sysname;
    SELECT @var122 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Taxes]') AND [c].[name] = N'ModifiedBy');
    IF @var122 IS NOT NULL EXEC(N'ALTER TABLE [Taxes] DROP CONSTRAINT [' + @var122 + '];');
    ALTER TABLE [Taxes] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var123 sysname;
    SELECT @var123 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Taxes]') AND [c].[name] = N'CreatedBy');
    IF @var123 IS NOT NULL EXEC(N'ALTER TABLE [Taxes] DROP CONSTRAINT [' + @var123 + '];');
    ALTER TABLE [Taxes] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Taxes] ADD [DataAreaId] nvarchar(10) NOT NULL DEFAULT N'';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Taxes] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Taxes] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Taxes] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Taxes] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var124 sysname;
    SELECT @var124 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[TaxDetails]') AND [c].[name] = N'ModifiedBy');
    IF @var124 IS NOT NULL EXEC(N'ALTER TABLE [TaxDetails] DROP CONSTRAINT [' + @var124 + '];');
    ALTER TABLE [TaxDetails] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var125 sysname;
    SELECT @var125 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[TaxDetails]') AND [c].[name] = N'CreatedBy');
    IF @var125 IS NOT NULL EXEC(N'ALTER TABLE [TaxDetails] DROP CONSTRAINT [' + @var125 + '];');
    ALTER TABLE [TaxDetails] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [TaxDetails] ADD [DataAreaId] nvarchar(10) NOT NULL DEFAULT N'';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [TaxDetails] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [TaxDetails] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [TaxDetails] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [TaxDetails] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var126 sysname;
    SELECT @var126 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[ReportsConfig]') AND [c].[name] = N'ModifiedBy');
    IF @var126 IS NOT NULL EXEC(N'ALTER TABLE [ReportsConfig] DROP CONSTRAINT [' + @var126 + '];');
    ALTER TABLE [ReportsConfig] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var127 sysname;
    SELECT @var127 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[ReportsConfig]') AND [c].[name] = N'CreatedBy');
    IF @var127 IS NOT NULL EXEC(N'ALTER TABLE [ReportsConfig] DROP CONSTRAINT [' + @var127 + '];');
    ALTER TABLE [ReportsConfig] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [ReportsConfig] ADD [DataAreaId] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [ReportsConfig] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [ReportsConfig] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [ReportsConfig] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [ReportsConfig] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Provinces] ADD [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Provinces] ADD [CreatedOn] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Provinces] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Provinces] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Provinces] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Provinces] ADD [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Provinces] ADD [ModifiedOn] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Provinces] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var128 sysname;
    SELECT @var128 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Projects]') AND [c].[name] = N'ModifiedBy');
    IF @var128 IS NOT NULL EXEC(N'ALTER TABLE [Projects] DROP CONSTRAINT [' + @var128 + '];');
    ALTER TABLE [Projects] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var129 sysname;
    SELECT @var129 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Projects]') AND [c].[name] = N'CreatedBy');
    IF @var129 IS NOT NULL EXEC(N'ALTER TABLE [Projects] DROP CONSTRAINT [' + @var129 + '];');
    ALTER TABLE [Projects] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Projects] ADD [DataAreaId] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Projects] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Projects] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Projects] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Projects] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var130 sysname;
    SELECT @var130 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[ProjCategories]') AND [c].[name] = N'ModifiedBy');
    IF @var130 IS NOT NULL EXEC(N'ALTER TABLE [ProjCategories] DROP CONSTRAINT [' + @var130 + '];');
    ALTER TABLE [ProjCategories] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var131 sysname;
    SELECT @var131 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[ProjCategories]') AND [c].[name] = N'CreatedBy');
    IF @var131 IS NOT NULL EXEC(N'ALTER TABLE [ProjCategories] DROP CONSTRAINT [' + @var131 + '];');
    ALTER TABLE [ProjCategories] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [ProjCategories] ADD [DataAreaId] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [ProjCategories] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [ProjCategories] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [ProjCategories] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [ProjCategories] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var132 sysname;
    SELECT @var132 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Positions]') AND [c].[name] = N'ModifiedBy');
    IF @var132 IS NOT NULL EXEC(N'ALTER TABLE [Positions] DROP CONSTRAINT [' + @var132 + '];');
    ALTER TABLE [Positions] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var133 sysname;
    SELECT @var133 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Positions]') AND [c].[name] = N'CreatedBy');
    IF @var133 IS NOT NULL EXEC(N'ALTER TABLE [Positions] DROP CONSTRAINT [' + @var133 + '];');
    ALTER TABLE [Positions] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Positions] ADD [DataAreaId] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Positions] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Positions] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Positions] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Positions] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var134 sysname;
    SELECT @var134 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[PositionRequirements]') AND [c].[name] = N'ModifiedBy');
    IF @var134 IS NOT NULL EXEC(N'ALTER TABLE [PositionRequirements] DROP CONSTRAINT [' + @var134 + '];');
    ALTER TABLE [PositionRequirements] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var135 sysname;
    SELECT @var135 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[PositionRequirements]') AND [c].[name] = N'CreatedBy');
    IF @var135 IS NOT NULL EXEC(N'ALTER TABLE [PositionRequirements] DROP CONSTRAINT [' + @var135 + '];');
    ALTER TABLE [PositionRequirements] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [PositionRequirements] ADD [DataAreaId] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [PositionRequirements] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [PositionRequirements] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [PositionRequirements] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [PositionRequirements] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var136 sysname;
    SELECT @var136 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[PayrollsProcess]') AND [c].[name] = N'ModifiedBy');
    IF @var136 IS NOT NULL EXEC(N'ALTER TABLE [PayrollsProcess] DROP CONSTRAINT [' + @var136 + '];');
    ALTER TABLE [PayrollsProcess] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var137 sysname;
    SELECT @var137 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[PayrollsProcess]') AND [c].[name] = N'CreatedBy');
    IF @var137 IS NOT NULL EXEC(N'ALTER TABLE [PayrollsProcess] DROP CONSTRAINT [' + @var137 + '];');
    ALTER TABLE [PayrollsProcess] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [PayrollsProcess] ADD [DataAreaId] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [PayrollsProcess] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [PayrollsProcess] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [PayrollsProcess] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [PayrollsProcess] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var138 sysname;
    SELECT @var138 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Payrolls]') AND [c].[name] = N'ModifiedBy');
    IF @var138 IS NOT NULL EXEC(N'ALTER TABLE [Payrolls] DROP CONSTRAINT [' + @var138 + '];');
    ALTER TABLE [Payrolls] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var139 sysname;
    SELECT @var139 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Payrolls]') AND [c].[name] = N'CreatedBy');
    IF @var139 IS NOT NULL EXEC(N'ALTER TABLE [Payrolls] DROP CONSTRAINT [' + @var139 + '];');
    ALTER TABLE [Payrolls] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Payrolls] ADD [DataAreaId] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Payrolls] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Payrolls] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Payrolls] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Payrolls] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var140 sysname;
    SELECT @var140 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[PayrollProcessDetails]') AND [c].[name] = N'ModifiedBy');
    IF @var140 IS NOT NULL EXEC(N'ALTER TABLE [PayrollProcessDetails] DROP CONSTRAINT [' + @var140 + '];');
    ALTER TABLE [PayrollProcessDetails] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var141 sysname;
    SELECT @var141 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[PayrollProcessDetails]') AND [c].[name] = N'CreatedBy');
    IF @var141 IS NOT NULL EXEC(N'ALTER TABLE [PayrollProcessDetails] DROP CONSTRAINT [' + @var141 + '];');
    ALTER TABLE [PayrollProcessDetails] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [PayrollProcessDetails] ADD [DataAreaId] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [PayrollProcessDetails] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [PayrollProcessDetails] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [PayrollProcessDetails] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [PayrollProcessDetails] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var142 sysname;
    SELECT @var142 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[PayrollProcessActions]') AND [c].[name] = N'ModifiedBy');
    IF @var142 IS NOT NULL EXEC(N'ALTER TABLE [PayrollProcessActions] DROP CONSTRAINT [' + @var142 + '];');
    ALTER TABLE [PayrollProcessActions] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var143 sysname;
    SELECT @var143 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[PayrollProcessActions]') AND [c].[name] = N'CreatedBy');
    IF @var143 IS NOT NULL EXEC(N'ALTER TABLE [PayrollProcessActions] DROP CONSTRAINT [' + @var143 + '];');
    ALTER TABLE [PayrollProcessActions] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [PayrollProcessActions] ADD [DataAreaId] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [PayrollProcessActions] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [PayrollProcessActions] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [PayrollProcessActions] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [PayrollProcessActions] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var144 sysname;
    SELECT @var144 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[PayCycles]') AND [c].[name] = N'ModifiedBy');
    IF @var144 IS NOT NULL EXEC(N'ALTER TABLE [PayCycles] DROP CONSTRAINT [' + @var144 + '];');
    ALTER TABLE [PayCycles] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var145 sysname;
    SELECT @var145 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[PayCycles]') AND [c].[name] = N'CreatedBy');
    IF @var145 IS NOT NULL EXEC(N'ALTER TABLE [PayCycles] DROP CONSTRAINT [' + @var145 + '];');
    ALTER TABLE [PayCycles] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [PayCycles] ADD [DataAreaId] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [PayCycles] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [PayCycles] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [PayCycles] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [PayCycles] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Occupations] ADD [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Occupations] ADD [CreatedOn] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Occupations] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Occupations] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Occupations] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Occupations] ADD [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Occupations] ADD [ModifiedOn] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Occupations] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [MenusApp] ADD [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [MenusApp] ADD [CreatedOn] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [MenusApp] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [MenusApp] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [MenusApp] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [MenusApp] ADD [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [MenusApp] ADD [ModifiedOn] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [MenusApp] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var146 sysname;
    SELECT @var146 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[MenuAssignedToUsers]') AND [c].[name] = N'ModifiedBy');
    IF @var146 IS NOT NULL EXEC(N'ALTER TABLE [MenuAssignedToUsers] DROP CONSTRAINT [' + @var146 + '];');
    ALTER TABLE [MenuAssignedToUsers] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var147 sysname;
    SELECT @var147 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[MenuAssignedToUsers]') AND [c].[name] = N'CreatedBy');
    IF @var147 IS NOT NULL EXEC(N'ALTER TABLE [MenuAssignedToUsers] DROP CONSTRAINT [' + @var147 + '];');
    ALTER TABLE [MenuAssignedToUsers] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [MenuAssignedToUsers] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [MenuAssignedToUsers] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [MenuAssignedToUsers] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [MenuAssignedToUsers] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var148 sysname;
    SELECT @var148 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Loans]') AND [c].[name] = N'ModifiedBy');
    IF @var148 IS NOT NULL EXEC(N'ALTER TABLE [Loans] DROP CONSTRAINT [' + @var148 + '];');
    ALTER TABLE [Loans] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var149 sysname;
    SELECT @var149 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Loans]') AND [c].[name] = N'CreatedBy');
    IF @var149 IS NOT NULL EXEC(N'ALTER TABLE [Loans] DROP CONSTRAINT [' + @var149 + '];');
    ALTER TABLE [Loans] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Loans] ADD [DataAreaId] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Loans] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Loans] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Loans] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Loans] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var150 sysname;
    SELECT @var150 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Jobs]') AND [c].[name] = N'ModifiedBy');
    IF @var150 IS NOT NULL EXEC(N'ALTER TABLE [Jobs] DROP CONSTRAINT [' + @var150 + '];');
    ALTER TABLE [Jobs] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var151 sysname;
    SELECT @var151 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Jobs]') AND [c].[name] = N'CreatedBy');
    IF @var151 IS NOT NULL EXEC(N'ALTER TABLE [Jobs] DROP CONSTRAINT [' + @var151 + '];');
    ALTER TABLE [Jobs] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Jobs] ADD [DataAreaId] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Jobs] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Jobs] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Jobs] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Jobs] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var152 sysname;
    SELECT @var152 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Instructors]') AND [c].[name] = N'ModifiedBy');
    IF @var152 IS NOT NULL EXEC(N'ALTER TABLE [Instructors] DROP CONSTRAINT [' + @var152 + '];');
    ALTER TABLE [Instructors] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var153 sysname;
    SELECT @var153 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Instructors]') AND [c].[name] = N'CreatedBy');
    IF @var153 IS NOT NULL EXEC(N'ALTER TABLE [Instructors] DROP CONSTRAINT [' + @var153 + '];');
    ALTER TABLE [Instructors] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Instructors] ADD [DataAreaId] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Instructors] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Instructors] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Instructors] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Instructors] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [GeneralConfigs] ADD [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [GeneralConfigs] ADD [CreatedOn] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [GeneralConfigs] ADD [DataAreaId] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [GeneralConfigs] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [GeneralConfigs] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [GeneralConfigs] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [GeneralConfigs] ADD [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [GeneralConfigs] ADD [ModifiedOn] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [GeneralConfigs] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [FormatCodes] ADD [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [FormatCodes] ADD [CreatedOn] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [FormatCodes] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [FormatCodes] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [FormatCodes] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [FormatCodes] ADD [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [FormatCodes] ADD [ModifiedOn] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [FormatCodes] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var154 sysname;
    SELECT @var154 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeWorkControlCalendars]') AND [c].[name] = N'ModifiedBy');
    IF @var154 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeWorkControlCalendars] DROP CONSTRAINT [' + @var154 + '];');
    ALTER TABLE [EmployeeWorkControlCalendars] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var155 sysname;
    SELECT @var155 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeWorkControlCalendars]') AND [c].[name] = N'CreatedBy');
    IF @var155 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeWorkControlCalendars] DROP CONSTRAINT [' + @var155 + '];');
    ALTER TABLE [EmployeeWorkControlCalendars] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeWorkControlCalendars] ADD [DataAreaId] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeWorkControlCalendars] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeWorkControlCalendars] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeWorkControlCalendars] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeWorkControlCalendars] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var156 sysname;
    SELECT @var156 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeWorkCalendars]') AND [c].[name] = N'ModifiedBy');
    IF @var156 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeWorkCalendars] DROP CONSTRAINT [' + @var156 + '];');
    ALTER TABLE [EmployeeWorkCalendars] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var157 sysname;
    SELECT @var157 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeWorkCalendars]') AND [c].[name] = N'CreatedBy');
    IF @var157 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeWorkCalendars] DROP CONSTRAINT [' + @var157 + '];');
    ALTER TABLE [EmployeeWorkCalendars] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeWorkCalendars] ADD [DataAreaId] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeWorkCalendars] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeWorkCalendars] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeWorkCalendars] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeWorkCalendars] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var158 sysname;
    SELECT @var158 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeTaxes]') AND [c].[name] = N'ModifiedBy');
    IF @var158 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeTaxes] DROP CONSTRAINT [' + @var158 + '];');
    ALTER TABLE [EmployeeTaxes] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var159 sysname;
    SELECT @var159 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeTaxes]') AND [c].[name] = N'CreatedBy');
    IF @var159 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeTaxes] DROP CONSTRAINT [' + @var159 + '];');
    ALTER TABLE [EmployeeTaxes] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeTaxes] ADD [DataAreaId] nvarchar(10) NOT NULL DEFAULT N'';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeTaxes] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeTaxes] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeTaxes] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeTaxes] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var160 sysname;
    SELECT @var160 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeesAddress]') AND [c].[name] = N'ModifiedBy');
    IF @var160 IS NOT NULL EXEC(N'ALTER TABLE [EmployeesAddress] DROP CONSTRAINT [' + @var160 + '];');
    ALTER TABLE [EmployeesAddress] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var161 sysname;
    SELECT @var161 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeesAddress]') AND [c].[name] = N'CreatedBy');
    IF @var161 IS NOT NULL EXEC(N'ALTER TABLE [EmployeesAddress] DROP CONSTRAINT [' + @var161 + '];');
    ALTER TABLE [EmployeesAddress] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeesAddress] ADD [DataAreaId] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeesAddress] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeesAddress] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeesAddress] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeesAddress] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var162 sysname;
    SELECT @var162 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Employees]') AND [c].[name] = N'ModifiedBy');
    IF @var162 IS NOT NULL EXEC(N'ALTER TABLE [Employees] DROP CONSTRAINT [' + @var162 + '];');
    ALTER TABLE [Employees] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var163 sysname;
    SELECT @var163 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Employees]') AND [c].[name] = N'CreatedBy');
    IF @var163 IS NOT NULL EXEC(N'ALTER TABLE [Employees] DROP CONSTRAINT [' + @var163 + '];');
    ALTER TABLE [Employees] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Employees] ADD [DataAreaId] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Employees] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Employees] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Employees] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Employees] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var164 sysname;
    SELECT @var164 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeePositions]') AND [c].[name] = N'ModifiedBy');
    IF @var164 IS NOT NULL EXEC(N'ALTER TABLE [EmployeePositions] DROP CONSTRAINT [' + @var164 + '];');
    ALTER TABLE [EmployeePositions] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var165 sysname;
    SELECT @var165 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeePositions]') AND [c].[name] = N'CreatedBy');
    IF @var165 IS NOT NULL EXEC(N'ALTER TABLE [EmployeePositions] DROP CONSTRAINT [' + @var165 + '];');
    ALTER TABLE [EmployeePositions] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeePositions] ADD [DataAreaId] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeePositions] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeePositions] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeePositions] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeePositions] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var166 sysname;
    SELECT @var166 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeLoans]') AND [c].[name] = N'ModifiedBy');
    IF @var166 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeLoans] DROP CONSTRAINT [' + @var166 + '];');
    ALTER TABLE [EmployeeLoans] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var167 sysname;
    SELECT @var167 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeLoans]') AND [c].[name] = N'CreatedBy');
    IF @var167 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeLoans] DROP CONSTRAINT [' + @var167 + '];');
    ALTER TABLE [EmployeeLoans] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeLoans] ADD [DataAreaId] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeLoans] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeLoans] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeLoans] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeLoans] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var168 sysname;
    SELECT @var168 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeLoanHistories]') AND [c].[name] = N'ModifiedBy');
    IF @var168 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeLoanHistories] DROP CONSTRAINT [' + @var168 + '];');
    ALTER TABLE [EmployeeLoanHistories] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var169 sysname;
    SELECT @var169 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeLoanHistories]') AND [c].[name] = N'CreatedBy');
    IF @var169 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeLoanHistories] DROP CONSTRAINT [' + @var169 + '];');
    ALTER TABLE [EmployeeLoanHistories] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeLoanHistories] ADD [DataAreaId] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeLoanHistories] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeLoanHistories] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeLoanHistories] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeLoanHistories] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var170 sysname;
    SELECT @var170 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeImages]') AND [c].[name] = N'ModifiedBy');
    IF @var170 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeImages] DROP CONSTRAINT [' + @var170 + '];');
    ALTER TABLE [EmployeeImages] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var171 sysname;
    SELECT @var171 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeImages]') AND [c].[name] = N'CreatedBy');
    IF @var171 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeImages] DROP CONSTRAINT [' + @var171 + '];');
    ALTER TABLE [EmployeeImages] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeImages] ADD [DataAreaId] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeImages] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeImages] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeImages] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeImages] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeHistories] ADD [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeHistories] ADD [CreatedOn] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeHistories] ADD [DataAreaId] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeHistories] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeHistories] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeHistories] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeHistories] ADD [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeHistories] ADD [ModifiedOn] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeHistories] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var172 sysname;
    SELECT @var172 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeExtraHours]') AND [c].[name] = N'ModifiedBy');
    IF @var172 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeExtraHours] DROP CONSTRAINT [' + @var172 + '];');
    ALTER TABLE [EmployeeExtraHours] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var173 sysname;
    SELECT @var173 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeExtraHours]') AND [c].[name] = N'CreatedBy');
    IF @var173 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeExtraHours] DROP CONSTRAINT [' + @var173 + '];');
    ALTER TABLE [EmployeeExtraHours] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeExtraHours] ADD [DataAreaId] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeExtraHours] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeExtraHours] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeExtraHours] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeExtraHours] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var174 sysname;
    SELECT @var174 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeEarningCodes]') AND [c].[name] = N'ModifiedBy');
    IF @var174 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeEarningCodes] DROP CONSTRAINT [' + @var174 + '];');
    ALTER TABLE [EmployeeEarningCodes] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var175 sysname;
    SELECT @var175 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeEarningCodes]') AND [c].[name] = N'CreatedBy');
    IF @var175 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeEarningCodes] DROP CONSTRAINT [' + @var175 + '];');
    ALTER TABLE [EmployeeEarningCodes] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeEarningCodes] ADD [DataAreaId] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeEarningCodes] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeEarningCodes] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeEarningCodes] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeEarningCodes] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var176 sysname;
    SELECT @var176 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeDocuments]') AND [c].[name] = N'ModifiedBy');
    IF @var176 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeDocuments] DROP CONSTRAINT [' + @var176 + '];');
    ALTER TABLE [EmployeeDocuments] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var177 sysname;
    SELECT @var177 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeDocuments]') AND [c].[name] = N'CreatedBy');
    IF @var177 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeDocuments] DROP CONSTRAINT [' + @var177 + '];');
    ALTER TABLE [EmployeeDocuments] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeDocuments] ADD [DataAreaId] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeDocuments] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeDocuments] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeDocuments] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeDocuments] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var178 sysname;
    SELECT @var178 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeDepartments]') AND [c].[name] = N'ModifiedBy');
    IF @var178 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeDepartments] DROP CONSTRAINT [' + @var178 + '];');
    ALTER TABLE [EmployeeDepartments] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var179 sysname;
    SELECT @var179 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeDepartments]') AND [c].[name] = N'CreatedBy');
    IF @var179 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeDepartments] DROP CONSTRAINT [' + @var179 + '];');
    ALTER TABLE [EmployeeDepartments] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeDepartments] ADD [DataAreaId] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeDepartments] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeDepartments] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeDepartments] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeDepartments] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var180 sysname;
    SELECT @var180 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeDeductionCodes]') AND [c].[name] = N'ModifiedBy');
    IF @var180 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeDeductionCodes] DROP CONSTRAINT [' + @var180 + '];');
    ALTER TABLE [EmployeeDeductionCodes] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var181 sysname;
    SELECT @var181 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeDeductionCodes]') AND [c].[name] = N'CreatedBy');
    IF @var181 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeDeductionCodes] DROP CONSTRAINT [' + @var181 + '];');
    ALTER TABLE [EmployeeDeductionCodes] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeDeductionCodes] ADD [DataAreaId] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeDeductionCodes] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeDeductionCodes] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeDeductionCodes] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeDeductionCodes] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var182 sysname;
    SELECT @var182 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeContactsInf]') AND [c].[name] = N'ModifiedBy');
    IF @var182 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeContactsInf] DROP CONSTRAINT [' + @var182 + '];');
    ALTER TABLE [EmployeeContactsInf] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var183 sysname;
    SELECT @var183 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeContactsInf]') AND [c].[name] = N'CreatedBy');
    IF @var183 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeContactsInf] DROP CONSTRAINT [' + @var183 + '];');
    ALTER TABLE [EmployeeContactsInf] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeContactsInf] ADD [DataAreaId] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeContactsInf] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeContactsInf] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeContactsInf] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeContactsInf] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var184 sysname;
    SELECT @var184 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeBankAccounts]') AND [c].[name] = N'ModifiedBy');
    IF @var184 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeBankAccounts] DROP CONSTRAINT [' + @var184 + '];');
    ALTER TABLE [EmployeeBankAccounts] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var185 sysname;
    SELECT @var185 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeBankAccounts]') AND [c].[name] = N'CreatedBy');
    IF @var185 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeBankAccounts] DROP CONSTRAINT [' + @var185 + '];');
    ALTER TABLE [EmployeeBankAccounts] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeBankAccounts] ADD [DataAreaId] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeBankAccounts] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeBankAccounts] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeBankAccounts] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeBankAccounts] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EducationLevels] ADD [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EducationLevels] ADD [CreatedOn] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EducationLevels] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EducationLevels] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EducationLevels] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EducationLevels] ADD [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EducationLevels] ADD [ModifiedOn] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EducationLevels] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var186 sysname;
    SELECT @var186 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EarningCodeVersions]') AND [c].[name] = N'ModifiedBy');
    IF @var186 IS NOT NULL EXEC(N'ALTER TABLE [EarningCodeVersions] DROP CONSTRAINT [' + @var186 + '];');
    ALTER TABLE [EarningCodeVersions] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var187 sysname;
    SELECT @var187 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EarningCodeVersions]') AND [c].[name] = N'CreatedBy');
    IF @var187 IS NOT NULL EXEC(N'ALTER TABLE [EarningCodeVersions] DROP CONSTRAINT [' + @var187 + '];');
    ALTER TABLE [EarningCodeVersions] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EarningCodeVersions] ADD [DataAreaId] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EarningCodeVersions] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EarningCodeVersions] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EarningCodeVersions] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EarningCodeVersions] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var188 sysname;
    SELECT @var188 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EarningCodes]') AND [c].[name] = N'ModifiedBy');
    IF @var188 IS NOT NULL EXEC(N'ALTER TABLE [EarningCodes] DROP CONSTRAINT [' + @var188 + '];');
    ALTER TABLE [EarningCodes] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var189 sysname;
    SELECT @var189 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EarningCodes]') AND [c].[name] = N'CreatedBy');
    IF @var189 IS NOT NULL EXEC(N'ALTER TABLE [EarningCodes] DROP CONSTRAINT [' + @var189 + '];');
    ALTER TABLE [EarningCodes] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EarningCodes] ADD [DataAreaId] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EarningCodes] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EarningCodes] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EarningCodes] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EarningCodes] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [DisabilityTypes] ADD [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [DisabilityTypes] ADD [CreatedOn] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [DisabilityTypes] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [DisabilityTypes] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [DisabilityTypes] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [DisabilityTypes] ADD [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [DisabilityTypes] ADD [ModifiedOn] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [DisabilityTypes] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var190 sysname;
    SELECT @var190 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Departments]') AND [c].[name] = N'ModifiedBy');
    IF @var190 IS NOT NULL EXEC(N'ALTER TABLE [Departments] DROP CONSTRAINT [' + @var190 + '];');
    ALTER TABLE [Departments] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var191 sysname;
    SELECT @var191 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Departments]') AND [c].[name] = N'CreatedBy');
    IF @var191 IS NOT NULL EXEC(N'ALTER TABLE [Departments] DROP CONSTRAINT [' + @var191 + '];');
    ALTER TABLE [Departments] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Departments] ADD [DataAreaId] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Departments] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Departments] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Departments] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Departments] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var192 sysname;
    SELECT @var192 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[DeductionCodeVersions]') AND [c].[name] = N'ModifiedBy');
    IF @var192 IS NOT NULL EXEC(N'ALTER TABLE [DeductionCodeVersions] DROP CONSTRAINT [' + @var192 + '];');
    ALTER TABLE [DeductionCodeVersions] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var193 sysname;
    SELECT @var193 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[DeductionCodeVersions]') AND [c].[name] = N'CreatedBy');
    IF @var193 IS NOT NULL EXEC(N'ALTER TABLE [DeductionCodeVersions] DROP CONSTRAINT [' + @var193 + '];');
    ALTER TABLE [DeductionCodeVersions] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [DeductionCodeVersions] ADD [DataAreaId] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [DeductionCodeVersions] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [DeductionCodeVersions] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [DeductionCodeVersions] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [DeductionCodeVersions] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var194 sysname;
    SELECT @var194 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[DeductionCodes]') AND [c].[name] = N'ModifiedBy');
    IF @var194 IS NOT NULL EXEC(N'ALTER TABLE [DeductionCodes] DROP CONSTRAINT [' + @var194 + '];');
    ALTER TABLE [DeductionCodes] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var195 sysname;
    SELECT @var195 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[DeductionCodes]') AND [c].[name] = N'CreatedBy');
    IF @var195 IS NOT NULL EXEC(N'ALTER TABLE [DeductionCodes] DROP CONSTRAINT [' + @var195 + '];');
    ALTER TABLE [DeductionCodes] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [DeductionCodes] ADD [DataAreaId] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [DeductionCodes] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [DeductionCodes] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [DeductionCodes] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [DeductionCodes] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Currencies] ADD [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Currencies] ADD [CreatedOn] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Currencies] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Currencies] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Currencies] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Currencies] ADD [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Currencies] ADD [ModifiedOn] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Currencies] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var196 sysname;
    SELECT @var196 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[CourseTypes]') AND [c].[name] = N'ModifiedBy');
    IF @var196 IS NOT NULL EXEC(N'ALTER TABLE [CourseTypes] DROP CONSTRAINT [' + @var196 + '];');
    ALTER TABLE [CourseTypes] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var197 sysname;
    SELECT @var197 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[CourseTypes]') AND [c].[name] = N'CreatedBy');
    IF @var197 IS NOT NULL EXEC(N'ALTER TABLE [CourseTypes] DROP CONSTRAINT [' + @var197 + '];');
    ALTER TABLE [CourseTypes] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [CourseTypes] ADD [DataAreaId] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [CourseTypes] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [CourseTypes] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [CourseTypes] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [CourseTypes] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var198 sysname;
    SELECT @var198 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Courses]') AND [c].[name] = N'ModifiedBy');
    IF @var198 IS NOT NULL EXEC(N'ALTER TABLE [Courses] DROP CONSTRAINT [' + @var198 + '];');
    ALTER TABLE [Courses] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var199 sysname;
    SELECT @var199 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Courses]') AND [c].[name] = N'CreatedBy');
    IF @var199 IS NOT NULL EXEC(N'ALTER TABLE [Courses] DROP CONSTRAINT [' + @var199 + '];');
    ALTER TABLE [Courses] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Courses] ADD [DataAreaId] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Courses] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Courses] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Courses] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Courses] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var200 sysname;
    SELECT @var200 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[CoursePositions]') AND [c].[name] = N'ModifiedBy');
    IF @var200 IS NOT NULL EXEC(N'ALTER TABLE [CoursePositions] DROP CONSTRAINT [' + @var200 + '];');
    ALTER TABLE [CoursePositions] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var201 sysname;
    SELECT @var201 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[CoursePositions]') AND [c].[name] = N'CreatedBy');
    IF @var201 IS NOT NULL EXEC(N'ALTER TABLE [CoursePositions] DROP CONSTRAINT [' + @var201 + '];');
    ALTER TABLE [CoursePositions] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [CoursePositions] ADD [DataAreaId] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [CoursePositions] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [CoursePositions] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [CoursePositions] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [CoursePositions] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var202 sysname;
    SELECT @var202 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[CourseLocations]') AND [c].[name] = N'ModifiedBy');
    IF @var202 IS NOT NULL EXEC(N'ALTER TABLE [CourseLocations] DROP CONSTRAINT [' + @var202 + '];');
    ALTER TABLE [CourseLocations] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var203 sysname;
    SELECT @var203 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[CourseLocations]') AND [c].[name] = N'CreatedBy');
    IF @var203 IS NOT NULL EXEC(N'ALTER TABLE [CourseLocations] DROP CONSTRAINT [' + @var203 + '];');
    ALTER TABLE [CourseLocations] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [CourseLocations] ADD [DataAreaId] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [CourseLocations] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [CourseLocations] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [CourseLocations] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [CourseLocations] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var204 sysname;
    SELECT @var204 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[CourseInstructors]') AND [c].[name] = N'ModifiedBy');
    IF @var204 IS NOT NULL EXEC(N'ALTER TABLE [CourseInstructors] DROP CONSTRAINT [' + @var204 + '];');
    ALTER TABLE [CourseInstructors] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var205 sysname;
    SELECT @var205 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[CourseInstructors]') AND [c].[name] = N'CreatedBy');
    IF @var205 IS NOT NULL EXEC(N'ALTER TABLE [CourseInstructors] DROP CONSTRAINT [' + @var205 + '];');
    ALTER TABLE [CourseInstructors] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [CourseInstructors] ADD [DataAreaId] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [CourseInstructors] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [CourseInstructors] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [CourseInstructors] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [CourseInstructors] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var206 sysname;
    SELECT @var206 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[CourseEmployees]') AND [c].[name] = N'ModifiedBy');
    IF @var206 IS NOT NULL EXEC(N'ALTER TABLE [CourseEmployees] DROP CONSTRAINT [' + @var206 + '];');
    ALTER TABLE [CourseEmployees] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var207 sysname;
    SELECT @var207 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[CourseEmployees]') AND [c].[name] = N'CreatedBy');
    IF @var207 IS NOT NULL EXEC(N'ALTER TABLE [CourseEmployees] DROP CONSTRAINT [' + @var207 + '];');
    ALTER TABLE [CourseEmployees] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [CourseEmployees] ADD [DataAreaId] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [CourseEmployees] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [CourseEmployees] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [CourseEmployees] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [CourseEmployees] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Countries] ADD [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Countries] ADD [CreatedOn] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Countries] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Countries] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Countries] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Countries] ADD [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Countries] ADD [ModifiedOn] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Countries] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var208 sysname;
    SELECT @var208 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[CompaniesAssignedToUsers]') AND [c].[name] = N'ModifiedBy');
    IF @var208 IS NOT NULL EXEC(N'ALTER TABLE [CompaniesAssignedToUsers] DROP CONSTRAINT [' + @var208 + '];');
    ALTER TABLE [CompaniesAssignedToUsers] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var209 sysname;
    SELECT @var209 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[CompaniesAssignedToUsers]') AND [c].[name] = N'CreatedBy');
    IF @var209 IS NOT NULL EXEC(N'ALTER TABLE [CompaniesAssignedToUsers] DROP CONSTRAINT [' + @var209 + '];');
    ALTER TABLE [CompaniesAssignedToUsers] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [CompaniesAssignedToUsers] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [CompaniesAssignedToUsers] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [CompaniesAssignedToUsers] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [CompaniesAssignedToUsers] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Companies] ADD [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Companies] ADD [CreatedOn] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Companies] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Companies] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Companies] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Companies] ADD [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Companies] ADD [ModifiedOn] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Companies] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var210 sysname;
    SELECT @var210 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[ClassRooms]') AND [c].[name] = N'ModifiedBy');
    IF @var210 IS NOT NULL EXEC(N'ALTER TABLE [ClassRooms] DROP CONSTRAINT [' + @var210 + '];');
    ALTER TABLE [ClassRooms] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var211 sysname;
    SELECT @var211 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[ClassRooms]') AND [c].[name] = N'CreatedBy');
    IF @var211 IS NOT NULL EXEC(N'ALTER TABLE [ClassRooms] DROP CONSTRAINT [' + @var211 + '];');
    ALTER TABLE [ClassRooms] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [ClassRooms] ADD [DataAreaId] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [ClassRooms] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [ClassRooms] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [ClassRooms] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [ClassRooms] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [CalendarHolidays] ADD [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [CalendarHolidays] ADD [CreatedOn] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [CalendarHolidays] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [CalendarHolidays] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [CalendarHolidays] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [CalendarHolidays] ADD [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [CalendarHolidays] ADD [ModifiedOn] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [CalendarHolidays] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var212 sysname;
    SELECT @var212 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[BatchHistories]') AND [c].[name] = N'ModifiedBy');
    IF @var212 IS NOT NULL EXEC(N'ALTER TABLE [BatchHistories] DROP CONSTRAINT [' + @var212 + '];');
    ALTER TABLE [BatchHistories] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    DECLARE @var213 sysname;
    SELECT @var213 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[BatchHistories]') AND [c].[name] = N'CreatedBy');
    IF @var213 IS NOT NULL EXEC(N'ALTER TABLE [BatchHistories] DROP CONSTRAINT [' + @var213 + '];');
    ALTER TABLE [BatchHistories] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [BatchHistories] ADD [DataAreaId] nvarchar(10) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [BatchHistories] ADD [DeletedBy] nvarchar(20) NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [BatchHistories] ADD [DeletedOn] datetime2 NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [BatchHistories] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [BatchHistories] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [Taxes] ADD CONSTRAINT [PK_Taxes] PRIMARY KEY ([TaxId], [DataAreaId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [TaxDetails] ADD CONSTRAINT [PK_TaxDetails] PRIMARY KEY ([InternalId], [TaxId], [DataAreaId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
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
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC(N'UPDATE [Companies] SET [CreatedBy] = NULL, [CreatedOn] = ''0001-01-01T00:00:00.0000000'', [DeletedBy] = NULL, [DeletedOn] = NULL, [IsDeleted] = CAST(0 AS bit), [ModifiedBy] = NULL, [ModifiedOn] = ''0001-01-01T00:00:00.0000000'', [RecId] = CAST(0 AS bigint)
    WHERE [CompanyId] = N''Root'';
    SELECT @@ROWCOUNT');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC(N'UPDATE [Countries] SET [CreatedBy] = NULL, [CreatedOn] = ''0001-01-01T00:00:00.0000000'', [DeletedBy] = NULL, [DeletedOn] = NULL, [IsDeleted] = CAST(0 AS bit), [ModifiedBy] = NULL, [ModifiedOn] = ''0001-01-01T00:00:00.0000000'', [RecId] = CAST(0 AS bigint)
    WHERE [CountryId] = N''CH'';
    SELECT @@ROWCOUNT');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC(N'UPDATE [Countries] SET [CreatedBy] = NULL, [CreatedOn] = ''0001-01-01T00:00:00.0000000'', [DeletedBy] = NULL, [DeletedOn] = NULL, [IsDeleted] = CAST(0 AS bit), [ModifiedBy] = NULL, [ModifiedOn] = ''0001-01-01T00:00:00.0000000'', [RecId] = CAST(0 AS bigint)
    WHERE [CountryId] = N''DOM'';
    SELECT @@ROWCOUNT');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC(N'UPDATE [Currencies] SET [CreatedBy] = NULL, [CreatedOn] = ''0001-01-01T00:00:00.0000000'', [DeletedBy] = NULL, [DeletedOn] = NULL, [IsDeleted] = CAST(0 AS bit), [ModifiedBy] = NULL, [ModifiedOn] = ''0001-01-01T00:00:00.0000000'', [RecId] = CAST(0 AS bigint)
    WHERE [CurrencyId] = N''DOP'';
    SELECT @@ROWCOUNT');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC(N'UPDATE [Currencies] SET [CreatedBy] = NULL, [CreatedOn] = ''0001-01-01T00:00:00.0000000'', [DeletedBy] = NULL, [DeletedOn] = NULL, [IsDeleted] = CAST(0 AS bit), [ModifiedBy] = NULL, [ModifiedOn] = ''0001-01-01T00:00:00.0000000'', [RecId] = CAST(0 AS bigint)
    WHERE [CurrencyId] = N''USD'';
    SELECT @@ROWCOUNT');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC(N'UPDATE [FormatCodes] SET [CreatedBy] = NULL, [CreatedOn] = ''0001-01-01T00:00:00.0000000'', [DeletedBy] = NULL, [DeletedOn] = NULL, [IsDeleted] = CAST(0 AS bit), [ModifiedBy] = NULL, [ModifiedOn] = ''0001-01-01T00:00:00.0000000'', [RecId] = CAST(0 AS bigint)
    WHERE [FormatCodeId] = N''en-US'';
    SELECT @@ROWCOUNT');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC(N'UPDATE [FormatCodes] SET [CreatedBy] = NULL, [CreatedOn] = ''0001-01-01T00:00:00.0000000'', [DeletedBy] = NULL, [DeletedOn] = NULL, [IsDeleted] = CAST(0 AS bit), [ModifiedBy] = NULL, [ModifiedOn] = ''0001-01-01T00:00:00.0000000'', [RecId] = CAST(0 AS bigint)
    WHERE [FormatCodeId] = N''es-ES'';
    SELECT @@ROWCOUNT');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC(N'UPDATE [MenusApp] SET [CreatedBy] = NULL, [CreatedOn] = ''0001-01-01T00:00:00.0000000'', [DeletedBy] = NULL, [DeletedOn] = NULL, [IsDeleted] = CAST(0 AS bit), [ModifiedBy] = NULL, [ModifiedOn] = ''0001-01-01T00:00:00.0000000'', [RecId] = CAST(0 AS bigint)
    WHERE [MenuId] = N''MENU-0002'';
    SELECT @@ROWCOUNT');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC(N'UPDATE [MenusApp] SET [CreatedBy] = NULL, [CreatedOn] = ''0001-01-01T00:00:00.0000000'', [DeletedBy] = NULL, [DeletedOn] = NULL, [IsDeleted] = CAST(0 AS bit), [ModifiedBy] = NULL, [ModifiedOn] = ''0001-01-01T00:00:00.0000000'', [RecId] = CAST(0 AS bigint)
    WHERE [MenuId] = N''MENU-0057'';
    SELECT @@ROWCOUNT');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    EXEC(N'UPDATE [Users] SET [DeletedBy] = NULL, [DeletedOn] = NULL, [IsDeleted] = CAST(0 AS bit), [RecId] = CAST(0 AS bigint)
    WHERE [Alias] = N''Admin'';
    SELECT @@ROWCOUNT');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    CREATE INDEX [IX_TaxDetails_TaxId_DataAreaId] ON [TaxDetails] ([TaxId], [DataAreaId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    CREATE INDEX [IX_EmployeeTaxes_TaxId_DataAreaId] ON [EmployeeTaxes] ([TaxId], [DataAreaId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    CREATE INDEX [IX_AuditLog_ChangedAt] ON [AuditLogs] ([ChangedAt]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    CREATE INDEX [IX_AuditLog_ChangedBy] ON [AuditLogs] ([ChangedBy]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    CREATE INDEX [IX_AuditLog_DataAreaId] ON [AuditLogs] ([DataAreaId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    CREATE INDEX [IX_AuditLog_EntityName_EntityRefRecId] ON [AuditLogs] ([EntityName], [EntityRefRecId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [EmployeeTaxes] ADD CONSTRAINT [FK_EmployeeTaxes_Taxes_TaxId_DataAreaId] FOREIGN KEY ([TaxId], [DataAreaId]) REFERENCES [Taxes] ([TaxId], [DataAreaId]) ON DELETE CASCADE;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    ALTER TABLE [TaxDetails] ADD CONSTRAINT [FK_TaxDetails_Taxes_TaxId_DataAreaId] FOREIGN KEY ([TaxId], [DataAreaId]) REFERENCES [Taxes] ([TaxId], [DataAreaId]) ON DELETE CASCADE;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20251125215507_AuditSystem_ISO27001'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20251125215507_AuditSystem_ISO27001', N'9.0.2');
END;

COMMIT;
GO

