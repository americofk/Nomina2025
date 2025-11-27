/// <summary>
/// Modelo de respuesta para EmployeeDocument.
/// Define la estructura de datos retornada al cliente.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.EmployeeDocuments
{
    /// <summary>
    /// Modelo de respuesta para EmployeeDocument.
    /// </summary>
    public class EmployeeDocumentResponse
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public int InternalId { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string EmployeeId { get; set; }
        /// <summary>
        /// Tipo.
        /// </summary>
        public DocumentType DocumentType { get; set; }
        /// <summary>
        /// Numero.
        /// </summary>
        public string DocumentNumber { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        public DateTime DueDate { get; set; }
        /// <summary>
        /// Valor de texto para Comment.
        /// </summary>
        public string Comment { get; set; }
        /// <summary>
        /// Indica si tiene.
        /// </summary>
        public bool HasAttach { get; set; }
        /// <summary>
        /// Indica si.
        /// </summary>
        public bool IsPrincipal { get; set; }
    }
}
