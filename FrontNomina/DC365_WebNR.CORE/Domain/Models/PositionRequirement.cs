using DC365_WebNR.CORE.Domain.Const;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    public  class PositionRequirement
    {
        [MaxLength(50)]
        [Required(ErrorMessage = "Nombre" + ErrorMsg.Emptym)]
        public string Name { get; set; }
        public string Detail { get; set; }
        public string PositionIdRequirement { get; set; }

        public string PositionId
        {
            get { return PositionIdRequirement;}

        }
    }
}
