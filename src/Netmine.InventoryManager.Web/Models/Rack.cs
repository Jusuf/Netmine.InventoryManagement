using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Netmine.InventoryManager.Web.Models
{
    public class Rack : BaseModel
    {
        public string Name { get; set; }
    }
}
