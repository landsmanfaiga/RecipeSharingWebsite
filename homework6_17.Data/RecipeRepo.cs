﻿using Microsoft.EntityFrameworkCore;
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
            return context.Recipes.Include(r => r.Category).Where(r => r.SharePublicly == true).Take(6).ToList();
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
            Recipe r = context.Recipes.Include(r => r.Category).FirstOrDefault(r => r.Id == id);
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
            return context.Comments.Where(c => c.RecipeId == id).ToList();
        }
    }

}