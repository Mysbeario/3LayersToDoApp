using System;

namespace Core.Models {
	public enum TaskStatus {
		ToDo,
		Doing,
		Done,
	}

	public class Task : Entity {
		public User Owner { get; set; }
		public string Title { get; set; }
		public string Description { get; set; }
		public TaskStatus Status { get; set; }
		public DateTime StartDate { get; set; }
		public DateTime EndDate { get; set; }
	}
}