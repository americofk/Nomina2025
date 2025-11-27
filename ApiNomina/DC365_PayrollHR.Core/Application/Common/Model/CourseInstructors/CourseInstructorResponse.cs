/// <summary>
/// Modelo de respuesta para CourseInstructor.
/// Define la estructura de datos retornada al cliente.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.CourseInstructors
{
    /// <summary>
    /// Modelo de respuesta para CourseInstructor.
    /// </summary>
    public class CourseInstructorResponse
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string CourseId { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string CourseName { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string InstructorId { get; set; }
        /// <summary>
        /// Valor de texto para Comment.
        /// </summary>
        public string Comment { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string InstructorName { get; set; }
    }
}
