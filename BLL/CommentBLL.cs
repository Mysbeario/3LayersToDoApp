using System.Collections.Generic;
using Core.Models;
using DAL;

namespace BLL {
	public class CommentBLL {
		public List<Comment> GetAllComments () {
			return CommentDAL.GetAllComments ();
		}

		public Comment GetCommentById (int id) {
			return CommentDAL.GetCommentById (id);
		}

		public int AddComment (Comment comment) {
			CommentDAL.AddComment (comment);
			return CommentDAL.GetLastRowIndex ();
		}

		public void UpdateComment (Comment comment) {
			CommentDAL.UpdateComment (comment);
		}

		public void DeleteComment (int id) {
			CommentDAL.DeleteComment (id);
		}

		public List<Comment> GetCommentByTaskId (int id) {
			List<Comment> comments = CommentDAL.GetAllComments ();
			return comments.FindAll (c => c.Task == id);
		}
	}
}