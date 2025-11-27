/// <summary>
/// Modelo para procesamiento por lotes de documentos de empleados.
/// Permite importar o actualizar múltiples documentos de empleados de manera masiva.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.Collections.Generic;
using System.Text;
using DC365_WebNR.CORE.Domain.Models.Enums;


namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Clase para gestion de EmployeeDocumentBatch.
    /// </summary>
    public class EmployeeDocumentBatch
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string EmployeeId { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string EmployeeName { get; set; }
        /// <summary>
        /// Tipo.
        /// </summary>
        public DocumentType DocumentType { get; set; }
        /// <summary>
        /// Numero.
        /// </summary>
        public string DocumentNumber { get; set; }
        /// <summary>
        /// Indica si.
        /// </summary>
        public bool IsPrincipal { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        public DateTime DueDate { get; set; }
         
    }
}
