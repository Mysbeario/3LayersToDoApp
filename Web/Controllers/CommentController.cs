using System.Collections.Generic;
using BLL;
using Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers {
	[Route ("/api/[controller]")]
	[ApiController]
	public class CommentController : ControllerBase {
		private CommentBLL service;

		public CommentController () {
			this.service = new CommentBLL ();
		}

		[HttpGet]
		public IEnumerable<Comment> GetAllComments () {
			return this.service.GetAllComments ().ToArray ();
		}

		[HttpPost]
		public int AddComment (Comment comment) {
			return this.service.AddComment (comment);
		}

		[HttpPut]
		public void UpdateComment (Comment comment) {
			this.service.UpdateComment (comment);
		}

		[HttpDelete ("{id}")]
		public void DeleteComment (int id) {
			this.service.DeleteComment (id);
		}

		[HttpGet ("{id}")]
		public Comment GetCommentById (int id) {
			return this.service.GetCommentById (id);
		}

		[HttpGet ("task/{id}")]
		public IEnumerable<Comment> GetCommentByTaskId (int id) {
			return this.service.GetCommentByTaskId (id).ToArray ();
		}
	}
}