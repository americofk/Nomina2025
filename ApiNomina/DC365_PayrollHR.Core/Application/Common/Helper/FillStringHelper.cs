/// <summary>
/// Helper para FillString.
/// Provee funciones auxiliares para operaciones comunes.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Helper
{
    /// <summary>
    /// Clase auxiliar para FillString.
    /// </summary>
    public static class FillStringHelper
    {
        /// <summary>
        /// Ejecuta la operacion Fill.
        /// </summary>
        /// <param name="_direction">Parametro _direction.</param>
        /// <param name="_text">Parametro _text.</param>
        /// <param name="_totalLenght">Parametro _totalLenght.</param>
        /// <param name="_paddingChar">Parametro _paddingChar.</param>
        /// <returns>Resultado de la operacion.</returns>
        public static string Fill(AlignDirection _direction, string _text, int _totalLenght, char _paddingChar )
        {
            string newString = string.Empty;

            if(_direction == AlignDirection.Left)
                newString = _text.PadLeft(_totalLenght, _paddingChar);
            else
                newString = _text.PadRight(_totalLenght, _paddingChar);

            return newString;
        }
    }
}
