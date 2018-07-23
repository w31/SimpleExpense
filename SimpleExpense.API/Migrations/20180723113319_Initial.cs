using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SimpleExpense.API.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Expenses",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Payee = table.Column<string>(nullable: true),
                    Date = table.Column<DateTime>(nullable: false),
                    Amount = table.Column<decimal>(nullable: false),
                    CategoryID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Expenses", x => x.ID);
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "ID", "Name" },
                values: new object[] { 1, "Rent" });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "ID", "Name" },
                values: new object[] { 2, "Utility" });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "ID", "Name" },
                values: new object[] { 3, "Groceries" });

            migrationBuilder.InsertData(
                table: "Expenses",
                columns: new[] { "ID", "Amount", "CategoryID", "Date", "Payee" },
                values: new object[] { 1, 23.89m, 3, new DateTime(2018, 7, 23, 0, 0, 0, 0, DateTimeKind.Local), "Everyday Mart" });

            migrationBuilder.InsertData(
                table: "Expenses",
                columns: new[] { "ID", "Amount", "CategoryID", "Date", "Payee" },
                values: new object[] { 2, 47.50m, 2, new DateTime(2018, 7, 23, 0, 0, 0, 0, DateTimeKind.Local), "Green Energy" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "Expenses");
        }
    }
}
