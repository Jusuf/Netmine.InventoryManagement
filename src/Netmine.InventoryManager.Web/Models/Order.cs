using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Netmine.InventoryManager.Web.Models
{
    public class Order : BaseModel
    {
        [Required]
        public int Status { get; set; }

        public string Message { get; set; }

        [Required]
        public ApplicationUser CreatedBy { get; set; }

        [Required]
        public Recipient Recipient { get; set; }
    }
}
