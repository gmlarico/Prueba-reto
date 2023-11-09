using System;
namespace demo_0.Domain.Entities
{
	public class User: BaseEntity
    {
	
		public string? Name { get; set; }
		public string? Email { get; set; }
		public string? Password { get; set; }
	}
}


