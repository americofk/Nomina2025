/// <summary>
/// Entidad de dominio para TXTModelDGT4.
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
    /// Clase para gestion de TXTModelDGT4.
    /// </summary>
    public class TXTModelDGT4
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

        public List<TXTModelDGT4Detail> Details { get; set; }

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

    /// Clase para gestion de TXTModelDGT4Detail.

    /// </summary>

    public class TXTModelDGT4Detail
    {
        /// <summary>
        /// Tipo.
        /// </summary>
        public string ResgisterType { get; set; } = "D";
        /// <summary>
        /// Tipo.
        /// </summary>
        public string ActionType { get; set; }
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
        public string Name { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string LastName { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string SecondLastName { get; set; }
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
        /// Fecha.
        /// </summary>
        public string DismissDate { get; set; }
        /// <summary>
        /// Valor de texto para Occupation.
        /// </summary>
        public string Occupation { get; set; }
        /// <summary>
        /// Descripcion.
        /// </summary>
        public string OccupationDescription { get; set; }
        /// <summary>
        /// Valor de texto para StartVacation.
        /// </summary>
        public string StartVacation { get; set; }
        /// <summary>
        /// Valor de texto para EndVacation.
        /// </summary>
        public string EndVacation { get; set; }
        /// <summary>
        /// Valor de texto para Turn.
        /// </summary>
        public string Turn { get; set; }
        /// <summary>
        /// Valor de texto para Location.
        /// </summary>
        public string Location { get; set; }
        /// <summary>
        /// Valor de texto para Nationality.
        /// </summary>
        public string Nationality { get; set; }
        /// <summary>
        /// Valor de texto para DateChange.
        /// </summary>
        public string DateChange { get; set; }

        /// <summary>

        /// Valor de texto para EductionalLevel.

        /// </summary>

        public string EductionalLevel { get; set; }
        /// <summary>
        /// Valor de texto para Disability.
        /// </summary>
        public string Disability { get; set; }
    }
}
