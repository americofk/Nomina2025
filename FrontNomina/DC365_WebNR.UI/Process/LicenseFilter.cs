using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Routing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DC365_WebNR.UI.Process
{
    public class LicenseFilter : IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            if (context.Exception.Message.Contains("Key-error"))
            {
                context.Result = new RedirectToRouteResult(
                                    new RouteValueDictionary
                                    {
                                            { "action", "ErrorKeyLicense" },
                                            { "controller", "Error" }
                                    });
            }
        }
    }
}
