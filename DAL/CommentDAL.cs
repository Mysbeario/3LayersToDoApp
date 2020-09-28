using System;
using System.Collections.Generic;
using System.Data.SQLite;
using Core.Models;

namespace DAL {
	public static class CommentDAL {
		private static string TableName = "Comments";
		public static List<Comment> GetAllComments () {
			DAL.ConnectDb ();

			List<Comment> data = new List<Comment> ();
			string query = "SELECT * FROM " + TableName;
			SQLiteCommand command = new SQLiteCommand (query, DAL.Conn);
			SQLiteDataReader reader = command.ExecuteReader ();

			while (reader.HasRows) {
				while (reader.Read ()) {
					Comment c = new Comment ();
					c.Id = reader.GetInt32 (0);
					c.Owner = UserDAL.GetUserById (reader.GetInt32 (1));
					c.Task = reader.GetInt32 (2);
					c.Content = reader.GetString (3);
					c.Date = DateTime.Parse (reader.GetString (4));
					data.Add (c);
				}

				reader.NextResult ();
			}

			return data;
		}

		public static Comment GetCommentById (int id) {
			DAL.ConnectDb ();

			Comment c = new Comment ();
			string query = "SELECT * FROM " + TableName + " WHERE Id = @CommentId";
			SQLiteCommand command = new SQLiteCommand (query, DAL.Conn);

			command.Parameters.AddWithValue ("@CommentID", id);

			SQLiteDataReader reader = command.ExecuteReader ();

			while (reader.Read ()) {
				c.Id = Int16.Parse (reader["Id"].ToString ());
				c.Owner = UserDAL.GetUserById (Int32.Parse (reader["UserId"].ToString ()));
				c.Task = Int32.Parse (reader["TaskId"].ToString ());
				c.Content = reader["Content"].ToString ();
				c.Date = DateTime.Parse (reader["Date"].ToString ());
			}

			return c;
		}

		public static void AddComment (Comment c) {
			DAL.ConnectDb ();

			string query = "INSERT INTO " + TableName + " (UserId, TaskId, Content, Date) " +
				"VALUES (@UserId, @TaskId, @Content, @Date)";
			SQLiteCommand command = new SQLiteCommand (query, DAL.Conn);

			command.Parameters.AddWithValue ("@UserId", c.Owner.Id);
			command.Parameters.AddWithValue ("@TaskId", c.Task);
			command.Parameters.AddWithValue ("@Content", c.Content);
			command.Parameters.AddWithValue ("@Date", c.Date.ToString ());
			command.ExecuteNonQuery ();
		}

		public static void UpdateComment (Comment c) {
			DAL.ConnectDb ();

			string query = "UPDATE " + TableName + " SET " +
				"UserId = @UserId, TaskId = @TaskId, Content = @Content, Date = @Date " +
				"WHERE Id = @Id";
			SQLiteCommand command = new SQLiteCommand (query, DAL.Conn);

			command.Parameters.AddWithValue ("@Id", c.Id);
			command.Parameters.AddWithValue ("@UserId", c.Owner.Id);
			command.Parameters.AddWithValue ("@TaskId", c.Task);
			command.Parameters.AddWithValue ("@Content", c.Content);
			command.Parameters.AddWithValue ("@Date", c.Date.ToString ());
			command.ExecuteNonQuery ();
		}

		public static void DeleteComment (int id) {
			DAL.ConnectDb ();

			string query = "DELETE FROM " + TableName + " WHERE Id = @Id";
			SQLiteCommand command = new SQLiteCommand (query, DAL.Conn);

			command.Parameters.AddWithValue ("@Id", id);
			command.ExecuteNonQuery ();
		}

		public static int GetLastRowIndex () {
			DAL.ConnectDb ();

			string query = "SELECT MAX(Id) FROM " + TableName;
			SQLiteCommand command = new SQLiteCommand (query, DAL.Conn);
			SQLiteDataReader reader = command.ExecuteReader ();
			int id = 0;

			while (reader.Read ()) id = reader.GetInt32 (0);

			return id;
		}
	}
}