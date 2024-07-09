namespace homework6_17.Web.Models
{
    public class RecipePdfModel
    {
         public string Title { get; set; }
         public List<string>  Ingredients {get; set;}
         public List<string>   Steps {get; set;}
         public string ImageName{get; set;}
    }
}
