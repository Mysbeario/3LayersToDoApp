using System.Collections.Generic;
using BLL;
using Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers {
	[Route ("/api/[controller]")]
	[ApiController]
	public class UserController : ControllerBase {
		private UserBLL service;

		public UserController () {
			this.service = new UserBLL ();
		}

		[HttpGet]
		public IEnumerable<User> GetAllUsers () {
			return this.service.GetAllUsers ().ToArray ();
		}

		[HttpPost]
		public int AddUser (User user) {
			return this.service.AddUser (user);
		}

		[HttpPut]
		public void UpdateUser (User user) {
			this.service.UpdateUser (user);
		}

		[HttpDelete ("{id}")]
		public void DeleteUser (int id) {
			this.service.DeleteUser (id);
		}

		[HttpGet ("{id}")]
		public User GetUserById (int id) {
			return this.service.GetUserById (id);
		}
	}
}