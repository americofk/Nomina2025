/// <summary>
/// Modelo de respuesta para ReportTSSFile.
/// Define la estructura de datos retornada al cliente.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.Reports
{
    /// <summary>
    /// Modelo de respuesta para ReportTSSFile.
    /// </summary>
    public class ReportTSSFileResponse
    {
        /// <summary>
        /// Tipo.
        /// </summary>
        public string ResgisterType { get; set; } = "E";
        /// <summary>
        /// Valor de texto para Process.
        /// </summary>
        public string Process { get; set; } = "AM";
        /// <summary>
        /// Valor de texto para RNC.
        /// </summary>
        public string RNC { get; set; }
        /// <summary>
        /// Valor de texto para Period.
        /// </summary>
        public string Period { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string PayrollName { get; set; }

        /// <summary>

        /// Coleccion de Details.

        /// </summary>

        public List<TSSFile> Details { get; set; }
    }

    /// <summary>

    /// Clase para gestion de TSSFile.

    /// </summary>

    public class TSSFile
    {
        //public string PayrollCode { get; set; }
        /// <summary>
        /// Tipo.
        /// </summary>
        public string DocumentType { get; set; }
        /// <summary>
        /// Numero.
        /// </summary>
        public string DocumentNumber { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string EmployeeName { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string EmployeeLastName { get; set; }
        //public string EmployeeSecondLastName { get; set; }
        /// <summary>
        /// Valor de texto para Gender.
        /// </summary>
        public string Gender { get; set; }
        /// <summary>
        /// Fecha.
        /// </summary>
        public string BirthDate { get; set; }
        /// <summary>
        /// Salario.
        /// </summary>
        public decimal Salary { get; set; }
        /// <summary>
        /// Salario.
        /// </summary>
        public decimal Salary_ISR { get; set; }
    }
}
