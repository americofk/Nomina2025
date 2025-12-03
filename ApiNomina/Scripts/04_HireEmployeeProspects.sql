-- ============================================================================
-- Script: 04_HireEmployeeProspects.sql
-- Descripcion: Script para contratar los 300 prospectos de empleados
--              1. Crea puestos adicionales
--              2. Marca puestos como vacantes
--              3. Ejecuta la contratacion masiva
-- Ejecutar: Despues de 03_SeedData_EmployeeProspects.sql
-- Autor: Equipo de Desarrollo
-- Fecha: 2025-12-03
-- ============================================================================

SET NOCOUNT ON;

PRINT '========================================';
PRINT 'CONTRATACION MASIVA - FARMACIA RH-365';
PRINT '========================================';
PRINT '';

DECLARE @DataAreaId NVARCHAR(20) = 'Farm';

-- ============================================================================
-- 1. CREAR PUESTOS ADICIONALES (300 puestos mas)
-- ============================================================================
PRINT '1. Creando puestos adicionales...';

-- Tabla temporal para mapeo de ocupaciones a cargos y departamentos
DECLARE @OcupacionMapping TABLE (
    OccupationId NVARCHAR(20),
    JobId NVARCHAR(20),
    DepartmentId NVARCHAR(20)
);

INSERT INTO @OcupacionMapping VALUES
('FARM01', 'JOB021', 'DEP010'), -- Farmaceutico -> Farmaceutico Regente / Regencia
('FARM02', 'JOB026', 'DEP007'), -- Auxiliar Farmacia -> Auxiliar de Farmacia / Ventas Mostrador
('FARM03', 'JOB025', 'DEP010'), -- Tecnico Farmacia -> Tecnico en Farmacia / Regencia
('FARM04', 'JOB021', 'DEP010'), -- Regente -> Farmaceutico Regente / Regencia
('FARM05', 'JOB036', 'DEP007'), -- Dependiente -> Vendedor Mostrador / Ventas
('FARM06', 'JOB039', 'DEP007'), -- Cajero -> Cajero / Ventas
('FARM07', 'JOB041', 'DEP006'), -- Almacenista -> Almacenista / Almacen
('FARM08', 'JOB044', 'DEP015'), -- Repartidor -> Conductor Repartidor / Logistica
('FARM09', 'JOB011', 'DEP007'), -- Supervisor -> Supervisor Sucursal / Ventas
('FARM10', 'JOB020', 'DEP007'), -- Gerente Sucursal -> Encargado Sucursal / Ventas
('FARM11', 'JOB046', 'DEP001'), -- Admin -> Asistente Administrativo / Gerencia
('FARM12', 'JOB029', 'DEP003'), -- Contador -> Analista Contable / Contabilidad
('FARM13', 'JOB028', 'DEP002'), -- RRHH -> Analista Reclutamiento / RRHH
('FARM14', 'JOB031', 'DEP005'), -- Compras -> Analista Compras / Compras
('FARM15', 'JOB056', 'DEP017'), -- Seguridad -> Oficial Seguridad / Seguridad
('FARM16', 'JOB057', 'DEP018'), -- Limpieza -> Conserje / Limpieza
('FARM17', 'JOB038', 'DEP014'), -- Atencion Cliente -> Asesor Servicio / Servicio al Cliente
('FARM18', 'JOB060', 'DEP013'), -- Marketing -> Community Manager / Marketing
('FARM19', 'JOB054', 'DEP012'), -- IT -> Soporte Tecnico / TI
('FARM20', 'JOB040', 'DEP007'); -- Cosmetologo -> Promotor Ventas / Ventas

-- Obtener el ultimo numero de posicion
DECLARE @LastPosNum INT;
SELECT @LastPosNum = ISNULL(MAX(CAST(REPLACE(PositionId, 'POS', '') AS INT)), 0) FROM Positions WHERE DataAreaId = @DataAreaId;

-- Crear puestos para cada empleado prospecto
DECLARE @EmployeeId NVARCHAR(20);
DECLARE @OccupationId NVARCHAR(20);
DECLARE @JobId NVARCHAR(20);
DECLARE @DepartmentId NVARCHAR(20);
DECLARE @PositionId NVARCHAR(20);
DECLARE @PositionName NVARCHAR(50);
DECLARE @Counter INT = 0;

DECLARE emp_cursor CURSOR FOR
SELECT e.EmployeeId, e.OccupationId
FROM Employees e
WHERE e.DataAreaId = @DataAreaId
  AND e.WorkStatus = 0 -- Candidate
  AND e.EmployeeType = 0 -- Employee (no contratistas)
ORDER BY e.EmployeeId;

OPEN emp_cursor;
FETCH NEXT FROM emp_cursor INTO @EmployeeId, @OccupationId;

WHILE @@FETCH_STATUS = 0
BEGIN
    -- Obtener el cargo y departamento segun la ocupacion
    SELECT @JobId = JobId, @DepartmentId = DepartmentId
    FROM @OcupacionMapping
    WHERE OccupationId = @OccupationId;

    -- Si no hay mapeo, usar valores por defecto
    IF @JobId IS NULL
    BEGIN
        SET @JobId = 'JOB036'; -- Vendedor de Mostrador
        SET @DepartmentId = 'DEP007'; -- Ventas Mostrador
    END

    -- Incrementar contador de posicion
    SET @LastPosNum = @LastPosNum + 1;
    SET @PositionId = 'POS' + RIGHT('000' + CAST(@LastPosNum AS VARCHAR), 3);

    -- Obtener nombre del cargo para el puesto
    SELECT @PositionName = Name FROM Jobs WHERE JobId = @JobId AND DataAreaId = @DataAreaId;

    -- Crear el puesto vacante
    INSERT INTO Positions (
        PositionId, PositionName, IsVacant, DepartmentId, JobId, NotifyPositionId,
        PositionStatus, StartDate, EndDate, Description,
        DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted
    )
    VALUES (
        @PositionId,
        @PositionName + ' ' + CAST(@LastPosNum AS VARCHAR),
        1, -- IsVacant = true
        @DepartmentId,
        @JobId,
        NULL,
        1, -- PositionStatus = Activo
        '2022-01-01',
        '2099-12-31',
        'Puesto creado para contratacion masiva',
        @DataAreaId,
        'System',
        GETDATE(),
        'System',
        GETDATE(),
        0,
        0
    );

    SET @Counter = @Counter + 1;

    FETCH NEXT FROM emp_cursor INTO @EmployeeId, @OccupationId;
END

CLOSE emp_cursor;
DEALLOCATE emp_cursor;

PRINT '   - ' + CAST(@Counter AS VARCHAR) + ' puestos creados';

-- ============================================================================
-- 2. MARCAR TODOS LOS PUESTOS EXISTENTES COMO VACANTES
-- ============================================================================
PRINT '2. Marcando puestos existentes como vacantes...';

UPDATE Positions
SET IsVacant = 1
WHERE DataAreaId = @DataAreaId
  AND IsDeleted = 0
  AND IsVacant = 0;

PRINT '   - ' + CAST(@@ROWCOUNT AS VARCHAR) + ' puestos marcados como vacantes';

-- ============================================================================
-- 3. EJECUTAR CONTRATACION MASIVA
-- ============================================================================
PRINT '3. Ejecutando contratacion masiva de empleados...';

DECLARE @AdmissionDate DATETIME;
DECLARE @ToDate DATETIME = '2099-12-31';
DECLARE @HiredCount INT = 0;

-- Cursor para emparejar empleados con puestos vacantes
DECLARE hire_cursor CURSOR FOR
SELECT e.EmployeeId, e.OccupationId, e.AdmissionDate
FROM Employees e
WHERE e.DataAreaId = @DataAreaId
  AND e.WorkStatus = 0 -- Candidate
  AND e.EmployeeType = 0 -- Employee
ORDER BY e.AdmissionDate, e.EmployeeId;

OPEN hire_cursor;
FETCH NEXT FROM hire_cursor INTO @EmployeeId, @OccupationId, @AdmissionDate;

WHILE @@FETCH_STATUS = 0
BEGIN
    -- Obtener cargo y departamento segun ocupacion
    SELECT @JobId = JobId, @DepartmentId = DepartmentId
    FROM @OcupacionMapping
    WHERE OccupationId = @OccupationId;

    IF @JobId IS NULL
    BEGIN
        SET @JobId = 'JOB036';
        SET @DepartmentId = 'DEP007';
    END

    -- Buscar un puesto vacante que coincida con el cargo
    SELECT TOP 1 @PositionId = PositionId
    FROM Positions
    WHERE DataAreaId = @DataAreaId
      AND JobId = @JobId
      AND IsVacant = 1
      AND IsDeleted = 0
      AND PositionStatus = 1
    ORDER BY PositionId;

    -- Si no hay puesto con ese cargo, buscar cualquier vacante
    IF @PositionId IS NULL
    BEGIN
        SELECT TOP 1 @PositionId = PositionId
        FROM Positions
        WHERE DataAreaId = @DataAreaId
          AND IsVacant = 1
          AND IsDeleted = 0
          AND PositionStatus = 1
        ORDER BY PositionId;
    END

    IF @PositionId IS NOT NULL
    BEGIN
        -- 1. Crear registro en EmployeePositions
        INSERT INTO EmployeePositions (
            EmployeeId, PositionId, FromDate, ToDate, EmployeePositionStatus, Comment,
            DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted
        )
        VALUES (
            @EmployeeId,
            @PositionId,
            @AdmissionDate,
            @ToDate,
            1, -- EmployeePositionStatus = Activo
            'Contratacion inicial',
            @DataAreaId,
            'System',
            GETDATE(),
            'System',
            GETDATE(),
            0,
            0
        );

        -- 2. Actualizar empleado: WorkStatus = Employ (2), fechas
        UPDATE Employees
        SET WorkStatus = 2, -- Employ
            StartWorkDate = @AdmissionDate,
            EndWorkDate = @ToDate
        WHERE EmployeeId = @EmployeeId AND DataAreaId = @DataAreaId;

        -- 3. Quitar vacante del puesto
        UPDATE Positions
        SET IsVacant = 0
        WHERE PositionId = @PositionId AND DataAreaId = @DataAreaId;

        -- 4. Crear registro en EmployeeHistory
        INSERT INTO EmployeeHistories (
            Type, Description, RegisterDate, EmployeeId, IsUseDGT,
            DataAreaId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted
        )
        VALUES (
            'NI',
            'Empleado contratado - Puesto: ' + @PositionId,
            @AdmissionDate,
            @EmployeeId,
            0,
            @DataAreaId,
            'System',
            GETDATE(),
            'System',
            GETDATE(),
            0,
            0
        );

        SET @HiredCount = @HiredCount + 1;
    END

    -- Limpiar para siguiente iteracion
    SET @PositionId = NULL;

    FETCH NEXT FROM hire_cursor INTO @EmployeeId, @OccupationId, @AdmissionDate;
END

CLOSE hire_cursor;
DEALLOCATE hire_cursor;

PRINT '   - ' + CAST(@HiredCount AS VARCHAR) + ' empleados contratados';

-- ============================================================================
-- 4. RESUMEN FINAL
-- ============================================================================
PRINT '';
PRINT '========================================';
PRINT 'CONTRATACION COMPLETADA';
PRINT '========================================';
PRINT '';

-- Estadisticas finales
DECLARE @TotalEmpleados INT, @TotalContratados INT, @TotalProspectos INT;
DECLARE @TotalPuestos INT, @PuestosVacantes INT, @PuestosOcupados INT;

SELECT @TotalEmpleados = COUNT(*) FROM Employees WHERE DataAreaId = @DataAreaId AND EmployeeType = 0;
SELECT @TotalContratados = COUNT(*) FROM Employees WHERE DataAreaId = @DataAreaId AND EmployeeType = 0 AND WorkStatus = 2;
SELECT @TotalProspectos = COUNT(*) FROM Employees WHERE DataAreaId = @DataAreaId AND EmployeeType = 0 AND WorkStatus = 0;
SELECT @TotalPuestos = COUNT(*) FROM Positions WHERE DataAreaId = @DataAreaId AND IsDeleted = 0;
SELECT @PuestosVacantes = COUNT(*) FROM Positions WHERE DataAreaId = @DataAreaId AND IsDeleted = 0 AND IsVacant = 1;
SELECT @PuestosOcupados = COUNT(*) FROM Positions WHERE DataAreaId = @DataAreaId AND IsDeleted = 0 AND IsVacant = 0;

PRINT 'Resumen de empleados:';
PRINT '  - Total empleados (tipo Employee): ' + CAST(@TotalEmpleados AS VARCHAR);
PRINT '  - Empleados contratados: ' + CAST(@TotalContratados AS VARCHAR);
PRINT '  - Prospectos pendientes: ' + CAST(@TotalProspectos AS VARCHAR);
PRINT '';
PRINT 'Resumen de puestos:';
PRINT '  - Total puestos: ' + CAST(@TotalPuestos AS VARCHAR);
PRINT '  - Puestos ocupados: ' + CAST(@PuestosOcupados AS VARCHAR);
PRINT '  - Puestos vacantes: ' + CAST(@PuestosVacantes AS VARCHAR);
PRINT '';

-- Distribucion por departamento
PRINT 'Distribucion de contratados por departamento:';
SELECT
    d.Name AS Departamento,
    COUNT(ep.EmployeeId) AS Empleados
FROM EmployeePositions ep
INNER JOIN Positions p ON ep.PositionId = p.PositionId AND ep.DataAreaId = p.DataAreaId
INNER JOIN Departments d ON p.DepartmentId = d.DepartmentId AND p.DataAreaId = d.DataAreaId
WHERE ep.DataAreaId = @DataAreaId
  AND ep.EmployeePositionStatus = 1
  AND ep.IsDeleted = 0
GROUP BY d.Name
ORDER BY COUNT(ep.EmployeeId) DESC;

PRINT '';
PRINT '========================================';

SET NOCOUNT OFF;
GO
