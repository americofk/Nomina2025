using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Domain.Enums
{
    /// <summary>
    /// Enumeracion de valores para StatusPeriod.
    /// </summary>
    public enum StatusPeriod
    {
        Open = 0,
        Processed = 1,
        Paid = 2,
        Registered = 3
    }
}
