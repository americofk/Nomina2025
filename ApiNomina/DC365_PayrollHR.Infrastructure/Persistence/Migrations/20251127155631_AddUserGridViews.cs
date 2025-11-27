using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DC365_PayrollHR.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddUserGridViews : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserGridViews",
                columns: table => new
                {
                    RecId = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserRefRecId = table.Column<long>(type: "bigint", nullable: false),
                    EntityName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    ViewType = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false, defaultValue: "Grid"),
                    ViewScope = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false, defaultValue: "Private"),
                    RoleRefRecId = table.Column<long>(type: "bigint", nullable: true),
                    ViewName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    ViewDescription = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    IsDefault = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    IsLocked = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    ViewConfig = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SchemaVersion = table.Column<int>(type: "int", nullable: false, defaultValue: 1),
                    Checksum = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: true),
                    UsageCount = table.Column<int>(type: "int", nullable: false, defaultValue: 0),
                    LastUsedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Tags = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    CreatedBy = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedBy = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    ModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeletedBy = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DataAreaId = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserGridViews", x => x.RecId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserGridViews_Entity_ViewType",
                table: "UserGridViews",
                columns: new[] { "EntityName", "ViewType" });

            migrationBuilder.CreateIndex(
                name: "IX_UserGridViews_User_Scope",
                table: "UserGridViews",
                columns: new[] { "UserRefRecId", "ViewScope" });

            migrationBuilder.CreateIndex(
                name: "UX_UserGridViews_User_Entity_View",
                table: "UserGridViews",
                columns: new[] { "UserRefRecId", "EntityName", "ViewName" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserGridViews");
        }
    }
}
