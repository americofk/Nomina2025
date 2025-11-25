using DC365_WebNR.CORE.Domain.Const;
using DC365_WebNR.CORE.Domain.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    public class EmployeeBankAccount: GenericError
    {
        public string EmployeeIdBankAccount { get; set; }
        public int InternalId { get; set; }
        [Required(ErrorMessage = "Nombre del banco" + ErrorMsg.Emptym)]

        public string BankName { get; set; }
        public AccountType AccountType { get; set; }
        [Required(ErrorMessage = "Número de cuenta" + ErrorMsg.Emptym)]

        public string AccountNum { get; set; }
        public string Comment { get; set; }
        public bool IsPrincipal { get; set; }
        [Required(ErrorMessage = "Moneda" + ErrorMsg.Emptym)]

        public string Currency { get; set; }

        public string EmployeeId 
        {
            get
            {
                return EmployeeIdBankAccount;
            }
        }
    }
}
