using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using DC365_WebNR.CORE.Aplication.Attributes;
using DC365_WebNR.CORE.Domain.Const;

namespace DC365_WebNR.CORE.Domain.Models
{
    public class Project
    {
        [CustomFilter("Id Proyecto")]
        public string ProjId { get; set; }
        [Required(ErrorMessage = "Nombre" + ErrorMsg.Emptym)]

        [CustomFilter("Nombre")]

        public string Name { get; set; }
        [CustomFilter("Cuenta contable")]

        public string LedgerAccount { get; set; }
    }
}
