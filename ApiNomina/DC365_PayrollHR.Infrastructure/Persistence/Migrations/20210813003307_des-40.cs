using Microsoft.EntityFrameworkCore.Migrations;

namespace DC365_PayrollHR.Infrastructure.Migrations
{
    public partial class des40 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "EarningCodeId",
                table: "EarningCodes",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                defaultValueSql: "FORMAT((NEXT VALUE FOR dbo.EarningCodeId),'EC-00000000#')",
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldDefaultValueSql: "FORMAT((NEXT VALUE FOR dbo.EarningCodeId),'E-00000000#')");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "EarningCodeId",
                table: "EarningCodes",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                defaultValueSql: "FORMAT((NEXT VALUE FOR dbo.EarningCodeId),'E-00000000#')",
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20,
                oldDefaultValueSql: "FORMAT((NEXT VALUE FOR dbo.EarningCodeId),'EC-00000000#')");
        }
    }
}
