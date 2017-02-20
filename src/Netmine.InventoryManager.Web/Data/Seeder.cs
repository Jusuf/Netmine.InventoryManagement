using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Netmine.InventoryManager.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Netmine.InventoryManager.Web.Data
{
    public static class Seeder
    {
        private static ApplicationDbContext db;
        public static void SeedData(this IApplicationBuilder app)
        {
            db = app.ApplicationServices.GetService<ApplicationDbContext>();
            AddArticles();
            AddAddresses();
            AddUsers();
            AddRacks();
            AddCargo();
            AddOrders();
            AddOrderRows();
            AddRecipients();
            AddTransactions();
            AddUserRecipients();
        }

        private static void AddArticles()
        {
            if (!db.Articles.Any())
            {

                var random = new Random();

                // Add 10 articles
                for (var i = 0; i < 10; i++)
                {
                    var article = new Article
                    {
                        Id = Guid.NewGuid(),
                        Name = "Artikel " + random.Next(1, 1000).ToString(),
                        Number = "NUM " + random.Next(1, 1000),
                        CreatedDate = DateTime.UtcNow.AddSeconds(random.Next(-1000000, 1000000)),
                        IsDeleted = false,
                        ModifiedDate = DateTime.UtcNow.AddSeconds(random.Next(-1000000, 1000000)),
                        Unit = Models.Enums.Units.Pieces
                    };

                    db.Articles.Add(article);
                }

                db.SaveChanges();
            }
        }

        private static void AddAddresses()
        {
            if (!db.Addresses.Any())
            {
                var random = new Random();
                for (var i = 0; i < 10; i++)
                {
                    var item = new Address
                    {
                        Id = Guid.NewGuid(),
                        City = "Stad " + random.Next(1, 1000).ToString(),
                        CreatedDate = DateTime.UtcNow.AddSeconds(random.Next(-1000000, 1000000)),
                        IsDeleted = false,
                        ModifiedDate = DateTime.UtcNow.AddSeconds(random.Next(-1000000, 1000000)),
                        Street = "Gatan " + random.Next(1, 1000),
                        ZipCode = random.Next(11111, 99999)
                    };

                    db.Addresses.Add(item);
                }

                db.SaveChanges();
            }
        }

        private static void AddUsers()
        {
            if (!db.Users.Any())
            {
                var random = new Random();
                var user = "user" + random.Next(1, 999) + "@mail.com";
                for (var i = 0; i < 10; i++)
                {
                    var item = new ApplicationUser
                    {
                        Id = Guid.NewGuid().ToString(),
                        AccessFailedCount = 0,
                        ConcurrencyStamp = Guid.NewGuid().ToString(),
                        Email = user,
                        EmailConfirmed = true,
                        LockoutEnabled = true,
                        PasswordHash = "AQAAAAEAACcQAAAAEAe/yuy6KCb2x8CaAWF2wjPq29tQWTCIdZAG22ykX4YzA3FVioL0kCUTUSQcQeUG8w==", //Abc.123?
                        SecurityStamp = Guid.NewGuid().ToString(),
                        TwoFactorEnabled = false,
                        UserName = user,
                        FirstName = "FirstName" + random.Next(1, 999),
                        LastName = "LastName" + random.Next(1, 999),
                    };

                    db.Users.Add(item);
                }

                db.SaveChanges();
            }
        }

        private static void AddRacks()
        {
            if (!db.Racks.Any())
            {
                var random = new Random();
                for (var i = 0; i < 10; i++)
                {
                    var item = new Rack
                    {
                        Id = Guid.NewGuid(),
                        CreatedDate = DateTime.UtcNow.AddSeconds(random.Next(-1000000, 1000000)),
                        IsDeleted = false,
                        ModifiedDate = DateTime.UtcNow.AddSeconds(random.Next(-1000000, 1000000)),
                        Name = "Hylla " + random.Next(1, 999)
                    };

                    db.Racks.Add(item);
                }

                db.SaveChanges();
            }
        }

        private static void AddCargo()
        {
            if (!db.Cargos.Any())
            {
                var random = new Random();
                for (var i = 0; i < 10; i++)
                {
                    var item = new Cargo
                    {
                        Id = Guid.NewGuid(),
                        CreatedDate = DateTime.UtcNow.AddSeconds(random.Next(-1000000, 1000000)),
                        IsDeleted = false,
                        ModifiedDate = DateTime.UtcNow.AddSeconds(random.Next(-1000000, 1000000)),
                        Amount = random.Next(1, 1000),
                        Article = db.Articles.OrderBy(r => random.Next()).First(),
                        BatchNumber = "BATCHNR" + random.Next(1, 9999),
                        BlockedAmount = random.Next(0, 100),
                        Rack = db.Racks.OrderBy(r => random.Next()).First(),
                    };

                    db.Cargos.Add(item);
                }

                db.SaveChanges();
            }
        }

        private static void AddOrders()
        {
            if (!db.Orders.Any())
            {
                var random = new Random();
                for (var i = 0; i < 10; i++)
                {
                    var item = new Order
                    {
                        Id = Guid.NewGuid(),
                        CreatedDate = DateTime.UtcNow.AddSeconds(random.Next(-1000000, 1000000)),
                        IsDeleted = false,
                        ModifiedDate = DateTime.UtcNow.AddSeconds(random.Next(-1000000, 1000000)),
                        CreatedBy = db.Users.OrderBy(r => random.Next()).First(),
                        Message = "Message" + random.Next(1, 999),
                        Recipient = db.Recipients.OrderBy(r => random.Next()).First(),
                        Status = Models.Enums.OrderStatus.Active
                    };

                    db.Orders.Add(item);
                }

                db.SaveChanges();
            }
        }

        private static void AddOrderRows()
        {
            if (!db.OrderRows.Any())
            {
                var random = new Random();
                for (var i = 0; i < 10; i++)
                {
                    var item = new OrderRow
                    {
                        Id = Guid.NewGuid(),
                        CreatedDate = DateTime.UtcNow.AddSeconds(random.Next(-1000000, 1000000)),
                        IsDeleted = false,
                        ModifiedDate = DateTime.UtcNow.AddSeconds(random.Next(-1000000, 1000000)),
                        Amount = random.Next(0, 999),
                        Article = db.Articles.OrderBy(r => random.Next()).First(),
                        Order = db.Orders.OrderBy(r => random.Next()).First(),
                    };

                    db.OrderRows.Add(item);
                }

                db.SaveChanges();
            }
        }

        private static void AddRecipients()
        {
            if (!db.Recipients.Any())
            {
                var random = new Random();
                var user = "user" + random.Next(1, 999) + "@mail.com";
                for (var i = 0; i < 10; i++)
                {
                    var item = new Recipient
                    {
                        Id = Guid.NewGuid(),
                        CreatedDate = DateTime.UtcNow.AddSeconds(random.Next(-1000000, 1000000)),
                        IsDeleted = false,
                        ModifiedDate = DateTime.UtcNow.AddSeconds(random.Next(-1000000, 1000000)),
                        Address = db.Addresses.OrderBy(r => random.Next()).First(),
                        Email = user,
                        FirstName = "Firstname" + random.Next(1, 999),
                        LastName = "LastName" + random.Next(1, 999)
                    };

                    db.Recipients.Add(item);
                }

                db.SaveChanges();
            }
        }

        private static void AddTransactions()
        {
            if (!db.Transactions.Any())
            {
                var random = new Random();
                for (var i = 0; i < 10; i++)
                {
                    var item = new Transaction
                    {
                        Id = Guid.NewGuid(),
                        CreatedDate = DateTime.UtcNow.AddSeconds(random.Next(-1000000, 1000000)),
                        IsDeleted = false,
                        ModifiedDate = DateTime.UtcNow.AddSeconds(random.Next(-1000000, 1000000)),
                        Amount = random.Next(0, 1000),
                        Article = db.Articles.OrderBy(r => random.Next()).First(),
                        BatchNumber = "BATCHNR" + random.Next(1, 999),
                        CreatedBy = db.Users.OrderBy(r => random.Next()).First(),
                        OrderNumber = Guid.NewGuid().ToString(),
                        Rack = db.Racks.OrderBy(r => random.Next()).First(),
                        TransactionType = Models.Enums.TransactionTypes.Sent
                    };

                    db.Transactions.Add(item);
                }

                db.SaveChanges();
            }
        }

        private static void AddUserRecipients()
        {
            if (!db.UserRecipients.Any())
            {
                var random = new Random();
                for (var i = 0; i < 10; i++)
                {
                    var item = new UserRecipient
                    {
                        Id = Guid.NewGuid(),
                        CreatedDate = DateTime.UtcNow.AddSeconds(random.Next(-1000000, 1000000)),
                        IsDeleted = false,
                        ModifiedDate = DateTime.UtcNow.AddSeconds(random.Next(-1000000, 1000000)),
                        Recipient = db.Recipients.OrderBy(r => random.Next()).First(),
                        User = db.Users.OrderBy(r => random.Next()).First(),
                    };

                    db.UserRecipients.Add(item);
                }

                db.SaveChanges();
            }
        }
    }
}
