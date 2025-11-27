/// <summary>
/// Modelo de respuesta para días festivos en el calendario.
/// Contiene información sobre los días no laborables y vacaciones del sistema.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Aplication.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Modelo de respuesta para CalendarHoliday.
    /// </summary>
    public class CalendarHolidayResponse
    {
        /// <summary>
        /// Fecha.
        /// </summary>
        [CustomFilter("Fecha")]
        [DataType(DataType.Date)]
        public DateTime CalendarDate { get; set; }
        /// <summary>
        /// Descripcion.
        /// </summary>
        [CustomFilter("Descripción")]
        public string Description { get; set; }
    }
}
