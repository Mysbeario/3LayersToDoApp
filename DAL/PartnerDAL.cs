using System.Collections.Generic;
using System.Data.SQLite;
using Core.Models;

namespace DAL {
	public class PartnerDAL {
		private static string TableName = "Partners";

		public static List<User> GetAllPartners (Task task) {
			DAL.ConnectDb ();

			List<User> data = new List<User> ();
			string query = "SELECT * FROM " + TableName + " WHERE TaskId = @TaskId";
			SQLiteCommand command = new SQLiteCommand (query, DAL.Conn);

			command.Parameters.AddWithValue ("@TaskId", task.Id);

			SQLiteDataReader reader = command.ExecuteReader ();

			while (reader.HasRows) {
				while (reader.Read ()) {
					int uId = reader.GetInt32 (1);
					data.Add (UserDAL.GetUserById (uId));
				}

				reader.NextResult ();
			}

			return data;
		}
		public static void AddPartner (Task task, User user) {
			DAL.ConnectDb ();

			string query = "INSERT INTO " + TableName + " (TaskId, UserId) VALUES (@TaskId, @UserId)";
			SQLiteCommand command = new SQLiteCommand (query, DAL.Conn);

			command.Parameters.AddWithValue ("@TaskId", task.Id);
			command.Parameters.AddWithValue ("@UserId", user.Id);
			command.ExecuteNonQuery ();
		}

		public static void DeletePartner (Task task, User user) {
			DAL.ConnectDb ();

			string query = "DELETE FROM " + TableName + " WHERE TaskId = @TaskId AND UserId = @UserId";
			SQLiteCommand command = new SQLiteCommand (query, DAL.Conn);

			command.Parameters.AddWithValue ("@TaskId", task.Id);
			command.Parameters.AddWithValue ("@UserId", user.Id);
			command.ExecuteNonQuery ();
		}

		public static void DeleteAllPartners (int id) {
			DAL.ConnectDb ();

			string query = "DELETE FROM " + TableName + " WHERE TaskId = @TaskId";
			SQLiteCommand command = new SQLiteCommand (query, DAL.Conn);

			command.Parameters.AddWithValue ("@TaskId", id);
			command.ExecuteNonQuery ();
		}

		public static void UpdatePartners (Task t) {
			List<User> currentPartners = GetAllPartners (t);
			List<User> deletedPartners = currentPartners.FindAll (u => !t.Partners.Exists (p => p.Id == u.Id));
			List<User> addedPartners = t.Partners.FindAll (u => !currentPartners.Exists (p => p.Id == u.Id));

			foreach (User u in deletedPartners) {
				DeletePartner (t, u);
			}

			foreach (User u in addedPartners) {
				AddPartner (t, u);
			}
		}
	}

}