using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Netmine.InventoryManager.Web.Models;

namespace Netmine.InventoryManager.Web.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<Address> Addresses { get; set; }

        public DbSet<Article> Articles { get; set; }

        public DbSet<Cargo> Cargos { get; set; }

        public DbSet<Order> Orders { get; set; }

        public DbSet<OrderRow> OrderRows { get; set; }

        public DbSet<Rack> Racks { get; set; }

        public DbSet<Recipient> Recipients { get; set; }

        public DbSet<Transaction> Transactions { get; set; }

        public DbSet<UserRecipient> UserRecipients { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);

            
        }
        
    }
}
