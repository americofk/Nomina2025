using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    public class MenuApp
    {
        public string MenuName { get; set; }
        public string Description { get; set; }
        public string Action { get; set; }
        public string Icon { get; set; }
        public string MenuFather { get; set; }
        public string MenuId { get; set; }
        public int Sort { get; set; }
    }
}
