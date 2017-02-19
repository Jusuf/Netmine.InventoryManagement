using Netmine.InventoryManager.Web.Models;
using Netmine.InventoryManager.Web.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Netmine.InventoryManager.Web.ViewModels
{
    public class TransactionViewModel
    {
        public string Id { get; set; }

        public string BatchNumber { get; set; }

        public string OrderNumber { get; set; }

        public TransactionTypes TransactionType { get; set; }

        public decimal Amount { get; set; }

        public Rack Rack { get; set; }

        public ApplicationUser CreatedBy { get; set; }
    }
}
