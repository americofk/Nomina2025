using DC365_WebNR.CORE.Domain.Const;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.INFRASTRUCTURE.Services;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text;

namespace DC365_WebNR.CORE.Aplication.Services
{
    public class ServiceBase
    {
        public string Token;
        public UrlsServices urlsServices = new UrlsServices();

        protected ResponseUI CatchError(HttpResponseMessage response)
        {
            ResponseUI responseUI = new ResponseUI();

            if (response.StatusCode != HttpStatusCode.ServiceUnavailable)
            {
                var d = response.Content.ReadAsStringAsync().Result;
                var resulError = JsonConvert.DeserializeObject<Response<string>>(response.Content.ReadAsStringAsync().Result);
                responseUI.Type = ErrorMsg.TypeError;
                responseUI.Errors = resulError.Errors;
            }
            else
            {
                responseUI.Type = ErrorMsg.TypeError;
                responseUI.Errors = new List<string>() { ErrorMsg.Error500 };
            }

            return responseUI;
        }
    }
}
