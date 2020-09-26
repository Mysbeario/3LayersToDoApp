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

        public int AddUser (User user) {
            UserDAL.AddUser (user);
            return UserDAL.GetLastRowIndex ();
        }

        public void UpdateUser (User user) {
            UserDAL.UpdateUser (user);
        }

        public void DeleteUser (int id) {
            UserDAL.DeleteUser (id);
        }
    }
}