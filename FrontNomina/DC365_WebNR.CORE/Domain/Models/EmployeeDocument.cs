/// <summary>
/// Modelo de datos para representar documentos de empleados.
/// Define los documentos de identidad y certificados asociados a cada empleado.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Domain.Const;
using DC365_WebNR.CORE.Domain.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Clase para gestion de EmployeeDocument.
    /// </summary>
    public class EmployeeDocument
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public int InternalId { get; set; }
        /// <summary>
        /// Tipo.
        /// </summary>
        public DocumentType DocumentType { get; set; }
        /// <summary>
        /// Numero.
        /// </summary>
        [Required(ErrorMessage = "Número de documento" + ErrorMsg.Emptym)]
        public string DocumentNumber { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        [Required(ErrorMessage = "Fecha de vencimiento" + ErrorMsg.Emptym)]
        [DataType(DataType.Date)]
        public DateTime DueDate { get; set; }
        /// <summary>
        /// Valor de texto para Comment.
        /// </summary>
        public string Comment { get; set; }
        /// <summary>
        /// Archivo.
        /// </summary>
        public byte[] FileAttach { get; set; }
        /// <summary>
        /// Empleado.
        /// </summary>
        public string EmployeeIdDocument { get; set; }
        /// <summary>
        /// Indica si.
        /// </summary>
        public bool IsPrincipal { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string EmployeeId
        {
            get
            {
                return EmployeeIdDocument;
            }
        }
    }
}
