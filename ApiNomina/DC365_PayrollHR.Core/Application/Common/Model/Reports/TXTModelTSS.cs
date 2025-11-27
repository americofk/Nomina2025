/// <summary>
/// Entidad de dominio para TXTModelTSS.
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

    /// Clase para gestion de TXTModelTSS.

    /// </summary>

    public class TXTModelTSS
    {
        /// <summary>
        /// Tipo.
        /// </summary>
        public string RegisterType { get; set; } = "E";
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

        /// Coleccion de Details.

        /// </summary>

        public List<TXTModelTSSDetail> Details { get; set; }

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

    /// Clase para gestion de TXTModelTSSDetail.

    /// </summary>

    public class TXTModelTSSDetail
    {
        /// <summary>
        /// Tipo.
        /// </summary>
        public string ResgisterType { get; set; } = "D";
        /// <summary>
        /// Codigo.
        /// </summary>
        public string PayrollCode { get; set; } = "001";
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
        /// <summary>
        /// Nombre.
        /// </summary>
        public string EmployeeSecondLastName { get; set; }
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
        public string Salary { get; set; }
        /// <summary>
        /// Salario.
        /// </summary>
        public string Salary_ISR { get; set; }
        /// <summary>
        /// Monto.
        /// </summary>
        public string EmptyAmount { get; set; }
    }
}
