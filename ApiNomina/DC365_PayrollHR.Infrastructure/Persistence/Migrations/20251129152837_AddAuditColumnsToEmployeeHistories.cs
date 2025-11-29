using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DC365_PayrollHR.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddAuditColumnsToEmployeeHistories : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Agregar columnas de auditoría a EmployeeHistories si no existen
            migrationBuilder.Sql(@"
                IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('EmployeeHistories') AND name = 'RecId')
                BEGIN
                    ALTER TABLE EmployeeHistories ADD RecId bigint NOT NULL DEFAULT (NEXT VALUE FOR dbo.RecId);
                END

                IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('EmployeeHistories') AND name = 'CreatedBy')
                BEGIN
                    ALTER TABLE EmployeeHistories ADD CreatedBy nvarchar(20) NULL;
                END

                IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('EmployeeHistories') AND name = 'CreatedOn')
                BEGIN
                    ALTER TABLE EmployeeHistories ADD CreatedOn datetime2 NOT NULL DEFAULT GETUTCDATE();
                END

                IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('EmployeeHistories') AND name = 'ModifiedBy')
                BEGIN
                    ALTER TABLE EmployeeHistories ADD ModifiedBy nvarchar(20) NULL;
                END

                IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('EmployeeHistories') AND name = 'ModifiedOn')
                BEGIN
                    ALTER TABLE EmployeeHistories ADD ModifiedOn datetime2 NOT NULL DEFAULT GETUTCDATE();
                END

                IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('EmployeeHistories') AND name = 'IsDeleted')
                BEGIN
                    ALTER TABLE EmployeeHistories ADD IsDeleted bit NOT NULL DEFAULT 0;
                END

                IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('EmployeeHistories') AND name = 'DeletedBy')
                BEGIN
                    ALTER TABLE EmployeeHistories ADD DeletedBy nvarchar(20) NULL;
                END

                IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('EmployeeHistories') AND name = 'DeletedOn')
                BEGIN
                    ALTER TABLE EmployeeHistories ADD DeletedOn datetime2 NULL;
                END

                IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('EmployeeHistories') AND name = 'DataAreaId')
                BEGIN
                    ALTER TABLE EmployeeHistories ADD DataAreaId nvarchar(10) NULL;
                END
            ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('EmployeeHistories') AND name = 'RecId')
                    ALTER TABLE EmployeeHistories DROP COLUMN RecId;

                IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('EmployeeHistories') AND name = 'CreatedBy')
                    ALTER TABLE EmployeeHistories DROP COLUMN CreatedBy;

                IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('EmployeeHistories') AND name = 'CreatedOn')
                    ALTER TABLE EmployeeHistories DROP COLUMN CreatedOn;

                IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('EmployeeHistories') AND name = 'ModifiedBy')
                    ALTER TABLE EmployeeHistories DROP COLUMN ModifiedBy;

                IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('EmployeeHistories') AND name = 'ModifiedOn')
                    ALTER TABLE EmployeeHistories DROP COLUMN ModifiedOn;

                IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('EmployeeHistories') AND name = 'IsDeleted')
                    ALTER TABLE EmployeeHistories DROP COLUMN IsDeleted;

                IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('EmployeeHistories') AND name = 'DeletedBy')
                    ALTER TABLE EmployeeHistories DROP COLUMN DeletedBy;

                IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('EmployeeHistories') AND name = 'DeletedOn')
                    ALTER TABLE EmployeeHistories DROP COLUMN DeletedOn;

                IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('EmployeeHistories') AND name = 'DataAreaId')
                    ALTER TABLE EmployeeHistories DROP COLUMN DataAreaId;
            ");
        }
    }
}
