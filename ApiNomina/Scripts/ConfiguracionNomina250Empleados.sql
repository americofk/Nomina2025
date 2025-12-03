-- =====================================================
-- Script: Configuración de Nómina para 250 Empleados Operativos
-- Descripción: Asigna códigos de ingreso, descuento e impuesto
--              a 250 empleados con puestos operativos (no administrativos)
--              usando la misma configuración del empleado EMP-000000301
-- Fecha: 2025-12-03
-- =====================================================

USE [RH-365]
GO

SET NOCOUNT ON;

-- =====================================================
-- PASO 1: Crear tabla temporal con los 250 empleados seleccionados
-- =====================================================
IF OBJECT_ID('tempdb..#EmpleadosSeleccionados') IS NOT NULL
    DROP TABLE #EmpleadosSeleccionados;

SELECT TOP 250
    e.EmployeeId,
    e.Name,
    e.LastName,
    p.PositionName,
    ROW_NUMBER() OVER (ORDER BY e.EmployeeId) AS RowNum
INTO #EmpleadosSeleccionados
FROM Employees e
INNER JOIN EmployeePositions ep ON e.EmployeeId = ep.EmployeeId AND e.DataAreaId = ep.DataAreaId
INNER JOIN Positions p ON ep.PositionId = p.PositionId AND p.DataAreaId = ep.DataAreaId
WHERE e.IsDeleted = 0
  AND e.DataAreaId = 'FARM'
  AND e.WorkStatus = 2  -- Empleado activo
  AND ep.IsDeleted = 0
  AND ep.EmployeePositionStatus = 1
  -- Excluir puestos administrativos
  AND p.PositionName NOT LIKE '%Gerente%'
  AND p.PositionName NOT LIKE '%Director%'
  AND p.PositionName NOT LIKE '%Coordinador%'
  AND p.PositionName NOT LIKE '%Contador General%'
  AND p.PositionName NOT LIKE '%Tesorero%'
  AND p.PositionName NOT LIKE '%Senior%'
  -- Excluir empleados que ya tienen configuración
  AND NOT EXISTS (
    SELECT 1 FROM EmployeeEarningCodes eec
    WHERE eec.EmployeeId = e.EmployeeId
    AND eec.DataAreaId = e.DataAreaId
    AND eec.IsDeleted = 0
  )
ORDER BY e.EmployeeId;

PRINT 'Empleados seleccionados: ' + CAST(@@ROWCOUNT AS VARCHAR(10));

-- =====================================================
-- PASO 2: Insertar Códigos de Ingreso (Salario)
-- Configuración: EC-000000001, Salario 12,500 quincenal / 25,000 mensual
-- =====================================================
PRINT '';
PRINT '=== Insertando Códigos de Ingreso ===';

DECLARE @InternalIdEarning INT;
SELECT @InternalIdEarning = ISNULL(MAX(InternalId), 0) FROM EmployeeEarningCodes WHERE DataAreaId = 'FARM';

INSERT INTO EmployeeEarningCodes (
    InternalId,
    EmployeeId,
    EarningCodeId,
    FromDate,
    ToDate,
    IndexEarning,
    Quantity,
    PayrollId,
    Comment,
    QtyPeriodForPaid,
    StartPeriodForPaid,
    PayFrecuency,
    IndexEarningMonthly,
    IndexEarningDiary,
    IndexEarningHour,
    IsUseDGT,
    IsUseCalcHour,
    PayrollProcessId,
    CreatedBy,
    CreatedOn,
    ModifiedOn,
    IsDeleted,
    DataAreaId
)
SELECT
    @InternalIdEarning + ROW_NUMBER() OVER (ORDER BY es.EmployeeId) AS InternalId,
    es.EmployeeId,
    'EC-000000001' AS EarningCodeId,           -- Código de salario
    '2022-01-01' AS FromDate,
    '2050-01-01' AS ToDate,
    12500.00 AS IndexEarning,                  -- Salario quincenal
    0 AS Quantity,
    'PAY-000000002' AS PayrollId,              -- Nómina Quincenal
    NULL AS Comment,
    1 AS QtyPeriodForPaid,
    1 AS StartPeriodForPaid,
    3 AS PayFrecuency,                         -- Quincenal (3)
    25000.00 AS IndexEarningMonthly,           -- Salario mensual
    1049.10 AS IndexEarningDiary,              -- Salario diario (25000/23.83)
    131.14 AS IndexEarningHour,                -- Salario por hora (diario/8)
    1 AS IsUseDGT,
    0 AS IsUseCalcHour,
    NULL AS PayrollProcessId,
    'AdminRH365' AS CreatedBy,
    GETDATE() AS CreatedOn,
    '0001-01-01' AS ModifiedOn,
    0 AS IsDeleted,
    'FARM' AS DataAreaId
FROM #EmpleadosSeleccionados es;

PRINT 'Códigos de ingreso insertados: ' + CAST(@@ROWCOUNT AS VARCHAR(10));

-- =====================================================
-- PASO 3: Insertar Códigos de Descuento (AFP y SFS)
-- DC-000000001 (AFP) y DC-000000002 (SFS)
-- =====================================================
PRINT '';
PRINT '=== Insertando Códigos de Descuento (AFP) ===';

INSERT INTO EmployeeDeductionCodes (
    DeductionCodeId,
    PayrollId,
    EmployeeId,
    FromDate,
    ToDate,
    IndexDeduction,
    PercentDeduction,
    PercentContribution,
    Comment,
    DeductionAmount,
    QtyPeriodForPaid,
    StartPeriodForPaid,
    PayFrecuency,
    CreatedBy,
    CreatedOn,
    ModifiedOn,
    IsDeleted,
    DataAreaId
)
SELECT
    'DC-000000001' AS DeductionCodeId,         -- AFP
    'PAY-000000002' AS PayrollId,
    es.EmployeeId,
    '2022-01-01' AS FromDate,
    '2050-01-01' AS ToDate,
    0.00 AS IndexDeduction,
    0.00 AS PercentDeduction,
    0.00 AS PercentContribution,
    NULL AS Comment,
    0.00 AS DeductionAmount,
    1 AS QtyPeriodForPaid,
    1 AS StartPeriodForPaid,
    3 AS PayFrecuency,                         -- Quincenal
    'AdminRH365' AS CreatedBy,
    GETDATE() AS CreatedOn,
    '0001-01-01' AS ModifiedOn,
    0 AS IsDeleted,
    'FARM' AS DataAreaId
FROM #EmpleadosSeleccionados es;

PRINT 'Códigos AFP insertados: ' + CAST(@@ROWCOUNT AS VARCHAR(10));

PRINT '';
PRINT '=== Insertando Códigos de Descuento (SFS) ===';

INSERT INTO EmployeeDeductionCodes (
    DeductionCodeId,
    PayrollId,
    EmployeeId,
    FromDate,
    ToDate,
    IndexDeduction,
    PercentDeduction,
    PercentContribution,
    Comment,
    DeductionAmount,
    QtyPeriodForPaid,
    StartPeriodForPaid,
    PayFrecuency,
    CreatedBy,
    CreatedOn,
    ModifiedOn,
    IsDeleted,
    DataAreaId
)
SELECT
    'DC-000000002' AS DeductionCodeId,         -- SFS
    'PAY-000000002' AS PayrollId,
    es.EmployeeId,
    '2022-01-01' AS FromDate,
    '2050-01-01' AS ToDate,
    0.00 AS IndexDeduction,
    0.00 AS PercentDeduction,
    0.00 AS PercentContribution,
    NULL AS Comment,
    0.00 AS DeductionAmount,
    1 AS QtyPeriodForPaid,
    1 AS StartPeriodForPaid,
    3 AS PayFrecuency,                         -- Quincenal
    'AdminRH365' AS CreatedBy,
    GETDATE() AS CreatedOn,
    '0001-01-01' AS ModifiedOn,
    0 AS IsDeleted,
    'FARM' AS DataAreaId
FROM #EmpleadosSeleccionados es;

PRINT 'Códigos SFS insertados: ' + CAST(@@ROWCOUNT AS VARCHAR(10));

-- =====================================================
-- PASO 4: Insertar Códigos de Impuesto (ISR)
-- =====================================================
PRINT '';
PRINT '=== Insertando Códigos de Impuesto (ISR) ===';

INSERT INTO EmployeeTaxes (
    TaxId,
    EmployeeId,
    PayrollId,
    ValidTo,
    ValidFrom,
    CreatedBy,
    CreatedOn,
    ModifiedOn,
    IsDeleted,
    DataAreaId
)
SELECT
    'ISR' AS TaxId,
    es.EmployeeId,
    'PAY-000000002' AS PayrollId,
    '2050-01-01' AS ValidTo,
    '2022-01-01' AS ValidFrom,
    'AdminRH365' AS CreatedBy,
    GETDATE() AS CreatedOn,
    '0001-01-01' AS ModifiedOn,
    0 AS IsDeleted,
    'FARM' AS DataAreaId
FROM #EmpleadosSeleccionados es;

PRINT 'Códigos ISR insertados: ' + CAST(@@ROWCOUNT AS VARCHAR(10));

-- =====================================================
-- PASO 5: Verificar resultados
-- =====================================================
PRINT '';
PRINT '=== RESUMEN DE CONFIGURACIÓN ===';

SELECT
    'Códigos de Ingreso' AS Tipo,
    COUNT(*) AS Cantidad
FROM EmployeeEarningCodes
WHERE DataAreaId = 'FARM'
  AND IsDeleted = 0
  AND EmployeeId IN (SELECT EmployeeId FROM #EmpleadosSeleccionados)
UNION ALL
SELECT
    'Códigos de Descuento' AS Tipo,
    COUNT(*) AS Cantidad
FROM EmployeeDeductionCodes
WHERE DataAreaId = 'FARM'
  AND IsDeleted = 0
  AND EmployeeId IN (SELECT EmployeeId FROM #EmpleadosSeleccionados)
UNION ALL
SELECT
    'Códigos de Impuesto' AS Tipo,
    COUNT(*) AS Cantidad
FROM EmployeeTaxes
WHERE DataAreaId = 'FARM'
  AND IsDeleted = 0
  AND EmployeeId IN (SELECT EmployeeId FROM #EmpleadosSeleccionados);

-- Limpiar tabla temporal
DROP TABLE #EmpleadosSeleccionados;

PRINT '';
PRINT '=== Script ejecutado correctamente ===';
GO
