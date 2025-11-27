/// <summary>
/// Servicio para la gestión de opciones de usuario.
/// Contiene la lógica de negocio para configurar y administrar las opciones y preferencias de usuarios.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Domain.Const;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.INFRASTRUCTURE.Services;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace DC365_WebNR.CORE.Aplication.Services
{
    /// <summary>
    /// Servicio de proceso para ProcessUserOptions.
    /// </summary>
    public class ProcessUserOptions: ServiceBase
    {
        public ProcessUserOptions(string _token)
        {
            Token = _token;
        }

        private const string Endpoint = "users/options/changecompany";
        //editar
        /// <summary>
        /// Actualiza un registro existente.
        /// </summary>
        /// <param name="id">Parametro id.</param>
        /// <param name="_model">Parametro _model.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> PutDataAsync(string id, UserOptions _model)
        {
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.GetUrl("UserOptions")}/{id}";

            var Api = await ServiceConnect.connectservice(Token, urlData, _model, HttpMethod.Put);

            if (Api.IsSuccessStatusCode)
            {
                var DataApi = JsonConvert.DeserializeObject<Response<bool>>(Api.Content.ReadAsStringAsync().Result);
                responseUI.Message = DataApi.Message;
                responseUI.Type = ErrorMsg.TypeOk;
            }
            else
            {
                return CatchError(Api);
            }

            return responseUI;
        }
    
        //asignar foto al usuario
        /// <summary>
        /// Carga un archivo.
        /// </summary>
        /// <param name="file">Parametro file.</param>
        /// <param name="Alias">Parametro Alias.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> Uploadimageuser(IFormFile file, string Alias)
        {
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.GetUrl("UserOptions")}/Uploadimageuser/{Alias}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Post, file);

            if (Api.IsSuccessStatusCode)
            {
                var DataApi = JsonConvert.DeserializeObject<Response<bool>>(Api.Content.ReadAsStringAsync().Result);

                byte[] data;
                using (MemoryStream ms = new MemoryStream())
                {
                    file.CopyTo(ms);
                    data = ms.ToArray();
                }

                responseUI.Message = String.Format("data:image/jpg;base64,{0}", Convert.ToBase64String(data, 0, data.Length));
                responseUI.Type = ErrorMsg.TypeOk;
            }
            else
            {
                return CatchError(Api);
            }

            return responseUI;
        }

        // descargar foto de usuario
        /// <summary>
        /// Descarga.
        /// </summary>
        /// <param name="Alias">Parametro Alias.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> Downloadimageuser(string Alias)
        {
            //Response<Department> DataApi = null;
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.GetUrl("UserOptions")}/Downloadimageuser/{Alias}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var DataApi = JsonConvert.DeserializeObject<Response<string>>(Api.Content.ReadAsStringAsync().Result);
                responseUI.Message = String.Format("data:image/jpg;base64,{0}", DataApi.Data);
                responseUI.Type = ErrorMsg.TypeOk;
            }
            else
            {
                return CatchError(Api);
            }

            return responseUI;
        }

        //Cambiar de empresa
        /// <summary>
        /// Ejecuta ChangeCompany de forma asincrona.
        /// </summary>
        /// <param name="companyid">Parametro companyid.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI<ChangeCompany>> ChangeCompany(string companyid)
        {
            ResponseUI<ChangeCompany> responseUI = new ResponseUI<ChangeCompany>();
            string urlData = $"{urlsServices.urlBaseOne}{Endpoint}/{companyid}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Post);


            if (Api.IsSuccessStatusCode)
            {
                var DataApi = JsonConvert.DeserializeObject<Response<ChangeCompany>>(Api.Content.ReadAsStringAsync().Result);
                responseUI.Message = DataApi.Message;
                responseUI.Type = ErrorMsg.TypeOk;
                responseUI.Obj = DataApi.Data;
            }
            else
            {
                if (Api.StatusCode != HttpStatusCode.ServiceUnavailable)
                {
                    var resulError = JsonConvert.DeserializeObject<Response<string>>(Api.Content.ReadAsStringAsync().Result);
                    responseUI.Type = ErrorMsg.TypeError;
                    responseUI.Errors = resulError.Errors;
                }
                else
                {
                    responseUI.Type = ErrorMsg.TypeError;
                    responseUI.Errors = new List<string>() { ErrorMsg.Error500 };
                }
            }

            return responseUI;
        }




    }
}
