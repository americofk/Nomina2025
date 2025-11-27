/// <summary>
/// Atributo para validación de privilegios.
/// Permite controlar el acceso a las acciones de los controladores basándose en los privilegios del usuario.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>

using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Domain.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;

namespace DC365_PayrollHR.WebUI.Attributes
{
    /// <summary>
    /// En la autorización de acción se le asigna el privilegio minimo de acción (ver, editar, eliminar)
    /// para poder ejecutar la acción.
    /// </summary>
    public class AuthorizePrivilegeAttribute: ActionFilterAttribute
    {
        private IValidatePrivilege _ValidatePrivilege;

        /// <summary>

        /// Identificador.

        /// </summary>

        public string MenuId { get; set; } 
        /// <summary>
        /// Indica el estado de View.
        /// </summary>
        public bool View { get; set; } = false;
        /// <summary>
        /// Indica el estado de Edit.
        /// </summary>
        public bool Edit { get; set; } = false;
        /// <summary>
        /// Indica el estado de Delete.
        /// </summary>
        public bool Delete { get; set; } = false; 

        /// <summary>

        /// Ejecuta la operacion OnActionExecuting.

        /// </summary>

        /// <param name="context">Parametro context.</param>

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            AdminType ElevationType = (AdminType)Enum.Parse(typeof(AdminType), context.HttpContext.User.FindFirstValue(ClaimTypes.Actor));

            //Si el usuario es administrador no busco los permisos del menú
            //En caso contrario busco los del menú
            if (ElevationType != AdminType.LocalAdmin)
            {
                //Obtengo el usuario del token de ingreso
                string Alias = context.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

                //Obtengo el servicio de busqueda de roles mediante el contexto
                _ValidatePrivilege = (IValidatePrivilege)context.HttpContext.RequestServices.GetService(typeof(IValidatePrivilege));

                //Verifico si el menú  no está vacío si lo está realizar acción para notificar que la validación está mal configurada
                //No se puede validar un permiso sin el id del menú
                if (!string.IsNullOrEmpty(MenuId))
                {
                    if (!_ValidatePrivilege.ValidateAction(Alias, MenuId, View, Delete, Edit).Result)
                    {
                        context.Result = new JsonResult(new Response<string>
                        {
                            Succeeded = false,
                            StatusHttp = (int)HttpStatusCode.Unauthorized,
                            Errors = new List<string>() { "Permisos del usuario insuficientes para ejecutar esta acción" }
                        });

                        context.HttpContext.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                    }
                }
            }

            base.OnActionExecuting(context);
        }
    }
}
