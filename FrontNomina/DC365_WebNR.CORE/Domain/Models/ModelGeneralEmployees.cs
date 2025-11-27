/// <summary>
/// Modelo de datos general para empleados.
/// Agrupa información completa del empleado incluyendo datos personales y dirección.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Clase para gestion de ModelGeneralEmployees.
    /// </summary>
    public class ModelGeneralEmployees
    {
        /// <summary>
        /// Empleado.
        /// </summary>
        public Employee Employee { get; set; }
        /// <summary>
        /// Direccion.
        /// </summary>
        public EmployeeAddress EmployeeAddress { get; set; }
    }
}
