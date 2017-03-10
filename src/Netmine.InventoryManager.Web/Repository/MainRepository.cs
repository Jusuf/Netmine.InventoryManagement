using Microsoft.EntityFrameworkCore;
using Netmine.InventoryManager.Web.Data;
using Netmine.InventoryManager.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Netmine.InventoryManager.Web.Repository
{
    public class MainRepository<TEntity, Tkey> : IMainRepository<TEntity, Tkey> where TEntity : BaseModel
    {
        private readonly ApplicationDbContext context;

        private readonly DbSet<TEntity> dbSet;

        public MainRepository(ApplicationDbContext context)
        {
            this.context = context;
            dbSet = context.Set<TEntity>();
        }

        public IQueryable<TEntity> Query()
        {
            return context
                .Set<TEntity>()
                .Where(e => e.IsDeleted == false).AsQueryable();
        }

        public IQueryable<TEntity> QueryIncludeDeleted()
        {
            return this.context
                .Set<TEntity>().AsQueryable();
        }

        public IQueryable<TEntity> GetAll()
        {
            return context.Set<TEntity>().ToList().AsQueryable();
        }

        public TEntity GetById(Tkey id)
        {
            return context.Set<TEntity>().Find(id);
        }

        public void Insert(TEntity entity)
        {
            dbSet.Add(entity);
        }

        public void Delete(Tkey id)
        {
            var entityToRemove = dbSet.Find(id);
            dbSet.Remove(entityToRemove);
        }

        public void Update(TEntity entity)
        {
            dbSet.Attach(entity).State = EntityState.Modified;
        }

        public IEnumerable<TEntity> Search(Expression<Func<TEntity, bool>> predicate)
        {
            return dbSet.Where(predicate);
        }

        public void Save()
        {
            context.SaveChanges();
        }

        private bool disposed;

        protected virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    context.Dispose();
                }
            }

            disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);

            GC.SuppressFinalize(this);
        }

    }
}