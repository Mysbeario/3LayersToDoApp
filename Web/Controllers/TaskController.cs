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

		[HttpPost]
		public void AddNewTask (Task task) {
			this.service.AddTask (task);
		}

		[HttpPut]
		public void UpdateTask (Task task) {
			this.service.UpdateTask (task);
		}

		[HttpDelete ("{id}")]
		public void DeleteTask (int id) {
			this.service.DeleteTask (id);
		}
	}
}