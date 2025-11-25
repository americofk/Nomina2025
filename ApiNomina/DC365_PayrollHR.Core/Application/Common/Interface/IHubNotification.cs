using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.Common.Interface
{
    public interface IHubNotification
    {
        public Task NotificationBatchImport(string messages);
    }
}
