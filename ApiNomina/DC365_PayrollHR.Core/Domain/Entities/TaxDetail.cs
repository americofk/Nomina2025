/// <summary>
/// Entidad de dominio para TaxDetail.
/// Gestiona la información y comportamiento de la entidad.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Domain.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Domain.Entities
{
    /// <summary>
    /// Clase para gestion de TaxDetail.
    /// </summary>
    public class TaxDetail: AuditableCompanyEntity
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public int InternalId { get; set; }
        //Salario anual superior a 
        /// <summary>
        /// Valor numerico para AnnualAmountHigher.
        /// </summary>
        public decimal AnnualAmountHigher { get; set; }

        //Salario anual no excede 
        /// <summary>
        /// Valor numerico para AnnualAmountNotExceed.
        /// </summary>
        public decimal AnnualAmountNotExceed { get; set; }

        /// <summary>

        /// Porcentaje.

        /// </summary>

        public decimal Percent { get; set; }

        /// <summary>

        /// Monto.

        /// </summary>

        public decimal FixedAmount { get; set; }

        /// <summary>

        /// Valor numerico para ApplicableScale.

        /// </summary>

        public decimal ApplicableScale { get; set; }

        /// <summary>

        /// Identificador.

        /// </summary>

        public string TaxId { get; set; }
    }
}
