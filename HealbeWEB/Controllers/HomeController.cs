using HealbeWEB.Enums;
using HealbeWEB.Models;
using Microsoft.AspNetCore.Mvc;

namespace HealbeWEB.Controllers
{
    public class HomeController : Controller
    {

        public IActionResult Index()
        {
            return View("~/Views/Home/Index.cshtml");
        }

        public IActionResult Test()
        {
            return View("~/Views/Home/Test.cshtml");
        }

        [HttpPost]
        public JsonResponse<RenderModel> GetRenderAjax()
        {
            var renderModel = new RenderModel() { Code = "1", Text = "Texter" };
            return new JsonResponse<RenderModel>(MessageStatus.ok, "Тестовый ajax", renderModel);
        }

    }
}
