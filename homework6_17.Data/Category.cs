using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace homework6_17.Data
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        [JsonIgnore]
        public List<Recipe> Recipes { get; set; }
    }
}
