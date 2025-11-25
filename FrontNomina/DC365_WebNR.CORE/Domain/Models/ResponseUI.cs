using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models
{
    public class ResponseUI<T>
    {
        public string Message { get; set; }
        public string Type { get; set; }
        public T Obj { get; set; }
        public List<string>Errors { get; set; }
    }

    public class ResponseUI
    {
        public string Message { get; set; }
        public string Type { get; set; }
        public List<string> Errors { get; set; }
        public string IdType { get; set; }
    }
}
    
