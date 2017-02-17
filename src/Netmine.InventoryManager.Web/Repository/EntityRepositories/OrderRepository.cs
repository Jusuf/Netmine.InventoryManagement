using Microsoft.EntityFrameworkCore;
using Netmine.InventoryManager.Web.Data;
using Netmine.InventoryManager.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Netmine.InventoryManager.Web.Repository.EntityRepositories
{
    public class OrderRepository : MainRepository<Order, Guid>, IOrderRepository
    {
        public OrderRepository(ApplicationDbContext context) : base(context) { }
    }
}