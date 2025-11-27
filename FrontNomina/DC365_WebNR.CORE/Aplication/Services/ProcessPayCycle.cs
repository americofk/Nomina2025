/// <summary>
/// Servicio para la gestión de ciclos de pago.
/// Administra los períodos y ciclos de pago de nómina.
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
    /// Servicio de proceso para ProcessPayCycle.
    /// </summary>
    public class ProcessPayCycle: ServiceBase
    {
        public ProcessPayCycle( string _token)
        {
            Token = _token;
        }


        //Seleccionar todos
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="Payrollid">Parametro Payrollid.</param>
        /// <param name="_PageNumber">Parametro _PageNumber.</param>
        /// <param name="PageSize">Parametro PageSize.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<IEnumerable<PayCycle>> GetAllDataAsync(string Payrollid,int _PageNumber = 1, int PageSize=20)
        {
            List<PayCycle> courseType = new List<PayCycle>();

            string urlData = $"{urlsServices.GetUrl("PayCycle")}/{Payrollid}?PageNumber={_PageNumber}&PageSize={PageSize}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<List<PayCycle>>>(Api.Content.ReadAsStringAsync().Result);
                courseType = response.Data;
            }
            else
            {
                if (Api.StatusCode == HttpStatusCode.Forbidden)
                {
                    throw new Exception("Key-error");

                }
            }

            return courseType;
        }

        //guardar
        /// <summary>
        /// Crea o procesa.
        /// </summary>
        /// <param name="PayrollId">Parametro PayrollId.</param>
        /// <param name="PayCycleQty">Parametro PayCycleQty.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI<List<PayCycle>>> PostDataAsync(string PayrollId, int PayCycleQty)
        {
            Response<List<PayCycle>> DataApi = null;
            ResponseUI<List<PayCycle>> responseUI = new ResponseUI<List<PayCycle>>();

            string urlData = $"{urlsServices.GetUrl("PayCycle")}?PayCycleQty={PayCycleQty}&PayrollId={PayrollId}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Post);
            if (Api.IsSuccessStatusCode)
            {
                DataApi = JsonConvert.DeserializeObject<Response<List<PayCycle>>>(Api.Content.ReadAsStringAsync().Result);
                responseUI.Message = DataApi.Message;
                responseUI.Type = ErrorMsg.TypeOk;
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

        //eliminar
        /// <summary>
        /// Elimina un registro.
        /// </summary>
        /// <param name="Obj">Parametro Obj.</param>
        /// <param name="_PayrollId">Parametro _PayrollId.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> DeleteDataAsync(List<string> Obj, string _PayrollId)
        {
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.GetUrl("PayCycle")}/{_PayrollId}";

            var Api = await ServiceConnect.connectservice(Token, urlData, Obj, HttpMethod.Delete);
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


        //marcar para impuesto
        /// <summary>
        /// Ejecuta MaxForTaxAsync de forma asincrona.
        /// </summary>
        /// <param name="model">Parametro model.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> MaxForTaxAsync(PayCycleIsForTaxRequest model)
        {
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.GetUrl("PayCycle")}/markisfortax";

            var Api = await ServiceConnect.connectservice(Token, urlData, model, HttpMethod.Post);
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
        
        //marcar para TSS
        /// <summary>
        /// Ejecuta MaxForTssAsync de forma asincrona.
        /// </summary>
        /// <param name="model">Parametro model.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> MaxForTssAsync(PayCycleIsForTssRequest model)
        {
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.GetUrl("PayCycle")}/markisfortss";

            var Api = await ServiceConnect.connectservice(Token, urlData, model, HttpMethod.Post);
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
