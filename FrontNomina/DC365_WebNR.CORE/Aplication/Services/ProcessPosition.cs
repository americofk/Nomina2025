/// <summary>
/// Servicio para la gestión de posiciones.
/// Administra el catálogo de posiciones y puestos de trabajo en la organización.
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
    /// Servicio de proceso para ProcessPosition.
    /// </summary>
    public class ProcessPosition : ServiceBase
    {

        public ProcessPosition(string _token)
        {
            Token = _token;
        }

        //todos los puestos
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="PropertyName">Parametro PropertyName.</param>
        /// <param name="PropertyValue">Parametro PropertyValue.</param>
        /// <param name="_PageNumber">Parametro _PageNumber.</param>
        /// <param name="PageSize">Parametro PageSize.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<IEnumerable<Position>> GetAllDataAsync(string PropertyName = "", string PropertyValue = "", int _PageNumber = 1, int PageSize=20)
        {
            List<Position> _model = new List<Position>();


            //string urlData = $"{urlsServices.GetUrl("PositionsEnabled")}?PageNumber={_PageNumber}&PageSize=20";
            string urlData = $"{urlsServices.GetUrl("PositionsEnabled")}?PageNumber={_PageNumber}&PageSize={PageSize}&PropertyName={PropertyName}&PropertyValue={PropertyValue}";


            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<List<Position>>>(Api.Content.ReadAsStringAsync().Result);
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
        public async Task<ResponseUI> PostDataAsync(Position _model)
        {
            Response<Position> DataApi = null;
            ResponseUI responseUI = new ResponseUI();

            string urlData = urlsServices.GetUrl("PositionsEnabled");
            //_model.StartDate = _model.StartDate.ToUniversalTime();
            //_model.EndDate = _model.StartDate.ToUniversalTime();
            var Api = await ServiceConnect.connectservice(Token, urlData, _model, HttpMethod.Post);
            if (Api.IsSuccessStatusCode)
            {
                DataApi = JsonConvert.DeserializeObject<Response<Position>>(Api.Content.ReadAsStringAsync().Result);
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
        /// <param name="id">Parametro id.</param>
        /// <param name="_model">Parametro _model.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> PutDataAsync(string id, Position _model)
        {
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.GetUrl("PositionsEnabled")}/{id}";

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
        public async Task<ResponseUI> DeleteDataAsync(List<string> Obj)
        {
            ResponseUI responseUI = new ResponseUI();

            string urlData = urlsServices.GetUrl("PositionsEnabled");

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

        //Inhabilitar Puesto
        /// <summary>
        /// Actualiza un registro existente.
        /// </summary>
        /// <param name="id">Parametro id.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> UpdateStatus(string id)
        {
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.GetUrl("PositionsEnabled")}/updatestatus/{id}?status=false";

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

        //seleccionar un puesto
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="id">Parametro id.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<Position> GetIdDataAsync(string id)
        {
            Position _model = new Position();


            string urlData = $"{urlsServices.GetUrl("PositionsEnabled")}/{id}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<Position>>(Api.Content.ReadAsStringAsync().Result);
                _model = response.Data;
            }

            return _model;
        }

        //marcar puesto como vacante
        /// <summary>
        /// Verifica si.
        /// </summary>
        /// <param name="id">Parametro id.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> IspositionVacant(string id)
        {
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.GetUrl("Vacants")}/updatetovacants/{id}?isVacants=true";

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
