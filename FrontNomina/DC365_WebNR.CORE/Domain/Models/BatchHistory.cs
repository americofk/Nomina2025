using DC365_WebNR.CORE.Domain.Models.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    public class BatchHistory
    {
        
        public int InternalId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public BatchEntity BatchEntity { get; set; }
        public string Information { get; set; }
        public bool IsError { get; set; } = false;
        public bool IsFinished { get; set; } = false;
        public string SeparatorOption { get; set; } = ",";
    }
}
