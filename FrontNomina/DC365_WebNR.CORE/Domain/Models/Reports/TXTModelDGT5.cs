/// <summary>
/// Modelo de datos para archivo de texto DGT-5.
/// Define el formato de exportación en texto plano para formulario DGT-5.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models.Reports
{
    /// <summary>
    /// Clase para gestion de TXTModelDGT5.
    /// </summary>
    public class TXTModelDGT5
    {
        /// <summary>
        /// Tipo.
        /// </summary>
        public string ResgisterType { get; set; } = "E";
        /// <summary>
        /// Valor de texto para Process.
        /// </summary>
        public string Process { get; set; } = "T5";
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

        public List<TXTModelDGT5Detail> Details { get; set; }

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

    /// Clase para gestion de TXTModelDGT5Detail.

    /// </summary>

    public class TXTModelDGT5Detail
    {
        /// <summary>
        /// Tipo.
        /// </summary>
        public string ResgisterType { get; set; } = "D";
        /// <summary>
        /// Tipo.
        /// </summary>
        public string ActionType { get; set; } = "NI ";
        /// <summary>
        /// Tipo.
        /// </summary>
        public string DocumentType { get; set; }
        /// <summary>
        /// Numero.
        /// </summary>
        public string DocumentNumber { get; set; }

        /// <summary>

        /// Salario.

        /// </summary>

        public string Salary { get; set; }
        /// <summary>
        /// Salario.
        /// </summary>
        public string SalaryDiary { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        public string AdmissionDate { get; set; }
        /// <summary>
        /// Valor de texto para Occupation.
        /// </summary>
        public string Occupation { get; set; }
        /// <summary>
        /// Descripcion.
        /// </summary>
        public string OccupationDescription { get; set; }
        /// <summary>
        /// Valor de texto para Turn.
        /// </summary>
        public string Turn { get; set; }
        /// <summary>
        /// Valor de texto para Location.
        /// </summary>
        public string Location { get; set; }
        /// <summary>
        /// Valor de texto para EductionalLevel.
        /// </summary>
        public string EductionalLevel { get; set; }
        /// <summary>
        /// Valor de texto para Disability.
        /// </summary>
        public string Disability { get; set; }
        /// <summary>
        /// Valor de texto para WorkedDays.
        /// </summary>
        public string WorkedDays { get; set; }
    }
}
