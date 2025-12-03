using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Domain.Enums
{
    /// <summary>
    /// Enumeracion de valores para PayrollActionType.
    /// </summary>
    public enum PayrollActionType
    {
        Ingreso = 0,
        Deduccion = 1,
        Impuesto = 2,
        Prestamo = 3,
        Cooperativa = 4,
        Aporte = 5,
        HorasExtras = 6
    }
}
