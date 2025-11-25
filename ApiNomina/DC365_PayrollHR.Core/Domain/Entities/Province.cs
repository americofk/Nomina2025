using DC365_PayrollHR.Core.Domain.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Domain.Entities
{
    public  class Province : AuditableEntity
    {
        public string ProvinceId { get; set; }
        public string Name { get; set; }
    }
}
