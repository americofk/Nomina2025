/// <summary>
/// Modelo de datos para representar historial de operaciones por lotes.
/// Registra el seguimiento y estado de las importaciones masivas realizadas.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Domain.Models.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Clase para gestion de BatchHistory.
    /// </summary>
    public class BatchHistory
    {
        
        /// <summary>
        
        /// Identificador.
        
        /// </summary>
        
        public int InternalId { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        public DateTime StartDate { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        public DateTime EndDate { get; set; }
        /// <summary>
        /// Obtiene o establece BatchEntity.
        /// </summary>
        public BatchEntity BatchEntity { get; set; }
        /// <summary>
        /// Valor de texto para Information.
        /// </summary>
        public string Information { get; set; }
        /// <summary>
        /// Indica si.
        /// </summary>
        public bool IsError { get; set; } = false;
        /// <summary>
        /// Indica si.
        /// </summary>
        public bool IsFinished { get; set; } = false;
        /// <summary>
        /// Valor de texto para SeparatorOption.
        /// </summary>
        public string SeparatorOption { get; set; } = ",";
    }
}
