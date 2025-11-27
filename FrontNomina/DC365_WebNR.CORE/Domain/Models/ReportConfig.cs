/// <summary>
/// Modelo de datos para configuración de reportes.
/// Contiene la configuración de conceptos utilizados en reportes de nómina.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    public class ReportConfig
    {
        public int InternalId { get; set; }
        public string Salary { get; set; }
        public string Comission { get; set; }
        public string AFP { get; set; }
        public string SFS { get; set; }

        public string LoanCooperative { get; set; }

        //Actualizaci�n abono de cooperativa
        public string DeductionCooperative { get; set; }
    }
}
