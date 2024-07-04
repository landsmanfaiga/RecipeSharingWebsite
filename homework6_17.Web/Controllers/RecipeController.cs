using homework6_17.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace homework6_17.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipeController : ControllerBase
    {
        private readonly string _connectionString;
        public RecipeController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpGet]
        [Route("getrecipes")]
        public List<Recipe> GetRecipes()
        {
            var repo = new RecipeRepo(_connectionString);
            return repo.GetAll();
        }

        [HttpPost]
        [Authorize]
        [Route("addrecipe")]
        public void AddRecipe(Recipe recipe)
        {
            var image = ConvertFromBase64(recipe.ImageUrl);
            var fileName = $"{Guid.NewGuid()}";
            recipe.ImageUrl = fileName;
            System.IO.File.WriteAllBytes($"uploads/{fileName}.jpg", image);
            var repo = new RecipeRepo(_connectionString);
            repo.AddRecipe(recipe);
        }

        [HttpGet]
        [Authorize]
        [Route("getrecipesforme")]
        public List<Recipe> GetRecipesForMe()
        {
            var repo1 = new UserRepo(_connectionString);
            int id = repo1.GetByEmail(User.Identity.Name).Id;
            var repo2 = new RecipeRepo(_connectionString);
            return repo2.GetRecipesById(id);
        }

        [HttpGet("ViewImage")]
        public IActionResult ViewImage(string imageUrl)
        {
            var bytes = System.IO.File.ReadAllBytes($"Uploads/{imageUrl}.jpg");
            return File(bytes, "image/jpeg");
        }

        private byte[] ConvertFromBase64(string data)
        {
            int indexOfComma = data.IndexOf(',');
            string base64 = data.Substring(indexOfComma + 1);
            return Convert.FromBase64String(base64);
        }
    }
}
