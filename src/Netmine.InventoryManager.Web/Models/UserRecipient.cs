using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Netmine.InventoryManager.Web.Models
{
    public class UserRecipient : BaseModel
    {
        [Required]
        public ApplicationUser User { get; set; }

        [Required]
        public Recipient Recipient { get; set; }
    }
}
