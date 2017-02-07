using Netmine.InventoryManager.Web.Models;
using System;
using System.Collections.Generic;

namespace Netmine.InventoryManager.Web.Repository.EntityRepositories
{
    public interface IArticleRepository : IMainRepository<Article, int>
    {
        IEnumerable<Article> FindByName(string name);
    }
}