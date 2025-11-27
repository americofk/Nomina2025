/// <summary>
/// Modelo de respuesta para DGT9.
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
    /// Modelo de respuesta para DGT9.
    /// </summary>
    public class DGT9Response
    {
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
        /// Direccion.
        /// </summary>
        public string Address { get; set; }
    }
}
