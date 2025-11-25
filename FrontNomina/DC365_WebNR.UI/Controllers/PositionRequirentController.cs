using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DC365_WebNR.CORE.Aplication.ProcessHelper;
using DC365_WebNR.CORE.Aplication.Services;
using DC365_WebNR.CORE.Aplication.Services.Container;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.UI.Process;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json;

namespace DC365_WebNR.UI.Controllers
{
    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("requisitospuestos")]
    public class PositionRequirentController : ControllerBase
    {
        ProcessPositionRequirement process;
        [HttpGet("{positionid}")]
        public async Task<ActionResult> Get(string positionid)
        {
            GetdataUser();
            process = new ProcessPositionRequirement(dataUser[0]);

            var PositionRequirement = await process.GetAllDataAsync(positionid);
            return PartialView("PositionRequirent", PositionRequirement);
        }

        [HttpPost("guardar")]
        public async Task<JsonResult> Save(PositionRequirement PositionRequirement, string operacion)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            process = new ProcessPositionRequirement(dataUser[0]);

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
                        responseUI = await process.PostDataAsync(PositionRequirement, PositionRequirement.PositionId);
                        break;
                    case "2":
                        responseUI = await process.PutDataAsync(PositionRequirement, PositionRequirement.PositionId);
                        break;
                }
            }

            return (Json(responseUI));
        }

        [HttpPost("eliminar")]
        public async Task<JsonResult> delete(List<string> ListPositionRequirement, string positionid)
        {
            GetdataUser();
            ResponseUI responseUI;
            process = new ProcessPositionRequirement(dataUser[0]);

            responseUI = await process.DeleteDataAsync(ListPositionRequirement, positionid);

            return (Json(responseUI));
        }

        [HttpGet("formularioNewRequirement")]
        public ActionResult NewRequiremen()
        {
            PositionRequirement Requirement = new PositionRequirement();
            return PartialView("NewPositionRequirent", Requirement);
        }

        [HttpGet("{positionid}/{internalId}")]
        public async Task<ActionResult> GetId(string positionid, string internalId)
        {
            GetdataUser();
            PositionRequirement _model = new PositionRequirement();
            process = new ProcessPositionRequirement(dataUser[0]);

            _model = await process.GetDataAsync(positionid, internalId);
            
            return PartialView("NewPositionRequirent", _model);
        }

    }
}
