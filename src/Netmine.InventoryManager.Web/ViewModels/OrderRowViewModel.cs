using Netmine.InventoryManager.Web.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Netmine.InventoryManager.Web.ViewModels
{
    public class OrderRowViewModel
    {
        public Guid Id { get; set; }

        public decimal Amount { get; set; }

        public string ArticleNumber { get; set; }

        public string ArticleName { get; set; }
    }
}
