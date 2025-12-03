-- ============================================================================
-- Script: 05_FillPositionRequirements.sql
-- Descripcion: Llena los requisitos de todos los puestos basados en el cargo
-- Autor: Equipo de Desarrollo
-- Fecha: 2025-12-03
-- ============================================================================

SET NOCOUNT ON;

PRINT '========================================';
PRINT 'LLENADO DE REQUISITOS DE PUESTOS';
PRINT '========================================';
PRINT '';

DECLARE @DataAreaId NVARCHAR(20) = 'Farm';

-- ============================================================================
-- 1. CREAR TABLA DE REQUISITOS POR CARGO
-- ============================================================================

-- Tabla con requisitos predefinidos por cargo
DECLARE @RequisitosJob TABLE (
    JobId NVARCHAR(20),
    Requisito1 NVARCHAR(30),
    Detalle1 NVARCHAR(100),
    Requisito2 NVARCHAR(30),
    Detalle2 NVARCHAR(100),
    Requisito3 NVARCHAR(30),
    Detalle3 NVARCHAR(100)
);

INSERT INTO @RequisitosJob VALUES
-- Gerencia y Direccion
('JOB001', 'Liderazgo', 'Dirigir y coordinar todas las operaciones de la empresa', 'Planificacion', 'Desarrollar estrategias y planes de negocio', 'Toma de decisiones', 'Evaluar y decidir sobre asuntos criticos'),
('JOB002', 'Gestion operativa', 'Supervisar operaciones diarias de la farmacia', 'Control de procesos', 'Asegurar eficiencia en todos los procesos', 'Mejora continua', 'Implementar mejoras operacionales'),
('JOB003', 'Administracion', 'Gestionar recursos administrativos y financieros', 'Presupuestos', 'Elaborar y controlar presupuestos', 'Reportes', 'Generar informes gerenciales'),
('JOB004', 'Gestion de personal', 'Administrar el capital humano de la empresa', 'Reclutamiento', 'Coordinar procesos de seleccion', 'Clima laboral', 'Mantener ambiente laboral positivo'),
('JOB005', 'Ventas', 'Dirigir estrategias comerciales y de ventas', 'Metas comerciales', 'Establecer y cumplir objetivos de venta', 'Clientes', 'Desarrollar cartera de clientes'),
('JOB006', 'Compras', 'Gestionar adquisiciones y proveedores', 'Negociacion', 'Negociar condiciones con proveedores', 'Inventarios', 'Mantener niveles optimos de stock'),
('JOB007', 'Logistica', 'Coordinar distribucion y entregas', 'Rutas', 'Optimizar rutas de entrega', 'Tiempos', 'Cumplir tiempos de entrega'),
('JOB008', 'Tecnologia', 'Dirigir area de sistemas e informatica', 'Infraestructura', 'Mantener sistemas operativos', 'Seguridad TI', 'Proteger informacion digital'),
('JOB009', 'Contabilidad', 'Gestionar contabilidad general de la empresa', 'Estados financieros', 'Elaborar reportes contables', 'Cumplimiento', 'Asegurar cumplimiento fiscal'),
('JOB010', 'Direccion tecnica', 'Dirigir aspectos farmaceuticos y regulatorios', 'Regulaciones', 'Cumplir normativas de salud', 'Calidad', 'Garantizar calidad de productos'),

-- Supervisores y Coordinadores
('JOB011', 'Supervision', 'Supervisar personal y operaciones de sucursal', 'Turnos', 'Coordinar horarios del personal', 'Ventas', 'Alcanzar metas de la sucursal'),
('JOB012', 'Control almacen', 'Supervisar operaciones de almacen', 'Inventario', 'Controlar entradas y salidas', 'Orden', 'Mantener almacen organizado'),
('JOB013', 'Equipo ventas', 'Coordinar equipo de vendedores', 'Capacitacion', 'Entrenar al equipo de ventas', 'Seguimiento', 'Monitorear desempeno comercial'),
('JOB014', 'Gestion compras', 'Coordinar proceso de adquisiciones', 'Proveedores', 'Evaluar y seleccionar proveedores', 'Pedidos', 'Gestionar ordenes de compra'),
('JOB015', 'Distribucion', 'Coordinar logistica de distribucion', 'Entregas', 'Programar rutas y entregas', 'Vehiculos', 'Controlar flota vehicular'),
('JOB016', 'RRHH', 'Coordinar procesos de recursos humanos', 'Nomina', 'Apoyar en proceso de nomina', 'Beneficios', 'Administrar beneficios'),
('JOB017', 'Marketing', 'Coordinar estrategias de marketing', 'Campanas', 'Ejecutar campanas publicitarias', 'Redes sociales', 'Gestionar presencia digital'),
('JOB018', 'Calidad', 'Coordinar control de calidad', 'Inspecciones', 'Realizar verificaciones de calidad', 'Protocolos', 'Implementar protocolos de calidad'),
('JOB019', 'Turno', 'Supervisar operaciones durante el turno', 'Personal', 'Coordinar equipo del turno', 'Cierres', 'Realizar cierres de caja'),
('JOB020', 'Sucursal', 'Administrar sucursal asignada', 'Operaciones', 'Gestionar operaciones diarias', 'Clientes', 'Atender quejas y sugerencias'),

-- Farmaceuticos
('JOB021', 'Regencia', 'Ejercer regencia farmaceutica del establecimiento', 'Dispensacion', 'Supervisar dispensacion de medicamentos', 'Normativas', 'Cumplir regulaciones de salud'),
('JOB022', 'Farmacia clinica', 'Brindar atencion farmaceutica clinica', 'Pacientes', 'Orientar a pacientes sobre medicamentos', 'Interacciones', 'Verificar interacciones medicamentosas'),
('JOB023', 'Atencion farmacia', 'Atender clientes en mostrador de farmacia', 'Recetas', 'Dispensar medicamentos con receta', 'Asesoria', 'Asesorar sobre uso de medicamentos'),
('JOB024', 'Control quimico', 'Verificar calidad quimica de productos', 'Analisis', 'Realizar analisis de productos', 'Documentacion', 'Mantener registros tecnicos'),
('JOB025', 'Apoyo tecnico', 'Asistir en labores tecnicas de farmacia', 'Preparacion', 'Preparar medicamentos magistrales', 'Etiquetado', 'Etiquetar productos correctamente'),
('JOB026', 'Asistencia farmacia', 'Apoyar en operaciones de farmacia', 'Surtido', 'Surtir estantes de medicamentos', 'Limpieza', 'Mantener area de farmacia limpia'),

-- Analistas
('JOB027', 'Nomina', 'Procesar nomina de empleados', 'Calculos', 'Calcular salarios y deducciones', 'Reportes TSS', 'Generar reportes para TSS'),
('JOB028', 'Reclutamiento', 'Ejecutar procesos de seleccion', 'Entrevistas', 'Coordinar y realizar entrevistas', 'Expedientes', 'Mantener expedientes de personal'),
('JOB029', 'Contable', 'Realizar registros contables', 'Conciliaciones', 'Elaborar conciliaciones bancarias', 'Facturas', 'Procesar facturas y pagos'),
('JOB030', 'Inventarios', 'Controlar inventarios de productos', 'Conteos', 'Realizar conteos fisicos', 'Diferencias', 'Investigar diferencias de inventario'),
('JOB031', 'Compras', 'Analizar y gestionar compras', 'Cotizaciones', 'Solicitar y comparar cotizaciones', 'Seguimiento', 'Dar seguimiento a pedidos'),
('JOB032', 'Sistemas', 'Administrar sistemas informaticos', 'Soporte', 'Brindar soporte a usuarios', 'Mantenimiento', 'Mantener equipos y sistemas'),
('JOB033', 'Datos', 'Analizar datos del negocio', 'Reportes', 'Generar reportes analiticos', 'Indicadores', 'Monitorear KPIs del negocio'),
('JOB034', 'Auditoria', 'Realizar auditorias internas', 'Revision', 'Revisar procesos y controles', 'Hallazgos', 'Documentar y reportar hallazgos'),
('JOB035', 'Capacitacion', 'Coordinar programas de formacion', 'Cursos', 'Organizar cursos y talleres', 'Evaluacion', 'Evaluar efectividad de capacitacion'),

-- Ventas y Atencion
('JOB036', 'Venta mostrador', 'Atender clientes en punto de venta', 'Productos', 'Conocer catalogo de productos', 'Asesoria', 'Asesorar al cliente en su compra'),
('JOB037', 'Ventas B2B', 'Gestionar cuentas institucionales', 'Visitas', 'Visitar clientes corporativos', 'Cotizaciones', 'Elaborar propuestas comerciales'),
('JOB038', 'Servicio cliente', 'Atender consultas y reclamos', 'Resolucion', 'Resolver problemas de clientes', 'Seguimiento', 'Dar seguimiento a casos'),
('JOB039', 'Caja', 'Operar caja registradora', 'Cobros', 'Procesar pagos de clientes', 'Arqueos', 'Realizar arqueos de caja'),
('JOB040', 'Promocion', 'Promover productos y ofertas', 'Exhibicion', 'Mantener exhibidores atractivos', 'Impulso', 'Impulsar ventas de productos'),

-- Almacen y Logistica
('JOB041', 'Almacenaje', 'Gestionar almacenamiento de productos', 'Recepcion', 'Recibir y verificar mercancias', 'Ubicacion', 'Ubicar productos correctamente'),
('JOB042', 'Apoyo almacen', 'Asistir en labores de almacen', 'Carga', 'Cargar y descargar mercancias', 'Limpieza', 'Mantener almacen limpio'),
('JOB043', 'Despacho', 'Preparar pedidos para entrega', 'Picking', 'Seleccionar productos de pedidos', 'Empaque', 'Empacar pedidos correctamente'),
('JOB044', 'Reparto', 'Realizar entregas a clientes', 'Rutas', 'Seguir rutas de entrega asignadas', 'Documentos', 'Entregar facturas y recibos'),
('JOB045', 'Mensajeria moto', 'Realizar entregas en motocicleta', 'Rapidez', 'Cumplir tiempos de entrega', 'Cuidado', 'Manejar productos con cuidado'),

-- Administrativos
('JOB046', 'Apoyo admin', 'Brindar apoyo administrativo general', 'Documentos', 'Gestionar documentacion', 'Archivo', 'Mantener archivos organizados'),
('JOB047', 'Asistencia gerencia', 'Asistir a gerencia en sus funciones', 'Agenda', 'Coordinar agenda del gerente', 'Comunicacion', 'Filtrar comunicaciones'),
('JOB048', 'Secretariado', 'Ejecutar labores secretariales', 'Correspondencia', 'Gestionar correspondencia', 'Reuniones', 'Coordinar reuniones'),
('JOB049', 'Recepcion', 'Atender recepcion de la empresa', 'Visitantes', 'Recibir y orientar visitantes', 'Llamadas', 'Atender central telefonica'),
('JOB050', 'Contabilidad aux', 'Apoyar en labores contables', 'Digitacion', 'Digitar documentos contables', 'Archivo', 'Archivar documentos fiscales'),
('JOB051', 'Tesoreria', 'Gestionar tesoreria de la empresa', 'Flujo caja', 'Controlar flujo de efectivo', 'Pagos', 'Programar y ejecutar pagos'),
('JOB052', 'Mensajeria', 'Realizar diligencias y entregas', 'Tramites', 'Realizar tramites externos', 'Documentos', 'Entregar y recoger documentos'),

-- Tecnologia
('JOB053', 'Desarrollo', 'Desarrollar soluciones de software', 'Codigo', 'Escribir y mantener codigo', 'Pruebas', 'Realizar pruebas de sistemas'),
('JOB054', 'Soporte TI', 'Brindar soporte tecnico a usuarios', 'Incidentes', 'Resolver problemas tecnicos', 'Equipos', 'Configurar equipos de computo'),
('JOB055', 'Redes', 'Administrar infraestructura de red', 'Conectividad', 'Mantener conectividad de red', 'Seguridad', 'Implementar seguridad de red'),

-- Servicios Generales
('JOB056', 'Vigilancia', 'Resguardar instalaciones', 'Accesos', 'Controlar acceso de personas', 'Rondas', 'Realizar rondas de vigilancia'),
('JOB057', 'Limpieza', 'Mantener instalaciones limpias', 'Aseo', 'Realizar limpieza de areas', 'Sanitizacion', 'Sanitizar areas comunes'),
('JOB058', 'Mantenimiento', 'Realizar mantenimiento de instalaciones', 'Reparaciones', 'Ejecutar reparaciones menores', 'Preventivo', 'Realizar mantenimiento preventivo'),
('JOB059', 'Legal', 'Asesorar en temas legales', 'Contratos', 'Revisar y elaborar contratos', 'Cumplimiento', 'Asegurar cumplimiento legal'),
('JOB060', 'Redes sociales', 'Gestionar redes sociales', 'Contenido', 'Crear contenido para redes', 'Comunidad', 'Interactuar con seguidores');

-- ============================================================================
-- 2. INSERTAR REQUISITOS PARA CADA PUESTO
-- ============================================================================
PRINT '1. Insertando requisitos de puestos...';

DECLARE @PositionId NVARCHAR(20);
DECLARE @JobId NVARCHAR(20);
DECLARE @Req1 NVARCHAR(30), @Det1 NVARCHAR(100);
DECLARE @Req2 NVARCHAR(30), @Det2 NVARCHAR(100);
DECLARE @Req3 NVARCHAR(30), @Det3 NVARCHAR(100);
DECLARE @Counter INT = 0;

DECLARE pos_cursor CURSOR FOR
SELECT p.PositionId, p.JobId
FROM Positions p
WHERE p.DataAreaId = @DataAreaId
  AND p.IsDeleted = 0
  AND NOT EXISTS (
      SELECT 1 FROM PositionRequirements pr
      WHERE pr.PositionId = p.PositionId
        AND pr.DataAreaId = p.DataAreaId
        AND pr.IsDeleted = 0
  )
ORDER BY p.PositionId;

OPEN pos_cursor;
FETCH NEXT FROM pos_cursor INTO @PositionId, @JobId;

WHILE @@FETCH_STATUS = 0
BEGIN
    -- Obtener requisitos del cargo
    SELECT
        @Req1 = Requisito1, @Det1 = Detalle1,
        @Req2 = Requisito2, @Det2 = Detalle2,
        @Req3 = Requisito3, @Det3 = Detalle3
    FROM @RequisitosJob
    WHERE JobId = @JobId;

    -- Si no hay requisitos definidos, usar genericos
    IF @Req1 IS NULL
    BEGIN
        SET @Req1 = 'Responsabilidad';
        SET @Det1 = 'Cumplir con las funciones asignadas al puesto';
        SET @Req2 = 'Trabajo en equipo';
        SET @Det2 = 'Colaborar con companeros y otras areas';
        SET @Req3 = 'Puntualidad';
        SET @Det3 = 'Cumplir horarios establecidos';
    END

    -- Insertar requisito 1
    INSERT INTO PositionRequirements (Name, Detail, PositionId, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
    VALUES (@Req1, @Det1, @PositionId, @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

    -- Insertar requisito 2
    INSERT INTO PositionRequirements (Name, Detail, PositionId, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
    VALUES (@Req2, @Det2, @PositionId, @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

    -- Insertar requisito 3
    INSERT INTO PositionRequirements (Name, Detail, PositionId, DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
    VALUES (@Req3, @Det3, @PositionId, @DataAreaId, 'System', GETDATE(), 'System', GETDATE(), 0, 0);

    SET @Counter = @Counter + 1;

    -- Limpiar variables
    SET @Req1 = NULL; SET @Det1 = NULL;
    SET @Req2 = NULL; SET @Det2 = NULL;
    SET @Req3 = NULL; SET @Det3 = NULL;

    FETCH NEXT FROM pos_cursor INTO @PositionId, @JobId;
END

CLOSE pos_cursor;
DEALLOCATE pos_cursor;

PRINT '   - ' + CAST(@Counter AS VARCHAR) + ' puestos con requisitos asignados';
PRINT '   - ' + CAST(@Counter * 3 AS VARCHAR) + ' requisitos insertados (3 por puesto)';

-- ============================================================================
-- 3. RESUMEN
-- ============================================================================
PRINT '';
PRINT '========================================';
PRINT 'REQUISITOS COMPLETADOS';
PRINT '========================================';
PRINT '';

DECLARE @TotalPuestos INT, @PuestosConReq INT, @TotalRequisitos INT;

SELECT @TotalPuestos = COUNT(*) FROM Positions WHERE DataAreaId = @DataAreaId AND IsDeleted = 0;
SELECT @PuestosConReq = COUNT(DISTINCT PositionId) FROM PositionRequirements WHERE DataAreaId = @DataAreaId AND IsDeleted = 0;
SELECT @TotalRequisitos = COUNT(*) FROM PositionRequirements WHERE DataAreaId = @DataAreaId AND IsDeleted = 0;

PRINT 'Resumen:';
PRINT '  - Total puestos: ' + CAST(@TotalPuestos AS VARCHAR);
PRINT '  - Puestos con requisitos: ' + CAST(@PuestosConReq AS VARCHAR);
PRINT '  - Total requisitos creados: ' + CAST(@TotalRequisitos AS VARCHAR);
PRINT '';

-- Muestra ejemplo de requisitos
PRINT 'Ejemplo de requisitos (primeros 5 puestos):';
SELECT TOP 15
    p.PositionId,
    p.PositionName,
    pr.Name AS Requisito,
    pr.Detail AS Detalle
FROM Positions p
INNER JOIN PositionRequirements pr ON p.PositionId = pr.PositionId AND p.DataAreaId = pr.DataAreaId
WHERE p.DataAreaId = @DataAreaId AND p.IsDeleted = 0 AND pr.IsDeleted = 0
ORDER BY p.PositionId, pr.Name;

PRINT '';
PRINT '========================================';

SET NOCOUNT OFF;
GO
