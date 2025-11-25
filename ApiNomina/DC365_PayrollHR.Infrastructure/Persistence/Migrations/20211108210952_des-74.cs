using Microsoft.EntityFrameworkCore.Migrations;

namespace DC365_PayrollHR.Infrastructure.Migrations
{
    public partial class des74 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_EmployeeEarningCodes",
                table: "EmployeeEarningCodes");

            migrationBuilder.AddPrimaryKey(
                name: "PK_EmployeeEarningCodes",
                table: "EmployeeEarningCodes",
                columns: new[] { "InternalId", "EmployeeId" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_EmployeeEarningCodes",
                table: "EmployeeEarningCodes");

            migrationBuilder.AddPrimaryKey(
                name: "PK_EmployeeEarningCodes",
                table: "EmployeeEarningCodes",
                column: "InternalId");
        }
    }
}
