/// <summary>
/// Entidad de dominio para TXTModelDGT2.
/// Gestiona la información y comportamiento de la entidad.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.Reports
{
    /// <summary>
    /// Clase para gestion de TXTModelDGT2.
    /// </summary>
    public class TXTModelDGT2
    {
        /// <summary>
        /// Tipo.
        /// </summary>
        public string ResgisterType { get; set; } = "E";
        /// <summary>
        /// Valor de texto para Process.
        /// </summary>
        public string Process { get; set; } = "T2";
        /// <summary>
        /// Valor de texto para RNC.
        /// </summary>
        public string RNC { get; set; }
        /// <summary>
        /// Valor de texto para Period.
        /// </summary>
        public string Period { get; set; }

        /// <summary>

        /// Coleccion de Details.

        /// </summary>

        public List<TXTModelDGT2Detail> Details { get; set; }

        /// <summary>

        /// Valor de texto para ResgisterTypeSummary.

        /// </summary>

        public string ResgisterTypeSummary { get; set; } = "S";
        /// <summary>
        /// Valor de texto para RegisterQty.
        /// </summary>
        public string RegisterQty { get; set; }
    }

    /// <summary>

    /// Clase para gestion de TXTModelDGT2Detail.

    /// </summary>

    public class TXTModelDGT2Detail
    {
        /// <summary>
        /// Tipo.
        /// </summary>
        public string ResgisterType { get; set; } = "D";
        /// <summary>
        /// Tipo.
        /// </summary>
        public string ActionType { get; set; } = "NC ";
        /// <summary>
        /// Tipo.
        /// </summary>
        public string DocumentType { get; set; }
        /// <summary>
        /// Numero.
        /// </summary>
        public string DocumentNumber { get; set; }
        /// <summary>
        /// Valor de texto para Location.
        /// </summary>
        public string Location { get; set; }
        /// <summary>
        /// Valor de texto para AmountByNormalHour.
        /// </summary>
        public string AmountByNormalHour { get; set; }
        /// <summary>
        /// Valor de texto para DayH.
        /// </summary>
        public string DayH { get; set; }
        /// <summary>
        /// Valor de texto para Reason.
        /// </summary>
        public string Reason { get; set; }
    }
}
