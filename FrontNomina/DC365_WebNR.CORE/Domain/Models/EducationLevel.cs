/// <summary>
/// Modelo de datos para representar niveles de educación.
/// Define los grados académicos y niveles educativos del sistema.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Clase para gestion de EducationLevel.
    /// </summary>
    public class EducationLevel
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string EducationLevelId { get; set; }
        /// <summary>
        /// Descripcion.
        /// </summary>
        public string Description { get; set; }
    }
}
