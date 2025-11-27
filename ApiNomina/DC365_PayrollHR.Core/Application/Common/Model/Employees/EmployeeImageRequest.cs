/// <summary>
/// Modelo de solicitud para EmployeeImage.
/// Define los parámetros necesarios para crear o modificar registros.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Application.Common.Validation;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.Employees
{
    /// <summary>
    /// Modelo de solicitud para EmployeeImage.
    /// </summary>
    public class EmployeeImageRequest : GenericValidation<EmployeeImageRequest>, IValidatableObject
    {
        /// <summary>
        /// Archivo.
        /// </summary>
        public IFormFile File { get; set; }

        /// <summary>

        /// Valida los datos.

        /// </summary>

        /// <param name="validationContext">Parametro validationContext.</param>

        /// <returns>Resultado de la operacion.</returns>

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            List<ValidationResult> validationResults = new List<ValidationResult>()
            {
                //ForRule(this, x => string.IsNullOrWhiteSpace(x.Alias), "El alias no puede estar vacío"),
                ForRule(this, x => File.Length == 0 || File.Length > 1048576, "El tamaño del archivo debe ser mayor a 0 y menor a 1 mb")
                //ForRule(this, x => !File.ContentType.Contains("png") && !File.ContentType.Contains("jpg"), "La extensión del archivo debe ser png o jpg")
            };

            return validationResults;
        }
    }
}
