using DC365_PayrollHR.Core.Domain.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Domain.Entities
{
    public class CourseLocation: AuditableCompanyEntity
    {
        /// <summary>
        /// Automatic
        /// </summary>
        public string CourseLocationId { get; set; }
        /// <summary>
        /// Required / Max 50
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Required / Max 20
        /// </summary>
        public string Phone { get; set; }
        /// <summary>
        /// Required / Max 100
        /// </summary>
        public string Mail { get; set; }
        /// <summary>
        /// Required / Max 500
        /// </summary>
        public string Address { get; set; }
        /// <summary>
        /// Required / Max 50
        /// </summary>
        public string ContactName { get; set; }
        /// <summary>
        /// Max 100
        /// </summary>
        public string Comment { get; set; }
    }
}
