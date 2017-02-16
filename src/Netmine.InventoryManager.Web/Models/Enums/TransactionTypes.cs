using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Netmine.InventoryManager.Web.Models.Enums
{
    public enum TransactionTypes : int
    {
        Received = 10,
        Sent = 20,
        Adjust = 30,
        Damaged = 40
    }
}
