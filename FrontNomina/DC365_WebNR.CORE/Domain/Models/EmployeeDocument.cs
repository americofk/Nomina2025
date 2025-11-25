using DC365_WebNR.CORE.Domain.Const;
using DC365_WebNR.CORE.Domain.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    public class EmployeeDocument
    {
        public int InternalId { get; set; }
        public DocumentType DocumentType { get; set; }
        [Required(ErrorMessage = "Número de documento" + ErrorMsg.Emptym)]
        public string DocumentNumber { get; set; }
        [Required(ErrorMessage = "Fecha de vencimiento" + ErrorMsg.Emptym)]
        [DataType(DataType.Date)]
        public DateTime DueDate { get; set; }
        public string Comment { get; set; }
        public byte[] FileAttach { get; set; }
        public string EmployeeIdDocument { get; set; }
        public bool IsPrincipal { get; set; }
        public string EmployeeId
        {
            get
            {
                return EmployeeIdDocument;
            }
        }
    }
}
