using System;
using System.Collections.Generic;

namespace Core.Models {
	public enum TaskStatus {
		Doing,
		Done,
		Overdue,
	}

	public class Task : Entity {
		public User Owner { get; set; }
		public List<User> Partners { get; set; }
		public string Title { get; set; }
		public string Description { get; set; }
		public TaskStatus Status { get; set; }
		public DateTime StartDate { get; set; }
		public DateTime EndDate { get; set; }
		public bool IsPrivate { get; set; }
	}
}