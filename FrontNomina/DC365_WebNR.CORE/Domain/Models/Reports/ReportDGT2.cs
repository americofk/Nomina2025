/// <summary>
/// Modelo de datos para reporte DGT-2.
/// Define la estructura de datos para el formulario DGT-2 de la Dirección General de Trabajo.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models.Reports
{
    /// <summary>
    /// Clase para gestion de ReportDGT2.
    /// </summary>
    public class ReportDGT2
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
        /// Valor de texto para Month.
        /// </summary>
        public string Month { get; set; }
        /// <summary>
        /// Valor de texto para Year.
        /// </summary>
        public string Year { get; set; }

        /// <summary>

        /// Coleccion de Details.

        /// </summary>

        public List<DGT2Detail> Details { get; set; }

        /// <summary>

        /// Valor de texto para ResgisterTypeSummary.

        /// </summary>

        public string ResgisterTypeSummary { get; set; }
        /// <summary>
        /// Valor de texto para RegisterQty.
        /// </summary>
        public string RegisterQty { get; set; }
    }

    /// <summary>

    /// Clase para gestion de DGT2Detail.

    /// </summary>

    public class DGT2Detail
    {
        /// <summary>
        /// Nombre.
        /// </summary>
        public string EmployeeName { get; set; }
        /// <summary>
        /// Valor numerico para QtyExtraHour.
        /// </summary>
        public int QtyExtraHour { get; set; }
        /// <summary>
        /// Valor numerico para TotalAmountExtraHour.
        /// </summary>
        public decimal TotalAmountExtraHour { get; set; }
    }
}
