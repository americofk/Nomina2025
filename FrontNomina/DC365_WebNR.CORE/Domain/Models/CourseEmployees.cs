/// <summary>
/// Modelo de datos para representar empleados inscritos en cursos.
/// Define la relación entre empleados y los cursos a los que asisten.
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
    /// Clase para gestion de CourseEmployees.
    /// </summary>
    public class CourseEmployees
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string CourseId
        {
            get
            {
                return CourseIdEmployeeId;
            }
        }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string EmployeeId { get; set; }
        /// <summary>
        /// Valor de texto para Comment.
        /// </summary>
        public string Comment { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string CourseIdEmployeeId { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string EmployeeName { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string DepartmentName { get; set; }
       
       
    }
}
