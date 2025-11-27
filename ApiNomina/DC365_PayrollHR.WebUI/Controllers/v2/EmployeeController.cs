/// <summary>
/// Controlador API para gestión de Employee.
/// Endpoint base: api/v2/employees
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>

using DC365_PayrollHR.Core.Application.CommandsAndQueries.Employees;
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model.EmployeePositions;
using DC365_PayrollHR.Core.Application.Common.Model.Employees;
using DC365_PayrollHR.Core.Domain.Consts;
using DC365_PayrollHR.Core.Domain.Entities;
using DC365_PayrollHR.Core.Domain.Enums;
using DC365_PayrollHR.WebUI.Attributes;
using DC365_PayrollHR.WebUI.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DC365_PayrollHR.WebUI.Controllers.v2
{
    /// <summary>
    /// Controlador para gestion de Employee.
    /// </summary>
    [Route("api/v2.0/employees")]
    [ApiController]
    [Authorize]
    [AuthorizeRole(ElevationTypeRequired = AdminType.User)]
    [TypeFilter(typeof(CustomExceptionFilter))]
    public class EmployeeController : ControllerBase
    {
        private readonly IQueryHandler<Employee> _QueryHandler;
        private readonly IEmployeeCommandHandler _CommandHandler;

        public EmployeeController(IQueryHandler<Employee> queryHandler, IEmployeeCommandHandler commandHandler)
        {
            _QueryHandler = queryHandler;
            _CommandHandler = commandHandler;
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="paginationFilter">Parametro paginationFilter.</param>

        /// <param name="searchFilter">Parametro searchFilter.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("enabled")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeEnabled, View = true)]
        public async Task<ActionResult> GetEnabled([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter)
        {
            var objectresult = await _QueryHandler.GetAll(paginationFilter,searchFilter, new string[]{ "true", WorkStatus.Employ.ToString()});
            return StatusCode(objectresult.StatusHttp, objectresult);

        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="id">Parametro id.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("enabled/{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeEnabled, View = true)]
        public async Task<ActionResult> GetIdEnabled(string id)
        {
            var objectresult = await _QueryHandler.GetId(id);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        //[HttpPost("enabled")]
        //[AuthorizePrivilege(MenuId = MenuConst.EmployeeEnabled, Edit = true)]
        //public async Task<ActionResult> Post([FromBody] EmployeeRequest model)
        //{
        //    var objectresult = await _CommandHandler.Create(model);
        //    return StatusCode(objectresult.StatusHttp, objectresult);
        //}


        //[HttpDelete("enabled")]
        //[AuthorizePrivilege(MenuId = MenuConst.EmployeeEnabled, Delete = true)]
        //public async Task<ActionResult> DeleteEnabled([FromBody] List<string> ids)
        //{
        //    var objectresult = await _CommandHandler.Delete(ids);
        //    return StatusCode(objectresult.StatusHttp, objectresult);
        //}

        /// <summary>

        /// Actualiza un registro existente.

        /// </summary>

        /// <param name="model">Parametro model.</param>

        /// <param name="id">Parametro id.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPut("enabled/{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeEnabled, Edit = true)]
        public async Task<ActionResult> Update([FromBody] EmployeeRequest model, string id)
        {
            var objectresult = await _CommandHandler.Update(id, model);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }


        /// <summary>


        /// Actualiza un registro existente.


        /// </summary>


        /// <param name="id">Parametro id.</param>


        /// <returns>Resultado de la operacion.</returns>


        [HttpPut("enabled/updatestatus/{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeEnabled, Edit = true)]
        public async Task<ActionResult> UpdateStatusEnabled(string id)
        {
            var objectresult = await _CommandHandler.UpdateStatus(id, false, false);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }






        /// <summary>






        /// Obtiene.






        /// </summary>






        /// <param name="paginationFilter">Parametro paginationFilter.</param>






        /// <param name="searchFilter">Parametro searchFilter.</param>






        /// <returns>Resultado de la operacion.</returns>






        [HttpGet("disabled")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeDisabled, View = true)]
        public async Task<ActionResult> GetDisabled([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter)
        {
            var objectresult = await _QueryHandler.GetAll(paginationFilter,searchFilter, new string[] { "false", WorkStatus.Employ.ToString() });
            return StatusCode(objectresult.StatusHttp, objectresult);

        }

        //[HttpDelete("disabled")]
        //[AuthorizePrivilege(MenuId = MenuConst.EmployeeDisabled, Delete = true)]
        //public async Task<ActionResult> DeleteDisabled([FromBody] List<string> ids)
        //{
        //    var objectresult = await _CommandHandler.Delete(ids);
        //    return StatusCode(objectresult.StatusHttp, objectresult);
        //}

        /// <summary>

        /// Actualiza un registro existente.

        /// </summary>

        /// <param name="id">Parametro id.</param>

        /// <param name="isforDgt">Parametro isforDgt.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPut("disabled/updatestatus/{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeDisabled, Edit = true)]
        public async Task<ActionResult> UpdateStatusDisabled(string id, [FromQuery] bool isforDgt)
        {
            var objectresult = await _CommandHandler.UpdateStatus(id, true, isforDgt);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }




        /// <summary>




        /// Crea o procesa.




        /// </summary>




        /// <param name="request">Parametro request.</param>




        /// <param name="id">Parametro id.</param>




        /// <returns>Resultado de la operacion.</returns>




        [HttpPost("uploadimage/{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeImage, Edit = true)]
        public async Task<ActionResult> PostImage([FromForm] EmployeeImageRequest request, string id)
        {
            var objectresult = await _CommandHandler.UploadImage(request, id);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="id">Parametro id.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("downloadimage/{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeImage, Edit = true)]
        public async Task<ActionResult> GetImage(string id)
        {
            var objectresult = await _CommandHandler.DownloadImage(id);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }


        //Sección para contratar y despedir empleados

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="paginationFilter">Parametro paginationFilter.</param>

        /// <param name="searchFilter">Parametro searchFilter.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("candidate")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeCandidate, View = true)]
        public async Task<ActionResult> GetCandidate([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter)
        {
            var objectresult = await _QueryHandler.GetAll(paginationFilter,searchFilter, new string[] { "true", WorkStatus.Candidate.ToString() });
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="id">Parametro id.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("candidate/{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeCandidate, View = true)]
        public async Task<ActionResult> GetIdCandidate(string id)
        {
            var objectresult = await _QueryHandler.GetId(id);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>

        /// Crea o procesa.

        /// </summary>

        /// <param name="model">Parametro model.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("candidate")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeCandidate, Edit = true)]
        public async Task<ActionResult> PostCandidate([FromBody] EmployeeRequest model)
        {
            var objectresult = await _CommandHandler.Create(model);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>

        /// Actualiza un registro existente.

        /// </summary>

        /// <param name="model">Parametro model.</param>

        /// <param name="id">Parametro id.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPut("candidate/{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeCandidate, Edit = true)]
        public async Task<ActionResult> UpdateCandidate([FromBody] EmployeeRequest model, string id)
        {
            var objectresult = await _CommandHandler.Update(id, model);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>

        /// Elimina un registro.

        /// </summary>

        /// <param name="ids">Parametro ids.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpDelete("candidate")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeCandidate, Delete = true)]
        public async Task<ActionResult> DeleteCandidate([FromBody] List<string> ids)
        {
            var objectresult = await _CommandHandler.Delete(ids);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }



        /// <summary>



        /// Obtiene.



        /// </summary>



        /// <param name="paginationFilter">Parametro paginationFilter.</param>



        /// <param name="searchFilter">Parametro searchFilter.</param>



        /// <returns>Resultado de la operacion.</returns>



        [HttpGet("dissmis")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeDissmis, View = true)]
        public async Task<ActionResult> GetDismiss([FromQuery] PaginationFilter paginationFilter, [FromQuery] SearchFilter searchFilter)
        {
            var objectresult = await _QueryHandler.GetAll(paginationFilter,searchFilter, new string[] { "true", WorkStatus.Dismissed.ToString() });
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="id">Parametro id.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("dissmis/{id}")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeDissmis, View = true)]
        public async Task<ActionResult> GetIdDissmis(string id)
        {
            var objectresult = await _QueryHandler.GetId(id);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }



        //Dar de baja al empleado
        /// <summary>
        /// Da de baja al empleado.
        /// </summary>
        /// <param name="model">Parametro model.</param>
        /// <returns>Resultado de la operacion.</returns>
        [HttpPost("{employeeid}/dissmis")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeEnabled, Edit = true)]
        public async Task<ActionResult> DismissEmployee(EmployeeRequestDismiss model)
        {
            var objectresult = await _CommandHandler.DismissEmployee(model);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }

        //Contratar empleado
        /// <summary>
        /// Ejecuta EmployEmployee de forma asincrona.
        /// </summary>
        /// <param name="model">Parametro model.</param>
        /// <returns>Resultado de la operacion.</returns>
        [HttpPost("{employeeid}/employ")]
        [AuthorizePrivilege(MenuId = MenuConst.EmployeeEnabled, Edit = true)]
        public async Task<ActionResult> EmployEmployee(EmployeePositionRequest model)
        {
            var objectresult = await _CommandHandler.AddEmployeetoJob(model);
            return StatusCode(objectresult.StatusHttp, objectresult);
        }
    }

}
