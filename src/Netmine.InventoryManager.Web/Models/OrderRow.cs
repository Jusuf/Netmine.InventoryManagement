using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Netmine.InventoryManager.Web.Models
{
    public class OrderRow : BaseModel
    {
        [Required]
        public decimal Amount { get; set; }

        [Required]
        public Order Order { get; set; }

        [Required]
        public Article Article { get; set; }
    }
}
