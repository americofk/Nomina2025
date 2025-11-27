/// <summary>
/// Atributo personalizado para validación de autenticación de usuario.
/// Verifica que el usuario esté autenticado antes de ejecutar acciones del controlador.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Routing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DC365_WebNR.UI.Process
{
    /// <summary>
    /// Atributo personalizado para User.
    /// </summary>
    [AttributeUsage(AttributeTargets.All)]
    public class UserAttribute : ActionFilterAttribute
    {

        /// <summary>

        /// Ejecuta la operacion OnActionExecuting.

        /// </summary>

        /// <param name="context">Parametro context.</param>

        public override void OnActionExecuting(ActionExecutingContext context)
        {            
            if (string.IsNullOrEmpty(context.HttpContext.Session.GetString("NameUser")))
            {
                string requestedWith = context.HttpContext.Request.Headers["X-Requested-With"];
                if (requestedWith == "XMLHttpRequest")
                    context.Result = new BadRequestObjectResult(context.ModelState);
                else
                    context.Result = new RedirectToRouteResult(
                                        new RouteValueDictionary
                                        {
                                        { "action", "Index" },
                                        { "controller", "Login" }
                                        });
            }
            //if (context.HttpContext.Request.Path.StartsWithSegments("/Dashboard/SaveChangeCompanyForm"))
            //{
            //    string requestedWith = context.HttpContext.Request.Headers["X-Requested-With"];
            //    if (requestedWith == "XMLHttpRequest")
            //        context.Result = new BadRequestObjectResult(context.ModelState);
            //    else
            //        context.Result = new RedirectToRouteResult(
            //                            new RouteValueDictionary
            //                            {
            //                            { "action", "Index" },
            //                            { "controller", "Login" }
            //                            });
            //}
            base.OnActionExecuting(context);
        }

    }
}
