using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Domain.Enums
{
    /// <summary>
    /// Enumeracion de valores para PayFrecuency.
    /// </summary>
    public enum PayFrecuency
    {
        NoSeleccionado = -1,
        Diario = 0,
        Semanal = 1,
        Bisemanal = 2,
        Quincenal = 3,
        Mensual = 4,
        Trimestral = 5,
        Cuatrimestral = 6,
        Semestral = 7,
        Anual = 8
    }
}
