namespace ArtGallery.WebAPI.Models
{
    public class User
    {
        public int Id { get; set; }
        public string UserName { get; set; }

        public User(string userName)
        {
            if (string.IsNullOrEmpty(userName))
            {
                throw new ArgumentNullException("UserName is required", nameof(userName));
            }
            UserName = userName;
        }
    }
}
