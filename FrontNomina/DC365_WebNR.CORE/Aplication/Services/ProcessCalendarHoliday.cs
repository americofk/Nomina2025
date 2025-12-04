/// <summary>
/// Servicio para la gestión de días festivos del calendario.
/// Administra los días no laborables y festivos del sistema de nómina.
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
    /// Servicio de proceso para ProcessCalendarHoliday.
    /// </summary>
    public class ProcessCalendarHoliday: ServiceBase
    {
        public ProcessCalendarHoliday(string _token)
        {
            Token = _token;
        }

        //Lista
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="PropertyName">Parametro PropertyName.</param>
        /// <param name="PropertyValue">Parametro PropertyValue.</param>
        /// <param name="_PageNumber">Parametro _PageNumber.</param>
        /// <param name="PageSize">Parametro PageSize.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<IEnumerable<CalendarHolidayResponse>> GetAllDataAsync(string PropertyName = "", string PropertyValue = "", int _PageNumber = 1, int PageSize = 20)
        {
            List<CalendarHolidayResponse> _model = new List<CalendarHolidayResponse>();

            string urlData = $"{urlsServices.GetUrl("CalendarHoliday")}?PageNumber={_PageNumber}&PageSize={PageSize}&PropertyName={PropertyName}&PropertyValue={PropertyValue}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<List<CalendarHolidayResponse>>>(Api.Content.ReadAsStringAsync().Result);
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

        /// <summary>
        /// Obtiene dias feriados paginados con total de registros.
        /// </summary>
        public async Task<PagedResult<CalendarHolidayResponse>> GetAllDataPagedAsync(string PropertyName = "", string PropertyValue = "", int pageNumber = 1, int pageSize = 20)
        {
            var result = new PagedResult<CalendarHolidayResponse>
            {
                PageNumber = pageNumber,
                PageSize = pageSize,
                Data = new List<CalendarHolidayResponse>()
            };

            string urlData = $"{urlsServices.GetUrl("CalendarHoliday")}?PageNumber={pageNumber}&PageSize={pageSize}&PropertyName={PropertyName}&PropertyValue={PropertyValue}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<PagedResponse<List<CalendarHolidayResponse>>>(Api.Content.ReadAsStringAsync().Result);
                if (response != null)
                {
                    result.Data = response.Data ?? new List<CalendarHolidayResponse>();
                    result.PageNumber = response.PageNumber;
                    result.PageSize = response.PageSize;
                    result.TotalRecords = response.TotalRecords;
                    result.TotalPages = response.TotalPages;
                }
            }
            else
            {
                if (Api.StatusCode == HttpStatusCode.Forbidden)
                {
                    throw new Exception("Key-error");
                }
            }

            return result;
        }

        //guardar
        /// <summary>
        /// Crea o procesa.
        /// </summary>
        /// <param name="_model">Parametro _model.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> PostDataAsync(CalendarHolidayResponse _model)
        {
            Response<CalendarHolidayResponse> DataApi = null;
            ResponseUI responseUI = new ResponseUI();

            string urlData = urlsServices.GetUrl("CalendarHoliday");

            var Api = await ServiceConnect.connectservice(Token, urlData, _model, HttpMethod.Post);

            if (Api.IsSuccessStatusCode)
            {
                DataApi = JsonConvert.DeserializeObject<Response<CalendarHolidayResponse>>(Api.Content.ReadAsStringAsync().Result);
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
        /// <param name="_id">Parametro _id.</param>
        /// <param name="_model">Parametro _model.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> PutDataAsync(DateTime _id, CalendarHolidayResponse _model)
        {
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.GetUrl("CalendarHoliday")}/{_id}";

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
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> DeleteDataAsync(List<CalendarHolidayResponse> Obj)
        {
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.GetUrl("CalendarHoliday")}";

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

        //buscar por id 
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="_projid">Parametro _projid.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<CalendarHolidayResponse> GetDataAsync(DateTime _projid)
        {
            CalendarHolidayResponse _model = new CalendarHolidayResponse();

            string urlData = $"{urlsServices.GetUrl("CalendarHoliday")}/{_projid}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<CalendarHolidayResponse>>(Api.Content.ReadAsStringAsync().Result);
                _model = response.Data;
            }

            return _model;
        }

        
    }
}
