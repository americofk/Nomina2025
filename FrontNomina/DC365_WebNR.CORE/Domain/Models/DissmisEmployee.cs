/// <summary>
/// Modelo de datos para gestionar el despido de empleados.
/// Define la información necesaria para procesar la terminación de un empleado.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Domain.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Clase para gestion de DissmisEmployee.
    /// </summary>
    public class DissmisEmployee
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string EmployeeId { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        [DataType(DataType.Date)]
        public DateTime ToDate { get; set; }
        /// <summary>
        /// Empleado.
        /// </summary>
        public EmployeeAction EmployeeAction { get; set; }
    }
}
