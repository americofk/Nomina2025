using DC365_WebNR.CORE.Domain.Const;
using DC365_WebNR.CORE.Domain.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    public class EmployeeContactInf: GenericError
    {
        public int InternalId { get; set; }
        [Required(ErrorMessage = "Correo o número" + ErrorMsg.Emptym)]
        [MaxLength(200)]
        public string NumberAddress { get; set; }
        [MaxLength(200)]
        public string Comment { get; set; }
        public bool IsPrincipal { get; set; }
        public string EmployeeIdContactInf { get; set; }
        public ContactType ContactType { get; set; }

        public string EmployeeId 
        { 
            get
            {
                return EmployeeIdContactInf;
            }
        }
    }
}
