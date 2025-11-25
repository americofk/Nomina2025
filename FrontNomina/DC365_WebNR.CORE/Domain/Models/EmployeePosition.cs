using DC365_WebNR.CORE.Domain.Const;
using System;
using System.ComponentModel.DataAnnotations;

namespace DC365_WebNR.CORE.Domain.Models
{
    public class EmployeePosition
    {
        [Required(ErrorMessage = "Puesto" + ErrorMsg.Emptym)]
        public string PositionId { get; set; }
        public string PositionName { get; set; }
        [Required(ErrorMessage = "Fecha desde" + ErrorMsg.Emptyf)]

        [DataType(DataType.Date)]
        public DateTime FromDate { get; set; }
        [Required(ErrorMessage = "Fecha hasta" + ErrorMsg.Emptyf)]

        [DataType(DataType.Date)]
        public DateTime ToDate { get; set; }
        public bool EmployeePositionStatus { get; set; }
        public string Comment { get; set; }
        public string EmployeeIdPosition { get; set; }
        public string EmployeeId
        {
            get
            {
                return EmployeeIdPosition;
            }
        }

       
    }
}
