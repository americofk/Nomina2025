using DC365_WebNR.CORE.Domain.Const;
using System;
using System.ComponentModel.DataAnnotations;

namespace DC365_WebNR.CORE.Domain.Models
{
    public class EmployeeAddress: GenericError
    {
        public int InternalId { get; set; }
        [Required(ErrorMessage = "Calle" + ErrorMsg.Emptyf)]
        public string Street { get; set; }
        [Required(ErrorMessage = "Casa" + ErrorMsg.Emptyf)]
        public string Home { get; set; }
        [Required(ErrorMessage = "Sector" + ErrorMsg.Emptym)]
        public string Sector { get; set; }
        [Required(ErrorMessage = "Ciudad" + ErrorMsg.Emptyf)]
        public string City { get; set; }
        [Required(ErrorMessage = "Provincia" + ErrorMsg.Emptyf)]
        public string Province { get; set; }

        public string ProvinceName { get; set; }


        public string Comment { get; set; }
        public bool IsPrincipal { get; set; }
        public string EmployeeIdAddres { get; set; }

        public string CountryId { get; set; }
        public string EmployeeId
        {
            get { return EmployeeIdAddres; }

        }

    }

    public class EmployeeAddressTwo
    {
        public int InternalId { get; set; }
        public string Street { get; set; }
        public string Home { get; set; }
        public string Sector { get; set; }
        public string City { get; set; }
        public string Province { get; set; }
        public string Comment { get; set; }
        public bool IsPrincipal { get; set; }
        public string CountryId { get; set; }
    }
}
