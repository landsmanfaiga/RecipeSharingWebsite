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
            var repo = new RecipeRepo(_connectionString);
            repo.AddRecipe(recipe);
        }
    }
}
