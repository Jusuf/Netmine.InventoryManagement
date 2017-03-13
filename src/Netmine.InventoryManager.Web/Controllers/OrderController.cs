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
using Newtonsoft.Json;

namespace Netmine.InventoryManager.Web.Controllers
{
    [Route("api/[controller]")]
    public class OrderController : Controller
    {
        public IOrderRepository OrderRepository { get; set; }
        public IOrderRowRepository OrderRowRepository { get; set; }
        public ICargoRepository CargoRepository { get; set; }
        public IArticleRepository ArticleRepository { get; set; }
        public ITransactionRepository TransactionRepository { get; set; }

        private UserManager<ApplicationUser> UserManager;

        public OrderController([FromServices]
            IOrderRepository orderRepository,
            IOrderRowRepository orderRowRepository,
            ICargoRepository cargoRepository,
            IArticleRepository articleRepository,
            ITransactionRepository transactionRepository,
            UserManager<ApplicationUser> userManager,
            IHttpContextAccessor contextAccessor)
        {
            UserManager = userManager;
            OrderRepository = orderRepository;
            OrderRowRepository = orderRowRepository;
            CargoRepository = cargoRepository;
            ArticleRepository = articleRepository;
            TransactionRepository = transactionRepository;
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

        [HttpPost]
        [Route("complete/", Name = "CompleteOrder")]
        public async Task<IActionResult> Post([FromBody] OrderDetailsViewModel order)
        {
            var currentUser = new ApplicationUser();
            var totalTakeAmount = 0;

            try
            {
                var user = await UserManager.GetUserAsync(User);
                currentUser = user;
            }
            catch (Exception)
            {
                return Unauthorized();
            }

            try
            {
                if (currentUser == null) return Unauthorized();
                //create transaction record for each cargo item
                foreach (var cargo in order.Cargo)
                {
                    if (cargo.TakeAmount == 0) break;

                    totalTakeAmount += cargo.TakeAmount;

                    var cargoObject = CargoRepository.Query()
                        .Where(x => x.Id == cargo.Id)
                        .Include(x => x.Rack)
                        .Include(x => x.Article)
                        .FirstOrDefault();

                    var articleObject = cargoObject.Article;

                    var transaction = new Transaction();
                    transaction.Article = articleObject;
                    transaction.Rack = cargoObject.Rack;
                    transaction.CreatedBy = currentUser;
                    transaction.TransactionType = TransactionTypes.Sent;
                    transaction.BatchNumber = cargoObject.BatchNumber;
                    transaction.OrderNumber = Convert.ToString(order.Id);
                    transaction.Amount = cargo.TakeAmount;
                    transaction.Date = DateTime.UtcNow;

                    TransactionRepository.Insert(transaction);
                    TransactionRepository.Save();
    
                    // Subtract the taken amount
                    cargoObject.Amount -= cargo.TakeAmount;

                    if (cargoObject.Amount <= 0)
                        CargoRepository.Delete(cargoObject.Id);
                    else
                        CargoRepository.Update(cargoObject);

                    CargoRepository.Save();
                }

                if (totalTakeAmount <= 0)
                {
                    return BadRequest();
                }

                // Set order status to completed
                var orderObject = OrderRepository.GetById(order.Id);
                orderObject.Status = OrderStatus.Completed;
                OrderRepository.Update(orderObject);
                OrderRepository.Save();

                // TODO
                //send mail to user (Order färdig)
                return Ok("Order completed.");
            }
            catch (Exception ex)
            {
                return Json("Error: " + ex);
            }

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
                        ArticleNumber = row.Article.Number,
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
                            RackName = item.Rack.Name,
                            TakeAmount = 0
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
                //kolla cargo om den returnerar rätt
                return Ok(orderDetails);
            }
            catch
            {
                return BadRequest();
            }
        }

    }
}