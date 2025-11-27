/// <summary>
/// Modelo de solicitud para ReportConfig.
/// Define los parámetros necesarios para crear o modificar registros.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.Reports
{
    /// <summary>
    /// Modelo de solicitud para ReportConfig.
    /// </summary>
    public class ReportConfigRequest
    {
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
