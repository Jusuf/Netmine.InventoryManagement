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

namespace Netmine.InventoryManager.Web.Controllers
{
    [Route("api/[controller]")]
    public class OrderController : Controller
    {
        public IOrderRepository OrderRepository { get; set; }

        public OrderController([FromServices] IOrderRepository orderRepository)
        {
            OrderRepository = orderRepository;
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
    }
}