/// <summary>
/// Servicio para la gestión de códigos de deducción.
/// Administra los códigos utilizados para deducciones en nómina.
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
    /// Servicio de proceso para ProcessDeductionCode.
    /// </summary>
    public class ProcessDeductionCode: ServiceBase
    {
        public ProcessDeductionCode(string _token)
        {
            Token = _token;
        }

        //Seleccionar todos
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="_IsVersion">Parametro _IsVersion.</param>
        /// <param name="id">Parametro id.</param>
        /// <param name="PropertyName">Parametro PropertyName.</param>
        /// <param name="PropertyValue">Parametro PropertyValue.</param>
        /// <param name="_PageNumber">Parametro _PageNumber.</param>
        /// <param name="PageSize">Parametro PageSize.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<IEnumerable<DeductionCode>> GetAllDataAsync(bool _IsVersion = false, string id = "", string PropertyName = "", string PropertyValue = "", int _PageNumber = 1,int PageSize=20)
        {
            List<DeductionCode> courseType = new List<DeductionCode>();

            string urlData = $"{urlsServices.GetUrl("Deductioncodes")}?PageNumber={_PageNumber}&PageSize={PageSize}&PropertyName={PropertyName}&PropertyValue={PropertyValue}&versions={_IsVersion}&id={id}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<List<DeductionCode>>>(Api.Content.ReadAsStringAsync().Result);
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
        /// <param name="_model">Parametro _model.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> PostDataAsync(DeductionCode _model)
        {
            Response<DeductionCode> DataApi = null;
            ResponseUI responseUI = new ResponseUI();

            string urlData = urlsServices.GetUrl("Deductioncodes");


            var Api = await ServiceConnect.connectservice(Token, urlData, _model, HttpMethod.Post);

            if (Api.IsSuccessStatusCode)
            {
                DataApi = JsonConvert.DeserializeObject<Response<DeductionCode>>(Api.Content.ReadAsStringAsync().Result);
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

        //editar
        /// <summary>
        /// Actualiza un registro existente.
        /// </summary>
        /// <param name="id">Parametro id.</param>
        /// <param name="_model">Parametro _model.</param>
        /// <param name="isVersion">Parametro isVersion.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> PutDataAsync(string id, DeductionCode _model, bool isVersion)
        {
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.GetUrl("Deductioncodes")}/{id}?isVersion={isVersion}";


            var Api = await ServiceConnect.connectservice(Token, urlData, _model, HttpMethod.Put);

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

        //eliminar
        /// <summary>
        /// Elimina un registro.
        /// </summary>
        /// <param name="Obj">Parametro Obj.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> DeleteDataAsync(List<string> Obj)
        {
            ResponseUI responseUI = new ResponseUI();

            string urlData = urlsServices.GetUrl("Deductioncodes");

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

        //eliminar version
        /// <summary>
        /// Elimina un registro.
        /// </summary>
        /// <param name="DeductionCodeId">Parametro DeductionCodeId.</param>
        /// <param name="DeductionCodeInternalId">Parametro DeductionCodeInternalId.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> DeleteVersionDataAsync(string DeductionCodeId, int DeductionCodeInternalId)
        {
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.urlBaseOne}deductioncodes/version/{DeductionCodeId}/{DeductionCodeInternalId}";

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
        /// <param name="_IsVersion">Parametro _IsVersion.</param>
        /// <param name="internalid">Parametro internalid.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<DeductionCode> GetIdDataAsync(string id, bool _IsVersion = false, string internalid = "")
        {
            DeductionCode _model = new DeductionCode();


            string urlData = $"{urlsServices.GetUrl("Deductioncodes")}/{id}?versions={_IsVersion}&internalid={internalid}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);
            
            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<DeductionCode>>(Api.Content.ReadAsStringAsync().Result);
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

            string urlData = $"{urlsServices.GetUrl("Deductioncodes")}/updatestatus/{id}";

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
