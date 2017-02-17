using Microsoft.EntityFrameworkCore;
using Netmine.InventoryManager.Web.Data;
using Netmine.InventoryManager.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Netmine.InventoryManager.Web.Repository.EntityRepositories
{
    public class RackRepository : MainRepository<Rack, Guid>, IRackRepository
    {
        public RackRepository(ApplicationDbContext context) : base(context) { }

        public IEnumerable<Rack> FindByName(string name)
        {
            return GetAll()
                .Where(x => x.Name.ToLowerInvariant()
                .Contains(name.ToLowerInvariant()));
        }
    }
}