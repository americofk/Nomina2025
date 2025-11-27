/// <summary>
/// Controlador para la gestión de departamentos activos.
/// Permite crear, editar, eliminar y listar departamentos de la organización.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DC365_WebNR.CORE.Aplication.Services.Container;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.UI.Process;
using Microsoft.AspNetCore.Mvc;

namespace DC365_WebNR.UI.Controllers
{

    /// <summary>

    /// Controlador para gestion de M_Department.

    /// </summary>

    [UserAttribute]
    [TypeFilter(typeof(LicenseFilter))]
    [Route("departamentosactivos")]
    public class M_DepartmentController : ControllerBase
    {
        ProcessDepartament processDepartament;

        /// <summary>

        /// Ejecuta Departments de forma asincrona.

        /// </summary>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet]
        public async Task<IActionResult> Departments()
        {
            GetdataUser();
            await GetLayoutDefauld();

            processDepartament = new ProcessDepartament(dataUser[0]);
            var model = await processDepartament.GetAllDataAsync();
            ViewBag.Filter = FilterHelper<Department>.GetPropertyToSearch();

            // Datos para el sistema de vistas de usuario
            ViewBag.Token = dataUser[0];
            ViewBag.UserRecId = GetUserRecIdFromSession();
            ViewBag.DataAreaId = dataUser[3];

            return View(model);
        }

        /// <summary>
        /// Obtiene el identificador unico del usuario para el sistema de vistas.
        /// Genera un hash numerico consistente basado en el Alias del usuario.
        /// </summary>
        /// <returns>Identificador numerico del usuario.</returns>
        private long GetUserRecIdFromSession()
        {
            // Usar el Alias como identificador principal (es único y no cambia)
            var alias = dataUser[8];
            if (!string.IsNullOrEmpty(alias))
            {
                return GetConsistentHash(alias);
            }

            // Fallback al email
            var email = dataUser[7];
            if (!string.IsNullOrEmpty(email))
            {
                return GetConsistentHash(email);
            }

            return 0;
        }

        /// <summary>
        /// Genera un hash numerico consistente que no varia entre ejecuciones.
        /// </summary>
        /// <param name="input">Cadena de entrada.</param>
        /// <returns>Hash numerico positivo.</returns>
        private long GetConsistentHash(string input)
        {
            if (string.IsNullOrEmpty(input)) return 0;

            // Algoritmo de hash consistente (no depende de la sesión de .NET)
            long hash = 5381;
            foreach (char c in input)
            {
                hash = ((hash << 5) + hash) + c;
            }
            return System.Math.Abs(hash);
        }

        /// <summary>
        /// Guarda los cambios.
        /// </summary>
        /// <param name="Obj">Parametro Obj.</param>

        /// <param name="operacion">Parametro operacion.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("guardar")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> save(Department Obj, string operacion)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            processDepartament = new ProcessDepartament(dataUser[0]);

            // Establecer DataAreaId desde la sesión si está vacío
            if (string.IsNullOrEmpty(Obj.DataAreaId))
            {
                Obj.DataAreaId = dataUser[3]; // CodeCompanies
            }

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
                        responseUI = await processDepartament.PostDataAsync(Obj);
                        break;
                    case "2":
                        responseUI = await processDepartament.PutDataAsync(Obj.DepartmentId, Obj);
                        break;

                }


            }

            return (Json(responseUI));
        }

        /// <summary>

        /// Elimina un registro.

        /// </summary>

        /// <param name="ListIdDepartment">Parametro ListIdDepartment.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpPost("eliminar")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> delete(List<string> ListIdDepartment)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            processDepartament = new ProcessDepartament(dataUser[0]);

            responseUI = await processDepartament.DeleteDataAsync(ListIdDepartment);

            return (Json(responseUI));
        }

        /// <summary>

        /// Ejecuta Departament_Filter_OrMore_Data de forma asincrona.

        /// </summary>

        /// <param name="PropertyName">Parametro PropertyName.</param>

        /// <param name="PropertyValue">Parametro PropertyValue.</param>

        /// <param name="_PageNumber">Parametro _PageNumber.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("FilterOrMoreData")]
        public async Task<IActionResult> Departament_Filter_OrMore_Data(string PropertyName = "", string PropertyValue = "", int _PageNumber = 1)
        {
            GetdataUser();
            processDepartament = new ProcessDepartament(dataUser[0]);
            await GetLayoutDefauld();
            ViewBag.CountPageNumber = _PageNumber - 1;
            var model = await processDepartament.GetAllDataAsync(PropertyName, PropertyValue, _PageNumber);

            return PartialView("Departament_Filter_OrMore_Data", model);
        }


        /// <summary>


        /// Actualiza un registro existente.


        /// </summary>


        /// <param name="DepartmentId">Parametro DepartmentId.</param>


        /// <returns>Resultado de la operacion.</returns>


        [HttpPost("actualizarestatus")]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> updateStatus(List<string> DepartmentId)
        {
            GetdataUser();
            ResponseUI responseUI = new ResponseUI();
            processDepartament = new ProcessDepartament(dataUser[0]);
            foreach (var item in DepartmentId)
            {
                responseUI = await processDepartament.UpdateStatusDepartment(item);

            }

            return (Json(responseUI));
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="Id">Parametro Id.</param>

        /// <returns>Resultado de la operacion.</returns>

        [HttpGet("getbyid")]
        public async Task<JsonResult> getbyid(string Id)
        {
            GetdataUser();
            Department _model = new Department();
            processDepartament = new ProcessDepartament(dataUser[0]);

            _model = await processDepartament.Getbyid(Id);

            return (Json(_model));
        }
    }
}
