BEGIN TRANSACTION;
DECLARE @var sysname;
SELECT @var = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Departments]') AND [c].[name] = N'DepartmentId');
IF @var IS NOT NULL EXEC(N'ALTER TABLE [Departments] DROP CONSTRAINT [' + @var + '];');
ALTER TABLE [Departments] ADD DEFAULT (FORMAT((NEXT VALUE FOR dbo.DepartmentId),'DPT-00000000#')) FOR [DepartmentId];

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210407220601_des-2', N'9.0.2');

ALTER TABLE [Departments] ADD [DepartamentStatus] bit NOT NULL DEFAULT CAST(0 AS bit);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210410223401_des-3', N'9.0.2');

ALTER TABLE [Users] DROP CONSTRAINT [FK_Users_FormatCode_FormatCodeId];

ALTER TABLE [FormatCode] DROP CONSTRAINT [PK_FormatCode];

EXEC sp_rename N'[FormatCode]', N'FormatCodes', 'OBJECT';

DECLARE @var1 sysname;
SELECT @var1 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Departments]') AND [c].[name] = N'Name');
IF @var1 IS NOT NULL EXEC(N'ALTER TABLE [Departments] DROP CONSTRAINT [' + @var1 + '];');
ALTER TABLE [Departments] ALTER COLUMN [Name] nvarchar(60) NOT NULL;

ALTER TABLE [FormatCodes] ADD CONSTRAINT [PK_FormatCodes] PRIMARY KEY ([FormatCodeId]);

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

UPDATE [Users] SET [ElevationType] = 0
WHERE [Alias] = N'Admin';
SELECT @@ROWCOUNT;


CREATE INDEX [IX_CompaniesAssignedToUsers_CompanyId] ON [CompaniesAssignedToUsers] ([CompanyId]);

CREATE INDEX [IX_MenuAssignedToUsers_MenuId] ON [MenuAssignedToUsers] ([MenuId]);

ALTER TABLE [Users] ADD CONSTRAINT [FK_Users_FormatCodes_FormatCodeId] FOREIGN KEY ([FormatCodeId]) REFERENCES [FormatCodes] ([FormatCodeId]) ON DELETE CASCADE;

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210413222605_des-4', N'9.0.2');

ALTER TABLE [MenusApp] ADD [Sort] int NOT NULL DEFAULT 0;

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210414010903_des-5', N'9.0.2');

ALTER TABLE [Users] ADD [TemporaryPassword] nvarchar(max) NULL;

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210414172539_des-6', N'9.0.2');

ALTER TABLE [Users] ADD [DateTemporaryPassword] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210414173034_des-7', N'9.0.2');

DELETE FROM [MenusApp]
WHERE [MenuId] = N'MENU-0001';
SELECT @@ROWCOUNT;


CREATE TABLE [UserImages] (
    [Alias] nvarchar(450) NOT NULL,
    [Image] varbinary(max) NULL,
    [Extension] nvarchar(4) NOT NULL,
    CONSTRAINT [PK_UserImages] PRIMARY KEY ([Alias])
);

UPDATE [Country] SET [Name] = N'República Dominicana'
WHERE [CountryId] = N'DOM';
SELECT @@ROWCOUNT;


IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'MenuId', N'Action', N'Description', N'Icon', N'MenuFather', N'MenuName', N'Sort') AND [object_id] = OBJECT_ID(N'[MenusApp]'))
    SET IDENTITY_INSERT [MenusApp] ON;
INSERT INTO [MenusApp] ([MenuId], [Action], [Description], [Icon], [MenuFather], [MenuName], [Sort])
VALUES (N'MENU-0006', N'Click', N'Título de configuración', N'fa fa-setting', NULL, N'Configuración', 0);
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'MenuId', N'Action', N'Description', N'Icon', N'MenuFather', N'MenuName', N'Sort') AND [object_id] = OBJECT_ID(N'[MenusApp]'))
    SET IDENTITY_INSERT [MenusApp] OFF;

UPDATE [MenusApp] SET [MenuFather] = N'MENU-0006'
WHERE [MenuId] = N'MENU-0002';
SELECT @@ROWCOUNT;


INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210417182317_des-8', N'9.0.2');

ALTER TABLE [Instructor] DROP CONSTRAINT [PK_Instructor];

ALTER TABLE [CourseType] DROP CONSTRAINT [PK_CourseType];

EXEC sp_rename N'[Instructor]', N'Instructors', 'OBJECT';

EXEC sp_rename N'[CourseType]', N'CourseTypes', 'OBJECT';

EXEC sp_rename N'[Instructors].[IntructorId]', N'InstructorId', 'COLUMN';

DECLARE @var2 sysname;
SELECT @var2 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[CourseLocations]') AND [c].[name] = N'Phone');
IF @var2 IS NOT NULL EXEC(N'ALTER TABLE [CourseLocations] DROP CONSTRAINT [' + @var2 + '];');
ALTER TABLE [CourseLocations] ALTER COLUMN [Phone] nvarchar(20) NULL;

DECLARE @var3 sysname;
SELECT @var3 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[CourseLocations]') AND [c].[name] = N'Mail');
IF @var3 IS NOT NULL EXEC(N'ALTER TABLE [CourseLocations] DROP CONSTRAINT [' + @var3 + '];');
ALTER TABLE [CourseLocations] ALTER COLUMN [Mail] nvarchar(100) NULL;

ALTER TABLE [CourseLocations] ADD [CourseLocationStatus] bit NOT NULL DEFAULT CAST(0 AS bit);

DECLARE @var4 sysname;
SELECT @var4 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Instructors]') AND [c].[name] = N'Phone');
IF @var4 IS NOT NULL EXEC(N'ALTER TABLE [Instructors] DROP CONSTRAINT [' + @var4 + '];');
ALTER TABLE [Instructors] ALTER COLUMN [Phone] nvarchar(20) NULL;

DECLARE @var5 sysname;
SELECT @var5 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Instructors]') AND [c].[name] = N'Mail');
IF @var5 IS NOT NULL EXEC(N'ALTER TABLE [Instructors] DROP CONSTRAINT [' + @var5 + '];');
ALTER TABLE [Instructors] ALTER COLUMN [Mail] nvarchar(100) NULL;

ALTER TABLE [Instructors] ADD CONSTRAINT [PK_Instructors] PRIMARY KEY ([InstructorId]);

ALTER TABLE [CourseTypes] ADD CONSTRAINT [PK_CourseTypes] PRIMARY KEY ([CourseTypeId]);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210422161329_des-9', N'9.0.2');

DECLARE @var6 sysname;
SELECT @var6 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[CourseTypes]') AND [c].[name] = N'Name');
IF @var6 IS NOT NULL EXEC(N'ALTER TABLE [CourseTypes] DROP CONSTRAINT [' + @var6 + '];');
ALTER TABLE [CourseTypes] ALTER COLUMN [Name] nvarchar(50) NOT NULL;

DECLARE @var7 sysname;
SELECT @var7 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[CourseTypes]') AND [c].[name] = N'Description');
IF @var7 IS NOT NULL EXEC(N'ALTER TABLE [CourseTypes] DROP CONSTRAINT [' + @var7 + '];');
ALTER TABLE [CourseTypes] ALTER COLUMN [Description] nvarchar(200) NULL;

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210427163100_des-10', N'9.0.2');

DECLARE @var8 sysname;
SELECT @var8 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Instructors]') AND [c].[name] = N'Name');
IF @var8 IS NOT NULL EXEC(N'ALTER TABLE [Instructors] DROP CONSTRAINT [' + @var8 + '];');
ALTER TABLE [Instructors] ALTER COLUMN [Name] nvarchar(50) NOT NULL;

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210427223701_des-11', N'9.0.2');

DECLARE @var9 sysname;
SELECT @var9 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[CourseLocations]') AND [c].[name] = N'CourseLocationStatus');
IF @var9 IS NOT NULL EXEC(N'ALTER TABLE [CourseLocations] DROP CONSTRAINT [' + @var9 + '];');
ALTER TABLE [CourseLocations] DROP COLUMN [CourseLocationStatus];

DECLARE @var10 sysname;
SELECT @var10 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[CourseLocations]') AND [c].[name] = N'Name');
IF @var10 IS NOT NULL EXEC(N'ALTER TABLE [CourseLocations] DROP CONSTRAINT [' + @var10 + '];');
ALTER TABLE [CourseLocations] ALTER COLUMN [Name] nvarchar(50) NOT NULL;

DECLARE @var11 sysname;
SELECT @var11 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[CourseLocations]') AND [c].[name] = N'ContactName');
IF @var11 IS NOT NULL EXEC(N'ALTER TABLE [CourseLocations] DROP CONSTRAINT [' + @var11 + '];');
UPDATE [CourseLocations] SET [ContactName] = N'' WHERE [ContactName] IS NULL;
ALTER TABLE [CourseLocations] ALTER COLUMN [ContactName] nvarchar(50) NOT NULL;
ALTER TABLE [CourseLocations] ADD DEFAULT N'' FOR [ContactName];

DECLARE @var12 sysname;
SELECT @var12 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[ClassRooms]') AND [c].[name] = N'Name');
IF @var12 IS NOT NULL EXEC(N'ALTER TABLE [ClassRooms] DROP CONSTRAINT [' + @var12 + '];');
ALTER TABLE [ClassRooms] ALTER COLUMN [Name] nvarchar(50) NOT NULL;

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210427235744_des-12', N'9.0.2');

CREATE SEQUENCE [CourseId] AS int START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 999999 NO CYCLE;

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

CREATE TABLE [CourseInstructors] (
    [CourseId] nvarchar(20) NOT NULL,
    [InstructorId] nvarchar(20) NOT NULL,
    [Comment] nvarchar(300) NOT NULL,
    CONSTRAINT [PK_CourseInstructors] PRIMARY KEY ([CourseId], [InstructorId]),
    CONSTRAINT [FK_CourseInstructors_Courses_CourseId] FOREIGN KEY ([CourseId]) REFERENCES [Courses] ([CourseId]) ON DELETE CASCADE,
    CONSTRAINT [FK_CourseInstructors_Instructors_InstructorId] FOREIGN KEY ([InstructorId]) REFERENCES [Instructors] ([InstructorId]) ON DELETE CASCADE
);

CREATE INDEX [IX_CourseInstructors_InstructorId] ON [CourseInstructors] ([InstructorId]);

CREATE INDEX [IX_Courses_ClassRoomId] ON [Courses] ([ClassRoomId]);

CREATE INDEX [IX_Courses_CourseLocationId] ON [Courses] ([CourseLocationId]);

CREATE INDEX [IX_Courses_CourseParentId] ON [Courses] ([CourseParentId]);

CREATE INDEX [IX_Courses_CourseTypeId] ON [Courses] ([CourseTypeId]);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210429200841_des-13', N'9.0.2');

ALTER TABLE [Courses] DROP CONSTRAINT [FK_Courses_CourseLocations_CourseLocationId];

DROP INDEX [IX_Courses_CourseLocationId] ON [Courses];

DECLARE @var13 sysname;
SELECT @var13 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Courses]') AND [c].[name] = N'CourseLocationId');
IF @var13 IS NOT NULL EXEC(N'ALTER TABLE [Courses] DROP CONSTRAINT [' + @var13 + '];');
ALTER TABLE [Courses] DROP COLUMN [CourseLocationId];

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210429202221_des-14', N'9.0.2');

ALTER TABLE [Courses] DROP CONSTRAINT [FK_Courses_Courses_CourseParentId];

DROP INDEX [IX_Courses_CourseParentId] ON [Courses];

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210429211505_des-15', N'9.0.2');

ALTER TABLE [Positions] DROP CONSTRAINT [FK_Positions_Jobs_JobId];

DECLARE @var14 sysname;
SELECT @var14 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Positions]') AND [c].[name] = N'IsEnabled');
IF @var14 IS NOT NULL EXEC(N'ALTER TABLE [Positions] DROP CONSTRAINT [' + @var14 + '];');
ALTER TABLE [Positions] DROP COLUMN [IsEnabled];

EXEC sp_rename N'[Positions].[Name]', N'NotifyPositionId', 'COLUMN';

DECLARE @var15 sysname;
SELECT @var15 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Positions]') AND [c].[name] = N'Description');
IF @var15 IS NOT NULL EXEC(N'ALTER TABLE [Positions] DROP CONSTRAINT [' + @var15 + '];');
ALTER TABLE [Positions] ALTER COLUMN [Description] nvarchar(200) NULL;

DECLARE @var16 sysname;
SELECT @var16 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Positions]') AND [c].[name] = N'DepartmentId');
IF @var16 IS NOT NULL EXEC(N'ALTER TABLE [Positions] DROP CONSTRAINT [' + @var16 + '];');
ALTER TABLE [Positions] ALTER COLUMN [DepartmentId] nvarchar(20) NOT NULL;

ALTER TABLE [Positions] ADD [PositionName] nvarchar(50) NOT NULL DEFAULT N'';

DECLARE @var17 sysname;
SELECT @var17 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Jobs]') AND [c].[name] = N'Name');
IF @var17 IS NOT NULL EXEC(N'ALTER TABLE [Jobs] DROP CONSTRAINT [' + @var17 + '];');
ALTER TABLE [Jobs] ALTER COLUMN [Name] nvarchar(50) NOT NULL;

DECLARE @var18 sysname;
SELECT @var18 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Jobs]') AND [c].[name] = N'Description');
IF @var18 IS NOT NULL EXEC(N'ALTER TABLE [Jobs] DROP CONSTRAINT [' + @var18 + '];');
ALTER TABLE [Jobs] ALTER COLUMN [Description] nvarchar(200) NULL;

DECLARE @var19 sysname;
SELECT @var19 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Courses]') AND [c].[name] = N'CourseName');
IF @var19 IS NOT NULL EXEC(N'ALTER TABLE [Courses] DROP CONSTRAINT [' + @var19 + '];');
UPDATE [Courses] SET [CourseName] = N'' WHERE [CourseName] IS NULL;
ALTER TABLE [Courses] ALTER COLUMN [CourseName] nvarchar(50) NOT NULL;
ALTER TABLE [Courses] ADD DEFAULT N'' FOR [CourseName];

CREATE TABLE [CoursePositions] (
    [PositionId] nvarchar(20) NOT NULL,
    [CourseId] nvarchar(20) NOT NULL,
    [Comment] nvarchar(300) NOT NULL,
    CONSTRAINT [PK_CoursePositions] PRIMARY KEY ([CourseId], [PositionId]),
    CONSTRAINT [FK_CoursePositions_Courses_CourseId] FOREIGN KEY ([CourseId]) REFERENCES [Courses] ([CourseId]) ON DELETE CASCADE,
    CONSTRAINT [FK_CoursePositions_Instructors_PositionId] FOREIGN KEY ([PositionId]) REFERENCES [Instructors] ([InstructorId]) ON DELETE CASCADE
);

CREATE INDEX [IX_Positions_DepartmentId] ON [Positions] ([DepartmentId]);

CREATE INDEX [IX_CoursePositions_PositionId] ON [CoursePositions] ([PositionId]);

ALTER TABLE [Positions] ADD CONSTRAINT [FK_Positions_Departments_DepartmentId] FOREIGN KEY ([DepartmentId]) REFERENCES [Departments] ([DepartmentId]);

ALTER TABLE [Positions] ADD CONSTRAINT [FK_Positions_Jobs_JobId] FOREIGN KEY ([JobId]) REFERENCES [Jobs] ([JobId]);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210430192057_des-16', N'9.0.2');

DECLARE @var20 sysname;
SELECT @var20 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Positions]') AND [c].[name] = N'NotifyPositionId');
IF @var20 IS NOT NULL EXEC(N'ALTER TABLE [Positions] DROP CONSTRAINT [' + @var20 + '];');
ALTER TABLE [Positions] ALTER COLUMN [NotifyPositionId] nvarchar(20) NULL;

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210510224741_des-17', N'9.0.2');

ALTER TABLE [Companies] DROP CONSTRAINT [FK_Companies_Country_CountryId];

ALTER TABLE [Country] DROP CONSTRAINT [PK_Country];

DELETE FROM [Country]
WHERE [CountryId] = N'CH';
SELECT @@ROWCOUNT;


DELETE FROM [Country]
WHERE [CountryId] = N'DOM';
SELECT @@ROWCOUNT;


CREATE SEQUENCE [EmployeeId] AS int START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 999999999 NO CYCLE;

DECLARE @var21 sysname;
SELECT @var21 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Country]') AND [c].[name] = N'Name');
IF @var21 IS NOT NULL EXEC(N'ALTER TABLE [Country] DROP CONSTRAINT [' + @var21 + '];');
UPDATE [Country] SET [Name] = N'' WHERE [Name] IS NULL;
ALTER TABLE [Country] ALTER COLUMN [Name] nvarchar(100) NOT NULL;
ALTER TABLE [Country] ADD DEFAULT N'' FOR [Name];

DECLARE @var22 sysname;
SELECT @var22 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Country]') AND [c].[name] = N'CountryId');
IF @var22 IS NOT NULL EXEC(N'ALTER TABLE [Country] DROP CONSTRAINT [' + @var22 + '];');
ALTER TABLE [Country] ALTER COLUMN [CountryId] nvarchar(20) NOT NULL;

ALTER TABLE [Country] ADD [CountryId2] nvarchar(20) NOT NULL DEFAULT N'';

DROP INDEX [IX_Companies_CountryId] ON [Companies];
DECLARE @var23 sysname;
SELECT @var23 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Companies]') AND [c].[name] = N'CountryId');
IF @var23 IS NOT NULL EXEC(N'ALTER TABLE [Companies] DROP CONSTRAINT [' + @var23 + '];');
ALTER TABLE [Companies] ALTER COLUMN [CountryId] nvarchar(20) NULL;
CREATE INDEX [IX_Companies_CountryId] ON [Companies] ([CountryId]);

ALTER TABLE [Country] ADD CONSTRAINT [PK_Country] PRIMARY KEY ([CountryId2]);

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

IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'CountryId2', N'CountryId', N'Name') AND [object_id] = OBJECT_ID(N'[Country]'))
    SET IDENTITY_INSERT [Country] ON;
INSERT INTO [Country] ([CountryId2], [CountryId], [Name])
VALUES (N'DOM', N'DOM', N'República Dominicana');
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'CountryId2', N'CountryId', N'Name') AND [object_id] = OBJECT_ID(N'[Country]'))
    SET IDENTITY_INSERT [Country] OFF;

IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'CountryId2', N'CountryId', N'Name') AND [object_id] = OBJECT_ID(N'[Country]'))
    SET IDENTITY_INSERT [Country] ON;
INSERT INTO [Country] ([CountryId2], [CountryId], [Name])
VALUES (N'CH', N'CH', N'Chile');
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'CountryId2', N'CountryId', N'Name') AND [object_id] = OBJECT_ID(N'[Country]'))
    SET IDENTITY_INSERT [Country] OFF;

CREATE INDEX [IX_Employee_Country] ON [Employee] ([Country]);

ALTER TABLE [Companies] ADD CONSTRAINT [FK_Companies_Country_CountryId] FOREIGN KEY ([CountryId]) REFERENCES [Country] ([CountryId2]) ON DELETE NO ACTION;

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210511011824_des-18', N'9.0.2');

ALTER TABLE [Companies] DROP CONSTRAINT [FK_Companies_Country_CountryId];

ALTER TABLE [Employee] DROP CONSTRAINT [FK_Employee_Country_Country];

ALTER TABLE [Country] DROP CONSTRAINT [PK_Country];

DECLARE @var24 sysname;
SELECT @var24 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Country]') AND [c].[name] = N'CountryId2');
IF @var24 IS NOT NULL EXEC(N'ALTER TABLE [Country] DROP CONSTRAINT [' + @var24 + '];');
ALTER TABLE [Country] DROP COLUMN [CountryId2];

ALTER TABLE [Country] ADD CONSTRAINT [PK_Country] PRIMARY KEY ([CountryId]);

ALTER TABLE [Companies] ADD CONSTRAINT [FK_Companies_Country_CountryId] FOREIGN KEY ([CountryId]) REFERENCES [Country] ([CountryId]) ON DELETE NO ACTION;

ALTER TABLE [Employee] ADD CONSTRAINT [FK_Employee_Country_Country] FOREIGN KEY ([Country]) REFERENCES [Country] ([CountryId]) ON DELETE CASCADE;

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210511011940_des-19', N'9.0.2');

ALTER TABLE [Companies] DROP CONSTRAINT [FK_Companies_Country_CountryId];

ALTER TABLE [Employee] DROP CONSTRAINT [FK_Employee_Country_Country];

ALTER TABLE [Employee] DROP CONSTRAINT [PK_Employee];

ALTER TABLE [Country] DROP CONSTRAINT [PK_Country];

EXEC sp_rename N'[Employee]', N'Employees', 'OBJECT';

EXEC sp_rename N'[Country]', N'Countries', 'OBJECT';

EXEC sp_rename N'[Employees].[IX_Employee_Country]', N'IX_Employees_Country', 'INDEX';

ALTER TABLE [Employees] ADD [EmployeeStatus] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [Employees] ADD CONSTRAINT [PK_Employees] PRIMARY KEY ([EmployeeId]);

ALTER TABLE [Countries] ADD CONSTRAINT [PK_Countries] PRIMARY KEY ([CountryId]);

CREATE TABLE [CourseEmployees] (
    [EmployeeId] nvarchar(20) NOT NULL,
    [CourseId] nvarchar(20) NOT NULL,
    [Comment] nvarchar(300) NOT NULL,
    CONSTRAINT [PK_CourseEmployees] PRIMARY KEY ([CourseId], [EmployeeId]),
    CONSTRAINT [FK_CourseEmployees_Courses_CourseId] FOREIGN KEY ([CourseId]) REFERENCES [Courses] ([CourseId]) ON DELETE CASCADE,
    CONSTRAINT [FK_CourseEmployees_Instructors_EmployeeId] FOREIGN KEY ([EmployeeId]) REFERENCES [Instructors] ([InstructorId]) ON DELETE CASCADE
);

CREATE TABLE [EmployeeImages] (
    [EmployeeId] nvarchar(450) NOT NULL,
    [Image] varbinary(max) NULL,
    [Extension] nvarchar(4) NOT NULL,
    CONSTRAINT [PK_EmployeeImages] PRIMARY KEY ([EmployeeId])
);

CREATE INDEX [IX_CourseEmployees_EmployeeId] ON [CourseEmployees] ([EmployeeId]);

ALTER TABLE [Companies] ADD CONSTRAINT [FK_Companies_Countries_CountryId] FOREIGN KEY ([CountryId]) REFERENCES [Countries] ([CountryId]) ON DELETE NO ACTION;

ALTER TABLE [Employees] ADD CONSTRAINT [FK_Employees_Countries_Country] FOREIGN KEY ([Country]) REFERENCES [Countries] ([CountryId]) ON DELETE CASCADE;

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210511234110_des-20', N'9.0.2');

DECLARE @var25 sysname;
SELECT @var25 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[PositionRequirements]') AND [c].[name] = N'Name');
IF @var25 IS NOT NULL EXEC(N'ALTER TABLE [PositionRequirements] DROP CONSTRAINT [' + @var25 + '];');
ALTER TABLE [PositionRequirements] ALTER COLUMN [Name] nvarchar(30) NOT NULL;

ALTER TABLE [PositionRequirements] ADD [RequirementId] nvarchar(max) NULL;

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

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210514155357_des-21', N'9.0.2');

DECLARE @var26 sysname;
SELECT @var26 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[PositionRequirements]') AND [c].[name] = N'RequirementId');
IF @var26 IS NOT NULL EXEC(N'ALTER TABLE [PositionRequirements] DROP CONSTRAINT [' + @var26 + '];');
ALTER TABLE [PositionRequirements] DROP COLUMN [RequirementId];

ALTER TABLE [PositionRequirements] ADD CONSTRAINT [PK_PositionRequirements] PRIMARY KEY ([Name]);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210515022046_des-22', N'9.0.2');

DECLARE @var27 sysname;
SELECT @var27 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Employees]') AND [c].[name] = N'Image');
IF @var27 IS NOT NULL EXEC(N'ALTER TABLE [Employees] DROP CONSTRAINT [' + @var27 + '];');
ALTER TABLE [Employees] DROP COLUMN [Image];

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

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210518223551_des-23', N'9.0.2');

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

CREATE INDEX [IX_EmployeeDeductionCodes_EmployeeId] ON [EmployeeDeductionCodes] ([EmployeeId]);

CREATE INDEX [IX_EmployeeDeductionCodes_PayrollId] ON [EmployeeDeductionCodes] ([PayrollId]);

CREATE INDEX [IX_EmployeeEarningCodes_EmployeeId] ON [EmployeeEarningCodes] ([EmployeeId]);

CREATE INDEX [IX_EmployeeEarningCodes_PayrollId] ON [EmployeeEarningCodes] ([PayrollId]);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210519192323_des-24', N'9.0.2');

CREATE TABLE [EmployeeDepartments] (
    [EmployeeId] nvarchar(450) NOT NULL,
    [DepartmentId] nvarchar(450) NOT NULL,
    [FromDate] datetime2 NOT NULL,
    [ToDate] datetime2 NOT NULL,
    [EmployeeDepartmentStatus] bit NOT NULL,
    [Comment] nvarchar(200) NULL,
    CONSTRAINT [PK_EmployeeDepartments] PRIMARY KEY ([EmployeeId], [DepartmentId])
);

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

CREATE INDEX [IX_EmployeePositions_EmployeeId] ON [EmployeePositions] ([EmployeeId]);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210611154200_des-25', N'9.0.2');

ALTER TABLE [EmployeesAddress] ADD [CountryId] nvarchar(20) NOT NULL DEFAULT N'';

CREATE INDEX [IX_EmployeesAddress_CountryId] ON [EmployeesAddress] ([CountryId]);

ALTER TABLE [EmployeesAddress] ADD CONSTRAINT [FK_EmployeesAddress_Countries_CountryId] FOREIGN KEY ([CountryId]) REFERENCES [Countries] ([CountryId]);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210611162436_des-26', N'9.0.2');

ALTER TABLE [EmployeeBankAccounts] ADD [Currency] nvarchar(5) NULL;

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210623000625_des-27', N'9.0.2');

ALTER TABLE [Companies] DROP CONSTRAINT [FK_Companies_Currency_CurrencyId];

ALTER TABLE [Currency] DROP CONSTRAINT [PK_Currency];

EXEC sp_rename N'[Currency]', N'Currencies', 'OBJECT';

ALTER TABLE [Payrolls] ADD [CurrencyId] nvarchar(5) NOT NULL DEFAULT N'';

DROP INDEX [IX_Companies_CurrencyId] ON [Companies];
DECLARE @var28 sysname;
SELECT @var28 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Companies]') AND [c].[name] = N'CurrencyId');
IF @var28 IS NOT NULL EXEC(N'ALTER TABLE [Companies] DROP CONSTRAINT [' + @var28 + '];');
ALTER TABLE [Companies] ALTER COLUMN [CurrencyId] nvarchar(5) NULL;
CREATE INDEX [IX_Companies_CurrencyId] ON [Companies] ([CurrencyId]);

DECLARE @var29 sysname;
SELECT @var29 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Currencies]') AND [c].[name] = N'Name');
IF @var29 IS NOT NULL EXEC(N'ALTER TABLE [Currencies] DROP CONSTRAINT [' + @var29 + '];');
UPDATE [Currencies] SET [Name] = N'' WHERE [Name] IS NULL;
ALTER TABLE [Currencies] ALTER COLUMN [Name] nvarchar(100) NOT NULL;
ALTER TABLE [Currencies] ADD DEFAULT N'' FOR [Name];

DECLARE @var30 sysname;
SELECT @var30 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Currencies]') AND [c].[name] = N'CurrencyId');
IF @var30 IS NOT NULL EXEC(N'ALTER TABLE [Currencies] DROP CONSTRAINT [' + @var30 + '];');
ALTER TABLE [Currencies] ALTER COLUMN [CurrencyId] nvarchar(5) NOT NULL;

ALTER TABLE [Currencies] ADD CONSTRAINT [PK_Currencies] PRIMARY KEY ([CurrencyId]);

ALTER TABLE [Companies] ADD CONSTRAINT [FK_Companies_Currencies_CurrencyId] FOREIGN KEY ([CurrencyId]) REFERENCES [Currencies] ([CurrencyId]) ON DELETE NO ACTION;

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210708194600_des-28', N'9.0.2');

CREATE SEQUENCE [LoanId] AS int START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 999999999 NO CYCLE;

CREATE SEQUENCE [PayrollProcessId] AS int START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 999999999 NO CYCLE;

CREATE SEQUENCE [ProcessDetailsId] AS int START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 999999999 NO CYCLE;

CREATE SEQUENCE [ProjCategoryId] AS int START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 999999999 NO CYCLE;

CREATE SEQUENCE [ProjId] AS int START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 999999999 NO CYCLE;

ALTER TABLE [Employees] ADD [EndWorkDate] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [Employees] ADD [PayMethod] int NOT NULL DEFAULT 0;

ALTER TABLE [Employees] ADD [StartWorkDate] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [EmployeeDocuments] ADD [IsPrincipal] bit NOT NULL DEFAULT CAST(0 AS bit);

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

CREATE INDEX [IX_EmployeeLoans_EmployeeId] ON [EmployeeLoans] ([EmployeeId]);

CREATE INDEX [IX_EmployeeLoans_PayrollId] ON [EmployeeLoans] ([PayrollId]);

CREATE INDEX [IX_Loans_DepartmentId] ON [Loans] ([DepartmentId]);

CREATE INDEX [IX_Loans_ProjCategoryId] ON [Loans] ([ProjCategoryId]);

CREATE INDEX [IX_Loans_ProjId] ON [Loans] ([ProjId]);

CREATE INDEX [IX_PayrollProcessAction_EmployeeId] ON [PayrollProcessAction] ([EmployeeId]);

CREATE INDEX [IX_PayrollProcessAction_PayrollProcessId] ON [PayrollProcessAction] ([PayrollProcessId]);

CREATE INDEX [IX_PayrollProcessDetails_DepartmentId] ON [PayrollProcessDetails] ([DepartmentId]);

CREATE INDEX [IX_PayrollProcessDetails_EmployeeId] ON [PayrollProcessDetails] ([EmployeeId]);

CREATE INDEX [IX_PayrollsProcess_PayrollId] ON [PayrollsProcess] ([PayrollId]);

CREATE INDEX [IX_TaxDetails_TaxId] ON [TaxDetails] ([TaxId]);

CREATE INDEX [IX_Taxes_DepartmentId] ON [Taxes] ([DepartmentId]);

CREATE INDEX [IX_Taxes_ProjCategory] ON [Taxes] ([ProjCategory]);

CREATE INDEX [IX_Taxes_ProjId] ON [Taxes] ([ProjId]);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210724200951_des-29', N'9.0.2');

ALTER TABLE [PayrollsProcess] ADD [IsPayCycleTax] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [PayrollsProcess] ADD [UsedForTax] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [PayrollProcessDetails] ADD [EmployeeName] nvarchar(50) NULL;

ALTER TABLE [PayCycles] ADD [IsForTax] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [EmployeeEarningCodes] ADD [QtyPeriodForPaid] int NOT NULL DEFAULT 0;

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210729203656_des-30', N'9.0.2');

ALTER TABLE [PayrollProcessAction] DROP CONSTRAINT [FK_PayrollProcessAction_Employees_EmployeeId];

ALTER TABLE [PayrollProcessAction] DROP CONSTRAINT [FK_PayrollProcessAction_PayrollsProcess_PayrollProcessId];

ALTER TABLE [PayrollProcessAction] DROP CONSTRAINT [PK_PayrollProcessAction];

EXEC sp_rename N'[PayrollProcessAction]', N'PayrollProcessActions', 'OBJECT';

EXEC sp_rename N'[PayrollProcessActions].[IX_PayrollProcessAction_PayrollProcessId]', N'IX_PayrollProcessActions_PayrollProcessId', 'INDEX';

EXEC sp_rename N'[PayrollProcessActions].[IX_PayrollProcessAction_EmployeeId]', N'IX_PayrollProcessActions_EmployeeId', 'INDEX';

ALTER TABLE [Loans] ADD [LoanStatus] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [PayrollProcessActions] ADD CONSTRAINT [PK_PayrollProcessActions] PRIMARY KEY ([InternalId], [PayrollProcessId], [EmployeeId]);

ALTER TABLE [PayrollProcessActions] ADD CONSTRAINT [FK_PayrollProcessActions_Employees_EmployeeId] FOREIGN KEY ([EmployeeId]) REFERENCES [Employees] ([EmployeeId]) ON DELETE CASCADE;

ALTER TABLE [PayrollProcessActions] ADD CONSTRAINT [FK_PayrollProcessActions_PayrollsProcess_PayrollProcessId] FOREIGN KEY ([PayrollProcessId]) REFERENCES [PayrollsProcess] ([PayrollProcessId]) ON DELETE CASCADE;

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210731183332_des-31', N'9.0.2');

EXEC sp_rename N'[EmployeeLoans].[PayFrecuency]', N'TotalDues', 'COLUMN';

EXEC sp_rename N'[EmployeeLoans].[PayDays]', N'StartPeriodForPaid', 'COLUMN';

ALTER TABLE [EmployeeLoans] ADD [PendingDues] int NOT NULL DEFAULT 0;

ALTER TABLE [EmployeeLoans] ADD [QtyPeriodForPaid] int NOT NULL DEFAULT 0;

ALTER TABLE [EmployeeEarningCodes] ADD [StartPeriodForPaid] int NOT NULL DEFAULT 0;

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210802232007_des-32', N'9.0.2');

ALTER TABLE [EmployeeLoans] ADD [AmountByDues] decimal(18,2) NOT NULL DEFAULT 0.0;

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210803180051_des-33', N'9.0.2');

DECLARE @var31 sysname;
SELECT @var31 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeePositions]') AND [c].[name] = N'Comment');
IF @var31 IS NOT NULL EXEC(N'ALTER TABLE [EmployeePositions] DROP CONSTRAINT [' + @var31 + '];');
ALTER TABLE [EmployeePositions] ALTER COLUMN [Comment] nvarchar(200) NULL;

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

CREATE INDEX [IX_EmployeeTaxes_EmployeeId] ON [EmployeeTaxes] ([EmployeeId]);

CREATE INDEX [IX_EmployeeTaxes_PayrollId] ON [EmployeeTaxes] ([PayrollId]);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210809214000_des-34', N'9.0.2');

ALTER TABLE [EmployeeEarningCodes] DROP CONSTRAINT [PK_EmployeeEarningCodes];

DECLARE @var32 sysname;
SELECT @var32 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeEarningCodes]') AND [c].[name] = N'Comment');
IF @var32 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeEarningCodes] DROP CONSTRAINT [' + @var32 + '];');
ALTER TABLE [EmployeeEarningCodes] ALTER COLUMN [Comment] nvarchar(200) NULL;

ALTER TABLE [EmployeeEarningCodes] ADD CONSTRAINT [PK_EmployeeEarningCodes] PRIMARY KEY ([EarningCodeId], [EmployeeId], [PayrollId]);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210810235353_des-35', N'9.0.2');

DECLARE @var33 sysname;
SELECT @var33 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EarningCodes]') AND [c].[name] = N'ProjId');
IF @var33 IS NOT NULL EXEC(N'ALTER TABLE [EarningCodes] DROP CONSTRAINT [' + @var33 + '];');
ALTER TABLE [EarningCodes] ALTER COLUMN [ProjId] nvarchar(20) NULL;

DECLARE @var34 sysname;
SELECT @var34 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EarningCodes]') AND [c].[name] = N'LedgerAccount');
IF @var34 IS NOT NULL EXEC(N'ALTER TABLE [EarningCodes] DROP CONSTRAINT [' + @var34 + '];');
ALTER TABLE [EarningCodes] ALTER COLUMN [LedgerAccount] nvarchar(30) NULL;

DECLARE @var35 sysname;
SELECT @var35 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EarningCodes]') AND [c].[name] = N'Department');
IF @var35 IS NOT NULL EXEC(N'ALTER TABLE [EarningCodes] DROP CONSTRAINT [' + @var35 + '];');
ALTER TABLE [EarningCodes] ALTER COLUMN [Department] nvarchar(20) NULL;

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210811021855_des-36', N'9.0.2');

ALTER TABLE [EmployeeDeductionCodes] DROP CONSTRAINT [PK_EmployeeDeductionCodes];

DECLARE @var36 sysname;
SELECT @var36 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeDeductionCodes]') AND [c].[name] = N'Comment');
IF @var36 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeDeductionCodes] DROP CONSTRAINT [' + @var36 + '];');
ALTER TABLE [EmployeeDeductionCodes] ALTER COLUMN [Comment] nvarchar(200) NULL;

ALTER TABLE [EmployeeDeductionCodes] ADD CONSTRAINT [PK_EmployeeDeductionCodes] PRIMARY KEY ([DeductionCodeId], [EmployeeId], [PayrollId]);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210811201216_des-37', N'9.0.2');

DECLARE @var37 sysname;
SELECT @var37 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[DeductionCodes]') AND [c].[name] = N'ProjId');
IF @var37 IS NOT NULL EXEC(N'ALTER TABLE [DeductionCodes] DROP CONSTRAINT [' + @var37 + '];');
ALTER TABLE [DeductionCodes] ALTER COLUMN [ProjId] nvarchar(20) NULL;

DECLARE @var38 sysname;
SELECT @var38 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[DeductionCodes]') AND [c].[name] = N'LedgerAccount');
IF @var38 IS NOT NULL EXEC(N'ALTER TABLE [DeductionCodes] DROP CONSTRAINT [' + @var38 + '];');
ALTER TABLE [DeductionCodes] ALTER COLUMN [LedgerAccount] nvarchar(30) NULL;

DECLARE @var39 sysname;
SELECT @var39 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[DeductionCodes]') AND [c].[name] = N'Department');
IF @var39 IS NOT NULL EXEC(N'ALTER TABLE [DeductionCodes] DROP CONSTRAINT [' + @var39 + '];');
ALTER TABLE [DeductionCodes] ALTER COLUMN [Department] nvarchar(20) NULL;

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210811225552_des-38', N'9.0.2');

DECLARE @var40 sysname;
SELECT @var40 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EarningCodes]') AND [c].[name] = N'Description');
IF @var40 IS NOT NULL EXEC(N'ALTER TABLE [EarningCodes] DROP CONSTRAINT [' + @var40 + '];');
ALTER TABLE [EarningCodes] ALTER COLUMN [Description] nvarchar(200) NULL;

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210812235809_des-39', N'9.0.2');

DECLARE @var41 sysname;
SELECT @var41 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EarningCodes]') AND [c].[name] = N'EarningCodeId');
IF @var41 IS NOT NULL EXEC(N'ALTER TABLE [EarningCodes] DROP CONSTRAINT [' + @var41 + '];');
ALTER TABLE [EarningCodes] ADD DEFAULT (FORMAT((NEXT VALUE FOR dbo.EarningCodeId),'EC-00000000#')) FOR [EarningCodeId];

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210813003307_des-40', N'9.0.2');

ALTER TABLE [Payrolls] ADD [PayrollStatus] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [EarningCodes] ADD [EarningCodeStatus] bit NOT NULL DEFAULT CAST(0 AS bit);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210817232452_des-41', N'9.0.2');

ALTER TABLE [DeductionCodes] ADD [DeductionStatus] bit NOT NULL DEFAULT CAST(0 AS bit);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210819170658_des-42', N'9.0.2');

ALTER TABLE [Loans] DROP CONSTRAINT [FK_Loans_Departments_DepartmentId];

ALTER TABLE [Loans] DROP CONSTRAINT [FK_Loans_ProjCategories_ProjCategoryId];

ALTER TABLE [Loans] DROP CONSTRAINT [FK_Loans_Projects_ProjId];

DROP INDEX [IX_Loans_DepartmentId] ON [Loans];

DROP INDEX [IX_Loans_ProjCategoryId] ON [Loans];

DROP INDEX [IX_Loans_ProjId] ON [Loans];

DECLARE @var42 sysname;
SELECT @var42 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Loans]') AND [c].[name] = N'LedgerAccount');
IF @var42 IS NOT NULL EXEC(N'ALTER TABLE [Loans] DROP CONSTRAINT [' + @var42 + '];');
ALTER TABLE [Loans] ALTER COLUMN [LedgerAccount] nvarchar(30) NULL;

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210819172746_des-43', N'9.0.2');

ALTER TABLE [EarningCodes] ADD [IsExtraHours] bit NOT NULL DEFAULT CAST(0 AS bit);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210819203837_des-44', N'9.0.2');

ALTER TABLE [PositionRequirements] DROP CONSTRAINT [PK_PositionRequirements];

ALTER TABLE [PositionRequirements] ADD CONSTRAINT [PK_PositionRequirements] PRIMARY KEY ([Name], [PositionId]);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210823173142_des-45', N'9.0.2');

ALTER TABLE [EmployeeLoans] DROP CONSTRAINT [PK_EmployeeLoans];

ALTER TABLE [EmployeeLoans] ADD CONSTRAINT [PK_EmployeeLoans] PRIMARY KEY ([LoanId], [EmployeeId], [PayrollId]);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210824225813_des-46', N'9.0.2');

ALTER TABLE [EmployeeLoans] DROP CONSTRAINT [PK_EmployeeLoans];

DROP INDEX [IX_EmployeeLoans_EmployeeId] ON [EmployeeLoans];

DECLARE @var43 sysname;
SELECT @var43 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeLoans]') AND [c].[name] = N'LoanId');
IF @var43 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeLoans] DROP CONSTRAINT [' + @var43 + '];');
ALTER TABLE [EmployeeLoans] ALTER COLUMN [LoanId] nvarchar(max) NULL;

ALTER TABLE [EmployeeLoans] ADD CONSTRAINT [PK_EmployeeLoans] PRIMARY KEY ([EmployeeId], [PayrollId]);

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

CREATE INDEX [IX_EmployeeExtraHours_EmployeeId] ON [EmployeeExtraHours] ([EmployeeId]);

CREATE INDEX [IX_EmployeeExtraHours_PayrollId] ON [EmployeeExtraHours] ([PayrollId]);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210825192130_des-47', N'9.0.2');

ALTER TABLE [EmployeeLoans] DROP CONSTRAINT [PK_EmployeeLoans];

ALTER TABLE [EmployeeExtraHours] DROP CONSTRAINT [PK_EmployeeExtraHours];

DROP INDEX [IX_EmployeeExtraHours_EmployeeId] ON [EmployeeExtraHours];

DECLARE @var44 sysname;
SELECT @var44 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeExtraHours]') AND [c].[name] = N'TotalExtraHour');
IF @var44 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeExtraHours] DROP CONSTRAINT [' + @var44 + '];');
ALTER TABLE [EmployeeExtraHours] DROP COLUMN [TotalExtraHour];

DECLARE @var45 sysname;
SELECT @var45 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeExtraHours]') AND [c].[name] = N'TotalHour');
IF @var45 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeExtraHours] DROP CONSTRAINT [' + @var45 + '];');
ALTER TABLE [EmployeeExtraHours] DROP COLUMN [TotalHour];

DECLARE @var46 sysname;
SELECT @var46 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeLoans]') AND [c].[name] = N'LoanId');
IF @var46 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeLoans] DROP CONSTRAINT [' + @var46 + '];');
UPDATE [EmployeeLoans] SET [LoanId] = N'' WHERE [LoanId] IS NULL;
ALTER TABLE [EmployeeLoans] ALTER COLUMN [LoanId] nvarchar(20) NOT NULL;
ALTER TABLE [EmployeeLoans] ADD DEFAULT N'' FOR [LoanId];

ALTER TABLE [EmployeeLoans] ADD CONSTRAINT [PK_EmployeeLoans] PRIMARY KEY ([LoanId], [EmployeeId], [PayrollId]);

ALTER TABLE [EmployeeExtraHours] ADD CONSTRAINT [PK_EmployeeExtraHours] PRIMARY KEY ([EmployeeId], [EarningCodeId], [WorkedDay]);

CREATE INDEX [IX_EmployeeLoans_EmployeeId] ON [EmployeeLoans] ([EmployeeId]);

CREATE INDEX [IX_EmployeeExtraHours_EarningCodeId] ON [EmployeeExtraHours] ([EarningCodeId]);

ALTER TABLE [EmployeeLoans] ADD CONSTRAINT [FK_EmployeeLoans_Loans_LoanId] FOREIGN KEY ([LoanId]) REFERENCES [Loans] ([LoanId]);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210827192330_des-48', N'9.0.2');

DECLARE @var47 sysname;
SELECT @var47 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeExtraHours]') AND [c].[name] = N'EndHour');
IF @var47 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeExtraHours] DROP CONSTRAINT [' + @var47 + '];');
ALTER TABLE [EmployeeExtraHours] DROP COLUMN [EndHour];

DECLARE @var48 sysname;
SELECT @var48 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeExtraHours]') AND [c].[name] = N'StartHour');
IF @var48 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeExtraHours] DROP CONSTRAINT [' + @var48 + '];');
ALTER TABLE [EmployeeExtraHours] DROP COLUMN [StartHour];

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210831214312_des-49', N'9.0.2');

ALTER TABLE [EmployeeExtraHours] ADD [EndHour] time NOT NULL DEFAULT '00:00:00';

ALTER TABLE [EmployeeExtraHours] ADD [StartHour] time NOT NULL DEFAULT '00:00:00';

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210831214620_des-50', N'9.0.2');

ALTER TABLE [EmployeeEarningCodes] ADD [IndexEarningMonthly] decimal(18,2) NOT NULL DEFAULT 0.0;

ALTER TABLE [EmployeeEarningCodes] ADD [PayFrecuency] int NOT NULL DEFAULT 0;

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210908193130_des-51', N'9.0.2');

ALTER TABLE [Projects] ADD [InCompany] nvarchar(5) NULL;

ALTER TABLE [ProjCategories] ADD [InCompany] nvarchar(5) NULL;

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210920174118_des-52', N'9.0.2');

ALTER TABLE [Users] ADD [CreatedBy] nvarchar(10) NULL;

ALTER TABLE [Users] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [Users] ADD [ModifiedBy] nvarchar(10) NULL;

ALTER TABLE [Users] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [UserImages] ADD [CreatedBy] nvarchar(10) NULL;

ALTER TABLE [UserImages] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [UserImages] ADD [ModifiedBy] nvarchar(10) NULL;

ALTER TABLE [UserImages] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [Taxes] ADD [InCompany] nvarchar(5) NULL;

ALTER TABLE [TaxDetails] ADD [CreatedBy] nvarchar(10) NULL;

ALTER TABLE [TaxDetails] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [TaxDetails] ADD [InCompany] nvarchar(5) NULL;

ALTER TABLE [TaxDetails] ADD [ModifiedBy] nvarchar(10) NULL;

ALTER TABLE [TaxDetails] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [Positions] ADD [InCompany] nvarchar(5) NULL;

ALTER TABLE [PositionRequirements] ADD [InCompany] nvarchar(5) NULL;

ALTER TABLE [Payrolls] ADD [InCompany] nvarchar(5) NULL;

ALTER TABLE [PayCycles] ADD [CreatedBy] nvarchar(10) NULL;

ALTER TABLE [PayCycles] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [PayCycles] ADD [InCompany] nvarchar(5) NULL;

ALTER TABLE [PayCycles] ADD [ModifiedBy] nvarchar(10) NULL;

ALTER TABLE [PayCycles] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [Loans] ADD [CreatedBy] nvarchar(10) NULL;

ALTER TABLE [Loans] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [Loans] ADD [InCompany] nvarchar(5) NULL;

ALTER TABLE [Loans] ADD [ModifiedBy] nvarchar(10) NULL;

ALTER TABLE [Loans] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [Jobs] ADD [InCompany] nvarchar(5) NULL;

ALTER TABLE [Instructors] ADD [CreatedBy] nvarchar(10) NULL;

ALTER TABLE [Instructors] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [Instructors] ADD [InCompany] nvarchar(5) NULL;

ALTER TABLE [Instructors] ADD [ModifiedBy] nvarchar(10) NULL;

ALTER TABLE [Instructors] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [EmployeeTaxes] ADD [CreatedBy] nvarchar(10) NULL;

ALTER TABLE [EmployeeTaxes] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [EmployeeTaxes] ADD [InCompany] nvarchar(5) NULL;

ALTER TABLE [EmployeeTaxes] ADD [ModifiedBy] nvarchar(10) NULL;

ALTER TABLE [EmployeeTaxes] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [Employees] ADD [CreatedBy] nvarchar(10) NULL;

ALTER TABLE [Employees] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [Employees] ADD [InCompany] nvarchar(5) NULL;

ALTER TABLE [Employees] ADD [ModifiedBy] nvarchar(10) NULL;

ALTER TABLE [Employees] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [EmployeePositions] ADD [CreatedBy] nvarchar(10) NULL;

ALTER TABLE [EmployeePositions] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [EmployeePositions] ADD [InCompany] nvarchar(5) NULL;

ALTER TABLE [EmployeePositions] ADD [ModifiedBy] nvarchar(10) NULL;

ALTER TABLE [EmployeePositions] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [EmployeeLoans] ADD [CreatedBy] nvarchar(10) NULL;

ALTER TABLE [EmployeeLoans] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [EmployeeLoans] ADD [InCompany] nvarchar(5) NULL;

ALTER TABLE [EmployeeLoans] ADD [ModifiedBy] nvarchar(10) NULL;

ALTER TABLE [EmployeeLoans] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [EmployeeImages] ADD [CreatedBy] nvarchar(10) NULL;

ALTER TABLE [EmployeeImages] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [EmployeeImages] ADD [InCompany] nvarchar(5) NULL;

ALTER TABLE [EmployeeImages] ADD [ModifiedBy] nvarchar(10) NULL;

ALTER TABLE [EmployeeImages] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [EmployeeExtraHours] ADD [CreatedBy] nvarchar(10) NULL;

ALTER TABLE [EmployeeExtraHours] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [EmployeeExtraHours] ADD [InCompany] nvarchar(5) NULL;

ALTER TABLE [EmployeeExtraHours] ADD [ModifiedBy] nvarchar(10) NULL;

ALTER TABLE [EmployeeExtraHours] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [EmployeeEarningCodes] ADD [CreatedBy] nvarchar(10) NULL;

ALTER TABLE [EmployeeEarningCodes] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [EmployeeEarningCodes] ADD [InCompany] nvarchar(5) NULL;

ALTER TABLE [EmployeeEarningCodes] ADD [ModifiedBy] nvarchar(10) NULL;

ALTER TABLE [EmployeeEarningCodes] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [EmployeeDocuments] ADD [CreatedBy] nvarchar(10) NULL;

ALTER TABLE [EmployeeDocuments] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [EmployeeDocuments] ADD [InCompany] nvarchar(5) NULL;

ALTER TABLE [EmployeeDocuments] ADD [ModifiedBy] nvarchar(10) NULL;

ALTER TABLE [EmployeeDocuments] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [EmployeeDepartments] ADD [CreatedBy] nvarchar(10) NULL;

ALTER TABLE [EmployeeDepartments] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [EmployeeDepartments] ADD [InCompany] nvarchar(5) NULL;

ALTER TABLE [EmployeeDepartments] ADD [ModifiedBy] nvarchar(10) NULL;

ALTER TABLE [EmployeeDepartments] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [EmployeeDeductionCodes] ADD [CreatedBy] nvarchar(10) NULL;

ALTER TABLE [EmployeeDeductionCodes] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [EmployeeDeductionCodes] ADD [InCompany] nvarchar(5) NULL;

ALTER TABLE [EmployeeDeductionCodes] ADD [ModifiedBy] nvarchar(10) NULL;

ALTER TABLE [EmployeeDeductionCodes] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [EmployeeContactsInf] ADD [CreatedBy] nvarchar(10) NULL;

ALTER TABLE [EmployeeContactsInf] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [EmployeeContactsInf] ADD [InCompany] nvarchar(5) NULL;

ALTER TABLE [EmployeeContactsInf] ADD [ModifiedBy] nvarchar(10) NULL;

ALTER TABLE [EmployeeContactsInf] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [EmployeeBankAccounts] ADD [CreatedBy] nvarchar(10) NULL;

ALTER TABLE [EmployeeBankAccounts] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [EmployeeBankAccounts] ADD [InCompany] nvarchar(5) NULL;

ALTER TABLE [EmployeeBankAccounts] ADD [ModifiedBy] nvarchar(10) NULL;

ALTER TABLE [EmployeeBankAccounts] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [Departments] ADD [InCompany] nvarchar(5) NULL;

ALTER TABLE [DeductionCodes] ADD [InCompany] nvarchar(5) NULL;

ALTER TABLE [CourseTypes] ADD [CreatedBy] nvarchar(10) NULL;

ALTER TABLE [CourseTypes] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [CourseTypes] ADD [InCompany] nvarchar(5) NULL;

ALTER TABLE [CourseTypes] ADD [ModifiedBy] nvarchar(10) NULL;

ALTER TABLE [CourseTypes] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [Courses] ADD [InCompany] nvarchar(5) NULL;

ALTER TABLE [CoursePositions] ADD [CreatedBy] nvarchar(10) NULL;

ALTER TABLE [CoursePositions] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [CoursePositions] ADD [InCompany] nvarchar(5) NULL;

ALTER TABLE [CoursePositions] ADD [ModifiedBy] nvarchar(10) NULL;

ALTER TABLE [CoursePositions] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [CourseLocations] ADD [CreatedBy] nvarchar(10) NULL;

ALTER TABLE [CourseLocations] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [CourseLocations] ADD [InCompany] nvarchar(5) NULL;

ALTER TABLE [CourseLocations] ADD [ModifiedBy] nvarchar(10) NULL;

ALTER TABLE [CourseLocations] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [CourseInstructors] ADD [CreatedBy] nvarchar(10) NULL;

ALTER TABLE [CourseInstructors] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [CourseInstructors] ADD [InCompany] nvarchar(5) NULL;

ALTER TABLE [CourseInstructors] ADD [ModifiedBy] nvarchar(10) NULL;

ALTER TABLE [CourseInstructors] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [CourseEmployees] ADD [CreatedBy] nvarchar(10) NULL;

ALTER TABLE [CourseEmployees] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [CourseEmployees] ADD [InCompany] nvarchar(5) NULL;

ALTER TABLE [CourseEmployees] ADD [ModifiedBy] nvarchar(10) NULL;

ALTER TABLE [CourseEmployees] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [ClassRooms] ADD [CreatedBy] nvarchar(10) NULL;

ALTER TABLE [ClassRooms] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [ClassRooms] ADD [InCompany] nvarchar(5) NULL;

ALTER TABLE [ClassRooms] ADD [ModifiedBy] nvarchar(10) NULL;

ALTER TABLE [ClassRooms] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210921000748_des-53', N'9.0.2');

ALTER TABLE [Taxes] DROP CONSTRAINT [FK_Taxes_Departments_DepartmentId];

ALTER TABLE [Taxes] DROP CONSTRAINT [FK_Taxes_ProjCategories_ProjCategory];

ALTER TABLE [Taxes] DROP CONSTRAINT [FK_Taxes_Projects_ProjId];

DROP INDEX [IX_Taxes_DepartmentId] ON [Taxes];

DROP INDEX [IX_Taxes_ProjCategory] ON [Taxes];

DROP INDEX [IX_Taxes_ProjId] ON [Taxes];

ALTER TABLE [EmployeeTaxes] DROP CONSTRAINT [PK_EmployeeTaxes];

DECLARE @var49 sysname;
SELECT @var49 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Taxes]') AND [c].[name] = N'ProjId');
IF @var49 IS NOT NULL EXEC(N'ALTER TABLE [Taxes] DROP CONSTRAINT [' + @var49 + '];');
ALTER TABLE [Taxes] ALTER COLUMN [ProjId] nvarchar(20) NULL;

DECLARE @var50 sysname;
SELECT @var50 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Taxes]') AND [c].[name] = N'ProjCategory');
IF @var50 IS NOT NULL EXEC(N'ALTER TABLE [Taxes] DROP CONSTRAINT [' + @var50 + '];');
ALTER TABLE [Taxes] ALTER COLUMN [ProjCategory] nvarchar(20) NULL;

DECLARE @var51 sysname;
SELECT @var51 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Taxes]') AND [c].[name] = N'DepartmentId');
IF @var51 IS NOT NULL EXEC(N'ALTER TABLE [Taxes] DROP CONSTRAINT [' + @var51 + '];');
ALTER TABLE [Taxes] ALTER COLUMN [DepartmentId] nvarchar(20) NULL;

DECLARE @var52 sysname;
SELECT @var52 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeTaxes]') AND [c].[name] = N'TaxId');
IF @var52 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeTaxes] DROP CONSTRAINT [' + @var52 + '];');
ALTER TABLE [EmployeeTaxes] ALTER COLUMN [TaxId] nvarchar(20) NOT NULL;

ALTER TABLE [Employees] ADD [WorkStatus] int NOT NULL DEFAULT 0;

ALTER TABLE [EmployeeTaxes] ADD CONSTRAINT [PK_EmployeeTaxes] PRIMARY KEY ([TaxId], [EmployeeId], [PayrollId]);

ALTER TABLE [EmployeeTaxes] ADD CONSTRAINT [FK_EmployeeTaxes_Taxes_TaxId] FOREIGN KEY ([TaxId]) REFERENCES [Taxes] ([TaxId]) ON DELETE CASCADE;

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210921203619_des-54', N'9.0.2');

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

CREATE INDEX [IX_EarningCodeVersions_EarningCodeId] ON [EarningCodeVersions] ([EarningCodeId]);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210923210311_des-55', N'9.0.2');

ALTER TABLE [PayrollsProcess] ADD [TotalAmountToPay] decimal(18,2) NOT NULL DEFAULT 0.0;

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210924233646_des-56', N'9.0.2');

DECLARE @var53 sysname;
SELECT @var53 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EarningCodes]') AND [c].[name] = N'IsEnabled');
IF @var53 IS NOT NULL EXEC(N'ALTER TABLE [EarningCodes] DROP CONSTRAINT [' + @var53 + '];');
ALTER TABLE [EarningCodes] DROP COLUMN [IsEnabled];

DECLARE @var54 sysname;
SELECT @var54 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[DeductionCodes]') AND [c].[name] = N'IsEnable');
IF @var54 IS NOT NULL EXEC(N'ALTER TABLE [DeductionCodes] DROP CONSTRAINT [' + @var54 + '];');
ALTER TABLE [DeductionCodes] DROP COLUMN [IsEnable];

ALTER TABLE [DeductionCodes] ADD [Ctbution_LimitAmountToApply] decimal(18,2) NOT NULL DEFAULT 0.0;

ALTER TABLE [DeductionCodes] ADD [Dduction_LimitAmountToApply] decimal(18,2) NOT NULL DEFAULT 0.0;

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

CREATE INDEX [IX_DeductionCodeVersions_DeductionCodeId] ON [DeductionCodeVersions] ([DeductionCodeId]);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210925232757_des-57', N'9.0.2');

ALTER TABLE [PayrollsProcess] ADD [CreatedBy] nvarchar(10) NULL;

ALTER TABLE [PayrollsProcess] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [PayrollsProcess] ADD [InCompany] nvarchar(5) NULL;

ALTER TABLE [PayrollsProcess] ADD [ModifiedBy] nvarchar(10) NULL;

ALTER TABLE [PayrollsProcess] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [PayrollProcessDetails] ADD [CreatedBy] nvarchar(10) NULL;

ALTER TABLE [PayrollProcessDetails] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [PayrollProcessDetails] ADD [InCompany] nvarchar(5) NULL;

ALTER TABLE [PayrollProcessDetails] ADD [ModifiedBy] nvarchar(10) NULL;

ALTER TABLE [PayrollProcessDetails] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [PayrollProcessActions] ADD [CreatedBy] nvarchar(10) NULL;

ALTER TABLE [PayrollProcessActions] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [PayrollProcessActions] ADD [InCompany] nvarchar(5) NULL;

ALTER TABLE [PayrollProcessActions] ADD [ModifiedBy] nvarchar(10) NULL;

ALTER TABLE [PayrollProcessActions] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [EmployeesAddress] ADD [CreatedBy] nvarchar(10) NULL;

ALTER TABLE [EmployeesAddress] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [EmployeesAddress] ADD [InCompany] nvarchar(5) NULL;

ALTER TABLE [EmployeesAddress] ADD [ModifiedBy] nvarchar(10) NULL;

ALTER TABLE [EmployeesAddress] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [EarningCodeVersions] ADD [InCompany] nvarchar(5) NULL;

ALTER TABLE [EarningCodes] ADD [InCompany] nvarchar(5) NULL;

ALTER TABLE [DeductionCodeVersions] ADD [CreatedBy] nvarchar(10) NULL;

ALTER TABLE [DeductionCodeVersions] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [DeductionCodeVersions] ADD [InCompany] nvarchar(5) NULL;

ALTER TABLE [DeductionCodeVersions] ADD [ModifiedBy] nvarchar(10) NULL;

ALTER TABLE [DeductionCodeVersions] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20211001194341_des-58', N'9.0.2');

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

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20211006180654_des-59', N'9.0.2');

ALTER TABLE [PayrollProcessActions] ADD [ActionId] nvarchar(25) NOT NULL DEFAULT N'';

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20211012024057_des-60', N'9.0.2');

ALTER TABLE [EmployeeDeductionCodes] ADD [DeductionAmount] decimal(18,2) NOT NULL DEFAULT 0.0;

ALTER TABLE [DeductionCodeVersions] ADD [IsForTaxCalc] bit NOT NULL DEFAULT CAST(0 AS bit);

DECLARE @var55 sysname;
SELECT @var55 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[DeductionCodes]') AND [c].[name] = N'Dduction_MultiplyAmount');
IF @var55 IS NOT NULL EXEC(N'ALTER TABLE [DeductionCodes] DROP CONSTRAINT [' + @var55 + '];');
ALTER TABLE [DeductionCodes] ALTER COLUMN [Dduction_MultiplyAmount] decimal(32,16) NOT NULL;

DECLARE @var56 sysname;
SELECT @var56 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[DeductionCodes]') AND [c].[name] = N'Dduction_LimitAmount');
IF @var56 IS NOT NULL EXEC(N'ALTER TABLE [DeductionCodes] DROP CONSTRAINT [' + @var56 + '];');
ALTER TABLE [DeductionCodes] ALTER COLUMN [Dduction_LimitAmount] decimal(32,16) NOT NULL;

DECLARE @var57 sysname;
SELECT @var57 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[DeductionCodes]') AND [c].[name] = N'Ctbution_MultiplyAmount');
IF @var57 IS NOT NULL EXEC(N'ALTER TABLE [DeductionCodes] DROP CONSTRAINT [' + @var57 + '];');
ALTER TABLE [DeductionCodes] ALTER COLUMN [Ctbution_MultiplyAmount] decimal(32,16) NOT NULL;

DECLARE @var58 sysname;
SELECT @var58 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[DeductionCodes]') AND [c].[name] = N'Ctbution_LimitAmount');
IF @var58 IS NOT NULL EXEC(N'ALTER TABLE [DeductionCodes] DROP CONSTRAINT [' + @var58 + '];');
ALTER TABLE [DeductionCodes] ALTER COLUMN [Ctbution_LimitAmount] decimal(32,16) NOT NULL;

ALTER TABLE [DeductionCodes] ADD [IsForTaxCalc] bit NOT NULL DEFAULT CAST(0 AS bit);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20211016193245_des-61', N'9.0.2');

ALTER TABLE [PayrollsProcess] ADD [IsRoyaltyPayroll] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [PayrollProcessActions] ADD [ApplyRoyaltyPayroll] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [EarningCodes] ADD [IsRoyaltyPayroll] bit NOT NULL DEFAULT CAST(0 AS bit);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20211018214929_des-62', N'9.0.2');

ALTER TABLE [EarningCodeVersions] ADD [IsRoyaltyPayroll] bit NOT NULL DEFAULT CAST(0 AS bit);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20211019023748_des-63', N'9.0.2');

ALTER TABLE [EmployeeLoans] DROP CONSTRAINT [PK_EmployeeLoans];

ALTER TABLE [EmployeeLoans] ADD [InternalId] int NOT NULL DEFAULT 0;

ALTER TABLE [EmployeeLoans] ADD CONSTRAINT [PK_EmployeeLoans] PRIMARY KEY ([InternalId], [EmployeeId]);

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

CREATE INDEX [IX_EmployeeLoans_LoanId] ON [EmployeeLoans] ([LoanId]);

CREATE INDEX [IX_EmployeeLoanHistory_EmployeeId] ON [EmployeeLoanHistory] ([EmployeeId]);

CREATE INDEX [IX_EmployeeLoanHistory_LoanId] ON [EmployeeLoanHistory] ([LoanId]);

CREATE INDEX [IX_EmployeeLoanHistory_PayrollId] ON [EmployeeLoanHistory] ([PayrollId]);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20211019183539_des-64', N'9.0.2');

ALTER TABLE [EmployeeLoanHistory] DROP CONSTRAINT [FK_EmployeeLoanHistory_Employees_EmployeeId];

ALTER TABLE [EmployeeLoanHistory] DROP CONSTRAINT [FK_EmployeeLoanHistory_Loans_LoanId];

ALTER TABLE [EmployeeLoanHistory] DROP CONSTRAINT [FK_EmployeeLoanHistory_Payrolls_PayrollId];

ALTER TABLE [EmployeeLoanHistory] DROP CONSTRAINT [PK_EmployeeLoanHistory];

EXEC sp_rename N'[EmployeeLoanHistory]', N'EmployeeLoanHistories', 'OBJECT';

EXEC sp_rename N'[EmployeeLoanHistories].[IX_EmployeeLoanHistory_PayrollId]', N'IX_EmployeeLoanHistories_PayrollId', 'INDEX';

EXEC sp_rename N'[EmployeeLoanHistories].[IX_EmployeeLoanHistory_LoanId]', N'IX_EmployeeLoanHistories_LoanId', 'INDEX';

EXEC sp_rename N'[EmployeeLoanHistories].[IX_EmployeeLoanHistory_EmployeeId]', N'IX_EmployeeLoanHistories_EmployeeId', 'INDEX';

ALTER TABLE [EmployeeLoanHistories] ADD CONSTRAINT [PK_EmployeeLoanHistories] PRIMARY KEY ([InternalId], [ParentInternalId]);

ALTER TABLE [EmployeeLoanHistories] ADD CONSTRAINT [FK_EmployeeLoanHistories_Employees_EmployeeId] FOREIGN KEY ([EmployeeId]) REFERENCES [Employees] ([EmployeeId]) ON DELETE CASCADE;

ALTER TABLE [EmployeeLoanHistories] ADD CONSTRAINT [FK_EmployeeLoanHistories_Loans_LoanId] FOREIGN KEY ([LoanId]) REFERENCES [Loans] ([LoanId]);

ALTER TABLE [EmployeeLoanHistories] ADD CONSTRAINT [FK_EmployeeLoanHistories_Payrolls_PayrollId] FOREIGN KEY ([PayrollId]) REFERENCES [Payrolls] ([PayrollId]) ON DELETE CASCADE;

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20211019193520_des-65', N'9.0.2');

DECLARE @var59 sysname;
SELECT @var59 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[ClassRooms]') AND [c].[name] = N'AvailableTimeStart');
IF @var59 IS NOT NULL EXEC(N'ALTER TABLE [ClassRooms] DROP CONSTRAINT [' + @var59 + '];');
ALTER TABLE [ClassRooms] ALTER COLUMN [AvailableTimeStart] time NOT NULL;

DECLARE @var60 sysname;
SELECT @var60 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[ClassRooms]') AND [c].[name] = N'AvailableTimeEnd');
IF @var60 IS NOT NULL EXEC(N'ALTER TABLE [ClassRooms] DROP CONSTRAINT [' + @var60 + '];');
ALTER TABLE [ClassRooms] ALTER COLUMN [AvailableTimeEnd] time NOT NULL;

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20211024015134_des-66', N'9.0.2');

DECLARE @var61 sysname;
SELECT @var61 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[ClassRooms]') AND [c].[name] = N'AvailableTimeEnd');
IF @var61 IS NOT NULL EXEC(N'ALTER TABLE [ClassRooms] DROP CONSTRAINT [' + @var61 + '];');
ALTER TABLE [ClassRooms] DROP COLUMN [AvailableTimeEnd];

DECLARE @var62 sysname;
SELECT @var62 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[ClassRooms]') AND [c].[name] = N'AvailableTimeStart');
IF @var62 IS NOT NULL EXEC(N'ALTER TABLE [ClassRooms] DROP CONSTRAINT [' + @var62 + '];');
ALTER TABLE [ClassRooms] DROP COLUMN [AvailableTimeStart];

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20211024021216_des-67', N'9.0.2');

ALTER TABLE [ClassRooms] ADD [AvailableTimeEnd] time NOT NULL DEFAULT '00:00:00';

ALTER TABLE [ClassRooms] ADD [AvailableTimeStart] time NOT NULL DEFAULT '00:00:00';

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20211024021256_des-68', N'9.0.2');

ALTER TABLE [EmployeeExtraHours] ADD [Comment] nvarchar(200) NULL;

ALTER TABLE [Courses] ADD [URLDocuments] nvarchar(1000) NULL;

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20211102003843_des-69', N'9.0.2');

ALTER TABLE [EmployeeEarningCodes] DROP CONSTRAINT [PK_EmployeeEarningCodes];

ALTER TABLE [Employees] ADD [EmployeeAction] int NOT NULL DEFAULT 0;

ALTER TABLE [EmployeeEarningCodes] ADD CONSTRAINT [PK_EmployeeEarningCodes] PRIMARY KEY ([EarningCodeId], [EmployeeId]);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20211102184406_des-70', N'9.0.2');

ALTER TABLE [CourseEmployees] DROP CONSTRAINT [FK_CourseEmployees_Instructors_EmployeeId];

ALTER TABLE [EmployeeEarningCodes] DROP CONSTRAINT [PK_EmployeeEarningCodes];

ALTER TABLE [EmployeeEarningCodes] ADD [InternalId] int NOT NULL DEFAULT 0;

ALTER TABLE [EmployeeEarningCodes] ADD CONSTRAINT [PK_EmployeeEarningCodes] PRIMARY KEY ([InternalId]);

CREATE INDEX [IX_EmployeeEarningCodes_EarningCodeId] ON [EmployeeEarningCodes] ([EarningCodeId]);

ALTER TABLE [CourseEmployees] ADD CONSTRAINT [FK_CourseEmployees_Employees_EmployeeId] FOREIGN KEY ([EmployeeId]) REFERENCES [Employees] ([EmployeeId]) ON DELETE CASCADE;

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20211103175210_des-71', N'9.0.2');

ALTER TABLE [CoursePositions] DROP CONSTRAINT [FK_CoursePositions_Instructors_PositionId];

ALTER TABLE [CoursePositions] ADD CONSTRAINT [FK_CoursePositions_Positions_PositionId] FOREIGN KEY ([PositionId]) REFERENCES [Positions] ([PositionId]) ON DELETE CASCADE;

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20211104012227_des-72', N'9.0.2');

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

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20211108204548_des-73', N'9.0.2');

ALTER TABLE [EmployeeEarningCodes] DROP CONSTRAINT [PK_EmployeeEarningCodes];

ALTER TABLE [EmployeeEarningCodes] ADD CONSTRAINT [PK_EmployeeEarningCodes] PRIMARY KEY ([InternalId], [EmployeeId]);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20211108210952_des-74', N'9.0.2');

ALTER TABLE [EmployeeTaxes] DROP CONSTRAINT [FK_EmployeeTaxes_Taxes_TaxId];

ALTER TABLE [TaxDetails] DROP CONSTRAINT [FK_TaxDetails_Taxes_TaxId];

ALTER TABLE [Taxes] DROP CONSTRAINT [PK_Taxes];

DROP INDEX [IX_TaxDetails_TaxId] ON [TaxDetails];

DECLARE @var63 sysname;
SELECT @var63 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Taxes]') AND [c].[name] = N'InCompany');
IF @var63 IS NOT NULL EXEC(N'ALTER TABLE [Taxes] DROP CONSTRAINT [' + @var63 + '];');
UPDATE [Taxes] SET [InCompany] = N'' WHERE [InCompany] IS NULL;
ALTER TABLE [Taxes] ALTER COLUMN [InCompany] nvarchar(5) NOT NULL;
ALTER TABLE [Taxes] ADD DEFAULT N'' FOR [InCompany];

DECLARE @var64 sysname;
SELECT @var64 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[TaxDetails]') AND [c].[name] = N'InCompany');
IF @var64 IS NOT NULL EXEC(N'ALTER TABLE [TaxDetails] DROP CONSTRAINT [' + @var64 + '];');
UPDATE [TaxDetails] SET [InCompany] = N'' WHERE [InCompany] IS NULL;
ALTER TABLE [TaxDetails] ALTER COLUMN [InCompany] nvarchar(5) NOT NULL;
ALTER TABLE [TaxDetails] ADD DEFAULT N'' FOR [InCompany];

DECLARE @var65 sysname;
SELECT @var65 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeTaxes]') AND [c].[name] = N'InCompany');
IF @var65 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeTaxes] DROP CONSTRAINT [' + @var65 + '];');
UPDATE [EmployeeTaxes] SET [InCompany] = N'' WHERE [InCompany] IS NULL;
ALTER TABLE [EmployeeTaxes] ALTER COLUMN [InCompany] nvarchar(5) NOT NULL;
ALTER TABLE [EmployeeTaxes] ADD DEFAULT N'' FOR [InCompany];

ALTER TABLE [Taxes] ADD CONSTRAINT [PK_Taxes] PRIMARY KEY ([TaxId], [InCompany]);

CREATE INDEX [IX_TaxDetails_TaxId_InCompany] ON [TaxDetails] ([TaxId], [InCompany]);

CREATE INDEX [IX_EmployeeTaxes_TaxId_InCompany] ON [EmployeeTaxes] ([TaxId], [InCompany]);

ALTER TABLE [EmployeeTaxes] ADD CONSTRAINT [FK_EmployeeTaxes_Taxes_TaxId_InCompany] FOREIGN KEY ([TaxId], [InCompany]) REFERENCES [Taxes] ([TaxId], [InCompany]) ON DELETE CASCADE;

ALTER TABLE [TaxDetails] ADD CONSTRAINT [FK_TaxDetails_Taxes_TaxId_InCompany] FOREIGN KEY ([TaxId], [InCompany]) REFERENCES [Taxes] ([TaxId], [InCompany]) ON DELETE CASCADE;

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20211111170353_des-75', N'9.0.2');

ALTER TABLE [MenusApp] ADD [IsViewMenu] bit NOT NULL DEFAULT CAST(0 AS bit);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20211115204859_des-76', N'9.0.2');

ALTER TABLE [TaxDetails] DROP CONSTRAINT [PK_TaxDetails];

DELETE FROM [MenusApp]
WHERE [MenuId] = N'MENU-0006';
SELECT @@ROWCOUNT;


ALTER TABLE [TaxDetails] ADD CONSTRAINT [PK_TaxDetails] PRIMARY KEY ([InternalId], [TaxId], [InCompany]);

IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'MenuId', N'Action', N'Description', N'Icon', N'IsViewMenu', N'MenuFather', N'MenuName', N'Sort') AND [object_id] = OBJECT_ID(N'[MenusApp]'))
    SET IDENTITY_INSERT [MenusApp] ON;
INSERT INTO [MenusApp] ([MenuId], [Action], [Description], [Icon], [IsViewMenu], [MenuFather], [MenuName], [Sort])
VALUES (N'MENU-0057', N'Click', N'Título de configuración', N'fa fa-setting', CAST(0 AS bit), NULL, N'Configuración', 0);
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'MenuId', N'Action', N'Description', N'Icon', N'IsViewMenu', N'MenuFather', N'MenuName', N'Sort') AND [object_id] = OBJECT_ID(N'[MenusApp]'))
    SET IDENTITY_INSERT [MenusApp] OFF;

UPDATE [MenusApp] SET [MenuFather] = N'MENU-0057'
WHERE [MenuId] = N'MENU-0002';
SELECT @@ROWCOUNT;


INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20211221165347_des-77', N'9.0.2');

ALTER TABLE [Companies] ADD [LicenseKey] nvarchar(500) NULL;

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20220111001708_des-78', N'9.0.2');

CREATE SEQUENCE [EmployeeHistoryId] AS int START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 999999999 NO CYCLE;

ALTER TABLE [Employees] ADD [DisabilityTypeId] nvarchar(20) NOT NULL DEFAULT N'';

ALTER TABLE [Employees] ADD [EducationLevelId] nvarchar(20) NOT NULL DEFAULT N'';

ALTER TABLE [Employees] ADD [OccupationId] nvarchar(20) NOT NULL DEFAULT N'';

ALTER TABLE [Countries] ADD [NationalityCode] nvarchar(max) NULL;

ALTER TABLE [Countries] ADD [NationalityName] nvarchar(max) NULL;

CREATE TABLE [DisabilityTypes] (
    [DisabilityTypeId] nvarchar(20) NOT NULL,
    [Description] nvarchar(100) NULL,
    CONSTRAINT [PK_DisabilityTypes] PRIMARY KEY ([DisabilityTypeId])
);

CREATE TABLE [EducationLevels] (
    [EducationLevelId] nvarchar(20) NOT NULL,
    [Description] nvarchar(100) NULL,
    CONSTRAINT [PK_EducationLevels] PRIMARY KEY ([EducationLevelId])
);

CREATE TABLE [EmployeeHistories] (
    [EmployeeHistoryId] nvarchar(20) NOT NULL DEFAULT (FORMAT((NEXT VALUE FOR dbo.EmployeeHistoryId),'EH-00000000#')),
    [Type] nvarchar(5) NOT NULL,
    [Description] nvarchar(200) NOT NULL,
    [RegisterDate] datetime2 NOT NULL,
    [EmployeeId] nvarchar(20) NOT NULL,
    CONSTRAINT [PK_EmployeeHistories] PRIMARY KEY ([EmployeeHistoryId]),
    CONSTRAINT [FK_EmployeeHistories_Employees_EmployeeId] FOREIGN KEY ([EmployeeId]) REFERENCES [Employees] ([EmployeeId]) ON DELETE CASCADE
);

CREATE TABLE [Occupations] (
    [OccupationId] nvarchar(20) NOT NULL,
    [Description] nvarchar(100) NULL,
    CONSTRAINT [PK_Occupations] PRIMARY KEY ([OccupationId])
);

CREATE INDEX [IX_Employees_DisabilityTypeId] ON [Employees] ([DisabilityTypeId]);

CREATE INDEX [IX_Employees_EducationLevelId] ON [Employees] ([EducationLevelId]);

CREATE INDEX [IX_Employees_OccupationId] ON [Employees] ([OccupationId]);

CREATE INDEX [IX_EmployeeHistories_EmployeeId] ON [EmployeeHistories] ([EmployeeId]);

ALTER TABLE [Employees] ADD CONSTRAINT [FK_Employees_DisabilityTypes_DisabilityTypeId] FOREIGN KEY ([DisabilityTypeId]) REFERENCES [DisabilityTypes] ([DisabilityTypeId]) ON DELETE CASCADE;

ALTER TABLE [Employees] ADD CONSTRAINT [FK_Employees_EducationLevels_EducationLevelId] FOREIGN KEY ([EducationLevelId]) REFERENCES [EducationLevels] ([EducationLevelId]) ON DELETE CASCADE;

ALTER TABLE [Employees] ADD CONSTRAINT [FK_Employees_Occupations_OccupationId] FOREIGN KEY ([OccupationId]) REFERENCES [Occupations] ([OccupationId]) ON DELETE CASCADE;

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20220117235825_des-79', N'9.0.2');

ALTER TABLE [Employees] ADD [Nationality] nvarchar(5) NULL;

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20220119183843_des-80', N'9.0.2');

DECLARE @var66 sysname;
SELECT @var66 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Occupations]') AND [c].[name] = N'Description');
IF @var66 IS NOT NULL EXEC(N'ALTER TABLE [Occupations] DROP CONSTRAINT [' + @var66 + '];');
ALTER TABLE [Occupations] ALTER COLUMN [Description] nvarchar(200) NULL;

ALTER TABLE [Employees] ADD [LocationId] nvarchar(10) NULL;

DECLARE @var67 sysname;
SELECT @var67 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EducationLevels]') AND [c].[name] = N'Description');
IF @var67 IS NOT NULL EXEC(N'ALTER TABLE [EducationLevels] DROP CONSTRAINT [' + @var67 + '];');
ALTER TABLE [EducationLevels] ALTER COLUMN [Description] nvarchar(200) NULL;

DECLARE @var68 sysname;
SELECT @var68 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[DisabilityTypes]') AND [c].[name] = N'Description');
IF @var68 IS NOT NULL EXEC(N'ALTER TABLE [DisabilityTypes] DROP CONSTRAINT [' + @var68 + '];');
ALTER TABLE [DisabilityTypes] ALTER COLUMN [Description] nvarchar(200) NULL;

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20220119214932_des-81', N'9.0.2');

ALTER TABLE [EmployeeEarningCodes] ADD [IndexEarningDiary] decimal(18,2) NOT NULL DEFAULT 0.0;

ALTER TABLE [EarningCodeVersions] ADD [IsUseDGT] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [EarningCodes] ADD [IsUseDGT] bit NOT NULL DEFAULT CAST(0 AS bit);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20220125194021_des-82', N'9.0.2');

DECLARE @var69 sysname;
SELECT @var69 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[BatchHistories]') AND [c].[name] = N'Information');
IF @var69 IS NOT NULL EXEC(N'ALTER TABLE [BatchHistories] DROP CONSTRAINT [' + @var69 + '];');
ALTER TABLE [BatchHistories] ALTER COLUMN [Information] nvarchar(MAX) NULL;

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20220202224226_des-83', N'9.0.2');

ALTER TABLE [EmployeeHistories] ADD [IsUseDGT] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [EmployeeEarningCodes] ADD [IsUseDGT] bit NOT NULL DEFAULT CAST(0 AS bit);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20220217155536_des_84', N'9.0.2');

ALTER TABLE [Companies] ADD [Identification] nvarchar(50) NULL;

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20220219230935_des-85', N'9.0.2');

ALTER TABLE [Companies] ADD [CompanyStatus] bit NOT NULL DEFAULT CAST(0 AS bit);

UPDATE [Companies] SET [CompanyStatus] = CAST(1 AS bit)
WHERE [CompanyId] = N'Root';
SELECT @@ROWCOUNT;


INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20220225181710_des-86', N'9.0.2');

ALTER TABLE [EmployeeLoanHistories] DROP CONSTRAINT [PK_EmployeeLoanHistories];

ALTER TABLE [EmployeeLoanHistories] ADD CONSTRAINT [PK_EmployeeLoanHistories] PRIMARY KEY ([InternalId], [ParentInternalId], [EmployeeId]);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20220414231607_des-87', N'9.0.2');

ALTER TABLE [EmployeeLoanHistories] ADD [CreatedBy] nvarchar(10) NULL;

ALTER TABLE [EmployeeLoanHistories] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [EmployeeLoanHistories] ADD [InCompany] nvarchar(5) NULL;

ALTER TABLE [EmployeeLoanHistories] ADD [ModifiedBy] nvarchar(10) NULL;

ALTER TABLE [EmployeeLoanHistories] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20220414232653_des-88', N'9.0.2');

ALTER TABLE [Employees] ADD [ApplyforOvertime] bit NOT NULL DEFAULT CAST(0 AS bit);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20220415001352_des-89', N'9.0.2');

ALTER TABLE [PayrollProcessDetails] ADD [StartWorkDate] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20220419221342_des-90', N'9.0.2');

CREATE TABLE [Provinces] (
    [ProvinceId] nvarchar(450) NOT NULL,
    [Name] nvarchar(max) NULL,
    CONSTRAINT [PK_Provinces] PRIMARY KEY ([ProvinceId])
);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20220420210007_des-91', N'9.0.2');

DECLARE @var70 sysname;
SELECT @var70 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Provinces]') AND [c].[name] = N'Name');
IF @var70 IS NOT NULL EXEC(N'ALTER TABLE [Provinces] DROP CONSTRAINT [' + @var70 + '];');
UPDATE [Provinces] SET [Name] = N'' WHERE [Name] IS NULL;
ALTER TABLE [Provinces] ALTER COLUMN [Name] nvarchar(100) NOT NULL;
ALTER TABLE [Provinces] ADD DEFAULT N'' FOR [Name];

DECLARE @var71 sysname;
SELECT @var71 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Provinces]') AND [c].[name] = N'ProvinceId');
IF @var71 IS NOT NULL EXEC(N'ALTER TABLE [Provinces] DROP CONSTRAINT [' + @var71 + '];');
ALTER TABLE [Provinces] ALTER COLUMN [ProvinceId] nvarchar(10) NOT NULL;

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20220420210455_des-92', N'9.0.2');

ALTER TABLE [Provinces] DROP CONSTRAINT [PK_Provinces];

ALTER TABLE [Provinces] ADD [ProvinceId2] nvarchar(450) NOT NULL DEFAULT N'';

ALTER TABLE [Provinces] ADD CONSTRAINT [PK_Provinces] PRIMARY KEY ([ProvinceId2]);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20220421000821_des-93', N'9.0.2');

ALTER TABLE [Provinces] DROP CONSTRAINT [PK_Provinces];

DECLARE @var72 sysname;
SELECT @var72 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Provinces]') AND [c].[name] = N'ProvinceId2');
IF @var72 IS NOT NULL EXEC(N'ALTER TABLE [Provinces] DROP CONSTRAINT [' + @var72 + '];');
ALTER TABLE [Provinces] DROP COLUMN [ProvinceId2];

ALTER TABLE [Provinces] ADD CONSTRAINT [PK_Provinces] PRIMARY KEY ([ProvinceId]);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20220421001136_des-94', N'9.0.2');

ALTER TABLE [EmployeesAddress] ADD [ProvinceName] nvarchar(50) NOT NULL DEFAULT N'';

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20220422011017_des-95', N'9.0.2');

DECLARE @var73 sysname;
SELECT @var73 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeExtraHours]') AND [c].[name] = N'Quantity');
IF @var73 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeExtraHours] DROP CONSTRAINT [' + @var73 + '];');
ALTER TABLE [EmployeeExtraHours] ALTER COLUMN [Quantity] decimal(32,16) NOT NULL;

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20220524235648_des-96', N'9.0.2');

ALTER TABLE [BatchHistories] ADD [CreatedBy] nvarchar(10) NULL;

ALTER TABLE [BatchHistories] ADD [CreatedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [BatchHistories] ADD [InCompany] nvarchar(5) NULL;

ALTER TABLE [BatchHistories] ADD [ModifiedBy] nvarchar(10) NULL;

ALTER TABLE [BatchHistories] ADD [ModifiedDateTime] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

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

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20221206205745_des-97', N'9.0.2');

CREATE TABLE [CalendarHolidays] (
    [CalendarDate] datetime2 NOT NULL,
    [Description] nvarchar(100) NOT NULL,
    CONSTRAINT [PK_CalendarHolidays] PRIMARY KEY ([CalendarDate])
);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20221209174508_des-98', N'9.0.2');

ALTER TABLE [EmployeeWorkCalendars] DROP CONSTRAINT [PK_EmployeeWorkCalendars];

ALTER TABLE [EmployeeWorkCalendars] ADD [InternalId] int NOT NULL DEFAULT 0;

ALTER TABLE [EmployeeWorkCalendars] ADD CONSTRAINT [PK_EmployeeWorkCalendars] PRIMARY KEY ([InternalId], [EmployeeId]);

CREATE INDEX [IX_EmployeeWorkCalendars_EmployeeId] ON [EmployeeWorkCalendars] ([EmployeeId]);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20221213204853_des-99', N'9.0.2');

ALTER TABLE [Employees] ADD [IsFixedWorkCalendar] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [EarningCodeVersions] ADD [IsHoliday] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [EarningCodeVersions] ADD [WorkFrom] time NOT NULL DEFAULT '00:00:00';

ALTER TABLE [EarningCodeVersions] ADD [WorkTo] time NOT NULL DEFAULT '00:00:00';

ALTER TABLE [EarningCodes] ADD [IsHoliday] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [EarningCodes] ADD [WorkFrom] time NOT NULL DEFAULT '00:00:00';

ALTER TABLE [EarningCodes] ADD [WorkTo] time NOT NULL DEFAULT '00:00:00';

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20221213212956_des-100', N'9.0.2');

EXEC sp_rename N'[ReportsConfig].[Cooperative]', N'LoanCooperative', 'COLUMN';

ALTER TABLE [ReportsConfig] ADD [DeductionCooperative] nvarchar(20) NULL;

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20221216161121_des-101', N'9.0.2');

ALTER TABLE [EmployeeDeductionCodes] ADD [PayFrecuency] int NOT NULL DEFAULT 0;

ALTER TABLE [EmployeeDeductionCodes] ADD [QtyPeriodForPaid] int NOT NULL DEFAULT 0;

ALTER TABLE [EmployeeDeductionCodes] ADD [StartPeriodForPaid] int NOT NULL DEFAULT 0;

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20221226142747_des-102', N'9.0.2');

CREATE TABLE [GeneralConfigs] (
    [Id] int NOT NULL IDENTITY,
    [Email] nvarchar(200) NOT NULL,
    [SMTP] nvarchar(50) NOT NULL,
    [SMTPPort] nvarchar(10) NOT NULL,
    [EmailPassword] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_GeneralConfigs] PRIMARY KEY ([Id])
);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20221227162017_des-103', N'9.0.2');

ALTER TABLE [EmployeeExtraHours] ADD [CalcPayrollDate] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20230124010030_des-104', N'9.0.2');

ALTER TABLE [PayrollProcessDetails] ADD [TotalTssAmount] decimal(18,2) NOT NULL DEFAULT 0.0;

ALTER TABLE [PayCycles] ADD [IsForTss] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [DeductionCodeVersions] ADD [IsForTssCalc] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [DeductionCodes] ADD [IsForTssCalc] bit NOT NULL DEFAULT CAST(0 AS bit);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20230214190536_des-105', N'9.0.2');

ALTER TABLE [PayrollsProcess] ADD [IsPayCycleTss] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [PayrollsProcess] ADD [UsedForTss] bit NOT NULL DEFAULT CAST(0 AS bit);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20230214202340_des-106', N'9.0.2');

ALTER TABLE [PayrollProcessDetails] ADD [TotalTssAndTaxAmount] decimal(18,2) NOT NULL DEFAULT 0.0;

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20230215192547_des-107', N'9.0.2');

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

CREATE INDEX [IX_EmployeeWorkControlCalendars_EmployeeId] ON [EmployeeWorkControlCalendars] ([EmployeeId]);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20230414225901_des-108', N'9.0.2');

ALTER TABLE [Payrolls] ADD [IsForHourPayroll] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [EmployeeEarningCodes] ADD [IndexEarningHour] decimal(18,2) NOT NULL DEFAULT 0.0;

ALTER TABLE [EmployeeEarningCodes] ADD [IsUseCalcHour] bit NOT NULL DEFAULT CAST(0 AS bit);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20230414231603_des-109', N'9.0.2');

EXEC sp_rename N'[EmployeeWorkControlCalendars].[StatusExtraHour]', N'StatusWorkControl', 'COLUMN';

ALTER TABLE [PayrollsProcess] ADD [IsForHourPayroll] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [EmployeeWorkControlCalendars] ADD [PayrollProcessId] nvarchar(max) NULL;

ALTER TABLE [EmployeeEarningCodes] ADD [PayrollProcessId] nvarchar(max) NULL;

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20230420205652_des-110', N'9.0.2');

ALTER TABLE [Payrolls] ADD [BankSecuence] int NOT NULL DEFAULT 0;

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20230421223835_des-111', N'9.0.2');


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
            

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20251125000000_AddRecIdSequence', N'9.0.2');

ALTER TABLE [EmployeeTaxes] DROP CONSTRAINT [FK_EmployeeTaxes_Taxes_TaxId_InCompany];

ALTER TABLE [TaxDetails] DROP CONSTRAINT [FK_TaxDetails_Taxes_TaxId_InCompany];

ALTER TABLE [Taxes] DROP CONSTRAINT [PK_Taxes];

ALTER TABLE [TaxDetails] DROP CONSTRAINT [PK_TaxDetails];

DROP INDEX [IX_TaxDetails_TaxId_InCompany] ON [TaxDetails];

DROP INDEX [IX_EmployeeTaxes_TaxId_InCompany] ON [EmployeeTaxes];

DECLARE @var74 sysname;
SELECT @var74 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Taxes]') AND [c].[name] = N'InCompany');
IF @var74 IS NOT NULL EXEC(N'ALTER TABLE [Taxes] DROP CONSTRAINT [' + @var74 + '];');
ALTER TABLE [Taxes] DROP COLUMN [InCompany];

DECLARE @var75 sysname;
SELECT @var75 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[TaxDetails]') AND [c].[name] = N'InCompany');
IF @var75 IS NOT NULL EXEC(N'ALTER TABLE [TaxDetails] DROP CONSTRAINT [' + @var75 + '];');
ALTER TABLE [TaxDetails] DROP COLUMN [InCompany];

DECLARE @var76 sysname;
SELECT @var76 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[ReportsConfig]') AND [c].[name] = N'InCompany');
IF @var76 IS NOT NULL EXEC(N'ALTER TABLE [ReportsConfig] DROP CONSTRAINT [' + @var76 + '];');
ALTER TABLE [ReportsConfig] DROP COLUMN [InCompany];

DECLARE @var77 sysname;
SELECT @var77 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Projects]') AND [c].[name] = N'InCompany');
IF @var77 IS NOT NULL EXEC(N'ALTER TABLE [Projects] DROP CONSTRAINT [' + @var77 + '];');
ALTER TABLE [Projects] DROP COLUMN [InCompany];

DECLARE @var78 sysname;
SELECT @var78 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[ProjCategories]') AND [c].[name] = N'InCompany');
IF @var78 IS NOT NULL EXEC(N'ALTER TABLE [ProjCategories] DROP CONSTRAINT [' + @var78 + '];');
ALTER TABLE [ProjCategories] DROP COLUMN [InCompany];

DECLARE @var79 sysname;
SELECT @var79 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Positions]') AND [c].[name] = N'InCompany');
IF @var79 IS NOT NULL EXEC(N'ALTER TABLE [Positions] DROP CONSTRAINT [' + @var79 + '];');
ALTER TABLE [Positions] DROP COLUMN [InCompany];

DECLARE @var80 sysname;
SELECT @var80 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[PositionRequirements]') AND [c].[name] = N'InCompany');
IF @var80 IS NOT NULL EXEC(N'ALTER TABLE [PositionRequirements] DROP CONSTRAINT [' + @var80 + '];');
ALTER TABLE [PositionRequirements] DROP COLUMN [InCompany];

DECLARE @var81 sysname;
SELECT @var81 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[PayrollsProcess]') AND [c].[name] = N'InCompany');
IF @var81 IS NOT NULL EXEC(N'ALTER TABLE [PayrollsProcess] DROP CONSTRAINT [' + @var81 + '];');
ALTER TABLE [PayrollsProcess] DROP COLUMN [InCompany];

DECLARE @var82 sysname;
SELECT @var82 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Payrolls]') AND [c].[name] = N'InCompany');
IF @var82 IS NOT NULL EXEC(N'ALTER TABLE [Payrolls] DROP CONSTRAINT [' + @var82 + '];');
ALTER TABLE [Payrolls] DROP COLUMN [InCompany];

DECLARE @var83 sysname;
SELECT @var83 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[PayrollProcessDetails]') AND [c].[name] = N'InCompany');
IF @var83 IS NOT NULL EXEC(N'ALTER TABLE [PayrollProcessDetails] DROP CONSTRAINT [' + @var83 + '];');
ALTER TABLE [PayrollProcessDetails] DROP COLUMN [InCompany];

DECLARE @var84 sysname;
SELECT @var84 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[PayrollProcessActions]') AND [c].[name] = N'InCompany');
IF @var84 IS NOT NULL EXEC(N'ALTER TABLE [PayrollProcessActions] DROP CONSTRAINT [' + @var84 + '];');
ALTER TABLE [PayrollProcessActions] DROP COLUMN [InCompany];

DECLARE @var85 sysname;
SELECT @var85 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[PayCycles]') AND [c].[name] = N'InCompany');
IF @var85 IS NOT NULL EXEC(N'ALTER TABLE [PayCycles] DROP CONSTRAINT [' + @var85 + '];');
ALTER TABLE [PayCycles] DROP COLUMN [InCompany];

DECLARE @var86 sysname;
SELECT @var86 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Loans]') AND [c].[name] = N'InCompany');
IF @var86 IS NOT NULL EXEC(N'ALTER TABLE [Loans] DROP CONSTRAINT [' + @var86 + '];');
ALTER TABLE [Loans] DROP COLUMN [InCompany];

DECLARE @var87 sysname;
SELECT @var87 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Jobs]') AND [c].[name] = N'InCompany');
IF @var87 IS NOT NULL EXEC(N'ALTER TABLE [Jobs] DROP CONSTRAINT [' + @var87 + '];');
ALTER TABLE [Jobs] DROP COLUMN [InCompany];

DECLARE @var88 sysname;
SELECT @var88 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Instructors]') AND [c].[name] = N'InCompany');
IF @var88 IS NOT NULL EXEC(N'ALTER TABLE [Instructors] DROP CONSTRAINT [' + @var88 + '];');
ALTER TABLE [Instructors] DROP COLUMN [InCompany];

DECLARE @var89 sysname;
SELECT @var89 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeWorkControlCalendars]') AND [c].[name] = N'InCompany');
IF @var89 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeWorkControlCalendars] DROP CONSTRAINT [' + @var89 + '];');
ALTER TABLE [EmployeeWorkControlCalendars] DROP COLUMN [InCompany];

DECLARE @var90 sysname;
SELECT @var90 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeWorkCalendars]') AND [c].[name] = N'InCompany');
IF @var90 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeWorkCalendars] DROP CONSTRAINT [' + @var90 + '];');
ALTER TABLE [EmployeeWorkCalendars] DROP COLUMN [InCompany];

DECLARE @var91 sysname;
SELECT @var91 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeTaxes]') AND [c].[name] = N'InCompany');
IF @var91 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeTaxes] DROP CONSTRAINT [' + @var91 + '];');
ALTER TABLE [EmployeeTaxes] DROP COLUMN [InCompany];

DECLARE @var92 sysname;
SELECT @var92 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeesAddress]') AND [c].[name] = N'InCompany');
IF @var92 IS NOT NULL EXEC(N'ALTER TABLE [EmployeesAddress] DROP CONSTRAINT [' + @var92 + '];');
ALTER TABLE [EmployeesAddress] DROP COLUMN [InCompany];

DECLARE @var93 sysname;
SELECT @var93 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Employees]') AND [c].[name] = N'InCompany');
IF @var93 IS NOT NULL EXEC(N'ALTER TABLE [Employees] DROP CONSTRAINT [' + @var93 + '];');
ALTER TABLE [Employees] DROP COLUMN [InCompany];

DECLARE @var94 sysname;
SELECT @var94 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeePositions]') AND [c].[name] = N'InCompany');
IF @var94 IS NOT NULL EXEC(N'ALTER TABLE [EmployeePositions] DROP CONSTRAINT [' + @var94 + '];');
ALTER TABLE [EmployeePositions] DROP COLUMN [InCompany];

DECLARE @var95 sysname;
SELECT @var95 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeLoans]') AND [c].[name] = N'InCompany');
IF @var95 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeLoans] DROP CONSTRAINT [' + @var95 + '];');
ALTER TABLE [EmployeeLoans] DROP COLUMN [InCompany];

DECLARE @var96 sysname;
SELECT @var96 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeLoanHistories]') AND [c].[name] = N'InCompany');
IF @var96 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeLoanHistories] DROP CONSTRAINT [' + @var96 + '];');
ALTER TABLE [EmployeeLoanHistories] DROP COLUMN [InCompany];

DECLARE @var97 sysname;
SELECT @var97 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeImages]') AND [c].[name] = N'InCompany');
IF @var97 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeImages] DROP CONSTRAINT [' + @var97 + '];');
ALTER TABLE [EmployeeImages] DROP COLUMN [InCompany];

DECLARE @var98 sysname;
SELECT @var98 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeExtraHours]') AND [c].[name] = N'InCompany');
IF @var98 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeExtraHours] DROP CONSTRAINT [' + @var98 + '];');
ALTER TABLE [EmployeeExtraHours] DROP COLUMN [InCompany];

DECLARE @var99 sysname;
SELECT @var99 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeEarningCodes]') AND [c].[name] = N'InCompany');
IF @var99 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeEarningCodes] DROP CONSTRAINT [' + @var99 + '];');
ALTER TABLE [EmployeeEarningCodes] DROP COLUMN [InCompany];

DECLARE @var100 sysname;
SELECT @var100 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeDocuments]') AND [c].[name] = N'InCompany');
IF @var100 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeDocuments] DROP CONSTRAINT [' + @var100 + '];');
ALTER TABLE [EmployeeDocuments] DROP COLUMN [InCompany];

DECLARE @var101 sysname;
SELECT @var101 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeDepartments]') AND [c].[name] = N'InCompany');
IF @var101 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeDepartments] DROP CONSTRAINT [' + @var101 + '];');
ALTER TABLE [EmployeeDepartments] DROP COLUMN [InCompany];

DECLARE @var102 sysname;
SELECT @var102 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeDeductionCodes]') AND [c].[name] = N'InCompany');
IF @var102 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeDeductionCodes] DROP CONSTRAINT [' + @var102 + '];');
ALTER TABLE [EmployeeDeductionCodes] DROP COLUMN [InCompany];

DECLARE @var103 sysname;
SELECT @var103 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeContactsInf]') AND [c].[name] = N'InCompany');
IF @var103 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeContactsInf] DROP CONSTRAINT [' + @var103 + '];');
ALTER TABLE [EmployeeContactsInf] DROP COLUMN [InCompany];

DECLARE @var104 sysname;
SELECT @var104 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeBankAccounts]') AND [c].[name] = N'InCompany');
IF @var104 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeBankAccounts] DROP CONSTRAINT [' + @var104 + '];');
ALTER TABLE [EmployeeBankAccounts] DROP COLUMN [InCompany];

DECLARE @var105 sysname;
SELECT @var105 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EarningCodeVersions]') AND [c].[name] = N'InCompany');
IF @var105 IS NOT NULL EXEC(N'ALTER TABLE [EarningCodeVersions] DROP CONSTRAINT [' + @var105 + '];');
ALTER TABLE [EarningCodeVersions] DROP COLUMN [InCompany];

DECLARE @var106 sysname;
SELECT @var106 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EarningCodes]') AND [c].[name] = N'InCompany');
IF @var106 IS NOT NULL EXEC(N'ALTER TABLE [EarningCodes] DROP CONSTRAINT [' + @var106 + '];');
ALTER TABLE [EarningCodes] DROP COLUMN [InCompany];

DECLARE @var107 sysname;
SELECT @var107 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Departments]') AND [c].[name] = N'InCompany');
IF @var107 IS NOT NULL EXEC(N'ALTER TABLE [Departments] DROP CONSTRAINT [' + @var107 + '];');
ALTER TABLE [Departments] DROP COLUMN [InCompany];

DECLARE @var108 sysname;
SELECT @var108 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[DeductionCodeVersions]') AND [c].[name] = N'InCompany');
IF @var108 IS NOT NULL EXEC(N'ALTER TABLE [DeductionCodeVersions] DROP CONSTRAINT [' + @var108 + '];');
ALTER TABLE [DeductionCodeVersions] DROP COLUMN [InCompany];

DECLARE @var109 sysname;
SELECT @var109 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[DeductionCodes]') AND [c].[name] = N'InCompany');
IF @var109 IS NOT NULL EXEC(N'ALTER TABLE [DeductionCodes] DROP CONSTRAINT [' + @var109 + '];');
ALTER TABLE [DeductionCodes] DROP COLUMN [InCompany];

DECLARE @var110 sysname;
SELECT @var110 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[CourseTypes]') AND [c].[name] = N'InCompany');
IF @var110 IS NOT NULL EXEC(N'ALTER TABLE [CourseTypes] DROP CONSTRAINT [' + @var110 + '];');
ALTER TABLE [CourseTypes] DROP COLUMN [InCompany];

DECLARE @var111 sysname;
SELECT @var111 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Courses]') AND [c].[name] = N'InCompany');
IF @var111 IS NOT NULL EXEC(N'ALTER TABLE [Courses] DROP CONSTRAINT [' + @var111 + '];');
ALTER TABLE [Courses] DROP COLUMN [InCompany];

DECLARE @var112 sysname;
SELECT @var112 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[CoursePositions]') AND [c].[name] = N'InCompany');
IF @var112 IS NOT NULL EXEC(N'ALTER TABLE [CoursePositions] DROP CONSTRAINT [' + @var112 + '];');
ALTER TABLE [CoursePositions] DROP COLUMN [InCompany];

DECLARE @var113 sysname;
SELECT @var113 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[CourseLocations]') AND [c].[name] = N'InCompany');
IF @var113 IS NOT NULL EXEC(N'ALTER TABLE [CourseLocations] DROP CONSTRAINT [' + @var113 + '];');
ALTER TABLE [CourseLocations] DROP COLUMN [InCompany];

DECLARE @var114 sysname;
SELECT @var114 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[CourseInstructors]') AND [c].[name] = N'InCompany');
IF @var114 IS NOT NULL EXEC(N'ALTER TABLE [CourseInstructors] DROP CONSTRAINT [' + @var114 + '];');
ALTER TABLE [CourseInstructors] DROP COLUMN [InCompany];

DECLARE @var115 sysname;
SELECT @var115 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[CourseEmployees]') AND [c].[name] = N'InCompany');
IF @var115 IS NOT NULL EXEC(N'ALTER TABLE [CourseEmployees] DROP CONSTRAINT [' + @var115 + '];');
ALTER TABLE [CourseEmployees] DROP COLUMN [InCompany];

DECLARE @var116 sysname;
SELECT @var116 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[ClassRooms]') AND [c].[name] = N'InCompany');
IF @var116 IS NOT NULL EXEC(N'ALTER TABLE [ClassRooms] DROP CONSTRAINT [' + @var116 + '];');
ALTER TABLE [ClassRooms] DROP COLUMN [InCompany];

DECLARE @var117 sysname;
SELECT @var117 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[BatchHistories]') AND [c].[name] = N'InCompany');
IF @var117 IS NOT NULL EXEC(N'ALTER TABLE [BatchHistories] DROP CONSTRAINT [' + @var117 + '];');
ALTER TABLE [BatchHistories] DROP COLUMN [InCompany];

EXEC sp_rename N'[Users].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';

EXEC sp_rename N'[Users].[CreatedDateTime]', N'CreatedOn', 'COLUMN';

EXEC sp_rename N'[UserImages].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';

EXEC sp_rename N'[UserImages].[CreatedDateTime]', N'CreatedOn', 'COLUMN';

EXEC sp_rename N'[Taxes].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';

EXEC sp_rename N'[Taxes].[CreatedDateTime]', N'CreatedOn', 'COLUMN';

EXEC sp_rename N'[TaxDetails].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';

EXEC sp_rename N'[TaxDetails].[CreatedDateTime]', N'CreatedOn', 'COLUMN';

EXEC sp_rename N'[ReportsConfig].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';

EXEC sp_rename N'[ReportsConfig].[CreatedDateTime]', N'CreatedOn', 'COLUMN';

EXEC sp_rename N'[Projects].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';

EXEC sp_rename N'[Projects].[CreatedDateTime]', N'CreatedOn', 'COLUMN';

EXEC sp_rename N'[ProjCategories].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';

EXEC sp_rename N'[ProjCategories].[CreatedDateTime]', N'CreatedOn', 'COLUMN';

EXEC sp_rename N'[Positions].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';

EXEC sp_rename N'[Positions].[CreatedDateTime]', N'CreatedOn', 'COLUMN';

EXEC sp_rename N'[PositionRequirements].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';

EXEC sp_rename N'[PositionRequirements].[CreatedDateTime]', N'CreatedOn', 'COLUMN';

EXEC sp_rename N'[PayrollsProcess].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';

EXEC sp_rename N'[PayrollsProcess].[CreatedDateTime]', N'CreatedOn', 'COLUMN';

EXEC sp_rename N'[Payrolls].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';

EXEC sp_rename N'[Payrolls].[CreatedDateTime]', N'CreatedOn', 'COLUMN';

EXEC sp_rename N'[PayrollProcessDetails].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';

EXEC sp_rename N'[PayrollProcessDetails].[CreatedDateTime]', N'CreatedOn', 'COLUMN';

EXEC sp_rename N'[PayrollProcessActions].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';

EXEC sp_rename N'[PayrollProcessActions].[CreatedDateTime]', N'CreatedOn', 'COLUMN';

EXEC sp_rename N'[PayCycles].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';

EXEC sp_rename N'[PayCycles].[CreatedDateTime]', N'CreatedOn', 'COLUMN';

EXEC sp_rename N'[MenuAssignedToUsers].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';

EXEC sp_rename N'[MenuAssignedToUsers].[CreatedDateTime]', N'CreatedOn', 'COLUMN';

EXEC sp_rename N'[Loans].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';

EXEC sp_rename N'[Loans].[CreatedDateTime]', N'CreatedOn', 'COLUMN';

EXEC sp_rename N'[Jobs].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';

EXEC sp_rename N'[Jobs].[CreatedDateTime]', N'CreatedOn', 'COLUMN';

EXEC sp_rename N'[Instructors].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';

EXEC sp_rename N'[Instructors].[CreatedDateTime]', N'CreatedOn', 'COLUMN';

EXEC sp_rename N'[EmployeeWorkControlCalendars].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';

EXEC sp_rename N'[EmployeeWorkControlCalendars].[CreatedDateTime]', N'CreatedOn', 'COLUMN';

EXEC sp_rename N'[EmployeeWorkCalendars].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';

EXEC sp_rename N'[EmployeeWorkCalendars].[CreatedDateTime]', N'CreatedOn', 'COLUMN';

EXEC sp_rename N'[EmployeeTaxes].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';

EXEC sp_rename N'[EmployeeTaxes].[CreatedDateTime]', N'CreatedOn', 'COLUMN';

EXEC sp_rename N'[EmployeesAddress].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';

EXEC sp_rename N'[EmployeesAddress].[CreatedDateTime]', N'CreatedOn', 'COLUMN';

EXEC sp_rename N'[Employees].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';

EXEC sp_rename N'[Employees].[CreatedDateTime]', N'CreatedOn', 'COLUMN';

EXEC sp_rename N'[EmployeePositions].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';

EXEC sp_rename N'[EmployeePositions].[CreatedDateTime]', N'CreatedOn', 'COLUMN';

EXEC sp_rename N'[EmployeeLoans].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';

EXEC sp_rename N'[EmployeeLoans].[CreatedDateTime]', N'CreatedOn', 'COLUMN';

EXEC sp_rename N'[EmployeeLoanHistories].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';

EXEC sp_rename N'[EmployeeLoanHistories].[CreatedDateTime]', N'CreatedOn', 'COLUMN';

EXEC sp_rename N'[EmployeeImages].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';

EXEC sp_rename N'[EmployeeImages].[CreatedDateTime]', N'CreatedOn', 'COLUMN';

EXEC sp_rename N'[EmployeeExtraHours].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';

EXEC sp_rename N'[EmployeeExtraHours].[CreatedDateTime]', N'CreatedOn', 'COLUMN';

EXEC sp_rename N'[EmployeeEarningCodes].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';

EXEC sp_rename N'[EmployeeEarningCodes].[CreatedDateTime]', N'CreatedOn', 'COLUMN';

EXEC sp_rename N'[EmployeeDocuments].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';

EXEC sp_rename N'[EmployeeDocuments].[CreatedDateTime]', N'CreatedOn', 'COLUMN';

EXEC sp_rename N'[EmployeeDepartments].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';

EXEC sp_rename N'[EmployeeDepartments].[CreatedDateTime]', N'CreatedOn', 'COLUMN';

EXEC sp_rename N'[EmployeeDeductionCodes].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';

EXEC sp_rename N'[EmployeeDeductionCodes].[CreatedDateTime]', N'CreatedOn', 'COLUMN';

EXEC sp_rename N'[EmployeeContactsInf].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';

EXEC sp_rename N'[EmployeeContactsInf].[CreatedDateTime]', N'CreatedOn', 'COLUMN';

EXEC sp_rename N'[EmployeeBankAccounts].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';

EXEC sp_rename N'[EmployeeBankAccounts].[CreatedDateTime]', N'CreatedOn', 'COLUMN';

EXEC sp_rename N'[EarningCodeVersions].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';

EXEC sp_rename N'[EarningCodeVersions].[CreatedDateTime]', N'CreatedOn', 'COLUMN';

EXEC sp_rename N'[EarningCodes].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';

EXEC sp_rename N'[EarningCodes].[CreatedDateTime]', N'CreatedOn', 'COLUMN';

EXEC sp_rename N'[Departments].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';

EXEC sp_rename N'[Departments].[CreatedDateTime]', N'CreatedOn', 'COLUMN';

EXEC sp_rename N'[DeductionCodeVersions].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';

EXEC sp_rename N'[DeductionCodeVersions].[CreatedDateTime]', N'CreatedOn', 'COLUMN';

EXEC sp_rename N'[DeductionCodes].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';

EXEC sp_rename N'[DeductionCodes].[CreatedDateTime]', N'CreatedOn', 'COLUMN';

EXEC sp_rename N'[CourseTypes].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';

EXEC sp_rename N'[CourseTypes].[CreatedDateTime]', N'CreatedOn', 'COLUMN';

EXEC sp_rename N'[Courses].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';

EXEC sp_rename N'[Courses].[CreatedDateTime]', N'CreatedOn', 'COLUMN';

EXEC sp_rename N'[CoursePositions].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';

EXEC sp_rename N'[CoursePositions].[CreatedDateTime]', N'CreatedOn', 'COLUMN';

EXEC sp_rename N'[CourseLocations].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';

EXEC sp_rename N'[CourseLocations].[CreatedDateTime]', N'CreatedOn', 'COLUMN';

EXEC sp_rename N'[CourseInstructors].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';

EXEC sp_rename N'[CourseInstructors].[CreatedDateTime]', N'CreatedOn', 'COLUMN';

EXEC sp_rename N'[CourseEmployees].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';

EXEC sp_rename N'[CourseEmployees].[CreatedDateTime]', N'CreatedOn', 'COLUMN';

EXEC sp_rename N'[CompaniesAssignedToUsers].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';

EXEC sp_rename N'[CompaniesAssignedToUsers].[CreatedDateTime]', N'CreatedOn', 'COLUMN';

EXEC sp_rename N'[ClassRooms].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';

EXEC sp_rename N'[ClassRooms].[CreatedDateTime]', N'CreatedOn', 'COLUMN';

EXEC sp_rename N'[BatchHistories].[ModifiedDateTime]', N'ModifiedOn', 'COLUMN';

EXEC sp_rename N'[BatchHistories].[CreatedDateTime]', N'CreatedOn', 'COLUMN';

DECLARE @var118 sysname;
SELECT @var118 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Users]') AND [c].[name] = N'ModifiedBy');
IF @var118 IS NOT NULL EXEC(N'ALTER TABLE [Users] DROP CONSTRAINT [' + @var118 + '];');
ALTER TABLE [Users] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;

DECLARE @var119 sysname;
SELECT @var119 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Users]') AND [c].[name] = N'CreatedBy');
IF @var119 IS NOT NULL EXEC(N'ALTER TABLE [Users] DROP CONSTRAINT [' + @var119 + '];');
ALTER TABLE [Users] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [Users] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [Users] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [Users] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [Users] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

DECLARE @var120 sysname;
SELECT @var120 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[UserImages]') AND [c].[name] = N'ModifiedBy');
IF @var120 IS NOT NULL EXEC(N'ALTER TABLE [UserImages] DROP CONSTRAINT [' + @var120 + '];');
ALTER TABLE [UserImages] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;

DECLARE @var121 sysname;
SELECT @var121 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[UserImages]') AND [c].[name] = N'CreatedBy');
IF @var121 IS NOT NULL EXEC(N'ALTER TABLE [UserImages] DROP CONSTRAINT [' + @var121 + '];');
ALTER TABLE [UserImages] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [UserImages] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [UserImages] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [UserImages] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [UserImages] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

DECLARE @var122 sysname;
SELECT @var122 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Taxes]') AND [c].[name] = N'ModifiedBy');
IF @var122 IS NOT NULL EXEC(N'ALTER TABLE [Taxes] DROP CONSTRAINT [' + @var122 + '];');
ALTER TABLE [Taxes] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;

DECLARE @var123 sysname;
SELECT @var123 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Taxes]') AND [c].[name] = N'CreatedBy');
IF @var123 IS NOT NULL EXEC(N'ALTER TABLE [Taxes] DROP CONSTRAINT [' + @var123 + '];');
ALTER TABLE [Taxes] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [Taxes] ADD [DataAreaId] nvarchar(10) NOT NULL DEFAULT N'';

ALTER TABLE [Taxes] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [Taxes] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [Taxes] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [Taxes] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

DECLARE @var124 sysname;
SELECT @var124 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[TaxDetails]') AND [c].[name] = N'ModifiedBy');
IF @var124 IS NOT NULL EXEC(N'ALTER TABLE [TaxDetails] DROP CONSTRAINT [' + @var124 + '];');
ALTER TABLE [TaxDetails] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;

DECLARE @var125 sysname;
SELECT @var125 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[TaxDetails]') AND [c].[name] = N'CreatedBy');
IF @var125 IS NOT NULL EXEC(N'ALTER TABLE [TaxDetails] DROP CONSTRAINT [' + @var125 + '];');
ALTER TABLE [TaxDetails] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [TaxDetails] ADD [DataAreaId] nvarchar(10) NOT NULL DEFAULT N'';

ALTER TABLE [TaxDetails] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [TaxDetails] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [TaxDetails] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [TaxDetails] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

DECLARE @var126 sysname;
SELECT @var126 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[ReportsConfig]') AND [c].[name] = N'ModifiedBy');
IF @var126 IS NOT NULL EXEC(N'ALTER TABLE [ReportsConfig] DROP CONSTRAINT [' + @var126 + '];');
ALTER TABLE [ReportsConfig] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;

DECLARE @var127 sysname;
SELECT @var127 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[ReportsConfig]') AND [c].[name] = N'CreatedBy');
IF @var127 IS NOT NULL EXEC(N'ALTER TABLE [ReportsConfig] DROP CONSTRAINT [' + @var127 + '];');
ALTER TABLE [ReportsConfig] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [ReportsConfig] ADD [DataAreaId] nvarchar(10) NULL;

ALTER TABLE [ReportsConfig] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [ReportsConfig] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [ReportsConfig] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [ReportsConfig] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

ALTER TABLE [Provinces] ADD [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [Provinces] ADD [CreatedOn] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [Provinces] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [Provinces] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [Provinces] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [Provinces] ADD [ModifiedBy] nvarchar(20) NULL;

ALTER TABLE [Provinces] ADD [ModifiedOn] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [Provinces] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

DECLARE @var128 sysname;
SELECT @var128 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Projects]') AND [c].[name] = N'ModifiedBy');
IF @var128 IS NOT NULL EXEC(N'ALTER TABLE [Projects] DROP CONSTRAINT [' + @var128 + '];');
ALTER TABLE [Projects] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;

DECLARE @var129 sysname;
SELECT @var129 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Projects]') AND [c].[name] = N'CreatedBy');
IF @var129 IS NOT NULL EXEC(N'ALTER TABLE [Projects] DROP CONSTRAINT [' + @var129 + '];');
ALTER TABLE [Projects] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [Projects] ADD [DataAreaId] nvarchar(10) NULL;

ALTER TABLE [Projects] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [Projects] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [Projects] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [Projects] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

DECLARE @var130 sysname;
SELECT @var130 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[ProjCategories]') AND [c].[name] = N'ModifiedBy');
IF @var130 IS NOT NULL EXEC(N'ALTER TABLE [ProjCategories] DROP CONSTRAINT [' + @var130 + '];');
ALTER TABLE [ProjCategories] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;

DECLARE @var131 sysname;
SELECT @var131 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[ProjCategories]') AND [c].[name] = N'CreatedBy');
IF @var131 IS NOT NULL EXEC(N'ALTER TABLE [ProjCategories] DROP CONSTRAINT [' + @var131 + '];');
ALTER TABLE [ProjCategories] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [ProjCategories] ADD [DataAreaId] nvarchar(10) NULL;

ALTER TABLE [ProjCategories] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [ProjCategories] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [ProjCategories] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [ProjCategories] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

DECLARE @var132 sysname;
SELECT @var132 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Positions]') AND [c].[name] = N'ModifiedBy');
IF @var132 IS NOT NULL EXEC(N'ALTER TABLE [Positions] DROP CONSTRAINT [' + @var132 + '];');
ALTER TABLE [Positions] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;

DECLARE @var133 sysname;
SELECT @var133 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Positions]') AND [c].[name] = N'CreatedBy');
IF @var133 IS NOT NULL EXEC(N'ALTER TABLE [Positions] DROP CONSTRAINT [' + @var133 + '];');
ALTER TABLE [Positions] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [Positions] ADD [DataAreaId] nvarchar(10) NULL;

ALTER TABLE [Positions] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [Positions] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [Positions] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [Positions] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

DECLARE @var134 sysname;
SELECT @var134 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[PositionRequirements]') AND [c].[name] = N'ModifiedBy');
IF @var134 IS NOT NULL EXEC(N'ALTER TABLE [PositionRequirements] DROP CONSTRAINT [' + @var134 + '];');
ALTER TABLE [PositionRequirements] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;

DECLARE @var135 sysname;
SELECT @var135 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[PositionRequirements]') AND [c].[name] = N'CreatedBy');
IF @var135 IS NOT NULL EXEC(N'ALTER TABLE [PositionRequirements] DROP CONSTRAINT [' + @var135 + '];');
ALTER TABLE [PositionRequirements] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [PositionRequirements] ADD [DataAreaId] nvarchar(10) NULL;

ALTER TABLE [PositionRequirements] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [PositionRequirements] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [PositionRequirements] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [PositionRequirements] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

DECLARE @var136 sysname;
SELECT @var136 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[PayrollsProcess]') AND [c].[name] = N'ModifiedBy');
IF @var136 IS NOT NULL EXEC(N'ALTER TABLE [PayrollsProcess] DROP CONSTRAINT [' + @var136 + '];');
ALTER TABLE [PayrollsProcess] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;

DECLARE @var137 sysname;
SELECT @var137 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[PayrollsProcess]') AND [c].[name] = N'CreatedBy');
IF @var137 IS NOT NULL EXEC(N'ALTER TABLE [PayrollsProcess] DROP CONSTRAINT [' + @var137 + '];');
ALTER TABLE [PayrollsProcess] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [PayrollsProcess] ADD [DataAreaId] nvarchar(10) NULL;

ALTER TABLE [PayrollsProcess] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [PayrollsProcess] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [PayrollsProcess] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [PayrollsProcess] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

DECLARE @var138 sysname;
SELECT @var138 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Payrolls]') AND [c].[name] = N'ModifiedBy');
IF @var138 IS NOT NULL EXEC(N'ALTER TABLE [Payrolls] DROP CONSTRAINT [' + @var138 + '];');
ALTER TABLE [Payrolls] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;

DECLARE @var139 sysname;
SELECT @var139 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Payrolls]') AND [c].[name] = N'CreatedBy');
IF @var139 IS NOT NULL EXEC(N'ALTER TABLE [Payrolls] DROP CONSTRAINT [' + @var139 + '];');
ALTER TABLE [Payrolls] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [Payrolls] ADD [DataAreaId] nvarchar(10) NULL;

ALTER TABLE [Payrolls] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [Payrolls] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [Payrolls] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [Payrolls] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

DECLARE @var140 sysname;
SELECT @var140 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[PayrollProcessDetails]') AND [c].[name] = N'ModifiedBy');
IF @var140 IS NOT NULL EXEC(N'ALTER TABLE [PayrollProcessDetails] DROP CONSTRAINT [' + @var140 + '];');
ALTER TABLE [PayrollProcessDetails] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;

DECLARE @var141 sysname;
SELECT @var141 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[PayrollProcessDetails]') AND [c].[name] = N'CreatedBy');
IF @var141 IS NOT NULL EXEC(N'ALTER TABLE [PayrollProcessDetails] DROP CONSTRAINT [' + @var141 + '];');
ALTER TABLE [PayrollProcessDetails] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [PayrollProcessDetails] ADD [DataAreaId] nvarchar(10) NULL;

ALTER TABLE [PayrollProcessDetails] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [PayrollProcessDetails] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [PayrollProcessDetails] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [PayrollProcessDetails] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

DECLARE @var142 sysname;
SELECT @var142 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[PayrollProcessActions]') AND [c].[name] = N'ModifiedBy');
IF @var142 IS NOT NULL EXEC(N'ALTER TABLE [PayrollProcessActions] DROP CONSTRAINT [' + @var142 + '];');
ALTER TABLE [PayrollProcessActions] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;

DECLARE @var143 sysname;
SELECT @var143 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[PayrollProcessActions]') AND [c].[name] = N'CreatedBy');
IF @var143 IS NOT NULL EXEC(N'ALTER TABLE [PayrollProcessActions] DROP CONSTRAINT [' + @var143 + '];');
ALTER TABLE [PayrollProcessActions] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [PayrollProcessActions] ADD [DataAreaId] nvarchar(10) NULL;

ALTER TABLE [PayrollProcessActions] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [PayrollProcessActions] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [PayrollProcessActions] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [PayrollProcessActions] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

DECLARE @var144 sysname;
SELECT @var144 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[PayCycles]') AND [c].[name] = N'ModifiedBy');
IF @var144 IS NOT NULL EXEC(N'ALTER TABLE [PayCycles] DROP CONSTRAINT [' + @var144 + '];');
ALTER TABLE [PayCycles] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;

DECLARE @var145 sysname;
SELECT @var145 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[PayCycles]') AND [c].[name] = N'CreatedBy');
IF @var145 IS NOT NULL EXEC(N'ALTER TABLE [PayCycles] DROP CONSTRAINT [' + @var145 + '];');
ALTER TABLE [PayCycles] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [PayCycles] ADD [DataAreaId] nvarchar(10) NULL;

ALTER TABLE [PayCycles] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [PayCycles] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [PayCycles] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [PayCycles] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

ALTER TABLE [Occupations] ADD [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [Occupations] ADD [CreatedOn] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [Occupations] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [Occupations] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [Occupations] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [Occupations] ADD [ModifiedBy] nvarchar(20) NULL;

ALTER TABLE [Occupations] ADD [ModifiedOn] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [Occupations] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

ALTER TABLE [MenusApp] ADD [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [MenusApp] ADD [CreatedOn] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [MenusApp] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [MenusApp] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [MenusApp] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [MenusApp] ADD [ModifiedBy] nvarchar(20) NULL;

ALTER TABLE [MenusApp] ADD [ModifiedOn] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [MenusApp] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

DECLARE @var146 sysname;
SELECT @var146 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[MenuAssignedToUsers]') AND [c].[name] = N'ModifiedBy');
IF @var146 IS NOT NULL EXEC(N'ALTER TABLE [MenuAssignedToUsers] DROP CONSTRAINT [' + @var146 + '];');
ALTER TABLE [MenuAssignedToUsers] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;

DECLARE @var147 sysname;
SELECT @var147 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[MenuAssignedToUsers]') AND [c].[name] = N'CreatedBy');
IF @var147 IS NOT NULL EXEC(N'ALTER TABLE [MenuAssignedToUsers] DROP CONSTRAINT [' + @var147 + '];');
ALTER TABLE [MenuAssignedToUsers] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [MenuAssignedToUsers] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [MenuAssignedToUsers] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [MenuAssignedToUsers] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [MenuAssignedToUsers] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

DECLARE @var148 sysname;
SELECT @var148 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Loans]') AND [c].[name] = N'ModifiedBy');
IF @var148 IS NOT NULL EXEC(N'ALTER TABLE [Loans] DROP CONSTRAINT [' + @var148 + '];');
ALTER TABLE [Loans] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;

DECLARE @var149 sysname;
SELECT @var149 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Loans]') AND [c].[name] = N'CreatedBy');
IF @var149 IS NOT NULL EXEC(N'ALTER TABLE [Loans] DROP CONSTRAINT [' + @var149 + '];');
ALTER TABLE [Loans] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [Loans] ADD [DataAreaId] nvarchar(10) NULL;

ALTER TABLE [Loans] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [Loans] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [Loans] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [Loans] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

DECLARE @var150 sysname;
SELECT @var150 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Jobs]') AND [c].[name] = N'ModifiedBy');
IF @var150 IS NOT NULL EXEC(N'ALTER TABLE [Jobs] DROP CONSTRAINT [' + @var150 + '];');
ALTER TABLE [Jobs] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;

DECLARE @var151 sysname;
SELECT @var151 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Jobs]') AND [c].[name] = N'CreatedBy');
IF @var151 IS NOT NULL EXEC(N'ALTER TABLE [Jobs] DROP CONSTRAINT [' + @var151 + '];');
ALTER TABLE [Jobs] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [Jobs] ADD [DataAreaId] nvarchar(10) NULL;

ALTER TABLE [Jobs] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [Jobs] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [Jobs] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [Jobs] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

DECLARE @var152 sysname;
SELECT @var152 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Instructors]') AND [c].[name] = N'ModifiedBy');
IF @var152 IS NOT NULL EXEC(N'ALTER TABLE [Instructors] DROP CONSTRAINT [' + @var152 + '];');
ALTER TABLE [Instructors] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;

DECLARE @var153 sysname;
SELECT @var153 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Instructors]') AND [c].[name] = N'CreatedBy');
IF @var153 IS NOT NULL EXEC(N'ALTER TABLE [Instructors] DROP CONSTRAINT [' + @var153 + '];');
ALTER TABLE [Instructors] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [Instructors] ADD [DataAreaId] nvarchar(10) NULL;

ALTER TABLE [Instructors] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [Instructors] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [Instructors] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [Instructors] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

ALTER TABLE [GeneralConfigs] ADD [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [GeneralConfigs] ADD [CreatedOn] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [GeneralConfigs] ADD [DataAreaId] nvarchar(10) NULL;

ALTER TABLE [GeneralConfigs] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [GeneralConfigs] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [GeneralConfigs] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [GeneralConfigs] ADD [ModifiedBy] nvarchar(20) NULL;

ALTER TABLE [GeneralConfigs] ADD [ModifiedOn] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [GeneralConfigs] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

ALTER TABLE [FormatCodes] ADD [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [FormatCodes] ADD [CreatedOn] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [FormatCodes] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [FormatCodes] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [FormatCodes] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [FormatCodes] ADD [ModifiedBy] nvarchar(20) NULL;

ALTER TABLE [FormatCodes] ADD [ModifiedOn] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [FormatCodes] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

DECLARE @var154 sysname;
SELECT @var154 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeWorkControlCalendars]') AND [c].[name] = N'ModifiedBy');
IF @var154 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeWorkControlCalendars] DROP CONSTRAINT [' + @var154 + '];');
ALTER TABLE [EmployeeWorkControlCalendars] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;

DECLARE @var155 sysname;
SELECT @var155 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeWorkControlCalendars]') AND [c].[name] = N'CreatedBy');
IF @var155 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeWorkControlCalendars] DROP CONSTRAINT [' + @var155 + '];');
ALTER TABLE [EmployeeWorkControlCalendars] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [EmployeeWorkControlCalendars] ADD [DataAreaId] nvarchar(10) NULL;

ALTER TABLE [EmployeeWorkControlCalendars] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [EmployeeWorkControlCalendars] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [EmployeeWorkControlCalendars] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [EmployeeWorkControlCalendars] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

DECLARE @var156 sysname;
SELECT @var156 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeWorkCalendars]') AND [c].[name] = N'ModifiedBy');
IF @var156 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeWorkCalendars] DROP CONSTRAINT [' + @var156 + '];');
ALTER TABLE [EmployeeWorkCalendars] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;

DECLARE @var157 sysname;
SELECT @var157 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeWorkCalendars]') AND [c].[name] = N'CreatedBy');
IF @var157 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeWorkCalendars] DROP CONSTRAINT [' + @var157 + '];');
ALTER TABLE [EmployeeWorkCalendars] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [EmployeeWorkCalendars] ADD [DataAreaId] nvarchar(10) NULL;

ALTER TABLE [EmployeeWorkCalendars] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [EmployeeWorkCalendars] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [EmployeeWorkCalendars] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [EmployeeWorkCalendars] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

DECLARE @var158 sysname;
SELECT @var158 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeTaxes]') AND [c].[name] = N'ModifiedBy');
IF @var158 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeTaxes] DROP CONSTRAINT [' + @var158 + '];');
ALTER TABLE [EmployeeTaxes] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;

DECLARE @var159 sysname;
SELECT @var159 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeTaxes]') AND [c].[name] = N'CreatedBy');
IF @var159 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeTaxes] DROP CONSTRAINT [' + @var159 + '];');
ALTER TABLE [EmployeeTaxes] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [EmployeeTaxes] ADD [DataAreaId] nvarchar(10) NOT NULL DEFAULT N'';

ALTER TABLE [EmployeeTaxes] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [EmployeeTaxes] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [EmployeeTaxes] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [EmployeeTaxes] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

DECLARE @var160 sysname;
SELECT @var160 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeesAddress]') AND [c].[name] = N'ModifiedBy');
IF @var160 IS NOT NULL EXEC(N'ALTER TABLE [EmployeesAddress] DROP CONSTRAINT [' + @var160 + '];');
ALTER TABLE [EmployeesAddress] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;

DECLARE @var161 sysname;
SELECT @var161 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeesAddress]') AND [c].[name] = N'CreatedBy');
IF @var161 IS NOT NULL EXEC(N'ALTER TABLE [EmployeesAddress] DROP CONSTRAINT [' + @var161 + '];');
ALTER TABLE [EmployeesAddress] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [EmployeesAddress] ADD [DataAreaId] nvarchar(10) NULL;

ALTER TABLE [EmployeesAddress] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [EmployeesAddress] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [EmployeesAddress] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [EmployeesAddress] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

DECLARE @var162 sysname;
SELECT @var162 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Employees]') AND [c].[name] = N'ModifiedBy');
IF @var162 IS NOT NULL EXEC(N'ALTER TABLE [Employees] DROP CONSTRAINT [' + @var162 + '];');
ALTER TABLE [Employees] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;

DECLARE @var163 sysname;
SELECT @var163 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Employees]') AND [c].[name] = N'CreatedBy');
IF @var163 IS NOT NULL EXEC(N'ALTER TABLE [Employees] DROP CONSTRAINT [' + @var163 + '];');
ALTER TABLE [Employees] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [Employees] ADD [DataAreaId] nvarchar(10) NULL;

ALTER TABLE [Employees] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [Employees] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [Employees] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [Employees] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

DECLARE @var164 sysname;
SELECT @var164 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeePositions]') AND [c].[name] = N'ModifiedBy');
IF @var164 IS NOT NULL EXEC(N'ALTER TABLE [EmployeePositions] DROP CONSTRAINT [' + @var164 + '];');
ALTER TABLE [EmployeePositions] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;

DECLARE @var165 sysname;
SELECT @var165 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeePositions]') AND [c].[name] = N'CreatedBy');
IF @var165 IS NOT NULL EXEC(N'ALTER TABLE [EmployeePositions] DROP CONSTRAINT [' + @var165 + '];');
ALTER TABLE [EmployeePositions] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [EmployeePositions] ADD [DataAreaId] nvarchar(10) NULL;

ALTER TABLE [EmployeePositions] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [EmployeePositions] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [EmployeePositions] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [EmployeePositions] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

DECLARE @var166 sysname;
SELECT @var166 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeLoans]') AND [c].[name] = N'ModifiedBy');
IF @var166 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeLoans] DROP CONSTRAINT [' + @var166 + '];');
ALTER TABLE [EmployeeLoans] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;

DECLARE @var167 sysname;
SELECT @var167 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeLoans]') AND [c].[name] = N'CreatedBy');
IF @var167 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeLoans] DROP CONSTRAINT [' + @var167 + '];');
ALTER TABLE [EmployeeLoans] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [EmployeeLoans] ADD [DataAreaId] nvarchar(10) NULL;

ALTER TABLE [EmployeeLoans] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [EmployeeLoans] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [EmployeeLoans] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [EmployeeLoans] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

DECLARE @var168 sysname;
SELECT @var168 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeLoanHistories]') AND [c].[name] = N'ModifiedBy');
IF @var168 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeLoanHistories] DROP CONSTRAINT [' + @var168 + '];');
ALTER TABLE [EmployeeLoanHistories] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;

DECLARE @var169 sysname;
SELECT @var169 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeLoanHistories]') AND [c].[name] = N'CreatedBy');
IF @var169 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeLoanHistories] DROP CONSTRAINT [' + @var169 + '];');
ALTER TABLE [EmployeeLoanHistories] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [EmployeeLoanHistories] ADD [DataAreaId] nvarchar(10) NULL;

ALTER TABLE [EmployeeLoanHistories] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [EmployeeLoanHistories] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [EmployeeLoanHistories] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [EmployeeLoanHistories] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

DECLARE @var170 sysname;
SELECT @var170 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeImages]') AND [c].[name] = N'ModifiedBy');
IF @var170 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeImages] DROP CONSTRAINT [' + @var170 + '];');
ALTER TABLE [EmployeeImages] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;

DECLARE @var171 sysname;
SELECT @var171 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeImages]') AND [c].[name] = N'CreatedBy');
IF @var171 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeImages] DROP CONSTRAINT [' + @var171 + '];');
ALTER TABLE [EmployeeImages] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [EmployeeImages] ADD [DataAreaId] nvarchar(10) NULL;

ALTER TABLE [EmployeeImages] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [EmployeeImages] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [EmployeeImages] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [EmployeeImages] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

ALTER TABLE [EmployeeHistories] ADD [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [EmployeeHistories] ADD [CreatedOn] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [EmployeeHistories] ADD [DataAreaId] nvarchar(10) NULL;

ALTER TABLE [EmployeeHistories] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [EmployeeHistories] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [EmployeeHistories] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [EmployeeHistories] ADD [ModifiedBy] nvarchar(20) NULL;

ALTER TABLE [EmployeeHistories] ADD [ModifiedOn] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [EmployeeHistories] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

DECLARE @var172 sysname;
SELECT @var172 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeExtraHours]') AND [c].[name] = N'ModifiedBy');
IF @var172 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeExtraHours] DROP CONSTRAINT [' + @var172 + '];');
ALTER TABLE [EmployeeExtraHours] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;

DECLARE @var173 sysname;
SELECT @var173 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeExtraHours]') AND [c].[name] = N'CreatedBy');
IF @var173 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeExtraHours] DROP CONSTRAINT [' + @var173 + '];');
ALTER TABLE [EmployeeExtraHours] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [EmployeeExtraHours] ADD [DataAreaId] nvarchar(10) NULL;

ALTER TABLE [EmployeeExtraHours] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [EmployeeExtraHours] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [EmployeeExtraHours] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [EmployeeExtraHours] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

DECLARE @var174 sysname;
SELECT @var174 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeEarningCodes]') AND [c].[name] = N'ModifiedBy');
IF @var174 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeEarningCodes] DROP CONSTRAINT [' + @var174 + '];');
ALTER TABLE [EmployeeEarningCodes] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;

DECLARE @var175 sysname;
SELECT @var175 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeEarningCodes]') AND [c].[name] = N'CreatedBy');
IF @var175 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeEarningCodes] DROP CONSTRAINT [' + @var175 + '];');
ALTER TABLE [EmployeeEarningCodes] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [EmployeeEarningCodes] ADD [DataAreaId] nvarchar(10) NULL;

ALTER TABLE [EmployeeEarningCodes] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [EmployeeEarningCodes] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [EmployeeEarningCodes] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [EmployeeEarningCodes] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

DECLARE @var176 sysname;
SELECT @var176 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeDocuments]') AND [c].[name] = N'ModifiedBy');
IF @var176 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeDocuments] DROP CONSTRAINT [' + @var176 + '];');
ALTER TABLE [EmployeeDocuments] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;

DECLARE @var177 sysname;
SELECT @var177 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeDocuments]') AND [c].[name] = N'CreatedBy');
IF @var177 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeDocuments] DROP CONSTRAINT [' + @var177 + '];');
ALTER TABLE [EmployeeDocuments] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [EmployeeDocuments] ADD [DataAreaId] nvarchar(10) NULL;

ALTER TABLE [EmployeeDocuments] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [EmployeeDocuments] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [EmployeeDocuments] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [EmployeeDocuments] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

DECLARE @var178 sysname;
SELECT @var178 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeDepartments]') AND [c].[name] = N'ModifiedBy');
IF @var178 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeDepartments] DROP CONSTRAINT [' + @var178 + '];');
ALTER TABLE [EmployeeDepartments] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;

DECLARE @var179 sysname;
SELECT @var179 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeDepartments]') AND [c].[name] = N'CreatedBy');
IF @var179 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeDepartments] DROP CONSTRAINT [' + @var179 + '];');
ALTER TABLE [EmployeeDepartments] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [EmployeeDepartments] ADD [DataAreaId] nvarchar(10) NULL;

ALTER TABLE [EmployeeDepartments] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [EmployeeDepartments] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [EmployeeDepartments] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [EmployeeDepartments] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

DECLARE @var180 sysname;
SELECT @var180 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeDeductionCodes]') AND [c].[name] = N'ModifiedBy');
IF @var180 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeDeductionCodes] DROP CONSTRAINT [' + @var180 + '];');
ALTER TABLE [EmployeeDeductionCodes] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;

DECLARE @var181 sysname;
SELECT @var181 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeDeductionCodes]') AND [c].[name] = N'CreatedBy');
IF @var181 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeDeductionCodes] DROP CONSTRAINT [' + @var181 + '];');
ALTER TABLE [EmployeeDeductionCodes] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [EmployeeDeductionCodes] ADD [DataAreaId] nvarchar(10) NULL;

ALTER TABLE [EmployeeDeductionCodes] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [EmployeeDeductionCodes] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [EmployeeDeductionCodes] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [EmployeeDeductionCodes] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

DECLARE @var182 sysname;
SELECT @var182 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeContactsInf]') AND [c].[name] = N'ModifiedBy');
IF @var182 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeContactsInf] DROP CONSTRAINT [' + @var182 + '];');
ALTER TABLE [EmployeeContactsInf] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;

DECLARE @var183 sysname;
SELECT @var183 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeContactsInf]') AND [c].[name] = N'CreatedBy');
IF @var183 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeContactsInf] DROP CONSTRAINT [' + @var183 + '];');
ALTER TABLE [EmployeeContactsInf] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [EmployeeContactsInf] ADD [DataAreaId] nvarchar(10) NULL;

ALTER TABLE [EmployeeContactsInf] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [EmployeeContactsInf] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [EmployeeContactsInf] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [EmployeeContactsInf] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

DECLARE @var184 sysname;
SELECT @var184 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeBankAccounts]') AND [c].[name] = N'ModifiedBy');
IF @var184 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeBankAccounts] DROP CONSTRAINT [' + @var184 + '];');
ALTER TABLE [EmployeeBankAccounts] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;

DECLARE @var185 sysname;
SELECT @var185 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EmployeeBankAccounts]') AND [c].[name] = N'CreatedBy');
IF @var185 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeBankAccounts] DROP CONSTRAINT [' + @var185 + '];');
ALTER TABLE [EmployeeBankAccounts] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [EmployeeBankAccounts] ADD [DataAreaId] nvarchar(10) NULL;

ALTER TABLE [EmployeeBankAccounts] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [EmployeeBankAccounts] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [EmployeeBankAccounts] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [EmployeeBankAccounts] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

ALTER TABLE [EducationLevels] ADD [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [EducationLevels] ADD [CreatedOn] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [EducationLevels] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [EducationLevels] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [EducationLevels] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [EducationLevels] ADD [ModifiedBy] nvarchar(20) NULL;

ALTER TABLE [EducationLevels] ADD [ModifiedOn] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [EducationLevels] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

DECLARE @var186 sysname;
SELECT @var186 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EarningCodeVersions]') AND [c].[name] = N'ModifiedBy');
IF @var186 IS NOT NULL EXEC(N'ALTER TABLE [EarningCodeVersions] DROP CONSTRAINT [' + @var186 + '];');
ALTER TABLE [EarningCodeVersions] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;

DECLARE @var187 sysname;
SELECT @var187 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EarningCodeVersions]') AND [c].[name] = N'CreatedBy');
IF @var187 IS NOT NULL EXEC(N'ALTER TABLE [EarningCodeVersions] DROP CONSTRAINT [' + @var187 + '];');
ALTER TABLE [EarningCodeVersions] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [EarningCodeVersions] ADD [DataAreaId] nvarchar(10) NULL;

ALTER TABLE [EarningCodeVersions] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [EarningCodeVersions] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [EarningCodeVersions] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [EarningCodeVersions] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

DECLARE @var188 sysname;
SELECT @var188 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EarningCodes]') AND [c].[name] = N'ModifiedBy');
IF @var188 IS NOT NULL EXEC(N'ALTER TABLE [EarningCodes] DROP CONSTRAINT [' + @var188 + '];');
ALTER TABLE [EarningCodes] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;

DECLARE @var189 sysname;
SELECT @var189 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EarningCodes]') AND [c].[name] = N'CreatedBy');
IF @var189 IS NOT NULL EXEC(N'ALTER TABLE [EarningCodes] DROP CONSTRAINT [' + @var189 + '];');
ALTER TABLE [EarningCodes] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [EarningCodes] ADD [DataAreaId] nvarchar(10) NULL;

ALTER TABLE [EarningCodes] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [EarningCodes] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [EarningCodes] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [EarningCodes] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

ALTER TABLE [DisabilityTypes] ADD [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [DisabilityTypes] ADD [CreatedOn] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [DisabilityTypes] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [DisabilityTypes] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [DisabilityTypes] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [DisabilityTypes] ADD [ModifiedBy] nvarchar(20) NULL;

ALTER TABLE [DisabilityTypes] ADD [ModifiedOn] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [DisabilityTypes] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

DECLARE @var190 sysname;
SELECT @var190 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Departments]') AND [c].[name] = N'ModifiedBy');
IF @var190 IS NOT NULL EXEC(N'ALTER TABLE [Departments] DROP CONSTRAINT [' + @var190 + '];');
ALTER TABLE [Departments] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;

DECLARE @var191 sysname;
SELECT @var191 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Departments]') AND [c].[name] = N'CreatedBy');
IF @var191 IS NOT NULL EXEC(N'ALTER TABLE [Departments] DROP CONSTRAINT [' + @var191 + '];');
ALTER TABLE [Departments] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [Departments] ADD [DataAreaId] nvarchar(10) NULL;

ALTER TABLE [Departments] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [Departments] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [Departments] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [Departments] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

DECLARE @var192 sysname;
SELECT @var192 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[DeductionCodeVersions]') AND [c].[name] = N'ModifiedBy');
IF @var192 IS NOT NULL EXEC(N'ALTER TABLE [DeductionCodeVersions] DROP CONSTRAINT [' + @var192 + '];');
ALTER TABLE [DeductionCodeVersions] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;

DECLARE @var193 sysname;
SELECT @var193 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[DeductionCodeVersions]') AND [c].[name] = N'CreatedBy');
IF @var193 IS NOT NULL EXEC(N'ALTER TABLE [DeductionCodeVersions] DROP CONSTRAINT [' + @var193 + '];');
ALTER TABLE [DeductionCodeVersions] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [DeductionCodeVersions] ADD [DataAreaId] nvarchar(10) NULL;

ALTER TABLE [DeductionCodeVersions] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [DeductionCodeVersions] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [DeductionCodeVersions] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [DeductionCodeVersions] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

DECLARE @var194 sysname;
SELECT @var194 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[DeductionCodes]') AND [c].[name] = N'ModifiedBy');
IF @var194 IS NOT NULL EXEC(N'ALTER TABLE [DeductionCodes] DROP CONSTRAINT [' + @var194 + '];');
ALTER TABLE [DeductionCodes] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;

DECLARE @var195 sysname;
SELECT @var195 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[DeductionCodes]') AND [c].[name] = N'CreatedBy');
IF @var195 IS NOT NULL EXEC(N'ALTER TABLE [DeductionCodes] DROP CONSTRAINT [' + @var195 + '];');
ALTER TABLE [DeductionCodes] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [DeductionCodes] ADD [DataAreaId] nvarchar(10) NULL;

ALTER TABLE [DeductionCodes] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [DeductionCodes] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [DeductionCodes] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [DeductionCodes] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

ALTER TABLE [Currencies] ADD [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [Currencies] ADD [CreatedOn] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [Currencies] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [Currencies] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [Currencies] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [Currencies] ADD [ModifiedBy] nvarchar(20) NULL;

ALTER TABLE [Currencies] ADD [ModifiedOn] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [Currencies] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

DECLARE @var196 sysname;
SELECT @var196 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[CourseTypes]') AND [c].[name] = N'ModifiedBy');
IF @var196 IS NOT NULL EXEC(N'ALTER TABLE [CourseTypes] DROP CONSTRAINT [' + @var196 + '];');
ALTER TABLE [CourseTypes] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;

DECLARE @var197 sysname;
SELECT @var197 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[CourseTypes]') AND [c].[name] = N'CreatedBy');
IF @var197 IS NOT NULL EXEC(N'ALTER TABLE [CourseTypes] DROP CONSTRAINT [' + @var197 + '];');
ALTER TABLE [CourseTypes] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [CourseTypes] ADD [DataAreaId] nvarchar(10) NULL;

ALTER TABLE [CourseTypes] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [CourseTypes] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [CourseTypes] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [CourseTypes] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

DECLARE @var198 sysname;
SELECT @var198 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Courses]') AND [c].[name] = N'ModifiedBy');
IF @var198 IS NOT NULL EXEC(N'ALTER TABLE [Courses] DROP CONSTRAINT [' + @var198 + '];');
ALTER TABLE [Courses] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;

DECLARE @var199 sysname;
SELECT @var199 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Courses]') AND [c].[name] = N'CreatedBy');
IF @var199 IS NOT NULL EXEC(N'ALTER TABLE [Courses] DROP CONSTRAINT [' + @var199 + '];');
ALTER TABLE [Courses] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [Courses] ADD [DataAreaId] nvarchar(10) NULL;

ALTER TABLE [Courses] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [Courses] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [Courses] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [Courses] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

DECLARE @var200 sysname;
SELECT @var200 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[CoursePositions]') AND [c].[name] = N'ModifiedBy');
IF @var200 IS NOT NULL EXEC(N'ALTER TABLE [CoursePositions] DROP CONSTRAINT [' + @var200 + '];');
ALTER TABLE [CoursePositions] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;

DECLARE @var201 sysname;
SELECT @var201 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[CoursePositions]') AND [c].[name] = N'CreatedBy');
IF @var201 IS NOT NULL EXEC(N'ALTER TABLE [CoursePositions] DROP CONSTRAINT [' + @var201 + '];');
ALTER TABLE [CoursePositions] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [CoursePositions] ADD [DataAreaId] nvarchar(10) NULL;

ALTER TABLE [CoursePositions] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [CoursePositions] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [CoursePositions] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [CoursePositions] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

DECLARE @var202 sysname;
SELECT @var202 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[CourseLocations]') AND [c].[name] = N'ModifiedBy');
IF @var202 IS NOT NULL EXEC(N'ALTER TABLE [CourseLocations] DROP CONSTRAINT [' + @var202 + '];');
ALTER TABLE [CourseLocations] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;

DECLARE @var203 sysname;
SELECT @var203 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[CourseLocations]') AND [c].[name] = N'CreatedBy');
IF @var203 IS NOT NULL EXEC(N'ALTER TABLE [CourseLocations] DROP CONSTRAINT [' + @var203 + '];');
ALTER TABLE [CourseLocations] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [CourseLocations] ADD [DataAreaId] nvarchar(10) NULL;

ALTER TABLE [CourseLocations] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [CourseLocations] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [CourseLocations] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [CourseLocations] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

DECLARE @var204 sysname;
SELECT @var204 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[CourseInstructors]') AND [c].[name] = N'ModifiedBy');
IF @var204 IS NOT NULL EXEC(N'ALTER TABLE [CourseInstructors] DROP CONSTRAINT [' + @var204 + '];');
ALTER TABLE [CourseInstructors] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;

DECLARE @var205 sysname;
SELECT @var205 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[CourseInstructors]') AND [c].[name] = N'CreatedBy');
IF @var205 IS NOT NULL EXEC(N'ALTER TABLE [CourseInstructors] DROP CONSTRAINT [' + @var205 + '];');
ALTER TABLE [CourseInstructors] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [CourseInstructors] ADD [DataAreaId] nvarchar(10) NULL;

ALTER TABLE [CourseInstructors] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [CourseInstructors] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [CourseInstructors] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [CourseInstructors] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

DECLARE @var206 sysname;
SELECT @var206 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[CourseEmployees]') AND [c].[name] = N'ModifiedBy');
IF @var206 IS NOT NULL EXEC(N'ALTER TABLE [CourseEmployees] DROP CONSTRAINT [' + @var206 + '];');
ALTER TABLE [CourseEmployees] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;

DECLARE @var207 sysname;
SELECT @var207 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[CourseEmployees]') AND [c].[name] = N'CreatedBy');
IF @var207 IS NOT NULL EXEC(N'ALTER TABLE [CourseEmployees] DROP CONSTRAINT [' + @var207 + '];');
ALTER TABLE [CourseEmployees] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [CourseEmployees] ADD [DataAreaId] nvarchar(10) NULL;

ALTER TABLE [CourseEmployees] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [CourseEmployees] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [CourseEmployees] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [CourseEmployees] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

ALTER TABLE [Countries] ADD [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [Countries] ADD [CreatedOn] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [Countries] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [Countries] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [Countries] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [Countries] ADD [ModifiedBy] nvarchar(20) NULL;

ALTER TABLE [Countries] ADD [ModifiedOn] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [Countries] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

DECLARE @var208 sysname;
SELECT @var208 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[CompaniesAssignedToUsers]') AND [c].[name] = N'ModifiedBy');
IF @var208 IS NOT NULL EXEC(N'ALTER TABLE [CompaniesAssignedToUsers] DROP CONSTRAINT [' + @var208 + '];');
ALTER TABLE [CompaniesAssignedToUsers] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;

DECLARE @var209 sysname;
SELECT @var209 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[CompaniesAssignedToUsers]') AND [c].[name] = N'CreatedBy');
IF @var209 IS NOT NULL EXEC(N'ALTER TABLE [CompaniesAssignedToUsers] DROP CONSTRAINT [' + @var209 + '];');
ALTER TABLE [CompaniesAssignedToUsers] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [CompaniesAssignedToUsers] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [CompaniesAssignedToUsers] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [CompaniesAssignedToUsers] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [CompaniesAssignedToUsers] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

ALTER TABLE [Companies] ADD [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [Companies] ADD [CreatedOn] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [Companies] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [Companies] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [Companies] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [Companies] ADD [ModifiedBy] nvarchar(20) NULL;

ALTER TABLE [Companies] ADD [ModifiedOn] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [Companies] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

DECLARE @var210 sysname;
SELECT @var210 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[ClassRooms]') AND [c].[name] = N'ModifiedBy');
IF @var210 IS NOT NULL EXEC(N'ALTER TABLE [ClassRooms] DROP CONSTRAINT [' + @var210 + '];');
ALTER TABLE [ClassRooms] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;

DECLARE @var211 sysname;
SELECT @var211 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[ClassRooms]') AND [c].[name] = N'CreatedBy');
IF @var211 IS NOT NULL EXEC(N'ALTER TABLE [ClassRooms] DROP CONSTRAINT [' + @var211 + '];');
ALTER TABLE [ClassRooms] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [ClassRooms] ADD [DataAreaId] nvarchar(10) NULL;

ALTER TABLE [ClassRooms] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [ClassRooms] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [ClassRooms] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [ClassRooms] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

ALTER TABLE [CalendarHolidays] ADD [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [CalendarHolidays] ADD [CreatedOn] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [CalendarHolidays] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [CalendarHolidays] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [CalendarHolidays] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [CalendarHolidays] ADD [ModifiedBy] nvarchar(20) NULL;

ALTER TABLE [CalendarHolidays] ADD [ModifiedOn] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.0000000';

ALTER TABLE [CalendarHolidays] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

DECLARE @var212 sysname;
SELECT @var212 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[BatchHistories]') AND [c].[name] = N'ModifiedBy');
IF @var212 IS NOT NULL EXEC(N'ALTER TABLE [BatchHistories] DROP CONSTRAINT [' + @var212 + '];');
ALTER TABLE [BatchHistories] ALTER COLUMN [ModifiedBy] nvarchar(20) NULL;

DECLARE @var213 sysname;
SELECT @var213 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[BatchHistories]') AND [c].[name] = N'CreatedBy');
IF @var213 IS NOT NULL EXEC(N'ALTER TABLE [BatchHistories] DROP CONSTRAINT [' + @var213 + '];');
ALTER TABLE [BatchHistories] ALTER COLUMN [CreatedBy] nvarchar(20) NULL;

ALTER TABLE [BatchHistories] ADD [DataAreaId] nvarchar(10) NULL;

ALTER TABLE [BatchHistories] ADD [DeletedBy] nvarchar(20) NULL;

ALTER TABLE [BatchHistories] ADD [DeletedOn] datetime2 NULL;

ALTER TABLE [BatchHistories] ADD [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit);

ALTER TABLE [BatchHistories] ADD [RecId] bigint NOT NULL DEFAULT CAST(0 AS bigint);

ALTER TABLE [Taxes] ADD CONSTRAINT [PK_Taxes] PRIMARY KEY ([TaxId], [DataAreaId]);

ALTER TABLE [TaxDetails] ADD CONSTRAINT [PK_TaxDetails] PRIMARY KEY ([InternalId], [TaxId], [DataAreaId]);

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

UPDATE [Companies] SET [CreatedBy] = NULL, [CreatedOn] = '0001-01-01T00:00:00.0000000', [DeletedBy] = NULL, [DeletedOn] = NULL, [IsDeleted] = CAST(0 AS bit), [ModifiedBy] = NULL, [ModifiedOn] = '0001-01-01T00:00:00.0000000', [RecId] = CAST(0 AS bigint)
WHERE [CompanyId] = N'Root';
SELECT @@ROWCOUNT;


UPDATE [Countries] SET [CreatedBy] = NULL, [CreatedOn] = '0001-01-01T00:00:00.0000000', [DeletedBy] = NULL, [DeletedOn] = NULL, [IsDeleted] = CAST(0 AS bit), [ModifiedBy] = NULL, [ModifiedOn] = '0001-01-01T00:00:00.0000000', [RecId] = CAST(0 AS bigint)
WHERE [CountryId] = N'CH';
SELECT @@ROWCOUNT;


UPDATE [Countries] SET [CreatedBy] = NULL, [CreatedOn] = '0001-01-01T00:00:00.0000000', [DeletedBy] = NULL, [DeletedOn] = NULL, [IsDeleted] = CAST(0 AS bit), [ModifiedBy] = NULL, [ModifiedOn] = '0001-01-01T00:00:00.0000000', [RecId] = CAST(0 AS bigint)
WHERE [CountryId] = N'DOM';
SELECT @@ROWCOUNT;


UPDATE [Currencies] SET [CreatedBy] = NULL, [CreatedOn] = '0001-01-01T00:00:00.0000000', [DeletedBy] = NULL, [DeletedOn] = NULL, [IsDeleted] = CAST(0 AS bit), [ModifiedBy] = NULL, [ModifiedOn] = '0001-01-01T00:00:00.0000000', [RecId] = CAST(0 AS bigint)
WHERE [CurrencyId] = N'DOP';
SELECT @@ROWCOUNT;


UPDATE [Currencies] SET [CreatedBy] = NULL, [CreatedOn] = '0001-01-01T00:00:00.0000000', [DeletedBy] = NULL, [DeletedOn] = NULL, [IsDeleted] = CAST(0 AS bit), [ModifiedBy] = NULL, [ModifiedOn] = '0001-01-01T00:00:00.0000000', [RecId] = CAST(0 AS bigint)
WHERE [CurrencyId] = N'USD';
SELECT @@ROWCOUNT;


UPDATE [FormatCodes] SET [CreatedBy] = NULL, [CreatedOn] = '0001-01-01T00:00:00.0000000', [DeletedBy] = NULL, [DeletedOn] = NULL, [IsDeleted] = CAST(0 AS bit), [ModifiedBy] = NULL, [ModifiedOn] = '0001-01-01T00:00:00.0000000', [RecId] = CAST(0 AS bigint)
WHERE [FormatCodeId] = N'en-US';
SELECT @@ROWCOUNT;


UPDATE [FormatCodes] SET [CreatedBy] = NULL, [CreatedOn] = '0001-01-01T00:00:00.0000000', [DeletedBy] = NULL, [DeletedOn] = NULL, [IsDeleted] = CAST(0 AS bit), [ModifiedBy] = NULL, [ModifiedOn] = '0001-01-01T00:00:00.0000000', [RecId] = CAST(0 AS bigint)
WHERE [FormatCodeId] = N'es-ES';
SELECT @@ROWCOUNT;


UPDATE [MenusApp] SET [CreatedBy] = NULL, [CreatedOn] = '0001-01-01T00:00:00.0000000', [DeletedBy] = NULL, [DeletedOn] = NULL, [IsDeleted] = CAST(0 AS bit), [ModifiedBy] = NULL, [ModifiedOn] = '0001-01-01T00:00:00.0000000', [RecId] = CAST(0 AS bigint)
WHERE [MenuId] = N'MENU-0002';
SELECT @@ROWCOUNT;


UPDATE [MenusApp] SET [CreatedBy] = NULL, [CreatedOn] = '0001-01-01T00:00:00.0000000', [DeletedBy] = NULL, [DeletedOn] = NULL, [IsDeleted] = CAST(0 AS bit), [ModifiedBy] = NULL, [ModifiedOn] = '0001-01-01T00:00:00.0000000', [RecId] = CAST(0 AS bigint)
WHERE [MenuId] = N'MENU-0057';
SELECT @@ROWCOUNT;


UPDATE [Users] SET [DeletedBy] = NULL, [DeletedOn] = NULL, [IsDeleted] = CAST(0 AS bit), [RecId] = CAST(0 AS bigint)
WHERE [Alias] = N'Admin';
SELECT @@ROWCOUNT;


CREATE INDEX [IX_TaxDetails_TaxId_DataAreaId] ON [TaxDetails] ([TaxId], [DataAreaId]);

CREATE INDEX [IX_EmployeeTaxes_TaxId_DataAreaId] ON [EmployeeTaxes] ([TaxId], [DataAreaId]);

CREATE INDEX [IX_AuditLog_ChangedAt] ON [AuditLogs] ([ChangedAt]);

CREATE INDEX [IX_AuditLog_ChangedBy] ON [AuditLogs] ([ChangedBy]);

CREATE INDEX [IX_AuditLog_DataAreaId] ON [AuditLogs] ([DataAreaId]);

CREATE INDEX [IX_AuditLog_EntityName_EntityRefRecId] ON [AuditLogs] ([EntityName], [EntityRefRecId]);

ALTER TABLE [EmployeeTaxes] ADD CONSTRAINT [FK_EmployeeTaxes_Taxes_TaxId_DataAreaId] FOREIGN KEY ([TaxId], [DataAreaId]) REFERENCES [Taxes] ([TaxId], [DataAreaId]) ON DELETE CASCADE;

ALTER TABLE [TaxDetails] ADD CONSTRAINT [FK_TaxDetails_Taxes_TaxId_DataAreaId] FOREIGN KEY ([TaxId], [DataAreaId]) REFERENCES [Taxes] ([TaxId], [DataAreaId]) ON DELETE CASCADE;

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20251125215507_AuditSystem_ISO27001', N'9.0.2');

CREATE TABLE [UserGridViews] (
    [RecId] bigint NOT NULL IDENTITY,
    [UserRefRecId] bigint NOT NULL,
    [EntityName] nvarchar(50) NOT NULL,
    [ViewType] nvarchar(20) NOT NULL DEFAULT N'Grid',
    [ViewScope] nvarchar(20) NOT NULL DEFAULT N'Private',
    [RoleRefRecId] bigint NULL,
    [ViewName] nvarchar(100) NOT NULL,
    [ViewDescription] nvarchar(500) NULL,
    [IsDefault] bit NOT NULL DEFAULT CAST(0 AS bit),
    [IsLocked] bit NOT NULL DEFAULT CAST(0 AS bit),
    [ViewConfig] nvarchar(max) NOT NULL,
    [SchemaVersion] int NOT NULL DEFAULT 1,
    [Checksum] nvarchar(64) NULL,
    [UsageCount] int NOT NULL DEFAULT 0,
    [LastUsedOn] datetime2 NULL,
    [Tags] nvarchar(200) NULL,
    [CreatedBy] nvarchar(20) NULL,
    [CreatedOn] datetime2 NOT NULL,
    [ModifiedBy] nvarchar(20) NULL,
    [ModifiedOn] datetime2 NOT NULL,
    [IsDeleted] bit NOT NULL,
    [DeletedBy] nvarchar(20) NULL,
    [DeletedOn] datetime2 NULL,
    [DataAreaId] nvarchar(10) NULL,
    CONSTRAINT [PK_UserGridViews] PRIMARY KEY ([RecId])
);

CREATE INDEX [IX_UserGridViews_Entity_ViewType] ON [UserGridViews] ([EntityName], [ViewType]);

CREATE INDEX [IX_UserGridViews_User_Scope] ON [UserGridViews] ([UserRefRecId], [ViewScope]);

CREATE UNIQUE INDEX [UX_UserGridViews_User_Entity_View] ON [UserGridViews] ([UserRefRecId], [EntityName], [ViewName]);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20251127155631_AddUserGridViews', N'9.0.2');

ALTER TABLE [Departments] ADD [AccountCode] nvarchar(20) NULL;

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20251128213838_AddAccountCodeToDepartment', N'9.0.2');

DECLARE @var214 sysname;
SELECT @var214 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Employees]') AND [c].[name] = N'Nationality');
IF @var214 IS NOT NULL EXEC(N'ALTER TABLE [Employees] DROP CONSTRAINT [' + @var214 + '];');
ALTER TABLE [Employees] ALTER COLUMN [Nationality] nvarchar(50) NULL;

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20251129023718_IncreaseNationalityMaxLength', N'9.0.2');

DECLARE @var215 sysname;
SELECT @var215 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Employees]') AND [c].[name] = N'LocationId');
IF @var215 IS NOT NULL EXEC(N'ALTER TABLE [Employees] DROP CONSTRAINT [' + @var215 + '];');
ALTER TABLE [Employees] ALTER COLUMN [LocationId] nvarchar(20) NULL;

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20251129024204_IncreaseEmployeeForeignKeysMaxLength', N'9.0.2');

DECLARE @var216 sysname;
SELECT @var216 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Occupations]') AND [c].[name] = N'OccupationId');
IF @var216 IS NOT NULL EXEC(N'ALTER TABLE [Occupations] DROP CONSTRAINT [' + @var216 + '];');
ALTER TABLE [Occupations] ALTER COLUMN [OccupationId] nvarchar(80) NOT NULL;

DROP INDEX [IX_Employees_OccupationId] ON [Employees];
DECLARE @var217 sysname;
SELECT @var217 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Employees]') AND [c].[name] = N'OccupationId');
IF @var217 IS NOT NULL EXEC(N'ALTER TABLE [Employees] DROP CONSTRAINT [' + @var217 + '];');
ALTER TABLE [Employees] ALTER COLUMN [OccupationId] nvarchar(80) NOT NULL;
CREATE INDEX [IX_Employees_OccupationId] ON [Employees] ([OccupationId]);

DROP INDEX [IX_Employees_EducationLevelId] ON [Employees];
DECLARE @var218 sysname;
SELECT @var218 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Employees]') AND [c].[name] = N'EducationLevelId');
IF @var218 IS NOT NULL EXEC(N'ALTER TABLE [Employees] DROP CONSTRAINT [' + @var218 + '];');
ALTER TABLE [Employees] ALTER COLUMN [EducationLevelId] nvarchar(80) NOT NULL;
CREATE INDEX [IX_Employees_EducationLevelId] ON [Employees] ([EducationLevelId]);

DECLARE @var219 sysname;
SELECT @var219 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[EducationLevels]') AND [c].[name] = N'EducationLevelId');
IF @var219 IS NOT NULL EXEC(N'ALTER TABLE [EducationLevels] DROP CONSTRAINT [' + @var219 + '];');
ALTER TABLE [EducationLevels] ALTER COLUMN [EducationLevelId] nvarchar(80) NOT NULL;

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20251129024446_IncreaseOccupationEducationMaxLength', N'9.0.2');

ALTER TABLE [EmployeeDocuments] ADD [FileName] nvarchar(255) NULL;

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20251129033644_AddFileNameToEmployeeDocument', N'9.0.2');


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_Users NVARCHAR(255);
                    SELECT @constraintName_Users = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'Users' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_Users IS NOT NULL
                        EXEC('ALTER TABLE [Users] DROP CONSTRAINT [' + @constraintName_Users + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'Users' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [Users] ADD CONSTRAINT [DF_Users_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_UserImages NVARCHAR(255);
                    SELECT @constraintName_UserImages = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'UserImages' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_UserImages IS NOT NULL
                        EXEC('ALTER TABLE [UserImages] DROP CONSTRAINT [' + @constraintName_UserImages + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'UserImages' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [UserImages] ADD CONSTRAINT [DF_UserImages_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_Taxes NVARCHAR(255);
                    SELECT @constraintName_Taxes = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'Taxes' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_Taxes IS NOT NULL
                        EXEC('ALTER TABLE [Taxes] DROP CONSTRAINT [' + @constraintName_Taxes + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'Taxes' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [Taxes] ADD CONSTRAINT [DF_Taxes_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_TaxDetails NVARCHAR(255);
                    SELECT @constraintName_TaxDetails = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'TaxDetails' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_TaxDetails IS NOT NULL
                        EXEC('ALTER TABLE [TaxDetails] DROP CONSTRAINT [' + @constraintName_TaxDetails + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'TaxDetails' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [TaxDetails] ADD CONSTRAINT [DF_TaxDetails_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_ReportsConfig NVARCHAR(255);
                    SELECT @constraintName_ReportsConfig = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'ReportsConfig' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_ReportsConfig IS NOT NULL
                        EXEC('ALTER TABLE [ReportsConfig] DROP CONSTRAINT [' + @constraintName_ReportsConfig + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'ReportsConfig' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [ReportsConfig] ADD CONSTRAINT [DF_ReportsConfig_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_Provinces NVARCHAR(255);
                    SELECT @constraintName_Provinces = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'Provinces' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_Provinces IS NOT NULL
                        EXEC('ALTER TABLE [Provinces] DROP CONSTRAINT [' + @constraintName_Provinces + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'Provinces' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [Provinces] ADD CONSTRAINT [DF_Provinces_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_Projects NVARCHAR(255);
                    SELECT @constraintName_Projects = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'Projects' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_Projects IS NOT NULL
                        EXEC('ALTER TABLE [Projects] DROP CONSTRAINT [' + @constraintName_Projects + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'Projects' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [Projects] ADD CONSTRAINT [DF_Projects_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_ProjCategories NVARCHAR(255);
                    SELECT @constraintName_ProjCategories = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'ProjCategories' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_ProjCategories IS NOT NULL
                        EXEC('ALTER TABLE [ProjCategories] DROP CONSTRAINT [' + @constraintName_ProjCategories + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'ProjCategories' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [ProjCategories] ADD CONSTRAINT [DF_ProjCategories_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_Positions NVARCHAR(255);
                    SELECT @constraintName_Positions = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'Positions' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_Positions IS NOT NULL
                        EXEC('ALTER TABLE [Positions] DROP CONSTRAINT [' + @constraintName_Positions + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'Positions' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [Positions] ADD CONSTRAINT [DF_Positions_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_PositionRequirements NVARCHAR(255);
                    SELECT @constraintName_PositionRequirements = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'PositionRequirements' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_PositionRequirements IS NOT NULL
                        EXEC('ALTER TABLE [PositionRequirements] DROP CONSTRAINT [' + @constraintName_PositionRequirements + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'PositionRequirements' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [PositionRequirements] ADD CONSTRAINT [DF_PositionRequirements_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_PayrollsProcess NVARCHAR(255);
                    SELECT @constraintName_PayrollsProcess = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'PayrollsProcess' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_PayrollsProcess IS NOT NULL
                        EXEC('ALTER TABLE [PayrollsProcess] DROP CONSTRAINT [' + @constraintName_PayrollsProcess + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'PayrollsProcess' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [PayrollsProcess] ADD CONSTRAINT [DF_PayrollsProcess_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_Payrolls NVARCHAR(255);
                    SELECT @constraintName_Payrolls = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'Payrolls' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_Payrolls IS NOT NULL
                        EXEC('ALTER TABLE [Payrolls] DROP CONSTRAINT [' + @constraintName_Payrolls + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'Payrolls' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [Payrolls] ADD CONSTRAINT [DF_Payrolls_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_PayrollProcessDetails NVARCHAR(255);
                    SELECT @constraintName_PayrollProcessDetails = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'PayrollProcessDetails' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_PayrollProcessDetails IS NOT NULL
                        EXEC('ALTER TABLE [PayrollProcessDetails] DROP CONSTRAINT [' + @constraintName_PayrollProcessDetails + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'PayrollProcessDetails' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [PayrollProcessDetails] ADD CONSTRAINT [DF_PayrollProcessDetails_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_PayrollProcessActions NVARCHAR(255);
                    SELECT @constraintName_PayrollProcessActions = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'PayrollProcessActions' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_PayrollProcessActions IS NOT NULL
                        EXEC('ALTER TABLE [PayrollProcessActions] DROP CONSTRAINT [' + @constraintName_PayrollProcessActions + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'PayrollProcessActions' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [PayrollProcessActions] ADD CONSTRAINT [DF_PayrollProcessActions_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_PayCycles NVARCHAR(255);
                    SELECT @constraintName_PayCycles = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'PayCycles' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_PayCycles IS NOT NULL
                        EXEC('ALTER TABLE [PayCycles] DROP CONSTRAINT [' + @constraintName_PayCycles + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'PayCycles' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [PayCycles] ADD CONSTRAINT [DF_PayCycles_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_Occupations NVARCHAR(255);
                    SELECT @constraintName_Occupations = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'Occupations' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_Occupations IS NOT NULL
                        EXEC('ALTER TABLE [Occupations] DROP CONSTRAINT [' + @constraintName_Occupations + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'Occupations' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [Occupations] ADD CONSTRAINT [DF_Occupations_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_MenusApp NVARCHAR(255);
                    SELECT @constraintName_MenusApp = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'MenusApp' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_MenusApp IS NOT NULL
                        EXEC('ALTER TABLE [MenusApp] DROP CONSTRAINT [' + @constraintName_MenusApp + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'MenusApp' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [MenusApp] ADD CONSTRAINT [DF_MenusApp_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_MenuAssignedToUsers NVARCHAR(255);
                    SELECT @constraintName_MenuAssignedToUsers = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'MenuAssignedToUsers' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_MenuAssignedToUsers IS NOT NULL
                        EXEC('ALTER TABLE [MenuAssignedToUsers] DROP CONSTRAINT [' + @constraintName_MenuAssignedToUsers + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'MenuAssignedToUsers' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [MenuAssignedToUsers] ADD CONSTRAINT [DF_MenuAssignedToUsers_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_Loans NVARCHAR(255);
                    SELECT @constraintName_Loans = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'Loans' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_Loans IS NOT NULL
                        EXEC('ALTER TABLE [Loans] DROP CONSTRAINT [' + @constraintName_Loans + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'Loans' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [Loans] ADD CONSTRAINT [DF_Loans_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_Jobs NVARCHAR(255);
                    SELECT @constraintName_Jobs = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'Jobs' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_Jobs IS NOT NULL
                        EXEC('ALTER TABLE [Jobs] DROP CONSTRAINT [' + @constraintName_Jobs + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'Jobs' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [Jobs] ADD CONSTRAINT [DF_Jobs_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_Instructors NVARCHAR(255);
                    SELECT @constraintName_Instructors = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'Instructors' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_Instructors IS NOT NULL
                        EXEC('ALTER TABLE [Instructors] DROP CONSTRAINT [' + @constraintName_Instructors + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'Instructors' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [Instructors] ADD CONSTRAINT [DF_Instructors_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_GeneralConfigs NVARCHAR(255);
                    SELECT @constraintName_GeneralConfigs = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'GeneralConfigs' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_GeneralConfigs IS NOT NULL
                        EXEC('ALTER TABLE [GeneralConfigs] DROP CONSTRAINT [' + @constraintName_GeneralConfigs + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'GeneralConfigs' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [GeneralConfigs] ADD CONSTRAINT [DF_GeneralConfigs_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_FormatCodes NVARCHAR(255);
                    SELECT @constraintName_FormatCodes = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'FormatCodes' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_FormatCodes IS NOT NULL
                        EXEC('ALTER TABLE [FormatCodes] DROP CONSTRAINT [' + @constraintName_FormatCodes + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'FormatCodes' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [FormatCodes] ADD CONSTRAINT [DF_FormatCodes_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_EmployeeWorkControlCalendars NVARCHAR(255);
                    SELECT @constraintName_EmployeeWorkControlCalendars = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'EmployeeWorkControlCalendars' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_EmployeeWorkControlCalendars IS NOT NULL
                        EXEC('ALTER TABLE [EmployeeWorkControlCalendars] DROP CONSTRAINT [' + @constraintName_EmployeeWorkControlCalendars + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'EmployeeWorkControlCalendars' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [EmployeeWorkControlCalendars] ADD CONSTRAINT [DF_EmployeeWorkControlCalendars_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_EmployeeWorkCalendars NVARCHAR(255);
                    SELECT @constraintName_EmployeeWorkCalendars = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'EmployeeWorkCalendars' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_EmployeeWorkCalendars IS NOT NULL
                        EXEC('ALTER TABLE [EmployeeWorkCalendars] DROP CONSTRAINT [' + @constraintName_EmployeeWorkCalendars + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'EmployeeWorkCalendars' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [EmployeeWorkCalendars] ADD CONSTRAINT [DF_EmployeeWorkCalendars_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_EmployeeTaxes NVARCHAR(255);
                    SELECT @constraintName_EmployeeTaxes = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'EmployeeTaxes' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_EmployeeTaxes IS NOT NULL
                        EXEC('ALTER TABLE [EmployeeTaxes] DROP CONSTRAINT [' + @constraintName_EmployeeTaxes + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'EmployeeTaxes' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [EmployeeTaxes] ADD CONSTRAINT [DF_EmployeeTaxes_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_EmployeesAddress NVARCHAR(255);
                    SELECT @constraintName_EmployeesAddress = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'EmployeesAddress' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_EmployeesAddress IS NOT NULL
                        EXEC('ALTER TABLE [EmployeesAddress] DROP CONSTRAINT [' + @constraintName_EmployeesAddress + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'EmployeesAddress' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [EmployeesAddress] ADD CONSTRAINT [DF_EmployeesAddress_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_Employees NVARCHAR(255);
                    SELECT @constraintName_Employees = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'Employees' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_Employees IS NOT NULL
                        EXEC('ALTER TABLE [Employees] DROP CONSTRAINT [' + @constraintName_Employees + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'Employees' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [Employees] ADD CONSTRAINT [DF_Employees_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_EmployeePositions NVARCHAR(255);
                    SELECT @constraintName_EmployeePositions = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'EmployeePositions' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_EmployeePositions IS NOT NULL
                        EXEC('ALTER TABLE [EmployeePositions] DROP CONSTRAINT [' + @constraintName_EmployeePositions + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'EmployeePositions' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [EmployeePositions] ADD CONSTRAINT [DF_EmployeePositions_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_EmployeeLoans NVARCHAR(255);
                    SELECT @constraintName_EmployeeLoans = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'EmployeeLoans' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_EmployeeLoans IS NOT NULL
                        EXEC('ALTER TABLE [EmployeeLoans] DROP CONSTRAINT [' + @constraintName_EmployeeLoans + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'EmployeeLoans' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [EmployeeLoans] ADD CONSTRAINT [DF_EmployeeLoans_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_EmployeeLoanHistories NVARCHAR(255);
                    SELECT @constraintName_EmployeeLoanHistories = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'EmployeeLoanHistories' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_EmployeeLoanHistories IS NOT NULL
                        EXEC('ALTER TABLE [EmployeeLoanHistories] DROP CONSTRAINT [' + @constraintName_EmployeeLoanHistories + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'EmployeeLoanHistories' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [EmployeeLoanHistories] ADD CONSTRAINT [DF_EmployeeLoanHistories_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_EmployeeImages NVARCHAR(255);
                    SELECT @constraintName_EmployeeImages = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'EmployeeImages' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_EmployeeImages IS NOT NULL
                        EXEC('ALTER TABLE [EmployeeImages] DROP CONSTRAINT [' + @constraintName_EmployeeImages + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'EmployeeImages' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [EmployeeImages] ADD CONSTRAINT [DF_EmployeeImages_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_EmployeeHistories NVARCHAR(255);
                    SELECT @constraintName_EmployeeHistories = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'EmployeeHistories' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_EmployeeHistories IS NOT NULL
                        EXEC('ALTER TABLE [EmployeeHistories] DROP CONSTRAINT [' + @constraintName_EmployeeHistories + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'EmployeeHistories' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [EmployeeHistories] ADD CONSTRAINT [DF_EmployeeHistories_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_EmployeeExtraHours NVARCHAR(255);
                    SELECT @constraintName_EmployeeExtraHours = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'EmployeeExtraHours' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_EmployeeExtraHours IS NOT NULL
                        EXEC('ALTER TABLE [EmployeeExtraHours] DROP CONSTRAINT [' + @constraintName_EmployeeExtraHours + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'EmployeeExtraHours' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [EmployeeExtraHours] ADD CONSTRAINT [DF_EmployeeExtraHours_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_EmployeeEarningCodes NVARCHAR(255);
                    SELECT @constraintName_EmployeeEarningCodes = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'EmployeeEarningCodes' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_EmployeeEarningCodes IS NOT NULL
                        EXEC('ALTER TABLE [EmployeeEarningCodes] DROP CONSTRAINT [' + @constraintName_EmployeeEarningCodes + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'EmployeeEarningCodes' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [EmployeeEarningCodes] ADD CONSTRAINT [DF_EmployeeEarningCodes_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_EmployeeDocuments NVARCHAR(255);
                    SELECT @constraintName_EmployeeDocuments = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'EmployeeDocuments' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_EmployeeDocuments IS NOT NULL
                        EXEC('ALTER TABLE [EmployeeDocuments] DROP CONSTRAINT [' + @constraintName_EmployeeDocuments + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'EmployeeDocuments' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [EmployeeDocuments] ADD CONSTRAINT [DF_EmployeeDocuments_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_EmployeeDepartments NVARCHAR(255);
                    SELECT @constraintName_EmployeeDepartments = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'EmployeeDepartments' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_EmployeeDepartments IS NOT NULL
                        EXEC('ALTER TABLE [EmployeeDepartments] DROP CONSTRAINT [' + @constraintName_EmployeeDepartments + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'EmployeeDepartments' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [EmployeeDepartments] ADD CONSTRAINT [DF_EmployeeDepartments_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_EmployeeDeductionCodes NVARCHAR(255);
                    SELECT @constraintName_EmployeeDeductionCodes = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'EmployeeDeductionCodes' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_EmployeeDeductionCodes IS NOT NULL
                        EXEC('ALTER TABLE [EmployeeDeductionCodes] DROP CONSTRAINT [' + @constraintName_EmployeeDeductionCodes + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'EmployeeDeductionCodes' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [EmployeeDeductionCodes] ADD CONSTRAINT [DF_EmployeeDeductionCodes_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_EmployeeContactsInf NVARCHAR(255);
                    SELECT @constraintName_EmployeeContactsInf = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'EmployeeContactsInf' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_EmployeeContactsInf IS NOT NULL
                        EXEC('ALTER TABLE [EmployeeContactsInf] DROP CONSTRAINT [' + @constraintName_EmployeeContactsInf + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'EmployeeContactsInf' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [EmployeeContactsInf] ADD CONSTRAINT [DF_EmployeeContactsInf_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_EmployeeBankAccounts NVARCHAR(255);
                    SELECT @constraintName_EmployeeBankAccounts = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'EmployeeBankAccounts' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_EmployeeBankAccounts IS NOT NULL
                        EXEC('ALTER TABLE [EmployeeBankAccounts] DROP CONSTRAINT [' + @constraintName_EmployeeBankAccounts + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'EmployeeBankAccounts' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [EmployeeBankAccounts] ADD CONSTRAINT [DF_EmployeeBankAccounts_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_EducationLevels NVARCHAR(255);
                    SELECT @constraintName_EducationLevels = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'EducationLevels' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_EducationLevels IS NOT NULL
                        EXEC('ALTER TABLE [EducationLevels] DROP CONSTRAINT [' + @constraintName_EducationLevels + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'EducationLevels' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [EducationLevels] ADD CONSTRAINT [DF_EducationLevels_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_EarningCodeVersions NVARCHAR(255);
                    SELECT @constraintName_EarningCodeVersions = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'EarningCodeVersions' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_EarningCodeVersions IS NOT NULL
                        EXEC('ALTER TABLE [EarningCodeVersions] DROP CONSTRAINT [' + @constraintName_EarningCodeVersions + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'EarningCodeVersions' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [EarningCodeVersions] ADD CONSTRAINT [DF_EarningCodeVersions_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_EarningCodes NVARCHAR(255);
                    SELECT @constraintName_EarningCodes = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'EarningCodes' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_EarningCodes IS NOT NULL
                        EXEC('ALTER TABLE [EarningCodes] DROP CONSTRAINT [' + @constraintName_EarningCodes + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'EarningCodes' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [EarningCodes] ADD CONSTRAINT [DF_EarningCodes_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_DisabilityTypes NVARCHAR(255);
                    SELECT @constraintName_DisabilityTypes = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'DisabilityTypes' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_DisabilityTypes IS NOT NULL
                        EXEC('ALTER TABLE [DisabilityTypes] DROP CONSTRAINT [' + @constraintName_DisabilityTypes + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'DisabilityTypes' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [DisabilityTypes] ADD CONSTRAINT [DF_DisabilityTypes_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_Departments NVARCHAR(255);
                    SELECT @constraintName_Departments = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'Departments' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_Departments IS NOT NULL
                        EXEC('ALTER TABLE [Departments] DROP CONSTRAINT [' + @constraintName_Departments + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'Departments' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [Departments] ADD CONSTRAINT [DF_Departments_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_DeductionCodeVersions NVARCHAR(255);
                    SELECT @constraintName_DeductionCodeVersions = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'DeductionCodeVersions' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_DeductionCodeVersions IS NOT NULL
                        EXEC('ALTER TABLE [DeductionCodeVersions] DROP CONSTRAINT [' + @constraintName_DeductionCodeVersions + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'DeductionCodeVersions' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [DeductionCodeVersions] ADD CONSTRAINT [DF_DeductionCodeVersions_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_DeductionCodes NVARCHAR(255);
                    SELECT @constraintName_DeductionCodes = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'DeductionCodes' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_DeductionCodes IS NOT NULL
                        EXEC('ALTER TABLE [DeductionCodes] DROP CONSTRAINT [' + @constraintName_DeductionCodes + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'DeductionCodes' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [DeductionCodes] ADD CONSTRAINT [DF_DeductionCodes_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_Currencies NVARCHAR(255);
                    SELECT @constraintName_Currencies = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'Currencies' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_Currencies IS NOT NULL
                        EXEC('ALTER TABLE [Currencies] DROP CONSTRAINT [' + @constraintName_Currencies + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'Currencies' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [Currencies] ADD CONSTRAINT [DF_Currencies_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_CourseTypes NVARCHAR(255);
                    SELECT @constraintName_CourseTypes = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'CourseTypes' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_CourseTypes IS NOT NULL
                        EXEC('ALTER TABLE [CourseTypes] DROP CONSTRAINT [' + @constraintName_CourseTypes + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'CourseTypes' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [CourseTypes] ADD CONSTRAINT [DF_CourseTypes_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_Courses NVARCHAR(255);
                    SELECT @constraintName_Courses = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'Courses' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_Courses IS NOT NULL
                        EXEC('ALTER TABLE [Courses] DROP CONSTRAINT [' + @constraintName_Courses + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'Courses' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [Courses] ADD CONSTRAINT [DF_Courses_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_CoursePositions NVARCHAR(255);
                    SELECT @constraintName_CoursePositions = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'CoursePositions' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_CoursePositions IS NOT NULL
                        EXEC('ALTER TABLE [CoursePositions] DROP CONSTRAINT [' + @constraintName_CoursePositions + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'CoursePositions' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [CoursePositions] ADD CONSTRAINT [DF_CoursePositions_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_CourseLocations NVARCHAR(255);
                    SELECT @constraintName_CourseLocations = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'CourseLocations' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_CourseLocations IS NOT NULL
                        EXEC('ALTER TABLE [CourseLocations] DROP CONSTRAINT [' + @constraintName_CourseLocations + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'CourseLocations' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [CourseLocations] ADD CONSTRAINT [DF_CourseLocations_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_CourseInstructors NVARCHAR(255);
                    SELECT @constraintName_CourseInstructors = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'CourseInstructors' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_CourseInstructors IS NOT NULL
                        EXEC('ALTER TABLE [CourseInstructors] DROP CONSTRAINT [' + @constraintName_CourseInstructors + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'CourseInstructors' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [CourseInstructors] ADD CONSTRAINT [DF_CourseInstructors_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_CourseEmployees NVARCHAR(255);
                    SELECT @constraintName_CourseEmployees = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'CourseEmployees' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_CourseEmployees IS NOT NULL
                        EXEC('ALTER TABLE [CourseEmployees] DROP CONSTRAINT [' + @constraintName_CourseEmployees + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'CourseEmployees' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [CourseEmployees] ADD CONSTRAINT [DF_CourseEmployees_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_Countries NVARCHAR(255);
                    SELECT @constraintName_Countries = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'Countries' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_Countries IS NOT NULL
                        EXEC('ALTER TABLE [Countries] DROP CONSTRAINT [' + @constraintName_Countries + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'Countries' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [Countries] ADD CONSTRAINT [DF_Countries_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_CompaniesAssignedToUsers NVARCHAR(255);
                    SELECT @constraintName_CompaniesAssignedToUsers = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'CompaniesAssignedToUsers' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_CompaniesAssignedToUsers IS NOT NULL
                        EXEC('ALTER TABLE [CompaniesAssignedToUsers] DROP CONSTRAINT [' + @constraintName_CompaniesAssignedToUsers + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'CompaniesAssignedToUsers' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [CompaniesAssignedToUsers] ADD CONSTRAINT [DF_CompaniesAssignedToUsers_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_Companies NVARCHAR(255);
                    SELECT @constraintName_Companies = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'Companies' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_Companies IS NOT NULL
                        EXEC('ALTER TABLE [Companies] DROP CONSTRAINT [' + @constraintName_Companies + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'Companies' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [Companies] ADD CONSTRAINT [DF_Companies_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_ClassRooms NVARCHAR(255);
                    SELECT @constraintName_ClassRooms = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'ClassRooms' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_ClassRooms IS NOT NULL
                        EXEC('ALTER TABLE [ClassRooms] DROP CONSTRAINT [' + @constraintName_ClassRooms + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'ClassRooms' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [ClassRooms] ADD CONSTRAINT [DF_ClassRooms_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_CalendarHolidays NVARCHAR(255);
                    SELECT @constraintName_CalendarHolidays = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'CalendarHolidays' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_CalendarHolidays IS NOT NULL
                        EXEC('ALTER TABLE [CalendarHolidays] DROP CONSTRAINT [' + @constraintName_CalendarHolidays + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'CalendarHolidays' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [CalendarHolidays] ADD CONSTRAINT [DF_CalendarHolidays_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_BatchHistories NVARCHAR(255);
                    SELECT @constraintName_BatchHistories = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = 'BatchHistories' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_BatchHistories IS NOT NULL
                        EXEC('ALTER TABLE [BatchHistories] DROP CONSTRAINT [' + @constraintName_BatchHistories + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = 'BatchHistories' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [BatchHistories] ADD CONSTRAINT [DF_BatchHistories_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                


                IF EXISTS (SELECT 1 FROM sys.identity_columns WHERE OBJECT_NAME(object_id) = 'UserGridViews' AND name = 'RecId')
                    AND NOT EXISTS (SELECT 1 FROM sys.columns WHERE OBJECT_NAME(object_id) = 'UserGridViews' AND name = 'RecId_New')
                BEGIN
                    ALTER TABLE [UserGridViews] ADD [RecId_New] bigint NULL;
                END
            


                IF EXISTS (SELECT 1 FROM sys.columns WHERE OBJECT_NAME(object_id) = 'UserGridViews' AND name = 'RecId_New')
                BEGIN
                    UPDATE [UserGridViews] SET [RecId_New] = [RecId] WHERE [RecId_New] IS NULL;
                END
            


                IF EXISTS (SELECT 1 FROM sys.identity_columns WHERE OBJECT_NAME(object_id) = 'UserGridViews' AND name = 'RecId')
                BEGIN
                    -- Eliminar índices que dependen de RecId
                    DECLARE @sql NVARCHAR(MAX) = '';
                    SELECT @sql = @sql + 'DROP INDEX [' + i.name + '] ON [UserGridViews];'
                    FROM sys.indexes i
                    JOIN sys.index_columns ic ON i.object_id = ic.object_id AND i.index_id = ic.index_id
                    JOIN sys.columns c ON ic.object_id = c.object_id AND ic.column_id = c.column_id
                    WHERE OBJECT_NAME(i.object_id) = 'UserGridViews' AND c.name = 'RecId' AND i.is_primary_key = 0;
                    EXEC sp_executesql @sql;

                    -- Eliminar primary key
                    DECLARE @pkName NVARCHAR(255);
                    SELECT @pkName = name FROM sys.key_constraints WHERE parent_object_id = OBJECT_ID('UserGridViews') AND type = 'PK';
                    IF @pkName IS NOT NULL
                        EXEC('ALTER TABLE [UserGridViews] DROP CONSTRAINT [' + @pkName + ']');

                    -- Eliminar columna original con IDENTITY
                    ALTER TABLE [UserGridViews] DROP COLUMN [RecId];

                    -- Renombrar columna nueva
                    EXEC sp_rename 'UserGridViews.RecId_New', 'RecId', 'COLUMN';

                    -- Hacer NOT NULL
                    ALTER TABLE [UserGridViews] ALTER COLUMN [RecId] bigint NOT NULL;

                    -- Agregar primary key
                    ALTER TABLE [UserGridViews] ADD CONSTRAINT [PK_UserGridViews] PRIMARY KEY ([RecId]);

                    -- Agregar default de secuencia
                    ALTER TABLE [UserGridViews] ADD CONSTRAINT [DF_UserGridViews_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                END
            

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20251129133225_ConfigureRecIdSequenceForAllEntities', N'9.0.2');


                IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('EmployeeHistories') AND name = 'RecId')
                BEGIN
                    ALTER TABLE EmployeeHistories ADD RecId bigint NOT NULL DEFAULT (NEXT VALUE FOR dbo.RecId);
                END

                IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('EmployeeHistories') AND name = 'CreatedBy')
                BEGIN
                    ALTER TABLE EmployeeHistories ADD CreatedBy nvarchar(20) NULL;
                END

                IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('EmployeeHistories') AND name = 'CreatedOn')
                BEGIN
                    ALTER TABLE EmployeeHistories ADD CreatedOn datetime2 NOT NULL DEFAULT GETUTCDATE();
                END

                IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('EmployeeHistories') AND name = 'ModifiedBy')
                BEGIN
                    ALTER TABLE EmployeeHistories ADD ModifiedBy nvarchar(20) NULL;
                END

                IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('EmployeeHistories') AND name = 'ModifiedOn')
                BEGIN
                    ALTER TABLE EmployeeHistories ADD ModifiedOn datetime2 NOT NULL DEFAULT GETUTCDATE();
                END

                IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('EmployeeHistories') AND name = 'IsDeleted')
                BEGIN
                    ALTER TABLE EmployeeHistories ADD IsDeleted bit NOT NULL DEFAULT 0;
                END

                IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('EmployeeHistories') AND name = 'DeletedBy')
                BEGIN
                    ALTER TABLE EmployeeHistories ADD DeletedBy nvarchar(20) NULL;
                END

                IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('EmployeeHistories') AND name = 'DeletedOn')
                BEGIN
                    ALTER TABLE EmployeeHistories ADD DeletedOn datetime2 NULL;
                END

                IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('EmployeeHistories') AND name = 'DataAreaId')
                BEGIN
                    ALTER TABLE EmployeeHistories ADD DataAreaId nvarchar(10) NULL;
                END
            

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20251129152837_AddAuditColumnsToEmployeeHistories', N'9.0.2');

DECLARE @var220 sysname;
SELECT @var220 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[CoursePositions]') AND [c].[name] = N'Comment');
IF @var220 IS NOT NULL EXEC(N'ALTER TABLE [CoursePositions] DROP CONSTRAINT [' + @var220 + '];');
ALTER TABLE [CoursePositions] ALTER COLUMN [Comment] nvarchar(300) NULL;

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20251130143449_MakeCommentNullableInCoursePosition', N'9.0.2');

DECLARE @var221 sysname;
SELECT @var221 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[CourseInstructors]') AND [c].[name] = N'Comment');
IF @var221 IS NOT NULL EXEC(N'ALTER TABLE [CourseInstructors] DROP CONSTRAINT [' + @var221 + '];');
ALTER TABLE [CourseInstructors] ALTER COLUMN [Comment] nvarchar(300) NULL;

DECLARE @var222 sysname;
SELECT @var222 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[CourseEmployees]') AND [c].[name] = N'Comment');
IF @var222 IS NOT NULL EXEC(N'ALTER TABLE [CourseEmployees] DROP CONSTRAINT [' + @var222 + '];');
ALTER TABLE [CourseEmployees] ALTER COLUMN [Comment] nvarchar(300) NULL;

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20251130145128_MakeCommentNullableInCourseEmployeeAndInstructor', N'9.0.2');

CREATE SEQUENCE [SeveranceProcessDetailId] AS int START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 999999999 NO CYCLE;

CREATE SEQUENCE [SeveranceProcessId] AS int START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 999999999 NO CYCLE;

ALTER TABLE [EarningCodes] ADD [IsSeverance] bit NOT NULL DEFAULT CAST(0 AS bit);

CREATE TABLE [SeveranceProcesses] (
    [SeveranceProcessId] nvarchar(20) NOT NULL DEFAULT (FORMAT((NEXT VALUE FOR dbo.SeveranceProcessId),'PRES-00000000#')),
    [Description] nvarchar(200) NULL,
    [ProcessDate] datetime2 NOT NULL,
    [EmployeeQuantity] int NOT NULL DEFAULT 0,
    [TotalPreaviso] decimal(18,2) NOT NULL DEFAULT 0.0,
    [TotalCesantia] decimal(18,2) NOT NULL DEFAULT 0.0,
    [TotalVacaciones] decimal(18,2) NOT NULL DEFAULT 0.0,
    [TotalNavidad] decimal(18,2) NOT NULL DEFAULT 0.0,
    [TotalGeneral] decimal(18,2) NOT NULL DEFAULT 0.0,
    [SeveranceProcessStatus] int NOT NULL DEFAULT 0,
    [RecId] bigint NOT NULL DEFAULT (NEXT VALUE FOR dbo.RecId),
    [CreatedBy] nvarchar(20) NULL,
    [CreatedOn] datetime2 NOT NULL,
    [ModifiedBy] nvarchar(20) NULL,
    [ModifiedOn] datetime2 NOT NULL,
    [IsDeleted] bit NOT NULL,
    [DeletedBy] nvarchar(20) NULL,
    [DeletedOn] datetime2 NULL,
    [DataAreaId] nvarchar(10) NULL,
    CONSTRAINT [PK_SeveranceProcesses] PRIMARY KEY ([SeveranceProcessId])
);

CREATE TABLE [SeveranceProcessDetails] (
    [SeveranceProcessId] nvarchar(20) NOT NULL,
    [EmployeeId] nvarchar(20) NOT NULL,
    [InternalId] int NOT NULL,
    [SeveranceRefRecId] bigint NOT NULL,
    [EmployeeName] nvarchar(150) NULL,
    [Document] nvarchar(50) NULL,
    [StartWorkDate] datetime2 NOT NULL,
    [EndWorkDate] datetime2 NOT NULL,
    [CalculationType] int NOT NULL,
    [PayFrecuency] int NOT NULL,
    [SalaryCalculationType] int NOT NULL,
    [TiempoLaborando] nvarchar(100) NULL,
    [YearsWorked] int NOT NULL,
    [MonthsWorked] int NOT NULL,
    [DaysWorked] int NOT NULL,
    [SalarioMes1] decimal(18,2) NOT NULL DEFAULT 0.0,
    [SalarioMes2] decimal(18,2) NOT NULL DEFAULT 0.0,
    [SalarioMes3] decimal(18,2) NOT NULL DEFAULT 0.0,
    [SalarioMes4] decimal(18,2) NOT NULL DEFAULT 0.0,
    [SalarioMes5] decimal(18,2) NOT NULL DEFAULT 0.0,
    [SalarioMes6] decimal(18,2) NOT NULL DEFAULT 0.0,
    [SalarioMes7] decimal(18,2) NOT NULL DEFAULT 0.0,
    [SalarioMes8] decimal(18,2) NOT NULL DEFAULT 0.0,
    [SalarioMes9] decimal(18,2) NOT NULL DEFAULT 0.0,
    [SalarioMes10] decimal(18,2) NOT NULL DEFAULT 0.0,
    [SalarioMes11] decimal(18,2) NOT NULL DEFAULT 0.0,
    [SalarioMes12] decimal(18,2) NOT NULL DEFAULT 0.0,
    [ComisionMes1] decimal(18,2) NOT NULL DEFAULT 0.0,
    [ComisionMes2] decimal(18,2) NOT NULL DEFAULT 0.0,
    [ComisionMes3] decimal(18,2) NOT NULL DEFAULT 0.0,
    [ComisionMes4] decimal(18,2) NOT NULL DEFAULT 0.0,
    [ComisionMes5] decimal(18,2) NOT NULL DEFAULT 0.0,
    [ComisionMes6] decimal(18,2) NOT NULL DEFAULT 0.0,
    [ComisionMes7] decimal(18,2) NOT NULL DEFAULT 0.0,
    [ComisionMes8] decimal(18,2) NOT NULL DEFAULT 0.0,
    [ComisionMes9] decimal(18,2) NOT NULL DEFAULT 0.0,
    [ComisionMes10] decimal(18,2) NOT NULL DEFAULT 0.0,
    [ComisionMes11] decimal(18,2) NOT NULL DEFAULT 0.0,
    [ComisionMes12] decimal(18,2) NOT NULL DEFAULT 0.0,
    [SumaSalarios] decimal(18,2) NOT NULL DEFAULT 0.0,
    [SalarioPromedioMensual] decimal(18,2) NOT NULL DEFAULT 0.0,
    [SalarioPromedioDiario] decimal(18,2) NOT NULL DEFAULT 0.0,
    [WasNotified] bit NOT NULL DEFAULT CAST(0 AS bit),
    [DiasPreaviso] int NOT NULL DEFAULT 0,
    [MontoPreaviso] decimal(18,2) NOT NULL DEFAULT 0.0,
    [IncludeCesantia] bit NOT NULL DEFAULT CAST(1 AS bit),
    [DiasCesantia] int NOT NULL DEFAULT 0,
    [MontoCesantia] decimal(18,2) NOT NULL DEFAULT 0.0,
    [TookVacations] bit NOT NULL DEFAULT CAST(0 AS bit),
    [DiasVacaciones] decimal(18,2) NOT NULL DEFAULT 0.0,
    [MontoVacaciones] decimal(18,2) NOT NULL DEFAULT 0.0,
    [IncludeNavidad] bit NOT NULL DEFAULT CAST(1 AS bit),
    [MesesTrabajadosAnio] int NOT NULL DEFAULT 0,
    [MontoNavidad] decimal(18,2) NOT NULL DEFAULT 0.0,
    [TotalARecibir] decimal(18,2) NOT NULL DEFAULT 0.0,
    [Comments] nvarchar(500) NULL,
    [RecId] bigint NOT NULL DEFAULT (NEXT VALUE FOR dbo.RecId),
    [CreatedBy] nvarchar(20) NULL,
    [CreatedOn] datetime2 NOT NULL,
    [ModifiedBy] nvarchar(20) NULL,
    [ModifiedOn] datetime2 NOT NULL,
    [IsDeleted] bit NOT NULL,
    [DeletedBy] nvarchar(20) NULL,
    [DeletedOn] datetime2 NULL,
    [DataAreaId] nvarchar(10) NULL,
    CONSTRAINT [PK_SeveranceProcessDetails] PRIMARY KEY ([SeveranceProcessId], [EmployeeId]),
    CONSTRAINT [FK_SeveranceProcessDetails_Employees_EmployeeId] FOREIGN KEY ([EmployeeId]) REFERENCES [Employees] ([EmployeeId]),
    CONSTRAINT [FK_SeveranceProcessDetails_SeveranceProcesses_SeveranceProcessId] FOREIGN KEY ([SeveranceProcessId]) REFERENCES [SeveranceProcesses] ([SeveranceProcessId]) ON DELETE CASCADE
);

CREATE INDEX [IX_SeveranceProcessDetails_EmployeeId] ON [SeveranceProcessDetails] ([EmployeeId]);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20251202201316_SeveranceProcess', N'9.0.2');

COMMIT;
GO

