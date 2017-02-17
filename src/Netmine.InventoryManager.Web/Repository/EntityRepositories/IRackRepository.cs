using Netmine.InventoryManager.Web.Models;
using System;
using System.Collections.Generic;

namespace Netmine.InventoryManager.Web.Repository.EntityRepositories
{
    public interface IRackRepository : IMainRepository<Rack, Guid>
    {
        IEnumerable<Rack> FindByName(string name);
    }
}