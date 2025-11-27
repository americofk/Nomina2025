/// <summary>
/// Modelo de datos para representar posiciones asignadas a empleados.
/// Define el puesto o cargo que ocupa un empleado en un período específico.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Domain.Const;
using System;
using System.ComponentModel.DataAnnotations;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Clase para gestion de EmployeePosition.
    /// </summary>
    public class EmployeePosition
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        [Required(ErrorMessage = "Puesto" + ErrorMsg.Emptym)]
        public string PositionId { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string PositionName { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        [Required(ErrorMessage = "Fecha desde" + ErrorMsg.Emptyf)]

        [DataType(DataType.Date)]
        public DateTime FromDate { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        [Required(ErrorMessage = "Fecha hasta" + ErrorMsg.Emptyf)]

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
