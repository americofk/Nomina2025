using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DC365_PayrollHR.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class ConfigureRecIdSequenceForAllEntities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Lista de tablas a actualizar (excluyendo UserGridViews que necesita tratamiento especial y AuditLogs que ya tiene la secuencia)
            var tables = new[]
            {
                "Users", "UserImages", "Taxes", "TaxDetails", "ReportsConfig", "Provinces",
                "Projects", "ProjCategories", "Positions", "PositionRequirements", "PayrollsProcess",
                "Payrolls", "PayrollProcessDetails", "PayrollProcessActions", "PayCycles", "Occupations",
                "MenusApp", "MenuAssignedToUsers", "Loans", "Jobs", "Instructors", "GeneralConfigs",
                "FormatCodes", "EmployeeWorkControlCalendars", "EmployeeWorkCalendars", "EmployeeTaxes",
                "EmployeesAddress", "Employees", "EmployeePositions", "EmployeeLoans", "EmployeeLoanHistories",
                "EmployeeImages", "EmployeeHistories", "EmployeeExtraHours", "EmployeeEarningCodes",
                "EmployeeDocuments", "EmployeeDepartments", "EmployeeDeductionCodes", "EmployeeContactsInf",
                "EmployeeBankAccounts", "EducationLevels", "EarningCodeVersions", "EarningCodes",
                "DisabilityTypes", "Departments", "DeductionCodeVersions", "DeductionCodes", "Currencies",
                "CourseTypes", "Courses", "CoursePositions", "CourseLocations", "CourseInstructors",
                "CourseEmployees", "Countries", "CompaniesAssignedToUsers", "Companies", "ClassRooms",
                "CalendarHolidays", "BatchHistories"
            };

            // Aplicar valor por defecto de secuencia a todas las tablas
            // Primero eliminar cualquier constraint existente, luego crear el nuevo
            foreach (var table in tables)
            {
                migrationBuilder.Sql($@"
                    -- Eliminar constraint existente si tiene valor ((0))
                    DECLARE @constraintName_{table.Replace("-", "_")} NVARCHAR(255);
                    SELECT @constraintName_{table.Replace("-", "_")} = dc.name
                    FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = '{table}' AND c.name = 'RecId' AND dc.definition = '((0))';

                    IF @constraintName_{table.Replace("-", "_")} IS NOT NULL
                        EXEC('ALTER TABLE [{table}] DROP CONSTRAINT [' + @constraintName_{table.Replace("-", "_")} + ']');

                    -- Crear nuevo constraint con secuencia si no existe
                    IF NOT EXISTS (
                        SELECT 1 FROM sys.default_constraints dc
                        JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                        WHERE OBJECT_NAME(dc.parent_object_id) = '{table}' AND c.name = 'RecId'
                    )
                    BEGIN
                        ALTER TABLE [{table}] ADD CONSTRAINT [DF_{table}_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                    END
                ");
            }

            // Tratamiento especial para UserGridViews que tiene IDENTITY
            // Paso 1: Crear columna temporal
            migrationBuilder.Sql(@"
                IF EXISTS (SELECT 1 FROM sys.identity_columns WHERE OBJECT_NAME(object_id) = 'UserGridViews' AND name = 'RecId')
                    AND NOT EXISTS (SELECT 1 FROM sys.columns WHERE OBJECT_NAME(object_id) = 'UserGridViews' AND name = 'RecId_New')
                BEGIN
                    ALTER TABLE [UserGridViews] ADD [RecId_New] bigint NULL;
                END
            ");

            // Paso 2: Copiar datos
            migrationBuilder.Sql(@"
                IF EXISTS (SELECT 1 FROM sys.columns WHERE OBJECT_NAME(object_id) = 'UserGridViews' AND name = 'RecId_New')
                BEGIN
                    UPDATE [UserGridViews] SET [RecId_New] = [RecId] WHERE [RecId_New] IS NULL;
                END
            ");

            // Paso 3: Eliminar PK, columna original, renombrar y recrear
            migrationBuilder.Sql(@"
                IF EXISTS (SELECT 1 FROM sys.identity_columns WHERE OBJECT_NAME(object_id) = 'UserGridViews' AND name = 'RecId')
                BEGIN
                    -- Eliminar índices que dependen de RecId
                    DECLARE @sql NVARCHAR(MAX) = '';
                    SELECT @sql = @sql + 'DROP INDEX [' + i.name + '] ON [UserGridViews];'
                    FROM sys.indexes i
                    JOIN sys.index_columns ic ON i.object_id = ic.object_id AND i.index_id = ic.index_id
                    JOIN sys.columns c ON ic.object_id = c.object_id AND ic.column_id = c.column_id
                    WHERE OBJECT_NAME(i.object_id) = 'UserGridViews' AND c.name = 'RecId' AND i.is_primary_key = 0;
                    EXEC sp_executesql @sql;

                    -- Eliminar primary key
                    DECLARE @pkName NVARCHAR(255);
                    SELECT @pkName = name FROM sys.key_constraints WHERE parent_object_id = OBJECT_ID('UserGridViews') AND type = 'PK';
                    IF @pkName IS NOT NULL
                        EXEC('ALTER TABLE [UserGridViews] DROP CONSTRAINT [' + @pkName + ']');

                    -- Eliminar columna original con IDENTITY
                    ALTER TABLE [UserGridViews] DROP COLUMN [RecId];

                    -- Renombrar columna nueva
                    EXEC sp_rename 'UserGridViews.RecId_New', 'RecId', 'COLUMN';

                    -- Hacer NOT NULL
                    ALTER TABLE [UserGridViews] ALTER COLUMN [RecId] bigint NOT NULL;

                    -- Agregar primary key
                    ALTER TABLE [UserGridViews] ADD CONSTRAINT [PK_UserGridViews] PRIMARY KEY ([RecId]);

                    -- Agregar default de secuencia
                    ALTER TABLE [UserGridViews] ADD CONSTRAINT [DF_UserGridViews_RecId] DEFAULT (NEXT VALUE FOR dbo.RecId) FOR [RecId];
                END
            ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Lista de tablas
            var tables = new[]
            {
                "Users", "UserImages", "Taxes", "TaxDetails", "ReportsConfig", "Provinces",
                "Projects", "ProjCategories", "Positions", "PositionRequirements", "PayrollsProcess",
                "Payrolls", "PayrollProcessDetails", "PayrollProcessActions", "PayCycles", "Occupations",
                "MenusApp", "MenuAssignedToUsers", "Loans", "Jobs", "Instructors", "GeneralConfigs",
                "FormatCodes", "EmployeeWorkControlCalendars", "EmployeeWorkCalendars", "EmployeeTaxes",
                "EmployeesAddress", "Employees", "EmployeePositions", "EmployeeLoans", "EmployeeLoanHistories",
                "EmployeeImages", "EmployeeHistories", "EmployeeExtraHours", "EmployeeEarningCodes",
                "EmployeeDocuments", "EmployeeDepartments", "EmployeeDeductionCodes", "EmployeeContactsInf",
                "EmployeeBankAccounts", "EducationLevels", "EarningCodeVersions", "EarningCodes",
                "DisabilityTypes", "Departments", "DeductionCodeVersions", "DeductionCodes", "Currencies",
                "CourseTypes", "Courses", "CoursePositions", "CourseLocations", "CourseInstructors",
                "CourseEmployees", "Countries", "CompaniesAssignedToUsers", "Companies", "ClassRooms",
                "CalendarHolidays", "BatchHistories"
            };

            // Eliminar constraints de valor por defecto
            foreach (var table in tables)
            {
                migrationBuilder.Sql($@"
                    DECLARE @constraintName NVARCHAR(255);
                    SELECT @constraintName = dc.name FROM sys.default_constraints dc
                    JOIN sys.columns c ON dc.parent_object_id = c.object_id AND dc.parent_column_id = c.column_id
                    WHERE OBJECT_NAME(dc.parent_object_id) = '{table}' AND c.name = 'RecId';
                    IF @constraintName IS NOT NULL
                        EXEC('ALTER TABLE [{table}] DROP CONSTRAINT [' + @constraintName + ']');
                ");
            }

            // Para UserGridViews, tendríamos que recrear como IDENTITY, pero esto es más complejo
            // y normalmente no se hace rollback de esta migración
        }
    }
}
