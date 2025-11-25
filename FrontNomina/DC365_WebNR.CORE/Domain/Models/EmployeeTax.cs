using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using DC365_WebNR.CORE.Domain.Const;

namespace DC365_WebNR.CORE.Domain.Models
{
    public class EmployeeTax: GenericError
    {
        [Required(ErrorMessage = "Código" + ErrorMsg.Emptym)]

        public string TaxId { get; set; }
        [Required(ErrorMessage = "Fecha desde" + ErrorMsg.Emptyf)]

        [DataType(DataType.Date)]
        public DateTime ValidTo { get; set; }
        [Required(ErrorMessage = "Fecha hasta" + ErrorMsg.Emptyf)]
        [DataType(DataType.Date)]
        public DateTime ValidFrom { get; set; }

        [Required(ErrorMessage = "Nómina" + ErrorMsg.Emptyf)]

        public string PayrollId { get; set; }
        public string EmployeeIdTax { get; set; }

        public string PayrollName { get; set; }

        public string EmployeeId
        {
            get
            {
                return EmployeeIdTax;
            }
        }
    }
}
