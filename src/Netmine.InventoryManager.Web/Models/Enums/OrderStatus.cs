using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Netmine.InventoryManager.Web.Models.Enums
{
    public enum OrderStatus : int
    {
        New = 0,
        Active = 1,
        Completed = 2
    }
}
