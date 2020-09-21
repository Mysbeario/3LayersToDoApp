using System.Collections.Generic;
using BLL;
using Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers {
	[Route ("/api/[controller]")]
	[ApiController]
	public class TaskController : ControllerBase {
		private TaskBLL service;

		public TaskController () {
			this.service = new TaskBLL ();
		}

		[HttpGet]
		public IEnumerable<Task> GetAllTasks () {
			return this.service.GetAllTasks ().ToArray ();
		}
	}
}