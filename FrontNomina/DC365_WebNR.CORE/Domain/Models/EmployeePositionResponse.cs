/// <summary>
/// Modelo de respuesta para posiciones de empleados.
/// Contiene información sobre los puestos asignados a empleados.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Modelo de respuesta para EmployeePosition.
    /// </summary>
    public class EmployeePositionResponse: GenericError
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string PositionId { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string PositionName { get; set; }

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
        public bool EmployeePositionStatus { get; set; }
        /// <summary>
        /// Valor de texto para Comment.
        /// </summary>
        public string Comment { get; set; }
        /// <summary>
        /// Empleado.
        /// </summary>
        public string EmployeeIdPosition { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string EmployeeId
        {
            get
            {
                return EmployeeIdPosition;
            }
        }
    }
}
