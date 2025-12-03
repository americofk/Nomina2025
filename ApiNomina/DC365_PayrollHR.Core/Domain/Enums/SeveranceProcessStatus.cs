using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Domain.Enums
{
    /// <summary>
    /// Enumeración de estados para el proceso de prestaciones laborales.
    /// </summary>
    public enum SeveranceProcessStatus
    {
        /// <summary>
        /// Proceso creado pero no calculado.
        /// </summary>
        Creado = 0,

        /// <summary>
        /// Proceso con cálculos realizados.
        /// </summary>
        Calculado = 1,

        /// <summary>
        /// Proceso aprobado para pago.
        /// </summary>
        Aprobado = 2,

        /// <summary>
        /// Proceso pagado/cerrado.
        /// </summary>
        Pagado = 3,

        /// <summary>
        /// Proceso cancelado.
        /// </summary>
        Cancelado = 4
    }

    /// <summary>
    /// Tipo de cálculo de prestaciones laborales.
    /// </summary>
    public enum SeveranceCalculationType
    {
        /// <summary>
        /// Desahucio (terminación por parte del empleador sin causa).
        /// </summary>
        Desahucio = 0,

        /// <summary>
        /// Despido justificado (Art. 88).
        /// </summary>
        DespidoJustificado = 1,

        /// <summary>
        /// Renuncia voluntaria del trabajador.
        /// </summary>
        Renuncia = 2,

        /// <summary>
        /// Dimisión justificada del trabajador.
        /// </summary>
        DimisionJustificada = 3
    }
}
