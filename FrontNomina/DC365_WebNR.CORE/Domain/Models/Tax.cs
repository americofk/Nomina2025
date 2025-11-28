/// <summary>
/// Modelo de datos para representar impuestos.
/// Define la configuración de impuestos aplicables a la nómina.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Aplication.Attributes;
using DC365_WebNR.CORE.Domain.Const;
using DC365_WebNR.CORE.Domain.Models.Common;
using DC365_WebNR.CORE.Domain.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Clase para gestion de Tax.
    /// </summary>
    public class Tax : AuditableCompanyModel
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        [CustomFilter("Id Impuesto")]
        [Required(ErrorMessage = "Código de impuesto" + ErrorMsg.Emptym)]
        public string TaxId { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        [Required(ErrorMessage = "Nombre del impuesto" + ErrorMsg.Emptym)]
        [CustomFilter("Nombre")]
        public string Name { get; set; }
        /// <summary>
        /// Valor de texto para LedgerAccount.
        /// </summary>
        public string LedgerAccount { get; set; }
        /// <summary>
        /// Fecha de ValidFrom.
        /// </summary>
        [DataType(DataType.Date)]
        public DateTime ValidFrom { get; set; }
        /// <summary>
        /// Fecha de ValidTo.
        /// </summary>
        [DataType(DataType.Date)]
        public DateTime ValidTo { get; set; }
        /// <summary>
        /// Valor de texto para Currency.
        /// </summary>
        public string Currency { get; set; }
        /// <summary>
        /// Monto.
        /// </summary>
        public decimal MultiplyAmount { get; set; }
        /// <summary>
        /// Obtiene o establece PayFrecuency.
        /// </summary>
        public PayFrecuency PayFrecuency { get; set; }
        /// <summary>
        /// Descripcion.
        /// </summary>
        public string Description { get; set; }
        /// <summary>
        /// Valor de texto para LimitPeriod.
        /// </summary>
        public string LimitPeriod { get; set; }
        /// <summary>
        /// Monto.
        /// </summary>
        public decimal LimitAmount { get; set; }
        /// <summary>
        /// Obtiene o establece IndexBase.
        /// </summary>
        public IndexBase IndexBase { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        [CustomFilter("Proyecto")]
        public string ProjId { get; set; }
        /// <summary>
        /// Valor de texto para ProjCategory.
        /// </summary>
        public string ProjCategory { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string DepartmentId { get; set; }
        /// <summary>
        /// Estado.
        /// </summary>
        public bool TaxStatus { get; set; }

        /// <summary>

        /// Impuesto.

        /// </summary>

        public List<TaxDetail> TaxDetails { get; set; }
    }
}
