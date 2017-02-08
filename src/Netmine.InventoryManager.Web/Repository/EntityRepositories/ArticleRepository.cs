using Microsoft.EntityFrameworkCore;
using Netmine.InventoryManager.Web.Data;
using Netmine.InventoryManager.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Netmine.InventoryManager.Web.Repository.EntityRepositories
{
    public class ArticleRepository : MainRepository<Article, Guid>, IArticleRepository
    {
        public ArticleRepository(ApplicationDbContext context) : base(context) { }

        public IEnumerable<Article> FindByName(string name)
        {
            return GetAll()
                .Where(x => x.Name.ToLowerInvariant()
                .Contains(name.ToLowerInvariant()));
        }
    }
}