using Microsoft.EntityFrameworkCore.Migrations;

namespace DC365_PayrollHR.Infrastructure.Migrations
{
    public partial class des101 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Cooperative",
                table: "ReportsConfig",
                newName: "LoanCooperative");

            migrationBuilder.AddColumn<string>(
                name: "DeductionCooperative",
                table: "ReportsConfig",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeductionCooperative",
                table: "ReportsConfig");

            migrationBuilder.RenameColumn(
                name: "LoanCooperative",
                table: "ReportsConfig",
                newName: "Cooperative");
        }
    }
}
