using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Interface
{
    public interface ICurrentUserInformation
    {
        public string Alias { get; }
        public string Email { get; }
        public string ElevationType { get; }
        public string Company { get; }
        public bool IsLicenseValid { get; }
    }
}
