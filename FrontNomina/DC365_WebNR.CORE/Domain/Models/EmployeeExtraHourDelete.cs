/// <summary>
/// Modelo de datos para eliminar horas extras de empleados.
/// Define los parámetros necesarios para eliminar registros de horas extras.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Clase para gestion de EmployeeExtraHourDelete.
    /// </summary>
    public class EmployeeExtraHourDelete
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string EarningCodeId { get; set; }
        /// <summary>
        /// Fecha de WorkedDay.
        /// </summary>
        [DataType(DataType.Date)]
        public DateTime WorkedDay { get; set; }
    }
}
