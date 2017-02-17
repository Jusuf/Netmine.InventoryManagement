using Microsoft.EntityFrameworkCore;
using Netmine.InventoryManager.Web.Data;
using Netmine.InventoryManager.Web.Models;
using Netmine.InventoryManager.Web.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Netmine.InventoryManager.Web.Repository.EntityRepositories
{
    public class OrderRepository : MainRepository<Order, Guid>, IOrderRepository
    {
        public OrderRepository(ApplicationDbContext context) : base(context) { }

        public IEnumerable<Order> GetNewOrders()
        {
            return GetAll().Where(x => x.Status == (int)OrderStatus.New);
        }

        public IEnumerable<Order> GetActiveOrders()
        {
            return GetAll().Where(x => x.Status == OrderStatus.Active);
        }

        public IEnumerable<Order> GetCompletedOrders()
        {
            return GetAll().Where(x => x.Status == OrderStatus.Completed);
        }
    }
}