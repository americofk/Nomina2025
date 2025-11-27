/// <summary>
/// Modelo de datos para reporte DGT-11.
/// Define la estructura de datos para el formulario DGT-11 de la Dirección General de Trabajo.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models.Reports
{
    /// <summary>
    /// Clase para gestion de ReportDGT11.
    /// </summary>
    public class ReportDGT11
    {
        /// <summary>
        /// Tipo.
        /// </summary>
        public string ResgisterType { get; set; }
        /// <summary>
        /// Valor de texto para Process.
        /// </summary>
        public string Process { get; set; }
        /// <summary>
        /// Valor de texto para RNC.
        /// </summary>
        public string RNC { get; set; }
        /// <summary>
        /// Valor de texto para Period.
        /// </summary>
        public string Period { get; set; }
        /// <summary>
        /// Valor de texto para DateStar.
        /// </summary>
        public string DateStar { get; set; }
        /// <summary>
        /// Valor de texto para Duration.
        /// </summary>
        public string Duration { get; set; }
    }
}
