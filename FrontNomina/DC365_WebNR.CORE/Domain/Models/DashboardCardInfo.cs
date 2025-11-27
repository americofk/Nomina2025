/// <summary>
/// Modelo de datos para representar información del dashboard.
/// Contiene los contadores de elementos principales mostrados en el panel de control.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Clase para gestion de DashboardCardInfo.
    /// </summary>
    public class DashboardCardInfo
    {
        /// <summary>
        /// Empleado.
        /// </summary>
        public int Employees { get; set; }
        /// <summary>
        /// Departamento.
        /// </summary>
        public int Departments { get; set; }
        /// <summary>
        /// Puesto.
        /// </summary>
        public int Positions { get; set; }
        /// <summary>
        /// Valor numerico para Courses.
        /// </summary>
        public int Courses { get; set; }
    }
}
