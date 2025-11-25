using DC365_WebNR.UI.Process;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DC365_WebNR.UI.Controllers
{
    //[UserAttribute]
    public class ErrorController : ControllerBase
    {
        [HttpGet]
        public IActionResult Index(string message)
        {
            return View(message);
        }

        [HttpGet]
        public IActionResult ReportDesign()
        {
            return View();
        }

        [HttpGet]
        public async Task<IActionResult> ErrorKeyLicense()
        {
            GetdataUser();
            await GetLayoutDefauld();
            return View();
        }
    }
}
