using Microsoft.EntityFrameworkCore.Migrations;

namespace DC365_PayrollHR.Infrastructure.Migrations
{
    public partial class AddRecIdSequence : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                IF NOT EXISTS (SELECT * FROM sys.sequences WHERE name = 'RecId')
                BEGIN
                    CREATE SEQUENCE [dbo].[RecId]
                    START WITH 20260100
                    INCREMENT BY 1
                    MINVALUE 20260100
                    NO MAXVALUE
                    NO CYCLE
                    CACHE 50;
                END
            ");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                IF EXISTS (SELECT * FROM sys.sequences WHERE name = 'RecId')
                BEGIN
                    DROP SEQUENCE [dbo].[RecId];
                END
            ");
        }
    }
}
