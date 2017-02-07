using Microsoft.EntityFrameworkCore;
using Netmine.InventoryManager.Data;
using Netmine.InventoryManager.Data.Model;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Netmine.InventoryManager.Data.Repository.EntityRepositorys
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