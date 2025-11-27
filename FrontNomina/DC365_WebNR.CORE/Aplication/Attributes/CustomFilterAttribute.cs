/// <summary>
/// Atributo personalizado para filtrado de propiedades.
/// Permite marcar propiedades de modelos para ser utilizadas en filtros dinámicos.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DC365_WebNR.CORE.Aplication.Attributes
{
    /// <summary>
    /// Atributo personalizado para CustomFilter.
    /// </summary>
    public class CustomFilterAttribute: Attribute
    {
        public string PropertyName;

        public CustomFilterAttribute(string _propertyName)
        {
            this.PropertyName = _propertyName;
        }
    }
}
