/// <summary>
/// Servicio para la gestión de documentos de empleados.
/// Administra los documentos y archivos asociados a cada empleado.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Aplication.ProcessHelper;
using DC365_WebNR.CORE.Domain.Const;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.INFRASTRUCTURE.Services;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace DC365_WebNR.CORE.Aplication.Services
{
    /// <summary>
    /// Servicio de proceso para ProcessEmployeeDocument.
    /// </summary>
    public class ProcessEmployeeDocument: ServiceBase
    {
        public ProcessEmployeeDocument(string _token)
        {
            Token = _token;

        }

        //lista
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="employeeid">Parametro employeeid.</param>
        /// <param name="_PageNumber">Parametro _PageNumber.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<IEnumerable<EmployeeDocumentResponse>> GetAllDataAsync(string employeeid, int _PageNumber = 1)
        {
            List<EmployeeDocumentResponse> _model = new List<EmployeeDocumentResponse>();


            string urlData = $"{urlsServices.GetUrl("EmployeeDocument")}/{employeeid}?PageNumber={_PageNumber}&PageSize=20";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<List<EmployeeDocumentResponse>>>(Api.Content.ReadAsStringAsync().Result);
                _model = response.Data;
            }
            else
            {
                if (Api.StatusCode == HttpStatusCode.Forbidden)
                {
                    throw new Exception("Key-error");

                }
                return ValidateRolHelper<EmployeeDocumentResponse>.validate(Api, new EmployeeDocumentResponse());

            }

            return _model;
        }

        //guardar
        /// <summary>
        /// Crea o procesa.
        /// </summary>
        /// <param name="_model">Parametro _model.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> PostDataAsync(EmployeeDocument _model)
        {
            Response<EmployeeDocument> DataApi = null;
            ResponseUI responseUI = new ResponseUI();

            string urlData = urlsServices.GetUrl("EmployeeDocument");

            var Api = await ServiceConnect.connectservice(Token, urlData, _model, HttpMethod.Post);
            if (Api.IsSuccessStatusCode)
            {
                DataApi = JsonConvert.DeserializeObject<Response<EmployeeDocument>>(Api.Content.ReadAsStringAsync().Result);
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
        /// <param name="InternalId">Parametro InternalId.</param>
        /// <param name="_model">Parametro _model.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> PutDataAsync(int InternalId, EmployeeDocument _model)
        {
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.GetUrl("EmployeeDocument")}/{InternalId}";

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
        public async Task<ResponseUI> DeleteDataAsync(List<string> Obj, string employeeid)
        {
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.GetUrl("EmployeeDocument")}/{employeeid}";

            var Api = await ServiceConnect.connectservice(Token, urlData, Obj, HttpMethod.Delete);
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

        //buscar por id
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="employeeid">Parametro employeeid.</param>
        /// <param name="internalId">Parametro internalId.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<EmployeeDocument> GetDataAsync(string employeeid, string internalId)
        {
            EmployeeDocument _model = new EmployeeDocument();


            string urlData = $"{urlsServices.GetUrl("EmployeeDocument")}/{employeeid}/{internalId}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<EmployeeDocument>>(Api.Content.ReadAsStringAsync().Result);
                _model = response.Data;
            }

            return _model;
        }


        //cargar documento
        /// <summary>
        /// Carga un archivo.
        /// </summary>
        /// <param name="file">Parametro file.</param>
        /// <param name="employeeid">Parametro employeeid.</param>
        /// <param name="internalid">Parametro internalid.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> UploadDocument(IFormFile file, string employeeid, int internalid)
        {
            //Response<Department> DataApi = null;
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.GetUrl("EmployeeDocument")}/uploaddocument/{employeeid}/{internalid}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Post, file);

            if (Api.IsSuccessStatusCode)
            {
                var dato = Api.Content.ReadAsStringAsync().Result;
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

        // descargar documento
        /// <summary>
        /// Descarga.
        /// </summary>
        /// <param name="employeeid">Parametro employeeid.</param>
        /// <param name="internalid">Parametro internalid.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI<EmployeeDocumentDownload>> DownloadDocument(string employeeid, int internalid)
        {
            
            //Response<Department> DataApi = null;
            ResponseUI<EmployeeDocumentDownload> responseUI = new ResponseUI<EmployeeDocumentDownload>();
            string urlData = $"{urlsServices.GetUrl("EmployeeDocument")}/downloaddocument/{employeeid}/{internalid}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var dato = Api.Content.ReadAsStringAsync().Result;
                var DataApi = JsonConvert.DeserializeObject<Response<EmployeeDocumentDownload>>(Api.Content.ReadAsStringAsync().Result);

                responseUI.Obj = DataApi.Data;
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

        // eliminar adjunto
        /// <summary>
        /// Elimina el archivo adjunto de un documento.
        /// </summary>
        /// <param name="employeeid">ID del empleado.</param>
        /// <param name="internalid">ID interno del documento.</param>
        /// <returns>Resultado de la operación.</returns>
        public async Task<ResponseUI> DeleteAttachment(string employeeid, int internalid)
        {
            ResponseUI responseUI = new ResponseUI();
            string urlData = $"{urlsServices.GetUrl("EmployeeDocument")}/attachment/{employeeid}/{internalid}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Delete);

            if (Api.IsSuccessStatusCode)
            {
                var DataApi = JsonConvert.DeserializeObject<Response<bool>>(Api.Content.ReadAsStringAsync().Result);
                if (DataApi.Succeeded)
                {
                    responseUI.Message = DataApi.Message;
                    responseUI.Type = ErrorMsg.TypeOk;
                }
                else
                {
                    responseUI.Type = ErrorMsg.TypeError;
                    responseUI.Errors = DataApi.Errors;
                }
            }
            else
            {
                responseUI.Type = ErrorMsg.TypeError;
                try
                {
                    var content = Api.Content?.ReadAsStringAsync().Result;
                    if (!string.IsNullOrEmpty(content))
                    {
                        var resulError = JsonConvert.DeserializeObject<Response<string>>(content);
                        responseUI.Errors = resulError?.Errors ?? new List<string>() { $"Error: {Api.StatusCode}" };
                    }
                    else
                    {
                        responseUI.Errors = new List<string>() { $"Error: {Api.StatusCode}" };
                    }
                }
                catch
                {
                    responseUI.Errors = new List<string>() { "Ocurrió un error procesando la solicitud, inténtelo más tarde." };
                }
            }

            return responseUI;
        }

    }
}
