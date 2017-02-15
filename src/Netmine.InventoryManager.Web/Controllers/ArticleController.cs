using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Netmine.InventoryManager.Web.Data;
using Netmine.InventoryManager.Web.Models;
using System.Globalization;
using Netmine.InventoryManager.Web.Repository.EntityRepositories;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Netmine.InventoryManager.Web.ViewModels;

namespace Netmine.InventoryManager.Web.Controllers
{
    [Route("api/[controller]")]
    public class ArticleController : Controller
    {
        public IArticleRepository ArticleRepository { get; set; }

        public ArticleController([FromServices] IArticleRepository articleRepository)
        {
            ArticleRepository = articleRepository;
        }

        [HttpGet]
        public IEnumerable<Article> Get()
        {
            return ArticleRepository.Query().ToList();
        }

        [HttpGet("{id}")]
        //[Route("{id}", Name = "GetTodoItemByIdRoute")]
        public Article Get(Guid id)
        {
            return ArticleRepository.GetById(id);
        }

        [HttpPost]
        public IActionResult Post([FromBody] ArticleViewModel model)
        {
            if (!ModelState.IsValid) return BadRequest();

            var createdDate = DateTime.Now;

            Article article = new Article()
            {
                Name = model.Name,
                Number = Int32.Parse(model.Number),
                CreatedDate = createdDate,
                ModifiedDate = createdDate
            };

            try
            {
                ArticleRepository.Insert(article);
                ArticleRepository.Save();
                var url = Url.RouteUrl("", new { id = article.Id }, Request.Scheme,
                Request.Host.ToUriComponent());
                return Created(url, article);

            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult Delete(string id)
        {
            try
            {
                var articleId = Guid.Parse(id);
                if (ArticleRepository.GetById(articleId) == null) return NotFound();
                Article article = ArticleRepository.GetById(articleId);
                article.IsDeleted = true;
                ArticleRepository.Save();
                return new StatusCodeResult(200);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPut]
        public IActionResult Put([FromBody] Article article)
        {
            if (!ModelState.IsValid) return BadRequest();

            article.ModifiedDate = DateTime.Now;
            try
            {
                ArticleRepository.Update(article);
                ArticleRepository.Save();
                var url = Url.RouteUrl("", new { id = article.Id }, Request.Scheme,
                Request.Host.ToUriComponent());
                return Created(url, article);
            }
            catch(Exception e)
            {
                return BadRequest();
            }
        }
    }
}