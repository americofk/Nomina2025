/// <summary>
/// Modelo de respuesta para DGT4.
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
    /// Modelo de respuesta para DGT4.
    /// </summary>
    public class DGT4Response
    {
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
        /// Valor de texto para Period.
        /// </summary>
        public string Period { get; set; }

        /// <summary>

        /// Coleccion de Details.

        /// </summary>

        public List<DGT4Detail> Details { get; set; }

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

    /// Clase para gestion de DGT4Detail.

    /// </summary>

    public class DGT4Detail
    {
        /// <summary>
        /// Tipo.
        /// </summary>
        public string NoveltyType { get; set; }
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
    
    //public class DGT4Details
    //{
    //    public string ResgisterType { get; set; }
    //    public string ActionType { get; set; }
    //    public string DocumentType { get; set; }
    //    public string DocumentNumber { get; set; }
    //    public string Names { get; set; }
    //    public string LastName { get; set; }
    //    public string SecondLastName { get; set; }
    //    public string BirthDate { get; set; }
    //    public string Gender { get; set; }
    //    public string Salary { get; set; }
    //    public string StartDate { get; set; }
    //    public string EndDate { get; set; }
    //    public string Job { get; set; }
    //    public string JobDescription { get; set; }
    //    public string StartVacation { get; set; }
    //    public string EndVacation { get; set; }
    //    public string Turn { get; set; }
    //    public string Location { get; set; }
    //    public string Nationality { get; set; }
    //    public string ChangeDate { get; set; }
    //    public string EductionalLevel { get; set; }
    //    public string Disability { get; set; }
    //}
}
