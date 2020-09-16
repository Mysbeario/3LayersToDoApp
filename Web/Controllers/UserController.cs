using System.Collections.Generic;
using BLL;
using Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers {
	[Route ("api/[controller]")]
	[ApiController]
	public class UserController : ControllerBase {
		private UserBLL service;
		public UserController () {
			this.service = new UserBLL ();
		}

		[HttpGet]
		public IEnumerable<User> GetUsers () {
			return this.service.GetAllUsers ().ToArray ();
		}
	}
}