/// <summary>
/// Helper para CalcHours.
/// Provee funciones auxiliares para operaciones comunes.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Helper
{
    /// <summary>
    /// Clase auxiliar para CalcHours.
    /// </summary>
    public static class CalcHoursHelper
    {
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="timespan">Parametro timespan.</param>
        /// <returns>Resultado de la operacion.</returns>
        public static decimal GetQtyHour(TimeSpan timespan)
        {
            decimal hour = 0;
            hour = (decimal)timespan.TotalMinutes/60;

            return hour;
        }
    }
}
