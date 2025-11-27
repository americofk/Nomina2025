/// <summary>
/// Interfaz para EmailServices.
/// Define el contrato de operaciones disponibles.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.Common.Interface
{
    /// <summary>
    /// Interfaz para IEmailServices.
    /// </summary>
    public interface IEmailServices
    {
        public Task<string> SendEmail(string email, string temporaryPassword, string username);
        public Task<string> SendEmailFile(string email, string bodyemail, DateTime reportdate);
    }
}
