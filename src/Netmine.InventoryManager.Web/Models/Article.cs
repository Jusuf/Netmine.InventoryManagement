﻿using Netmine.InventoryManager.Web.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Netmine.InventoryManager.Web.Models
{
    public class Article : BaseModel
    {
        public string Name { get; set; }

        public string Number { get; set; }
        [Required]
        public Units Unit { get; set; }
    }
}
