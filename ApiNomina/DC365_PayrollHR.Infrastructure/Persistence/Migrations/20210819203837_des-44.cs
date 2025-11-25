using Microsoft.EntityFrameworkCore.Migrations;

namespace DC365_PayrollHR.Infrastructure.Migrations
{
    public partial class des44 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsExtraHours",
                table: "EarningCodes",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsExtraHours",
                table: "EarningCodes");
        }
    }
}
