﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Netmine.InventoryManager.Web.Models
{
    [Table("Cargo")]
    public class Cargo : BaseModel
    {

        public string BatchNumber { get; set; }

        [Required]
        public decimal Amount { get; set; }

        public decimal BlockedAmount { get; set; }

        [Required]
        public Rack Rack { get; set; }

        [Required]
        public Article Article { get; set; }
    }
}
