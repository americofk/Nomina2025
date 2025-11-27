/// <summary>
/// Modelo de solicitud para Instructor.
/// Define los parámetros necesarios para crear o modificar registros.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Application.Common.Validation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.Instructors
{
    /// <summary>
    /// Modelo de solicitud para Instructor.
    /// </summary>
    public class InstructorRequest : GenericValidation<InstructorRequest>, IValidatableObject
    {
        /// <summary>
        /// Nombre.
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Telefono.
        /// </summary>
        public string Phone { get; set; }
        /// <summary>
        /// Valor de texto para Mail.
        /// </summary>
        public string Mail { get; set; }
        /// <summary>
        /// Empresa.
        /// </summary>
        public string Company { get; set; }
        /// <summary>
        /// Valor de texto para Comment.
        /// </summary>
        public string Comment { get; set; }

        /// <summary>

        /// Valida los datos.

        /// </summary>

        /// <param name="validationContext">Parametro validationContext.</param>

        /// <returns>Resultado de la operacion.</returns>

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            List<ValidationResult> validationResults = new List<ValidationResult>()
            {
                ForRule(this, x => string.IsNullOrWhiteSpace(x.Name), "El alias del usuario no puede estar vacío"),
                ForRule(this, x => string.IsNullOrWhiteSpace(x.Phone) && string.IsNullOrWhiteSpace(x.Mail), "Debe suministrar al menos un medio de contacto"),
                ForRule(this, x => string.IsNullOrWhiteSpace(x.Company), "La compañía no puede estar vacía")
            };

            return validationResults;
        }
    }
}
