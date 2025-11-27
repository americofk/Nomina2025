/// <summary>
/// Modelo de solicitud para MenuToUser.
/// Define los parámetros necesarios para crear o modificar registros.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Application.Common.Validation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.MenuAssignedToUsers
{
    /// <summary>
    /// Modelo de solicitud para MenuToUser.
    /// </summary>
    public class MenuToUserRequest: GenericValidation<MenuToUserRequest>, IValidatableObject
    {
        /// <summary>
        /// Valor de texto para Alias.
        /// </summary>
        public string Alias { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public string MenuId { get; set; }
        /// <summary>
        /// Indica el estado de PrivilegeView.
        /// </summary>
        public bool PrivilegeView { get; set; }
        /// <summary>
        /// Indica el estado de PrivilegeEdit.
        /// </summary>
        public bool PrivilegeEdit { get; set; }
        /// <summary>
        /// Indica el estado de PrivilegeDelete.
        /// </summary>
        public bool PrivilegeDelete { get; set; }

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
                ForRule(this, x => string.IsNullOrWhiteSpace(x.MenuId), "El menú no puede estar vacío"),
                ForRule(this, x => !PrivilegeView && !PrivilegeEdit && !PrivilegeDelete , "Debe establecer al menos el privilegio para ver"),
                ForRule(this, x => PrivilegeView && PrivilegeEdit && PrivilegeDelete, "Debe establecer solo un privilegio")
            };

            return validationResults;
        }
    }
}
