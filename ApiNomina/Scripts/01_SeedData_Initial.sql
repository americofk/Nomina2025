-- ============================================================================
-- Script: 01_SeedData_Initial.sql
-- Descripción: Script de inicialización de datos base del sistema RH365
-- Ejecutar: Una sola vez después de crear la base de datos
-- Autor: Equipo de Desarrollo
-- Fecha: 2025-12-02
-- ============================================================================

SET NOCOUNT ON;
PRINT '========================================';
PRINT 'INICIANDO SEED DATA - RH365';
PRINT '========================================';

-- ============================================================================
-- 1. PAÍSES
-- ============================================================================
PRINT 'Insertando Países...';

IF NOT EXISTS (SELECT 1 FROM Countries WHERE CountryId = 'DOM')
BEGIN
    INSERT INTO Countries (CountryId, Name, NationalityCode, NationalityName, RecId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, IsDeleted)
    VALUES
    ('DOM', 'República Dominicana', '1', 'DOMINICANA', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('USA', 'Estados Unidos', '3', 'ESTADOUNIDENSE', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('PER', 'Perú', '2', 'PERUANA', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('CH', 'Chile', '11', 'CHILENA', 0, 'System', GETDATE(), 'System', GETDATE(), 0);
    PRINT '  - Países insertados: 4';
END
ELSE
    PRINT '  - Países ya existen, omitiendo...';

-- ============================================================================
-- 2. PROVINCIAS (República Dominicana)
-- ============================================================================
PRINT 'Insertando Provincias...';

IF NOT EXISTS (SELECT 1 FROM Provinces WHERE ProvinceId = '01')
BEGIN
    INSERT INTO Provinces (ProvinceId, Name, RecId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, IsDeleted)
    VALUES
    ('01', 'Distrito Nacional', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('02', 'Azua', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('03', 'Baoruco', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('04', 'Barahona', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('05', 'Dajabón', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('06', 'Duarte', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('07', 'Elías Piña', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('08', 'El Seibo', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('09', 'Espaillat', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('10', 'Independencia', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('11', 'La Altagracia', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('12', 'La Romana', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('13', 'La Vega', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('14', 'María Trinidad Sánchez', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('15', 'Monte Cristi', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('16', 'Pedernales', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('17', 'Peravia', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('18', 'Puerto Plata', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('19', 'Hermanas Mirabal', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('20', 'Samaná', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('21', 'San Cristóbal', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('22', 'San Juan', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('23', 'San Pedro de Macorís', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('24', 'Sánchez Ramírez', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('25', 'Santiago', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('26', 'Santiago Rodríguez', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('27', 'Valverde', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('28', 'Monseñor Nouel', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('29', 'Monte Plata', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('30', 'Hato Mayor', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('31', 'San José de Ocoa', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('32', 'Santo Domingo', 0, 'System', GETDATE(), 'System', GETDATE(), 0);
    PRINT '  - Provincias insertadas: 32';
END
ELSE
    PRINT '  - Provincias ya existen, omitiendo...';

-- ============================================================================
-- 3. TIPOS DE DISCAPACIDAD
-- ============================================================================
PRINT 'Insertando Tipos de Discapacidad...';

IF NOT EXISTS (SELECT 1 FROM DisabilityTypes WHERE DisabilityTypeId = '285')
BEGIN
    INSERT INTO DisabilityTypes (DisabilityTypeId, Description, RecId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, IsDeleted)
    VALUES
    ('285', 'Discapacidad Auditiva', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('289', 'Discapacidad Visual', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('290', 'Discapacidad Mental', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('291', 'Discapacidad Física Motora', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('1493', 'Discapacidad Intelectual', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('1494', 'Discapacidad Visceral', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('1495', 'Discapacidad Múltiple', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('0', 'Ninguna', 0, 'System', GETDATE(), 'System', GETDATE(), 0);
    PRINT '  - Tipos de discapacidad insertados: 8';
END
ELSE
    PRINT '  - Tipos de discapacidad ya existen, omitiendo...';

-- ============================================================================
-- 4. MENÚS DEL SISTEMA
-- ============================================================================
PRINT 'Insertando Menús del Sistema...';

IF NOT EXISTS (SELECT 1 FROM MenusApp WHERE MenuId = 'MENU-0006')
BEGIN
    -- Menús Principales (Padres)
    INSERT INTO MenusApp (MenuId, MenuName, Description, Action, Icon, MenuFather, Sort, IsViewMenu, RecId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, IsDeleted)
    VALUES
    ('MENU-0006', 'Configuración', 'Titulo de configuracion', 'Click', 'fa fa-gears', NULL, 5, 1, 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('MENU-0018', 'Recursos humanos', 'Titulo de recursos humanos', 'Click', 'fa fa-users', NULL, 1, 1, 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('MENU-0026', 'Nóminas', 'Titulo', 'Click', 'fa fa-briefcase', NULL, 2, 1, 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('MENU-0027', 'Cursos', 'Titulo', 'Click', 'fa fa-graduation-cap', NULL, 3, 1, 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('MENU-0031', 'Reportes', 'Titulo', 'Click', 'fa fa-list-alt', NULL, 4, 1, 0, 'System', GETDATE(), 'System', GETDATE(), 0);

    -- Submenús de Configuración (MENU-0006)
    INSERT INTO MenusApp (MenuId, MenuName, Description, Action, Icon, MenuFather, Sort, IsViewMenu, RecId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, IsDeleted)
    VALUES
    ('MENU-0004', 'Nóminas', 'Listado de nominas', 'MNominas', 'fa fa-briefcase', 'MENU-0006', 0, 1, 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('MENU-0005', 'Usuarios', 'Lista de usuarios', 'MUser', 'fa fa-users', 'MENU-0006', 0, 1, 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('MENU-0019', 'Códigos de ganancias', 'Todos los códigos de ganancias', 'Earning-codes', 'fa fa-money', 'MENU-0006', 0, 1, 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('MENU-0020', 'Códigos de deducciones', 'Todos los códigos de deducciones', 'DeductionCode', 'fa fa-minus-square', 'MENU-0006', 0, 1, 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('MENU-0022', 'Proyectos', 'Todos los proyectos activos', 'Projects', 'fa fa-folder', 'MENU-0006', 0, 1, 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('MENU-0023', 'Categorías de proyectos', 'Todas las categorias de proyectos', 'PorjectCategory', 'fa fa-signal', 'MENU-0006', 0, 1, 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('MENU-0024', 'Préstamos', 'Todos los códigos de prestamos activos', 'LoansEnabled', 'fa fa-suitcase', 'MENU-0006', 0, 1, 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('MENU-0025', 'Impuestos', 'Todos los códigos de impuestos', 'TaxCode', 'fa fa-calculator', 'MENU-0006', 0, 1, 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('MENU-0030', 'Carga masiva', 'Opción para cargar datos de forma masiva', 'CargaMasiva', 'fa fa-cloud-upload', 'MENU-0006', 0, 1, 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('MENU-0069', 'Auditoría', 'Registros de auditoría ISO 27001', 'auditoria', 'fa fa-history', 'MENU-0006', 100, 1, 0, 'System', GETDATE(), 'System', GETDATE(), 0);

    -- Submenús de Recursos Humanos (MENU-0018)
    INSERT INTO MenusApp (MenuId, MenuName, Description, Action, Icon, MenuFather, Sort, IsViewMenu, RecId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, IsDeleted)
    VALUES
    ('MENU-0002', 'Departamentos', 'Listado de departamentos activos', 'MDepartamentos', 'fa fa-building-o', 'MENU-0018', 0, 1, 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('MENU-0012', 'Cargos', 'Todos los Cargos activos', 'JobsEnable', 'fa fa-sitemap', 'MENU-0018', 0, 1, 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('MENU-0014', 'Puestos', 'Todos los puestos activos', 'PositionEnabled', 'fa fa-briefcase', 'MENU-0018', 0, 1, 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('MENU-0016', 'Puestos vacantes', 'Todos los puestos vacantes', 'Vacants', 'fa fa-cubes', 'MENU-0018', 0, 1, 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('MENU-0017', 'Empleados', 'Todos los empleados', 'Employee', 'fa fa-user', 'MENU-0018', 0, 1, 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('MENU-0028', 'Empleados desvinculados', 'Ex empleados', 'DismissedEmployee', 'fa fa-user-times', 'MENU-0018', 0, 1, 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('MENU-0029', 'Prospectos a empleado', 'Empleados prospectos', 'EmployeeCandidate', 'fa fa-user-plus', 'MENU-0018', 0, 1, 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('MENU-0070', 'Prestaciones Laborales', 'Calculo de prestaciones laborales (Preaviso, Cesantia, Vacaciones, Navidad)', 'prestacioneslaborales', 'fa fa-money', 'MENU-0018', 10, 1, 0, 'System', GETDATE(), 'System', GETDATE(), 0);

    -- Submenús de Nóminas (MENU-0026)
    INSERT INTO MenusApp (MenuId, MenuName, Description, Action, Icon, MenuFather, Sort, IsViewMenu, RecId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, IsDeleted)
    VALUES
    ('MENU-0021', 'Proceso nómina', 'Procesos de nómina', 'ProcessPayroll', 'fa fa-gears', 'MENU-0026', 0, 1, 0, 'System', GETDATE(), 'System', GETDATE(), 0);

    -- Submenús de Cursos (MENU-0027)
    INSERT INTO MenusApp (MenuId, MenuName, Description, Action, Icon, MenuFather, Sort, IsViewMenu, RecId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, IsDeleted)
    VALUES
    ('MENU-0007', 'Tipos de cursos', 'Tipos de cursos', 'TypeCourse', 'fa fa-book', 'MENU-0027', 0, 1, 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('MENU-0008', 'Instructores de cursos', 'Instructores de cursos', 'InstructorsCourse', 'fa fa-group', 'MENU-0027', 0, 1, 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('MENU-0009', 'Ubicación de cursos', 'Ubicación de cursos', 'CourseLocation', 'fa fa-arrows-alt', 'MENU-0027', 0, 1, 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('MENU-0010', 'Salones de cursos', 'Salones de cursos', 'ClassRoom', 'fa fa-rebel', 'MENU-0027', 0, 1, 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('MENU-0011', 'Cursos', 'Todos los cursos', 'Course', 'fa fa-graduation-cap', 'MENU-0027', 0, 1, 0, 'System', GETDATE(), 'System', GETDATE(), 0);

    -- Submenús de Reportes (MENU-0031)
    INSERT INTO MenusApp (MenuId, MenuName, Description, Action, Icon, MenuFather, Sort, IsViewMenu, RecId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, IsDeleted)
    VALUES
    ('MENU-0032', 'Recibos de nómina', 'Reportes de pagos de nomina', 'Pagosdenomina', 'fa fa-clipboard', 'MENU-0031', 0, 1, 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('MENU-0033', 'Resumen de nómina', 'Reporte de resumen de nómina', 'DayrollSummary', 'fa fa-file', 'MENU-0031', 0, 1, 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('MENU-0034', 'Reporte de nómina', 'Reporte de nómina', 'PayrollReport', 'fa fa-file-text', 'MENU-0031', 0, 1, 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('MENU-0057', 'Configuración de reportes', 'Configuración de reportes', NULL, 'fa fa-signal', 'MENU-0031', 0, 1, 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('MENU-0061', 'Reporte DGT-2', 'Reporte DGT-2', 'report-dgt2', 'fa fa-clipboard', 'MENU-0031', 0, 1, 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('MENU-0062', 'Reporte DGT-3', 'Reporte DGT-3', 'report-dgt3', 'fa fa-clipboard', 'MENU-0031', 0, 1, 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('MENU-0063', 'Reporte DGT-4', 'Reporte DGT-4', 'report-dgt4', 'fa fa-clipboard', 'MENU-0031', 0, 1, 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('MENU-0064', 'Reporte DGT-5', 'Reporte DGT-5', 'report-dgt5', 'fa fa-clipboard', 'MENU-0031', 0, 1, 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('MENU-0065', 'Reporte DGT-9', 'Reporte DGT-9', 'report-dgt9', 'fa fa-clipboard', 'MENU-0031', 0, 1, 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('MENU-0066', 'Reporte DGT-11', 'Reporte DGT-11', 'report-dgt11', 'fa fa-clipboard', 'MENU-0031', 0, 1, 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('MENU-0067', 'Reporte DGT-12', 'Reporte DGT-12', 'report-dgt12', 'fa fa-clipboard', 'MENU-0031', 0, 1, 0, 'System', GETDATE(), 'System', GETDATE(), 0);

    -- Menús ocultos (IsViewMenu = 0) para permisos internos
    INSERT INTO MenusApp (MenuId, MenuName, Description, Action, Icon, MenuFather, Sort, IsViewMenu, RecId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, IsDeleted)
    VALUES
    ('MENU-0035', 'Departamentos inactivos', 'Departamentos inactivos', NULL, 'fa fa-building-o', 'MENU-0018', 0, 0, 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('MENU-0036', 'Cargos inactivos', 'Cargos inactivos', NULL, 'fa fa-sitemap', 'MENU-0018', 0, 0, 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('MENU-0037', 'Puestos inactivos', 'Puestos inactivos', NULL, 'fa fa-briefcase', 'MENU-0018', 0, 0, 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('MENU-0038', 'Códigos de ganancias inactivos', 'Códigos de ganancias inactivos', NULL, 'fa fa-money', 'MENU-0006', 0, 0, 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('MENU-0039', 'Códigos de deducciones inactivos', 'Códigos de deducciones inactivos', NULL, 'fa fa-money', 'MENU-0006', 0, 0, 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('MENU-0040', 'Proyectos inactivos', 'Proyectos inactivos', NULL, 'fa fa-folder', 'MENU-0006', 0, 0, 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('MENU-0041', 'Categorías de proyectos inactivas', 'Categorías de proyectos inactivas', NULL, 'fa fa-signal', 'MENU-0006', 0, 0, 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('MENU-0042', 'Préstamos inactivo', 'Préstamos inactivo', NULL, 'fa fa-signal', 'MENU-0006', 0, 0, 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('MENU-0043', 'Impuestos inactivos', 'Impuestos inactivos', NULL, 'fa fa-signal', 'MENU-0006', 0, 0, 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('MENU-0044', 'Direcciones de empleados', 'Direcciones de empleados', NULL, 'fa fa-signal', 'MENU-0018', 0, 0, 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('MENU-0045', 'Información de contacto de empleados', 'Información de contacto de empleados', NULL, 'fa fa-signal', 'MENU-0018', 0, 0, 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('MENU-0046', 'Documentos de empleados', 'Documentos de empleados', NULL, 'fa fa-signal', 'MENU-0018', 0, 0, 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('MENU-0047', 'Cuentas bancarias de empleados', 'Cuentas bancarias de empleados', NULL, 'fa fa-signal', 'MENU-0018', 0, 0, 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('MENU-0048', 'Código de ganancias de empleados', 'Código de ganancias de empleados', NULL, 'fa fa-signal', 'MENU-0018', 0, 0, 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('MENU-0049', 'Código de deducciones de empleados', 'Código de deducciones de empleados', NULL, 'fa fa-signal', 'MENU-0018', 0, 0, 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('MENU-0050', 'Puestos de empleados', 'Puestos de empleados', NULL, 'fa fa-signal', 'MENU-0018', 0, 0, 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('MENU-0051', 'Prestamos de empleados', 'Prestamos de empleados', NULL, 'fa fa-signal', 'MENU-0018', 0, 0, 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('MENU-0052', 'Códigos de impuestos de empleados', 'Códigos de impuestos de empleados', NULL, 'fa fa-signal', 'MENU-0018', 0, 0, 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('MENU-0053', 'Horas extras de empleados', 'Horas extras de empleados', NULL, 'fa fa-signal', 'MENU-0018', 0, 0, 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('MENU-0054', 'Puestos de cursos', 'Puestos de cursos', NULL, 'fa fa-signal', 'MENU-0027', 0, 0, 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('MENU-0055', 'Participantes de cursos', 'Participantes de cursos', NULL, 'fa fa-signal', 'MENU-0027', 0, 0, 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('MENU-0056', 'Instructores de cursos asignados', 'Instructores de cursos asignados', NULL, 'fa fa-signal', 'MENU-0027', 0, 0, 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('MENU-0058', 'Empleados inactivos', 'Empleados inactivos', NULL, 'fa fa-signal', 'MENU-0018', 0, 0, 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('MENU-0059', 'Requisitos de puestos', 'Requisitos de puestos', NULL, 'fa fa-signal', 'MENU-0018', 0, 0, 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('MENU-0060', 'Imagen de empleados', 'Imagen de empleados', NULL, 'fa fa-signal', 'MENU-0018', 0, 0, 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('MENU-0068', 'Historial de empleados', 'Historial de empleados', 'Employee-history', 'fa-fa-clipboard', 'MENU-0018', 0, 0, 0, 'System', GETDATE(), 'System', GETDATE(), 0);

    PRINT '  - Menús insertados correctamente';
END
ELSE
    PRINT '  - Menús ya existen, omitiendo...';

-- ============================================================================
-- 5. EMPRESA DAT (Empresa de prueba/demo)
-- ============================================================================
PRINT 'Insertando Empresa DAT...';

IF NOT EXISTS (SELECT 1 FROM Companies WHERE CompanyId = 'DAT')
BEGIN
    INSERT INTO Companies (CompanyId, Name, Email, Phone, Responsible, CountryId, CurrencyId, CompanyLogo, LicenseKey, Identification, CompanyStatus, RecId, IsDeleted, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn)
    VALUES ('DAT', 'Empresa Demo RH365', 'demo@rh365.com', '809-000-0000', 'Administrador', 'DOM', 'DOP', NULL, 'D365', '000000000', 1, 0, 0, 'System', GETDATE(), 'System', GETDATE());
    PRINT '  - Empresa DAT insertada';
END
ELSE
    PRINT '  - Empresa DAT ya existe, omitiendo...';

-- ============================================================================
-- 6. USUARIO ADMINISTRADOR
-- ============================================================================
PRINT 'Insertando Usuario Administrador...';

-- Password: 12345678 -> MD5: 25d55ad283aa400af464c76d713c07ad
IF NOT EXISTS (SELECT 1 FROM Users WHERE Email = 'admin@rh365.com')
BEGIN
    INSERT INTO Users (Alias, Email, Password, Name, FormatCodeId, ElevationType, CompanyDefaultId, TemporaryPassword, DateTemporaryPassword, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
    VALUES ('AdminRH365', 'admin@rh365.com', '25d55ad283aa400af464c76d713c07ad', 'Administrador del Sistema', 'es-DO', 0, 'DAT', NULL, NULL, 'System', GETDATE(), 'System', GETDATE(), 0, 0);
    PRINT '  - Usuario admin@rh365.com insertado (Password: 12345678)';
END
ELSE
    PRINT '  - Usuario admin@rh365.com ya existe, omitiendo...';

-- ============================================================================
-- 7. ASIGNAR EMPRESA AL USUARIO ADMIN
-- ============================================================================
PRINT 'Asignando empresa al usuario administrador...';

IF NOT EXISTS (SELECT 1 FROM CompaniesAssignedToUsers WHERE Alias = 'AdminRH365' AND CompanyId = 'DAT')
BEGIN
    INSERT INTO CompaniesAssignedToUsers (CompanyId, Alias, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
    VALUES ('DAT', 'AdminRH365', 'System', GETDATE(), 'System', GETDATE(), 0, 0);
    PRINT '  - Empresa DAT asignada al usuario AdminRH365';
END
ELSE
    PRINT '  - Asignación ya existe, omitiendo...';

-- ============================================================================
-- 8. ASIGNAR TODOS LOS MENÚS AL USUARIO ADMIN (Permisos completos)
-- ============================================================================
PRINT 'Asignando permisos de menú al usuario administrador...';

IF NOT EXISTS (SELECT 1 FROM MenuAssignedToUsers WHERE Alias = 'AdminRH365')
BEGIN
    INSERT INTO MenuAssignedToUsers (Alias, MenuId, PrivilegeView, PrivilegeEdit, PrivilegeDelete, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
    SELECT 'AdminRH365', MenuId, 1, 1, 1, 'System', GETDATE(), 'System', GETDATE(), 0, 0
    FROM MenusApp
    WHERE IsDeleted = 0;
    PRINT '  - Permisos completos asignados al usuario AdminRH365';
END
ELSE
    PRINT '  - Permisos ya existen, omitiendo...';

-- ============================================================================
-- 9. OCUPACIONES (TSS)
-- ============================================================================
PRINT 'Insertando Ocupaciones...';

IF NOT EXISTS (SELECT 1 FROM Occupations WHERE OccupationId = '01')
BEGIN
    -- Insertar algunas ocupaciones básicas (la lista completa tiene 2837 registros)
    INSERT INTO Occupations (OccupationId, Description, RecId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, IsDeleted)
    VALUES
    ('01', 'NINGUNA', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('1110', 'MIEMBROS DEL PODER EJECUTIVO Y LEGISLATIVO', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('1120', 'DIRECTORES Y GERENTES GENERALES DE EMPRESAS', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('1211', 'DIRECTORES DE FINANZAS', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('1212', 'DIRECTORES DE RECURSOS HUMANOS', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('1213', 'DIRECTORES DE POLÍTICAS Y PLANIFICACIÓN', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('1219', 'OTROS DIRECTORES DE ADMINISTRACIÓN', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('1221', 'DIRECTORES DE VENTAS Y COMERCIALIZACIÓN', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('1222', 'DIRECTORES DE PUBLICIDAD Y RELACIONES PÚBLICAS', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('2110', 'FÍSICOS Y ASTRÓNOMOS', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('2120', 'MATEMÁTICOS Y ACTUARIOS', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('2131', 'BIÓLOGOS, BOTÁNICOS, ZOÓLOGOS Y AFINES', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('2141', 'INGENIEROS INDUSTRIALES Y DE PRODUCCIÓN', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('2142', 'INGENIEROS CIVILES', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('2143', 'INGENIEROS MEDIOAMBIENTALES', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('2144', 'INGENIEROS MECÁNICOS', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('2145', 'INGENIEROS QUÍMICOS', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('2151', 'INGENIEROS ELECTRICISTAS', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('2152', 'INGENIEROS ELECTRÓNICOS', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('2153', 'INGENIEROS DE TELECOMUNICACIONES', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('2161', 'ARQUITECTOS', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('2411', 'CONTADORES', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('2412', 'ASESORES FINANCIEROS Y DE INVERSIONES', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('2511', 'ANALISTAS DE SISTEMAS', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('2512', 'DESARROLLADORES DE SOFTWARE', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('2513', 'DESARROLLADORES WEB Y MULTIMEDIA', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('2514', 'PROGRAMADORES DE APLICACIONES', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('2521', 'DISEÑADORES Y ADMINISTRADORES DE BASES DE DATOS', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('2522', 'ADMINISTRADORES DE SISTEMAS', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('2523', 'PROFESIONALES EN REDES INFORMÁTICAS', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('3313', 'TÉCNICOS EN CONTABILIDAD', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('4110', 'OFICINISTAS GENERALES', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('4120', 'SECRETARIOS GENERALES', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('4211', 'CAJEROS DE BANCOS Y AFINES', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('4221', 'EMPLEADOS DE AGENCIAS DE VIAJES', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('4222', 'EMPLEADOS DE CENTROS DE LLAMADAS', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('5120', 'COCINEROS', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('5131', 'MESEROS', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('5221', 'COMERCIANTES DE TIENDAS', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('5223', 'VENDEDORES DE TIENDAS Y ALMACENES', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('5230', 'CAJEROS Y EXPENDEDORES DE BILLETES', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('5311', 'CUIDADORES DE NIÑOS', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('5411', 'BOMBEROS', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('5414', 'GUARDIAS DE SEGURIDAD', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('7111', 'CONSTRUCTORES DE CASAS', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('7112', 'ALBAÑILES', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('7115', 'CARPINTEROS', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('7126', 'PLOMEROS E INSTALADORES DE TUBERÍAS', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('7127', 'MECÁNICOS DE AIRE ACONDICIONADO Y REFRIGERACIÓN', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('7231', 'MECÁNICOS Y REPARADORES DE VEHÍCULOS DE MOTOR', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('7411', 'ELECTRICISTAS DE OBRAS', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('8322', 'CONDUCTORES DE AUTOMÓVILES, TAXIS Y CAMIONETAS', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('8331', 'CONDUCTORES DE AUTOBUSES Y TRANVÍAS', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('8332', 'CONDUCTORES DE CAMIONES PESADOS', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('9112', 'PERSONAL DE LIMPIEZA DE OFICINAS, HOTELES Y OTROS', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('9121', 'LAVADORES Y PLANCHADORES MANUALES', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('9211', 'PEONES AGRÍCOLAS', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('9313', 'PEONES DE OBRAS PÚBLICAS', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('9412', 'AYUDANTES DE COCINA', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('9510', 'TRABAJADORES AMBULANTES DE SERVICIOS', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('9520', 'VENDEDORES AMBULANTES', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('9611', 'RECOLECTORES DE BASURA', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('9621', 'MENSAJEROS, REPARTIDORES Y MALETEROS', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('9622', 'PERSONAS QUE REALIZAN TRABAJOS VARIOS', 0, 'System', GETDATE(), 'System', GETDATE(), 0),
    ('9629', 'OTROS TRABAJADORES ELEMENTALES', 0, 'System', GETDATE(), 'System', GETDATE(), 0);
    PRINT '  - Ocupaciones básicas insertadas (para lista completa usar archivo CSV del TSS)';
END
ELSE
    PRINT '  - Ocupaciones ya existen, omitiendo...';

-- ============================================================================
PRINT '';
PRINT '========================================';
PRINT 'SEED DATA COMPLETADO EXITOSAMENTE';
PRINT '========================================';
PRINT '';
PRINT 'Usuario administrador creado:';
PRINT '  Email: admin@rh365.com';
PRINT '  Password: 12345678';
PRINT '  Empresa: DAT (Demo)';
PRINT '';
PRINT 'Próximo paso: Ejecutar 02_SeedData_NewCompany.sql';
PRINT 'para crear nuevas empresas.';
PRINT '========================================';

SET NOCOUNT OFF;
GO
