/// <summary>
/// Modelo de datos para representar instructores asignados a cursos.
/// Define la relación entre instructores y los cursos que imparten.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Domain.Const;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Clase para gestion de CourseInstructors.
    /// </summary>
    public class CourseInstructors
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string InstructorId { get; set; }
        /// <summary>
        /// Valor de texto para Comment.
        /// </summary>
        [Required(ErrorMessage = "Comentario" + ErrorMsg.Emptym)]
        public string Comment { get; set; }
        /// <summary>
        /// Valor de texto para CourseIdInstructor.
        /// </summary>
        public string CourseIdInstructor { get; set; }

        /// <summary>

        /// Nombre.

        /// </summary>

        public string CourseName { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string InstructorName { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string CourseId
        {
            get
            {
                return CourseIdInstructor;
            }
        }
    }
}
