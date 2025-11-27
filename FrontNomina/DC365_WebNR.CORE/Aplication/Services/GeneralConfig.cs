/// <summary>
/// Servicio para configuración general del sistema.
/// Gestiona parámetros y configuraciones globales de la aplicación.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Domain.Const;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.INFRASTRUCTURE.Services;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace DC365_WebNR.CORE.Aplication.Services
{
    /// <summary>
    /// Clase para gestion de GeneralConfig.
    /// </summary>
    public class  GeneralConfig: ServiceBase
    {
        public GeneralConfig(string _token)
        {
            Token = _token;
        }

        //obtener datos
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<GeneralConfigResponse> GetAllDataAsync()
        {
            GeneralConfigResponse _model = new GeneralConfigResponse();

            string urlData = urlsServices.GetUrl("GeneralConfig");

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<GeneralConfigResponse>>(Api.Content.ReadAsStringAsync().Result);
                _model = response.Data;
            }
            else
            {
                if (Api.StatusCode == HttpStatusCode.Forbidden)
                {
                    throw new Exception("Key-error");

                }
            }

            return _model;
        }

        //guardar
        /// <summary>
        /// Crea o procesa.
        /// </summary>
        /// <param name="_model">Parametro _model.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> PostDataAsync(GeneralConfigRequest _model)
        {
            Response<GeneralConfigRequest> DataApi = null;
            ResponseUI responseUI = new ResponseUI();

            string urlData = urlsServices.GetUrl("GeneralConfig");

            var Api = await ServiceConnect.connectservice(Token, urlData, _model, HttpMethod.Post);

            if (Api.IsSuccessStatusCode)
            {
                DataApi = JsonConvert.DeserializeObject<Response<GeneralConfigRequest>>(Api.Content.ReadAsStringAsync().Result);
                responseUI.Message = DataApi.Message;
                responseUI.Type = ErrorMsg.TypeOk;

            }
            else
            {
                return CatchError(Api);
            }


            return responseUI;
        }


    }
}
