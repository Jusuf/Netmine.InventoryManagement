using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Netmine.InventoryManager.Web.Data.Migrations
{
    public partial class ChangedDoubleToDecimalOnAmount : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "Amount",
                table: "Transactions",
                nullable: false);

            migrationBuilder.AlterColumn<decimal>(
                name: "Amount",
                table: "OrderRows",
                nullable: false);

            migrationBuilder.AlterColumn<decimal>(
                name: "BlockedAmount",
                table: "Cargos",
                nullable: false);

            migrationBuilder.AlterColumn<decimal>(
                name: "Amount",
                table: "Cargos",
                nullable: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "Amount",
                table: "Transactions",
                nullable: false);

            migrationBuilder.AlterColumn<double>(
                name: "Amount",
                table: "OrderRows",
                nullable: false);

            migrationBuilder.AlterColumn<double>(
                name: "BlockedAmount",
                table: "Cargos",
                nullable: false);

            migrationBuilder.AlterColumn<double>(
                name: "Amount",
                table: "Cargos",
                nullable: false);
        }
    }
}
