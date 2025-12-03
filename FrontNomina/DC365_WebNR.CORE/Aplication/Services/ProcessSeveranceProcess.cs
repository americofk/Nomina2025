/// <summary>
/// Servicio para la gestión de procesos de prestaciones laborales.
/// Contiene la lógica de negocio para operaciones CRUD de prestaciones.
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
    /// Servicio de proceso para ProcessSeveranceProcess.
    /// </summary>
    public class ProcessSeveranceProcess : ServiceBase
    {

        public ProcessSeveranceProcess(string _token)
        {
            Token = _token;
        }

        //Seleccionar todos
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="PropertyName">Parametro PropertyName.</param>
        /// <param name="PropertyValue">Parametro PropertyValue.</param>
        /// <param name="_PageNumber">Parametro _PageNumber.</param>
        /// <param name="PageSize">Parametro PageSize.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<IEnumerable<SeveranceProcess>> GetAllDataAsync(string PropertyName = "", string PropertyValue = "", int _PageNumber = 1, int PageSize = 20)
        {
            List<SeveranceProcess> processes = new List<SeveranceProcess>();

            string urlData = $"{urlsServices.GetUrl("SeveranceProcess")}?PageNumber={_PageNumber}&PageSize={PageSize}&PropertyName={PropertyName}&PropertyValue={PropertyValue}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<List<SeveranceProcess>>>(Api.Content.ReadAsStringAsync().Result);
                processes = response.Data;
            }
            else
            {
                if (Api.StatusCode == HttpStatusCode.Forbidden)
                {
                    throw new Exception("Key-error");

                }
            }

            return processes;
        }

        //guardar
        /// <summary>
        /// Crea o procesa.
        /// </summary>
        /// <param name="_model">Parametro _model.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> PostDataAsync(SeveranceProcess _model)
        {
            Response<SeveranceProcess> DataApi = null;
            ResponseUI responseUI = new ResponseUI();

            string urlData = urlsServices.GetUrl("SeveranceProcess");

            var Api = await ServiceConnect.connectservice(Token, urlData, _model, HttpMethod.Post);

            if (Api.IsSuccessStatusCode)
            {
                DataApi = JsonConvert.DeserializeObject<Response<SeveranceProcess>>(Api.Content.ReadAsStringAsync().Result);

                responseUI.Message = DataApi.Message;
                responseUI.Type = ErrorMsg.TypeOk;
                // Devolver el ID del registro creado para que el frontend pueda cambiar a modo edición
                responseUI.IdType = DataApi.Data?.SeveranceProcessId;
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
        /// <param name="id">Parametro id.</param>
        /// <param name="_model">Parametro _model.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> PutDataAsync(string id, SeveranceProcess _model)
        {
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.GetUrl("SeveranceProcess")}/{id}";

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

        //eliminar
        /// <summary>
        /// Elimina un registro.
        /// </summary>
        /// <param name="Obj">Parametro Obj.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> DeleteDataAsync(List<string> Obj)
        {
            ResponseUI responseUI = new ResponseUI();

            string urlData = urlsServices.GetUrl("SeveranceProcess");

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

        //Actualizar estado
        /// <summary>
        /// Actualiza el estado.
        /// </summary>
        /// <param name="id">Parametro id.</param>
        /// <param name="status">Parametro status.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> UpdateStatusProcess(string id, int status)
        {
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.GetUrl("SeveranceProcess")}/updatestatus/{id}?status={status}";

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

        //seleccionar un proceso
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="id">Parametro id.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<SeveranceProcess> Getbyid(string id)
        {
            SeveranceProcess _model = new SeveranceProcess();

            string urlData = $"{urlsServices.GetUrl("SeveranceProcess")}/{id}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<SeveranceProcess>>(Api.Content.ReadAsStringAsync().Result);
                _model = response.Data;
            }

            return _model;
        }

        /// <summary>
        /// Agrega un empleado al proceso de prestaciones.
        /// </summary>
        /// <param name="processId">ID del proceso.</param>
        /// <param name="employeeId">ID del empleado.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> AddEmployeeToProcess(string processId, string employeeId)
        {
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.GetUrl("SeveranceProcess")}/{processId}/employees/{employeeId}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Post);

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

        /// <summary>
        /// Obtiene el detalle de un empleado en el proceso.
        /// </summary>
        /// <param name="processId">ID del proceso.</param>
        /// <param name="employeeId">ID del empleado.</param>
        /// <returns>Detalle del empleado.</returns>
        public async Task<SeveranceProcessDetail> GetDetail(string processId, string employeeId)
        {
            SeveranceProcessDetail _model = new SeveranceProcessDetail();

            string urlData = $"{urlsServices.GetUrl("SeveranceProcess")}/{processId}/employees/{employeeId}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<SeveranceProcessDetail>>(Api.Content.ReadAsStringAsync().Result);
                _model = response.Data;
            }

            return _model;
        }

        /// <summary>
        /// Actualiza el detalle de un empleado en el proceso.
        /// </summary>
        /// <param name="model">Modelo con los datos actualizados.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> UpdateDetail(SeveranceProcessDetail model)
        {
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.GetUrl("SeveranceProcess")}/detail";

            var Api = await ServiceConnect.connectservice(Token, urlData, model, HttpMethod.Put);

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

        /// <summary>
        /// Elimina un empleado del proceso de prestaciones.
        /// </summary>
        /// <param name="processId">ID del proceso.</param>
        /// <param name="employeeId">ID del empleado.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> DeleteEmployeeFromProcess(string processId, string employeeId)
        {
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.GetUrl("SeveranceProcess")}/{processId}/employees/{employeeId}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Delete);

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

        /// <summary>
        /// Calcula las prestaciones laborales de un empleado.
        /// </summary>
        /// <param name="processId">ID del proceso.</param>
        /// <param name="employeeId">ID del empleado.</param>
        /// <returns>Resultado de la operacion con los datos calculados.</returns>
        public async Task<ResponseUI<SeveranceProcessDetail>> CalculateSeverance(string processId, string employeeId)
        {
            ResponseUI<SeveranceProcessDetail> responseUI = new ResponseUI<SeveranceProcessDetail>();

            string urlData = $"{urlsServices.GetUrl("SeveranceProcess")}/{processId}/employees/{employeeId}/calculate";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Post);

            if (Api.IsSuccessStatusCode)
            {
                var DataApi = JsonConvert.DeserializeObject<Response<SeveranceProcessDetail>>(Api.Content.ReadAsStringAsync().Result);
                responseUI.Message = DataApi.Message;
                responseUI.Type = ErrorMsg.TypeOk;
                responseUI.Obj = DataApi.Data;
            }
            else
            {
                var errorResponse = CatchError(Api);
                responseUI.Type = errorResponse.Type;
                responseUI.Message = errorResponse.Message;
                responseUI.Errors = errorResponse.Errors;
            }

            return responseUI;
        }

    }
}
