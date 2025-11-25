using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Model.Users
{
    public class FileUpload
    {
        public byte[] Image { get; set; }
        public string Extension { get; set; }
        public string Alias { get; set; }
    }
}
