/// <summary>
/// Modelo de datos para representar la relación entre empleados y departamentos.
/// Define la asignación de empleados a departamentos con fechas de vigencia.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Domain.Const;
using System;
using System.ComponentModel.DataAnnotations;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Clase para gestion de EmployeeDepartment.
    /// </summary>
    public class EmployeeDepartment
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string EmployeeId { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string DepartmentId { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        [DataType(DataType.Date)]
        public DateTime FromDate { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        [DataType(DataType.Date)]
        public DateTime ToDate { get; set; }
        /// <summary>
        /// Estado.
        /// </summary>
        public bool EmployeeDepartmentStatus { get; set; }
        /// <summary>
        /// Valor de texto para Comment.
        /// </summary>
        public string Comment { get; set; }

    }
}
