using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DC365_PayrollHR.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddProjIdToProjCategory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ProjId",
                table: "ProjCategories",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ProjCategories_ProjId",
                table: "ProjCategories",
                column: "ProjId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProjCategories_Projects_ProjId",
                table: "ProjCategories",
                column: "ProjId",
                principalTable: "Projects",
                principalColumn: "ProjId",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjCategories_Projects_ProjId",
                table: "ProjCategories");

            migrationBuilder.DropIndex(
                name: "IX_ProjCategories_ProjId",
                table: "ProjCategories");

            migrationBuilder.DropColumn(
                name: "ProjId",
                table: "ProjCategories");
        }
    }
}
