using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.ProjCategories
{
    public class ProjCategoryRequestUpdate
    {
        [Required(ErrorMessage = "El nombre no puede estar vacío")]
        public string CategoryName { get; set; }

        public string LedgerAccount { get; set; }
    }
}
