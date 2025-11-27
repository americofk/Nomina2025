using Microsoft.AspNetCore.Mvc.ApplicationModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DC365_PayrollHR.WebUI.Services
{
    /// <summary>
    /// Clase para gestion de GroupForVersioningConvention.
    /// </summary>
    public class GroupForVersioningConvention : IControllerModelConvention
    {
        /// <summary>
        /// Ejecuta la operacion Apply.
        /// </summary>
        /// <param name="controller">Parametro controller.</param>
        public void Apply(ControllerModel controller)
        {
            string controllerNamespace = controller.ControllerType.Namespace;
            string apiVersion = controllerNamespace.Split(".").Last().ToLower();

            if (!apiVersion.StartsWith("v")) 
                apiVersion = "v1.0";
            else
                apiVersion = apiVersion + ".0";

            controller.ApiExplorer.GroupName = apiVersion;
        }
    }
}
