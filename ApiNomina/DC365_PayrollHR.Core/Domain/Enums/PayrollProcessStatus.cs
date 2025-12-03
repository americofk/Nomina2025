using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Domain.Enums
{
    /// <summary>
    /// Enumeracion de valores para PayrollProcessStatus.
    /// </summary>
    public enum PayrollProcessStatus
    {
        Creado = 0,
        Procesado = 1,
        Calculado = 2,
        Pagado = 3,
        Cerrado = 4,
        Cancelado = 5

    }
}
