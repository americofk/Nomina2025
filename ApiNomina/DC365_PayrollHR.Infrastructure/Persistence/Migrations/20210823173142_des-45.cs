using Microsoft.EntityFrameworkCore.Migrations;

namespace DC365_PayrollHR.Infrastructure.Migrations
{
    public partial class des45 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_PositionRequirements",
                table: "PositionRequirements");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PositionRequirements",
                table: "PositionRequirements",
                columns: new[] { "Name", "PositionId" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_PositionRequirements",
                table: "PositionRequirements");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PositionRequirements",
                table: "PositionRequirements",
                column: "Name");
        }
    }
}
