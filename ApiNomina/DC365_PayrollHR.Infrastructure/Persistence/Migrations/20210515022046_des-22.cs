using Microsoft.EntityFrameworkCore.Migrations;

namespace DC365_PayrollHR.Infrastructure.Migrations
{
    public partial class des22 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RequirementId",
                table: "PositionRequirements");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PositionRequirements",
                table: "PositionRequirements",
                column: "Name");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_PositionRequirements",
                table: "PositionRequirements");

            migrationBuilder.AddColumn<string>(
                name: "RequirementId",
                table: "PositionRequirements",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
