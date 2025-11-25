using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    public class MenuAssignedToUser
    {
        public string Alias { get; set; }
        public string MenuId { get; set; }
        public bool PrivilegeView { get; set; }
        public bool PrivilegeEdit { get; set; }
        public bool PrivilegeDelete { get; set; }
        public string Description { get; set; }
    }
}
