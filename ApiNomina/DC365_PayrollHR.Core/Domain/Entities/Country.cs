using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Domain.Entities
{
    public class Country
    {

        public string CountryId { get; set; }
        public string Name { get; set; }
        public string NationalityCode { get; set; }
        public string NationalityName { get; set; }
    }
}
