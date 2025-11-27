/// <summary>
/// Modelo de solicitud para UserChangePassword.
/// Define los parámetros necesarios para crear o modificar registros.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Application.Common.Validation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.Users
{
    /// <summary>
    /// Modelo de solicitud para UserChangePassword.
    /// </summary>
    public class UserChangePasswordRequest: GenericValidation<UserChangePasswordRequest>, IValidatableObject
    {
        /// <summary>
        /// Correo electronico.
        /// </summary>
        public string Email { get; set; }

        /// <summary>

        /// Contrasena.

        /// </summary>

        public string TemporaryPassword { get; set; }

        /// <summary>

        /// Contrasena.

        /// </summary>

        public string NewPassword { get; set; }

        /// <summary>

        /// Valida los datos.

        /// </summary>

        /// <param name="validationContext">Parametro validationContext.</param>

        /// <returns>Resultado de la operacion.</returns>

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            List<ValidationResult> validationResults = new List<ValidationResult>()
            {
                ForRule(this, x => string.IsNullOrWhiteSpace(x.Email), "El correo no puede estar vacío"),
                ForRule(this, x => string.IsNullOrWhiteSpace(x.TemporaryPassword), "La contraseña temporal no puede estar vacía"),
                ForRule(this, x => string.IsNullOrWhiteSpace(x.NewPassword), "La contraseña no puede estar vacía")
            };

            return validationResults;
        }
    }
}
