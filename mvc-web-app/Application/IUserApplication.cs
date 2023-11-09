using System;
using demo_0.Domain.Entities;
using demo_0.Dto;

namespace demo_0.Application
{
	public interface IUserApplication
	{


        Task<UserDto> GetById(int id);

    }
}

