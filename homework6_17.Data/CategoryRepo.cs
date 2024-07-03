using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace homework6_17.Data
{
    public class CategoryRepo
    {
        private readonly string _connectionString;
        public CategoryRepo(string connectionString)
        {
             _connectionString = connectionString;
        }

        public List<Category> GetCategoriesForUser(int id) 
        {
            var context = new RecipeDataContext(_connectionString);
            return context.Categories.Where(c=> c.UserId == id).Include(c => c.Recipes).ToList();
        }

        public void AddCategory(Category category)
        {
            var context = new RecipeDataContext(_connectionString);
            context.Categories.Add(category);
            context.SaveChanges();
        }


    }
}
