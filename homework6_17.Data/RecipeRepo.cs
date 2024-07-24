using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace homework6_17.Data
{
    public class RecipeRepo
    {
        private readonly string _connectionString;
        public RecipeRepo(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Recipe> GetAll()
        {
            var context = new RecipeDataContext(_connectionString);
            return context.Recipes.Include(r => r.Category).Include(c => c.Category.User).Where(r => r.SharePublicly == true).Take(6).ToList();
        }

        public void AddRecipe(Recipe recipe)
        {
            var context = new RecipeDataContext(_connectionString);
            context.Recipes.Add(recipe);
            context.SaveChanges();
        }

        public List<Recipe> GetRecipesById(int id)
        {
            var context = new RecipeDataContext(_connectionString);
            return context.Recipes.Include(r => r.Category).Where(r => r.Category.UserId == id).ToList();
        }

        public Recipe GetRecipe(int id, int userId)
        {
            var context = new RecipeDataContext(_connectionString);
            Recipe r = context.Recipes.Include(r => r.Category).Include(c => c.Category.User).FirstOrDefault(r => r.Id == id);
            if (r.SharePublicly || (userId != 0 && userId == r.Category.UserId))
            {
                return r;
            }

            return null;
        }

        public void AddComment(Comment comment)
        {
            var context = new RecipeDataContext(_connectionString);
            context.Comments.Add(comment);
            context.SaveChanges();
        }

        public List<Comment> GetComments(int id)
        {
            var context = new RecipeDataContext(_connectionString);
            return context.Comments.Where(c => c.RecipeId == id).OrderByDescending(c => c.Id).ToList();
        }

        public List<Recipe> Search(string text)
        {
            var context = new RecipeDataContext(_connectionString);
            return context.Recipes.Include(r => r.Category).Include(c => c.Category.User).Where(r => r.Title.Contains(text) || r.Category.Name.Contains(text)).Include(r=>r.Category).ToList();

        }

        public List<Recipe> SortMostRecent()
        {
            var context = new RecipeDataContext (_connectionString);
            return context.Recipes.Include(r => r.Category).Include(c => c.Category.User).Where(r => r.SharePublicly == true).OrderByDescending(r => r.Id).ToList();
        }
        public List<Recipe> SortMostLiked()
        {
            var context = new RecipeDataContext(_connectionString);
            return context.Recipes.Include(r => r.Category).Include(c => c.Category.User).Where(r => r.SharePublicly == true).OrderByDescending(r => r.Rating).ToList();
        }
        public List<Recipe> SortAtoZ()
        {
            var context = new RecipeDataContext(_connectionString);
            return context.Recipes.Include(r => r.Category).Include(c => c.Category.User).Where(r => r.SharePublicly == true).OrderBy(r => r.Title).ToList();
        }


        public void UpdateRecipe(int id, decimal rating)
        {
            var context = new RecipeDataContext(_connectionString);
            var recipe = context.Recipes.FirstOrDefault(r => r.Id == id);
            recipe.Rating = rating;
            context.Recipes.Update(recipe);
            context.SaveChanges();
        }
    }

}