/// <summary>
/// Modelo de respuesta para DGT3.
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
    /// Modelo de respuesta para DGT3.
    /// </summary>
    public class DGT3Response
    {
        /// <summary>
        /// Tipo.
        /// </summary>
        public string ResgisterType { get; set; } = "E";
        /// <summary>
        /// Valor de texto para Process.
        /// </summary>
        public string Process { get; set; } = "T3";
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

        public List<DGT3Detail> Details { get; set; }

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

    /// Clase para gestion de DGT3Detail.

    /// </summary>

    public class DGT3Detail
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
        /// Fecha.
        /// </summary>
        public string AdmissionDate { get; set; }
        /// <summary>
        /// Numero.
        /// </summary>
        public string DocumentNumber { get; set; }
    }
}
