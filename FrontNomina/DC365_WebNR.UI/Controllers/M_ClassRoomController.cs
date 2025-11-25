using DC365_WebNR.CORE.Aplication.Services;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.UI.Process;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
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
    [Route("salonescurso")]
    public class M_ClassRoomController : ControllerBase
    {
        ProcessClassRoom processClassRoom;
        [HttpGet]
        public async Task<IActionResult> ClassRoom()
        {
            GetdataUser();
            await GetLayoutDefauld();


            ProcessCourseLocation processCourseLocation=new ProcessCourseLocation(dataUser[0]);
            processClassRoom = new ProcessClassRoom(dataUser[0]);
            var model = await processClassRoom.GetAllDataAsync();
            var List = await processCourseLocation.GetAllDataAsync();

            List<SelectListItem> CourseLocation = new List<SelectListItem>();
            foreach (var item in List)
            {
                CourseLocation.Add(new SelectListItem
                {
                    Value = item.CourseLocationId,
                    Text = item.Name,
                });
            }
            ViewBag.CourseLocation = CourseLocation;
            ViewBag.Filter = FilterHelper<ClassRoom>.GetPropertyToSearch();

            return View(model);
        }

        [HttpGet("FilterOrMoreData")]
        public async Task<IActionResult> ClassRoom_Filter_OrMore_Data(string PropertyName = "", string PropertyValue = "", int _PageNumber = 1)
        {
            GetdataUser();
            processClassRoom = new ProcessClassRoom(dataUser[0]);
            await GetLayoutDefauld();
            ViewBag.CountPageNumber = _PageNumber - 1;
            var model = await processClassRoom.GetAllDataAsync(PropertyName, PropertyValue, _PageNumber);

            return PartialView("ClassRoom_Filter_OrMore_Data", model);
        }

        [HttpPost("guardar")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> Save(ClassRoom Obj, string operacion)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            processClassRoom = new ProcessClassRoom(dataUser[0]);

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
                        responseUI = await processClassRoom.PostDataAsync(Obj);
                        break;
                    case "2":
                        responseUI = await processClassRoom.PutDataAsync(Obj.ClassRoomId, Obj);
                        break;
                }
            }

            return (Json(responseUI));
        }


        [HttpPost("eliminar")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> delete(List<string> ListClassRoomId)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            processClassRoom = new ProcessClassRoom(dataUser[0]);
            responseUI = await processClassRoom.DeleteDataAsync(ListClassRoomId);

            return (Json(responseUI));
        }

        [HttpGet("getbyid")]
        public async Task<JsonResult> getbyid(string Id)
        {
            GetdataUser();
            ClassRoom _model = new ClassRoom();
            processClassRoom = new ProcessClassRoom(dataUser[0]);
            _model = await processClassRoom.Getbyid(Id);

            return (Json(_model));
        }
    }
}
