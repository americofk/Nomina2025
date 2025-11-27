/// <summary>
/// Modelo para procesamiento por lotes de empleados.
/// Permite importar o actualizar múltiples empleados de manera masiva.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Domain.Const;
using DC365_WebNR.CORE.Domain.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using DC365_WebNR.CORE.Aplication.Attributes;

namespace DC365_WebNR.CORE.Domain.Models
{

    /// <summary>

    /// Clase para gestion de EmployeeBatch.

    /// </summary>

    public class EmployeeBatch : Employee
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string PositionId { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        public DateTime PositionFromDate { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        public DateTime PositionToDate { get; set; }

    }
}
