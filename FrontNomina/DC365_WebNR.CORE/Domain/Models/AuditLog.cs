/// <summary>
/// Modelo para gestión de registros de auditoría ISO 27001.
/// Permite rastrear cambios en las entidades del sistema.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Aplication.Attributes;
using DC365_WebNR.CORE.Domain.Models.Common;
using System;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Modelo para registro de auditoría.
    /// </summary>
    public class AuditLog : AuditableCompanyModel
    {
        /// <summary>
        /// Nombre de la entidad rastreada.
        /// </summary>
        [CustomFilter("Entidad")]
        public string EntityName { get; set; }

        /// <summary>
        /// Nombre del campo modificado.
        /// </summary>
        [CustomFilter("Campo")]
        public string FieldName { get; set; }

        /// <summary>
        /// Valor anterior del campo.
        /// </summary>
        [CustomFilter("Valor Anterior")]
        public string OldValue { get; set; }

        /// <summary>
        /// Nuevo valor del campo.
        /// </summary>
        [CustomFilter("Nuevo Valor")]
        public string NewValue { get; set; }

        /// <summary>
        /// Usuario que realizó el cambio.
        /// </summary>
        [CustomFilter("Modificado Por")]
        public string ChangedBy { get; set; }

        /// <summary>
        /// Fecha y hora del cambio.
        /// </summary>
        [CustomFilter("Fecha Cambio")]
        public DateTime ChangedAt { get; set; }

        /// <summary>
        /// RecId de la entidad referenciada.
        /// </summary>
        public long EntityRefRecId { get; set; }
    }
}
