using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Netmine.InventoryManager.Web.Models
{
    public class Address : BaseModel
    {
        public string Street { get; set; }
        [Required]
        public int ZipCode { get; set; }
        public string City { get; set; }
    }
}
