using DC365_WebNR.CORE.Domain.Models.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    public class EmployeeDocumentResponse: GenericError
    {
        public int InternalId { get; set; }
        public string EmployeeId { get; set; }
        public DocumentType DocumentType { get; set; }
        public string DocumentNumber { get; set; }
        public DateTime DueDate { get; set; }
        public string Comment { get; set; }
        public bool HasAttach { get; set; }
        public bool IsPrincipal { get; set; }
    }
}
