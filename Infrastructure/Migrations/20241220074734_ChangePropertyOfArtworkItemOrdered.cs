using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ChangePropertyOfArtworkItemOrdered : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ItemOrdered_ArtworkName",
                table: "OrderItems",
                newName: "ItemOrdered_ArtworkTitle");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ItemOrdered_ArtworkTitle",
                table: "OrderItems",
                newName: "ItemOrdered_ArtworkName");
        }
    }
}
