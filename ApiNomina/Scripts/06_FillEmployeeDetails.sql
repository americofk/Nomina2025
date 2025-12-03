-- ============================================================================
-- Script: 06_FillEmployeeDetails.sql
-- Descripcion: Crea direcciones, contactos, documentos y cuentas bancarias
--              para todos los empleados contratados
-- Autor: Equipo de Desarrollo
-- Fecha: 2025-12-03
-- ============================================================================

SET NOCOUNT ON;

PRINT '========================================';
PRINT 'LLENADO DE DATOS DE EMPLEADOS';
PRINT '========================================';
PRINT '';

DECLARE @DataAreaId NVARCHAR(20) = 'Farm';

-- ============================================================================
-- DATOS DE REFERENCIA
-- ============================================================================

-- Calles de Santo Domingo
DECLARE @Calles TABLE (Id INT IDENTITY(1,1), Calle NVARCHAR(100));
INSERT INTO @Calles (Calle) VALUES
('Av. 27 de Febrero'), ('Av. Winston Churchill'), ('Av. Abraham Lincoln'), ('Av. John F. Kennedy'),
('Av. Independencia'), ('Av. Maximo Gomez'), ('Av. George Washington'), ('Av. Tiradentes'),
('Av. Romulo Betancourt'), ('Av. Sarasota'), ('Av. Luperon'), ('Av. Nunez de Caceres'),
('Calle El Conde'), ('Calle Las Mercedes'), ('Calle Arzobispo Merino'), ('Calle Hostos'),
('Calle Duarte'), ('Calle Sanchez'), ('Calle Mella'), ('Calle Jose Reyes'),
('Av. Los Proceres'), ('Av. Ortega y Gasset'), ('Av. Roberto Pastoriza'), ('Av. Gustavo Mejia Ricart'),
('Calle Jose Contreras'), ('Calle Santiago'), ('Calle Pedro Livio Cedeno'), ('Calle Fantino Falco'),
('Av. Anacaona'), ('Av. Bolivar'), ('Calle Max Henriquez Urena'), ('Calle Cayetano Rodriguez');

-- Sectores de Santo Domingo
DECLARE @Sectores TABLE (Id INT IDENTITY(1,1), Sector NVARCHAR(50), Ciudad NVARCHAR(50), Provincia NVARCHAR(10));
INSERT INTO @Sectores (Sector, Ciudad, Provincia) VALUES
('Piantini', 'Santo Domingo', '01'), ('Naco', 'Santo Domingo', '01'), ('Evaristo Morales', 'Santo Domingo', '01'),
('Bella Vista', 'Santo Domingo', '01'), ('Gazcue', 'Santo Domingo', '01'), ('Zona Colonial', 'Santo Domingo', '01'),
('Los Prados', 'Santo Domingo', '01'), ('Arroyo Hondo', 'Santo Domingo', '01'), ('La Julia', 'Santo Domingo', '01'),
('Serralles', 'Santo Domingo', '01'), ('Paraiso', 'Santo Domingo', '01'), ('Julieta', 'Santo Domingo', '01'),
('Villa Juana', 'Santo Domingo', '32'), ('Los Mina', 'Santo Domingo Este', '32'), ('Alma Rosa', 'Santo Domingo Este', '32'),
('Villa Faro', 'Santo Domingo Este', '32'), ('Los Alcarrizos', 'Los Alcarrizos', '32'), ('Pedro Brand', 'Pedro Brand', '32'),
('Herrera', 'Santo Domingo Oeste', '32'), ('Manoguayabo', 'Santo Domingo Oeste', '32'), ('Los Rios', 'Santo Domingo', '01'),
('La Esperilla', 'Santo Domingo', '01'), ('Mirador Sur', 'Santo Domingo', '01'), ('Mirador Norte', 'Santo Domingo', '01'),
('Ensanche Ozama', 'Santo Domingo', '32'), ('Villa Consuelo', 'Santo Domingo', '01'), ('Cristo Rey', 'Santo Domingo', '01'),
('Capotillo', 'Santo Domingo', '01'), ('La Fe', 'Santo Domingo', '01'), ('Gualey', 'Santo Domingo', '01');

-- Bancos dominicanos
DECLARE @Bancos TABLE (Id INT IDENTITY(1,1), Banco NVARCHAR(100));
INSERT INTO @Bancos (Banco) VALUES
('Banco Popular Dominicano'), ('Banco de Reservas'), ('Banco BHD Leon'), ('Scotiabank'),
('Banco Santa Cruz'), ('Banco Promerica'), ('Banco Lopez de Haro'), ('Asociacion Popular de Ahorros y Prestamos'),
('Banco Caribe'), ('Banco Vimenca'), ('Banesco'), ('Citibank');

-- Nombres de provincias
DECLARE @Provincias TABLE (Id NVARCHAR(10), Nombre NVARCHAR(50));
INSERT INTO @Provincias VALUES
('01', 'Distrito Nacional'), ('32', 'Santo Domingo'), ('25', 'Santiago'), ('21', 'San Cristobal'),
('13', 'La Vega'), ('23', 'San Pedro de Macoris'), ('12', 'La Romana'), ('18', 'Puerto Plata');

-- ============================================================================
-- 1. CREAR DIRECCIONES
-- ============================================================================
PRINT '1. Creando direcciones de empleados...';

DECLARE @EmployeeId NVARCHAR(20);
DECLARE @Calle NVARCHAR(100);
DECLARE @NumCasa NVARCHAR(10);
DECLARE @Sector NVARCHAR(50);
DECLARE @Ciudad NVARCHAR(50);
DECLARE @Provincia NVARCHAR(10);
DECLARE @ProvinciaNombre NVARCHAR(50);
DECLARE @CalleCount INT, @SectorCount INT;
DECLARE @Counter INT = 0;
DECLARE @InternalId INT;

SELECT @CalleCount = COUNT(*) FROM @Calles;
SELECT @SectorCount = COUNT(*) FROM @Sectores;

DECLARE emp_cursor CURSOR FOR
SELECT EmployeeId FROM Employees
WHERE DataAreaId = @DataAreaId AND WorkStatus = 2 AND IsDeleted = 0
  AND NOT EXISTS (SELECT 1 FROM EmployeesAddress ea WHERE ea.EmployeeId = Employees.EmployeeId AND ea.DataAreaId = @DataAreaId AND ea.IsDeleted = 0)
ORDER BY EmployeeId;

OPEN emp_cursor;
FETCH NEXT FROM emp_cursor INTO @EmployeeId;

WHILE @@FETCH_STATUS = 0
BEGIN
    -- Obtener siguiente InternalId para este empleado
    SELECT @InternalId = ISNULL(MAX(InternalId), 0) + 1 FROM EmployeesAddress WHERE EmployeeId = @EmployeeId AND DataAreaId = @DataAreaId;

    -- Seleccionar calle aleatoria
    SELECT @Calle = Calle FROM @Calles WHERE Id = (ABS(CHECKSUM(NEWID())) % @CalleCount) + 1;

    -- Numero de casa
    SET @NumCasa = CAST((ABS(CHECKSUM(NEWID())) % 500) + 1 AS VARCHAR);

    -- Seleccionar sector aleatorio
    SELECT @Sector = Sector, @Ciudad = Ciudad, @Provincia = Provincia
    FROM @Sectores WHERE Id = (ABS(CHECKSUM(NEWID())) % @SectorCount) + 1;

    -- Nombre de provincia
    SELECT @ProvinciaNombre = Nombre FROM @Provincias WHERE Id = @Provincia;
    IF @ProvinciaNombre IS NULL SET @ProvinciaNombre = 'Santo Domingo';

    -- Insertar direccion principal
    INSERT INTO EmployeesAddress (InternalId, EmployeeId, Street, Home, Sector, City, Province, ProvinceName, Comment, IsPrincipal, CountryId, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
    VALUES (@InternalId, @EmployeeId, @Calle, @NumCasa, @Sector, @Ciudad, @Provincia, @ProvinciaNombre, 'Direccion de residencia', 1, 'DOM', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

    SET @Counter = @Counter + 1;

    FETCH NEXT FROM emp_cursor INTO @EmployeeId;
END

CLOSE emp_cursor;
DEALLOCATE emp_cursor;

PRINT '   - ' + CAST(@Counter AS VARCHAR) + ' direcciones creadas';

-- ============================================================================
-- 2. CREAR INFORMACION DE CONTACTO
-- ============================================================================
PRINT '2. Creando informacion de contacto...';

SET @Counter = 0;

DECLARE @Telefono NVARCHAR(20);
DECLARE @Email NVARCHAR(200);
DECLARE @Celular NVARCHAR(20);
DECLARE @NombreEmpleado NVARCHAR(50);
DECLARE @ApellidoEmpleado NVARCHAR(100);
DECLARE @ContactInternalId INT;

DECLARE contact_cursor CURSOR FOR
SELECT EmployeeId, Name, LastName FROM Employees
WHERE DataAreaId = @DataAreaId AND WorkStatus = 2 AND IsDeleted = 0
  AND NOT EXISTS (SELECT 1 FROM EmployeeContactsInf ec WHERE ec.EmployeeId = Employees.EmployeeId AND ec.DataAreaId = @DataAreaId AND ec.IsDeleted = 0)
ORDER BY EmployeeId;

OPEN contact_cursor;
FETCH NEXT FROM contact_cursor INTO @EmployeeId, @NombreEmpleado, @ApellidoEmpleado;

WHILE @@FETCH_STATUS = 0
BEGIN
    -- Obtener siguiente InternalId
    SELECT @ContactInternalId = ISNULL(MAX(InternalId), 0) FROM EmployeeContactsInf WHERE EmployeeId = @EmployeeId AND DataAreaId = @DataAreaId;

    -- Generar celular (809, 829, 849)
    SET @Celular = CASE ABS(CHECKSUM(NEWID())) % 3
        WHEN 0 THEN '809-'
        WHEN 1 THEN '829-'
        ELSE '849-'
    END + RIGHT('000' + CAST((ABS(CHECKSUM(NEWID())) % 900) + 100 AS VARCHAR), 3) + '-' +
          RIGHT('0000' + CAST((ABS(CHECKSUM(NEWID())) % 9000) + 1000 AS VARCHAR), 4);

    -- Generar telefono fijo
    SET @Telefono = '809-' + RIGHT('000' + CAST((ABS(CHECKSUM(NEWID())) % 900) + 100 AS VARCHAR), 3) + '-' +
                    RIGHT('0000' + CAST((ABS(CHECKSUM(NEWID())) % 9000) + 1000 AS VARCHAR), 4);

    -- Generar email
    SET @Email = LOWER(REPLACE(REPLACE(@NombreEmpleado, ' ', '.'), '''', '')) + '.' +
                 LOWER(REPLACE(REPLACE(LEFT(@ApellidoEmpleado, CHARINDEX(' ', @ApellidoEmpleado + ' ') - 1), ' ', ''), '''', '')) +
                 '@farmacia365.com';

    -- Insertar celular (principal)
    SET @ContactInternalId = @ContactInternalId + 1;
    INSERT INTO EmployeeContactsInf (InternalId, EmployeeId, NumberAddress, Comment, IsPrincipal, ContactType, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
    VALUES (@ContactInternalId, @EmployeeId, @Celular, 'Celular personal', 1, 0, @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0); -- ContactType 0 = MobilePhone

    -- Insertar email
    SET @ContactInternalId = @ContactInternalId + 1;
    INSERT INTO EmployeeContactsInf (InternalId, EmployeeId, NumberAddress, Comment, IsPrincipal, ContactType, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
    VALUES (@ContactInternalId, @EmployeeId, @Email, 'Correo corporativo', 0, 1, @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0); -- ContactType 1 = Email

    -- Insertar telefono fijo (50% de empleados)
    IF ABS(CHECKSUM(NEWID())) % 2 = 0
    BEGIN
        SET @ContactInternalId = @ContactInternalId + 1;
        INSERT INTO EmployeeContactsInf (InternalId, EmployeeId, NumberAddress, Comment, IsPrincipal, ContactType, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
        VALUES (@ContactInternalId, @EmployeeId, @Telefono, 'Telefono residencia', 0, 2, @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0); -- ContactType 2 = Phone
    END

    SET @Counter = @Counter + 1;

    FETCH NEXT FROM contact_cursor INTO @EmployeeId, @NombreEmpleado, @ApellidoEmpleado;
END

CLOSE contact_cursor;
DEALLOCATE contact_cursor;

PRINT '   - ' + CAST(@Counter AS VARCHAR) + ' empleados con contactos creados';

-- ============================================================================
-- 3. CREAR DOCUMENTOS
-- ============================================================================
PRINT '3. Creando documentos de empleados...';

SET @Counter = 0;

DECLARE @Cedula NVARCHAR(30);
DECLARE @NSS NVARCHAR(30);
DECLARE @DocInternalId INT;

DECLARE doc_cursor CURSOR FOR
SELECT EmployeeId, NSS FROM Employees
WHERE DataAreaId = @DataAreaId AND WorkStatus = 2 AND IsDeleted = 0
  AND NOT EXISTS (SELECT 1 FROM EmployeeDocuments ed WHERE ed.EmployeeId = Employees.EmployeeId AND ed.DataAreaId = @DataAreaId AND ed.IsDeleted = 0)
ORDER BY EmployeeId;

OPEN doc_cursor;
FETCH NEXT FROM doc_cursor INTO @EmployeeId, @NSS;

WHILE @@FETCH_STATUS = 0
BEGIN
    -- Obtener siguiente InternalId
    SELECT @DocInternalId = ISNULL(MAX(InternalId), 0) FROM EmployeeDocuments WHERE EmployeeId = @EmployeeId AND DataAreaId = @DataAreaId;

    -- Generar cedula (formato: 001-0000000-0)
    SET @Cedula = RIGHT('000' + CAST((ABS(CHECKSUM(NEWID())) % 32) + 1 AS VARCHAR), 3) + '-' +
                  RIGHT('0000000' + CAST((ABS(CHECKSUM(NEWID())) % 9000000) + 1000000 AS VARCHAR), 7) + '-' +
                  CAST(ABS(CHECKSUM(NEWID())) % 10 AS VARCHAR);

    -- Insertar cedula (documento principal)
    SET @DocInternalId = @DocInternalId + 1;
    INSERT INTO EmployeeDocuments (InternalId, EmployeeId, DocumentType, DocumentNumber, DueDate, Comment, IsPrincipal, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
    VALUES (@DocInternalId, @EmployeeId, 0, @Cedula, DATEADD(YEAR, 4, GETDATE()), 'Cedula de identidad', 1, @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0); -- DocumentType 0 = IdentificationCard

    -- Insertar NSS si no es N/A
    IF @NSS IS NOT NULL AND @NSS <> 'N/A' AND LEN(@NSS) > 5
    BEGIN
        SET @DocInternalId = @DocInternalId + 1;
        INSERT INTO EmployeeDocuments (InternalId, EmployeeId, DocumentType, DocumentNumber, DueDate, Comment, IsPrincipal, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
        VALUES (@DocInternalId, @EmployeeId, 2, @NSS, NULL, 'Numero de Seguro Social', 0, @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0); -- DocumentType 2 = SocialSecurityNumber
    END

    SET @Counter = @Counter + 1;

    FETCH NEXT FROM doc_cursor INTO @EmployeeId, @NSS;
END

CLOSE doc_cursor;
DEALLOCATE doc_cursor;

PRINT '   - ' + CAST(@Counter AS VARCHAR) + ' empleados con documentos creados';

-- ============================================================================
-- 4. CREAR CUENTAS BANCARIAS
-- ============================================================================
PRINT '4. Creando cuentas bancarias...';

SET @Counter = 0;

DECLARE @Banco NVARCHAR(100);
DECLARE @NumeroCuenta NVARCHAR(30);
DECLARE @TipoCuenta INT;
DECLARE @BancoCount INT;
DECLARE @BankInternalId INT;

SELECT @BancoCount = COUNT(*) FROM @Bancos;

DECLARE bank_cursor CURSOR FOR
SELECT EmployeeId FROM Employees
WHERE DataAreaId = @DataAreaId AND WorkStatus = 2 AND IsDeleted = 0
  AND NOT EXISTS (SELECT 1 FROM EmployeeBankAccounts eb WHERE eb.EmployeeId = Employees.EmployeeId AND eb.DataAreaId = @DataAreaId AND eb.IsDeleted = 0)
ORDER BY EmployeeId;

OPEN bank_cursor;
FETCH NEXT FROM bank_cursor INTO @EmployeeId;

WHILE @@FETCH_STATUS = 0
BEGIN
    -- Obtener siguiente InternalId
    SELECT @BankInternalId = ISNULL(MAX(InternalId), 0) + 1 FROM EmployeeBankAccounts WHERE EmployeeId = @EmployeeId AND DataAreaId = @DataAreaId;

    -- Seleccionar banco aleatorio
    SELECT @Banco = Banco FROM @Bancos WHERE Id = (ABS(CHECKSUM(NEWID())) % @BancoCount) + 1;

    -- Generar numero de cuenta (formato bancario dominicano)
    SET @NumeroCuenta = RIGHT('0000' + CAST((ABS(CHECKSUM(NEWID())) % 9000) + 1000 AS VARCHAR), 4) + '-' +
                        RIGHT('0000' + CAST((ABS(CHECKSUM(NEWID())) % 9000) + 1000 AS VARCHAR), 4) + '-' +
                        RIGHT('0000' + CAST((ABS(CHECKSUM(NEWID())) % 9000) + 1000 AS VARCHAR), 4) + '-' +
                        RIGHT('00' + CAST((ABS(CHECKSUM(NEWID())) % 90) + 10 AS VARCHAR), 2);

    -- Tipo de cuenta (70% ahorro, 30% corriente)
    SET @TipoCuenta = CASE WHEN ABS(CHECKSUM(NEWID())) % 10 < 7 THEN 0 ELSE 1 END;

    -- Insertar cuenta bancaria principal
    INSERT INTO EmployeeBankAccounts (InternalId, EmployeeId, BankName, AccountType, AccountNum, Comment, IsPrincipal, Currency, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
    VALUES (@BankInternalId, @EmployeeId, @Banco, @TipoCuenta, @NumeroCuenta, 'Cuenta para nomina', 1, 'DOP', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

    SET @Counter = @Counter + 1;

    FETCH NEXT FROM bank_cursor INTO @EmployeeId;
END

CLOSE bank_cursor;
DEALLOCATE bank_cursor;

PRINT '   - ' + CAST(@Counter AS VARCHAR) + ' cuentas bancarias creadas';

-- ============================================================================
-- 5. RESUMEN
-- ============================================================================
PRINT '';
PRINT '========================================';
PRINT 'DATOS DE EMPLEADOS COMPLETADOS';
PRINT '========================================';
PRINT '';

DECLARE @TotalEmpleados INT;
DECLARE @ConDireccion INT, @ConContacto INT, @ConDocumentos INT, @ConCuenta INT;

SELECT @TotalEmpleados = COUNT(*) FROM Employees WHERE DataAreaId = @DataAreaId AND WorkStatus = 2 AND IsDeleted = 0;
SELECT @ConDireccion = COUNT(DISTINCT EmployeeId) FROM EmployeesAddress WHERE DataAreaId = @DataAreaId AND IsDeleted = 0;
SELECT @ConContacto = COUNT(DISTINCT EmployeeId) FROM EmployeeContactsInf WHERE DataAreaId = @DataAreaId AND IsDeleted = 0;
SELECT @ConDocumentos = COUNT(DISTINCT EmployeeId) FROM EmployeeDocuments WHERE DataAreaId = @DataAreaId AND IsDeleted = 0;
SELECT @ConCuenta = COUNT(DISTINCT EmployeeId) FROM EmployeeBankAccounts WHERE DataAreaId = @DataAreaId AND IsDeleted = 0;

PRINT 'Resumen:';
PRINT '  - Total empleados contratados: ' + CAST(@TotalEmpleados AS VARCHAR);
PRINT '  - Empleados con direccion: ' + CAST(@ConDireccion AS VARCHAR);
PRINT '  - Empleados con contactos: ' + CAST(@ConContacto AS VARCHAR);
PRINT '  - Empleados con documentos: ' + CAST(@ConDocumentos AS VARCHAR);
PRINT '  - Empleados con cuenta bancaria: ' + CAST(@ConCuenta AS VARCHAR);
PRINT '';

-- Detalle de contactos
PRINT 'Detalle de informacion de contacto:';
SELECT
    CASE ContactType
        WHEN 0 THEN 'Celular'
        WHEN 1 THEN 'Email'
        WHEN 2 THEN 'Telefono Fijo'
        ELSE 'Otro'
    END AS TipoContacto,
    COUNT(*) AS Cantidad
FROM EmployeeContactsInf
WHERE DataAreaId = @DataAreaId AND IsDeleted = 0
GROUP BY ContactType
ORDER BY ContactType;

PRINT '';

-- Detalle de documentos
PRINT 'Detalle de documentos:';
SELECT
    CASE DocumentType
        WHEN 0 THEN 'Cedula'
        WHEN 1 THEN 'Pasaporte'
        WHEN 2 THEN 'NSS'
        WHEN 3 THEN 'Carnet Migracion'
        ELSE 'Otro'
    END AS TipoDocumento,
    COUNT(*) AS Cantidad
FROM EmployeeDocuments
WHERE DataAreaId = @DataAreaId AND IsDeleted = 0
GROUP BY DocumentType
ORDER BY DocumentType;

PRINT '';

-- Detalle de bancos
PRINT 'Distribucion por banco:';
SELECT TOP 5
    BankName AS Banco,
    COUNT(*) AS Cuentas
FROM EmployeeBankAccounts
WHERE DataAreaId = @DataAreaId AND IsDeleted = 0
GROUP BY BankName
ORDER BY COUNT(*) DESC;

PRINT '';
PRINT '========================================';

SET NOCOUNT OFF;
GO
