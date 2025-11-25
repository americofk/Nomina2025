using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    public class EmployeeAddressBatch
    {
        public string Street { get; set; }
        public string Home { get; set; }
        public string Sector { get; set; }
        public string City { get; set; }
        public string Province { get; set; }
        public string Comment { get; set; }
        public bool IsPrincipal { get; set; }
        public string EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public string CountryId { get; set; }
    }
}
