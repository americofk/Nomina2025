/// <summary>
/// Helper para obtención de atributos de enumeraciones.
/// Facilita la búsqueda y obtención de valores de enumeraciones basándose en sus atributos Display.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DC365_WebNR.CORE.Aplication.ProcessHelper
{
    /// <summary>
    /// Clase auxiliar para EnumAttribute.
    /// </summary>
    public static class EnumAttributeHelper<T>
    {
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="valueToSearch">Parametro valueToSearch.</param>
        /// <param name="realValue">Parametro realValue.</param>
        /// <returns>Resultado de la operacion.</returns>
        public static int GetAttributeName(string valueToSearch, out int realValue)
        {
            realValue = 9999;
            var members = typeof(T).GetFields();
            int valueMember = 9999;

            foreach (var item in members)
            {
                var a = item.GetCustomAttributes(typeof(DisplayAttribute), false);

                if (a.Count() != 0)
                {
                    var b = (DisplayAttribute)a.First();
                    if (b.Name.ToLower() == valueToSearch.ToLower())
                    {
                        realValue = (int)Enum.Parse(typeof(T), item.Name);
                        return valueMember = (int)Enum.Parse(typeof(T), item.Name);
                    }
                }
            }
            return valueMember;
        }
    }
}
