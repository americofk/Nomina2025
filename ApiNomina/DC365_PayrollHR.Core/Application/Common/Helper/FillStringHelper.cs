using DC365_PayrollHR.Core.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Helper
{
    public static class FillStringHelper
    {
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
