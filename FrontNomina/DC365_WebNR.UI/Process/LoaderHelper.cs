/// <summary>
/// Helper para generación de elementos de carga (loaders).
/// Crea HTML personalizado para mostrar indicadores de carga en la interfaz de usuario.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DC365_WebNR.UI.Process
{
    /// <summary>
    /// Clase auxiliar para Loader.
    /// </summary>
    public static class LoaderHelper
    {
        /// <summary>
        /// Ejecuta la operacion HtmlLoader.
        /// </summary>
        /// <param name="helper">Parametro helper.</param>
        /// <returns>Resultado de la operacion.</returns>
        public static IHtmlContent HtmlLoader(this IHtmlHelper helper)
        {
            var menulit = string.Empty;
            menulit = "<div class='background-container'>" +
                       "<div class='container-main-loader'>" +
                        "<div class='logo'></div>" +
                        "<span style='--i:1;'></span>" +
                        "<span style='--i:2;'></span>" +
                        "<span style='--i:3;'></span>" +
                        "<span style='--i:4;'></span>" +
                        "<span style='--i:5;'></span>" +
                        "<span style='--i:6;'></span>" +
                        "<span style='--i:7;'></span>" +
                        "<span style='--i:8;'></span>" +
                        "<span style='--i:9;'></span>" +
                        "<span style='--i:10;'></span>" +
                        "<span style='--i:11;'></span>" +
                        "<span style='--i:12;'></span>" +
                        "<span style='--i:13;'></span>" +
                        "<span style='--i:14;'></span>" +
                        "<span style='--i:15;'></span>" +
                        "<span style='--i:16;'></span>" +
                        "<span style='--i:17;'></span>" +
                        "<span style='--i:18;'></span>" +
                        "<span style='--i:19;'></span>" +
                        "<span style='--i:20;'></span>" +
                    "</div>" +

                    //"<span>Nómina & <br> Recursos Humanos</span>" +

            "</div>";

            return new HtmlString(menulit);

        }
    }
}
