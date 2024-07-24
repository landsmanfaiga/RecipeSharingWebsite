using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace homework6_17.Data
{
    public class Recipe
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public string Ingredients { get; set; }
        public string Steps {  get; set; }
        public string ImageUrl { get; set; }
        public bool SharePublicly { get; set; }
        public decimal Rating { get; set; }

        [JsonIgnore]
        public List<Comment> Comments { get; set; }


    }

    public class Comment
    {
        public int Id { get; set; }
        public string Commenter {  get; set; }
        public string Description {  get; set; }
        public int RecipeId { get; set; }
        public int Rate { get; set; }
    }
}
