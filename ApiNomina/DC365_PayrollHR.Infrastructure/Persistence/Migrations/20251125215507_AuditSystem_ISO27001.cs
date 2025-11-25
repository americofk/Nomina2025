using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DC365_PayrollHR.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AuditSystem_ISO27001 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmployeeTaxes_Taxes_TaxId_InCompany",
                table: "EmployeeTaxes");

            migrationBuilder.DropForeignKey(
                name: "FK_TaxDetails_Taxes_TaxId_InCompany",
                table: "TaxDetails");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Taxes",
                table: "Taxes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TaxDetails",
                table: "TaxDetails");

            migrationBuilder.DropIndex(
                name: "IX_TaxDetails_TaxId_InCompany",
                table: "TaxDetails");

            migrationBuilder.DropIndex(
                name: "IX_EmployeeTaxes_TaxId_InCompany",
                table: "EmployeeTaxes");

            migrationBuilder.DropColumn(
                name: "InCompany",
                table: "Taxes");

            migrationBuilder.DropColumn(
                name: "InCompany",
                table: "TaxDetails");

            migrationBuilder.DropColumn(
                name: "InCompany",
                table: "ReportsConfig");

            migrationBuilder.DropColumn(
                name: "InCompany",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "InCompany",
                table: "ProjCategories");

            migrationBuilder.DropColumn(
                name: "InCompany",
                table: "Positions");

            migrationBuilder.DropColumn(
                name: "InCompany",
                table: "PositionRequirements");

            migrationBuilder.DropColumn(
                name: "InCompany",
                table: "PayrollsProcess");

            migrationBuilder.DropColumn(
                name: "InCompany",
                table: "Payrolls");

            migrationBuilder.DropColumn(
                name: "InCompany",
                table: "PayrollProcessDetails");

            migrationBuilder.DropColumn(
                name: "InCompany",
                table: "PayrollProcessActions");

            migrationBuilder.DropColumn(
                name: "InCompany",
                table: "PayCycles");

            migrationBuilder.DropColumn(
                name: "InCompany",
                table: "Loans");

            migrationBuilder.DropColumn(
                name: "InCompany",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "InCompany",
                table: "Instructors");

            migrationBuilder.DropColumn(
                name: "InCompany",
                table: "EmployeeWorkControlCalendars");

            migrationBuilder.DropColumn(
                name: "InCompany",
                table: "EmployeeWorkCalendars");

            migrationBuilder.DropColumn(
                name: "InCompany",
                table: "EmployeeTaxes");

            migrationBuilder.DropColumn(
                name: "InCompany",
                table: "EmployeesAddress");

            migrationBuilder.DropColumn(
                name: "InCompany",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "InCompany",
                table: "EmployeePositions");

            migrationBuilder.DropColumn(
                name: "InCompany",
                table: "EmployeeLoans");

            migrationBuilder.DropColumn(
                name: "InCompany",
                table: "EmployeeLoanHistories");

            migrationBuilder.DropColumn(
                name: "InCompany",
                table: "EmployeeImages");

            migrationBuilder.DropColumn(
                name: "InCompany",
                table: "EmployeeExtraHours");

            migrationBuilder.DropColumn(
                name: "InCompany",
                table: "EmployeeEarningCodes");

            migrationBuilder.DropColumn(
                name: "InCompany",
                table: "EmployeeDocuments");

            migrationBuilder.DropColumn(
                name: "InCompany",
                table: "EmployeeDepartments");

            migrationBuilder.DropColumn(
                name: "InCompany",
                table: "EmployeeDeductionCodes");

            migrationBuilder.DropColumn(
                name: "InCompany",
                table: "EmployeeContactsInf");

            migrationBuilder.DropColumn(
                name: "InCompany",
                table: "EmployeeBankAccounts");

            migrationBuilder.DropColumn(
                name: "InCompany",
                table: "EarningCodeVersions");

            migrationBuilder.DropColumn(
                name: "InCompany",
                table: "EarningCodes");

            migrationBuilder.DropColumn(
                name: "InCompany",
                table: "Departments");

            migrationBuilder.DropColumn(
                name: "InCompany",
                table: "DeductionCodeVersions");

            migrationBuilder.DropColumn(
                name: "InCompany",
                table: "DeductionCodes");

            migrationBuilder.DropColumn(
                name: "InCompany",
                table: "CourseTypes");

            migrationBuilder.DropColumn(
                name: "InCompany",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "InCompany",
                table: "CoursePositions");

            migrationBuilder.DropColumn(
                name: "InCompany",
                table: "CourseLocations");

            migrationBuilder.DropColumn(
                name: "InCompany",
                table: "CourseInstructors");

            migrationBuilder.DropColumn(
                name: "InCompany",
                table: "CourseEmployees");

            migrationBuilder.DropColumn(
                name: "InCompany",
                table: "ClassRooms");

            migrationBuilder.DropColumn(
                name: "InCompany",
                table: "BatchHistories");

            migrationBuilder.RenameColumn(
                name: "ModifiedDateTime",
                table: "Users",
                newName: "ModifiedOn");

            migrationBuilder.RenameColumn(
                name: "CreatedDateTime",
                table: "Users",
                newName: "CreatedOn");

            migrationBuilder.RenameColumn(
                name: "ModifiedDateTime",
                table: "UserImages",
                newName: "ModifiedOn");

            migrationBuilder.RenameColumn(
                name: "CreatedDateTime",
                table: "UserImages",
                newName: "CreatedOn");

            migrationBuilder.RenameColumn(
                name: "ModifiedDateTime",
                table: "Taxes",
                newName: "ModifiedOn");

            migrationBuilder.RenameColumn(
                name: "CreatedDateTime",
                table: "Taxes",
                newName: "CreatedOn");

            migrationBuilder.RenameColumn(
                name: "ModifiedDateTime",
                table: "TaxDetails",
                newName: "ModifiedOn");

            migrationBuilder.RenameColumn(
                name: "CreatedDateTime",
                table: "TaxDetails",
                newName: "CreatedOn");

            migrationBuilder.RenameColumn(
                name: "ModifiedDateTime",
                table: "ReportsConfig",
                newName: "ModifiedOn");

            migrationBuilder.RenameColumn(
                name: "CreatedDateTime",
                table: "ReportsConfig",
                newName: "CreatedOn");

            migrationBuilder.RenameColumn(
                name: "ModifiedDateTime",
                table: "Projects",
                newName: "ModifiedOn");

            migrationBuilder.RenameColumn(
                name: "CreatedDateTime",
                table: "Projects",
                newName: "CreatedOn");

            migrationBuilder.RenameColumn(
                name: "ModifiedDateTime",
                table: "ProjCategories",
                newName: "ModifiedOn");

            migrationBuilder.RenameColumn(
                name: "CreatedDateTime",
                table: "ProjCategories",
                newName: "CreatedOn");

            migrationBuilder.RenameColumn(
                name: "ModifiedDateTime",
                table: "Positions",
                newName: "ModifiedOn");

            migrationBuilder.RenameColumn(
                name: "CreatedDateTime",
                table: "Positions",
                newName: "CreatedOn");

            migrationBuilder.RenameColumn(
                name: "ModifiedDateTime",
                table: "PositionRequirements",
                newName: "ModifiedOn");

            migrationBuilder.RenameColumn(
                name: "CreatedDateTime",
                table: "PositionRequirements",
                newName: "CreatedOn");

            migrationBuilder.RenameColumn(
                name: "ModifiedDateTime",
                table: "PayrollsProcess",
                newName: "ModifiedOn");

            migrationBuilder.RenameColumn(
                name: "CreatedDateTime",
                table: "PayrollsProcess",
                newName: "CreatedOn");

            migrationBuilder.RenameColumn(
                name: "ModifiedDateTime",
                table: "Payrolls",
                newName: "ModifiedOn");

            migrationBuilder.RenameColumn(
                name: "CreatedDateTime",
                table: "Payrolls",
                newName: "CreatedOn");

            migrationBuilder.RenameColumn(
                name: "ModifiedDateTime",
                table: "PayrollProcessDetails",
                newName: "ModifiedOn");

            migrationBuilder.RenameColumn(
                name: "CreatedDateTime",
                table: "PayrollProcessDetails",
                newName: "CreatedOn");

            migrationBuilder.RenameColumn(
                name: "ModifiedDateTime",
                table: "PayrollProcessActions",
                newName: "ModifiedOn");

            migrationBuilder.RenameColumn(
                name: "CreatedDateTime",
                table: "PayrollProcessActions",
                newName: "CreatedOn");

            migrationBuilder.RenameColumn(
                name: "ModifiedDateTime",
                table: "PayCycles",
                newName: "ModifiedOn");

            migrationBuilder.RenameColumn(
                name: "CreatedDateTime",
                table: "PayCycles",
                newName: "CreatedOn");

            migrationBuilder.RenameColumn(
                name: "ModifiedDateTime",
                table: "MenuAssignedToUsers",
                newName: "ModifiedOn");

            migrationBuilder.RenameColumn(
                name: "CreatedDateTime",
                table: "MenuAssignedToUsers",
                newName: "CreatedOn");

            migrationBuilder.RenameColumn(
                name: "ModifiedDateTime",
                table: "Loans",
                newName: "ModifiedOn");

            migrationBuilder.RenameColumn(
                name: "CreatedDateTime",
                table: "Loans",
                newName: "CreatedOn");

            migrationBuilder.RenameColumn(
                name: "ModifiedDateTime",
                table: "Jobs",
                newName: "ModifiedOn");

            migrationBuilder.RenameColumn(
                name: "CreatedDateTime",
                table: "Jobs",
                newName: "CreatedOn");

            migrationBuilder.RenameColumn(
                name: "ModifiedDateTime",
                table: "Instructors",
                newName: "ModifiedOn");

            migrationBuilder.RenameColumn(
                name: "CreatedDateTime",
                table: "Instructors",
                newName: "CreatedOn");

            migrationBuilder.RenameColumn(
                name: "ModifiedDateTime",
                table: "EmployeeWorkControlCalendars",
                newName: "ModifiedOn");

            migrationBuilder.RenameColumn(
                name: "CreatedDateTime",
                table: "EmployeeWorkControlCalendars",
                newName: "CreatedOn");

            migrationBuilder.RenameColumn(
                name: "ModifiedDateTime",
                table: "EmployeeWorkCalendars",
                newName: "ModifiedOn");

            migrationBuilder.RenameColumn(
                name: "CreatedDateTime",
                table: "EmployeeWorkCalendars",
                newName: "CreatedOn");

            migrationBuilder.RenameColumn(
                name: "ModifiedDateTime",
                table: "EmployeeTaxes",
                newName: "ModifiedOn");

            migrationBuilder.RenameColumn(
                name: "CreatedDateTime",
                table: "EmployeeTaxes",
                newName: "CreatedOn");

            migrationBuilder.RenameColumn(
                name: "ModifiedDateTime",
                table: "EmployeesAddress",
                newName: "ModifiedOn");

            migrationBuilder.RenameColumn(
                name: "CreatedDateTime",
                table: "EmployeesAddress",
                newName: "CreatedOn");

            migrationBuilder.RenameColumn(
                name: "ModifiedDateTime",
                table: "Employees",
                newName: "ModifiedOn");

            migrationBuilder.RenameColumn(
                name: "CreatedDateTime",
                table: "Employees",
                newName: "CreatedOn");

            migrationBuilder.RenameColumn(
                name: "ModifiedDateTime",
                table: "EmployeePositions",
                newName: "ModifiedOn");

            migrationBuilder.RenameColumn(
                name: "CreatedDateTime",
                table: "EmployeePositions",
                newName: "CreatedOn");

            migrationBuilder.RenameColumn(
                name: "ModifiedDateTime",
                table: "EmployeeLoans",
                newName: "ModifiedOn");

            migrationBuilder.RenameColumn(
                name: "CreatedDateTime",
                table: "EmployeeLoans",
                newName: "CreatedOn");

            migrationBuilder.RenameColumn(
                name: "ModifiedDateTime",
                table: "EmployeeLoanHistories",
                newName: "ModifiedOn");

            migrationBuilder.RenameColumn(
                name: "CreatedDateTime",
                table: "EmployeeLoanHistories",
                newName: "CreatedOn");

            migrationBuilder.RenameColumn(
                name: "ModifiedDateTime",
                table: "EmployeeImages",
                newName: "ModifiedOn");

            migrationBuilder.RenameColumn(
                name: "CreatedDateTime",
                table: "EmployeeImages",
                newName: "CreatedOn");

            migrationBuilder.RenameColumn(
                name: "ModifiedDateTime",
                table: "EmployeeExtraHours",
                newName: "ModifiedOn");

            migrationBuilder.RenameColumn(
                name: "CreatedDateTime",
                table: "EmployeeExtraHours",
                newName: "CreatedOn");

            migrationBuilder.RenameColumn(
                name: "ModifiedDateTime",
                table: "EmployeeEarningCodes",
                newName: "ModifiedOn");

            migrationBuilder.RenameColumn(
                name: "CreatedDateTime",
                table: "EmployeeEarningCodes",
                newName: "CreatedOn");

            migrationBuilder.RenameColumn(
                name: "ModifiedDateTime",
                table: "EmployeeDocuments",
                newName: "ModifiedOn");

            migrationBuilder.RenameColumn(
                name: "CreatedDateTime",
                table: "EmployeeDocuments",
                newName: "CreatedOn");

            migrationBuilder.RenameColumn(
                name: "ModifiedDateTime",
                table: "EmployeeDepartments",
                newName: "ModifiedOn");

            migrationBuilder.RenameColumn(
                name: "CreatedDateTime",
                table: "EmployeeDepartments",
                newName: "CreatedOn");

            migrationBuilder.RenameColumn(
                name: "ModifiedDateTime",
                table: "EmployeeDeductionCodes",
                newName: "ModifiedOn");

            migrationBuilder.RenameColumn(
                name: "CreatedDateTime",
                table: "EmployeeDeductionCodes",
                newName: "CreatedOn");

            migrationBuilder.RenameColumn(
                name: "ModifiedDateTime",
                table: "EmployeeContactsInf",
                newName: "ModifiedOn");

            migrationBuilder.RenameColumn(
                name: "CreatedDateTime",
                table: "EmployeeContactsInf",
                newName: "CreatedOn");

            migrationBuilder.RenameColumn(
                name: "ModifiedDateTime",
                table: "EmployeeBankAccounts",
                newName: "ModifiedOn");

            migrationBuilder.RenameColumn(
                name: "CreatedDateTime",
                table: "EmployeeBankAccounts",
                newName: "CreatedOn");

            migrationBuilder.RenameColumn(
                name: "ModifiedDateTime",
                table: "EarningCodeVersions",
                newName: "ModifiedOn");

            migrationBuilder.RenameColumn(
                name: "CreatedDateTime",
                table: "EarningCodeVersions",
                newName: "CreatedOn");

            migrationBuilder.RenameColumn(
                name: "ModifiedDateTime",
                table: "EarningCodes",
                newName: "ModifiedOn");

            migrationBuilder.RenameColumn(
                name: "CreatedDateTime",
                table: "EarningCodes",
                newName: "CreatedOn");

            migrationBuilder.RenameColumn(
                name: "ModifiedDateTime",
                table: "Departments",
                newName: "ModifiedOn");

            migrationBuilder.RenameColumn(
                name: "CreatedDateTime",
                table: "Departments",
                newName: "CreatedOn");

            migrationBuilder.RenameColumn(
                name: "ModifiedDateTime",
                table: "DeductionCodeVersions",
                newName: "ModifiedOn");

            migrationBuilder.RenameColumn(
                name: "CreatedDateTime",
                table: "DeductionCodeVersions",
                newName: "CreatedOn");

            migrationBuilder.RenameColumn(
                name: "ModifiedDateTime",
                table: "DeductionCodes",
                newName: "ModifiedOn");

            migrationBuilder.RenameColumn(
                name: "CreatedDateTime",
                table: "DeductionCodes",
                newName: "CreatedOn");

            migrationBuilder.RenameColumn(
                name: "ModifiedDateTime",
                table: "CourseTypes",
                newName: "ModifiedOn");

            migrationBuilder.RenameColumn(
                name: "CreatedDateTime",
                table: "CourseTypes",
                newName: "CreatedOn");

            migrationBuilder.RenameColumn(
                name: "ModifiedDateTime",
                table: "Courses",
                newName: "ModifiedOn");

            migrationBuilder.RenameColumn(
                name: "CreatedDateTime",
                table: "Courses",
                newName: "CreatedOn");

            migrationBuilder.RenameColumn(
                name: "ModifiedDateTime",
                table: "CoursePositions",
                newName: "ModifiedOn");

            migrationBuilder.RenameColumn(
                name: "CreatedDateTime",
                table: "CoursePositions",
                newName: "CreatedOn");

            migrationBuilder.RenameColumn(
                name: "ModifiedDateTime",
                table: "CourseLocations",
                newName: "ModifiedOn");

            migrationBuilder.RenameColumn(
                name: "CreatedDateTime",
                table: "CourseLocations",
                newName: "CreatedOn");

            migrationBuilder.RenameColumn(
                name: "ModifiedDateTime",
                table: "CourseInstructors",
                newName: "ModifiedOn");

            migrationBuilder.RenameColumn(
                name: "CreatedDateTime",
                table: "CourseInstructors",
                newName: "CreatedOn");

            migrationBuilder.RenameColumn(
                name: "ModifiedDateTime",
                table: "CourseEmployees",
                newName: "ModifiedOn");

            migrationBuilder.RenameColumn(
                name: "CreatedDateTime",
                table: "CourseEmployees",
                newName: "CreatedOn");

            migrationBuilder.RenameColumn(
                name: "ModifiedDateTime",
                table: "CompaniesAssignedToUsers",
                newName: "ModifiedOn");

            migrationBuilder.RenameColumn(
                name: "CreatedDateTime",
                table: "CompaniesAssignedToUsers",
                newName: "CreatedOn");

            migrationBuilder.RenameColumn(
                name: "ModifiedDateTime",
                table: "ClassRooms",
                newName: "ModifiedOn");

            migrationBuilder.RenameColumn(
                name: "CreatedDateTime",
                table: "ClassRooms",
                newName: "CreatedOn");

            migrationBuilder.RenameColumn(
                name: "ModifiedDateTime",
                table: "BatchHistories",
                newName: "ModifiedOn");

            migrationBuilder.RenameColumn(
                name: "CreatedDateTime",
                table: "BatchHistories",
                newName: "CreatedOn");

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "Users",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "Users",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "Users",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "Users",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Users",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "Users",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "UserImages",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "UserImages",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "UserImages",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "UserImages",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "UserImages",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "UserImages",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "Taxes",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "Taxes",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DataAreaId",
                table: "Taxes",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "Taxes",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "Taxes",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Taxes",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "Taxes",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "TaxDetails",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "TaxDetails",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DataAreaId",
                table: "TaxDetails",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "TaxDetails",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "TaxDetails",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "TaxDetails",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "TaxDetails",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "ReportsConfig",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "ReportsConfig",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DataAreaId",
                table: "ReportsConfig",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "ReportsConfig",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "ReportsConfig",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "ReportsConfig",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "ReportsConfig",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "Provinces",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedOn",
                table: "Provinces",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "Provinces",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "Provinces",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Provinces",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "ModifiedBy",
                table: "Provinces",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ModifiedOn",
                table: "Provinces",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "Provinces",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "Projects",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "Projects",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DataAreaId",
                table: "Projects",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "Projects",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "Projects",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Projects",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "Projects",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "ProjCategories",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "ProjCategories",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DataAreaId",
                table: "ProjCategories",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "ProjCategories",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "ProjCategories",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "ProjCategories",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "ProjCategories",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "Positions",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "Positions",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DataAreaId",
                table: "Positions",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "Positions",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "Positions",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Positions",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "Positions",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "PositionRequirements",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "PositionRequirements",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DataAreaId",
                table: "PositionRequirements",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "PositionRequirements",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "PositionRequirements",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "PositionRequirements",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "PositionRequirements",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "PayrollsProcess",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "PayrollsProcess",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DataAreaId",
                table: "PayrollsProcess",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "PayrollsProcess",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "PayrollsProcess",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "PayrollsProcess",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "PayrollsProcess",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "Payrolls",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "Payrolls",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DataAreaId",
                table: "Payrolls",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "Payrolls",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "Payrolls",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Payrolls",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "Payrolls",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "PayrollProcessDetails",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "PayrollProcessDetails",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DataAreaId",
                table: "PayrollProcessDetails",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "PayrollProcessDetails",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "PayrollProcessDetails",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "PayrollProcessDetails",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "PayrollProcessDetails",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "PayrollProcessActions",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "PayrollProcessActions",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DataAreaId",
                table: "PayrollProcessActions",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "PayrollProcessActions",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "PayrollProcessActions",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "PayrollProcessActions",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "PayrollProcessActions",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "PayCycles",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "PayCycles",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DataAreaId",
                table: "PayCycles",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "PayCycles",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "PayCycles",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "PayCycles",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "PayCycles",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "Occupations",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedOn",
                table: "Occupations",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "Occupations",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "Occupations",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Occupations",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "ModifiedBy",
                table: "Occupations",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ModifiedOn",
                table: "Occupations",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "Occupations",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "MenusApp",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedOn",
                table: "MenusApp",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "MenusApp",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "MenusApp",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "MenusApp",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "ModifiedBy",
                table: "MenusApp",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ModifiedOn",
                table: "MenusApp",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "MenusApp",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "MenuAssignedToUsers",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "MenuAssignedToUsers",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "MenuAssignedToUsers",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "MenuAssignedToUsers",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "MenuAssignedToUsers",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "MenuAssignedToUsers",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "Loans",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "Loans",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DataAreaId",
                table: "Loans",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "Loans",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "Loans",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Loans",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "Loans",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "Jobs",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "Jobs",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DataAreaId",
                table: "Jobs",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "Jobs",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "Jobs",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Jobs",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "Jobs",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "Instructors",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "Instructors",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DataAreaId",
                table: "Instructors",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "Instructors",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "Instructors",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Instructors",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "Instructors",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "GeneralConfigs",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedOn",
                table: "GeneralConfigs",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "DataAreaId",
                table: "GeneralConfigs",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "GeneralConfigs",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "GeneralConfigs",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "GeneralConfigs",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "ModifiedBy",
                table: "GeneralConfigs",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ModifiedOn",
                table: "GeneralConfigs",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "GeneralConfigs",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "FormatCodes",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedOn",
                table: "FormatCodes",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "FormatCodes",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "FormatCodes",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "FormatCodes",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "ModifiedBy",
                table: "FormatCodes",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ModifiedOn",
                table: "FormatCodes",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "FormatCodes",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "EmployeeWorkControlCalendars",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "EmployeeWorkControlCalendars",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DataAreaId",
                table: "EmployeeWorkControlCalendars",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "EmployeeWorkControlCalendars",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "EmployeeWorkControlCalendars",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "EmployeeWorkControlCalendars",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "EmployeeWorkControlCalendars",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "EmployeeWorkCalendars",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "EmployeeWorkCalendars",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DataAreaId",
                table: "EmployeeWorkCalendars",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "EmployeeWorkCalendars",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "EmployeeWorkCalendars",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "EmployeeWorkCalendars",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "EmployeeWorkCalendars",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "EmployeeTaxes",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "EmployeeTaxes",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DataAreaId",
                table: "EmployeeTaxes",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "EmployeeTaxes",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "EmployeeTaxes",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "EmployeeTaxes",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "EmployeeTaxes",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "EmployeesAddress",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "EmployeesAddress",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DataAreaId",
                table: "EmployeesAddress",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "EmployeesAddress",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "EmployeesAddress",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "EmployeesAddress",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "EmployeesAddress",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "Employees",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "Employees",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DataAreaId",
                table: "Employees",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "Employees",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "Employees",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Employees",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "Employees",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "EmployeePositions",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "EmployeePositions",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DataAreaId",
                table: "EmployeePositions",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "EmployeePositions",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "EmployeePositions",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "EmployeePositions",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "EmployeePositions",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "EmployeeLoans",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "EmployeeLoans",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DataAreaId",
                table: "EmployeeLoans",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "EmployeeLoans",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "EmployeeLoans",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "EmployeeLoans",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "EmployeeLoans",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "EmployeeLoanHistories",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "EmployeeLoanHistories",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DataAreaId",
                table: "EmployeeLoanHistories",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "EmployeeLoanHistories",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "EmployeeLoanHistories",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "EmployeeLoanHistories",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "EmployeeLoanHistories",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "EmployeeImages",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "EmployeeImages",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DataAreaId",
                table: "EmployeeImages",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "EmployeeImages",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "EmployeeImages",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "EmployeeImages",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "EmployeeImages",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "EmployeeHistories",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedOn",
                table: "EmployeeHistories",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "DataAreaId",
                table: "EmployeeHistories",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "EmployeeHistories",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "EmployeeHistories",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "EmployeeHistories",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "ModifiedBy",
                table: "EmployeeHistories",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ModifiedOn",
                table: "EmployeeHistories",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "EmployeeHistories",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "EmployeeExtraHours",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "EmployeeExtraHours",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DataAreaId",
                table: "EmployeeExtraHours",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "EmployeeExtraHours",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "EmployeeExtraHours",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "EmployeeExtraHours",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "EmployeeExtraHours",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "EmployeeEarningCodes",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "EmployeeEarningCodes",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DataAreaId",
                table: "EmployeeEarningCodes",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "EmployeeEarningCodes",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "EmployeeEarningCodes",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "EmployeeEarningCodes",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "EmployeeEarningCodes",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "EmployeeDocuments",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "EmployeeDocuments",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DataAreaId",
                table: "EmployeeDocuments",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "EmployeeDocuments",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "EmployeeDocuments",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "EmployeeDocuments",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "EmployeeDocuments",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "EmployeeDepartments",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "EmployeeDepartments",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DataAreaId",
                table: "EmployeeDepartments",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "EmployeeDepartments",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "EmployeeDepartments",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "EmployeeDepartments",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "EmployeeDepartments",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "EmployeeDeductionCodes",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "EmployeeDeductionCodes",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DataAreaId",
                table: "EmployeeDeductionCodes",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "EmployeeDeductionCodes",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "EmployeeDeductionCodes",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "EmployeeDeductionCodes",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "EmployeeDeductionCodes",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "EmployeeContactsInf",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "EmployeeContactsInf",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DataAreaId",
                table: "EmployeeContactsInf",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "EmployeeContactsInf",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "EmployeeContactsInf",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "EmployeeContactsInf",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "EmployeeContactsInf",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "EmployeeBankAccounts",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "EmployeeBankAccounts",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DataAreaId",
                table: "EmployeeBankAccounts",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "EmployeeBankAccounts",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "EmployeeBankAccounts",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "EmployeeBankAccounts",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "EmployeeBankAccounts",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "EducationLevels",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedOn",
                table: "EducationLevels",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "EducationLevels",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "EducationLevels",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "EducationLevels",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "ModifiedBy",
                table: "EducationLevels",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ModifiedOn",
                table: "EducationLevels",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "EducationLevels",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "EarningCodeVersions",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "EarningCodeVersions",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DataAreaId",
                table: "EarningCodeVersions",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "EarningCodeVersions",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "EarningCodeVersions",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "EarningCodeVersions",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "EarningCodeVersions",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "EarningCodes",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "EarningCodes",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DataAreaId",
                table: "EarningCodes",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "EarningCodes",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "EarningCodes",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "EarningCodes",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "EarningCodes",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "DisabilityTypes",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedOn",
                table: "DisabilityTypes",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "DisabilityTypes",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "DisabilityTypes",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "DisabilityTypes",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "ModifiedBy",
                table: "DisabilityTypes",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ModifiedOn",
                table: "DisabilityTypes",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "DisabilityTypes",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "Departments",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "Departments",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DataAreaId",
                table: "Departments",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "Departments",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "Departments",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Departments",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "Departments",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "DeductionCodeVersions",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "DeductionCodeVersions",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DataAreaId",
                table: "DeductionCodeVersions",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "DeductionCodeVersions",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "DeductionCodeVersions",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "DeductionCodeVersions",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "DeductionCodeVersions",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "DeductionCodes",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "DeductionCodes",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DataAreaId",
                table: "DeductionCodes",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "DeductionCodes",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "DeductionCodes",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "DeductionCodes",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "DeductionCodes",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "Currencies",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedOn",
                table: "Currencies",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "Currencies",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "Currencies",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Currencies",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "ModifiedBy",
                table: "Currencies",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ModifiedOn",
                table: "Currencies",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "Currencies",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "CourseTypes",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "CourseTypes",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DataAreaId",
                table: "CourseTypes",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "CourseTypes",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "CourseTypes",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "CourseTypes",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "CourseTypes",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "Courses",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "Courses",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DataAreaId",
                table: "Courses",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "Courses",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "Courses",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Courses",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "Courses",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "CoursePositions",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "CoursePositions",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DataAreaId",
                table: "CoursePositions",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "CoursePositions",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "CoursePositions",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "CoursePositions",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "CoursePositions",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "CourseLocations",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "CourseLocations",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DataAreaId",
                table: "CourseLocations",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "CourseLocations",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "CourseLocations",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "CourseLocations",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "CourseLocations",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "CourseInstructors",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "CourseInstructors",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DataAreaId",
                table: "CourseInstructors",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "CourseInstructors",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "CourseInstructors",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "CourseInstructors",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "CourseInstructors",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "CourseEmployees",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "CourseEmployees",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DataAreaId",
                table: "CourseEmployees",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "CourseEmployees",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "CourseEmployees",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "CourseEmployees",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "CourseEmployees",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "Countries",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedOn",
                table: "Countries",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "Countries",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "Countries",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Countries",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "ModifiedBy",
                table: "Countries",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ModifiedOn",
                table: "Countries",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "Countries",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "CompaniesAssignedToUsers",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "CompaniesAssignedToUsers",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "CompaniesAssignedToUsers",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "CompaniesAssignedToUsers",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "CompaniesAssignedToUsers",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "CompaniesAssignedToUsers",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "Companies",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedOn",
                table: "Companies",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "Companies",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "Companies",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Companies",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "ModifiedBy",
                table: "Companies",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ModifiedOn",
                table: "Companies",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "Companies",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "ClassRooms",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "ClassRooms",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DataAreaId",
                table: "ClassRooms",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "ClassRooms",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "ClassRooms",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "ClassRooms",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "ClassRooms",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "CalendarHolidays",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedOn",
                table: "CalendarHolidays",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "CalendarHolidays",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "CalendarHolidays",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "CalendarHolidays",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "ModifiedBy",
                table: "CalendarHolidays",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ModifiedOn",
                table: "CalendarHolidays",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "CalendarHolidays",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "BatchHistories",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "BatchHistories",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DataAreaId",
                table: "BatchHistories",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "BatchHistories",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "BatchHistories",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "BatchHistories",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "RecId",
                table: "BatchHistories",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Taxes",
                table: "Taxes",
                columns: new[] { "TaxId", "DataAreaId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_TaxDetails",
                table: "TaxDetails",
                columns: new[] { "InternalId", "TaxId", "DataAreaId" });

            migrationBuilder.CreateTable(
                name: "AuditLogs",
                columns: table => new
                {
                    RecId = table.Column<long>(type: "bigint", nullable: false, defaultValueSql: "NEXT VALUE FOR dbo.RecId"),
                    EntityName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    FieldName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    OldValue = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NewValue = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ChangedBy = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    ChangedAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETDATE()"),
                    EntityRefRecId = table.Column<long>(type: "bigint", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedBy = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    ModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeletedBy = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DataAreaId = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuditLogs", x => x.RecId);
                });

            migrationBuilder.UpdateData(
                table: "Companies",
                keyColumn: "CompanyId",
                keyValue: "Root",
                columns: new[] { "CreatedBy", "CreatedOn", "DeletedBy", "DeletedOn", "IsDeleted", "ModifiedBy", "ModifiedOn", "RecId" },
                values: new object[] { null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, null, false, null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 0L });

            migrationBuilder.UpdateData(
                table: "Countries",
                keyColumn: "CountryId",
                keyValue: "CH",
                columns: new[] { "CreatedBy", "CreatedOn", "DeletedBy", "DeletedOn", "IsDeleted", "ModifiedBy", "ModifiedOn", "RecId" },
                values: new object[] { null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, null, false, null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 0L });

            migrationBuilder.UpdateData(
                table: "Countries",
                keyColumn: "CountryId",
                keyValue: "DOM",
                columns: new[] { "CreatedBy", "CreatedOn", "DeletedBy", "DeletedOn", "IsDeleted", "ModifiedBy", "ModifiedOn", "RecId" },
                values: new object[] { null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, null, false, null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 0L });

            migrationBuilder.UpdateData(
                table: "Currencies",
                keyColumn: "CurrencyId",
                keyValue: "DOP",
                columns: new[] { "CreatedBy", "CreatedOn", "DeletedBy", "DeletedOn", "IsDeleted", "ModifiedBy", "ModifiedOn", "RecId" },
                values: new object[] { null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, null, false, null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 0L });

            migrationBuilder.UpdateData(
                table: "Currencies",
                keyColumn: "CurrencyId",
                keyValue: "USD",
                columns: new[] { "CreatedBy", "CreatedOn", "DeletedBy", "DeletedOn", "IsDeleted", "ModifiedBy", "ModifiedOn", "RecId" },
                values: new object[] { null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, null, false, null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 0L });

            migrationBuilder.UpdateData(
                table: "FormatCodes",
                keyColumn: "FormatCodeId",
                keyValue: "en-US",
                columns: new[] { "CreatedBy", "CreatedOn", "DeletedBy", "DeletedOn", "IsDeleted", "ModifiedBy", "ModifiedOn", "RecId" },
                values: new object[] { null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, null, false, null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 0L });

            migrationBuilder.UpdateData(
                table: "FormatCodes",
                keyColumn: "FormatCodeId",
                keyValue: "es-ES",
                columns: new[] { "CreatedBy", "CreatedOn", "DeletedBy", "DeletedOn", "IsDeleted", "ModifiedBy", "ModifiedOn", "RecId" },
                values: new object[] { null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, null, false, null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 0L });

            migrationBuilder.UpdateData(
                table: "MenusApp",
                keyColumn: "MenuId",
                keyValue: "MENU-0002",
                columns: new[] { "CreatedBy", "CreatedOn", "DeletedBy", "DeletedOn", "IsDeleted", "ModifiedBy", "ModifiedOn", "RecId" },
                values: new object[] { null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, null, false, null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 0L });

            migrationBuilder.UpdateData(
                table: "MenusApp",
                keyColumn: "MenuId",
                keyValue: "MENU-0057",
                columns: new[] { "CreatedBy", "CreatedOn", "DeletedBy", "DeletedOn", "IsDeleted", "ModifiedBy", "ModifiedOn", "RecId" },
                values: new object[] { null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, null, false, null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 0L });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Alias",
                keyValue: "Admin",
                columns: new[] { "DeletedBy", "DeletedOn", "IsDeleted", "RecId" },
                values: new object[] { null, null, false, 0L });

            migrationBuilder.CreateIndex(
                name: "IX_TaxDetails_TaxId_DataAreaId",
                table: "TaxDetails",
                columns: new[] { "TaxId", "DataAreaId" });

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeTaxes_TaxId_DataAreaId",
                table: "EmployeeTaxes",
                columns: new[] { "TaxId", "DataAreaId" });

            migrationBuilder.CreateIndex(
                name: "IX_AuditLog_ChangedAt",
                table: "AuditLogs",
                column: "ChangedAt");

            migrationBuilder.CreateIndex(
                name: "IX_AuditLog_ChangedBy",
                table: "AuditLogs",
                column: "ChangedBy");

            migrationBuilder.CreateIndex(
                name: "IX_AuditLog_DataAreaId",
                table: "AuditLogs",
                column: "DataAreaId");

            migrationBuilder.CreateIndex(
                name: "IX_AuditLog_EntityName_EntityRefRecId",
                table: "AuditLogs",
                columns: new[] { "EntityName", "EntityRefRecId" });

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeeTaxes_Taxes_TaxId_DataAreaId",
                table: "EmployeeTaxes",
                columns: new[] { "TaxId", "DataAreaId" },
                principalTable: "Taxes",
                principalColumns: new[] { "TaxId", "DataAreaId" },
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TaxDetails_Taxes_TaxId_DataAreaId",
                table: "TaxDetails",
                columns: new[] { "TaxId", "DataAreaId" },
                principalTable: "Taxes",
                principalColumns: new[] { "TaxId", "DataAreaId" },
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmployeeTaxes_Taxes_TaxId_DataAreaId",
                table: "EmployeeTaxes");

            migrationBuilder.DropForeignKey(
                name: "FK_TaxDetails_Taxes_TaxId_DataAreaId",
                table: "TaxDetails");

            migrationBuilder.DropTable(
                name: "AuditLogs");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Taxes",
                table: "Taxes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TaxDetails",
                table: "TaxDetails");

            migrationBuilder.DropIndex(
                name: "IX_TaxDetails_TaxId_DataAreaId",
                table: "TaxDetails");

            migrationBuilder.DropIndex(
                name: "IX_EmployeeTaxes_TaxId_DataAreaId",
                table: "EmployeeTaxes");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "UserImages");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "UserImages");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "UserImages");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "UserImages");

            migrationBuilder.DropColumn(
                name: "DataAreaId",
                table: "Taxes");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "Taxes");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "Taxes");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Taxes");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "Taxes");

            migrationBuilder.DropColumn(
                name: "DataAreaId",
                table: "TaxDetails");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "TaxDetails");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "TaxDetails");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "TaxDetails");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "TaxDetails");

            migrationBuilder.DropColumn(
                name: "DataAreaId",
                table: "ReportsConfig");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "ReportsConfig");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "ReportsConfig");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "ReportsConfig");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "ReportsConfig");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "Provinces");

            migrationBuilder.DropColumn(
                name: "CreatedOn",
                table: "Provinces");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "Provinces");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "Provinces");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Provinces");

            migrationBuilder.DropColumn(
                name: "ModifiedBy",
                table: "Provinces");

            migrationBuilder.DropColumn(
                name: "ModifiedOn",
                table: "Provinces");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "Provinces");

            migrationBuilder.DropColumn(
                name: "DataAreaId",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "DataAreaId",
                table: "ProjCategories");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "ProjCategories");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "ProjCategories");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "ProjCategories");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "ProjCategories");

            migrationBuilder.DropColumn(
                name: "DataAreaId",
                table: "Positions");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "Positions");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "Positions");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Positions");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "Positions");

            migrationBuilder.DropColumn(
                name: "DataAreaId",
                table: "PositionRequirements");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "PositionRequirements");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "PositionRequirements");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "PositionRequirements");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "PositionRequirements");

            migrationBuilder.DropColumn(
                name: "DataAreaId",
                table: "PayrollsProcess");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "PayrollsProcess");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "PayrollsProcess");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "PayrollsProcess");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "PayrollsProcess");

            migrationBuilder.DropColumn(
                name: "DataAreaId",
                table: "Payrolls");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "Payrolls");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "Payrolls");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Payrolls");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "Payrolls");

            migrationBuilder.DropColumn(
                name: "DataAreaId",
                table: "PayrollProcessDetails");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "PayrollProcessDetails");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "PayrollProcessDetails");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "PayrollProcessDetails");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "PayrollProcessDetails");

            migrationBuilder.DropColumn(
                name: "DataAreaId",
                table: "PayrollProcessActions");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "PayrollProcessActions");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "PayrollProcessActions");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "PayrollProcessActions");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "PayrollProcessActions");

            migrationBuilder.DropColumn(
                name: "DataAreaId",
                table: "PayCycles");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "PayCycles");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "PayCycles");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "PayCycles");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "PayCycles");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "Occupations");

            migrationBuilder.DropColumn(
                name: "CreatedOn",
                table: "Occupations");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "Occupations");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "Occupations");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Occupations");

            migrationBuilder.DropColumn(
                name: "ModifiedBy",
                table: "Occupations");

            migrationBuilder.DropColumn(
                name: "ModifiedOn",
                table: "Occupations");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "Occupations");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "MenusApp");

            migrationBuilder.DropColumn(
                name: "CreatedOn",
                table: "MenusApp");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "MenusApp");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "MenusApp");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "MenusApp");

            migrationBuilder.DropColumn(
                name: "ModifiedBy",
                table: "MenusApp");

            migrationBuilder.DropColumn(
                name: "ModifiedOn",
                table: "MenusApp");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "MenusApp");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "MenuAssignedToUsers");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "MenuAssignedToUsers");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "MenuAssignedToUsers");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "MenuAssignedToUsers");

            migrationBuilder.DropColumn(
                name: "DataAreaId",
                table: "Loans");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "Loans");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "Loans");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Loans");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "Loans");

            migrationBuilder.DropColumn(
                name: "DataAreaId",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "DataAreaId",
                table: "Instructors");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "Instructors");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "Instructors");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Instructors");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "Instructors");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "GeneralConfigs");

            migrationBuilder.DropColumn(
                name: "CreatedOn",
                table: "GeneralConfigs");

            migrationBuilder.DropColumn(
                name: "DataAreaId",
                table: "GeneralConfigs");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "GeneralConfigs");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "GeneralConfigs");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "GeneralConfigs");

            migrationBuilder.DropColumn(
                name: "ModifiedBy",
                table: "GeneralConfigs");

            migrationBuilder.DropColumn(
                name: "ModifiedOn",
                table: "GeneralConfigs");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "GeneralConfigs");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "FormatCodes");

            migrationBuilder.DropColumn(
                name: "CreatedOn",
                table: "FormatCodes");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "FormatCodes");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "FormatCodes");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "FormatCodes");

            migrationBuilder.DropColumn(
                name: "ModifiedBy",
                table: "FormatCodes");

            migrationBuilder.DropColumn(
                name: "ModifiedOn",
                table: "FormatCodes");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "FormatCodes");

            migrationBuilder.DropColumn(
                name: "DataAreaId",
                table: "EmployeeWorkControlCalendars");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "EmployeeWorkControlCalendars");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "EmployeeWorkControlCalendars");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "EmployeeWorkControlCalendars");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "EmployeeWorkControlCalendars");

            migrationBuilder.DropColumn(
                name: "DataAreaId",
                table: "EmployeeWorkCalendars");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "EmployeeWorkCalendars");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "EmployeeWorkCalendars");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "EmployeeWorkCalendars");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "EmployeeWorkCalendars");

            migrationBuilder.DropColumn(
                name: "DataAreaId",
                table: "EmployeeTaxes");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "EmployeeTaxes");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "EmployeeTaxes");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "EmployeeTaxes");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "EmployeeTaxes");

            migrationBuilder.DropColumn(
                name: "DataAreaId",
                table: "EmployeesAddress");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "EmployeesAddress");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "EmployeesAddress");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "EmployeesAddress");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "EmployeesAddress");

            migrationBuilder.DropColumn(
                name: "DataAreaId",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "DataAreaId",
                table: "EmployeePositions");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "EmployeePositions");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "EmployeePositions");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "EmployeePositions");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "EmployeePositions");

            migrationBuilder.DropColumn(
                name: "DataAreaId",
                table: "EmployeeLoans");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "EmployeeLoans");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "EmployeeLoans");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "EmployeeLoans");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "EmployeeLoans");

            migrationBuilder.DropColumn(
                name: "DataAreaId",
                table: "EmployeeLoanHistories");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "EmployeeLoanHistories");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "EmployeeLoanHistories");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "EmployeeLoanHistories");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "EmployeeLoanHistories");

            migrationBuilder.DropColumn(
                name: "DataAreaId",
                table: "EmployeeImages");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "EmployeeImages");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "EmployeeImages");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "EmployeeImages");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "EmployeeImages");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "EmployeeHistories");

            migrationBuilder.DropColumn(
                name: "CreatedOn",
                table: "EmployeeHistories");

            migrationBuilder.DropColumn(
                name: "DataAreaId",
                table: "EmployeeHistories");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "EmployeeHistories");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "EmployeeHistories");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "EmployeeHistories");

            migrationBuilder.DropColumn(
                name: "ModifiedBy",
                table: "EmployeeHistories");

            migrationBuilder.DropColumn(
                name: "ModifiedOn",
                table: "EmployeeHistories");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "EmployeeHistories");

            migrationBuilder.DropColumn(
                name: "DataAreaId",
                table: "EmployeeExtraHours");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "EmployeeExtraHours");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "EmployeeExtraHours");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "EmployeeExtraHours");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "EmployeeExtraHours");

            migrationBuilder.DropColumn(
                name: "DataAreaId",
                table: "EmployeeEarningCodes");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "EmployeeEarningCodes");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "EmployeeEarningCodes");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "EmployeeEarningCodes");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "EmployeeEarningCodes");

            migrationBuilder.DropColumn(
                name: "DataAreaId",
                table: "EmployeeDocuments");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "EmployeeDocuments");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "EmployeeDocuments");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "EmployeeDocuments");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "EmployeeDocuments");

            migrationBuilder.DropColumn(
                name: "DataAreaId",
                table: "EmployeeDepartments");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "EmployeeDepartments");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "EmployeeDepartments");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "EmployeeDepartments");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "EmployeeDepartments");

            migrationBuilder.DropColumn(
                name: "DataAreaId",
                table: "EmployeeDeductionCodes");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "EmployeeDeductionCodes");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "EmployeeDeductionCodes");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "EmployeeDeductionCodes");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "EmployeeDeductionCodes");

            migrationBuilder.DropColumn(
                name: "DataAreaId",
                table: "EmployeeContactsInf");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "EmployeeContactsInf");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "EmployeeContactsInf");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "EmployeeContactsInf");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "EmployeeContactsInf");

            migrationBuilder.DropColumn(
                name: "DataAreaId",
                table: "EmployeeBankAccounts");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "EmployeeBankAccounts");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "EmployeeBankAccounts");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "EmployeeBankAccounts");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "EmployeeBankAccounts");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "EducationLevels");

            migrationBuilder.DropColumn(
                name: "CreatedOn",
                table: "EducationLevels");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "EducationLevels");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "EducationLevels");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "EducationLevels");

            migrationBuilder.DropColumn(
                name: "ModifiedBy",
                table: "EducationLevels");

            migrationBuilder.DropColumn(
                name: "ModifiedOn",
                table: "EducationLevels");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "EducationLevels");

            migrationBuilder.DropColumn(
                name: "DataAreaId",
                table: "EarningCodeVersions");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "EarningCodeVersions");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "EarningCodeVersions");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "EarningCodeVersions");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "EarningCodeVersions");

            migrationBuilder.DropColumn(
                name: "DataAreaId",
                table: "EarningCodes");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "EarningCodes");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "EarningCodes");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "EarningCodes");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "EarningCodes");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "DisabilityTypes");

            migrationBuilder.DropColumn(
                name: "CreatedOn",
                table: "DisabilityTypes");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "DisabilityTypes");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "DisabilityTypes");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "DisabilityTypes");

            migrationBuilder.DropColumn(
                name: "ModifiedBy",
                table: "DisabilityTypes");

            migrationBuilder.DropColumn(
                name: "ModifiedOn",
                table: "DisabilityTypes");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "DisabilityTypes");

            migrationBuilder.DropColumn(
                name: "DataAreaId",
                table: "Departments");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "Departments");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "Departments");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Departments");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "Departments");

            migrationBuilder.DropColumn(
                name: "DataAreaId",
                table: "DeductionCodeVersions");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "DeductionCodeVersions");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "DeductionCodeVersions");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "DeductionCodeVersions");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "DeductionCodeVersions");

            migrationBuilder.DropColumn(
                name: "DataAreaId",
                table: "DeductionCodes");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "DeductionCodes");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "DeductionCodes");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "DeductionCodes");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "DeductionCodes");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "Currencies");

            migrationBuilder.DropColumn(
                name: "CreatedOn",
                table: "Currencies");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "Currencies");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "Currencies");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Currencies");

            migrationBuilder.DropColumn(
                name: "ModifiedBy",
                table: "Currencies");

            migrationBuilder.DropColumn(
                name: "ModifiedOn",
                table: "Currencies");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "Currencies");

            migrationBuilder.DropColumn(
                name: "DataAreaId",
                table: "CourseTypes");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "CourseTypes");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "CourseTypes");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "CourseTypes");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "CourseTypes");

            migrationBuilder.DropColumn(
                name: "DataAreaId",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "DataAreaId",
                table: "CoursePositions");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "CoursePositions");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "CoursePositions");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "CoursePositions");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "CoursePositions");

            migrationBuilder.DropColumn(
                name: "DataAreaId",
                table: "CourseLocations");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "CourseLocations");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "CourseLocations");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "CourseLocations");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "CourseLocations");

            migrationBuilder.DropColumn(
                name: "DataAreaId",
                table: "CourseInstructors");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "CourseInstructors");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "CourseInstructors");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "CourseInstructors");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "CourseInstructors");

            migrationBuilder.DropColumn(
                name: "DataAreaId",
                table: "CourseEmployees");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "CourseEmployees");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "CourseEmployees");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "CourseEmployees");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "CourseEmployees");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "Countries");

            migrationBuilder.DropColumn(
                name: "CreatedOn",
                table: "Countries");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "Countries");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "Countries");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Countries");

            migrationBuilder.DropColumn(
                name: "ModifiedBy",
                table: "Countries");

            migrationBuilder.DropColumn(
                name: "ModifiedOn",
                table: "Countries");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "Countries");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "CompaniesAssignedToUsers");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "CompaniesAssignedToUsers");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "CompaniesAssignedToUsers");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "CompaniesAssignedToUsers");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "Companies");

            migrationBuilder.DropColumn(
                name: "CreatedOn",
                table: "Companies");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "Companies");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "Companies");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Companies");

            migrationBuilder.DropColumn(
                name: "ModifiedBy",
                table: "Companies");

            migrationBuilder.DropColumn(
                name: "ModifiedOn",
                table: "Companies");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "Companies");

            migrationBuilder.DropColumn(
                name: "DataAreaId",
                table: "ClassRooms");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "ClassRooms");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "ClassRooms");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "ClassRooms");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "ClassRooms");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "CalendarHolidays");

            migrationBuilder.DropColumn(
                name: "CreatedOn",
                table: "CalendarHolidays");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "CalendarHolidays");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "CalendarHolidays");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "CalendarHolidays");

            migrationBuilder.DropColumn(
                name: "ModifiedBy",
                table: "CalendarHolidays");

            migrationBuilder.DropColumn(
                name: "ModifiedOn",
                table: "CalendarHolidays");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "CalendarHolidays");

            migrationBuilder.DropColumn(
                name: "DataAreaId",
                table: "BatchHistories");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "BatchHistories");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "BatchHistories");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "BatchHistories");

            migrationBuilder.DropColumn(
                name: "RecId",
                table: "BatchHistories");

            migrationBuilder.RenameColumn(
                name: "ModifiedOn",
                table: "Users",
                newName: "ModifiedDateTime");

            migrationBuilder.RenameColumn(
                name: "CreatedOn",
                table: "Users",
                newName: "CreatedDateTime");

            migrationBuilder.RenameColumn(
                name: "ModifiedOn",
                table: "UserImages",
                newName: "ModifiedDateTime");

            migrationBuilder.RenameColumn(
                name: "CreatedOn",
                table: "UserImages",
                newName: "CreatedDateTime");

            migrationBuilder.RenameColumn(
                name: "ModifiedOn",
                table: "Taxes",
                newName: "ModifiedDateTime");

            migrationBuilder.RenameColumn(
                name: "CreatedOn",
                table: "Taxes",
                newName: "CreatedDateTime");

            migrationBuilder.RenameColumn(
                name: "ModifiedOn",
                table: "TaxDetails",
                newName: "ModifiedDateTime");

            migrationBuilder.RenameColumn(
                name: "CreatedOn",
                table: "TaxDetails",
                newName: "CreatedDateTime");

            migrationBuilder.RenameColumn(
                name: "ModifiedOn",
                table: "ReportsConfig",
                newName: "ModifiedDateTime");

            migrationBuilder.RenameColumn(
                name: "CreatedOn",
                table: "ReportsConfig",
                newName: "CreatedDateTime");

            migrationBuilder.RenameColumn(
                name: "ModifiedOn",
                table: "Projects",
                newName: "ModifiedDateTime");

            migrationBuilder.RenameColumn(
                name: "CreatedOn",
                table: "Projects",
                newName: "CreatedDateTime");

            migrationBuilder.RenameColumn(
                name: "ModifiedOn",
                table: "ProjCategories",
                newName: "ModifiedDateTime");

            migrationBuilder.RenameColumn(
                name: "CreatedOn",
                table: "ProjCategories",
                newName: "CreatedDateTime");

            migrationBuilder.RenameColumn(
                name: "ModifiedOn",
                table: "Positions",
                newName: "ModifiedDateTime");

            migrationBuilder.RenameColumn(
                name: "CreatedOn",
                table: "Positions",
                newName: "CreatedDateTime");

            migrationBuilder.RenameColumn(
                name: "ModifiedOn",
                table: "PositionRequirements",
                newName: "ModifiedDateTime");

            migrationBuilder.RenameColumn(
                name: "CreatedOn",
                table: "PositionRequirements",
                newName: "CreatedDateTime");

            migrationBuilder.RenameColumn(
                name: "ModifiedOn",
                table: "PayrollsProcess",
                newName: "ModifiedDateTime");

            migrationBuilder.RenameColumn(
                name: "CreatedOn",
                table: "PayrollsProcess",
                newName: "CreatedDateTime");

            migrationBuilder.RenameColumn(
                name: "ModifiedOn",
                table: "Payrolls",
                newName: "ModifiedDateTime");

            migrationBuilder.RenameColumn(
                name: "CreatedOn",
                table: "Payrolls",
                newName: "CreatedDateTime");

            migrationBuilder.RenameColumn(
                name: "ModifiedOn",
                table: "PayrollProcessDetails",
                newName: "ModifiedDateTime");

            migrationBuilder.RenameColumn(
                name: "CreatedOn",
                table: "PayrollProcessDetails",
                newName: "CreatedDateTime");

            migrationBuilder.RenameColumn(
                name: "ModifiedOn",
                table: "PayrollProcessActions",
                newName: "ModifiedDateTime");

            migrationBuilder.RenameColumn(
                name: "CreatedOn",
                table: "PayrollProcessActions",
                newName: "CreatedDateTime");

            migrationBuilder.RenameColumn(
                name: "ModifiedOn",
                table: "PayCycles",
                newName: "ModifiedDateTime");

            migrationBuilder.RenameColumn(
                name: "CreatedOn",
                table: "PayCycles",
                newName: "CreatedDateTime");

            migrationBuilder.RenameColumn(
                name: "ModifiedOn",
                table: "MenuAssignedToUsers",
                newName: "ModifiedDateTime");

            migrationBuilder.RenameColumn(
                name: "CreatedOn",
                table: "MenuAssignedToUsers",
                newName: "CreatedDateTime");

            migrationBuilder.RenameColumn(
                name: "ModifiedOn",
                table: "Loans",
                newName: "ModifiedDateTime");

            migrationBuilder.RenameColumn(
                name: "CreatedOn",
                table: "Loans",
                newName: "CreatedDateTime");

            migrationBuilder.RenameColumn(
                name: "ModifiedOn",
                table: "Jobs",
                newName: "ModifiedDateTime");

            migrationBuilder.RenameColumn(
                name: "CreatedOn",
                table: "Jobs",
                newName: "CreatedDateTime");

            migrationBuilder.RenameColumn(
                name: "ModifiedOn",
                table: "Instructors",
                newName: "ModifiedDateTime");

            migrationBuilder.RenameColumn(
                name: "CreatedOn",
                table: "Instructors",
                newName: "CreatedDateTime");

            migrationBuilder.RenameColumn(
                name: "ModifiedOn",
                table: "EmployeeWorkControlCalendars",
                newName: "ModifiedDateTime");

            migrationBuilder.RenameColumn(
                name: "CreatedOn",
                table: "EmployeeWorkControlCalendars",
                newName: "CreatedDateTime");

            migrationBuilder.RenameColumn(
                name: "ModifiedOn",
                table: "EmployeeWorkCalendars",
                newName: "ModifiedDateTime");

            migrationBuilder.RenameColumn(
                name: "CreatedOn",
                table: "EmployeeWorkCalendars",
                newName: "CreatedDateTime");

            migrationBuilder.RenameColumn(
                name: "ModifiedOn",
                table: "EmployeeTaxes",
                newName: "ModifiedDateTime");

            migrationBuilder.RenameColumn(
                name: "CreatedOn",
                table: "EmployeeTaxes",
                newName: "CreatedDateTime");

            migrationBuilder.RenameColumn(
                name: "ModifiedOn",
                table: "EmployeesAddress",
                newName: "ModifiedDateTime");

            migrationBuilder.RenameColumn(
                name: "CreatedOn",
                table: "EmployeesAddress",
                newName: "CreatedDateTime");

            migrationBuilder.RenameColumn(
                name: "ModifiedOn",
                table: "Employees",
                newName: "ModifiedDateTime");

            migrationBuilder.RenameColumn(
                name: "CreatedOn",
                table: "Employees",
                newName: "CreatedDateTime");

            migrationBuilder.RenameColumn(
                name: "ModifiedOn",
                table: "EmployeePositions",
                newName: "ModifiedDateTime");

            migrationBuilder.RenameColumn(
                name: "CreatedOn",
                table: "EmployeePositions",
                newName: "CreatedDateTime");

            migrationBuilder.RenameColumn(
                name: "ModifiedOn",
                table: "EmployeeLoans",
                newName: "ModifiedDateTime");

            migrationBuilder.RenameColumn(
                name: "CreatedOn",
                table: "EmployeeLoans",
                newName: "CreatedDateTime");

            migrationBuilder.RenameColumn(
                name: "ModifiedOn",
                table: "EmployeeLoanHistories",
                newName: "ModifiedDateTime");

            migrationBuilder.RenameColumn(
                name: "CreatedOn",
                table: "EmployeeLoanHistories",
                newName: "CreatedDateTime");

            migrationBuilder.RenameColumn(
                name: "ModifiedOn",
                table: "EmployeeImages",
                newName: "ModifiedDateTime");

            migrationBuilder.RenameColumn(
                name: "CreatedOn",
                table: "EmployeeImages",
                newName: "CreatedDateTime");

            migrationBuilder.RenameColumn(
                name: "ModifiedOn",
                table: "EmployeeExtraHours",
                newName: "ModifiedDateTime");

            migrationBuilder.RenameColumn(
                name: "CreatedOn",
                table: "EmployeeExtraHours",
                newName: "CreatedDateTime");

            migrationBuilder.RenameColumn(
                name: "ModifiedOn",
                table: "EmployeeEarningCodes",
                newName: "ModifiedDateTime");

            migrationBuilder.RenameColumn(
                name: "CreatedOn",
                table: "EmployeeEarningCodes",
                newName: "CreatedDateTime");

            migrationBuilder.RenameColumn(
                name: "ModifiedOn",
                table: "EmployeeDocuments",
                newName: "ModifiedDateTime");

            migrationBuilder.RenameColumn(
                name: "CreatedOn",
                table: "EmployeeDocuments",
                newName: "CreatedDateTime");

            migrationBuilder.RenameColumn(
                name: "ModifiedOn",
                table: "EmployeeDepartments",
                newName: "ModifiedDateTime");

            migrationBuilder.RenameColumn(
                name: "CreatedOn",
                table: "EmployeeDepartments",
                newName: "CreatedDateTime");

            migrationBuilder.RenameColumn(
                name: "ModifiedOn",
                table: "EmployeeDeductionCodes",
                newName: "ModifiedDateTime");

            migrationBuilder.RenameColumn(
                name: "CreatedOn",
                table: "EmployeeDeductionCodes",
                newName: "CreatedDateTime");

            migrationBuilder.RenameColumn(
                name: "ModifiedOn",
                table: "EmployeeContactsInf",
                newName: "ModifiedDateTime");

            migrationBuilder.RenameColumn(
                name: "CreatedOn",
                table: "EmployeeContactsInf",
                newName: "CreatedDateTime");

            migrationBuilder.RenameColumn(
                name: "ModifiedOn",
                table: "EmployeeBankAccounts",
                newName: "ModifiedDateTime");

            migrationBuilder.RenameColumn(
                name: "CreatedOn",
                table: "EmployeeBankAccounts",
                newName: "CreatedDateTime");

            migrationBuilder.RenameColumn(
                name: "ModifiedOn",
                table: "EarningCodeVersions",
                newName: "ModifiedDateTime");

            migrationBuilder.RenameColumn(
                name: "CreatedOn",
                table: "EarningCodeVersions",
                newName: "CreatedDateTime");

            migrationBuilder.RenameColumn(
                name: "ModifiedOn",
                table: "EarningCodes",
                newName: "ModifiedDateTime");

            migrationBuilder.RenameColumn(
                name: "CreatedOn",
                table: "EarningCodes",
                newName: "CreatedDateTime");

            migrationBuilder.RenameColumn(
                name: "ModifiedOn",
                table: "Departments",
                newName: "ModifiedDateTime");

            migrationBuilder.RenameColumn(
                name: "CreatedOn",
                table: "Departments",
                newName: "CreatedDateTime");

            migrationBuilder.RenameColumn(
                name: "ModifiedOn",
                table: "DeductionCodeVersions",
                newName: "ModifiedDateTime");

            migrationBuilder.RenameColumn(
                name: "CreatedOn",
                table: "DeductionCodeVersions",
                newName: "CreatedDateTime");

            migrationBuilder.RenameColumn(
                name: "ModifiedOn",
                table: "DeductionCodes",
                newName: "ModifiedDateTime");

            migrationBuilder.RenameColumn(
                name: "CreatedOn",
                table: "DeductionCodes",
                newName: "CreatedDateTime");

            migrationBuilder.RenameColumn(
                name: "ModifiedOn",
                table: "CourseTypes",
                newName: "ModifiedDateTime");

            migrationBuilder.RenameColumn(
                name: "CreatedOn",
                table: "CourseTypes",
                newName: "CreatedDateTime");

            migrationBuilder.RenameColumn(
                name: "ModifiedOn",
                table: "Courses",
                newName: "ModifiedDateTime");

            migrationBuilder.RenameColumn(
                name: "CreatedOn",
                table: "Courses",
                newName: "CreatedDateTime");

            migrationBuilder.RenameColumn(
                name: "ModifiedOn",
                table: "CoursePositions",
                newName: "ModifiedDateTime");

            migrationBuilder.RenameColumn(
                name: "CreatedOn",
                table: "CoursePositions",
                newName: "CreatedDateTime");

            migrationBuilder.RenameColumn(
                name: "ModifiedOn",
                table: "CourseLocations",
                newName: "ModifiedDateTime");

            migrationBuilder.RenameColumn(
                name: "CreatedOn",
                table: "CourseLocations",
                newName: "CreatedDateTime");

            migrationBuilder.RenameColumn(
                name: "ModifiedOn",
                table: "CourseInstructors",
                newName: "ModifiedDateTime");

            migrationBuilder.RenameColumn(
                name: "CreatedOn",
                table: "CourseInstructors",
                newName: "CreatedDateTime");

            migrationBuilder.RenameColumn(
                name: "ModifiedOn",
                table: "CourseEmployees",
                newName: "ModifiedDateTime");

            migrationBuilder.RenameColumn(
                name: "CreatedOn",
                table: "CourseEmployees",
                newName: "CreatedDateTime");

            migrationBuilder.RenameColumn(
                name: "ModifiedOn",
                table: "CompaniesAssignedToUsers",
                newName: "ModifiedDateTime");

            migrationBuilder.RenameColumn(
                name: "CreatedOn",
                table: "CompaniesAssignedToUsers",
                newName: "CreatedDateTime");

            migrationBuilder.RenameColumn(
                name: "ModifiedOn",
                table: "ClassRooms",
                newName: "ModifiedDateTime");

            migrationBuilder.RenameColumn(
                name: "CreatedOn",
                table: "ClassRooms",
                newName: "CreatedDateTime");

            migrationBuilder.RenameColumn(
                name: "ModifiedOn",
                table: "BatchHistories",
                newName: "ModifiedDateTime");

            migrationBuilder.RenameColumn(
                name: "CreatedOn",
                table: "BatchHistories",
                newName: "CreatedDateTime");

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "Users",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "Users",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "UserImages",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "UserImages",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "Taxes",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "Taxes",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InCompany",
                table: "Taxes",
                type: "nvarchar(5)",
                maxLength: 5,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "TaxDetails",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "TaxDetails",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InCompany",
                table: "TaxDetails",
                type: "nvarchar(5)",
                maxLength: 5,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "ReportsConfig",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "ReportsConfig",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InCompany",
                table: "ReportsConfig",
                type: "nvarchar(5)",
                maxLength: 5,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "Projects",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "Projects",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InCompany",
                table: "Projects",
                type: "nvarchar(5)",
                maxLength: 5,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "ProjCategories",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "ProjCategories",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InCompany",
                table: "ProjCategories",
                type: "nvarchar(5)",
                maxLength: 5,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "Positions",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "Positions",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InCompany",
                table: "Positions",
                type: "nvarchar(5)",
                maxLength: 5,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "PositionRequirements",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "PositionRequirements",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InCompany",
                table: "PositionRequirements",
                type: "nvarchar(5)",
                maxLength: 5,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "PayrollsProcess",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "PayrollsProcess",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InCompany",
                table: "PayrollsProcess",
                type: "nvarchar(5)",
                maxLength: 5,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "Payrolls",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "Payrolls",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InCompany",
                table: "Payrolls",
                type: "nvarchar(5)",
                maxLength: 5,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "PayrollProcessDetails",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "PayrollProcessDetails",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InCompany",
                table: "PayrollProcessDetails",
                type: "nvarchar(5)",
                maxLength: 5,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "PayrollProcessActions",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "PayrollProcessActions",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InCompany",
                table: "PayrollProcessActions",
                type: "nvarchar(5)",
                maxLength: 5,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "PayCycles",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "PayCycles",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InCompany",
                table: "PayCycles",
                type: "nvarchar(5)",
                maxLength: 5,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "MenuAssignedToUsers",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "MenuAssignedToUsers",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "Loans",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "Loans",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InCompany",
                table: "Loans",
                type: "nvarchar(5)",
                maxLength: 5,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "Jobs",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "Jobs",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InCompany",
                table: "Jobs",
                type: "nvarchar(5)",
                maxLength: 5,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "Instructors",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "Instructors",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InCompany",
                table: "Instructors",
                type: "nvarchar(5)",
                maxLength: 5,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "EmployeeWorkControlCalendars",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "EmployeeWorkControlCalendars",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InCompany",
                table: "EmployeeWorkControlCalendars",
                type: "nvarchar(5)",
                maxLength: 5,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "EmployeeWorkCalendars",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "EmployeeWorkCalendars",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InCompany",
                table: "EmployeeWorkCalendars",
                type: "nvarchar(5)",
                maxLength: 5,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "EmployeeTaxes",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "EmployeeTaxes",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InCompany",
                table: "EmployeeTaxes",
                type: "nvarchar(5)",
                maxLength: 5,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "EmployeesAddress",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "EmployeesAddress",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InCompany",
                table: "EmployeesAddress",
                type: "nvarchar(5)",
                maxLength: 5,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "Employees",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "Employees",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InCompany",
                table: "Employees",
                type: "nvarchar(5)",
                maxLength: 5,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "EmployeePositions",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "EmployeePositions",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InCompany",
                table: "EmployeePositions",
                type: "nvarchar(5)",
                maxLength: 5,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "EmployeeLoans",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "EmployeeLoans",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InCompany",
                table: "EmployeeLoans",
                type: "nvarchar(5)",
                maxLength: 5,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "EmployeeLoanHistories",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "EmployeeLoanHistories",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InCompany",
                table: "EmployeeLoanHistories",
                type: "nvarchar(5)",
                maxLength: 5,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "EmployeeImages",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "EmployeeImages",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InCompany",
                table: "EmployeeImages",
                type: "nvarchar(5)",
                maxLength: 5,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "EmployeeExtraHours",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "EmployeeExtraHours",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InCompany",
                table: "EmployeeExtraHours",
                type: "nvarchar(5)",
                maxLength: 5,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "EmployeeEarningCodes",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "EmployeeEarningCodes",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InCompany",
                table: "EmployeeEarningCodes",
                type: "nvarchar(5)",
                maxLength: 5,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "EmployeeDocuments",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "EmployeeDocuments",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InCompany",
                table: "EmployeeDocuments",
                type: "nvarchar(5)",
                maxLength: 5,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "EmployeeDepartments",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "EmployeeDepartments",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InCompany",
                table: "EmployeeDepartments",
                type: "nvarchar(5)",
                maxLength: 5,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "EmployeeDeductionCodes",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "EmployeeDeductionCodes",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InCompany",
                table: "EmployeeDeductionCodes",
                type: "nvarchar(5)",
                maxLength: 5,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "EmployeeContactsInf",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "EmployeeContactsInf",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InCompany",
                table: "EmployeeContactsInf",
                type: "nvarchar(5)",
                maxLength: 5,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "EmployeeBankAccounts",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "EmployeeBankAccounts",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InCompany",
                table: "EmployeeBankAccounts",
                type: "nvarchar(5)",
                maxLength: 5,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "EarningCodeVersions",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "EarningCodeVersions",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InCompany",
                table: "EarningCodeVersions",
                type: "nvarchar(5)",
                maxLength: 5,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "EarningCodes",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "EarningCodes",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InCompany",
                table: "EarningCodes",
                type: "nvarchar(5)",
                maxLength: 5,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "Departments",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "Departments",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InCompany",
                table: "Departments",
                type: "nvarchar(5)",
                maxLength: 5,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "DeductionCodeVersions",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "DeductionCodeVersions",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InCompany",
                table: "DeductionCodeVersions",
                type: "nvarchar(5)",
                maxLength: 5,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "DeductionCodes",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "DeductionCodes",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InCompany",
                table: "DeductionCodes",
                type: "nvarchar(5)",
                maxLength: 5,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "CourseTypes",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "CourseTypes",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InCompany",
                table: "CourseTypes",
                type: "nvarchar(5)",
                maxLength: 5,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "Courses",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "Courses",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InCompany",
                table: "Courses",
                type: "nvarchar(5)",
                maxLength: 5,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "CoursePositions",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "CoursePositions",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InCompany",
                table: "CoursePositions",
                type: "nvarchar(5)",
                maxLength: 5,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "CourseLocations",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "CourseLocations",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InCompany",
                table: "CourseLocations",
                type: "nvarchar(5)",
                maxLength: 5,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "CourseInstructors",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "CourseInstructors",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InCompany",
                table: "CourseInstructors",
                type: "nvarchar(5)",
                maxLength: 5,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "CourseEmployees",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "CourseEmployees",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InCompany",
                table: "CourseEmployees",
                type: "nvarchar(5)",
                maxLength: 5,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "CompaniesAssignedToUsers",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "CompaniesAssignedToUsers",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "ClassRooms",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "ClassRooms",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InCompany",
                table: "ClassRooms",
                type: "nvarchar(5)",
                maxLength: 5,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "BatchHistories",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "BatchHistories",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InCompany",
                table: "BatchHistories",
                type: "nvarchar(5)",
                maxLength: 5,
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Taxes",
                table: "Taxes",
                columns: new[] { "TaxId", "InCompany" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_TaxDetails",
                table: "TaxDetails",
                columns: new[] { "InternalId", "TaxId", "InCompany" });

            migrationBuilder.CreateIndex(
                name: "IX_TaxDetails_TaxId_InCompany",
                table: "TaxDetails",
                columns: new[] { "TaxId", "InCompany" });

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeTaxes_TaxId_InCompany",
                table: "EmployeeTaxes",
                columns: new[] { "TaxId", "InCompany" });

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeeTaxes_Taxes_TaxId_InCompany",
                table: "EmployeeTaxes",
                columns: new[] { "TaxId", "InCompany" },
                principalTable: "Taxes",
                principalColumns: new[] { "TaxId", "InCompany" },
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TaxDetails_Taxes_TaxId_InCompany",
                table: "TaxDetails",
                columns: new[] { "TaxId", "InCompany" },
                principalTable: "Taxes",
                principalColumns: new[] { "TaxId", "InCompany" },
                onDelete: ReferentialAction.Cascade);
        }
    }
}
