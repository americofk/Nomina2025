using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Domain.Enums
{
    public enum PayrollProcessStatus
    {
        Created = 0,
        Processed = 1,
        Calculated = 2,
        Paid = 3,
        Closed = 4,
        Canceled = 5

    }
}
