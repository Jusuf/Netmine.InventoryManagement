using Netmine.InventoryManager.Web.Models;
using System.Collections.Generic;

namespace Netmine.InventoryManager.Web.Data
{
    public interface ITodosRepository
    {
        IList<TodoItem> GetAllTodoItems();
        TodoItem GetTodoItemById(int id);
        long AddTodoItem(TodoItem todoItem);
        void DeleteTodoItem(int id);
        void MarkTodoItemAsDone(int id);
    }
}
