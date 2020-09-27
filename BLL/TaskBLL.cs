using System;
using System.Collections.Generic;
using Core.Models;
using DAL;

namespace BLL {
	public class TaskBLL {
		private void CheckOverdue (Task t) {
			if (t.EndDate.CompareTo (DateTime.Now) < 0 && t.Status == TaskStatus.Doing) {
				t.Status = TaskStatus.Overdue;
			}
		}
		public List<Task> GetAllTasks () {
			List<Task> tasks = TaskDAL.GetAllTasks ();

			foreach (Task t in tasks) {
				CheckOverdue (t);
			}

			return tasks;
		}

		public Task GetTaskById (int id) {
			Task task = TaskDAL.GetTaskById (id);
			CheckOverdue (task);
			return task;
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