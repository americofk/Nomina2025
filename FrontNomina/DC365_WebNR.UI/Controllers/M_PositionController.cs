/// <summary>
/// Controlador para la gestión de puestos activos.
/// Permite crear, editar, eliminar e inhabilitar puestos de trabajo.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Aplication.Services;
using DC365_WebNR.CORE.Aplication.Services.Container;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.CORE.Domain.Models.Enums;
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
    /// <summary>
    /// Controlador para gestion de M_Position.
    /// </summary>
    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("puestosactivos")]
    public class M_PositionController : ControllerBase
    {
        ProcessPosition processPosition;

        /// <summary>

        /// Ejecuta Positions de forma asincrona.

        /// </summary>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet]
        public async Task<IActionResult> Positions()
        {
            GetdataUser();
            await GetLayoutDefauld();

            processPosition = new ProcessPosition(dataUser[0]);
            var model = await processPosition.GetAllDataAsync();
            ViewBag.Filter = FilterHelper<Position>.GetPropertyToSearch();


            //List<SelectListItem> SelectListPosition = new List<SelectListItem>();
            //SelectListPosition.Add(new SelectListItem
            //{
            //    Value = "",
            //    Text = "Seleccione"
            //});
            //foreach (var item in model)
            //{
            //    SelectListPosition.Add(new SelectListItem
            //    {
            //        Value = item.PositionId,
            //        Text = item.PositionName
            //    });
            //}


            var positionVacant = await selectListsDropDownList(SelectListOptions.PositionVacant);
            var position = await selectListsDropDownList(SelectListOptions.Position);
            var PositionAll = new List<SelectListItem>
            {
                new SelectListItem { Value = "", Text = "-- Seleccione --" }
            };
            PositionAll.AddRange(position.Concat(positionVacant));
            ViewBag.SelectListPosition = PositionAll;
            ViewBag.Department = await selectListsDropDownList(SelectListOptions.Department);
            ViewBag.Job = await selectListsDropDownList(SelectListOptions.Job);

            // Datos para el sistema de vistas de usuario
            ViewBag.Token = dataUser[0];
            ViewBag.UserRecId = GetUserRecIdFromSession();
            ViewBag.DataAreaId = dataUser[3];

            return View(model);
        }

        /// <summary>
        /// Obtiene el identificador unico del usuario para el sistema de vistas.
        /// </summary>
        private long GetUserRecIdFromSession()
        {
            var alias = dataUser[8];
            if (!string.IsNullOrEmpty(alias))
            {
                return GetConsistentHash(alias);
            }
            var email = dataUser[7];
            if (!string.IsNullOrEmpty(email))
            {
                return GetConsistentHash(email);
            }
            return 0;
        }

        /// <summary>
        /// Genera un hash numerico consistente.
        /// </summary>
        private long GetConsistentHash(string input)
        {
            if (string.IsNullOrEmpty(input)) return 0;
            long hash = 5381;
            foreach (char c in input)
            {
                hash = ((hash << 5) + hash) + c;
            }
            return System.Math.Abs(hash);
        }

        /// <summary>

        /// Ejecuta Positions_Filter_OrMore_Data de forma asincrona.

        /// </summary>

        /// <param name="PropertyName">Parametro PropertyName.</param>

        /// <param name="PropertyValue">Parametro PropertyValue.</param>

        /// <param name="_PageNumber">Parametro _PageNumber.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("FilterOrMoreData")]
        public async Task<IActionResult> Positions_Filter_OrMore_Data(string PropertyName = "", string PropertyValue = "", int _PageNumber = 1)
        {
            GetdataUser();
            processPosition = new ProcessPosition(dataUser[0]);
            await GetLayoutDefauld();
            ViewBag.CountPageNumber = _PageNumber - 1;
            var model = await processPosition.GetAllDataAsync(PropertyName, PropertyValue, _PageNumber);

            return PartialView("Positions_Filter_OrMore_Data", model);
        }

        /// <summary>
        /// Endpoint AJAX para paginacion de puestos.
        /// </summary>
        [HttpGet("GetPositionsPaged")]
        public async Task<JsonResult> GetPositionsPaged(string searchValue = "", int pageNumber = 1, int pageSize = 20)
        {
            GetdataUser();
            processPosition = new ProcessPosition(dataUser[0]);

            string propertyName = "";
            if (!string.IsNullOrWhiteSpace(searchValue))
            {
                propertyName = "PositionId,PositionName";
            }

            var pagedResult = await processPosition.GetAllDataPagedAsync(propertyName, searchValue, pageNumber, pageSize);

            return Json(new
            {
                data = pagedResult.Data,
                pageNumber = pagedResult.PageNumber,
                pageSize = pagedResult.PageSize,
                totalRecords = pagedResult.TotalRecords,
                totalPages = pagedResult.TotalPages,
                hasPreviousPage = pagedResult.HasPreviousPage,
                hasNextPage = pagedResult.HasNextPage
            });
        }

        /// <summary>

        /// Guarda los cambios.

        /// </summary>

        /// <param name="Obj">Parametro Obj.</param>

        /// <param name="operacion">Parametro operacion.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("guardar")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> Save(Position Obj, string operacion)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            processPosition = new ProcessPosition(dataUser[0]);

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
                        responseUI = await processPosition.PostDataAsync(Obj);
                        break;
                    case "2":
                        responseUI = await processPosition.PutDataAsync(Obj.PositionId, Obj);
                        break;
                }
            }

            return (Json(responseUI));
        }

        /// <summary>

        /// Elimina un registro.

        /// </summary>

        /// <param name="IdPosition">Parametro IdPosition.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("eliminar")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> delete(List<string> IdPosition)
        {
            GetdataUser();
            ResponseUI responseUI;
            processPosition = new ProcessPosition(dataUser[0]);

            responseUI = await processPosition.DeleteDataAsync(IdPosition);

            return (Json(responseUI));
        }

        /// <summary>

        /// Ejecuta Listcargos de forma asincrona.

        /// </summary>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("Buscarcargos")]
        public async Task<JsonResult> Listcargos()
        {
            GetdataUser();
            ProcessJob processJob = new ProcessJob(dataUser[0]);
            var list = await processJob.GetAllDataAsync();
            return Json(list);
        }

        /// <summary>

        /// Actualiza un registro existente.

        /// </summary>

        /// <param name="PositionIdpos">Parametro PositionIdpos.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("actualizarestatus")]
        public async Task<JsonResult> updateStatus(List<string> PositionIdpos)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            processPosition = new ProcessPosition(dataUser[0]);

            foreach (var item in PositionIdpos)
            {
                responseUI = await processPosition.UpdateStatus(item);

            }

            return (Json(responseUI));
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="Id">Parametro Id.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("{id}")]
        public async Task<JsonResult> GetId(string Id)
        {
            GetdataUser();
            Position _model = new Position();
            processPosition = new ProcessPosition(dataUser[0]);

            _model = await processPosition.GetIdDataAsync(Id);

            return (Json(_model));
        }

        /// <summary>
        /// Obtiene un puesto por Id (para auditoría).
        /// </summary>
        /// <param name="Id">Parametro Id.</param>
        /// <returns>Resultado de la operacion.</returns>
        [HttpGet("getbyid")]
        public async Task<JsonResult> GetById(string Id)
        {
            GetdataUser();
            Position _model = new Position();
            processPosition = new ProcessPosition(dataUser[0]);

            _model = await processPosition.GetIdDataAsync(Id);

            return (Json(_model));
        }

        /// <summary>

        /// Verifica si.

        /// </summary>

        /// <param name="PositionIdIsVacant">Parametro PositionIdIsVacant.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("marcarpuestovacante")]
        [AutoValidateAntiforgeryToken]
        public async Task<JsonResult> Isvacant(List<string> PositionIdIsVacant)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            processPosition = new ProcessPosition(dataUser[0]);

            foreach (var item in PositionIdIsVacant)
            {
                responseUI = await processPosition.IspositionVacant(item);

            }

            return (Json(responseUI));
        }



    }
}
