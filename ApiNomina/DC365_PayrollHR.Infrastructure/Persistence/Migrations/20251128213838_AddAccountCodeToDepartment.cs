using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DC365_PayrollHR.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddAccountCodeToDepartment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AccountCode",
                table: "Departments",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AccountCode",
                table: "Departments");
        }
    }
}
