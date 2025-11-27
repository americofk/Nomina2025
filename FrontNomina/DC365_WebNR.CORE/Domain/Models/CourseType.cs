/// <summary>
/// Modelo de datos para representar tipos de cursos.
/// Clasifica los cursos según su categoría o área de conocimiento.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Domain.Const;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using DC365_WebNR.CORE.Aplication.Attributes;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Clase para gestion de CourseType.
    /// </summary>
    public class CourseType
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string CourseTypeId { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        [MaxLength(50)]
        [CustomFilter("Nombre")]
        [Required(ErrorMessage = "Nombre" + ErrorMsg.Emptym)]
        public string Name { get; set; }

        /// <summary>

        /// Descripcion.

        /// </summary>

        [MaxLength(200)]
        [CustomFilter("Descripción")]
        [Required(ErrorMessage = "La descripción" + ErrorMsg.Emptyf)]
        public string Description { get; set; }       
    }
}
