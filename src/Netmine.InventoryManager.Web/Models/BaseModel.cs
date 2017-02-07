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

        public virtual DateTime CreatedDate
        {
            get
            {
                return this.createdDate;
            }

            set
            {
                if (this.createdDate != DateTime.MinValue)
                {
                    throw new InvalidOperationException("BaseEntity.Created can only be set once. Don't touch this property in manager code.");
                }

                this.createdDate = value;
            }
        }

        public virtual DateTime ModifiedDate
        {
            get
            {
                return this.modifiedDate;
            }

            set
            {
                this.modifiedDate = value;
            }
        }

        public virtual bool IsDeleted
        {
            get
            {
                return this.isDeleted;
            }

            set
            {
                this.isDeleted = value;
            }
        }
    }

}
