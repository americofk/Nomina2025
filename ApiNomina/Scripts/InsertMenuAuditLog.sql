-- Script para insertar el menú de Auditoría ISO 27001
-- Este menú se agrega bajo la sección de Configuración (MENU-0057)
-- Fecha: 2025-11-28

-- Verificar si el menú ya existe
IF NOT EXISTS (SELECT 1 FROM MenusApp WHERE MenuId = 'MENU-0069')
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
        'MENU-0069',                -- MenuId
        'Auditoría',                -- MenuName
        'Registros de auditoría ISO 27001',  -- Description
        'auditoria',                -- Action (ruta del controlador en el frontend)
        'fa fa-history',            -- Icon (FontAwesome icon class)
        100,                        -- Sort (orden de aparición)
        'MENU-0006',                -- MenuFather (Configuración)
        1,                          -- IsViewMenu (visible en el menú)
        GETDATE(),                  -- CreatedOn
        GETDATE(),                  -- ModifiedOn
        'System',                   -- CreatedBy
        'System',                   -- ModifiedBy
        0                           -- IsDeleted
    );

    PRINT 'Menú de Auditoría insertado correctamente.';
END
ELSE
BEGIN
    PRINT 'El menú de Auditoría ya existe.';
END
GO
