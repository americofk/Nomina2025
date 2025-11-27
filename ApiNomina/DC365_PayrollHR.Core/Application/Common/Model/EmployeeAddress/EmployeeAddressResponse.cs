/// <summary>
/// Modelo de respuesta para EmployeeAddress.
/// Define la estructura de datos retornada al cliente.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.EmployeeAddress
{
    /// <summary>
    /// Modelo de respuesta para EmployeeAddress.
    /// </summary>
    public class EmployeeAddressResponse
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public int InternalId { get; set; }
        /// <summary>
        /// Valor de texto para Street.
        /// </summary>
        public string Street { get; set; }
        /// <summary>
        /// Valor de texto para Home.
        /// </summary>
        public string Home { get; set; }
        /// <summary>
        /// Valor de texto para Sector.
        /// </summary>
        public string Sector { get; set; }
        /// <summary>
        /// Ciudad.
        /// </summary>
        public string City { get; set; }
        /// <summary>
        /// Provincia.
        /// </summary>
        public string Province { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string ProvinceName { get; set; }
        /// <summary>
        /// Valor de texto para Comment.
        /// </summary>
        public string Comment { get; set; }
        /// <summary>
        /// Indica si.
        /// </summary>
        public bool IsPrincipal { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string EmployeeId { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string CountryId { get; set; }
    }
}
