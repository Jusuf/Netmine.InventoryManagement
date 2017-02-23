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
        public ICargoRepository CargoRepository { get; set; }

        private IEnumerable<CargoViewModel> Cargo { get; set; }

        private IEnumerable<OrderRowViewModel> OrderRows { get; set; }

        private UserManager<ApplicationUser> UserManager;

        public OrderController([FromServices]
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
        public IEnumerable<Order> Get()
        {
            return OrderRepository.GetAll();
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
        [Route("rows/{id}", Name = "GetOrderRows")]
        public IEnumerable<OrderRow> Rows(Guid id)
        {
            return OrderRowRepository.Query()
                .Where(x => x.Order.Id == id).ToList();
        }

        [HttpGet]
        [Route("details/{id}", Name = "GetDetails")]
        public dynamic Details(Guid id)
        {
            try
            {
                var order = OrderRepository.Query()
                    .Include("CreatedBy")
                    .Include("Recipient")
                    .Include("Recipient.Address")
                    .Where(x => x.Id == id).FirstOrDefault();

                var orderRows = OrderRowRepository.Query()
                    .Include("Article")
                    .Where(x => x.Order.Id == id)
                    .ToList();

                OrderRows = getOrderRowsViewModels(orderRows, id);

                foreach (var row in orderRows)
                {
                    Cargo = getCargoViewModels(row.Article);
                }

                var orderDetails = new OrderDetailsViewModel
                {
                    Id = order.Id,
                    Date = order.CreatedDate,
                    CreatedByUserName = order.CreatedBy.FullName,
                    RecipientName = order.Recipient.FullName,
                    Address = order.Recipient.Address.Street,
                    ZipCode = order.Recipient.Address.ZipCode,
                    City = order.Recipient.Address.City,
                    Message = order.Message,
                    OrderRows = OrderRows,
                    Cargo = Cargo
                };

                return Ok(orderDetails);
            }
            catch
            {
                return BadRequest();
            }
        }

        private IEnumerable<OrderRowViewModel> getOrderRowsViewModels(List<OrderRow> orderRows, Guid id)
        {
            foreach (var row in orderRows)
            {
                Cargo = getCargoViewModels(row.Article);

                yield return (new OrderRowViewModel
                {
                    Id = row.Id,
                    Amount = row.Amount,
                    ArticleName = row.Article.Name
                });
            }
        }

        private IEnumerable<CargoViewModel> getCargoViewModels(Article article)
        {
            var cargo = CargoRepository.Query()
                .Include("Rack")
                .Where(x => x.Article == article)
                .ToList();

            foreach(var item in cargo)
            {
                yield return (new CargoViewModel
                {
                    Id = item.Id,
                    Amount = item.Amount,
                    BatchNumber = item.BatchNumber,
                    BlockedAmount = item.BlockedAmount,
                    RackName = item.Rack.Name
                });
            }
        }
    }
}