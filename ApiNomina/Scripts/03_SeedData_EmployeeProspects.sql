-- ============================================================================
-- Script: 03_SeedData_EmployeeProspects.sql
-- Descripcion: Script para crear 300 prospectos empleados y 50 contratistas
--              orientados a la industria farmaceutica
-- Ejecutar: Una vez para poblar datos de prueba
-- Autor: Equipo de Desarrollo
-- Fecha: 2025-12-02
-- ============================================================================

SET NOCOUNT ON;

PRINT '========================================';
PRINT 'CREACION DE PROSPECTOS - FARMACIA RH-365';
PRINT '========================================';
PRINT '';

-- ============================================================================
-- CONFIGURACION
-- ============================================================================
DECLARE @DataAreaId NVARCHAR(20) = 'Farm';
DECLARE @Country NVARCHAR(10) = 'DOM';
DECLARE @DisabilityTypeId NVARCHAR(20) = '0'; -- Ninguna
DECLARE @LocationId NVARCHAR(20) = NULL;

-- ============================================================================
-- 1. VERIFICAR QUE EXISTAN DATOS MAESTROS REQUERIDOS
-- ============================================================================
PRINT '1. Verificando datos maestros...';

-- Insertar Niveles Educativos si no existen
IF NOT EXISTS (SELECT 1 FROM EducationLevels WHERE EducationLevelId = 'PRIM')
BEGIN
    INSERT INTO EducationLevels (EducationLevelId, Description, RecId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, IsDeleted)
    VALUES
    ('PRIM', 'Primaria', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('SEC', 'Secundaria / Bachillerato', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('TEC', 'Tecnico', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('UNIV', 'Universitario', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('POST', 'Postgrado / Maestria', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('DOC', 'Doctorado', 0, 'System', GETDATE(), 'System', GETDATE(), 0);
    PRINT '   - Niveles educativos insertados';
END

-- Insertar Ocupaciones de farmacia si no existen
IF NOT EXISTS (SELECT 1 FROM Occupations WHERE OccupationId = 'FARM01')
BEGIN
    INSERT INTO Occupations (OccupationId, Description, RecId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, IsDeleted)
    VALUES
    ('FARM01', 'FARMACEUTICO/A', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('FARM02', 'AUXILIAR DE FARMACIA', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('FARM03', 'TECNICO EN FARMACIA', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('FARM04', 'REGENTE FARMACEUTICO', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('FARM05', 'DEPENDIENTE DE FARMACIA', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('FARM06', 'CAJERO/A', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('FARM07', 'ALMACENISTA / BODEGUERO', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('FARM08', 'REPARTIDOR / DELIVERY', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('FARM09', 'SUPERVISOR DE TIENDA', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('FARM10', 'GERENTE DE SUCURSAL', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('FARM11', 'ASISTENTE ADMINISTRATIVO', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('FARM12', 'CONTADOR/A', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('FARM13', 'RECURSOS HUMANOS', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('FARM14', 'ENCARGADO DE COMPRAS', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('FARM15', 'SEGURIDAD', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('FARM16', 'LIMPIEZA Y MANTENIMIENTO', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('FARM17', 'ATENCION AL CLIENTE', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('FARM18', 'MARKETING Y PUBLICIDAD', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('FARM19', 'TECNOLOGIA / SOPORTE IT', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('FARM20', 'COSMETOLOGO/A', 0, 'System', GETDATE(), 'System', GETDATE(), 0);
    PRINT '   - Ocupaciones de farmacia insertadas';
END

PRINT '   - Datos maestros verificados';

-- ============================================================================
-- 2. CREAR TABLA TEMPORAL CON NOMBRES DOMINICANOS
-- ============================================================================
PRINT '2. Preparando datos de prospectos...';

-- Nombres masculinos dominicanos
DECLARE @NombresMasculinos TABLE (Id INT IDENTITY(1,1), Nombre NVARCHAR(50));
INSERT INTO @NombresMasculinos (Nombre) VALUES
('Juan'), ('Carlos'), ('Miguel'), ('Jose'), ('Luis'), ('Pedro'), ('Francisco'), ('Antonio'), ('Manuel'), ('Rafael'),
('Angel'), ('Ramon'), ('Fernando'), ('Julio'), ('Eduardo'), ('Ricardo'), ('Jorge'), ('Andres'), ('Pablo'), ('Domingo'),
('Victor'), ('Hector'), ('Felix'), ('Santo'), ('Orlando'), ('Marcos'), ('Alberto'), ('Alejandro'), ('Cristian'), ('Daniel'),
('David'), ('Elvis'), ('Emilio'), ('Enrique'), ('Esteban'), ('Federico'), ('Gabriel'), ('Gilberto'), ('Gregorio'), ('Gustavo'),
('Henry'), ('Hugo'), ('Ignacio'), ('Ivan'), ('Jaime'), ('Javier'), ('Jesus'), ('Joaquin'), ('Jonathan'), ('Leonardo'),
('Lorenzo'), ('Marcelino'), ('Mario'), ('Martin'), ('Mauricio'), ('Nelson'), ('Nicolas'), ('Omar'), ('Oscar'), ('Patricio'),
('Raul'), ('Roberto'), ('Rodolfo'), ('Rolando'), ('Ruben'), ('Samuel'), ('Santiago'), ('Sebastian'), ('Sergio'), ('Simon'),
('Tomas'), ('Ulises'), ('Valentin'), ('Vicente'), ('Wilfredo'), ('Yoel'), ('Yunior'), ('Yadiel'), ('Yeison'), ('Yonatan');

-- Nombres femeninos dominicanos
DECLARE @NombresFemeninos TABLE (Id INT IDENTITY(1,1), Nombre NVARCHAR(50));
INSERT INTO @NombresFemeninos (Nombre) VALUES
('Maria'), ('Ana'), ('Carmen'), ('Rosa'), ('Luz'), ('Juana'), ('Francisca'), ('Altagracia'), ('Mercedes'), ('Josefina'),
('Milagros'), ('Teresa'), ('Isabel'), ('Angela'), ('Elena'), ('Patricia'), ('Margarita'), ('Luisa'), ('Dolores'), ('Antonia'),
('Clara'), ('Yolanda'), ('Gloria'), ('Esperanza'), ('Raquel'), ('Beatriz'), ('Carolina'), ('Diana'), ('Esther'), ('Fatima'),
('Gabriela'), ('Helena'), ('Irene'), ('Julia'), ('Karina'), ('Laura'), ('Lourdes'), ('Lucia'), ('Marta'), ('Natalia'),
('Olga'), ('Pamela'), ('Paula'), ('Pilar'), ('Rebeca'), ('Regina'), ('Sandra'), ('Sara'), ('Silvia'), ('Sofia'),
('Susana'), ('Tamara'), ('Tatiana'), ('Valentina'), ('Vanessa'), ('Veronica'), ('Victoria'), ('Ximena'), ('Yahaira'), ('Yesenia'),
('Yocasta'), ('Yokasta'), ('Yomaira'), ('Yudelka'), ('Yuleisi'), ('Zunilda'), ('Zoila'), ('Zenaida'), ('Xiomara'), ('Wanda');

-- Apellidos dominicanos
DECLARE @Apellidos TABLE (Id INT IDENTITY(1,1), Apellido NVARCHAR(50));
INSERT INTO @Apellidos (Apellido) VALUES
('Rodriguez'), ('Perez'), ('Martinez'), ('Garcia'), ('Fernandez'), ('Lopez'), ('Gonzalez'), ('Sanchez'), ('Ramirez'), ('Torres'),
('Diaz'), ('Reyes'), ('Cruz'), ('Morales'), ('Ortiz'), ('Gutierrez'), ('Castillo'), ('Santos'), ('Medina'), ('Rivera'),
('Vargas'), ('Castro'), ('Romero'), ('Jimenez'), ('Ruiz'), ('Hernandez'), ('Alvarez'), ('Mendez'), ('Vega'), ('Flores'),
('Rojas'), ('Acosta'), ('Herrera'), ('Mejia'), ('Cabrera'), ('Pena'), ('Sosa'), ('De los Santos'), ('De la Cruz'), ('Duran'),
('Marte'), ('Nunez'), ('Tejeda'), ('Matos'), ('Bautista'), ('Rosario'), ('Mercedes'), ('Feliz'), ('Polanco'), ('Estevez'),
('Encarnacion'), ('Taveras'), ('Valdez'), ('Peralta'), ('Corporan'), ('Lora'), ('Guzman'), ('Almonte'), ('Alcantara'), ('Ventura'),
('Baez'), ('Batista'), ('Brito'), ('Cuevas'), ('Espinal'), ('Familia'), ('Gerardo'), ('Henriquez'), ('Inoa'), ('Jerez'),
('Kelly'), ('Lantigua'), ('Marmol'), ('Nina'), ('Ogando'), ('Pichardo'), ('Quezada'), ('Reinoso'), ('Severino'), ('Ureña');

-- ============================================================================
-- 3. INSERTAR 300 PROSPECTOS EMPLEADOS
-- ============================================================================
PRINT '3. Insertando 300 prospectos de empleados...';

DECLARE @i INT = 1;
DECLARE @Nombre NVARCHAR(50);
DECLARE @Apellido NVARCHAR(50);
DECLARE @Apellido2 NVARCHAR(50);
DECLARE @Gender INT;
DECLARE @MaritalStatus INT;
DECLARE @BirthDate DATE;
DECLARE @Age INT;
DECLARE @OccupationId NVARCHAR(20);
DECLARE @EducationLevelId NVARCHAR(20);
DECLARE @NSS NVARCHAR(20);
DECLARE @PayMethod INT;
DECLARE @NombreCount INT;
DECLARE @ApellidoCount INT;
DECLARE @OccupationRandom INT;

SELECT @NombreCount = COUNT(*) FROM @NombresMasculinos;
SELECT @ApellidoCount = COUNT(*) FROM @Apellidos;

WHILE @i <= 300
BEGIN
    -- Determinar genero (60% femenino por industria farmacia)
    SET @Gender = CASE WHEN RAND() < 0.6 THEN 1 ELSE 0 END;

    -- Seleccionar nombre segun genero
    IF @Gender = 0 -- Masculino
        SELECT @Nombre = Nombre FROM @NombresMasculinos WHERE Id = (ABS(CHECKSUM(NEWID())) % @NombreCount) + 1;
    ELSE -- Femenino
        SELECT @Nombre = Nombre FROM @NombresFemeninos WHERE Id = (ABS(CHECKSUM(NEWID())) % 70) + 1;

    -- Seleccionar apellidos
    SELECT @Apellido = Apellido FROM @Apellidos WHERE Id = (ABS(CHECKSUM(NEWID())) % @ApellidoCount) + 1;
    SELECT @Apellido2 = Apellido FROM @Apellidos WHERE Id = (ABS(CHECKSUM(NEWID())) % @ApellidoCount) + 1;

    -- Estado civil (40% soltero, 45% casado, 10% union libre, 5% otros)
    SET @MaritalStatus = CASE
        WHEN RAND() < 0.4 THEN 1  -- Single
        WHEN RAND() < 0.85 THEN 0 -- Married
        WHEN RAND() < 0.95 THEN 4 -- Separated
        ELSE 2 -- Widowed
    END;

    -- Fecha de nacimiento (entre 18 y 55 años)
    SET @Age = 18 + ABS(CHECKSUM(NEWID())) % 38;
    SET @BirthDate = DATEADD(YEAR, -@Age, DATEADD(DAY, -ABS(CHECKSUM(NEWID())) % 365, GETDATE()));

    -- Ocupacion segun distribucion de farmacia
    SET @OccupationRandom = ABS(CHECKSUM(NEWID())) % 100;
    SET @OccupationId = CASE
        WHEN @OccupationRandom < 5 THEN 'FARM01'   -- 5% Farmaceutico
        WHEN @OccupationRandom < 15 THEN 'FARM02'  -- 10% Auxiliar
        WHEN @OccupationRandom < 25 THEN 'FARM03'  -- 10% Tecnico
        WHEN @OccupationRandom < 28 THEN 'FARM04'  -- 3% Regente
        WHEN @OccupationRandom < 45 THEN 'FARM05'  -- 17% Dependiente
        WHEN @OccupationRandom < 60 THEN 'FARM06'  -- 15% Cajero
        WHEN @OccupationRandom < 68 THEN 'FARM07'  -- 8% Almacenista
        WHEN @OccupationRandom < 78 THEN 'FARM08'  -- 10% Repartidor
        WHEN @OccupationRandom < 82 THEN 'FARM09'  -- 4% Supervisor
        WHEN @OccupationRandom < 85 THEN 'FARM10'  -- 3% Gerente
        WHEN @OccupationRandom < 88 THEN 'FARM11'  -- 3% Admin
        WHEN @OccupationRandom < 90 THEN 'FARM12'  -- 2% Contador
        WHEN @OccupationRandom < 92 THEN 'FARM13'  -- 2% RRHH
        WHEN @OccupationRandom < 94 THEN 'FARM14'  -- 2% Compras
        WHEN @OccupationRandom < 97 THEN 'FARM15'  -- 3% Seguridad
        WHEN @OccupationRandom < 99 THEN 'FARM16'  -- 2% Limpieza
        ELSE 'FARM17' -- 1% Atencion cliente
    END;

    -- Nivel educativo segun ocupacion
    SET @EducationLevelId = CASE
        WHEN @OccupationId IN ('FARM01', 'FARM04') THEN 'UNIV'  -- Farmaceuticos = Universitario
        WHEN @OccupationId IN ('FARM03', 'FARM12', 'FARM13') THEN 'TEC' -- Tecnicos = Tecnico
        WHEN @OccupationId IN ('FARM10', 'FARM14') THEN 'UNIV' -- Gerentes = Universitario
        WHEN @OccupationId IN ('FARM02', 'FARM05', 'FARM06', 'FARM09', 'FARM11', 'FARM17') THEN 'SEC' -- Secundaria
        ELSE 'PRIM' -- Primaria para puestos operativos
    END;

    -- NSS simulado
    SET @NSS = RIGHT('00000000000' + CAST(1000000000 + @i * 1234567 % 8999999999 AS NVARCHAR), 11);

    -- Metodo de pago (80% transferencia, 20% efectivo)
    SET @PayMethod = CASE WHEN RAND() < 0.8 THEN 1 ELSE 0 END;

    -- Insertar empleado prospecto
    INSERT INTO Employees (
        Name, LastName, PersonalTreatment, BirthDate, Gender, Age, DependentsNumbers,
        MaritalStatus, NSS, ARS, AFP, AdmissionDate, Country, EmployeeType, HomeOffice,
        OwnCar, HasDisability, WorkFrom, WorkTo, BreakWorkFrom, BreakWorkTo,
        EmployeeStatus, WorkStatus, StartWorkDate, EndWorkDate, PayMethod, EmployeeAction,
        ApplyforOvertime, OccupationId, EducationLevelId, DisabilityTypeId, Nationality,
        LocationId, IsFixedWorkCalendar, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted
    )
    VALUES (
        @Nombre,
        @Apellido + ' ' + @Apellido2,
        CASE @Gender WHEN 0 THEN 'Sr.' ELSE 'Sra.' END,
        @BirthDate,
        @Gender,
        @Age,
        CASE WHEN @MaritalStatus = 0 THEN ABS(CHECKSUM(NEWID())) % 4 ELSE 0 END, -- Dependientes si casado
        @MaritalStatus,
        @NSS,
        'N/A',
        'N/A',
        GETDATE(), -- AdmissionDate
        @Country,
        0, -- EmployeeType = Employee
        0, -- HomeOffice
        CASE WHEN RAND() < 0.3 THEN 1 ELSE 0 END, -- 30% tiene carro
        0, -- No discapacidad
        '08:00:00', -- WorkFrom
        '17:00:00', -- WorkTo
        '12:00:00', -- BreakFrom
        '13:00:00', -- BreakTo
        1, -- EmployeeStatus = Activo
        0, -- WorkStatus = Candidate (Prospecto)
        '1900-01-01', -- StartWorkDate placeholder
        '1900-01-01', -- EndWorkDate placeholder
        @PayMethod,
        0, -- EmployeeAction = Ninguno
        CASE WHEN @OccupationId IN ('FARM07', 'FARM08') THEN 1 ELSE 0 END, -- Horas extras para almacen/delivery
        @OccupationId,
        @EducationLevelId,
        @DisabilityTypeId,
        'DOMINICANA',
        @LocationId,
        1, -- IsFixedWorkCalendar
        @DataAreaId,
        'System',
        GETDATE(),
        'System',
        GETDATE(),
        0,
        0
    );

    SET @i = @i + 1;
END

PRINT '   - 300 prospectos empleados insertados';

-- ============================================================================
-- 4. INSERTAR 50 PROSPECTOS CONTRATISTAS
-- ============================================================================
PRINT '4. Insertando 50 prospectos contratistas...';

SET @i = 1;

WHILE @i <= 50
BEGIN
    -- Determinar genero (50/50 para contratistas)
    SET @Gender = CASE WHEN RAND() < 0.5 THEN 1 ELSE 0 END;

    -- Seleccionar nombre segun genero
    IF @Gender = 0 -- Masculino
        SELECT @Nombre = Nombre FROM @NombresMasculinos WHERE Id = (ABS(CHECKSUM(NEWID())) % @NombreCount) + 1;
    ELSE -- Femenino
        SELECT @Nombre = Nombre FROM @NombresFemeninos WHERE Id = (ABS(CHECKSUM(NEWID())) % 70) + 1;

    -- Seleccionar apellidos
    SELECT @Apellido = Apellido FROM @Apellidos WHERE Id = (ABS(CHECKSUM(NEWID())) % @ApellidoCount) + 1;
    SELECT @Apellido2 = Apellido FROM @Apellidos WHERE Id = (ABS(CHECKSUM(NEWID())) % @ApellidoCount) + 1;

    -- Estado civil
    SET @MaritalStatus = CASE
        WHEN RAND() < 0.5 THEN 1  -- Single
        ELSE 0 -- Married
    END;

    -- Fecha de nacimiento (entre 25 y 60 años para contratistas - mas experiencia)
    SET @Age = 25 + ABS(CHECKSUM(NEWID())) % 36;
    SET @BirthDate = DATEADD(YEAR, -@Age, DATEADD(DAY, -ABS(CHECKSUM(NEWID())) % 365, GETDATE()));

    -- Ocupaciones tipicas de contratistas en farmacia
    SET @OccupationRandom = ABS(CHECKSUM(NEWID())) % 100;
    SET @OccupationId = CASE
        WHEN @OccupationRandom < 20 THEN 'FARM19'  -- 20% IT/Soporte
        WHEN @OccupationRandom < 35 THEN 'FARM15'  -- 15% Seguridad
        WHEN @OccupationRandom < 50 THEN 'FARM16'  -- 15% Limpieza
        WHEN @OccupationRandom < 60 THEN 'FARM18'  -- 10% Marketing
        WHEN @OccupationRandom < 75 THEN 'FARM12'  -- 15% Contador
        WHEN @OccupationRandom < 85 THEN 'FARM08'  -- 10% Delivery
        WHEN @OccupationRandom < 95 THEN 'FARM20'  -- 10% Cosmetologo
        ELSE 'FARM14' -- 5% Compras
    END;

    -- Nivel educativo mas alto para contratistas
    SET @EducationLevelId = CASE
        WHEN @OccupationId IN ('FARM19', 'FARM12', 'FARM18') THEN 'UNIV'
        WHEN @OccupationId IN ('FARM20', 'FARM14') THEN 'TEC'
        ELSE 'SEC'
    END;

    -- NSS simulado (diferente rango para contratistas)
    SET @NSS = RIGHT('00000000000' + CAST(5000000000 + @i * 9876543 % 4999999999 AS NVARCHAR), 11);

    -- Metodo de pago (90% transferencia para contratistas)
    SET @PayMethod = CASE WHEN RAND() < 0.9 THEN 1 ELSE 0 END;

    -- Insertar contratista prospecto
    INSERT INTO Employees (
        Name, LastName, PersonalTreatment, BirthDate, Gender, Age, DependentsNumbers,
        MaritalStatus, NSS, ARS, AFP, AdmissionDate, Country, EmployeeType, HomeOffice,
        OwnCar, HasDisability, WorkFrom, WorkTo, BreakWorkFrom, BreakWorkTo,
        EmployeeStatus, WorkStatus, StartWorkDate, EndWorkDate, PayMethod, EmployeeAction,
        ApplyforOvertime, OccupationId, EducationLevelId, DisabilityTypeId, Nationality,
        LocationId, IsFixedWorkCalendar, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted
    )
    VALUES (
        @Nombre,
        @Apellido + ' ' + @Apellido2,
        CASE @Gender WHEN 0 THEN 'Sr.' ELSE 'Sra.' END,
        @BirthDate,
        @Gender,
        @Age,
        CASE WHEN @MaritalStatus = 0 THEN ABS(CHECKSUM(NEWID())) % 3 ELSE 0 END,
        @MaritalStatus,
        @NSS,
        'N/A',
        'N/A',
        GETDATE(),
        @Country,
        1, -- EmployeeType = Contractor
        CASE WHEN @OccupationId IN ('FARM19', 'FARM12', 'FARM18') THEN 1 ELSE 0 END, -- HomeOffice para IT, contadores, marketing
        CASE WHEN RAND() < 0.5 THEN 1 ELSE 0 END, -- 50% tiene carro
        0,
        '08:00:00',
        '17:00:00',
        '12:00:00',
        '13:00:00',
        1,
        0, -- WorkStatus = Candidate (Prospecto)
        '1900-01-01',
        '1900-01-01',
        @PayMethod,
        0,
        0, -- No aplica horas extras para contratistas
        @OccupationId,
        @EducationLevelId,
        @DisabilityTypeId,
        'DOMINICANA',
        @LocationId,
        0, -- No horario fijo para contratistas
        @DataAreaId,
        'System',
        GETDATE(),
        'System',
        GETDATE(),
        0,
        0
    );

    SET @i = @i + 1;
END

PRINT '   - 50 prospectos contratistas insertados';

-- ============================================================================
-- 5. RESUMEN
-- ============================================================================
PRINT '';
PRINT '========================================';
PRINT 'PROSPECTOS CREADOS EXITOSAMENTE';
PRINT '========================================';
PRINT '';

DECLARE @TotalEmpleados INT, @TotalContratistas INT;
SELECT @TotalEmpleados = COUNT(*) FROM Employees WHERE DataAreaId = @DataAreaId AND EmployeeType = 0 AND WorkStatus = 0;
SELECT @TotalContratistas = COUNT(*) FROM Employees WHERE DataAreaId = @DataAreaId AND EmployeeType = 1 AND WorkStatus = 0;

PRINT 'Resumen de prospectos para Farmacia RH-365:';
PRINT '  - Prospectos Empleados: ' + CAST(@TotalEmpleados AS NVARCHAR);
PRINT '  - Prospectos Contratistas: ' + CAST(@TotalContratistas AS NVARCHAR);
PRINT '  - Total: ' + CAST(@TotalEmpleados + @TotalContratistas AS NVARCHAR);
PRINT '';
PRINT 'Distribucion por ocupacion:';

SELECT
    o.Description AS Ocupacion,
    COUNT(*) AS Cantidad,
    CASE e.EmployeeType WHEN 0 THEN 'Empleado' ELSE 'Contratista' END AS Tipo
FROM Employees e
INNER JOIN Occupations o ON e.OccupationId = o.OccupationId
WHERE e.DataAreaId = @DataAreaId AND e.WorkStatus = 0
GROUP BY o.Description, e.EmployeeType
ORDER BY COUNT(*) DESC;

PRINT '';
PRINT '========================================';

SET NOCOUNT OFF;
GO
