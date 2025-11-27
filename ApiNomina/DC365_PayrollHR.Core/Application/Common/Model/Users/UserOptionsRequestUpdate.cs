/// <summary>
/// Modelo de solicitud para actualización de UserOptions.
/// Define los parámetros necesarios para actualizar registros.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Application.Common.Validation;
using DC365_PayrollHR.Core.Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.Users
{
    /// <summary>
    /// Clase para gestion de UserOptionsRequestUpdate.
    /// </summary>
    public class UserOptionsRequestUpdate: GenericValidation<UserOptionsRequestUpdate>, IValidatableObject
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string FormatCodeId { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string CompanyDefaultId { get; set; }

        /// <summary>

        /// Valida los datos.

        /// </summary>

        /// <param name="validationContext">Parametro validationContext.</param>

        /// <returns>Resultado de la operacion.</returns>

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            List<ValidationResult> validationResults = new List<ValidationResult>()
            {
                ForRule(this, x => string.IsNullOrWhiteSpace(x.FormatCodeId), "El código de formato no puede estar vacío"),
                ForRule(this, x => string.IsNullOrWhiteSpace(x.CompanyDefaultId), "La empresa por defecto no puede estar vacía"),
            };

            return validationResults;
        }
    }
}
