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
    public class RackController : Controller
    {
        public IRackRepository RackRepository { get; set; }

        public RackController([FromServices] IRackRepository rackRepository)
        {
            RackRepository = rackRepository;
        }

        [HttpGet]
        public IEnumerable<Rack> Get()
        {
            return RackRepository.Query().ToList();
        }

        [HttpGet]
        [Route("{id}")]
        public Rack Get(Guid id)
        {
            return RackRepository.GetById(id);
        }

        [HttpPost]
        public IActionResult Post([FromBody] RackViewModel model)
        {
            if (!ModelState.IsValid) return BadRequest();

            var createdDate = DateTime.Now;

            Rack rack = new Rack()
            {
                Name = model.Name,
                CreatedDate = createdDate,
                ModifiedDate = createdDate
            };

            try
            {
                RackRepository.Insert(rack);
                RackRepository.Save();
                var url = Url.RouteUrl("", new { id = rack.Id }, Request.Scheme,
                Request.Host.ToUriComponent());
                return Created(url, rack);

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
                var rackId = Guid.Parse(id);
                if (RackRepository.GetById(rackId) == null) return NotFound();
                Rack rack = RackRepository.GetById(rackId);
                rack.IsDeleted = true;
                RackRepository.Save();
                return new StatusCodeResult(200);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPut]
        public IActionResult Put([FromBody] Rack rack)
        {
            if (!ModelState.IsValid) return BadRequest();

            rack.ModifiedDate = DateTime.Now;
            try
            {
                RackRepository.Update(rack);
                RackRepository.Save();
                var url = Url.RouteUrl("", new { id = rack.Id }, Request.Scheme,
                Request.Host.ToUriComponent());
                return Created(url, rack);
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}