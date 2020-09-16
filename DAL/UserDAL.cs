using System;
using System.Collections.Generic;
using System.Data.SQLite;
using DAL.DTO;

namespace DAL {
	public class UserDAL {
		public static List<User> GetAllUsers () {
			DAL.ConnectDb ();

			List<User> data = new List<User> ();
			string query = "SELECT * FROM Users";
			SQLiteCommand command = new SQLiteCommand (query, DAL.Conn);
			SQLiteDataReader reader = command.ExecuteReader ();

			while (reader.HasRows) {
				while (reader.Read ()) {
					User u = new User ();
					u.Id = reader.GetInt32 (0);
					u.Name = reader.GetString (1);
					u.Email = reader.GetString (2);
					u.Password = reader.GetString (3);
					data.Add (u);
				}

				reader.NextResult ();
			}

			return data;
		}

		public static User GetUserById (int id) {
			DAL.ConnectDb ();

			User u = new User ();
			string query = "SELECT * FROM Users WHERE Id = @UserId";
			SQLiteCommand command = new SQLiteCommand (query, DAL.Conn);

			command.Parameters.AddWithValue ("@UserID", id);

			SQLiteDataReader reader = command.ExecuteReader ();

			while (reader.Read ()) {
				u.Id = Int16.Parse (reader["Id"].ToString ());
				u.Name = reader["Name"].ToString ();
				u.Email = reader["Email"].ToString ();
				u.Password = reader["Password"].ToString ();
			}

			return u;
		}

		public static void AddUser (User u) {
			DAL.ConnectDb ();

			string query = "INSERT INTO Users (Name, Email, Password) " +
				"VALUES (@UserName, @UserEmail, @UserPassword)";
			SQLiteCommand command = new SQLiteCommand (query, DAL.Conn);

			command.Parameters.AddWithValue ("@UserName", u.Name);
			command.Parameters.AddWithValue ("@UserEmail", u.Email);
			command.Parameters.AddWithValue ("@UserPassword", u.Password);
			command.ExecuteNonQuery ();
		}

		public static void UpdateUser (User u) {
			DAL.ConnectDb ();

			string query = "UPDATE Users SET " +
				"Name = @UserName, Email = @UserEmail, Password = @UserPassword " +
				"WHERE Id = @UserId";
			SQLiteCommand command = new SQLiteCommand (query, DAL.Conn);

			command.Parameters.AddWithValue ("@UserId", u.Id);
			command.Parameters.AddWithValue ("@UserName", u.Name);
			command.Parameters.AddWithValue ("@UserEmail", u.Email);
			command.Parameters.AddWithValue ("@UserPassword", u.Password);
			command.ExecuteNonQuery ();
		}

		public static void DeleteUser (int id) {
			DAL.ConnectDb ();

			string query = "DELETE Users WHERE Id = @UserId";
			SQLiteCommand command = new SQLiteCommand (query, DAL.Conn);

			command.Parameters.AddWithValue ("@UserId", id);
			command.ExecuteNonQuery ();
		}
	}
}