/// <summary>
/// Servicio para la gestión de requisitos de posiciones.
/// Administra los requisitos y competencias necesarias para cada posición.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
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
    /// Servicio de proceso para ProcessPositionRequirement.
    /// </summary>
    public class ProcessPositionRequirement: ServiceBase
    {
        public ProcessPositionRequirement(string _token)
        {
            Token = _token;
        }

        //todos los requisitos de un departamento
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="positionid">Parametro positionid.</param>
        /// <param name="_PageNumber">Parametro _PageNumber.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<List<PositionRequirement>> GetAllDataAsync(string positionid,int _PageNumber = 1)
        {
            List<PositionRequirement> _model = new List<PositionRequirement>();


            string urlData = $"{urlsServices.GetUrl("Positionrequirements")}/{positionid}?PageNumber={_PageNumber}&PageSize=20";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<List<PositionRequirement>>>(Api.Content.ReadAsStringAsync().Result);
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
        /// <param name="positionid">Parametro positionid.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> PostDataAsync(PositionRequirement _model, string positionid)
        {
            Response<PositionRequirement> DataApi = null;
            ResponseUI responseUI = new ResponseUI();

            string urlData = urlsServices.GetUrl("Positionrequirements");
            var Api = await ServiceConnect.connectservice(Token, urlData, _model, HttpMethod.Post);

            if (Api.IsSuccessStatusCode)
            {
                var response = Api.Content.ReadAsStringAsync().Result;
                DataApi = JsonConvert.DeserializeObject<Response<PositionRequirement>>(Api.Content.ReadAsStringAsync().Result);
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
                var response = Api.Content.ReadAsStringAsync().Result;
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
        /// <param name="_model">Parametro _model.</param>
        /// <param name="positionid">Parametro positionid.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> PutDataAsync(PositionRequirement _model, string positionid)
        {
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.GetUrl("Positionrequirements")}/{positionid}";

            var Api = await ServiceConnect.connectservice(Token, urlData, _model, HttpMethod.Put);


            if (Api.IsSuccessStatusCode)
            {
                var DataApi = JsonConvert.DeserializeObject<Response<object>>(Api.Content.ReadAsStringAsync().Result);
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

        //eliminar
        /// <summary>
        /// Elimina un registro.
        /// </summary>
        /// <param name="Obj">Parametro Obj.</param>
        /// <param name="positionid">Parametro positionid.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> DeleteDataAsync(List<string> Obj, string positionid)
        {
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.GetUrl("Positionrequirements")}/{positionid}";

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

        //buscar un requisito de puesto
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="positionid">Parametro positionid.</param>
        /// <param name="internalId">Parametro internalId.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<PositionRequirement> GetDataAsync(string positionid, string internalId)
        {
            PositionRequirement _model = new PositionRequirement();


            string urlData = $"{urlsServices.GetUrl("Positionrequirements")}/{positionid}/{internalId}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<PositionRequirement>>(Api.Content.ReadAsStringAsync().Result);
                _model = response.Data;
            }

            return _model;
        }
    }
}
