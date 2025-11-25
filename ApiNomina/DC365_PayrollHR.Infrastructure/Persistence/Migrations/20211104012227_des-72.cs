using Microsoft.EntityFrameworkCore.Migrations;

namespace DC365_PayrollHR.Infrastructure.Migrations
{
    public partial class des72 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CoursePositions_Instructors_PositionId",
                table: "CoursePositions");

            migrationBuilder.AddForeignKey(
                name: "FK_CoursePositions_Positions_PositionId",
                table: "CoursePositions",
                column: "PositionId",
                principalTable: "Positions",
                principalColumn: "PositionId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CoursePositions_Positions_PositionId",
                table: "CoursePositions");

            migrationBuilder.AddForeignKey(
                name: "FK_CoursePositions_Instructors_PositionId",
                table: "CoursePositions",
                column: "PositionId",
                principalTable: "Instructors",
                principalColumn: "InstructorId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
