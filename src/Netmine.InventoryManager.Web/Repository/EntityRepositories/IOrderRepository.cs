using Netmine.InventoryManager.Web.Models;
using System;
using System.Collections.Generic;

namespace Netmine.InventoryManager.Web.Repository.EntityRepositories
{
    public interface IOrderRepository : IMainRepository<Order, Guid>
    {
    }
}