/// <summary>
/// Entidad de dominio para ReportConfig.
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
    /// Clase para gestion de ReportConfig.
    /// </summary>
    public class ReportConfig: AuditableCompanyEntity
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public int InternalId { get; set; }
        /// <summary>
        /// Salario.
        /// </summary>
        public string Salary { get; set; }
        /// <summary>
        /// Valor de texto para Comission.
        /// </summary>
        public string Comission { get; set; }
        /// <summary>
        /// Valor de texto para AFP.
        /// </summary>
        public string AFP { get; set; }
        /// <summary>
        /// Valor de texto para SFS.
        /// </summary>
        public string SFS { get; set; }
        /// <summary>
        /// Prestamo.
        /// </summary>
        public string LoanCooperative { get; set; }

        //Actualización abono de cooperativa
        /// <summary>
        /// Deduccion.
        /// </summary>
        public string DeductionCooperative { get; set; }
    }
}
