using Netmine.InventoryManager.Web.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Netmine.InventoryManager.Web.ViewModels
{
    public class OrderDetailsViewModel
    {
        public Guid Id { get; set; }

        [Display(Name = "Datum")]
        public DateTime Date { get; set; }

        [Display(Name = "Användare")]
        public string CreatedByUserName { get; set; }

        [Display(Name = "Mottagare")]
        public string RecipientName { get; set; }

        [Display(Name = "Adress")]
        public string Address { get; set; }

        [Display(Name = "Postnr")]
        public int ZipCode { get; set; }

        [Display(Name = "Ort")]
        public string City { get; set; }

        [Display(Name = "Meddelande")]
        public string Message { get; set; }

        public List<OrderRowViewModel> OrderRows { get; set; }

        public List<CargoViewModel> Cargo { get; set; }
    }
}
