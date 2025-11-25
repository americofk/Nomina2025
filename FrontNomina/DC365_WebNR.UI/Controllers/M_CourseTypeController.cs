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
    [Route("tipocursos")]
    public class M_CourseTypeController : ControllerBase
    {
        ProcessCourseType processCourseType;
        [HttpGet]
        public async Task<IActionResult> CourseType()
        {
            GetdataUser();
            await GetLayoutDefauld();

            processCourseType = new ProcessCourseType(dataUser[0]);
            var model = await processCourseType.GetAllDataAsync();
            ViewBag.Filter = FilterHelper<CourseType>.GetPropertyToSearch();

            return View(model);
        }

        [HttpGet("FilterOrMoreData")]
        public async Task<IActionResult> CourseType_Filter_OrMore_Data(string PropertyName = "", string PropertyValue = "", int _PageNumber = 1)
        {
            GetdataUser();
            processCourseType = new ProcessCourseType(dataUser[0]);
            await GetLayoutDefauld();
            var model = await processCourseType.GetAllDataAsync(PropertyName, PropertyValue, _PageNumber);
            ViewBag.CountPageNumber = _PageNumber - 1;
            return PartialView("CourseType_Filter_OrMore_Data", model);
        }

        [HttpPost("guardar")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> save(CourseType Obj, string operacion)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            processCourseType = new ProcessCourseType(dataUser[0]);

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
                        responseUI = await processCourseType.PostDataAsync(Obj);
                        break;
                    case "2":
                        responseUI = await processCourseType.PutDataAsync(Obj.CourseTypeId, Obj);
                        break;
                }
            }
            return (Json(responseUI));
        }

        [HttpPost("eliminar")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> delete(List<string> ListIdTypeCourse)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            processCourseType = new ProcessCourseType(dataUser[0]);

            responseUI = await processCourseType.DeleteDataAsync(ListIdTypeCourse);

            return (Json(responseUI));
        }

        [HttpGet("getbyid")]
        public async Task<JsonResult> getbyid(string Id)
        {
            GetdataUser();
            CourseType _model = new CourseType();
            processCourseType = new ProcessCourseType(dataUser[0]);

            _model = await processCourseType.Getbyid(Id);

            return (Json(_model));
        }
    }
}
