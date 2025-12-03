-- ============================================================================
-- Script: 02_SeedData_NewCompany.sql
-- Descripción: Script para crear una nueva empresa en el sistema RH365
-- Ejecutar: Cada vez que se necesite crear una nueva empresa
-- Autor: Equipo de Desarrollo
-- Fecha: 2025-12-02
-- ============================================================================
-- INSTRUCCIONES:
-- 1. Modifique los valores en la sección "CONFIGURACIÓN DE LA NUEVA EMPRESA"
-- 2. Ejecute el script completo
-- 3. Verifique que la empresa y usuario fueron creados correctamente
-- ============================================================================

SET NOCOUNT ON;

-- ============================================================================
-- CONFIGURACIÓN DE LA NUEVA EMPRESA (MODIFICAR ESTOS VALORES)
-- ============================================================================
DECLARE @CompanyId NVARCHAR(20) = 'Farm';           -- ID único de la empresa (sin espacios)
DECLARE @CompanyName NVARCHAR(100) = 'Farmacia RH-365 SRL'; -- Nombre de la empresa
DECLARE @CompanyEmail NVARCHAR(200) = 'info@FarmaciaRH-365.com'; -- Email de contacto
DECLARE @CompanyPhone NVARCHAR(20) = '809-000-0000';     -- Teléfono
DECLARE @CompanyResponsible NVARCHAR(50) = 'Nombre del Responsable'; -- Persona responsable
DECLARE @CompanyCountry NVARCHAR(10) = 'DOM';            -- País (DOM, USA, PER, CH)
DECLARE @CompanyCurrency NVARCHAR(10) = 'DOP';           -- Moneda (DOP, USD)
DECLARE @CompanyRNC NVARCHAR(50) = '000-00000-0';        -- RNC/Identificación fiscal

-- Usuario administrador de la empresa
DECLARE @UserAlias NVARCHAR(20) = 'AdminFarma';       -- Alias único del usuario
DECLARE @UserEmail NVARCHAR(200) = 'admin@rh-365.com'; -- Email del usuario
DECLARE @UserName NVARCHAR(100) = 'Administrador Farmacia RH-365'; -- Nombre completo
DECLARE @UserPassword NVARCHAR(50) = '12345678';         -- Contraseña inicial
-- ============================================================================
-- NO MODIFICAR DESDE AQUÍ
-- ============================================================================

DECLARE @PasswordMD5 NVARCHAR(50);
DECLARE @ErrorMessage NVARCHAR(500);

PRINT '========================================';
PRINT 'CREACIÓN DE NUEVA EMPRESA - RH365';
PRINT '========================================';
PRINT '';

-- Validar que no exista la empresa
IF EXISTS (SELECT 1 FROM Companies WHERE CompanyId = @CompanyId)
BEGIN
    SET @ErrorMessage = 'ERROR: Ya existe una empresa con el ID: ' + @CompanyId;
    RAISERROR(@ErrorMessage, 16, 1);
    RETURN;
END

-- Validar que no exista el usuario
IF EXISTS (SELECT 1 FROM Users WHERE Email = @UserEmail OR Alias = @UserAlias)
BEGIN
    SET @ErrorMessage = 'ERROR: Ya existe un usuario con el email o alias especificado';
    RAISERROR(@ErrorMessage, 16, 1);
    RETURN;
END

-- Calcular MD5 del password
-- Nota: MD5 de '12345678' = '25d55ad283aa400af464c76d713c07ad'
SET @PasswordMD5 = CONVERT(NVARCHAR(32), HASHBYTES('MD5', @UserPassword), 2);

BEGIN TRY
    BEGIN TRANSACTION;

    -- ========================================================================
    -- 1. CREAR LA EMPRESA
    -- ========================================================================
    PRINT '1. Creando empresa: ' + @CompanyName;

    INSERT INTO Companies (
        CompanyId,
        Name,
        Email,
        Phone,
        Responsible,
        CountryId,
        CurrencyId,
        CompanyLogo,
        LicenseKey,
        Identification,
        CompanyStatus,
        RecId,
        IsDeleted,
        CreatedBy,
        CreatedOn,
        ModifiedBy,
        ModifiedOn
    )
    VALUES (
        @CompanyId,
        @CompanyName,
        @CompanyEmail,
        @CompanyPhone,
        @CompanyResponsible,
        @CompanyCountry,
        @CompanyCurrency,
        NULL,
        'D365',
        @CompanyRNC,
        1,  -- CompanyStatus = Activa
        0,
        0,  -- IsDeleted = false
        'System',
        GETDATE(),
        'System',
        GETDATE()
    );

    PRINT '   - Empresa creada exitosamente';

    -- ========================================================================
    -- 2. CREAR EL USUARIO ADMINISTRADOR DE LA EMPRESA
    -- ========================================================================
    PRINT '2. Creando usuario administrador: ' + @UserEmail;

    INSERT INTO Users (
        Alias,
        Email,
        Password,
        Name,
        FormatCodeId,
        ElevationType,
        CompanyDefaultId,
        TemporaryPassword,
        DateTemporaryPassword,
        CreatedBy,
        CreatedOn,
        ModifiedBy,
        ModifiedOn,
        RecId,
        IsDeleted
    )
    VALUES (
        @UserAlias,
        @UserEmail,
        @PasswordMD5,
        @UserName,
        'es-DO',  -- Formato de fecha/hora
        0,        -- ElevationType = Usuario normal
        @CompanyId,
        NULL,
        NULL,
        'System',
        GETDATE(),
        'System',
        GETDATE(),
        0,
        0
    );

    PRINT '   - Usuario creado exitosamente';

    -- ========================================================================
    -- 3. ASIGNAR LA EMPRESA AL USUARIO
    -- ========================================================================
    PRINT '3. Asignando empresa al usuario...';

    INSERT INTO CompaniesAssignedToUsers (
        CompanyId,
        Alias,
        CreatedBy,
        CreatedOn,
        ModifiedBy,
        ModifiedOn,
        RecId,
        IsDeleted
    )
    VALUES (
        @CompanyId,
        @UserAlias,
        'System',
        GETDATE(),
        'System',
        GETDATE(),
        0,
        0
    );

    PRINT '   - Empresa asignada al usuario';

    -- ========================================================================
    -- 4. ASIGNAR PERMISOS DE MENÚ (TODOS LOS PERMISOS)
    -- ========================================================================
    PRINT '4. Asignando permisos de menú...';

    INSERT INTO MenuAssignedToUsers (
        Alias,
        MenuId,
        PrivilegeView,
        PrivilegeEdit,
        PrivilegeDelete,
        CreatedBy,
        CreatedOn,
        ModifiedBy,
        ModifiedOn,
        RecId,
        IsDeleted
    )
    SELECT
        @UserAlias,
        MenuId,
        1,  -- PrivilegeView = true
        1,  -- PrivilegeEdit = true
        1,  -- PrivilegeDelete = true
        'System',
        GETDATE(),
        'System',
        GETDATE(),
        0,
        0
    FROM MenusApp
    WHERE IsDeleted = 0;

    DECLARE @MenuCount INT = @@ROWCOUNT;
    PRINT '   - ' + CAST(@MenuCount AS NVARCHAR) + ' permisos de menú asignados';

    -- ========================================================================
    -- 5. CREAR CONFIGURACIÓN GENERAL DE LA EMPRESA
    -- ========================================================================
    PRINT '5. Creando configuración general...';

    -- Verificar si existe la tabla GeneralConfigs y si tiene la estructura esperada
    IF EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'GeneralConfigs')
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM GeneralConfigs WHERE DataAreaId = @CompanyId)
        BEGIN
            INSERT INTO GeneralConfigs (
                DataAreaId,
                CreatedBy,
                CreatedOn,
                ModifiedBy,
                ModifiedOn,
                RecId,
                IsDeleted
            )
            VALUES (
                @CompanyId,
                'System',
                GETDATE(),
                'System',
                GETDATE(),
                0,
                0
            );
            PRINT '   - Configuración general creada';
        END
    END

    COMMIT TRANSACTION;

    PRINT '';
    PRINT '========================================';
    PRINT 'EMPRESA CREADA EXITOSAMENTE';
    PRINT '========================================';
    PRINT '';
    PRINT 'Resumen de la nueva empresa:';
    PRINT '  ID: ' + @CompanyId;
    PRINT '  Nombre: ' + @CompanyName;
    PRINT '  RNC: ' + @CompanyRNC;
    PRINT '';
    PRINT 'Usuario administrador:';
    PRINT '  Email: ' + @UserEmail;
    PRINT '  Password: ' + @UserPassword;
    PRINT '  Alias: ' + @UserAlias;
    PRINT '';
    PRINT '========================================';

END TRY
BEGIN CATCH
    IF @@TRANCOUNT > 0
        ROLLBACK TRANSACTION;

    PRINT '';
    PRINT '========================================';
    PRINT 'ERROR AL CREAR LA EMPRESA';
    PRINT '========================================';
    PRINT 'Mensaje: ' + ERROR_MESSAGE();
    PRINT 'Línea: ' + CAST(ERROR_LINE() AS NVARCHAR);
    PRINT '========================================';

    -- Re-lanzar el error
    THROW;
END CATCH

SET NOCOUNT OFF;
GO

-- ============================================================================
-- SCRIPT ADICIONAL: Asignar empresa existente a usuario existente
-- ============================================================================
-- Descomente y modifique si necesita asignar una empresa a un usuario existente
/*
DECLARE @ExistingUserAlias NVARCHAR(20) = 'AdminRH365';
DECLARE @ExistingCompanyId NVARCHAR(20) = 'NUEVAEMP';

-- Asignar empresa
IF NOT EXISTS (SELECT 1 FROM CompaniesAssignedToUsers WHERE Alias = @ExistingUserAlias AND CompanyId = @ExistingCompanyId)
BEGIN
    INSERT INTO CompaniesAssignedToUsers (CompanyId, Alias, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
    VALUES (@ExistingCompanyId, @ExistingUserAlias, 'System', GETDATE(), 'System', GETDATE(), 0, 0);
    PRINT 'Empresa asignada al usuario existente';
END

-- Asignar permisos de menú para la nueva empresa
INSERT INTO MenuAssignedToUsers (Alias, MenuId, PrivilegeView, PrivilegeEdit, PrivilegeDelete, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, RecId, IsDeleted)
SELECT @ExistingUserAlias, MenuId, 1, 1, 1, 'System', GETDATE(), 'System', GETDATE(), 0, 0
FROM MenusApp
WHERE IsDeleted = 0
AND MenuId NOT IN (SELECT MenuId FROM MenuAssignedToUsers WHERE Alias = @ExistingUserAlias);
*/
