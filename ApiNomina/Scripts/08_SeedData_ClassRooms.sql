-- ============================================================================
-- Script: 08_SeedData_ClassRooms.sql
-- Descripcion: Inserta 10 salones de cursos para Farmacia RH-365
--              1 virtual y 9 fisicos
-- Ejecutar: Despues de 07_SeedData_CourseLocations.sql
-- Autor: Equipo de Desarrollo
-- Fecha: 2025-12-03
-- ============================================================================

SET NOCOUNT ON;

PRINT '========================================'
PRINT 'CREACION DE SALONES DE CURSOS'
PRINT '========================================'
PRINT ''

DECLARE @DataAreaId NVARCHAR(20) = 'Farm';

-- Verificar cuantos salones ya existen
DECLARE @ExistingCount INT;
SELECT @ExistingCount = COUNT(*) FROM ClassRooms WHERE DataAreaId = @DataAreaId;
PRINT 'Salones existentes: ' + CAST(@ExistingCount AS VARCHAR);

-- Obtener el ultimo ID
DECLARE @LastNum INT;
SELECT @LastNum = ISNULL(MAX(CAST(REPLACE(ClassRoomId, 'CLS', '') AS INT)), 0)
FROM ClassRooms WHERE DataAreaId = @DataAreaId;

-- ============================================================================
-- INSERTAR SALONES DE CURSOS
-- ============================================================================

PRINT ''
PRINT 'Insertando salones de cursos...'

-- 1. Sala Virtual Principal (Virtual - asociada a Zoom LOC001)
SET @LastNum = @LastNum + 1;
INSERT INTO ClassRooms (ClassRoomId, Name, CourseLocationId, MaxStudentQty, AvailableTimeStart, AvailableTimeEnd, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('CLS' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Sala Virtual Principal',
        'LOC001',
        100,
        '08:00:00',
        '20:00:00',
        'Sala virtual para capacitaciones remotas - Sin limite fisico',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- 2. Aula A-101 (Sede Central LOC004)
SET @LastNum = @LastNum + 1;
INSERT INTO ClassRooms (ClassRoomId, Name, CourseLocationId, MaxStudentQty, AvailableTimeStart, AvailableTimeEnd, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('CLS' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Aula A-101',
        'LOC004',
        30,
        '08:00:00',
        '18:00:00',
        'Aula principal con proyector y pizarra inteligente',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- 3. Aula A-102 (Sede Central LOC004)
SET @LastNum = @LastNum + 1;
INSERT INTO ClassRooms (ClassRoomId, Name, CourseLocationId, MaxStudentQty, AvailableTimeStart, AvailableTimeEnd, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('CLS' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Aula A-102',
        'LOC004',
        25,
        '08:00:00',
        '18:00:00',
        'Aula secundaria con aire acondicionado y TV 65 pulgadas',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- 4. Auditorio Principal (Auditorio Corporativo LOC005)
SET @LastNum = @LastNum + 1;
INSERT INTO ClassRooms (ClassRoomId, Name, CourseLocationId, MaxStudentQty, AvailableTimeStart, AvailableTimeEnd, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('CLS' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Auditorio Principal',
        'LOC005',
        150,
        '07:00:00',
        '22:00:00',
        'Auditorio con escenario, sistema de sonido profesional y 2 pantallas LED',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- 5. Salon Norte-1 (Centro Formacion Zona Norte LOC006)
SET @LastNum = @LastNum + 1;
INSERT INTO ClassRooms (ClassRoomId, Name, CourseLocationId, MaxStudentQty, AvailableTimeStart, AvailableTimeEnd, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('CLS' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Salon Norte-1',
        'LOC006',
        30,
        '08:00:00',
        '17:00:00',
        'Salon con mobiliario modular y equipo audiovisual',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- 6. Salon Norte-2 (Centro Formacion Zona Norte LOC006)
SET @LastNum = @LastNum + 1;
INSERT INTO ClassRooms (ClassRoomId, Name, CourseLocationId, MaxStudentQty, AvailableTimeStart, AvailableTimeEnd, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('CLS' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Salon Norte-2',
        'LOC006',
        25,
        '08:00:00',
        '17:00:00',
        'Salon para grupos medianos con pizarra y proyector',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- 7. Sala Ejecutiva Este (Sucursal Este LOC007)
SET @LastNum = @LastNum + 1;
INSERT INTO ClassRooms (ClassRoomId, Name, CourseLocationId, MaxStudentQty, AvailableTimeStart, AvailableTimeEnd, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('CLS' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Sala Ejecutiva Este',
        'LOC007',
        15,
        '09:00:00',
        '17:00:00',
        'Sala pequena para reuniones ejecutivas y capacitaciones especializadas',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- 8. Laboratorio Farmaceutico (Laboratorio LOC008)
SET @LastNum = @LastNum + 1;
INSERT INTO ClassRooms (ClassRoomId, Name, CourseLocationId, MaxStudentQty, AvailableTimeStart, AvailableTimeEnd, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('CLS' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Laboratorio Farmaceutico',
        'LOC008',
        20,
        '08:00:00',
        '16:00:00',
        'Laboratorio con 20 estaciones de trabajo equipadas para practicas',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- 9. Sala de Computo (Aula de Informatica LOC009)
SET @LastNum = @LastNum + 1;
INSERT INTO ClassRooms (ClassRoomId, Name, CourseLocationId, MaxStudentQty, AvailableTimeStart, AvailableTimeEnd, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('CLS' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Sala de Computo',
        'LOC009',
        25,
        '08:00:00',
        '18:00:00',
        '25 computadoras con software especializado - Internet de alta velocidad',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- 10. Salon Sur-1 (Salon Multiusos Zona Sur LOC010)
SET @LastNum = @LastNum + 1;
INSERT INTO ClassRooms (ClassRoomId, Name, CourseLocationId, MaxStudentQty, AvailableTimeStart, AvailableTimeEnd, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('CLS' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Salon Sur-1',
        'LOC010',
        40,
        '08:00:00',
        '17:00:00',
        'Salon amplio con division movil - Puede dividirse en 2 salas de 20',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- ============================================================================
-- RESUMEN
-- ============================================================================
PRINT ''
PRINT '========================================'
PRINT 'SALONES CREADOS EXITOSAMENTE'
PRINT '========================================'

SELECT
    c.ClassRoomId,
    c.Name AS Salon,
    l.Name AS Ubicacion,
    c.MaxStudentQty AS Capacidad,
    CONVERT(VARCHAR(5), c.AvailableTimeStart, 108) + ' - ' + CONVERT(VARCHAR(5), c.AvailableTimeEnd, 108) AS Horario
FROM ClassRooms c
INNER JOIN CourseLocations l ON c.CourseLocationId = l.CourseLocationId AND c.DataAreaId = l.DataAreaId
WHERE c.DataAreaId = @DataAreaId AND c.IsDeleted = 0
ORDER BY c.ClassRoomId;

DECLARE @TotalSalones INT;
SELECT @TotalSalones = COUNT(*) FROM ClassRooms WHERE DataAreaId = @DataAreaId AND IsDeleted = 0;
PRINT ''
PRINT 'Total salones: ' + CAST(@TotalSalones AS VARCHAR)

SET NOCOUNT OFF;
GO
