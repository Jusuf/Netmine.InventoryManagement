using Microsoft.EntityFrameworkCore;
using Netmine.InventoryManager.Web.Models;
using Netmine.InventoryManager.Web.Repository;
using Netmine.InventoryManager.Web.Repository.EntityRepositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Netmine.InventoryManager.Web.Repository.EntityRepositories
{
    public class ArticleRepository : MainRepository<Article, int>, IArticleRepository
    {
        public ArticleRepository(DbContext context) : base(context) { }

        public IEnumerable<Article> FindByName(string name)
        {
            return GetAll()
                .Where(x => x.Name.ToLowerInvariant()
                .Contains(name.ToLowerInvariant()));
        }
    }
}