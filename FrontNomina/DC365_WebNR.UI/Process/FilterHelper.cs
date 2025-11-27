/// <summary>
/// Helper para filtrado de datos en la interfaz de usuario.
/// Genera dinámicamente listas de propiedades filtrables basándose en atributos personalizados.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Aplication.Attributes;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DC365_WebNR.UI.Process
{
    /// <summary>
    /// Clase auxiliar para Filter.
    /// </summary>
    public static class FilterHelper<T>
    {
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <returns>Resultado de la operacion.</returns>
        public static List<SelectListItem> GetPropertyToSearch()
        {
            List<SelectListItem> dropDownList = new List<SelectListItem>();

            var properties = typeof(T).GetProperties();

            foreach (var item in properties)
            {
                var a = item.GetCustomAttributes(typeof(CustomFilterAttribute), false);

                if (a.Count() != 0)
                {
                    var b = (CustomFilterAttribute)a.First();
                    dropDownList.Add(new SelectListItem
                    {
                        Value = item.PropertyType.ToString().Substring(7,2) + $"-{item.Name}",
                        Text = b.PropertyName
                    });                    
                }
            }

            return dropDownList;
        }

    }
}
