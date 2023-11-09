using System;
using demo_0.Dto;
using demo_0.Persistence;
using demo_0.Shared;
using Microsoft.EntityFrameworkCore;

namespace demo_0.Application
{
    public class UserApplication : IUserApplication
    {
        private readonly MoviesDbContext _context;

        public UserApplication(MoviesDbContext context)
        {
            _context = context;

        }

        public async Task<UserDto> GetById(int id)
        {

            var user = await _context.Users.FirstAsync(x => x.Id == id);


            return new UserDto { Id = user.Id, Name = user.Name, Email = user.Email };
        }

    }
}

