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
    [AttributeUsage(AttributeTargets.All)]
    public class UserAttribute : ActionFilterAttribute
    {

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
