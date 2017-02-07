using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Netmine.InventoryManager.Data
{
    public class Base
    {
        private DateTime CreatedDate;
        private DateTime ModifiedDate;
        private DateTime DeletedDate;

        public Guid Id { get; set; }
        public bool IsDeleted { get; set; }
    }
}
