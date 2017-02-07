﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Netmine.InventoryManager.Data.Model
{
    public class Article
    {
        public Guid Id { get; set; }

        public string Name  { get; set; }

        public int Number { get; set; }
    }
}
