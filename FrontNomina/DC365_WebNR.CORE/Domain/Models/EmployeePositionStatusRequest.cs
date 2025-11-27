/// <summary>
/// Modelo de solicitud para cambiar el estado de posición de empleado.
/// Define los parámetros necesarios para actualizar la asignación de posición de un empleado.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Modelo de solicitud para EmployeePositionStatus.
    /// </summary>
    public class EmployeePositionStatusRequest
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
        public DateTime ToDate { get; set; }
    }
}
