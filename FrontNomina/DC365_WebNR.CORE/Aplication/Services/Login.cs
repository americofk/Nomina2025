using DC365_WebNR.CORE.Domain.Const;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.INFRASTRUCTURE.Services;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace DC365_WebNR.CORE.Aplication.Services
{
    public class Login : ServiceBase
    {
        private const string Endpoint = "login";

        public async Task<ResponseUI> ValidaEmailUser(ValidateLogin _validateLogin)
        {
            //Response<bool> responseProcess;
            ResponseUI responseUI = new ResponseUI();

            //string urlData = urlsServices.GetUrl("ValidateUser");
            string urlData = $"{urlsServices.urlBaseOne}{Endpoint}";

            var response = await ServiceConnect.connectservice(Token, urlData, _validateLogin, HttpMethod.Post);

            if (!response.IsSuccessStatusCode)
            {
                return CatchError(response);
            }
            

            return responseUI;
        }

        public async Task<object> ValidaLogin(ValidateLogin _validateLogin)
        {
            Response<UserResponse> responseProcess = null;

            string urlData = urlsServices.GetUrl("ValidateUser");

            var response = await ServiceConnect.connectservice(Token, urlData, _validateLogin, HttpMethod.Post);

            if (response.IsSuccessStatusCode)
            {
                responseProcess = JsonConvert.DeserializeObject<Response<UserResponse>>(response.Content.ReadAsStringAsync().Result);
            }
            else
            {
                if (response.StatusCode != HttpStatusCode.ServiceUnavailable)
                {
                    var resulError = JsonConvert.DeserializeObject<Response<string>>(response.Content.ReadAsStringAsync().Result);
                    responseProcess = new Response<UserResponse>();
                    responseProcess.Type = ErrorMsg.TypeError;
                    responseProcess.Message = resulError.Message;
                }
                else
                {
                    responseProcess = new Response<UserResponse>();
                    responseProcess.Type = ErrorMsg.TypeError;
                    responseProcess.Message = ErrorMsg.Error500;
                }
            }

            return responseProcess;
        }

        //solicitar clave provicional
        public async Task<ResponseUI> Requestchangepassword(string Email)
        {
            Response<bool> responseProcess;
            ResponseUI responseUI = new ResponseUI();

            string urlData = urlsServices.GetUrl("Requestchangepassword");

            var response = await ServiceConnect.connectservice(Token, urlData, Email, HttpMethod.Post);

            if (response.IsSuccessStatusCode)
            {
                responseProcess = JsonConvert.DeserializeObject<Response<bool>>(response.Content.ReadAsStringAsync().Result);

                responseUI = new ResponseUI()
                {
                    Type = ErrorMsg.TypeOk,
                    Message = responseProcess.Message
                };
            }
            else
            {
                return CatchError(response);
            }

            return responseUI;
        }

        //Solicitar cambio de contraseña
        public async Task<ResponseUI> Sendnewpassword(Sendnewpassword Obj)
        {
            Response<bool> responseProcess;
            ResponseUI responseUI = new ResponseUI();

            string urlData = urlsServices.GetUrl("Sendnewpassword");

            var response = await ServiceConnect.connectservice(Token, urlData, Obj, HttpMethod.Post);

            if (response.IsSuccessStatusCode)
            {
                responseProcess = JsonConvert.DeserializeObject<Response<bool>>(response.Content.ReadAsStringAsync().Result);

                responseUI = new ResponseUI()
                {
                    Type = ErrorMsg.TypeOk,
                    Message = responseProcess.Message
                };
            }
            else
            {
                return CatchError(response);
            }

            return responseUI;
        }

    }
}
