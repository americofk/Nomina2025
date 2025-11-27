/// <summary>
/// Modelo de datos para representar tipos de discapacidad.
/// Define las categorías de discapacidades reconocidas en el sistema.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Clase para gestion de DisabilityType.
    /// </summary>
    public class DisabilityType
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string DisabilityTypeId { get; set; }
        /// <summary>
        /// Descripcion.
        /// </summary>
        public string Description { get; set; }
    }
}
