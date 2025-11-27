/// <summary>
/// Helper para exportación de datos a Excel/CSV.
/// Proporciona funcionalidad para convertir colecciones de objetos en formato CSV.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace DC365_WebNR.CORE.Aplication.ProcessHelper
{
    /// <summary>
    /// Clase para gestion de ExportarExcel.
    /// </summary>
    public class ExportarExcel<T>
    {
        /// <summary>
        /// Crea un nuevo registro.
        /// </summary>
        /// <param name="_ListFormt">Parametro _ListFormt.</param>
        /// <param name="_header">Parametro _header.</param>
        /// <returns>Resultado de la operacion.</returns>
        public string CreateCSV(List<T> _ListFormt, string[] _header)
        {
            PropertyInfo[] properties = null;
            string result = string.Empty;
            if (_ListFormt.Count > 0)
                properties = Type.GetType(_ListFormt[0].ToString()).GetProperties();

            foreach (var item in _header)
            {
                result += $"{item},";
            }
            result = result + "\n";

            foreach (var item in _ListFormt)
            {
                foreach (var propiedad in properties)
                {
                    //Obtenemos el tipo de dato del ojeto de la lista
                    //Luego sacamos la información de la propiedad por su nombre que obtenemos del arreglo 'properties'
                    var propertyInfo = item.GetType().GetProperty(propiedad.Name);

                    //Se obtiene el valor de la propiedad anteriormente obtenida, buscandola en el objeto donde se encuentra su valor
                    decimal itemParse;
                   
                    if (decimal.TryParse((string)propertyInfo.GetValue(item), out itemParse))
                    {
                        result += $"{itemParse},";

                    }
                    else
                    {
                        result += $"{propertyInfo.GetValue(item)},";

                    };

                }

                result = result + "\n";
            }

            return result;
        }
    }
}
