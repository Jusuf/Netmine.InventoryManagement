using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Netmine.InventoryManager.Web.Data.Migrations
{
    public partial class AddedAllEntities : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Number",
                table: "Articles",
                nullable: false);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Articles",
                nullable: false);

            migrationBuilder.AddColumn<int>(
                name: "Unit",
                table: "Articles",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "LastName",
                table: "AspNetUsers",
                nullable: false);

            migrationBuilder.AlterColumn<string>(
                name: "FirstName",
                table: "AspNetUsers",
                nullable: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Unit",
                table: "Articles");

            migrationBuilder.AlterColumn<int>(
                name: "Number",
                table: "Articles",
                nullable: false);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Articles",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "LastName",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "FirstName",
                table: "AspNetUsers",
                nullable: true);
        }
    }
}
