/// <summary>
/// Modelo de solicitud para Login.
/// Define los parámetros necesarios para crear o modificar registros.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Application.Common.Validation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.User
{
    /// <summary>
    /// Modelo de solicitud para Login.
    /// </summary>
    public class LoginRequest : GenericValidation<LoginRequest>, IValidatableObject
    {
        /// <summary>
        /// Correo electronico.
        /// </summary>
        public string Email { get; set; }
        /// <summary>
        /// Contrasena.
        /// </summary>
        public string Password { get; set; }
        /// <summary>
        /// Indica si.
        /// </summary>
        public bool IsValidateUser { get; set; }

        /// <summary>

        /// Valida los datos.

        /// </summary>

        /// <param name="validationContext">Parametro validationContext.</param>

        /// <returns>Resultado de la operacion.</returns>

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            List<ValidationResult> validationResults = new List<ValidationResult>()
            {
                ForRule(this, x => string.IsNullOrWhiteSpace(x.Email), "El correo o nombre de usuario no puede estar vacío"),
                ForRule(this, x => x.IsValidateUser && !string.IsNullOrWhiteSpace(x.Password), "La contraseña no es necesaria para validar al usuario"),
                ForRule(this, x => !x.IsValidateUser && string.IsNullOrWhiteSpace(x.Password), "La contraseña no puede estar vacía")

            };

            return validationResults;
        }
    }
}
