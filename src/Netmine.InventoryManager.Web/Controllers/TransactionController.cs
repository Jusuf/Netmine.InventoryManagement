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
using Netmine.InventoryManager.Web.Models.Enums;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Http;

namespace Netmine.InventoryManager.Web.Controllers
{
    [Route("api/[controller]")]
    public class TransactionController : Controller
    {
        private UserManager<ApplicationUser> UserManager;

        public ITransactionRepository TransactionRepository { get; set; }

        public IArticleRepository ArticleRepository { get; set; }

        public IRackRepository RackRepository { get; set; }

        public TransactionController([FromServices]
            UserManager<ApplicationUser> userManager,
            ITransactionRepository transactionRepository,
            IArticleRepository articleRepository,
            IRackRepository rackRepository)
        {
            UserManager = userManager;
            TransactionRepository = transactionRepository;
            ArticleRepository = articleRepository;
            RackRepository = rackRepository;
        }

        [HttpGet]
        public IEnumerable<Transaction> Get()
        {
            return TransactionRepository.Query().ToList();
        }

        [HttpGet]
        [Route("{id}")]
        public Transaction Get(Guid id)
        {
            return TransactionRepository.GetById(id);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] TransactionViewModel model)
        {
            if (!ModelState.IsValid) return BadRequest();
            var createdDate = DateTime.Now;

            Article article = new Article();

            if (!String.IsNullOrEmpty(model.ArticleId))
            {
                article = this.ArticleRepository.GetById(Guid.Parse(model.ArticleId));
            }
            else
            {
                Article newArticle = new Article()
                {
                    ModifiedDate = createdDate,
                    CreatedDate = createdDate,
                    Name = model.ArticleName,
                    Number = model.ArticleNumber,
                    Unit = Units.Kilogram
                };

                ArticleRepository.Insert(newArticle);
                ArticleRepository.Save();

                article = ArticleRepository.GetById(newArticle.Id);
            }

            Rack rack = this.RackRepository.GetById(Guid.Parse(model.RackId));
            var user = await UserManager.GetUserAsync(User);

            Transaction transaction = new Transaction()
            {
                Article = article,
                CreatedDate = createdDate,
                ModifiedDate = createdDate,
                Rack = rack,
                CreatedBy = user,
                OrderNumber = model.OrderNumber,
                BatchNumber = model.BatchNumber,
                TransactionType = model.TransactionType,
                Amount = model.Amount,
                Date = model.Date
            };

            try
            {
                TransactionRepository.Insert(transaction);
                TransactionRepository.Save();
                var url = Url.RouteUrl("", new { id = transaction.Id }, Request.Scheme,
                Request.Host.ToUriComponent());

                return Created(url, transaction);

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
                var transactionId = Guid.Parse(id);
                if (TransactionRepository.GetById(transactionId) == null) return NotFound();
                Transaction transaction = TransactionRepository.GetById(transactionId);
                transaction.IsDeleted = true;
                TransactionRepository.Save();
                return new StatusCodeResult(200);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPut]
        public IActionResult Put([FromBody] Transaction transaction)
        {
            if (!ModelState.IsValid) return BadRequest();

            transaction.ModifiedDate = DateTime.Now;

            try
            {
                TransactionRepository.Update(transaction);
                TransactionRepository.Save();
                var url = Url.RouteUrl("", new { id = transaction.Id }, Request.Scheme,
                Request.Host.ToUriComponent());
                return Created(url, transaction);
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}