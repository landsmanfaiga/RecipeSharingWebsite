using homework6_17.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using homework6_17.Web.Models;
using PuppeteerSharp;
using RazorLight;
using System.Reflection;
using System.Text;
using System.Text.Json;
using Newtonsoft.Json.Linq;

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

        [HttpGet]
        [Route("getrecipe")]
        public Recipe GetRecipe(int id)
        {
            var repo = new RecipeRepo(_connectionString);
            var repo1 = new UserRepo(_connectionString);
            var user = repo1.GetByEmail(User.Identity.Name);
            var userId = 0;
            if (user != null)
            {
                userId = user.Id;
            }
             return repo.GetRecipe(id, userId);
        }


       

        [HttpGet]
        [Route("getrating")]
        public decimal GetRating(int id)
        {
            var repo = new RecipeRepo(_connectionString);
            List<Comment> comments = repo.GetComments(id);
            if (comments.Count == 0)
            {
                return 0;
            }
            int r = 0;
            foreach (var item in comments)
            {
                r += item.Rate;
            }
            decimal Rating = r / comments.Count;
            repo.UpdateRecipe(id, Rating);
            return r / comments.Count;
        }



        [HttpPost]
        [Authorize]
        [Route("addcomment")]
        public void AddComment(Comment comment)
        {
            var repo = new RecipeRepo(_connectionString);
            repo.AddComment(comment);
        }

        [HttpGet]
        [Route("getcomments")]
        public List<Comment> GetComments(int id)
        {
            var repo = new RecipeRepo(_connectionString);
            return repo.GetComments(id);
        }


        [HttpGet("ViewImage")]
        public IActionResult ViewImage(string imageUrl)
        {
            var bytes = System.IO.File.ReadAllBytes($"Uploads/{imageUrl}.jpg");
            return File(bytes, "image/jpeg");
        }

        [HttpGet("GeneratePdf")]
        public async Task<IActionResult> GeneratePDF(string title, string ingredients, string steps, string image)

        {
            foreach (var i in ingredients.Split(',').ToList())
            {
                await Console.Out.WriteLineAsync(i);
            }
            await Console.Out.WriteLineAsync(image);
            var model = new RecipePdfModel

            {
                Title = title,
                Ingredients = ingredients.Split(',').ToList(),
                Steps = steps.Split(",").ToList(),
                ImageName = $"{image}.jpg"
            };

            var engine = new RazorLightEngineBuilder()

                .UseFileSystemProject(Path.Combine(Directory.GetCurrentDirectory(), "Pages"))
                .UseMemoryCachingProvider()
                .Build();

            string htmlString = await engine.CompileRenderAsync("/RecipePdf.cshtml", model);

            var pdfBytes = await GeneratePdfAsync(htmlString);

            return File(pdfBytes, "application/pdf", $"{title}.pdf");

        }

        private static async Task<byte[]> GeneratePdfAsync(string content)
        {
            await new BrowserFetcher().DownloadAsync();

            using var browser = await Puppeteer.LaunchAsync(new LaunchOptions
            {
                Headless = true
            });
            using var page = await browser.NewPageAsync();
            await page.SetContentAsync(content);

            byte[] bytes = await page.PdfDataAsync(new PdfOptions
            {
                Format = PuppeteerSharp.Media.PaperFormat.A4
            });

            return bytes;
        }

        private byte[] ConvertFromBase64(string data)
        {
            int indexOfComma = data.IndexOf(',');
            string base64 = data.Substring(indexOfComma + 1);
            return Convert.FromBase64String(base64);
        }
    }
}
