using Netmine.InventoryManager.Web.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Netmine.InventoryManager.Web.ViewModels
{
    public class CargoViewModel
    {
        public Guid Id { get; set; }

        public decimal Amount { get; set; }

        public string BatchNumber { get; set; }

        public decimal BlockedAmount { get; set; }

        public string RackName { get; set; }

        public int TakeAmount { get; set; }
    }
}
