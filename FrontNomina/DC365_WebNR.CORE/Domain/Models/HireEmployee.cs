/// <summary>
/// Modelo de datos para gestionar la contratación de empleados.
/// Define la información necesaria para procesar la incorporación de un nuevo empleado.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using DC365_WebNR.CORE.Domain.Models.Enums;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Clase para gestion de HireEmployee.
    /// </summary>
    public class HireEmployee
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string EmployeeId { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string PositionId { get; set; }
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
        /// Valor de texto para Comment.
        /// </summary>
        public string Comment { get; set; }
        /// <summary>
        /// Empleado.
        /// </summary>
        public EmployeeAction EmployeeAction { get; set; }
    }
}
