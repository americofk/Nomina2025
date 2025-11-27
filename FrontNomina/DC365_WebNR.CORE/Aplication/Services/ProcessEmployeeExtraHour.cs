/// <summary>
/// Servicio para la gestión de horas extras de empleados.
/// Administra el registro y cálculo de horas extras trabajadas por los empleados.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Aplication.ProcessHelper;
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
    /// Servicio de proceso para ProcessEmployeeExtraHour.
    /// </summary>
    public class ProcessEmployeeExtraHour: ServiceBase
    {
        private const string Endpoint = "employeeextrahours";
        public ProcessEmployeeExtraHour(string _token)
        {
            Token = _token;
        }

        //lista
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="employeeid">Parametro employeeid.</param>
        /// <param name="_PageNumber">Parametro _PageNumber.</param>
        /// <param name="PropertyName">Parametro PropertyName.</param>
        /// <param name="PropertyValue">Parametro PropertyValue.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<IEnumerable<EmployeeExtraHour>> GetAllDataAsync(string employeeid, int _PageNumber = 1, string PropertyName = "", string PropertyValue = "")
        {
            List<EmployeeExtraHour> _model = new List<EmployeeExtraHour>();

            string urlData = $"{urlsServices.urlBaseOne}{Endpoint}/{employeeid}?PageNumber={_PageNumber}&PageSize=20&PropertyName={PropertyName}&PropertyValue={PropertyValue}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<List<EmployeeExtraHour>>>(Api.Content.ReadAsStringAsync().Result);
                _model = response.Data;
            }
            else
            {
                if (Api.StatusCode == HttpStatusCode.Forbidden)
                {
                    throw new Exception("Key-error");

                }
                return ValidateRolHelper<EmployeeExtraHour>.validate(Api, new EmployeeExtraHour());

            }

            return _model;
        }

        //guardar
        /// <summary>
        /// Crea o procesa.
        /// </summary>
        /// <param name="_model">Parametro _model.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> PostDataAsync(EmployeeExtraHour _model)
        {
            Response<EmployeeExtraHour> DataApi = null;
            ResponseUI responseUI = new ResponseUI();

            //string urlData = urlsServices.GetUrl("Extrahours");
            string urlData = $"{urlsServices.urlBaseOne}{Endpoint}";

            var Api = await ServiceConnect.connectservice(Token, urlData, _model, HttpMethod.Post);
            if (Api.IsSuccessStatusCode)
            {
                DataApi = JsonConvert.DeserializeObject<Response<EmployeeExtraHour>>(Api.Content.ReadAsStringAsync().Result);
                responseUI.Message = DataApi.Message;
                responseUI.Type = ErrorMsg.TypeOk;
            }
            else
            {
                return CatchError(Api);
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
        public async Task<ResponseUI> PutDataAsync(string employeeid, EmployeeExtraHour _model)
        {
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.urlBaseOne}{Endpoint}/{employeeid}";

            var Api = await ServiceConnect.connectservice(Token, urlData, _model, HttpMethod.Put);
            if (Api.IsSuccessStatusCode)
            {
                var DataApi = JsonConvert.DeserializeObject<Response<object>>(Api.Content.ReadAsStringAsync().Result);
                responseUI.Message = DataApi.Message;
                responseUI.Type = ErrorMsg.TypeOk;
            }
            else
            {
                return CatchError(Api);
            }


            return responseUI;
        }

        //eliminar
        /// <summary>
        /// Elimina un registro.
        /// </summary>
        /// <param name="Obj">Parametro Obj.</param>
        /// <param name="employeeid">Parametro employeeid.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> DeleteDataAsync(List<EmployeeExtraHourDelete> Obj, string employeeid)
        {
           ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.urlBaseOne}{Endpoint}/{employeeid}";

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
                return CatchError(Api);
            }

            return responseUI;
        }

        //buscar por id
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="employeeid">Parametro employeeid.</param>
        /// <param name="earningcode">Parametro earningcode.</param>
        /// <param name="workedday">Parametro workedday.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<EmployeeExtraHour> GetDataAsync(string employeeid, string earningcode,string workedday)
        {
            EmployeeExtraHour _model = new EmployeeExtraHour();
            string urlData = $"{urlsServices.urlBaseOne}{Endpoint}/{employeeid}/{earningcode}/{workedday}";
           
            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<EmployeeExtraHour>>(Api.Content.ReadAsStringAsync().Result);
                _model = response.Data;
            }

            return _model;
        }

    }
}
