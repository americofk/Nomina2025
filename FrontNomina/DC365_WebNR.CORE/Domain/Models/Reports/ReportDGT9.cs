/// <summary>
/// Modelo de datos para reporte DGT-9.
/// Define la estructura de datos para el formulario DGT-9 de la Dirección General de Trabajo.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models.Reports
{
    /// <summary>
    /// Clase para gestion de ReportDGT9.
    /// </summary>
    public class ReportDGT9
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
        public string Process { get; set; } = "T9";
        /// <summary>
        /// Valor de texto para RNC.
        /// </summary>
        public string RNC { get; set; }
        /// <summary>
        /// Valor de texto para Period.
        /// </summary>
        public string Period { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        public string StartDate { get; set; }
        /// <summary>
        /// Valor de texto para Duration.
        /// </summary>
        public string Duration { get; set; }
        /// <summary>
        /// Valor de texto para CauseSuspension.
        /// </summary>
        public string CauseSuspension { get; set; }


        /// <summary>


        /// Coleccion de Details.


        /// </summary>


        public List<DGT9Detail> Details { get; set; }

    }

    /// <summary>

    /// Clase para gestion de DGT9Detail.

    /// </summary>

    public class DGT9Detail
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
        /// Numero.
        /// </summary>
        public string PhoneNumber { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string LocationId { get; set; }
        /// <summary>
        /// Provincia.
        /// </summary>
        public string Province { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string ProvinceName { get; set; }
        /// <summary>
        /// Direccion.
        /// </summary>
        public string Address { get; set; }
    }
}
