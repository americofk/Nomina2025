using Microsoft.EntityFrameworkCore.Migrations;

namespace DC365_PayrollHR.Infrastructure.Migrations
{
    public partial class des87 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_EmployeeLoanHistories",
                table: "EmployeeLoanHistories");

            migrationBuilder.AddPrimaryKey(
                name: "PK_EmployeeLoanHistories",
                table: "EmployeeLoanHistories",
                columns: new[] { "InternalId", "ParentInternalId", "EmployeeId" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_EmployeeLoanHistories",
                table: "EmployeeLoanHistories");

            migrationBuilder.AddPrimaryKey(
                name: "PK_EmployeeLoanHistories",
                table: "EmployeeLoanHistories",
                columns: new[] { "InternalId", "ParentInternalId" });
        }
    }
}
