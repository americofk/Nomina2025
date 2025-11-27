/// <summary>
/// Modelo de datos para reporte DGT-12.
/// Define la estructura de datos para el formulario DGT-12 de la Dirección General de Trabajo.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models.Reports
{
    /// <summary>
    /// Clase para gestion de ReportDGT12.
    /// </summary>
    public class ReportDGT12
    {
        
        /// <summary>
        
        /// Valor de texto para ResgisterTypeSummary.
        
        /// </summary>
        
        public string ResgisterTypeSummary { get; set; }
        /// <summary>
        /// Valor de texto para RegisterQty.
        /// </summary>
        public string RegisterQty { get; set; }


        /// <summary>


        /// Tipo.


        /// </summary>


        public string ResgisterType { get; set; } = "E";
        /// <summary>
        /// Valor de texto para Process.
        /// </summary>
        public string Process { get; set; } = "G2";
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


        public List<DGT12Detail> Details { get; set; }

    }

    /// <summary>

    /// Clase para gestion de DGT12Detail.

    /// </summary>

    public class DGT12Detail
    {
        /// <summary>
        /// Nombre.
        /// </summary>
        public string EmployeeName { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string LastName { get; set; }
        /// <summary>
        /// Tipo.
        /// </summary>
        public string DocumentType { get; set; }
        /// <summary>
        /// Numero.
        /// </summary>
        public string DocumentNumber { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        public string DepartureDate { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string LocationId { get; set; }
    }
}
