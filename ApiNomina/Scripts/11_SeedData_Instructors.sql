-- ============================================================================
-- Script: 11_SeedData_Instructors.sql
-- Descripcion: Inserta 20 instructores y los asigna a los cursos creados
-- Ejecutar: Despues de 10_SeedData_Courses.sql
-- Autor: Equipo de Desarrollo
-- Fecha: 2025-12-03
-- ============================================================================

SET NOCOUNT ON;

PRINT '========================================'
PRINT 'CREACION DE INSTRUCTORES'
PRINT '========================================'
PRINT ''

DECLARE @DataAreaId NVARCHAR(20) = 'Farm';

-- Verificar cuantos instructores ya existen
DECLARE @ExistingCount INT;
SELECT @ExistingCount = COUNT(*) FROM Instructors WHERE DataAreaId = @DataAreaId;
PRINT 'Instructores existentes: ' + CAST(@ExistingCount AS VARCHAR);

-- Obtener el ultimo ID
DECLARE @LastNum INT;
SELECT @LastNum = ISNULL(MAX(CAST(REPLACE(InstructorId, 'INS', '') AS INT)), 0)
FROM Instructors WHERE DataAreaId = @DataAreaId;

-- ============================================================================
-- INSERTAR INSTRUCTORES
-- ============================================================================

PRINT ''
PRINT 'Insertando instructores...'

-- 1. Instructor para Farmacologia Basica (CRS001)
SET @LastNum = @LastNum + 1;
INSERT INTO Instructors (InstructorId, Name, Phone, Mail, Company, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('INS' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Dr. Rafael Mendoza Castillo',
        '809-555-1001',
        'r.mendoza@farmacologia.edu.do',
        'Universidad Autonoma de Santo Domingo',
        'Especialista en Farmacologia - 15 anos de experiencia docente',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- 2. Instructor para Tecnicas de Dispensacion (CRS002)
SET @LastNum = @LastNum + 1;
INSERT INTO Instructors (InstructorId, Name, Phone, Mail, Company, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('INS' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Dra. Carmen Altagracia Reyes',
        '809-555-1002',
        'c.reyes@colegiofarma.org.do',
        'Colegio Dominicano de Farmaceuticos',
        'Farmaceutica con certificacion en dispensacion hospitalaria',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- 3. Instructor para Servicio al Cliente (CRS003)
SET @LastNum = @LastNum + 1;
INSERT INTO Instructors (InstructorId, Name, Phone, Mail, Company, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('INS' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Lic. Miguel Angel Santos',
        '809-555-1003',
        'm.santos@consultoresrh.com',
        'Consultores RH Dominicana',
        'Especialista en servicio al cliente y experiencia del consumidor',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- 4. Instructor para Medicamentos Controlados (CRS004)
SET @LastNum = @LastNum + 1;
INSERT INTO Instructors (InstructorId, Name, Phone, Mail, Company, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('INS' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Dra. Patricia Henriquez Luna',
        '809-555-1004',
        'p.henriquez@digemaps.gob.do',
        'DIGEMAPS - Ministerio de Salud',
        'Inspectora farmaceutica - Experta en sustancias controladas',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- 5. Instructor para Gestion de Inventarios (CRS005)
SET @LastNum = @LastNum + 1;
INSERT INTO Instructors (InstructorId, Name, Phone, Mail, Company, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('INS' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Ing. Roberto Carlos Mejia',
        '809-555-1005',
        'r.mejia@logisticafarma.com',
        'Logistica Farmaceutica SRL',
        'Ingeniero industrial especializado en cadena de suministro farmaceutico',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- 6. Instructor para Cadena de Frio (CRS006)
SET @LastNum = @LastNum + 1;
INSERT INTO Instructors (InstructorId, Name, Phone, Mail, Company, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('INS' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Lic. Ana Maria Valdez',
        '809-555-1006',
        'a.valdez@ops.org.do',
        'Organizacion Panamericana de la Salud',
        'Especialista en cadena de frio y vacunas',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- 7. Instructor para Diabetes (CRS007)
SET @LastNum = @LastNum + 1;
INSERT INTO Instructors (InstructorId, Name, Phone, Mail, Company, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('INS' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Dr. Juan Pablo Guzman',
        '809-555-1007',
        'j.guzman@endocrinologia.do',
        'Sociedad Dominicana de Endocrinologia',
        'Endocrinologo - Especialista en diabetes mellitus',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- 8. Instructor para Manejo de Caja (CRS008)
SET @LastNum = @LastNum + 1;
INSERT INTO Instructors (InstructorId, Name, Phone, Mail, Company, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('INS' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Lic. Maria Elena Duran',
        '809-555-1008',
        'm.duran@farmaciarh365.com',
        'Farmacia RH-365 (Interno)',
        'Supervisora de operaciones - 10 anos de experiencia en retail farmaceutico',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- 9. Instructor para Primeros Auxilios (CRS009)
SET @LastNum = @LastNum + 1;
INSERT INTO Instructors (InstructorId, Name, Phone, Mail, Company, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('INS' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Dr. Carlos Manuel Perez',
        '809-555-1009',
        'c.perez@cruzroja.org.do',
        'Cruz Roja Dominicana',
        'Medico emergenciologo - Instructor certificado en RCP y primeros auxilios',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- 10. Instructor para Tecnicas de Ventas (CRS010)
SET @LastNum = @LastNum + 1;
INSERT INTO Instructors (InstructorId, Name, Phone, Mail, Company, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('INS' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Lic. Fernando Jose Acosta',
        '809-555-1010',
        'f.acosta@ventaspro.com',
        'Ventas Profesionales RD',
        'Coach de ventas - Especialista en venta consultiva',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- 11. Instructor para Legislacion Farmaceutica (CRS011)
SET @LastNum = @LastNum + 1;
INSERT INTO Instructors (InstructorId, Name, Phone, Mail, Company, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('INS' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Dra. Luz Maria Santana',
        '809-555-1011',
        'l.santana@colegiofarma.org.do',
        'Colegio Dominicano de Farmaceuticos',
        'Abogada y farmaceutica - Especialista en derecho farmaceutico',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- 12. Instructor para Antibioticos (CRS012)
SET @LastNum = @LastNum + 1;
INSERT INTO Instructors (InstructorId, Name, Phone, Mail, Company, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('INS' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Dr. Pedro Antonio Rosario',
        '809-555-1012',
        'p.rosario@infectologia.do',
        'Sociedad Dominicana de Infectologia',
        'Infectologo - Experto en resistencia antimicrobiana',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- 13. Instructor para Dermatologia y Cosmetica (CRS013)
SET @LastNum = @LastNum + 1;
INSERT INTO Instructors (InstructorId, Name, Phone, Mail, Company, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('INS' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Dra. Gabriela Fernandez',
        '809-555-1013',
        'g.fernandez@dermalab.com.do',
        'DermaLab Dominicana',
        'Dermatologa cosmiatra - Especialista en cuidado de la piel',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- 14. Instructor para Seguridad Ocupacional (CRS014)
SET @LastNum = @LastNum + 1;
INSERT INTO Instructors (InstructorId, Name, Phone, Mail, Company, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('INS' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Ing. Ramon Alberto Cruz',
        '809-555-1014',
        'r.cruz@seguridadlaboral.do',
        'Seguridad Laboral RD',
        'Ingeniero en higiene y seguridad industrial',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- 15. Instructor para Farmacovigilancia (CRS015)
SET @LastNum = @LastNum + 1;
INSERT INTO Instructors (InstructorId, Name, Phone, Mail, Company, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('INS' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Dra. Isabel Cristina Marte',
        '809-555-1015',
        'i.marte@farmacovigilancia.gob.do',
        'Centro Nacional de Farmacovigilancia',
        'Farmaceutica especialista en seguridad de medicamentos',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- 16. Instructor para Interacciones Medicamentosas (CRS016)
SET @LastNum = @LastNum + 1;
INSERT INTO Instructors (InstructorId, Name, Phone, Mail, Company, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('INS' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Dr. Andres Felipe Taveras',
        '809-555-1016',
        'a.taveras@unphu.edu.do',
        'Universidad Nacional Pedro Henriquez Urena',
        'Doctor en farmacia clinica - Investigador en interacciones',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- 17. Instructor para Lectura de Recetas (CRS017)
SET @LastNum = @LastNum + 1;
INSERT INTO Instructors (InstructorId, Name, Phone, Mail, Company, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('INS' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Dra. Yolanda Mercedes Pena',
        '809-555-1017',
        'y.pena@farmaciarh365.com',
        'Farmacia RH-365 (Interno)',
        'Farmaceutica regente - Instructora interna',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- 18. Instructor para Hipertension (CRS018)
SET @LastNum = @LastNum + 1;
INSERT INTO Instructors (InstructorId, Name, Phone, Mail, Company, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('INS' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Dr. Luis Eduardo Bautista',
        '809-555-1018',
        'l.bautista@cardiologia.do',
        'Sociedad Dominicana de Cardiologia',
        'Cardiologo - Especialista en hipertension arterial',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- 19. Instructor para Dispositivos Medicos (CRS019)
SET @LastNum = @LastNum + 1;
INSERT INTO Instructors (InstructorId, Name, Phone, Mail, Company, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('INS' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Ing. Sandra Patricia Lora',
        '809-555-1019',
        's.lora@medicaldevices.do',
        'Medical Devices Dominicana',
        'Ingeniera biomedica - Especialista en equipos de monitoreo',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- 20. Instructor para BPF (CRS020)
SET @LastNum = @LastNum + 1;
INSERT INTO Instructors (InstructorId, Name, Phone, Mail, Company, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('INS' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Dra. Margarita Rosa Jimenez',
        '809-555-1020',
        'm.jimenez@calidadfarma.com',
        'Calidad Farmaceutica Internacional',
        'Consultora en Buenas Practicas - Auditora certificada',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

PRINT '  20 instructores creados';

-- ============================================================================
-- ASIGNAR INSTRUCTORES A CURSOS
-- ============================================================================

PRINT ''
PRINT 'Asignando instructores a cursos...'

-- Asignar cada instructor a su curso correspondiente
INSERT INTO CourseInstructors (CourseId, InstructorId, Comment, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES
('CRS001', 'INS001', 'Instructor principal del curso', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0),
('CRS002', 'INS002', 'Instructor principal del curso', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0),
('CRS003', 'INS003', 'Instructor principal del curso', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0),
('CRS004', 'INS004', 'Instructor principal del curso', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0),
('CRS005', 'INS005', 'Instructor principal del curso', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0),
('CRS006', 'INS006', 'Instructor principal del curso', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0),
('CRS007', 'INS007', 'Instructor principal del curso', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0),
('CRS008', 'INS008', 'Instructor principal del curso', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0),
('CRS009', 'INS009', 'Instructor principal del curso', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0),
('CRS010', 'INS010', 'Instructor principal del curso', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0),
('CRS011', 'INS011', 'Instructor principal del curso', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0),
('CRS012', 'INS012', 'Instructor principal del curso', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0),
('CRS013', 'INS013', 'Instructor principal del curso', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0),
('CRS014', 'INS014', 'Instructor principal del curso', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0),
('CRS015', 'INS015', 'Instructor principal del curso', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0),
('CRS016', 'INS016', 'Instructor principal del curso', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0),
('CRS017', 'INS017', 'Instructor principal del curso', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0),
('CRS018', 'INS018', 'Instructor principal del curso', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0),
('CRS019', 'INS019', 'Instructor principal del curso', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0),
('CRS020', 'INS020', 'Instructor principal del curso', @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

PRINT '  20 asignaciones curso-instructor creadas';

-- ============================================================================
-- RESUMEN
-- ============================================================================
PRINT ''
PRINT '========================================'
PRINT 'INSTRUCTORES CREADOS EXITOSAMENTE'
PRINT '========================================'

SELECT i.InstructorId, i.Name AS Instructor, i.Company AS Empresa, c.CourseName AS Curso
FROM Instructors i
INNER JOIN CourseInstructors ci ON i.InstructorId = ci.InstructorId AND i.DataAreaId = ci.DataAreaId
INNER JOIN Courses c ON ci.CourseId = c.CourseId AND ci.DataAreaId = c.DataAreaId
WHERE i.DataAreaId = @DataAreaId AND i.IsDeleted = 0
ORDER BY i.InstructorId;

DECLARE @TotalInstructores INT, @TotalAsignaciones INT;
SELECT @TotalInstructores = COUNT(*) FROM Instructors WHERE DataAreaId = @DataAreaId AND IsDeleted = 0;
SELECT @TotalAsignaciones = COUNT(*) FROM CourseInstructors WHERE DataAreaId = @DataAreaId AND IsDeleted = 0;

PRINT ''
PRINT 'Total instructores: ' + CAST(@TotalInstructores AS VARCHAR);
PRINT 'Total asignaciones a cursos: ' + CAST(@TotalAsignaciones AS VARCHAR);

SET NOCOUNT OFF;
GO
