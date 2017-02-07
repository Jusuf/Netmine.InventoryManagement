using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Netmine.InventoryManager.Web.Models
{
    public abstract class BaseModel
    {
        public virtual Guid Id { get; set; }

        private DateTime createdDate;

        private DateTime modifiedDate;

        private bool isDeleted;
    }
}
