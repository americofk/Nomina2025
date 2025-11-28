/// <summary>
/// Modelo de respuesta para User.
/// Define la estructura de datos retornada al cliente.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.Users
{
    /// <summary>
    /// Modelo de respuesta para User.
    /// </summary>
    public class UserResponse
    {
        // Campos de auditoría ISO 27001
        /// <summary>
        /// Identificador único del registro.
        /// </summary>
        public long RecId { get; set; }
        /// <summary>
        /// Identificador de la empresa.
        /// </summary>
        public string DataAreaId { get; set; }
        /// <summary>
        /// Usuario que creó el registro.
        /// </summary>
        public string CreatedBy { get; set; }
        /// <summary>
        /// Fecha de creación del registro.
        /// </summary>
        public DateTime CreatedOn { get; set; }
        /// <summary>
        /// Usuario que modificó el registro.
        /// </summary>
        public string ModifiedBy { get; set; }
        /// <summary>
        /// Fecha de última modificación.
        /// </summary>
        public DateTime ModifiedOn { get; set; }

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
        public string FormatCodeId { get; set; }
        /// <summary>
        /// Tipo.
        /// </summary>
        public AdminType ElevationType { get; set; } 
        /// <summary>
        /// Identificador.
        /// </summary>
        public string CompanyDefaultId { get; set; }
    }
}
