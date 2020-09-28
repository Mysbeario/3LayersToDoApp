using System;
using System.Collections.Generic;
using System.IO;
using BLL;
using Core.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers {
	[Route ("/api/[controller]")]
	[ApiController]
	public class TaskController : ControllerBase {
		private TaskBLL service;

		public TaskController () {
			this.service = new TaskBLL ();
		}

		private void UploadImage (Task task, IFormFile[] files) {
			task.Images = files.Length;

			for (int i = 0; i < files.Length; i++) {
				byte[] image;
				string path = $"../DAL/Images/{task.Id}_{i}";

				using (var memoryStream = new MemoryStream ()) {
					files[i].CopyTo (memoryStream);
					image = memoryStream.ToArray ();
				}

				using (FileStream fs = System.IO.File.Create (path)) {
					fs.Write (image, 0, image.Length);
				}
			}
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
		public int AddTask (Task task, IFormFile[] files) {
			this.UploadImage (task, files);
			return this.service.AddTask (task);
		}

		[HttpPut]
		public void UpdateTask (Task task, IFormFile[] files) {
			this.UploadImage (task, files);
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