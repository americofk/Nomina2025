-- ============================================================================
-- Script: 10_SeedData_Courses.sql
-- Descripcion: Inserta 20 cursos con puestos y empleados asignados
-- Ejecutar: Despues de 09_SeedData_CourseTypes.sql
-- Autor: Equipo de Desarrollo
-- Fecha: 2025-12-03
-- ============================================================================

SET NOCOUNT ON;

PRINT '========================================'
PRINT 'CREACION DE CURSOS CON PUESTOS Y EMPLEADOS'
PRINT '========================================'
PRINT ''

DECLARE @DataAreaId NVARCHAR(20) = 'Farm';

-- Verificar cuantos cursos ya existen
DECLARE @ExistingCount INT;
SELECT @ExistingCount = COUNT(*) FROM Courses WHERE DataAreaId = @DataAreaId;
PRINT 'Cursos existentes: ' + CAST(@ExistingCount AS VARCHAR);

-- Obtener el ultimo ID de curso
DECLARE @LastCourseNum INT;
SELECT @LastCourseNum = ISNULL(MAX(CAST(REPLACE(CourseId, 'CRS', '') AS INT)), 0)
FROM Courses WHERE DataAreaId = @DataAreaId;

-- Variables para insercion
DECLARE @CourseId NVARCHAR(20);
DECLARE @StartDate DATETIME;
DECLARE @EndDate DATETIME;

-- ============================================================================
-- INSERTAR CURSOS
-- ============================================================================

PRINT ''
PRINT 'Insertando cursos...'

-- -----------------------------------------------------------------------
-- CURSO 1: Farmacologia Basica (CTY001) - Para Farmaceuticos y Tecnicos
-- -----------------------------------------------------------------------
SET @LastCourseNum = @LastCourseNum + 1;
SET @CourseId = 'CRS' + RIGHT('000' + CAST(@LastCourseNum AS VARCHAR), 3);
SET @StartDate = '2025-01-15 09:00:00';
SET @EndDate = '2025-01-17 17:00:00';

INSERT INTO Courses (CourseId, CourseName, CourseTypeId, IsMatrixTraining, InternalExternal, CourseParentId, ClassRoomId, StartDateTime, EndDateTime, MinStudents, MaxStudents, Periodicity, QtySessions, Description, Objetives, Topics, CourseStatus, URLDocuments, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES (@CourseId, 'Fundamentos de Farmacologia', 'CTY001', 1, 0, NULL, 'CLS002', @StartDate, @EndDate, 10, 30, 12, 3,
        'Curso basico de farmacologia para personal farmaceutico',
        'Comprender los principios fundamentales de la farmacologia y mecanismos de accion de medicamentos',
        'Farmacocinetica basica, Farmacodinamia, Clasificacion de medicamentos, Vias de administracion',
        0, NULL, @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- Puestos: Farmaceutico Regente (JOB021), Tecnico en Farmacia (JOB025), Auxiliar de Farmacia (JOB026)
INSERT INTO CoursePositions (PositionId, CourseId, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
SELECT p.PositionId, @CourseId, 'Curso obligatorio', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0
FROM Positions p WHERE p.JobId IN ('JOB021', 'JOB025', 'JOB026') AND p.DataAreaId = @DataAreaId AND p.IsDeleted = 0;

-- Empleados de esos puestos
INSERT INTO CourseEmployees (EmployeeId, CourseId, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
SELECT DISTINCT e.EmployeeId, @CourseId, 'Inscrito automaticamente', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0
FROM Employees e
INNER JOIN EmployeePositions ep ON e.EmployeeId = ep.EmployeeId AND e.DataAreaId = ep.DataAreaId
INNER JOIN Positions p ON ep.PositionId = p.PositionId AND ep.DataAreaId = p.DataAreaId
WHERE p.JobId IN ('JOB021', 'JOB025', 'JOB026') AND e.DataAreaId = @DataAreaId AND e.WorkStatus = 2 AND e.IsDeleted = 0 AND ep.IsDeleted = 0;

PRINT '  Curso 1: Fundamentos de Farmacologia - Creado';

-- -----------------------------------------------------------------------
-- CURSO 2: Dispensacion Farmaceutica (CTY006) - Para todo personal de mostrador
-- -----------------------------------------------------------------------
SET @LastCourseNum = @LastCourseNum + 1;
SET @CourseId = 'CRS' + RIGHT('000' + CAST(@LastCourseNum AS VARCHAR), 3);
SET @StartDate = '2025-01-20 08:00:00';
SET @EndDate = '2025-01-21 16:00:00';

INSERT INTO Courses (CourseId, CourseName, CourseTypeId, IsMatrixTraining, InternalExternal, CourseParentId, ClassRoomId, StartDateTime, EndDateTime, MinStudents, MaxStudents, Periodicity, QtySessions, Description, Objetives, Topics, CourseStatus, URLDocuments, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES (@CourseId, 'Tecnicas de Dispensacion', 'CTY006', 1, 0, NULL, 'CLS004', @StartDate, @EndDate, 20, 150, 6, 2,
        'Curso de dispensacion para personal de mostrador y farmacia',
        'Dominar las tecnicas correctas de dispensacion y orientacion al paciente',
        'Verificacion de recetas, Dispensacion correcta, Orientacion farmaceutica, Errores comunes',
        0, NULL, @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- Puestos: Vendedor Mostrador (JOB036), Auxiliar Farmacia (JOB026), Cajero (JOB039)
INSERT INTO CoursePositions (PositionId, CourseId, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
SELECT p.PositionId, @CourseId, 'Curso obligatorio', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0
FROM Positions p WHERE p.JobId IN ('JOB036', 'JOB026', 'JOB039') AND p.DataAreaId = @DataAreaId AND p.IsDeleted = 0;

INSERT INTO CourseEmployees (EmployeeId, CourseId, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
SELECT DISTINCT e.EmployeeId, @CourseId, 'Inscrito automaticamente', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0
FROM Employees e
INNER JOIN EmployeePositions ep ON e.EmployeeId = ep.EmployeeId AND e.DataAreaId = ep.DataAreaId
INNER JOIN Positions p ON ep.PositionId = p.PositionId AND ep.DataAreaId = p.DataAreaId
WHERE p.JobId IN ('JOB036', 'JOB026', 'JOB039') AND e.DataAreaId = @DataAreaId AND e.WorkStatus = 2 AND e.IsDeleted = 0 AND ep.IsDeleted = 0;

PRINT '  Curso 2: Tecnicas de Dispensacion - Creado';

-- -----------------------------------------------------------------------
-- CURSO 3: Servicio al Cliente (CTY018) - Para vendedores y cajeros
-- -----------------------------------------------------------------------
SET @LastCourseNum = @LastCourseNum + 1;
SET @CourseId = 'CRS' + RIGHT('000' + CAST(@LastCourseNum AS VARCHAR), 3);
SET @StartDate = '2025-01-25 09:00:00';
SET @EndDate = '2025-01-25 17:00:00';

INSERT INTO Courses (CourseId, CourseName, CourseTypeId, IsMatrixTraining, InternalExternal, CourseParentId, ClassRoomId, StartDateTime, EndDateTime, MinStudents, MaxStudents, Periodicity, QtySessions, Description, Objetives, Topics, CourseStatus, URLDocuments, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES (@CourseId, 'Excelencia en Servicio al Cliente', 'CTY018', 0, 0, NULL, 'CLS001', @StartDate, @EndDate, 15, 100, 6, 1,
        'Curso virtual de servicio al cliente para personal de atencion',
        'Desarrollar habilidades de atencion al cliente y manejo de situaciones dificiles',
        'Comunicacion efectiva, Manejo de quejas, Fidelizacion, Empatia con el cliente',
        0, NULL, @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- Puestos: Vendedor (JOB036), Cajero (JOB039), Asesor Servicio (JOB038)
INSERT INTO CoursePositions (PositionId, CourseId, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
SELECT p.PositionId, @CourseId, 'Curso recomendado', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0
FROM Positions p WHERE p.JobId IN ('JOB036', 'JOB039', 'JOB038') AND p.DataAreaId = @DataAreaId AND p.IsDeleted = 0;

INSERT INTO CourseEmployees (EmployeeId, CourseId, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
SELECT DISTINCT e.EmployeeId, @CourseId, 'Inscrito automaticamente', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0
FROM Employees e
INNER JOIN EmployeePositions ep ON e.EmployeeId = ep.EmployeeId AND e.DataAreaId = ep.DataAreaId
INNER JOIN Positions p ON ep.PositionId = p.PositionId AND ep.DataAreaId = p.DataAreaId
WHERE p.JobId IN ('JOB036', 'JOB039', 'JOB038') AND e.DataAreaId = @DataAreaId AND e.WorkStatus = 2 AND e.IsDeleted = 0 AND ep.IsDeleted = 0;

PRINT '  Curso 3: Excelencia en Servicio al Cliente - Creado';

-- -----------------------------------------------------------------------
-- CURSO 4: Medicamentos Controlados (CTY004) - Farmaceuticos y Regentes
-- -----------------------------------------------------------------------
SET @LastCourseNum = @LastCourseNum + 1;
SET @CourseId = 'CRS' + RIGHT('000' + CAST(@LastCourseNum AS VARCHAR), 3);
SET @StartDate = '2025-02-01 08:00:00';
SET @EndDate = '2025-02-02 16:00:00';

INSERT INTO Courses (CourseId, CourseName, CourseTypeId, IsMatrixTraining, InternalExternal, CourseParentId, ClassRoomId, StartDateTime, EndDateTime, MinStudents, MaxStudents, Periodicity, QtySessions, Description, Objetives, Topics, CourseStatus, URLDocuments, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES (@CourseId, 'Manejo de Sustancias Controladas', 'CTY004', 1, 0, NULL, 'CLS008', @StartDate, @EndDate, 10, 20, 12, 2,
        'Curso especializado en manejo de medicamentos controlados',
        'Conocer la normativa y procedimientos para el manejo seguro de sustancias controladas',
        'Legislacion vigente, Registro y control, Almacenamiento seguro, Dispensacion especial',
        0, NULL, @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- Puestos: Farmaceutico Regente (JOB021), Director Farmaceutico (JOB010)
INSERT INTO CoursePositions (PositionId, CourseId, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
SELECT p.PositionId, @CourseId, 'Curso obligatorio', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0
FROM Positions p WHERE p.JobId IN ('JOB021', 'JOB010') AND p.DataAreaId = @DataAreaId AND p.IsDeleted = 0;

INSERT INTO CourseEmployees (EmployeeId, CourseId, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
SELECT DISTINCT e.EmployeeId, @CourseId, 'Inscrito automaticamente', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0
FROM Employees e
INNER JOIN EmployeePositions ep ON e.EmployeeId = ep.EmployeeId AND e.DataAreaId = ep.DataAreaId
INNER JOIN Positions p ON ep.PositionId = p.PositionId AND ep.DataAreaId = p.DataAreaId
WHERE p.JobId IN ('JOB021', 'JOB010') AND e.DataAreaId = @DataAreaId AND e.WorkStatus = 2 AND e.IsDeleted = 0 AND ep.IsDeleted = 0;

PRINT '  Curso 4: Manejo de Sustancias Controladas - Creado';

-- -----------------------------------------------------------------------
-- CURSO 5: Gestion de Inventarios (CTY014) - Almacenistas y Supervisores
-- -----------------------------------------------------------------------
SET @LastCourseNum = @LastCourseNum + 1;
SET @CourseId = 'CRS' + RIGHT('000' + CAST(@LastCourseNum AS VARCHAR), 3);
SET @StartDate = '2025-02-05 09:00:00';
SET @EndDate = '2025-02-06 17:00:00';

INSERT INTO Courses (CourseId, CourseName, CourseTypeId, IsMatrixTraining, InternalExternal, CourseParentId, ClassRoomId, StartDateTime, EndDateTime, MinStudents, MaxStudents, Periodicity, QtySessions, Description, Objetives, Topics, CourseStatus, URLDocuments, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES (@CourseId, 'Gestion Eficiente de Inventarios', 'CTY014', 0, 0, NULL, 'CLS005', @StartDate, @EndDate, 10, 30, 6, 2,
        'Curso de gestion de inventarios farmaceuticos',
        'Implementar tecnicas efectivas de control de inventario y reduccion de perdidas',
        'Control de stock, FIFO/FEFO, Manejo de vencimientos, Inventarios ciclicos',
        0, NULL, @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- Puestos: Almacenista (JOB041), Supervisor Almacen (JOB012), Analista Inventarios (JOB030)
INSERT INTO CoursePositions (PositionId, CourseId, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
SELECT p.PositionId, @CourseId, 'Curso obligatorio', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0
FROM Positions p WHERE p.JobId IN ('JOB041', 'JOB012', 'JOB030') AND p.DataAreaId = @DataAreaId AND p.IsDeleted = 0;

INSERT INTO CourseEmployees (EmployeeId, CourseId, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
SELECT DISTINCT e.EmployeeId, @CourseId, 'Inscrito automaticamente', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0
FROM Employees e
INNER JOIN EmployeePositions ep ON e.EmployeeId = ep.EmployeeId AND e.DataAreaId = ep.DataAreaId
INNER JOIN Positions p ON ep.PositionId = p.PositionId AND ep.DataAreaId = p.DataAreaId
WHERE p.JobId IN ('JOB041', 'JOB012', 'JOB030') AND e.DataAreaId = @DataAreaId AND e.WorkStatus = 2 AND e.IsDeleted = 0 AND ep.IsDeleted = 0;

PRINT '  Curso 5: Gestion Eficiente de Inventarios - Creado';

-- -----------------------------------------------------------------------
-- CURSO 6: Cadena de Frio (CTY015) - Almacenistas y Repartidores
-- -----------------------------------------------------------------------
SET @LastCourseNum = @LastCourseNum + 1;
SET @CourseId = 'CRS' + RIGHT('000' + CAST(@LastCourseNum AS VARCHAR), 3);
SET @StartDate = '2025-02-10 08:00:00';
SET @EndDate = '2025-02-10 16:00:00';

INSERT INTO Courses (CourseId, CourseName, CourseTypeId, IsMatrixTraining, InternalExternal, CourseParentId, ClassRoomId, StartDateTime, EndDateTime, MinStudents, MaxStudents, Periodicity, QtySessions, Description, Objetives, Topics, CourseStatus, URLDocuments, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES (@CourseId, 'Manejo de Cadena de Frio', 'CTY015', 1, 0, NULL, 'CLS008', @StartDate, @EndDate, 10, 20, 12, 1,
        'Curso especializado en cadena de frio para productos termolabiles',
        'Garantizar la conservacion adecuada de medicamentos refrigerados y vacunas',
        'Temperatura de conservacion, Monitoreo, Transporte refrigerado, Protocolo de ruptura',
        0, NULL, @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- Puestos: Almacenista (JOB041), Conductor Repartidor (JOB044)
INSERT INTO CoursePositions (PositionId, CourseId, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
SELECT p.PositionId, @CourseId, 'Curso obligatorio', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0
FROM Positions p WHERE p.JobId IN ('JOB041', 'JOB044') AND p.DataAreaId = @DataAreaId AND p.IsDeleted = 0;

INSERT INTO CourseEmployees (EmployeeId, CourseId, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
SELECT DISTINCT e.EmployeeId, @CourseId, 'Inscrito automaticamente', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0
FROM Employees e
INNER JOIN EmployeePositions ep ON e.EmployeeId = ep.EmployeeId AND e.DataAreaId = ep.DataAreaId
INNER JOIN Positions p ON ep.PositionId = p.PositionId AND ep.DataAreaId = p.DataAreaId
WHERE p.JobId IN ('JOB041', 'JOB044') AND e.DataAreaId = @DataAreaId AND e.WorkStatus = 2 AND e.IsDeleted = 0 AND ep.IsDeleted = 0;

PRINT '  Curso 6: Manejo de Cadena de Frio - Creado';

-- -----------------------------------------------------------------------
-- CURSO 7: Diabetes y Medicamentos (CTY020) - Personal Farmaceutico
-- -----------------------------------------------------------------------
SET @LastCourseNum = @LastCourseNum + 1;
SET @CourseId = 'CRS' + RIGHT('000' + CAST(@LastCourseNum AS VARCHAR), 3);
SET @StartDate = '2025-02-15 09:00:00';
SET @EndDate = '2025-02-16 17:00:00';

INSERT INTO Courses (CourseId, CourseName, CourseTypeId, IsMatrixTraining, InternalExternal, CourseParentId, ClassRoomId, StartDateTime, EndDateTime, MinStudents, MaxStudents, Periodicity, QtySessions, Description, Objetives, Topics, CourseStatus, URLDocuments, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES (@CourseId, 'Atencion al Paciente Diabetico', 'CTY020', 0, 1, NULL, 'CLS002', @StartDate, @EndDate, 15, 30, 12, 2,
        'Curso especializado en diabetes y su tratamiento farmacologico',
        'Brindar atencion especializada a pacientes diabeticos y orientar sobre medicamentos',
        'Tipos de diabetes, Insulinas, Antidiabeticos orales, Monitoreo glucemico, Educacion al paciente',
        0, NULL, @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- Puestos: Farmaceutico Regente (JOB021), Tecnico Farmacia (JOB025), Auxiliar Farmacia (JOB026)
INSERT INTO CoursePositions (PositionId, CourseId, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
SELECT p.PositionId, @CourseId, 'Curso recomendado', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0
FROM Positions p WHERE p.JobId IN ('JOB021', 'JOB025', 'JOB026') AND p.DataAreaId = @DataAreaId AND p.IsDeleted = 0;

INSERT INTO CourseEmployees (EmployeeId, CourseId, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
SELECT DISTINCT e.EmployeeId, @CourseId, 'Inscrito automaticamente', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0
FROM Employees e
INNER JOIN EmployeePositions ep ON e.EmployeeId = ep.EmployeeId AND e.DataAreaId = ep.DataAreaId
INNER JOIN Positions p ON ep.PositionId = p.PositionId AND ep.DataAreaId = p.DataAreaId
WHERE p.JobId IN ('JOB021', 'JOB025', 'JOB026') AND e.DataAreaId = @DataAreaId AND e.WorkStatus = 2 AND e.IsDeleted = 0 AND ep.IsDeleted = 0;

PRINT '  Curso 7: Atencion al Paciente Diabetico - Creado';

-- -----------------------------------------------------------------------
-- CURSO 8: Manejo de Caja (CTY019) - Cajeros
-- -----------------------------------------------------------------------
SET @LastCourseNum = @LastCourseNum + 1;
SET @CourseId = 'CRS' + RIGHT('000' + CAST(@LastCourseNum AS VARCHAR), 3);
SET @StartDate = '2025-02-20 08:00:00';
SET @EndDate = '2025-02-20 14:00:00';

INSERT INTO Courses (CourseId, CourseName, CourseTypeId, IsMatrixTraining, InternalExternal, CourseParentId, ClassRoomId, StartDateTime, EndDateTime, MinStudents, MaxStudents, Periodicity, QtySessions, Description, Objetives, Topics, CourseStatus, URLDocuments, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES (@CourseId, 'Operaciones de Caja y Facturacion', 'CTY019', 0, 0, NULL, 'CLS009', @StartDate, @EndDate, 10, 25, 3, 1,
        'Curso practico de manejo de caja para cajeros',
        'Dominar las operaciones de caja, facturacion y cierre de turno',
        'Sistema de caja, Facturacion electronica, Arqueo, Cierre de turno, Deteccion de billetes falsos',
        0, NULL, @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- Puestos: Cajero (JOB039)
INSERT INTO CoursePositions (PositionId, CourseId, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
SELECT p.PositionId, @CourseId, 'Curso obligatorio', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0
FROM Positions p WHERE p.JobId IN ('JOB039') AND p.DataAreaId = @DataAreaId AND p.IsDeleted = 0;

INSERT INTO CourseEmployees (EmployeeId, CourseId, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
SELECT DISTINCT e.EmployeeId, @CourseId, 'Inscrito automaticamente', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0
FROM Employees e
INNER JOIN EmployeePositions ep ON e.EmployeeId = ep.EmployeeId AND e.DataAreaId = ep.DataAreaId
INNER JOIN Positions p ON ep.PositionId = p.PositionId AND ep.DataAreaId = p.DataAreaId
WHERE p.JobId IN ('JOB039') AND e.DataAreaId = @DataAreaId AND e.WorkStatus = 2 AND e.IsDeleted = 0 AND ep.IsDeleted = 0;

PRINT '  Curso 8: Operaciones de Caja y Facturacion - Creado';

-- -----------------------------------------------------------------------
-- CURSO 9: Primeros Auxilios (CTY029) - Todo el personal
-- -----------------------------------------------------------------------
SET @LastCourseNum = @LastCourseNum + 1;
SET @CourseId = 'CRS' + RIGHT('000' + CAST(@LastCourseNum AS VARCHAR), 3);
SET @StartDate = '2025-02-25 08:00:00';
SET @EndDate = '2025-02-26 16:00:00';

INSERT INTO Courses (CourseId, CourseName, CourseTypeId, IsMatrixTraining, InternalExternal, CourseParentId, ClassRoomId, StartDateTime, EndDateTime, MinStudents, MaxStudents, Periodicity, QtySessions, Description, Objetives, Topics, CourseStatus, URLDocuments, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES (@CourseId, 'Primeros Auxilios en Farmacia', 'CTY029', 0, 1, NULL, 'CLS004', @StartDate, @EndDate, 30, 150, 12, 2,
        'Curso basico de primeros auxilios para todo el personal',
        'Capacitar al personal para responder ante emergencias medicas basicas',
        'RCP basico, Uso de DEA, Atencion de heridas, Emergencias comunes, Protocolo de emergencia',
        0, NULL, @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- Puestos: Supervisores (JOB011), Encargados (JOB020), Seguridad (JOB056)
INSERT INTO CoursePositions (PositionId, CourseId, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
SELECT p.PositionId, @CourseId, 'Curso obligatorio', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0
FROM Positions p WHERE p.JobId IN ('JOB011', 'JOB020', 'JOB056') AND p.DataAreaId = @DataAreaId AND p.IsDeleted = 0;

INSERT INTO CourseEmployees (EmployeeId, CourseId, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
SELECT DISTINCT e.EmployeeId, @CourseId, 'Inscrito automaticamente', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0
FROM Employees e
INNER JOIN EmployeePositions ep ON e.EmployeeId = ep.EmployeeId AND e.DataAreaId = ep.DataAreaId
INNER JOIN Positions p ON ep.PositionId = p.PositionId AND ep.DataAreaId = p.DataAreaId
WHERE p.JobId IN ('JOB011', 'JOB020', 'JOB056') AND e.DataAreaId = @DataAreaId AND e.WorkStatus = 2 AND e.IsDeleted = 0 AND ep.IsDeleted = 0;

PRINT '  Curso 9: Primeros Auxilios en Farmacia - Creado';

-- -----------------------------------------------------------------------
-- CURSO 10: Tecnicas de Ventas (CTY017) - Vendedores
-- -----------------------------------------------------------------------
SET @LastCourseNum = @LastCourseNum + 1;
SET @CourseId = 'CRS' + RIGHT('000' + CAST(@LastCourseNum AS VARCHAR), 3);
SET @StartDate = '2025-03-01 09:00:00';
SET @EndDate = '2025-03-01 17:00:00';

INSERT INTO Courses (CourseId, CourseName, CourseTypeId, IsMatrixTraining, InternalExternal, CourseParentId, ClassRoomId, StartDateTime, EndDateTime, MinStudents, MaxStudents, Periodicity, QtySessions, Description, Objetives, Topics, CourseStatus, URLDocuments, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES (@CourseId, 'Venta Consultiva en Farmacia', 'CTY017', 0, 0, NULL, 'CLS001', @StartDate, @EndDate, 20, 100, 6, 1,
        'Curso de tecnicas de venta consultiva para personal comercial',
        'Desarrollar habilidades de venta consultiva enfocada en el sector farmaceutico',
        'Venta cruzada, Identificacion de necesidades, Productos complementarios, Cierre de ventas',
        0, NULL, @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- Puestos: Vendedor Mostrador (JOB036), Ejecutivo Ventas (JOB037)
INSERT INTO CoursePositions (PositionId, CourseId, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
SELECT p.PositionId, @CourseId, 'Curso recomendado', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0
FROM Positions p WHERE p.JobId IN ('JOB036', 'JOB037') AND p.DataAreaId = @DataAreaId AND p.IsDeleted = 0;

INSERT INTO CourseEmployees (EmployeeId, CourseId, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
SELECT DISTINCT e.EmployeeId, @CourseId, 'Inscrito automaticamente', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0
FROM Employees e
INNER JOIN EmployeePositions ep ON e.EmployeeId = ep.EmployeeId AND e.DataAreaId = ep.DataAreaId
INNER JOIN Positions p ON ep.PositionId = p.PositionId AND ep.DataAreaId = p.DataAreaId
WHERE p.JobId IN ('JOB036', 'JOB037') AND e.DataAreaId = @DataAreaId AND e.WorkStatus = 2 AND e.IsDeleted = 0 AND ep.IsDeleted = 0;

PRINT '  Curso 10: Venta Consultiva en Farmacia - Creado';

-- -----------------------------------------------------------------------
-- CURSO 11: Legislacion Farmaceutica (CTY010) - Regentes y Supervisores
-- -----------------------------------------------------------------------
SET @LastCourseNum = @LastCourseNum + 1;
SET @CourseId = 'CRS' + RIGHT('000' + CAST(@LastCourseNum AS VARCHAR), 3);
SET @StartDate = '2025-03-05 08:00:00';
SET @EndDate = '2025-03-06 16:00:00';

INSERT INTO Courses (CourseId, CourseName, CourseTypeId, IsMatrixTraining, InternalExternal, CourseParentId, ClassRoomId, StartDateTime, EndDateTime, MinStudents, MaxStudents, Periodicity, QtySessions, Description, Objetives, Topics, CourseStatus, URLDocuments, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES (@CourseId, 'Marco Legal Farmaceutico RD', 'CTY010', 1, 1, NULL, 'CLS002', @StartDate, @EndDate, 10, 30, 12, 2,
        'Curso de legislacion farmaceutica dominicana',
        'Conocer el marco legal que regula el ejercicio farmaceutico en Republica Dominicana',
        'Ley General de Salud, Reglamentos DIGEMAPS, Requisitos legales, Sanciones',
        0, NULL, @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- Puestos: Farmaceutico Regente (JOB021), Director Farmaceutico (JOB010), Supervisor Sucursal (JOB011)
INSERT INTO CoursePositions (PositionId, CourseId, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
SELECT p.PositionId, @CourseId, 'Curso obligatorio', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0
FROM Positions p WHERE p.JobId IN ('JOB021', 'JOB010', 'JOB011') AND p.DataAreaId = @DataAreaId AND p.IsDeleted = 0;

INSERT INTO CourseEmployees (EmployeeId, CourseId, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
SELECT DISTINCT e.EmployeeId, @CourseId, 'Inscrito automaticamente', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0
FROM Employees e
INNER JOIN EmployeePositions ep ON e.EmployeeId = ep.EmployeeId AND e.DataAreaId = ep.DataAreaId
INNER JOIN Positions p ON ep.PositionId = p.PositionId AND ep.DataAreaId = p.DataAreaId
WHERE p.JobId IN ('JOB021', 'JOB010', 'JOB011') AND e.DataAreaId = @DataAreaId AND e.WorkStatus = 2 AND e.IsDeleted = 0 AND ep.IsDeleted = 0;

PRINT '  Curso 11: Marco Legal Farmaceutico RD - Creado';

-- -----------------------------------------------------------------------
-- CURSO 12: Antibioticos y Resistencia (CTY022) - Personal Farmaceutico
-- -----------------------------------------------------------------------
SET @LastCourseNum = @LastCourseNum + 1;
SET @CourseId = 'CRS' + RIGHT('000' + CAST(@LastCourseNum AS VARCHAR), 3);
SET @StartDate = '2025-03-10 09:00:00';
SET @EndDate = '2025-03-11 17:00:00';

INSERT INTO Courses (CourseId, CourseName, CourseTypeId, IsMatrixTraining, InternalExternal, CourseParentId, ClassRoomId, StartDateTime, EndDateTime, MinStudents, MaxStudents, Periodicity, QtySessions, Description, Objetives, Topics, CourseStatus, URLDocuments, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES (@CourseId, 'Uso Racional de Antibioticos', 'CTY022', 0, 1, NULL, 'CLS002', @StartDate, @EndDate, 15, 30, 12, 2,
        'Curso sobre uso racional de antibioticos y resistencia bacteriana',
        'Promover el uso adecuado de antibioticos y prevenir la resistencia bacteriana',
        'Clasificacion de antibioticos, Espectro de accion, Resistencia bacteriana, Educacion al paciente',
        0, NULL, @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- Puestos: Farmaceutico Regente (JOB021), Tecnico Farmacia (JOB025)
INSERT INTO CoursePositions (PositionId, CourseId, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
SELECT p.PositionId, @CourseId, 'Curso recomendado', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0
FROM Positions p WHERE p.JobId IN ('JOB021', 'JOB025') AND p.DataAreaId = @DataAreaId AND p.IsDeleted = 0;

INSERT INTO CourseEmployees (EmployeeId, CourseId, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
SELECT DISTINCT e.EmployeeId, @CourseId, 'Inscrito automaticamente', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0
FROM Employees e
INNER JOIN EmployeePositions ep ON e.EmployeeId = ep.EmployeeId AND e.DataAreaId = ep.DataAreaId
INNER JOIN Positions p ON ep.PositionId = p.PositionId AND ep.DataAreaId = p.DataAreaId
WHERE p.JobId IN ('JOB021', 'JOB025') AND e.DataAreaId = @DataAreaId AND e.WorkStatus = 2 AND e.IsDeleted = 0 AND ep.IsDeleted = 0;

PRINT '  Curso 12: Uso Racional de Antibioticos - Creado';

-- -----------------------------------------------------------------------
-- CURSO 13: Dermatologia y Cosmetica (CTY023) - Vendedores y Auxiliares
-- -----------------------------------------------------------------------
SET @LastCourseNum = @LastCourseNum + 1;
SET @CourseId = 'CRS' + RIGHT('000' + CAST(@LastCourseNum AS VARCHAR), 3);
SET @StartDate = '2025-03-15 09:00:00';
SET @EndDate = '2025-03-15 17:00:00';

INSERT INTO Courses (CourseId, CourseName, CourseTypeId, IsMatrixTraining, InternalExternal, CourseParentId, ClassRoomId, StartDateTime, EndDateTime, MinStudents, MaxStudents, Periodicity, QtySessions, Description, Objetives, Topics, CourseStatus, URLDocuments, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES (@CourseId, 'Dermocosmetica y Cuidado de Piel', 'CTY023', 0, 1, NULL, 'CLS001', @StartDate, @EndDate, 20, 100, 6, 1,
        'Curso de productos dermatologicos y cosmeticos',
        'Conocer los productos de cuidado de piel y brindar asesoria especializada',
        'Tipos de piel, Proteccion solar, Antienvejecimiento, Productos capilares, Asesoria personalizada',
        0, NULL, @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- Puestos: Vendedor Mostrador (JOB036), Auxiliar Farmacia (JOB026)
INSERT INTO CoursePositions (PositionId, CourseId, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
SELECT p.PositionId, @CourseId, 'Curso recomendado', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0
FROM Positions p WHERE p.JobId IN ('JOB036', 'JOB026') AND p.DataAreaId = @DataAreaId AND p.IsDeleted = 0;

INSERT INTO CourseEmployees (EmployeeId, CourseId, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
SELECT DISTINCT e.EmployeeId, @CourseId, 'Inscrito automaticamente', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0
FROM Employees e
INNER JOIN EmployeePositions ep ON e.EmployeeId = ep.EmployeeId AND e.DataAreaId = ep.DataAreaId
INNER JOIN Positions p ON ep.PositionId = p.PositionId AND ep.DataAreaId = p.DataAreaId
WHERE p.JobId IN ('JOB036', 'JOB026') AND e.DataAreaId = @DataAreaId AND e.WorkStatus = 2 AND e.IsDeleted = 0 AND ep.IsDeleted = 0;

PRINT '  Curso 13: Dermocosmetica y Cuidado de Piel - Creado';

-- -----------------------------------------------------------------------
-- CURSO 14: Seguridad Ocupacional (CTY030) - Todo personal
-- -----------------------------------------------------------------------
SET @LastCourseNum = @LastCourseNum + 1;
SET @CourseId = 'CRS' + RIGHT('000' + CAST(@LastCourseNum AS VARCHAR), 3);
SET @StartDate = '2025-03-20 08:00:00';
SET @EndDate = '2025-03-20 16:00:00';

INSERT INTO Courses (CourseId, CourseName, CourseTypeId, IsMatrixTraining, InternalExternal, CourseParentId, ClassRoomId, StartDateTime, EndDateTime, MinStudents, MaxStudents, Periodicity, QtySessions, Description, Objetives, Topics, CourseStatus, URLDocuments, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES (@CourseId, 'Seguridad y Salud Ocupacional', 'CTY030', 0, 0, NULL, 'CLS001', @StartDate, @EndDate, 30, 100, 12, 1,
        'Curso de seguridad ocupacional para todo el personal',
        'Prevenir accidentes laborales y promover un ambiente de trabajo seguro',
        'Riesgos laborales, EPP, Ergonomia, Manejo de sustancias, Plan de emergencia',
        0, NULL, @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- Puestos: Almacenista (JOB041), Conductor (JOB044), Conserje (JOB057), Mantenimiento (JOB058)
INSERT INTO CoursePositions (PositionId, CourseId, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
SELECT p.PositionId, @CourseId, 'Curso obligatorio', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0
FROM Positions p WHERE p.JobId IN ('JOB041', 'JOB044', 'JOB057', 'JOB058') AND p.DataAreaId = @DataAreaId AND p.IsDeleted = 0;

INSERT INTO CourseEmployees (EmployeeId, CourseId, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
SELECT DISTINCT e.EmployeeId, @CourseId, 'Inscrito automaticamente', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0
FROM Employees e
INNER JOIN EmployeePositions ep ON e.EmployeeId = ep.EmployeeId AND e.DataAreaId = ep.DataAreaId
INNER JOIN Positions p ON ep.PositionId = p.PositionId AND ep.DataAreaId = p.DataAreaId
WHERE p.JobId IN ('JOB041', 'JOB044', 'JOB057', 'JOB058') AND e.DataAreaId = @DataAreaId AND e.WorkStatus = 2 AND e.IsDeleted = 0 AND ep.IsDeleted = 0;

PRINT '  Curso 14: Seguridad y Salud Ocupacional - Creado';

-- -----------------------------------------------------------------------
-- CURSO 15: Farmacovigilancia (CTY012) - Personal Farmaceutico
-- -----------------------------------------------------------------------
SET @LastCourseNum = @LastCourseNum + 1;
SET @CourseId = 'CRS' + RIGHT('000' + CAST(@LastCourseNum AS VARCHAR), 3);
SET @StartDate = '2025-03-25 09:00:00';
SET @EndDate = '2025-03-26 17:00:00';

INSERT INTO Courses (CourseId, CourseName, CourseTypeId, IsMatrixTraining, InternalExternal, CourseParentId, ClassRoomId, StartDateTime, EndDateTime, MinStudents, MaxStudents, Periodicity, QtySessions, Description, Objetives, Topics, CourseStatus, URLDocuments, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES (@CourseId, 'Farmacovigilancia Practica', 'CTY012', 1, 0, NULL, 'CLS008', @StartDate, @EndDate, 10, 20, 12, 2,
        'Curso de farmacovigilancia y reporte de reacciones adversas',
        'Identificar, evaluar y reportar reacciones adversas a medicamentos',
        'Reacciones adversas, Sistema de reporte, Causalidad, Casos practicos',
        0, NULL, @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- Puestos: Farmaceutico Regente (JOB021), Director Farmaceutico (JOB010)
INSERT INTO CoursePositions (PositionId, CourseId, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
SELECT p.PositionId, @CourseId, 'Curso obligatorio', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0
FROM Positions p WHERE p.JobId IN ('JOB021', 'JOB010') AND p.DataAreaId = @DataAreaId AND p.IsDeleted = 0;

INSERT INTO CourseEmployees (EmployeeId, CourseId, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
SELECT DISTINCT e.EmployeeId, @CourseId, 'Inscrito automaticamente', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0
FROM Employees e
INNER JOIN EmployeePositions ep ON e.EmployeeId = ep.EmployeeId AND e.DataAreaId = ep.DataAreaId
INNER JOIN Positions p ON ep.PositionId = p.PositionId AND ep.DataAreaId = p.DataAreaId
WHERE p.JobId IN ('JOB021', 'JOB010') AND e.DataAreaId = @DataAreaId AND e.WorkStatus = 2 AND e.IsDeleted = 0 AND ep.IsDeleted = 0;

PRINT '  Curso 15: Farmacovigilancia Practica - Creado';

-- -----------------------------------------------------------------------
-- CURSO 16: Interacciones Medicamentosas (CTY003) - Personal Farmaceutico
-- -----------------------------------------------------------------------
SET @LastCourseNum = @LastCourseNum + 1;
SET @CourseId = 'CRS' + RIGHT('000' + CAST(@LastCourseNum AS VARCHAR), 3);
SET @StartDate = '2025-04-01 09:00:00';
SET @EndDate = '2025-04-02 17:00:00';

INSERT INTO Courses (CourseId, CourseName, CourseTypeId, IsMatrixTraining, InternalExternal, CourseParentId, ClassRoomId, StartDateTime, EndDateTime, MinStudents, MaxStudents, Periodicity, QtySessions, Description, Objetives, Topics, CourseStatus, URLDocuments, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES (@CourseId, 'Interacciones Farmacologicas', 'CTY003', 1, 0, NULL, 'CLS002', @StartDate, @EndDate, 15, 30, 12, 2,
        'Curso avanzado de interacciones medicamentosas',
        'Identificar y manejar interacciones medicamentosas clinicamente relevantes',
        'Tipos de interacciones, Farmacos de alto riesgo, Herramientas de consulta, Casos clinicos',
        0, NULL, @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- Puestos: Farmaceutico Regente (JOB021), Tecnico Farmacia (JOB025)
INSERT INTO CoursePositions (PositionId, CourseId, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
SELECT p.PositionId, @CourseId, 'Curso obligatorio', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0
FROM Positions p WHERE p.JobId IN ('JOB021', 'JOB025') AND p.DataAreaId = @DataAreaId AND p.IsDeleted = 0;

INSERT INTO CourseEmployees (EmployeeId, CourseId, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
SELECT DISTINCT e.EmployeeId, @CourseId, 'Inscrito automaticamente', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0
FROM Employees e
INNER JOIN EmployeePositions ep ON e.EmployeeId = ep.EmployeeId AND e.DataAreaId = ep.DataAreaId
INNER JOIN Positions p ON ep.PositionId = p.PositionId AND ep.DataAreaId = p.DataAreaId
WHERE p.JobId IN ('JOB021', 'JOB025') AND e.DataAreaId = @DataAreaId AND e.WorkStatus = 2 AND e.IsDeleted = 0 AND ep.IsDeleted = 0;

PRINT '  Curso 16: Interacciones Farmacologicas - Creado';

-- -----------------------------------------------------------------------
-- CURSO 17: Lectura de Recetas (CTY009) - Todo personal de mostrador
-- -----------------------------------------------------------------------
SET @LastCourseNum = @LastCourseNum + 1;
SET @CourseId = 'CRS' + RIGHT('000' + CAST(@LastCourseNum AS VARCHAR), 3);
SET @StartDate = '2025-04-05 08:00:00';
SET @EndDate = '2025-04-05 14:00:00';

INSERT INTO Courses (CourseId, CourseName, CourseTypeId, IsMatrixTraining, InternalExternal, CourseParentId, ClassRoomId, StartDateTime, EndDateTime, MinStudents, MaxStudents, Periodicity, QtySessions, Description, Objetives, Topics, CourseStatus, URLDocuments, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES (@CourseId, 'Interpretacion de Recetas Medicas', 'CTY009', 0, 0, NULL, 'CLS003', @StartDate, @EndDate, 10, 25, 6, 1,
        'Curso practico de lectura e interpretacion de recetas',
        'Interpretar correctamente las prescripciones medicas y abreviaturas',
        'Partes de la receta, Abreviaturas medicas, Posologia, Errores comunes',
        0, NULL, @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- Puestos: Auxiliar Farmacia (JOB026), Vendedor (JOB036)
INSERT INTO CoursePositions (PositionId, CourseId, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
SELECT p.PositionId, @CourseId, 'Curso obligatorio', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0
FROM Positions p WHERE p.JobId IN ('JOB026', 'JOB036') AND p.DataAreaId = @DataAreaId AND p.IsDeleted = 0;

INSERT INTO CourseEmployees (EmployeeId, CourseId, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
SELECT DISTINCT e.EmployeeId, @CourseId, 'Inscrito automaticamente', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0
FROM Employees e
INNER JOIN EmployeePositions ep ON e.EmployeeId = ep.EmployeeId AND e.DataAreaId = ep.DataAreaId
INNER JOIN Positions p ON ep.PositionId = p.PositionId AND ep.DataAreaId = p.DataAreaId
WHERE p.JobId IN ('JOB026', 'JOB036') AND e.DataAreaId = @DataAreaId AND e.WorkStatus = 2 AND e.IsDeleted = 0 AND ep.IsDeleted = 0;

PRINT '  Curso 17: Interpretacion de Recetas Medicas - Creado';

-- -----------------------------------------------------------------------
-- CURSO 18: Hipertension Arterial (CTY021) - Personal Farmaceutico
-- -----------------------------------------------------------------------
SET @LastCourseNum = @LastCourseNum + 1;
SET @CourseId = 'CRS' + RIGHT('000' + CAST(@LastCourseNum AS VARCHAR), 3);
SET @StartDate = '2025-04-10 09:00:00';
SET @EndDate = '2025-04-11 17:00:00';

INSERT INTO Courses (CourseId, CourseName, CourseTypeId, IsMatrixTraining, InternalExternal, CourseParentId, ClassRoomId, StartDateTime, EndDateTime, MinStudents, MaxStudents, Periodicity, QtySessions, Description, Objetives, Topics, CourseStatus, URLDocuments, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES (@CourseId, 'Manejo de Hipertension Arterial', 'CTY021', 0, 1, NULL, 'CLS002', @StartDate, @EndDate, 15, 30, 12, 2,
        'Curso de atencion al paciente hipertenso',
        'Brindar atencion especializada a pacientes con hipertension arterial',
        'Clasificacion de HTA, Antihipertensivos, Medicion de presion, Estilo de vida',
        0, NULL, @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- Puestos: Farmaceutico Regente (JOB021), Tecnico Farmacia (JOB025)
INSERT INTO CoursePositions (PositionId, CourseId, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
SELECT p.PositionId, @CourseId, 'Curso recomendado', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0
FROM Positions p WHERE p.JobId IN ('JOB021', 'JOB025') AND p.DataAreaId = @DataAreaId AND p.IsDeleted = 0;

INSERT INTO CourseEmployees (EmployeeId, CourseId, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
SELECT DISTINCT e.EmployeeId, @CourseId, 'Inscrito automaticamente', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0
FROM Employees e
INNER JOIN EmployeePositions ep ON e.EmployeeId = ep.EmployeeId AND e.DataAreaId = ep.DataAreaId
INNER JOIN Positions p ON ep.PositionId = p.PositionId AND ep.DataAreaId = p.DataAreaId
WHERE p.JobId IN ('JOB021', 'JOB025') AND e.DataAreaId = @DataAreaId AND e.WorkStatus = 2 AND e.IsDeleted = 0 AND ep.IsDeleted = 0;

PRINT '  Curso 18: Manejo de Hipertension Arterial - Creado';

-- -----------------------------------------------------------------------
-- CURSO 19: Dispositivos Medicos (CTY027) - Vendedores y Asesores
-- -----------------------------------------------------------------------
SET @LastCourseNum = @LastCourseNum + 1;
SET @CourseId = 'CRS' + RIGHT('000' + CAST(@LastCourseNum AS VARCHAR), 3);
SET @StartDate = '2025-04-15 09:00:00';
SET @EndDate = '2025-04-15 17:00:00';

INSERT INTO Courses (CourseId, CourseName, CourseTypeId, IsMatrixTraining, InternalExternal, CourseParentId, ClassRoomId, StartDateTime, EndDateTime, MinStudents, MaxStudents, Periodicity, QtySessions, Description, Objetives, Topics, CourseStatus, URLDocuments, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES (@CourseId, 'Dispositivos Medicos y Equipos', 'CTY027', 0, 1, NULL, 'CLS007', @StartDate, @EndDate, 10, 15, 6, 1,
        'Curso de dispositivos medicos de uso domestico',
        'Conocer y asesorar sobre dispositivos medicos disponibles en farmacia',
        'Glucometros, Tensiometros, Nebulizadores, Oximetros, Demostracion practica',
        0, NULL, @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- Puestos: Vendedor (JOB036), Asesor Servicio (JOB038)
INSERT INTO CoursePositions (PositionId, CourseId, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
SELECT p.PositionId, @CourseId, 'Curso recomendado', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0
FROM Positions p WHERE p.JobId IN ('JOB036', 'JOB038') AND p.DataAreaId = @DataAreaId AND p.IsDeleted = 0;

INSERT INTO CourseEmployees (EmployeeId, CourseId, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
SELECT DISTINCT e.EmployeeId, @CourseId, 'Inscrito automaticamente', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0
FROM Employees e
INNER JOIN EmployeePositions ep ON e.EmployeeId = ep.EmployeeId AND e.DataAreaId = ep.DataAreaId
INNER JOIN Positions p ON ep.PositionId = p.PositionId AND ep.DataAreaId = p.DataAreaId
WHERE p.JobId IN ('JOB036', 'JOB038') AND e.DataAreaId = @DataAreaId AND e.WorkStatus = 2 AND e.IsDeleted = 0 AND ep.IsDeleted = 0;

PRINT '  Curso 19: Dispositivos Medicos y Equipos - Creado';

-- -----------------------------------------------------------------------
-- CURSO 20: Buenas Practicas de Farmacia (CTY011) - Todo personal farmaceutico
-- -----------------------------------------------------------------------
SET @LastCourseNum = @LastCourseNum + 1;
SET @CourseId = 'CRS' + RIGHT('000' + CAST(@LastCourseNum AS VARCHAR), 3);
SET @StartDate = '2025-04-20 08:00:00';
SET @EndDate = '2025-04-21 16:00:00';

INSERT INTO Courses (CourseId, CourseName, CourseTypeId, IsMatrixTraining, InternalExternal, CourseParentId, ClassRoomId, StartDateTime, EndDateTime, MinStudents, MaxStudents, Periodicity, QtySessions, Description, Objetives, Topics, CourseStatus, URLDocuments, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES (@CourseId, 'Buenas Practicas de Farmacia BPF', 'CTY011', 1, 0, NULL, 'CLS004', @StartDate, @EndDate, 30, 150, 12, 2,
        'Curso integral de Buenas Practicas de Farmacia',
        'Implementar los estandares de BPF en todas las operaciones de la farmacia',
        'Estandares BPF, Almacenamiento, Dispensacion, Control de calidad, Documentacion',
        0, NULL, @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- Puestos: Todos los farmaceuticos y personal de farmacia
INSERT INTO CoursePositions (PositionId, CourseId, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
SELECT p.PositionId, @CourseId, 'Curso obligatorio', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0
FROM Positions p WHERE p.JobId IN ('JOB021', 'JOB025', 'JOB026', 'JOB010', 'JOB011', 'JOB020') AND p.DataAreaId = @DataAreaId AND p.IsDeleted = 0;

INSERT INTO CourseEmployees (EmployeeId, CourseId, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
SELECT DISTINCT e.EmployeeId, @CourseId, 'Inscrito automaticamente', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0
FROM Employees e
INNER JOIN EmployeePositions ep ON e.EmployeeId = ep.EmployeeId AND e.DataAreaId = ep.DataAreaId
INNER JOIN Positions p ON ep.PositionId = p.PositionId AND ep.DataAreaId = p.DataAreaId
WHERE p.JobId IN ('JOB021', 'JOB025', 'JOB026', 'JOB010', 'JOB011', 'JOB020') AND e.DataAreaId = @DataAreaId AND e.WorkStatus = 2 AND e.IsDeleted = 0 AND ep.IsDeleted = 0;

PRINT '  Curso 20: Buenas Practicas de Farmacia BPF - Creado';

-- ============================================================================
-- RESUMEN
-- ============================================================================
PRINT ''
PRINT '========================================'
PRINT 'CURSOS CREADOS EXITOSAMENTE'
PRINT '========================================'

SELECT c.CourseId, c.CourseName, ct.Name AS TipoCurso,
       CONVERT(VARCHAR(10), c.StartDateTime, 103) AS FechaInicio,
       cl.Name AS Salon
FROM Courses c
INNER JOIN CourseTypes ct ON c.CourseTypeId = ct.CourseTypeId AND c.DataAreaId = ct.DataAreaId
INNER JOIN ClassRooms cl ON c.ClassRoomId = cl.ClassRoomId AND c.DataAreaId = cl.DataAreaId
WHERE c.DataAreaId = @DataAreaId AND c.IsDeleted = 0
ORDER BY c.CourseId;

PRINT ''
PRINT '--- RESUMEN DE ASIGNACIONES ---'

DECLARE @TotalCursos INT, @TotalPuestos INT, @TotalEmpleados INT;
SELECT @TotalCursos = COUNT(*) FROM Courses WHERE DataAreaId = @DataAreaId AND IsDeleted = 0;
SELECT @TotalPuestos = COUNT(*) FROM CoursePositions WHERE DataAreaId = @DataAreaId AND IsDeleted = 0;
SELECT @TotalEmpleados = COUNT(*) FROM CourseEmployees WHERE DataAreaId = @DataAreaId AND IsDeleted = 0;

PRINT 'Total cursos creados: ' + CAST(@TotalCursos AS VARCHAR);
PRINT 'Total puestos asignados: ' + CAST(@TotalPuestos AS VARCHAR);
PRINT 'Total empleados inscritos: ' + CAST(@TotalEmpleados AS VARCHAR);

PRINT ''
PRINT '--- EMPLEADOS POR CURSO ---'
SELECT c.CourseId, c.CourseName, COUNT(ce.EmployeeId) AS Empleados
FROM Courses c
LEFT JOIN CourseEmployees ce ON c.CourseId = ce.CourseId AND c.DataAreaId = ce.DataAreaId AND ce.IsDeleted = 0
WHERE c.DataAreaId = @DataAreaId AND c.IsDeleted = 0
GROUP BY c.CourseId, c.CourseName
ORDER BY c.CourseId;

SET NOCOUNT OFF;
GO
