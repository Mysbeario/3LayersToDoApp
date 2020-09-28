using System;

namespace Core.Models {
	public class Comment : Entity {
		public User Owner { get; set; }
		public int Task { get; set; }
		public DateTime Date { get; set; }
		public string Content { get; set; }
	}
}