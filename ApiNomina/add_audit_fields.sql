-- Script para agregar campos de auditoría a tablas faltantes
-- Tablas identificadas: CalendarHolidays, Countries, Currencies, DisabilityTypes,
-- EducationLevels, EmployeeHistories, FormatCodes, GeneralConfigs, Occupations, Provinces

-- FormatCodes
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('FormatCodes') AND name = 'RecId')
BEGIN
    ALTER TABLE FormatCodes ADD RecId BIGINT NOT NULL DEFAULT 0;
    ALTER TABLE FormatCodes ADD CreatedBy NVARCHAR(20) NULL;
    ALTER TABLE FormatCodes ADD CreatedOn DATETIME2 NOT NULL DEFAULT GETDATE();
    ALTER TABLE FormatCodes ADD ModifiedBy NVARCHAR(20) NULL;
    ALTER TABLE FormatCodes ADD ModifiedOn DATETIME2 NOT NULL DEFAULT GETDATE();
    ALTER TABLE FormatCodes ADD IsDeleted BIT NOT NULL DEFAULT 0;
    ALTER TABLE FormatCodes ADD DeletedBy NVARCHAR(20) NULL;
    ALTER TABLE FormatCodes ADD DeletedOn DATETIME2 NULL;
    PRINT 'Campos de auditoría agregados a FormatCodes';
END

-- Countries
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('Countries') AND name = 'RecId')
BEGIN
    ALTER TABLE Countries ADD RecId BIGINT NOT NULL DEFAULT 0;
    ALTER TABLE Countries ADD CreatedBy NVARCHAR(20) NULL;
    ALTER TABLE Countries ADD CreatedOn DATETIME2 NOT NULL DEFAULT GETDATE();
    ALTER TABLE Countries ADD ModifiedBy NVARCHAR(20) NULL;
    ALTER TABLE Countries ADD ModifiedOn DATETIME2 NOT NULL DEFAULT GETDATE();
    ALTER TABLE Countries ADD IsDeleted BIT NOT NULL DEFAULT 0;
    ALTER TABLE Countries ADD DeletedBy NVARCHAR(20) NULL;
    ALTER TABLE Countries ADD DeletedOn DATETIME2 NULL;
    PRINT 'Campos de auditoría agregados a Countries';
END

-- Currencies
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('Currencies') AND name = 'RecId')
BEGIN
    ALTER TABLE Currencies ADD RecId BIGINT NOT NULL DEFAULT 0;
    ALTER TABLE Currencies ADD CreatedBy NVARCHAR(20) NULL;
    ALTER TABLE Currencies ADD CreatedOn DATETIME2 NOT NULL DEFAULT GETDATE();
    ALTER TABLE Currencies ADD ModifiedBy NVARCHAR(20) NULL;
    ALTER TABLE Currencies ADD ModifiedOn DATETIME2 NOT NULL DEFAULT GETDATE();
    ALTER TABLE Currencies ADD IsDeleted BIT NOT NULL DEFAULT 0;
    ALTER TABLE Currencies ADD DeletedBy NVARCHAR(20) NULL;
    ALTER TABLE Currencies ADD DeletedOn DATETIME2 NULL;
    PRINT 'Campos de auditoría agregados a Currencies';
END

-- DisabilityTypes
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('DisabilityTypes') AND name = 'RecId')
BEGIN
    ALTER TABLE DisabilityTypes ADD RecId BIGINT NOT NULL DEFAULT 0;
    ALTER TABLE DisabilityTypes ADD CreatedBy NVARCHAR(20) NULL;
    ALTER TABLE DisabilityTypes ADD CreatedOn DATETIME2 NOT NULL DEFAULT GETDATE();
    ALTER TABLE DisabilityTypes ADD ModifiedBy NVARCHAR(20) NULL;
    ALTER TABLE DisabilityTypes ADD ModifiedOn DATETIME2 NOT NULL DEFAULT GETDATE();
    ALTER TABLE DisabilityTypes ADD IsDeleted BIT NOT NULL DEFAULT 0;
    ALTER TABLE DisabilityTypes ADD DeletedBy NVARCHAR(20) NULL;
    ALTER TABLE DisabilityTypes ADD DeletedOn DATETIME2 NULL;
    PRINT 'Campos de auditoría agregados a DisabilityTypes';
END

-- EducationLevels
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('EducationLevels') AND name = 'RecId')
BEGIN
    ALTER TABLE EducationLevels ADD RecId BIGINT NOT NULL DEFAULT 0;
    ALTER TABLE EducationLevels ADD CreatedBy NVARCHAR(20) NULL;
    ALTER TABLE EducationLevels ADD CreatedOn DATETIME2 NOT NULL DEFAULT GETDATE();
    ALTER TABLE EducationLevels ADD ModifiedBy NVARCHAR(20) NULL;
    ALTER TABLE EducationLevels ADD ModifiedOn DATETIME2 NOT NULL DEFAULT GETDATE();
    ALTER TABLE EducationLevels ADD IsDeleted BIT NOT NULL DEFAULT 0;
    ALTER TABLE EducationLevels ADD DeletedBy NVARCHAR(20) NULL;
    ALTER TABLE EducationLevels ADD DeletedOn DATETIME2 NULL;
    PRINT 'Campos de auditoría agregados a EducationLevels';
END

-- EmployeeHistories
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('EmployeeHistories') AND name = 'RecId')
BEGIN
    ALTER TABLE EmployeeHistories ADD RecId BIGINT NOT NULL DEFAULT 0;
    ALTER TABLE EmployeeHistories ADD CreatedBy NVARCHAR(20) NULL;
    ALTER TABLE EmployeeHistories ADD CreatedOn DATETIME2 NOT NULL DEFAULT GETDATE();
    ALTER TABLE EmployeeHistories ADD ModifiedBy NVARCHAR(20) NULL;
    ALTER TABLE EmployeeHistories ADD ModifiedOn DATETIME2 NOT NULL DEFAULT GETDATE();
    ALTER TABLE EmployeeHistories ADD IsDeleted BIT NOT NULL DEFAULT 0;
    ALTER TABLE EmployeeHistories ADD DeletedBy NVARCHAR(20) NULL;
    ALTER TABLE EmployeeHistories ADD DeletedOn DATETIME2 NULL;
    PRINT 'Campos de auditoría agregados a EmployeeHistories';
END

-- CalendarHolidays
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('CalendarHolidays') AND name = 'RecId')
BEGIN
    ALTER TABLE CalendarHolidays ADD RecId BIGINT NOT NULL DEFAULT 0;
    ALTER TABLE CalendarHolidays ADD CreatedBy NVARCHAR(20) NULL;
    ALTER TABLE CalendarHolidays ADD CreatedOn DATETIME2 NOT NULL DEFAULT GETDATE();
    ALTER TABLE CalendarHolidays ADD ModifiedBy NVARCHAR(20) NULL;
    ALTER TABLE CalendarHolidays ADD ModifiedOn DATETIME2 NOT NULL DEFAULT GETDATE();
    ALTER TABLE CalendarHolidays ADD IsDeleted BIT NOT NULL DEFAULT 0;
    ALTER TABLE CalendarHolidays ADD DeletedBy NVARCHAR(20) NULL;
    ALTER TABLE CalendarHolidays ADD DeletedOn DATETIME2 NULL;
    PRINT 'Campos de auditoría agregados a CalendarHolidays';
END

-- GeneralConfigs
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('GeneralConfigs') AND name = 'RecId')
BEGIN
    ALTER TABLE GeneralConfigs ADD RecId BIGINT NOT NULL DEFAULT 0;
    ALTER TABLE GeneralConfigs ADD CreatedBy NVARCHAR(20) NULL;
    ALTER TABLE GeneralConfigs ADD CreatedOn DATETIME2 NOT NULL DEFAULT GETDATE();
    ALTER TABLE GeneralConfigs ADD ModifiedBy NVARCHAR(20) NULL;
    ALTER TABLE GeneralConfigs ADD ModifiedOn DATETIME2 NOT NULL DEFAULT GETDATE();
    ALTER TABLE GeneralConfigs ADD IsDeleted BIT NOT NULL DEFAULT 0;
    ALTER TABLE GeneralConfigs ADD DeletedBy NVARCHAR(20) NULL;
    ALTER TABLE GeneralConfigs ADD DeletedOn DATETIME2 NULL;
    PRINT 'Campos de auditoría agregados a GeneralConfigs';
END

-- Occupations
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('Occupations') AND name = 'RecId')
BEGIN
    ALTER TABLE Occupations ADD RecId BIGINT NOT NULL DEFAULT 0;
    ALTER TABLE Occupations ADD CreatedBy NVARCHAR(20) NULL;
    ALTER TABLE Occupations ADD CreatedOn DATETIME2 NOT NULL DEFAULT GETDATE();
    ALTER TABLE Occupations ADD ModifiedBy NVARCHAR(20) NULL;
    ALTER TABLE Occupations ADD ModifiedOn DATETIME2 NOT NULL DEFAULT GETDATE();
    ALTER TABLE Occupations ADD IsDeleted BIT NOT NULL DEFAULT 0;
    ALTER TABLE Occupations ADD DeletedBy NVARCHAR(20) NULL;
    ALTER TABLE Occupations ADD DeletedOn DATETIME2 NULL;
    PRINT 'Campos de auditoría agregados a Occupations';
END

-- Provinces
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('Provinces') AND name = 'RecId')
BEGIN
    ALTER TABLE Provinces ADD RecId BIGINT NOT NULL DEFAULT 0;
    ALTER TABLE Provinces ADD CreatedBy NVARCHAR(20) NULL;
    ALTER TABLE Provinces ADD CreatedOn DATETIME2 NOT NULL DEFAULT GETDATE();
    ALTER TABLE Provinces ADD ModifiedBy NVARCHAR(20) NULL;
    ALTER TABLE Provinces ADD ModifiedOn DATETIME2 NOT NULL DEFAULT GETDATE();
    ALTER TABLE Provinces ADD IsDeleted BIT NOT NULL DEFAULT 0;
    ALTER TABLE Provinces ADD DeletedBy NVARCHAR(20) NULL;
    ALTER TABLE Provinces ADD DeletedOn DATETIME2 NULL;
    PRINT 'Campos de auditoría agregados a Provinces';
END

PRINT 'Script completado exitosamente';
