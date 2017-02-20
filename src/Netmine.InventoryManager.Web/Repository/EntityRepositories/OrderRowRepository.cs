using Microsoft.EntityFrameworkCore;
using Netmine.InventoryManager.Web.Data;
using Netmine.InventoryManager.Web.Models;
using Netmine.InventoryManager.Web.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Netmine.InventoryManager.Web.Repository.EntityRepositories
{
    public class OrderRowRepository : MainRepository<OrderRow, Guid>, IOrderRowRepository
    {
        public OrderRowRepository(ApplicationDbContext context) : base(context) { }
    }
}