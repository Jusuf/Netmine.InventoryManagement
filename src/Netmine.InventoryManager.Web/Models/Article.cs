using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Netmine.InventoryManager.Web.Models
{
    public class Article : BaseModel
    {
        public string Name { get; set; }

        public int Number { get; set; }

    }
}
