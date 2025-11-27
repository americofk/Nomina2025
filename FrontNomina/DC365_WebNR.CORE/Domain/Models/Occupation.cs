/// <summary>
/// Modelo de datos para representar ocupaciones laborales.
/// Define los diferentes tipos de ocupación profesional en el sistema.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Clase para gestion de Occupation.
    /// </summary>
    public class Occupation
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string OccupationId { get; set; }
        /// <summary>
        /// Descripcion.
        /// </summary>
        public string Description { get; set; }
    }
}
