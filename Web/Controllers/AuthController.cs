using System;
using System.Collections.Generic;
using BLL;
using Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers {
	[Route ("/api/[controller]")]
	[ApiController]
	public class AuthController : ControllerBase {
		private UserBLL service;

		public AuthController () {
			this.service = new UserBLL ();
		}

		[HttpPost]
		[Route ("login")]
		public IActionResult Login (User user) {
			List<User> users = this.service.GetAllUsers ();

			foreach (User u in users) {
				if (u.Email == user.Email) {
					if (u.Password == user.Password) {
						Response.Cookies.Append ("cre.id", u.Id.ToString ());
						Response.Cookies.Append ("cre.role", u.Role.ToString ());
						return Ok ();
					}
					return Unauthorized ();
				}
			}
			return Unauthorized ();
		}
	}
}