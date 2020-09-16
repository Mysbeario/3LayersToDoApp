using System.Collections.Generic;
using Core.Models;
using DAL;

namespace BLL {
    public class UserBLL {
        public List<User> GetAllUsers () {
            return UserDAL.GetAllUsers ();
        }

        public User GetUserById (int id) {
            return UserDAL.GetUserById (id);
        }

        public void AddUser (string name, string email, string password) {
            User u = new User ();
            u.Name = name;
            u.Email = email;
            u.Password = password;

            UserDAL.AddUser (u);
        }

        public void UpdateUser (int id, string name, string email, string password) {
            User u = new User ();
            u.Id = id;
            u.Name = name;
            u.Email = email;
            u.Password = password;

            UserDAL.UpdateUser (u);
        }

        public void DeleteUser (int id) {
            UserDAL.DeleteUser (id);
        }
    }
}