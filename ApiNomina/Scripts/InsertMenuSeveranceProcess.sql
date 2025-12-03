-- Script para insertar el menú de Prestaciones Laborales (Severance Process)
-- Este menú se agrega bajo la sección de Nómina (MENU-0004)
-- Fecha: 2025-11-30
--
-- NOTA: El sistema utiliza la tabla MenuAssignedToUsers para relacionar usuarios con menús
--       Clave compuesta: (Alias, MenuId) donde Alias es el identificador del usuario

-- ============================================
-- PASO 1: Insertar el Menú de Prestaciones Laborales
-- ============================================
IF NOT EXISTS (SELECT 1 FROM MenusApp WHERE MenuId = 'MENU-0070')
BEGIN
    INSERT INTO MenusApp (
        MenuId,
        MenuName,
        Description,
        Action,
        Icon,
        Sort,
        MenuFather,
        IsViewMenu,
        CreatedOn,
        ModifiedOn,
        CreatedBy,
        ModifiedBy,
        IsDeleted
    )
    VALUES (
        'MENU-0070',                            -- MenuId
        'Prestaciones Laborales',               -- MenuName
        'Calculo de prestaciones laborales (Preaviso, Cesantia, Vacaciones, Navidad)',  -- Description
        'prestacioneslaborales',                -- Action (ruta del controlador en el frontend)
        'fa fa-money',                          -- Icon (FontAwesome icon class)
        22,                                     -- Sort (después de PayrollProcess que es 21)
        'MENU-0004',                            -- MenuFather (Nómina/Payroll)
        1,                                      -- IsViewMenu (visible en el menú)
        GETDATE(),                              -- CreatedOn
        GETDATE(),                              -- ModifiedOn
        'System',                               -- CreatedBy
        'System',                               -- ModifiedBy
        0                                       -- IsDeleted
    );

    PRINT 'Menu de Prestaciones Laborales insertado correctamente.';
END
ELSE
BEGIN
    PRINT 'El menu de Prestaciones Laborales ya existe.';
END
GO

-- ============================================
-- PASO 2: Asignar permisos a usuarios existentes
-- ============================================
-- Asignar a todos los usuarios que tengan acceso a PayrollProcess (MENU-0021)
-- Con los mismos privilegios que tienen para PayrollProcess

INSERT INTO MenuAssignedToUsers (
    Alias,
    MenuId,
    PrivilegeView,
    PrivilegeEdit,
    PrivilegeDelete,
    CreatedOn,
    ModifiedOn,
    CreatedBy,
    ModifiedBy,
    IsDeleted
)
SELECT
    mau.Alias,
    'MENU-0070',
    mau.PrivilegeView,
    mau.PrivilegeEdit,
    mau.PrivilegeDelete,
    GETDATE(),
    GETDATE(),
    'System',
    'System',
    0
FROM MenuAssignedToUsers mau
WHERE mau.MenuId = 'MENU-0021'  -- PayrollProcess
AND mau.IsDeleted = 0
AND NOT EXISTS (
    SELECT 1 FROM MenuAssignedToUsers mau2
    WHERE mau2.Alias = mau.Alias
    AND mau2.MenuId = 'MENU-0070'
);

PRINT 'Permisos de Prestaciones Laborales asignados a usuarios con acceso a Proceso de Nomina.';
GO

-- ============================================
-- VERIFICACION DEL MENU
-- ============================================
SELECT
    m.MenuId,
    m.MenuName,
    m.Description,
    m.Action,
    m.MenuFather,
    p.MenuName AS ParentMenuName,
    m.Sort,
    m.Icon
FROM MenusApp m
LEFT JOIN MenusApp p ON m.MenuFather = p.MenuId
WHERE m.MenuId = 'MENU-0070';
GO

-- ============================================
-- VERIFICACION DE PERMISOS ASIGNADOS
-- ============================================
SELECT
    mau.Alias,
    u.Name AS UserName,
    mau.MenuId,
    m.MenuName,
    mau.PrivilegeView,
    mau.PrivilegeEdit,
    mau.PrivilegeDelete
FROM MenuAssignedToUsers mau
INNER JOIN Users u ON mau.Alias = u.Alias
INNER JOIN MenusApp m ON mau.MenuId = m.MenuId
WHERE mau.MenuId = 'MENU-0070'
AND mau.IsDeleted = 0;

PRINT 'Script de Prestaciones Laborales ejecutado correctamente.';
GO
