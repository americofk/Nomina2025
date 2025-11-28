/// <summary>
/// Modelo de respuesta para Tax.
/// Define la estructura de datos retornada al cliente.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Domain.Entities;
using DC365_PayrollHR.Core.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.Taxes
{
    /// <summary>
    /// Modelo de respuesta para Tax.
    /// </summary>
    public class TaxResponse
    {
        // Campos de auditoría ISO 27001
        /// <summary>
        /// Identificador único del registro.
        /// </summary>
        public long RecId { get; set; }
        /// <summary>
        /// Identificador de la empresa.
        /// </summary>
        public string DataAreaId { get; set; }
        /// <summary>
        /// Usuario que creó el registro.
        /// </summary>
        public string CreatedBy { get; set; }
        /// <summary>
        /// Fecha de creación del registro.
        /// </summary>
        public DateTime CreatedOn { get; set; }
        /// <summary>
        /// Usuario que modificó el registro.
        /// </summary>
        public string ModifiedBy { get; set; }
        /// <summary>
        /// Fecha de última modificación.
        /// </summary>
        public DateTime ModifiedOn { get; set; }

        /// <summary>
        /// Identificador.
        /// </summary>
        public string TaxId { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Valor de texto para LedgerAccount.
        /// </summary>
        public string LedgerAccount { get; set; }
        /// <summary>
        /// Fecha de ValidFrom.
        /// </summary>
        public DateTime ValidFrom { get; set; }
        /// <summary>
        /// Fecha de ValidTo.
        /// </summary>
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
