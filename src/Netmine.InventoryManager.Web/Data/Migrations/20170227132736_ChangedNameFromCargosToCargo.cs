using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Netmine.InventoryManager.Web.Data.Migrations
{
    public partial class ChangedNameFromCargosToCargo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cargos_Articles_ArticleId",
                table: "Cargos");

            migrationBuilder.DropForeignKey(
                name: "FK_Cargos_Racks_RackId",
                table: "Cargos");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Cargos",
                table: "Cargos");

            migrationBuilder.RenameTable(
                name: "Cargos",
                newName: "Cargo");

            migrationBuilder.RenameIndex(
                name: "IX_Cargos_RackId",
                table: "Cargo",
                newName: "IX_Cargo_RackId");

            migrationBuilder.RenameIndex(
                name: "IX_Cargos_ArticleId",
                table: "Cargo",
                newName: "IX_Cargo_ArticleId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Cargo",
                table: "Cargo",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Cargo_Articles_ArticleId",
                table: "Cargo",
                column: "ArticleId",
                principalTable: "Articles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Cargo_Racks_RackId",
                table: "Cargo",
                column: "RackId",
                principalTable: "Racks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cargo_Articles_ArticleId",
                table: "Cargo");

            migrationBuilder.DropForeignKey(
                name: "FK_Cargo_Racks_RackId",
                table: "Cargo");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Cargo",
                table: "Cargo");

            migrationBuilder.RenameTable(
                name: "Cargo",
                newName: "Cargos");

            migrationBuilder.RenameIndex(
                name: "IX_Cargo_RackId",
                table: "Cargos",
                newName: "IX_Cargos_RackId");

            migrationBuilder.RenameIndex(
                name: "IX_Cargo_ArticleId",
                table: "Cargos",
                newName: "IX_Cargos_ArticleId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Cargos",
                table: "Cargos",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Cargos_Articles_ArticleId",
                table: "Cargos",
                column: "ArticleId",
                principalTable: "Articles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Cargos_Racks_RackId",
                table: "Cargos",
                column: "RackId",
                principalTable: "Racks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
