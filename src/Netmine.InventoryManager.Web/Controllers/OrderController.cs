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
    public class OrderController : Controller
    {
        public IOrderRepository OrderRepository { get; set; }

        public IOrderRowRepository OrderRowRepository { get; set; }

        private UserManager<ApplicationUser> UserManager;

        public OrderController([FromServices]
            IOrderRepository orderRepository,
            IOrderRowRepository orderRowRepository,
            UserManager<ApplicationUser> userManager, 
            IHttpContextAccessor contextAccessor)
        {
            UserManager = userManager;
            OrderRepository = orderRepository;
            OrderRowRepository = orderRowRepository;
        }

        [HttpGet]
        public IEnumerable<Order> Get()
        {
            return OrderRepository.Query().ToList();
        }

        [HttpGet("{status:int}")]
        [Route("{status}", Name = "GetByStatus")]
        public IEnumerable<Order> GetByStatus(OrderStatus status)
        {
            switch (status)
            {
                case OrderStatus.New:
                    return OrderRepository.GetNewOrders();
                case OrderStatus.Active:
                    return OrderRepository.GetActiveOrders();
                case OrderStatus.Completed:
                    return OrderRepository.GetCompletedOrders();
                default:
                    return OrderRepository.GetAll();
            }
        }

        [HttpGet]
        [Route("{id}")]
        public Order Get(Guid id)
        {
            return OrderRepository.GetById(id);
        }

        [HttpGet]
        [Route("details/{id}", Name = "GetDetails")]
        public async Task<dynamic> Details(Guid id)
        {
            try
            {
                var user = await UserManager.GetUserAsync(User);

                var order = OrderRepository.Query()
                    .Include("CreatedBy")
                    .Include("Recipient")
                    .Include("Recipient.Address")
                    .Where(x => x.Id == id).FirstOrDefault();

                //var orderRows = OrderRowRepository.Query().Where(x => x.Order.Id == id).ToList();
                //get all orderrows from transations with this order id
                //var transactions..=

                var viewModel = new OrderDetailsViewModel
                {
                    Id = order.Id,
                    Date = order.CreatedDate,
                    CreatedByUserName = order.CreatedBy.FullName,
                    RecipientName = order.Recipient.FullName,
                    Address = order.Recipient.Address.Street,
                    ZipCode = order.Recipient.Address.ZipCode,
                    City = order.Recipient.Address.City,
                    Message = order.Message,
                    OrderRows = orderRows
                };

                return Ok(viewModel);
            }
            catch
            {
                return BadRequest();
            }
        }
        
    }
}