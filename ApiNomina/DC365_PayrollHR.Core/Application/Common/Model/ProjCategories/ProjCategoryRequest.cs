using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.ProjCategories
{
    public class ProjCategoryRequest
    {
        public string ProjCategoryId { get; set; }

        [Required(ErrorMessage = "El nombre no puede estar vacío")]
        public string CategoryName { get; set; }

        public string LedgerAccount { get; set; }
    }
}
