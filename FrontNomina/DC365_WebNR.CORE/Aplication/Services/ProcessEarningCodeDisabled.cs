/// <summary>
/// Servicio para la gestión de códigos de ingreso inactivos.
/// Administra códigos de ingreso que han sido deshabilitados en el sistema.
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
using System.Threading.Tasks;

namespace DC365_WebNR.CORE.Aplication.Services
{
    /// <summary>
    /// Servicio de proceso para ProcessEarningCodeDisabled.
    /// </summary>
    public class ProcessEarningCodeDisabled: ServiceBase
    {
        public ProcessEarningCodeDisabled(string _token)
        {
            Token = _token;
        }

        //todos los codigos de ganancia
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="_PageNumber">Parametro _PageNumber.</param>
        /// <param name="_IsVersion">Parametro _IsVersion.</param>
        /// <param name="id">Parametro id.</param>
        /// <param name="PropertyName">Parametro PropertyName.</param>
        /// <param name="PropertyValue">Parametro PropertyValue.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<IEnumerable<EarningCode>> GetAllDataAsync(int _PageNumber = 1, bool _IsVersion = false, string id = "", string PropertyName = "", string PropertyValue = "")
        {
            List<EarningCode> _model = new List<EarningCode>();

            string urlData = $"{urlsServices.GetUrl("Earningcodedisabled")}?PageNumber={_PageNumber}&PageSize=20&PropertyName={PropertyName}&PropertyValue={PropertyValue}&versions={_IsVersion}&id={id}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<List<EarningCode>>>(Api.Content.ReadAsStringAsync().Result);
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


        //Inhabilitar
        /// <summary>
        /// Actualiza un registro existente.
        /// </summary>
        /// <param name="id">Parametro id.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> UpdateStatus(string id)
        {
            //Response<Department> DataApi = null;
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.GetUrl("Earningcodedisabled")}/updatestatus/{id}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Put);

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


    }
}
