using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers {
	[Route ("/api/[controller]")]
	[ApiController]
	public class ImageController : ControllerBase {
		[HttpGet ("{name}")]
		public FileContentResult GetImage (string name) {
			var image = System.IO.File.ReadAllBytes ($"../DAL/Images/{name}");
			return File (image, "image/jpeg");
		}
	}
}