using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using homework6_17.Data;
using homework6_17.Web.Models;

namespace homework6_17.Web.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]   
    public class CategoryController : ControllerBase
    {
        private readonly string _connectionString;
        public CategoryController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpGet]
        [Route("getcategories")]
        public List<Category> GetCategories()
        {
            var repo = new UserRepo(_connectionString);
            int id = repo.GetByEmail(User.Identity.Name).Id;
            var repo2 = new CategoryRepo(_connectionString);
            return repo2.GetCategoriesForUser(id);
        }

        [HttpPost]
        [Route("addcategory")]
        public void AddCategory(CategoryModel model)
        {   Category category = new Category();
            category.Name = model.Name;
            var repo = new UserRepo(_connectionString);
            category.UserId = repo.GetByEmail(User.Identity.Name).Id;
            var repo2 = new CategoryRepo(_connectionString);
            repo2.AddCategory(category);
        }


    }
}
