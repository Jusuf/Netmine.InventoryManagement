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
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Http;

namespace Netmine.InventoryManager.Web.Controllers
{
    [Route("api/[controller]")]
    public class CargoController : Controller
    {
        public IOrderRepository OrderRepository { get; set; }
        public IOrderRowRepository OrderRowRepository { get; set; }
        public ICargoRepository CargoRepository { get; set; }

        private UserManager<ApplicationUser> UserManager;

        public CargoController([FromServices]
            IOrderRepository orderRepository,
            IOrderRowRepository orderRowRepository,
            ICargoRepository cargoRepository,
            UserManager<ApplicationUser> userManager, 
            IHttpContextAccessor contextAccessor)
        {
            UserManager = userManager;
            OrderRepository = orderRepository;
            OrderRowRepository = orderRowRepository;
            CargoRepository = cargoRepository;
        }

        [HttpGet]
        public IEnumerable<Cargo> Get()
        {
            return CargoRepository.GetAll();
        }

        [HttpGet]
        [Route("{id}")]
        public Cargo Get(Guid id)
        {
            return CargoRepository.GetById(id);
        }

        [HttpGet]
        [Route("article/{id}", Name = "GetByArticleId")]
        public IEnumerable<Cargo> Article(Guid id)
        {
            return CargoRepository.Query()
                .Where(x => x.Article.Id == id);
        }

    }
}