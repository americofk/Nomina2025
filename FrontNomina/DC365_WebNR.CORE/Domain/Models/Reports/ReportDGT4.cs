/// <summary>
/// Modelo de datos para reporte DGT-4.
/// Define la estructura de datos para el formulario DGT-4 de la Dirección General de Trabajo.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System.Collections.Generic;

namespace DC365_WebNR.CORE.Domain.Models.Reports
{
    /// <summary>
    /// Clase para gestion de ReportDGT4.
    /// </summary>
    public class ReportDGT4
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
        public string Process { get; set; } = "T4";
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


        public List<DGT4Detail> Details { get; set; }
    }

    /// <summary>

    /// Clase para gestion de DGT4Detail.

    /// </summary>

    public class DGT4Detail
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
        /// Fecha.
        /// </summary>
        public string BirthDate { get; set; }
        /// <summary>
        /// Valor de texto para Gender.
        /// </summary>
        public string Gender { get; set; }
        /// <summary>
        /// Salario.
        /// </summary>
        public string Salary { get; set; }
        /// <summary>
        /// Numero.
        /// </summary>
        public string DocumentNumber { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        public string AdmissionDate { get; set; }
        /// <summary>
        /// Tipo.
        /// </summary>
        public string NoveltyType { get; set; }
    }
}
