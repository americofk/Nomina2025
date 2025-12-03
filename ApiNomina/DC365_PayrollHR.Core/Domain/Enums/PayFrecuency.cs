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
        NotSelected = -1,
        Diary = 0,
        Weekly = 1,
        TwoWeekly = 2,
        BiWeekly = 3,
        Monthly = 4,
        ThreeMonth = 5,
        FourMonth = 6,
        Biannual = 7,
        Yearly = 8
    }
}
