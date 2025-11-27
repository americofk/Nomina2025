/// <summary>
/// Modelo de datos para representar países.
/// Define los países utilizados en el sistema para gestión de nacionalidades y ubicaciones.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Clase para gestion de Country.
    /// </summary>
    public class Country
    {

        /// <summary>

        /// Identificador.

        /// </summary>

        public string CountryId { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Codigo.
        /// </summary>
        public string NationalityCode { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string NationalityName { get; set; }
    }
}
