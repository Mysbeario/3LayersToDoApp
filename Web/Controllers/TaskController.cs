using System;
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
			int role = Int16.Parse (Request.Cookies["cre.role"]);
			int id = Int16.Parse (Request.Cookies["cre.id"]);
			List<Task> result = this.service.GetAllTasks ();

			if (role == 1)
				return result.ToArray ();
			else {
				return result
					.FindAll (t => !t.IsPrivate ||
						t.Owner.Id == id ||
						t.Partners.Exists (p => p.Id == id))
					.ToArray ();
			}
		}

		[HttpPost]
		public int AddNewTask (Task task) {
			return this.service.AddTask (task);
		}

		[HttpPut]
		public void UpdateTask (Task task) {
			this.service.UpdateTask (task);
		}

		[HttpDelete ("{id}")]
		public void DeleteTask (int id) {
			this.service.DeleteTask (id);
		}

		[HttpGet ("{id}")]
		public Task GetTaskById (int id) {
			return this.service.GetTaskById (id);
		}
	}
}