using demo_0.Models;
using Microsoft.AspNetCore.Mvc;

namespace demo_0.Controllers
{
    public class LoginController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Index(LoginViewModel model)
        {
            // Login ok
            return RedirectToAction("AdminCenter","Movies");
        }
    }
}
