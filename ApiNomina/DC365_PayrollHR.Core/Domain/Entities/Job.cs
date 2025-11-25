using DC365_PayrollHR.Core.Domain.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Domain.Entities
{
    /// <summary>
    /// Cargo
    /// </summary>
    public class Job: AuditableCompanyEntity
    {
        /// <summary>
        /// Automatico
        /// </summary>
        public string JobId { get; set; }
        /// <summary>
        /// Required / Max 50
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Max 200
        /// </summary>
        public string Description { get; set; }
        public bool JobStatus { get; set; } = true;

    }
}
