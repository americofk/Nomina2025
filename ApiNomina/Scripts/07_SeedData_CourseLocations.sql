-- ============================================================================
-- Script: 07_SeedData_CourseLocations.sql
-- Descripcion: Inserta 10 ubicaciones de cursos para Farmacia RH-365
--              3 virtuales (Zoom, Teams, Google Meet) y 7 presenciales
-- Ejecutar: En cualquier momento
-- Autor: Equipo de Desarrollo
-- Fecha: 2025-12-03
-- ============================================================================

SET NOCOUNT ON;

PRINT '========================================'
PRINT 'CREACION DE UBICACIONES DE CURSOS'
PRINT '========================================'
PRINT ''

DECLARE @DataAreaId NVARCHAR(20) = 'Farm';

-- Verificar cuantas ubicaciones ya existen
DECLARE @ExistingCount INT;
SELECT @ExistingCount = COUNT(*) FROM CourseLocations WHERE DataAreaId = @DataAreaId;
PRINT 'Ubicaciones existentes: ' + CAST(@ExistingCount AS VARCHAR);

-- Obtener el ultimo ID
DECLARE @LastNum INT;
SELECT @LastNum = ISNULL(MAX(CAST(REPLACE(CourseLocationId, 'LOC', '') AS INT)), 0)
FROM CourseLocations WHERE DataAreaId = @DataAreaId;

-- ============================================================================
-- INSERTAR UBICACIONES DE CURSOS
-- ============================================================================

PRINT ''
PRINT 'Insertando ubicaciones de cursos...'

-- 1. Zoom (Virtual)
SET @LastNum = @LastNum + 1;
INSERT INTO CourseLocations (CourseLocationId, Name, Phone, Mail, Address, ContactName, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('LOC' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Zoom - Sala Virtual',
        '809-555-0001',
        'capacitacion@farmaciarh365.com',
        'https://zoom.us/meeting',
        'Coordinador TI',
        'Plataforma virtual para videoconferencias - Licencia empresarial',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- 2. Microsoft Teams (Virtual)
SET @LastNum = @LastNum + 1;
INSERT INTO CourseLocations (CourseLocationId, Name, Phone, Mail, Address, ContactName, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('LOC' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Microsoft Teams - Sala Virtual',
        '809-555-0002',
        'teams@farmaciarh365.com',
        'https://teams.microsoft.com',
        'Coordinador TI',
        'Plataforma virtual Microsoft 365 - Reuniones y capacitaciones',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- 3. Google Meet (Virtual)
SET @LastNum = @LastNum + 1;
INSERT INTO CourseLocations (CourseLocationId, Name, Phone, Mail, Address, ContactName, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('LOC' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Google Meet - Sala Virtual',
        '809-555-0003',
        'meet@farmaciarh365.com',
        'https://meet.google.com',
        'Coordinador TI',
        'Plataforma virtual Google Workspace - Videoconferencias',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- 4. Sala de Capacitacion Principal (Presencial)
SET @LastNum = @LastNum + 1;
INSERT INTO CourseLocations (CourseLocationId, Name, Phone, Mail, Address, ContactName, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('LOC' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Sala de Capacitacion - Sede Central',
        '809-555-1001',
        'capacitacion@farmaciarh365.com',
        'Av. Winston Churchill No. 100, Torre Empresarial, Piso 5, Santo Domingo',
        'Maria Rodriguez',
        'Sala principal con capacidad para 50 personas - Proyector y audio',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- 5. Auditorio Corporativo (Presencial)
SET @LastNum = @LastNum + 1;
INSERT INTO CourseLocations (CourseLocationId, Name, Phone, Mail, Address, ContactName, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('LOC' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Auditorio Corporativo',
        '809-555-1002',
        'eventos@farmaciarh365.com',
        'Av. Abraham Lincoln No. 250, Plaza Central, Santo Domingo',
        'Carlos Mendez',
        'Auditorio con capacidad para 150 personas - Eventos y conferencias',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- 6. Centro de Formacion Zona Norte (Presencial)
SET @LastNum = @LastNum + 1;
INSERT INTO CourseLocations (CourseLocationId, Name, Phone, Mail, Address, ContactName, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('LOC' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Centro de Formacion - Zona Norte',
        '809-555-2001',
        'zonanorte@farmaciarh365.com',
        'Calle Principal No. 45, Santiago de los Caballeros',
        'Ana Paulino',
        'Centro regional con 2 salas - Capacidad 30 personas cada una',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- 7. Sala de Reuniones - Sucursal Este (Presencial)
SET @LastNum = @LastNum + 1;
INSERT INTO CourseLocations (CourseLocationId, Name, Phone, Mail, Address, ContactName, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('LOC' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Sala de Reuniones - Sucursal Este',
        '809-555-3001',
        'zonaeste@farmaciarh365.com',
        'Av. San Vicente de Paul No. 78, La Romana',
        'Pedro Santana',
        'Sala para grupos pequenos - Capacidad 15 personas',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- 8. Laboratorio de Practicas (Presencial)
SET @LastNum = @LastNum + 1;
INSERT INTO CourseLocations (CourseLocationId, Name, Phone, Mail, Address, ContactName, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('LOC' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Laboratorio de Practicas Farmaceuticas',
        '809-555-1003',
        'laboratorio@farmaciarh365.com',
        'Av. Winston Churchill No. 100, Torre Empresarial, Piso 3, Santo Domingo',
        'Dra. Laura Guzman',
        'Laboratorio equipado para practicas farmaceuticas - 20 estaciones',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- 9. Aula de Informatica (Presencial)
SET @LastNum = @LastNum + 1;
INSERT INTO CourseLocations (CourseLocationId, Name, Phone, Mail, Address, ContactName, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('LOC' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Aula de Informatica',
        '809-555-1004',
        'ti@farmaciarh365.com',
        'Av. Winston Churchill No. 100, Torre Empresarial, Piso 4, Santo Domingo',
        'Ing. Roberto Marte',
        'Aula con 25 computadoras - Cursos de sistemas y software',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- 10. Salon Multiusos - Zona Sur (Presencial)
SET @LastNum = @LastNum + 1;
INSERT INTO CourseLocations (CourseLocationId, Name, Phone, Mail, Address, ContactName, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('LOC' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Salon Multiusos - Zona Sur',
        '809-555-4001',
        'zonasur@farmaciarh365.com',
        'Av. Independencia No. 320, San Cristobal',
        'Juan Mejia',
        'Salon adaptable para diferentes tipos de capacitacion - 40 personas',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- ============================================================================
-- RESUMEN
-- ============================================================================
PRINT ''
PRINT '========================================'
PRINT 'UBICACIONES CREADAS EXITOSAMENTE'
PRINT '========================================'

SELECT CourseLocationId, Name,
       CASE WHEN Address LIKE 'https://%' THEN 'Virtual' ELSE 'Presencial' END AS Tipo,
       ContactName
FROM CourseLocations
WHERE DataAreaId = @DataAreaId AND IsDeleted = 0
ORDER BY CourseLocationId;

DECLARE @TotalUbicaciones INT;
SELECT @TotalUbicaciones = COUNT(*) FROM CourseLocations WHERE DataAreaId = @DataAreaId AND IsDeleted = 0;
PRINT ''
PRINT 'Total ubicaciones: ' + CAST(@TotalUbicaciones AS VARCHAR)

SET NOCOUNT OFF;
GO
