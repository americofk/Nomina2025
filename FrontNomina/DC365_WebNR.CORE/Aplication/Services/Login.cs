/// <summary>
/// Servicio para la autenticación de usuarios.
/// Contiene la lógica de validación de credenciales y gestión de sesiones.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
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
    /// <summary>
    /// Clase para gestion de Login.
    /// </summary>
    public class Login : ServiceBase
    {
        private const string Endpoint = "login";

        /// <summary>

        /// Ejecuta ValidaEmailUser de forma asincrona.

        /// </summary>

        /// <param name="_validateLogin">Parametro _validateLogin.</param>

        /// <returns>Resultado de la operacion.</returns>

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

        /// <summary>

        /// Ejecuta ValidaLogin de forma asincrona.

        /// </summary>

        /// <param name="_validateLogin">Parametro _validateLogin.</param>

        /// <returns>Resultado de la operacion.</returns>

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
        /// <summary>
        /// Ejecuta Requestchangepassword de forma asincrona.
        /// </summary>
        /// <param name="Email">Parametro Email.</param>
        /// <returns>Resultado de la operacion.</returns>
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
        /// <summary>
        /// Envia.
        /// </summary>
        /// <param name="Obj">Parametro Obj.</param>
        /// <returns>Resultado de la operacion.</returns>
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
