using System.Collections.Generic;
using Core.Models;
using DAL;

namespace BLL {
	public class TaskBLL {
		public List<Task> GetAllTasks () {
			return TaskDAL.GetAllTasks ();
		}

		public Task GetTaskById (int id) {
			return TaskDAL.GetTaskById (id);
		}

		public int AddTask (Task task) {
			TaskDAL.AddTask (task);
			return TaskDAL.GetLastRowIndex ();
		}

		public void UpdateTask (Task task) {
			TaskDAL.UpdateTask (task);
		}

		public void DeleteTask (int id) {
			TaskDAL.DeleteTask (id);
		}
	}
}