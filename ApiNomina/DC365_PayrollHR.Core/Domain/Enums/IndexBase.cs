using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Domain.Enums
{
    /// <summary>
    /// Clase base para IndexBase.
    /// </summary>
    public enum IndexBase
    {
        Hora = 0,
        PeriodoPago = 1,
        Mensual = 2,
        Anual = 3,
        MontoFijo = 4,
        Retroactivo = 5,
        IndiceSalarial = 6,
        PorcentajeIngreso = 7,
        HorasTrabajo = 8
    }
}
