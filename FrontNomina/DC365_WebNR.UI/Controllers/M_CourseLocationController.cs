using DC365_WebNR.CORE.Aplication.Services;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.UI.Process;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DC365_WebNR.UI.Controllers
{
    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("ubicacioncursos")]
    public class M_CourseLocationController : ControllerBase
    {
        ProcessCourseLocation processCourseLocation;
        [HttpGet]
        public async Task<IActionResult> CourseLocation()
        {
            GetdataUser();
            await GetLayoutDefauld();

            processCourseLocation = new ProcessCourseLocation(dataUser[0]);
            var model = await processCourseLocation.GetAllDataAsync();
            ViewBag.Filter = FilterHelper<CourseLocation>.GetPropertyToSearch();

            return View(model);
        }

        [HttpGet("FilterOrMoreData")]
        public async Task<IActionResult> CourseLocation_Filter_OrMore_Data(string PropertyName = "", string PropertyValue = "", int _PageNumber = 1)
        {
            GetdataUser();
            processCourseLocation = new ProcessCourseLocation(dataUser[0]);
            await GetLayoutDefauld();
            ViewBag.CountPageNumber = _PageNumber - 1;
            var model = await processCourseLocation.GetAllDataAsync(PropertyName, PropertyValue, _PageNumber);

            return PartialView("CourseLocation_Filter_OrMore_Data", model);
        }


        [HttpPost("guardar")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> Save(CourseLocation Obj, string operacion)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            processCourseLocation = new ProcessCourseLocation(dataUser[0]);

            if (!ModelState.IsValid)
            {
                responseUI.Errors = ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage).ToList();
                responseUI.Type = "error";
                return (Json(responseUI));
            }
            else
            {
                switch (operacion)
                {
                    case "1":
                        responseUI = await processCourseLocation.PostDataAsync(Obj);
                        break;
                    case "2":
                        responseUI = await processCourseLocation.PutDataAsync(Obj.CourseLocationId, Obj);
                        break;
                }
            }

            return (Json(responseUI));
        }


        [HttpPost("eliminar")]
        public async Task<JsonResult> delete(List<string> ListLocationId)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            processCourseLocation = new ProcessCourseLocation(dataUser[0]);


            responseUI = await processCourseLocation.DeleteDataAsync(ListLocationId);

            return (Json(responseUI));
        }

        [HttpGet("getbyid")]
        public async Task<JsonResult> getbyid(string Id)
        {
            GetdataUser();
            CourseLocation _model = new CourseLocation();
            processCourseLocation = new ProcessCourseLocation(dataUser[0]);
            _model = await processCourseLocation.Getbyid(Id);

            return (Json(_model));
        }
    }
}
