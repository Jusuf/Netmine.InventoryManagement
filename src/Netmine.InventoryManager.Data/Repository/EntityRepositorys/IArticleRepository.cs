using Netmine.InventoryManager.Data.Model;
using System;
using System.Collections.Generic;

namespace Netmine.InventoryManager.Data.Repository.EntityRepositorys
{
    public interface IArticleRepository : IMainRepository<Article, int>
    {
        IEnumerable<Article> FindByName(string name);
    }
}