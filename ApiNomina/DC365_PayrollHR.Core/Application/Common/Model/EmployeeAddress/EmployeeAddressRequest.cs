/// <summary>
/// Modelo de solicitud para EmployeeAddress.
/// Define los parámetros necesarios para crear o modificar registros.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Application.Common.Validation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.EmployeeAddress
{
    /// <summary>
    /// Modelo de solicitud para EmployeeAddress.
    /// </summary>
    public class EmployeeAddressRequest : GenericValidation<EmployeeAddressRequest>, IValidatableObject
    {
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

        /// <summary>

        /// Valida los datos.

        /// </summary>

        /// <param name="validationContext">Parametro validationContext.</param>

        /// <returns>Resultado de la operacion.</returns>

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            List<ValidationResult> validationResults = new List<ValidationResult>()
            {
                ForRule(this, x => string.IsNullOrWhiteSpace(x.Street), "La calle no puede estar vacía"),
                ForRule(this, x => string.IsNullOrWhiteSpace(x.Home), "El número de casa o apartamento no puede estar vacío"),
                ForRule(this, x => string.IsNullOrWhiteSpace(x.City), "La ciudad no puede estar vacía"),
                ForRule(this, x => string.IsNullOrWhiteSpace(x.Province), "La provincia no puede estar vacía"),
                ForRule(this, x => string.IsNullOrWhiteSpace(x.EmployeeId), "El empleado no puede estar vacío"),
                ForRule(this, x => string.IsNullOrWhiteSpace(x.CountryId), "El país no puede estar vacío")
            };

            return validationResults;
        }
    }
}
