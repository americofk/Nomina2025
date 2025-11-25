using System;
using System.Collections.Generic;
using System.Text;
using DC365_WebNR.CORE.Domain.Models.Enums;


namespace DC365_WebNR.CORE.Domain.Models
{
    public class EmployeeDocumentBatch
    {
        public string EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public DocumentType DocumentType { get; set; }
        public string DocumentNumber { get; set; }
        public bool IsPrincipal { get; set; }
        public DateTime DueDate { get; set; }
         
    }
}
