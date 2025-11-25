using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace DC365_WebNR.CORE.Aplication.ProcessHelper
{
    public class ExportarExcel<T>
    {
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
