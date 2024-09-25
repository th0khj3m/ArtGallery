using ArtGallery.WebAPI.Data;
using ArtGallery.WebAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ArtGallery.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // /api/users
    public class UsersController : Controller
    {
        private readonly DataContext _context;

        public UsersController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]   
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            
            return Ok(users);
        }  
        
        [HttpGet("{id:int}")] // api/users/3
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null) return NotFound();

            return user;
        }
    }
}
