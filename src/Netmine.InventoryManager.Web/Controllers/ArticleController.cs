using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Netmine.InventoryManager.Data;

namespace Netmine.InventoryManager.Web.Controllers
{
    [Route("api/article")]
    public class ArticleController : Controller
    {
        private IRepository<Article> repoArticle;

        public ArticleController(IRepository<Article> repoArticle)
        {
            this.repoArticle = repoArticle;
        }

        [HttpGet]
        public IEnumerable<Article> Index()
        {
            return repoArticle.GetAll().ToList();
        }
    }
}