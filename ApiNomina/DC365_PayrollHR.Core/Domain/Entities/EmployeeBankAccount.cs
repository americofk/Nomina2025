/// <summary>
/// Entidad de dominio para EmployeeBankAccount.
/// Gestiona la información y comportamiento de la entidad.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Domain.Common;
using DC365_PayrollHR.Core.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Domain.Entities
{
    /// <summary>
    /// Clase para gestion de EmployeeBankAccount.
    /// </summary>
    public class EmployeeBankAccount: AuditableCompanyEntity
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string EmployeeId { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public int InternalId { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        public string BankName { get; set; }
        /// <summary>
        /// Tipo.
        /// </summary>
        public AccountType AccountType { get; set; }
        /// <summary>
        /// Valor de texto para AccountNum.
        /// </summary>
        public string AccountNum { get; set; }
        /// <summary>
        /// Valor de texto para Comment.
        /// </summary>
        public string Comment { get; set; }
        /// <summary>
        /// Indica si.
        /// </summary>
        public bool IsPrincipal { get; set; }
        /// <summary>
        /// Valor de texto para Currency.
        /// </summary>
        public string Currency { get; set; }
    }
}
