-- ============================================================================
-- Script: 09_SeedData_CourseTypes.sql
-- Descripcion: Inserta 30 tipos de cursos orientados a farmacias para RH-365
-- Ejecutar: En cualquier momento
-- Autor: Equipo de Desarrollo
-- Fecha: 2025-12-03
-- ============================================================================

SET NOCOUNT ON;

PRINT '========================================'
PRINT 'CREACION DE TIPOS DE CURSOS'
PRINT '========================================'
PRINT ''

DECLARE @DataAreaId NVARCHAR(20) = 'Farm';

-- Verificar cuantos tipos ya existen
DECLARE @ExistingCount INT;
SELECT @ExistingCount = COUNT(*) FROM CourseTypes WHERE DataAreaId = @DataAreaId;
PRINT 'Tipos de cursos existentes: ' + CAST(@ExistingCount AS VARCHAR);

-- Obtener el ultimo ID
DECLARE @LastNum INT;
SELECT @LastNum = ISNULL(MAX(CAST(REPLACE(CourseTypeId, 'CTY', '') AS INT)), 0)
FROM CourseTypes WHERE DataAreaId = @DataAreaId;

-- ============================================================================
-- INSERTAR TIPOS DE CURSOS
-- ============================================================================

PRINT ''
PRINT 'Insertando tipos de cursos...'

-- CATEGORIA: FARMACOLOGIA Y MEDICAMENTOS
-- 1
SET @LastNum = @LastNum + 1;
INSERT INTO CourseTypes (CourseTypeId, Name, Description, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('CTY' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Farmacologia Basica',
        'Fundamentos de farmacologia, mecanismos de accion de medicamentos y principios activos',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- 2
SET @LastNum = @LastNum + 1;
INSERT INTO CourseTypes (CourseTypeId, Name, Description, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('CTY' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Farmacologia Avanzada',
        'Farmacocinetica, farmacodinamia e interacciones medicamentosas complejas',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- 3
SET @LastNum = @LastNum + 1;
INSERT INTO CourseTypes (CourseTypeId, Name, Description, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('CTY' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Interacciones Medicamentosas',
        'Identificacion y manejo de interacciones entre farmacos y alimentos',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- 4
SET @LastNum = @LastNum + 1;
INSERT INTO CourseTypes (CourseTypeId, Name, Description, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('CTY' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Medicamentos Controlados',
        'Manejo, dispensacion y registro de sustancias controladas segun normativas',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- 5
SET @LastNum = @LastNum + 1;
INSERT INTO CourseTypes (CourseTypeId, Name, Description, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('CTY' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Medicamentos Genericos',
        'Bioequivalencia, sustitucion terapeutica y promocion de genericos',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- CATEGORIA: DISPENSACION Y ATENCION AL PACIENTE
-- 6
SET @LastNum = @LastNum + 1;
INSERT INTO CourseTypes (CourseTypeId, Name, Description, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('CTY' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Dispensacion Farmaceutica',
        'Tecnicas de dispensacion, verificacion de recetas y orientacion al paciente',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- 7
SET @LastNum = @LastNum + 1;
INSERT INTO CourseTypes (CourseTypeId, Name, Description, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('CTY' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Atencion Farmaceutica',
        'Seguimiento farmacoterapeutico y atencion personalizada al paciente',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- 8
SET @LastNum = @LastNum + 1;
INSERT INTO CourseTypes (CourseTypeId, Name, Description, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('CTY' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Consejeria Farmaceutica',
        'Tecnicas de comunicacion efectiva y educacion al paciente sobre medicamentos',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- 9
SET @LastNum = @LastNum + 1;
INSERT INTO CourseTypes (CourseTypeId, Name, Description, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('CTY' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Lectura de Recetas Medicas',
        'Interpretacion de prescripciones, abreviaturas medicas y posologias',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- CATEGORIA: REGULACIONES Y NORMATIVAS
-- 10
SET @LastNum = @LastNum + 1;
INSERT INTO CourseTypes (CourseTypeId, Name, Description, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('CTY' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Legislacion Farmaceutica',
        'Marco legal dominicano para establecimientos farmaceuticos y profesionales',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- 11
SET @LastNum = @LastNum + 1;
INSERT INTO CourseTypes (CourseTypeId, Name, Description, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('CTY' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Buenas Practicas de Farmacia',
        'Estandares BPF para almacenamiento, dispensacion y control de calidad',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- 12
SET @LastNum = @LastNum + 1;
INSERT INTO CourseTypes (CourseTypeId, Name, Description, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('CTY' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Farmacovigilancia',
        'Deteccion, evaluacion y reporte de reacciones adversas a medicamentos',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- 13
SET @LastNum = @LastNum + 1;
INSERT INTO CourseTypes (CourseTypeId, Name, Description, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('CTY' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Etica Farmaceutica',
        'Principios eticos, confidencialidad y responsabilidad profesional',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- CATEGORIA: GESTION DE INVENTARIO Y ALMACEN
-- 14
SET @LastNum = @LastNum + 1;
INSERT INTO CourseTypes (CourseTypeId, Name, Description, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('CTY' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Gestion de Inventarios',
        'Control de stock, rotacion de productos y manejo de vencimientos',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- 15
SET @LastNum = @LastNum + 1;
INSERT INTO CourseTypes (CourseTypeId, Name, Description, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('CTY' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Cadena de Frio',
        'Manejo de medicamentos termolabiles, vacunas y biologicos',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- 16
SET @LastNum = @LastNum + 1;
INSERT INTO CourseTypes (CourseTypeId, Name, Description, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('CTY' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Almacenamiento de Medicamentos',
        'Condiciones de almacenamiento, organizacion y conservacion de productos',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- CATEGORIA: VENTAS Y SERVICIO AL CLIENTE
-- 17
SET @LastNum = @LastNum + 1;
INSERT INTO CourseTypes (CourseTypeId, Name, Description, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('CTY' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Tecnicas de Ventas',
        'Estrategias de venta consultiva aplicadas al sector farmaceutico',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- 18
SET @LastNum = @LastNum + 1;
INSERT INTO CourseTypes (CourseTypeId, Name, Description, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('CTY' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Servicio al Cliente',
        'Atencion de calidad, manejo de quejas y fidelizacion de clientes',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- 19
SET @LastNum = @LastNum + 1;
INSERT INTO CourseTypes (CourseTypeId, Name, Description, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('CTY' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Manejo de Caja',
        'Operaciones de caja, facturacion y cierre de turno',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- CATEGORIA: AREAS TERAPEUTICAS
-- 20
SET @LastNum = @LastNum + 1;
INSERT INTO CourseTypes (CourseTypeId, Name, Description, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('CTY' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Diabetes y Medicamentos',
        'Manejo farmacologico de diabetes, insulinas y antidiabeticos orales',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- 21
SET @LastNum = @LastNum + 1;
INSERT INTO CourseTypes (CourseTypeId, Name, Description, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('CTY' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Hipertension Arterial',
        'Tratamiento farmacologico de la hipertension y medicamentos cardiovasculares',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- 22
SET @LastNum = @LastNum + 1;
INSERT INTO CourseTypes (CourseTypeId, Name, Description, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('CTY' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Antibioticos y Resistencia',
        'Uso racional de antibioticos y prevencion de resistencia bacteriana',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- 23
SET @LastNum = @LastNum + 1;
INSERT INTO CourseTypes (CourseTypeId, Name, Description, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('CTY' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Dermatologia y Cosmetica',
        'Productos dermatologicos, cosmeticos y cuidado de la piel',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- 24
SET @LastNum = @LastNum + 1;
INSERT INTO CourseTypes (CourseTypeId, Name, Description, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('CTY' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Pediatria Farmaceutica',
        'Medicamentos pediatricos, dosificacion y formas farmaceuticas para ninos',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- 25
SET @LastNum = @LastNum + 1;
INSERT INTO CourseTypes (CourseTypeId, Name, Description, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('CTY' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Geriatria y Polifarmacia',
        'Atencion farmaceutica a adultos mayores y manejo de multiples medicamentos',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- CATEGORIA: PRODUCTOS ESPECIALES
-- 26
SET @LastNum = @LastNum + 1;
INSERT INTO CourseTypes (CourseTypeId, Name, Description, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('CTY' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Productos Naturales',
        'Fitoterapia, suplementos alimenticios y medicina natural',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- 27
SET @LastNum = @LastNum + 1;
INSERT INTO CourseTypes (CourseTypeId, Name, Description, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('CTY' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Dispositivos Medicos',
        'Equipos de monitoreo, nebulizadores, glucometros y dispositivos de uso domestico',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- 28
SET @LastNum = @LastNum + 1;
INSERT INTO CourseTypes (CourseTypeId, Name, Description, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('CTY' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Vacunacion',
        'Esquemas de vacunacion, conservacion y administracion de vacunas',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- CATEGORIA: SEGURIDAD Y EMERGENCIAS
-- 29
SET @LastNum = @LastNum + 1;
INSERT INTO CourseTypes (CourseTypeId, Name, Description, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('CTY' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Primeros Auxilios',
        'Atencion de emergencias basicas, RCP y uso de DEA en farmacia',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- 30
SET @LastNum = @LastNum + 1;
INSERT INTO CourseTypes (CourseTypeId, Name, Description, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
VALUES ('CTY' + RIGHT('000' + CAST(@LastNum AS VARCHAR), 3),
        'Seguridad Ocupacional',
        'Prevencion de riesgos, manejo de sustancias peligrosas y ergonomia',
        @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

-- ============================================================================
-- RESUMEN
-- ============================================================================
PRINT ''
PRINT '========================================'
PRINT 'TIPOS DE CURSOS CREADOS EXITOSAMENTE'
PRINT '========================================'

SELECT CourseTypeId, Name, Description
FROM CourseTypes
WHERE DataAreaId = @DataAreaId AND IsDeleted = 0
ORDER BY CourseTypeId;

DECLARE @TotalTipos INT;
SELECT @TotalTipos = COUNT(*) FROM CourseTypes WHERE DataAreaId = @DataAreaId AND IsDeleted = 0;
PRINT ''
PRINT 'Total tipos de cursos: ' + CAST(@TotalTipos AS VARCHAR)

SET NOCOUNT OFF;
GO
