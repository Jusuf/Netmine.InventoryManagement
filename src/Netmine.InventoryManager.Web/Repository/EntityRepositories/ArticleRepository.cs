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
            return Query()
                .Where(x => x.Name.ToLowerInvariant()
                .Contains(name.ToLowerInvariant()));
        }

        public IEnumerable<Article> FindByNumber(string number)
        {
            return Query()
                 .Where(x => x.Number.ToLowerInvariant()
                 .Contains(number.ToLowerInvariant()));
        }
    }
}