using Microsoft.EntityFrameworkCore;
using Netmine.InventoryManager.Web.Data;
using Netmine.InventoryManager.Web.Models;
using Netmine.InventoryManager.Web.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Netmine.InventoryManager.Web.Repository.EntityRepositories
{
    public class CargoRepository : MainRepository<Cargo, Guid>, ICargoRepository
    {
        public CargoRepository(ApplicationDbContext context) : base(context) { }

        public IEnumerable<Cargo> FindByArticle(Article article)
        {
            return GetAll().Where(x => x.Article == article);
        }
    }
}