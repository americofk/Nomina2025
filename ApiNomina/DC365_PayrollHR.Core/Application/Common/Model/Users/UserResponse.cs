using DC365_PayrollHR.Core.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.Users
{
    public class UserResponse
    {
        public string Alias { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string FormatCodeId { get; set; }
        public AdminType ElevationType { get; set; } 
        public string CompanyDefaultId { get; set; }
    }
}
