using System;

namespace DC365_WebNR.UI.Models
{
    /// <summary>
    /// Modelo de vista para Error.
    /// </summary>
    public class ErrorViewModel
    {
        /// <summary>
        /// Identificador.
        /// </summary>
        public string RequestId { get; set; }

        public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);
    }
}
