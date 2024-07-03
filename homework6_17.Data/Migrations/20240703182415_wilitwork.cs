using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace homework6_17.Data.Migrations
{
    /// <inheritdoc />
    public partial class wilitwork : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DBSteps",
                table: "Recipes",
                newName: "Steps");

            migrationBuilder.RenameColumn(
                name: "DBIngredients",
                table: "Recipes",
                newName: "Ingredients");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Steps",
                table: "Recipes",
                newName: "DBSteps");

            migrationBuilder.RenameColumn(
                name: "Ingredients",
                table: "Recipes",
                newName: "DBIngredients");
        }
    }
}
