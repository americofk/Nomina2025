/// <summary>
/// Servicio para la gestión de códigos de ingreso.
/// Administra los códigos utilizados para ingresos y percepciones en nómina.
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
    /// Servicio de proceso para ProcessEarningCodes.
    /// </summary>
    public class ProcessEarningCodes: ServiceBase
    {
        public ProcessEarningCodes(string _token)
        {
            Token = _token;
        }

        //Seleccionar todos
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="_PageNumber">Parametro _PageNumber.</param>
        /// <param name="_IsVersion">Parametro _IsVersion.</param>
        /// <param name="id">Parametro id.</param>
        /// <param name="PropertyName">Parametro PropertyName.</param>
        /// <param name="PropertyValue">Parametro PropertyValue.</param>
        /// <param name="PageSize">Parametro PageSize.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<IEnumerable<EarningCode>> GetAllDataAsync(int _PageNumber = 1, bool _IsVersion = false, string id = "", string PropertyName = "", string PropertyValue = "",int PageSize=1500)
        {
            List<EarningCode> _model = new List<EarningCode>();

            string urlData = $"{urlsServices.GetUrl("Earningcodes")}?PageNumber={_PageNumber}&PageSize={PageSize}&PropertyName={PropertyName}&PropertyValue={PropertyValue}&versions={_IsVersion}&id={id}";

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

        /// <summary>
        /// Obtiene codigos de ganancia paginados con total de registros.
        /// </summary>
        public async Task<PagedResult<EarningCode>> GetAllDataPagedAsync(int pageNumber = 1, bool _IsVersion = false, string id = "", string PropertyName = "", string PropertyValue = "", int pageSize = 20)
        {
            var result = new PagedResult<EarningCode>
            {
                PageNumber = pageNumber,
                PageSize = pageSize,
                Data = new List<EarningCode>()
            };

            string urlData = $"{urlsServices.GetUrl("Earningcodes")}?PageNumber={pageNumber}&PageSize={pageSize}&PropertyName={PropertyName}&PropertyValue={PropertyValue}&versions={_IsVersion}&id={id}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<PagedResponse<List<EarningCode>>>(Api.Content.ReadAsStringAsync().Result);
                if (response != null)
                {
                    result.Data = response.Data ?? new List<EarningCode>();
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

        //Seleccionar horas extras
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="_PageNumber">Parametro _PageNumber.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<IEnumerable<EarningCode>> GetAllExtraHourDataAsync(int _PageNumber = 1)
        {
            List<EarningCode> _model = new List<EarningCode>();

            string urlData = $"{urlsServices.GetUrl("Earningcodes")}/hours?PageNumber={_PageNumber}&PageSize=20";

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

        //Seleccionar earnings code
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="_PageNumber">Parametro _PageNumber.</param>
        /// <param name="PageSize">Parametro PageSize.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<IEnumerable<EarningCode>> GetAllEarningCodeDataAsync(int _PageNumber = 1,int PageSize=20)
        {
            List<EarningCode> _model = new List<EarningCode>();

            string urlData = $"{urlsServices.GetUrl("Earningcodes")}/earnings?PageNumber={_PageNumber}&PageSize={PageSize}";

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

        //guardar
        /// <summary>
        /// Crea o procesa.
        /// </summary>
        /// <param name="_model">Parametro _model.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> PostDataAsync(EarningCode _model)
        {
            Response<EarningCode> DataApi = null;
            ResponseUI responseUI = new ResponseUI();

            string urlData = urlsServices.GetUrl("Earningcodes");


            var Api = await ServiceConnect.connectservice(Token, urlData, _model, HttpMethod.Post);
            if (Api.IsSuccessStatusCode)
            {
                DataApi = JsonConvert.DeserializeObject<Response<EarningCode>>(Api.Content.ReadAsStringAsync().Result);
                responseUI.Message = DataApi.Message;
                responseUI.Type = ErrorMsg.TypeOk;
                // Devolver el ID del registro creado para cambiar a modo edicion
                responseUI.IdType = DataApi.Data?.EarningCodeId;
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
        /// <param name="isVersion">Parametro isVersion.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> PutDataAsync(string id, EarningCode _model,bool isVersion)
        {
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.GetUrl("Earningcodes")}/{id}?isVersion={isVersion}";

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

            string urlData = urlsServices.GetUrl("Earningcodes");

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

        //eliminar version
        /// <summary>
        /// Elimina un registro.
        /// </summary>
        /// <param name="EarningCodeId">Parametro EarningCodeId.</param>
        /// <param name="EarningCodeInternalId">Parametro EarningCodeInternalId.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> DeleteVersionDataAsync(string EarningCodeId, int EarningCodeInternalId)
        {
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.GetUrl("EarningcodesVersion")}/{EarningCodeId}/{EarningCodeInternalId}";

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

        //seleccionar por id
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="id">Parametro id.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<EarningCode> GetIdDataAsync(string id)
        {
            EarningCode _model = new EarningCode();


            string urlData = $"{urlsServices.GetUrl("Earningcodes")}/{id}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<EarningCode>>(Api.Content.ReadAsStringAsync().Result);
                _model = response.Data;
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

            string urlData = $"{urlsServices.GetUrl("Earningcodes")}/updatestatus/{id}";

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
