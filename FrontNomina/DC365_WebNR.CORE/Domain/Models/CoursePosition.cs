/// <summary>
/// Modelo de datos para representar posiciones asociadas a cursos.
/// Define qué puestos requieren o están relacionados con cursos específicos.
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
    /// Clase para gestion de CoursePosition.
    /// </summary>
    public class CoursePosition
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string CourseId
        {
            get
            {
                return CoursePositionId;
            }
        }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string CoursePositionId { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string PositionId { get; set; }
        /// <summary>
        /// Valor de texto para Comment.
        /// </summary>
        public string Comment { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string PositionName { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string DepartmentName { get; set; }
    }
}
