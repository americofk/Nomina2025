using DC365_PayrollHR.Core.Domain.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Domain.Entities
{
    public class Instructor: AuditableCompanyEntity
    {
        /// <summary>
        /// Automatic
        /// </summary>
        public string InstructorId { get; set; }
        /// <summary>
        /// Required, Max 50
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Max 20
        /// </summary>
        public string Phone { get; set; }
        /// <summary>
        /// Max 100
        /// </summary>
        public string Mail { get; set; }
        /// <summary>
        /// Required, Max 100
        /// </summary>
        public string Company { get; set; }
        /// <summary>
        /// Max 100
        /// </summary>
        public string Comment { get; set; }
    }
}
