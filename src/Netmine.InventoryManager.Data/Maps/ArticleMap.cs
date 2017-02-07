using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Netmine.InventoryManager.Data
{
    public class ArticleMap
    {
        public ArticleMap(EntityTypeBuilder<Article> entityBuilder)
        {
            entityBuilder.HasKey(t => t.Id);
            entityBuilder.Property(t => t.Name).IsRequired();
            entityBuilder.Property(t => t.Number).IsRequired();
        }
    }
}