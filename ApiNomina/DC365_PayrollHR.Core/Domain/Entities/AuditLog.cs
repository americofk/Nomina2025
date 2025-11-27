/// <summary>
/// Entidad de dominio para registro de auditoria.
/// Mantiene el historial de cambios en datos para cumplimiento ISO 27001.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_PayrollHR.Core.Domain.Common;
using System;
using System.ComponentModel.DataAnnotations;

namespace DC365_PayrollHR.Core.Domain.Entities
{
    /// <summary>
    /// Audit trail for data changes compliance (ISO 27001)
    /// </summary>
    public class AuditLog : AuditableCompanyEntity
    {
        /// <summary>
        /// Entity name tracked
        /// </summary>
        [Required]
        [MaxLength(100)]
        public string EntityName { get; set; }

        /// <summary>
        /// Field name modified
        /// </summary>
        [Required]
        [MaxLength(100)]
        public string FieldName { get; set; }

        /// <summary>
        /// Previous value
        /// </summary>
        public string? OldValue { get; set; }

        /// <summary>
        /// New value
        /// </summary>
        public string? NewValue { get; set; }

        /// <summary>
        /// User who made the change
        /// </summary>
        [Required]
        [MaxLength(50)]
        public string ChangedBy { get; set; }

        /// <summary>
        /// Timestamp of change
        /// </summary>
        [Required]
        public DateTime ChangedAt { get; set; }

        /// <summary>
        /// Reference to entity RecId
        /// </summary>
        [Required]
        public long EntityRefRecId { get; set; }
    }
}
