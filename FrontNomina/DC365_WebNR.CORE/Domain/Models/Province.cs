/// <summary>
/// Modelo de datos para representar provincias o estados.
/// Define las divisiones geográficas administrativas del sistema.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Clase para gestion de Province.
    /// </summary>
    public class Province
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string ProvinceId { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string Name { get; set; }
    }
}
