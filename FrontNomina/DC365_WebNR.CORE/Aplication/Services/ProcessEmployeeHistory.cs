/// <summary>
/// Servicio para la gestión de historial de empleados.
/// Administra el registro histórico de cambios y eventos de los empleados.
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
    /// Servicio de proceso para ProcessEmployeeHistory.
    /// </summary>
    public class ProcessEmployeeHistory: ServiceBase
    {
        public ProcessEmployeeHistory(string _token)
        {
            Token = _token;
        }
       
        /// <summary>
       
        /// Obtiene.
       
        /// </summary>
       
        /// <param name="employeeid">Parametro employeeid.</param>
       
        /// <param name="PropertyName">Parametro PropertyName.</param>
       
        /// <param name="PropertyValue">Parametro PropertyValue.</param>
       
        /// <param name="_PageNumber">Parametro _PageNumber.</param>
       
        /// <returns>Resultado de la operacion.</returns>
       
        public async Task<IEnumerable<EmployeeHistoryResponse>> GetAllDataAsync(string employeeid , string PropertyName = "", string PropertyValue = "", int _PageNumber = 1)
        {
            List<EmployeeHistoryResponse> _model = new List<EmployeeHistoryResponse>();

           
            string urlData = $"{urlsServices.GetUrl("Employeehistories")}/{employeeid}?PageNumber={_PageNumber}&PageSize=20&PropertyName={PropertyName}&PropertyValue={PropertyValue}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<List<EmployeeHistoryResponse>>>(Api.Content.ReadAsStringAsync().Result);
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

        //eliminar cargo
        /// <summary>
        /// Elimina un registro.
        /// </summary>
        /// <param name="Obj">Parametro Obj.</param>
        /// <param name="employeeid">Parametro employeeid.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> DeleteDataAsync(List<EmployeeHistoryDeleteRequest> Obj, string employeeid)
        {
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.GetUrl("Employeehistories")}/{employeeid}";

            var Api = await ServiceConnect.connectservice(Token, urlData, Obj, HttpMethod.Delete);

            if (Api.IsSuccessStatusCode)
            {

                var DataApi = JsonConvert.DeserializeObject<Response<bool>>(Api.Content.ReadAsStringAsync().Result);
                if (!DataApi.Succeeded)
                {
                    responseUI.Type = "error";
                    responseUI.Errors = DataApi.Errors;
                }
                else
                {
                    responseUI.Message = DataApi.Message;
                    responseUI.Type = "success";
                }

            }
            else
            {
                if (Api.StatusCode == HttpStatusCode.BadRequest)
                {
                    var resulError = JsonConvert.DeserializeObject<Response<string>>(Api.Content.ReadAsStringAsync().Result);
                    responseUI.Type = "error";
                    responseUI.Errors = resulError.Errors;
                }
                else
                {

                    responseUI.Type = "error";
                    responseUI.Errors = new List<string>() { "Ocurrió un error procesando la solicitud, inténtelo más tarde o contacte con el administrador." };
                }

            }
            return responseUI;
        }

        //editar
        /// <summary>
        /// Actualiza un registro existente.
        /// </summary>
        /// <param name="employeeid">Parametro employeeid.</param>
        /// <param name="_model">Parametro _model.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> PutDataAsync(string employeeid, EmployeeHistoryUpdateRequest _model)
        {
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.GetUrl("Employeehistories")}/{employeeid}";

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

        //marcar para dgt
        /// <summary>
        /// Ejecuta MaxForDgtAsync de forma asincrona.
        /// </summary>
        /// <param name="model">Parametro model.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> MaxForDgtAsync(EmployeeHistoryIsForDGTRequest model)
        {
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.GetUrl("Employeehistories")}/markisfordgt";

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
