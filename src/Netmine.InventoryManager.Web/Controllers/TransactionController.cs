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
    public class TransactionController : Controller
    {
        public ITransactionRepository TransactionRepository { get; set; }

        public TransactionController([FromServices] ITransactionRepository transactionRepository)
        {
            TransactionRepository = transactionRepository;
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
        public IActionResult Post([FromBody] TransactionViewModel model)
        {
            if (!ModelState.IsValid) return BadRequest();

            var createdDate = DateTime.Now;

            Transaction transaction = new Transaction()
            {
                CreatedDate = createdDate,
                ModifiedDate = createdDate
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