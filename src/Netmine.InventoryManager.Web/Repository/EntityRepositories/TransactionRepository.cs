using Microsoft.EntityFrameworkCore;
using Netmine.InventoryManager.Web.Data;
using Netmine.InventoryManager.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Netmine.InventoryManager.Web.Repository.EntityRepositories
{
    public class TransactionRepository : MainRepository<Transaction, Guid>, ITransactionRepository
    {
        public TransactionRepository(ApplicationDbContext context) : base(context) { }
        
    }
}