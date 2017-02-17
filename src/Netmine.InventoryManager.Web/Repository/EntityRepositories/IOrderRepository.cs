using Netmine.InventoryManager.Web.Models;
using System;
using System.Collections.Generic;

namespace Netmine.InventoryManager.Web.Repository.EntityRepositories
{
    public interface IOrderRepository : IMainRepository<Order, Guid>
    {
        IEnumerable<Order> GetNewOrders();
        IEnumerable<Order> GetActiveOrders();
        IEnumerable<Order> GetCompletedOrders();
    }
}