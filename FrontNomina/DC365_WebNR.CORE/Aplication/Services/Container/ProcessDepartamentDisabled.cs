/// <summary>
/// Servicio para la gestión de departamentos inactivos.
/// Administra departamentos que han sido deshabilitados en el sistema.
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

namespace DC365_WebNR.CORE.Aplication.Services.Container
{
    /// <summary>
    /// Servicio de proceso para ProcessDepartamentDisabled.
    /// </summary>
    public class ProcessDepartamentDisabled: ServiceBase
    {
        List<Department> departments;
        public ProcessDepartamentDisabled(string _token)
        {
            Token = _token;
        }

        //editar
        /// <summary>
        /// Actualiza un registro existente.
        /// </summary>
        /// <param name="id">Parametro id.</param>
        /// <param name="_model">Parametro _model.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> PutDataAsync(string id, Department _model)
        {
            //Response<Department> DataApi = null;
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.GetUrl("Departmentdisabledput")}/{id}";

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
            //Response<Department> DataApi = null;
            ResponseUI responseUI = new ResponseUI();

            string urlData = urlsServices.GetUrl("Departmentdisabled");

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

        //Seleccionar todos
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="PropertyName">Parametro PropertyName.</param>
        /// <param name="PropertyValue">Parametro PropertyValue.</param>
        /// <param name="_PageNumber">Parametro _PageNumber.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<IEnumerable<Department>> GetAllDataAsync(string PropertyName = "", string PropertyValue = "", int _PageNumber = 1)
        {
            departments = new List<Department>();

            //string urlData = $"{urlsServices.GetUrl("Departmentdisabled")}?PageNumber={_PageNumber}&PageSize=20&departmentStatus=false";
            string urlData = $"{urlsServices.GetUrl("Departmentdisabled")}?PageNumber={_PageNumber}&PageSize=20&PropertyName={PropertyName}&PropertyValue={PropertyValue}";


            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<List<Department>>>(Api.Content.ReadAsStringAsync().Result);
                departments = response.Data;
            }
            else
            {
                if (Api.StatusCode == HttpStatusCode.Forbidden)
                {
                    throw new Exception("Key-error");

                }
            }

            return departments;
        }

        //Habilitar departamento
        /// <summary>
        /// Actualiza un registro existente.
        /// </summary>
        /// <param name="id">Parametro id.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> UpdateStatusDepartment(string id)
        {
            //Response<Department> DataApi = null;
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.GetUrl("Departmentdisabled")}/updatestatus/{id}?status=true";

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
