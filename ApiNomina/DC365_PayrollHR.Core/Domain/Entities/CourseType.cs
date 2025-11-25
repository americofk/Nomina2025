using DC365_PayrollHR.Core.Domain.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Domain.Entities
{
    public class CourseType: AuditableCompanyEntity
    {
        /// <summary>
        /// Automatic
        /// </summary>
        public string CourseTypeId { get; set; }

        /// <summary>
        /// Required / Max 50
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Required / Max 200
        /// </summary>
        public string Description { get; set; }
    }
}
