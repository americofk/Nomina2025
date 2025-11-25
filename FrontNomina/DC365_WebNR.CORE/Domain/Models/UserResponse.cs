using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    public class UserResponse
    {
        public string Token { get; set; }
        public string Name { get; set; }
        public string Alias { get; set; }
        public string Avatar { get; set; }
        public string FormatCode { get; set; }
        public string DefaultCompany { get; set; }
        public string Email { get; set; }
        public List<CompanyForUser> UserCompanies { get; set; }
    }
}
