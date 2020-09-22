using System;
using System.Collections.Generic;
using System.Data.SQLite;
using Core.Models;

namespace DAL {
	public static class TaskDAL {
		private static string TableName = "Tasks";
		public static List<Task> GetAllTasks () {
			DAL.ConnectDb ();

			List<Task> data = new List<Task> ();
			string query = "SELECT * FROM " + TableName;
			SQLiteCommand command = new SQLiteCommand (query, DAL.Conn);
			SQLiteDataReader reader = command.ExecuteReader ();

			while (reader.HasRows) {
				while (reader.Read ()) {
					Task t = new Task ();
					t.Id = reader.GetInt32 (0);
					t.Owner = UserDAL.GetUserById (reader.GetInt32 (1));
					t.Title = reader.GetString (2);
					t.Description = reader.GetString (3);
					t.Status = (TaskStatus) reader.GetInt32 (4);
					t.StartDate = DateTime.Parse (reader.GetString (5));
					t.EndDate = DateTime.Parse (reader.GetString (6));
					data.Add (t);
				}

				reader.NextResult ();
			}

			return data;
		}

		public static Task GetTaskById (int id) {
			DAL.ConnectDb ();

			Task t = new Task ();
			string query = "SELECT * FROM " + TableName + " WHERE Id = @TaskId";
			SQLiteCommand command = new SQLiteCommand (query, DAL.Conn);

			command.Parameters.AddWithValue ("@TaskId", id);

			SQLiteDataReader reader = command.ExecuteReader ();

			while (reader.Read ()) {
				t.Id = Int32.Parse (reader["Id"].ToString ());
				t.Owner = UserDAL.GetUserById (Int32.Parse (reader["OwnerId"].ToString ()));
				t.Title = reader["Title"].ToString ();
				t.Description = reader["Description"].ToString ();
				t.Status = (TaskStatus) Int32.Parse (reader["Status"].ToString ());
				t.StartDate = DateTime.Parse (reader["StartDate"].ToString ());
				t.EndDate = DateTime.Parse (reader["EndDate"].ToString ());
			}

			return t;
		}

		public static void AddTask (Task t) {
			DAL.ConnectDb ();

			string query = "INSERT INTO " + TableName + " (OwnerId, Title, Description, Status, StartDate, EndDate) " +
				"VALUES (@OwnerId, @Title, @Description, @Status, @StartDate, @EndDate)";
			SQLiteCommand command = new SQLiteCommand (query, DAL.Conn);

			command.Parameters.AddWithValue ("@OwnerId", t.Owner.Id);
			command.Parameters.AddWithValue ("@Title", t.Title);
			command.Parameters.AddWithValue ("@Description", t.Description);
			command.Parameters.AddWithValue ("@Status", t.Status);
			command.Parameters.AddWithValue ("@StartDate", t.StartDate.ToString ());
			command.Parameters.AddWithValue ("@EndDate", t.EndDate.ToString ());
			command.ExecuteNonQuery ();
		}

		public static void UpdateTask (Task t) {
			DAL.ConnectDb ();

			string query = "UPDATE " + TableName + " SET " +
				"OwnerId = @OwnerId, Title = @Title, Description = @Description, Status = @Status, StartDate = @StartDate, EndDate = @EndDate " +
				"WHERE Id = @TaskId";
			SQLiteCommand command = new SQLiteCommand (query, DAL.Conn);

			command.Parameters.AddWithValue ("@TaskId", t.Id);
			command.Parameters.AddWithValue ("@OwnerId", t.Owner.Id);
			command.Parameters.AddWithValue ("@Title", t.Title);
			command.Parameters.AddWithValue ("@Description", t.Description);
			command.Parameters.AddWithValue ("@Status", t.Status);
			command.Parameters.AddWithValue ("@StartDate", t.StartDate.ToString ());
			command.Parameters.AddWithValue ("@EndDate", t.EndDate.ToString ());
			command.ExecuteNonQuery ();
		}

		public static void DeleteTask (int id) {
			DAL.ConnectDb ();

			string query = "DELETE FROM " + TableName + " WHERE Id = @TaskId";
			SQLiteCommand command = new SQLiteCommand (query, DAL.Conn);

			command.Parameters.AddWithValue ("@TaskId", id);
			command.ExecuteNonQuery ();
		}
	}
}