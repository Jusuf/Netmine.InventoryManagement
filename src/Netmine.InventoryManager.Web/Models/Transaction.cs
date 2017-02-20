using Netmine.InventoryManager.Web.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Netmine.InventoryManager.Web.Models
{
    public class Transaction : BaseModel
    {
        public string BatchNumber { get; set; }

        public string OrderNumber { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public TransactionTypes TransactionType { get; set; }

        [Required]
        public decimal Amount { get; set; }

        [Required]
        public Article Article { get; set; }

        [Required]
        public Rack Rack { get; set; }

        [Required]
        public ApplicationUser CreatedBy { get; set; }
    }
}
