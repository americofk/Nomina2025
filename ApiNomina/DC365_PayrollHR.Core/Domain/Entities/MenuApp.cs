using DC365_PayrollHR.Core.Domain.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Domain.Entities
{
    public class MenuApp : AuditableEntity
    {
        public string MenuName { get; set; }
        public string Description { get; set; }
        public string Action { get; set; }
        public string Icon { get; set; }
        public int Sort { get; set; }


        //Relations with class menú
        public string MenuFather { get; set; }

        //Primary Key
        public string MenuId { get; set; }


        public bool IsViewMenu { get; set; }
    }
}
