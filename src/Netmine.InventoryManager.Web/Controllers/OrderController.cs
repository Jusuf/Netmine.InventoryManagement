using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Netmine.InventoryManager.Web.Models;
using Netmine.InventoryManager.Web.Repository.EntityRepositories;
using Netmine.InventoryManager.Web.ViewModels;
using Netmine.InventoryManager.Web.Models.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace Netmine.InventoryManager.Web.Controllers
{
    [Route("api/[controller]")]
    public class OrderController : Controller
    {
        public IOrderRepository OrderRepository { get; set; }
        public IOrderRowRepository OrderRowRepository { get; set; }
        public ICargoRepository CargoRepository { get; set; }

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
        public async Task<dynamic> Details(Guid id)
        {
            var user = await UserManager.GetUserAsync(User);

            var cargoViewModels = new List<CargoViewModel>();
            var orderRowViewModels = new List<OrderRowViewModel>();

            try
            {

                var order = OrderRepository.Query()
                    .Where(x => x.Id == id)
                    .Include(x => x.CreatedBy)
                    .Include(x => x.Recipient)
                        .ThenInclude(x => x.Address)
                    .FirstOrDefault();

                var orderRows = OrderRowRepository.Query()
                     .Where(x => x.Order.Id == id)
                    .Include(x => x.Article)
                    .ToList();


                foreach (var row in orderRows)
                {
                    orderRowViewModels.Add(new OrderRowViewModel
                    {
                        Id = row.Id,
                        Amount = row.Amount,
                        ArticleName = row.Article.Name
                    });

                    var cargo = CargoRepository.Query()
                        .Include(x => x.Rack)
                        .Where(x => x.Article == row.Article)
                        .ToList();

                    foreach (var item in cargo)
                    {
                        cargoViewModels.Add(new CargoViewModel
                        {
                            Id = item.Id,
                            Amount = item.Amount,
                            BatchNumber = item.BatchNumber,
                            BlockedAmount = item.BlockedAmount,
                            RackName = item.Rack.Name
                        });
                    }
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
                    OrderRows = orderRowViewModels,
                    Cargo = cargoViewModels
                };

                return Ok(orderDetails);
            }
            catch
            {
                return BadRequest();
            }
        }

    }
}