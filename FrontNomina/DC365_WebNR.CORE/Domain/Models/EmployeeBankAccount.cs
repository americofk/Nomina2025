/// <summary>
/// Modelo de datos para representar cuentas bancarias de empleados.
/// Define la información bancaria para pagos y depósitos de nómina.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Domain.Const;
using DC365_WebNR.CORE.Domain.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    /// <summary>
    /// Clase para gestion de EmployeeBankAccount.
    /// </summary>
    public class EmployeeBankAccount: GenericError
    {
        /// <summary>
        /// Empleado.
        /// </summary>
        public string EmployeeIdBankAccount { get; set; }
        /// <summary>
        /// Identificador.
        /// </summary>
        public int InternalId { get; set; }
        /// <summary>
        /// Nombre.
        /// </summary>
        [Required(ErrorMessage = "Nombre del banco" + ErrorMsg.Emptym)]

        public string BankName { get; set; }
        /// <summary>
        /// Tipo.
        /// </summary>
        public AccountType AccountType { get; set; }
        /// <summary>
        /// Valor de texto para AccountNum.
        /// </summary>
        [Required(ErrorMessage = "Número de cuenta" + ErrorMsg.Emptym)]

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
        [Required(ErrorMessage = "Moneda" + ErrorMsg.Emptym)]

        public string Currency { get; set; }

        /// <summary>

        /// Identificador.

        /// </summary>

        public string EmployeeId 
        {
            get
            {
                return EmployeeIdBankAccount;
            }
        }
    }
}
