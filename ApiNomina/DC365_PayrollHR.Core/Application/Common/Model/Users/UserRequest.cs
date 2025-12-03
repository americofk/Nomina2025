/// <summary>
/// Modelo de solicitud para User.
/// Define los parámetros necesarios para crear o modificar registros.
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
    /// Modelo de solicitud para User.
    /// </summary>
    public class UserRequest: GenericValidation<UserRequest>, IValidatableObject
    {
        /// <summary>
        /// Valor de texto para Alias.
        /// </summary>
        public string Alias { get; set; }
        /// <summary>
        /// Correo electronico.
        /// </summary>
        public string Email { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string FormatCodeId { get; set; } = "en-US";
        /// <summary>
        /// Tipo.
        /// </summary>
        public AdminType ElevationType { get; set; } = AdminType.User;
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
                ForRule(this, x => string.IsNullOrWhiteSpace(x.Alias), "El alias del usuario no puede estar vacío"),
                ForRule(this, x => string.IsNullOrWhiteSpace(x.Email), "El email no puede estar vacío"),
                ForRule(this, x => !Enum.IsDefined(typeof(AdminType), x.ElevationType), "El tipo de usuario suministrado no es válido")
            };

            return validationResults;
        }
    }
}
