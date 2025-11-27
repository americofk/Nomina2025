/// <summary>
/// Servicio para la gestión de empleados.
/// Contiene la lógica de negocio para operaciones CRUD y gestión de empleados.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Aplication.ProcessHelper;
using DC365_WebNR.CORE.Domain.Const;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.CORE.Domain.Models.Enums;
using DC365_WebNR.INFRASTRUCTURE.Services;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace DC365_WebNR.CORE.Aplication.Services
{
    /// <summary>
    /// Servicio de proceso para ProcessEmployee.
    /// </summary>
    public class ProcessEmployee : ServiceBase
    {

        public ProcessEmployee(string _token)
        {
            Token = _token;
        }

        //todos los empleados
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="type">Parametro type.</param>
        /// <param name="PropertyName">Parametro PropertyName.</param>
        /// <param name="PropertyValue">Parametro PropertyValue.</param>
        /// <param name="_PageNumber">Parametro _PageNumber.</param>
        /// <param name="PageSize">Parametro PageSize.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<IEnumerable<Employee>> GetAllDataAsync(string type = "", string PropertyName = "", string PropertyValue = "", int _PageNumber = 1,int PageSize=20)
        {
            List<Employee> _model = new List<Employee>();

            //string urlData = $"{urlsServices.GetUrl("Candidate")}?PageNumber={_PageNumber}&PageSize=20";
            string urlData = $"{urlsServices.GetUrl("Candidate")}?PageNumber={_PageNumber}&PageSize={PageSize}&PropertyName={PropertyName}&PropertyValue={PropertyValue}";

            if (type == "Dismissed")
                //urlData = $"{urlsServices.GetUrl("Dissmis")}?PageNumber={_PageNumber}&PageSize=20";
                urlData = $"{urlsServices.GetUrl("Dissmis")}?PageNumber={_PageNumber}&PageSize=20&PropertyName={PropertyName}&PropertyValue={PropertyValue}";

            if (type == "Employ")
                //urlData = $"{urlsServices.GetUrl("EmployeesEnabled")}?PageNumber={_PageNumber}&PageSize=20";
                urlData = $"{urlsServices.GetUrl("EmployeesEnabled")}?PageNumber={_PageNumber}&PageSize=20&PropertyName={PropertyName}&PropertyValue={PropertyValue}";

            if (type == "inactivos")
                //urlData = $"{urlsServices.GetUrl("EmployeesDisabled")}?PageNumber={_PageNumber}&PageSize=20";
                urlData = $"{urlsServices.GetUrl("EmployeesDisabled")}?PageNumber={_PageNumber}&PageSize=20&PropertyName={PropertyName}&PropertyValue={PropertyValue}";


            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<List<Employee>>>(Api.Content.ReadAsStringAsync().Result);
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
        public async Task<ResponseUI> PostDataAsync(Employee _model)
        {
            Response<Employee> DataApi = null;

            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.urlBaseOne}employees/candidate";

            var Api = await ServiceConnect.connectservice(Token, urlData, _model, HttpMethod.Post);

            if (Api.IsSuccessStatusCode)
            {
                //var dato = Api.Content.ReadAsStringAsync().Result;
                DataApi = JsonConvert.DeserializeObject<Response<Employee>>(Api.Content.ReadAsStringAsync().Result);
                responseUI.Message = DataApi.Message;
                responseUI.Type = ErrorMsg.TypeOk;
                responseUI.IdType = DataApi.Data.EmployeeId;
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
        public async Task<ResponseUI> PutDataAsync(string id, Employee _model)
        {
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.GetUrl("EmployeesEnabled")}/{id}";

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
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> DeleteDataAsync(List<string> Obj)
        {
            ResponseUI responseUI = new ResponseUI();

            string urlData = urlsServices.GetUrl("Candidate");

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

        //seleccionar un empleado
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="Id">Parametro Id.</param>
        /// <param name="type">Parametro type.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<Employee> GetIdDataAsync(string Id, string type)
        {
            Employee _model = new Employee();

            string urlData = $"{urlsServices.GetUrl("Candidate")}/{Id}";

            if (type == "Dismissed")
                urlData = $"{urlsServices.GetUrl("Dissmis")}/{Id}";
            if (type == "Employ")
                urlData = $"{urlsServices.GetUrl("EmployeesEnabled")}/{Id}";
            if (type == "inactivos")
                urlData = $"{urlsServices.GetUrl("EmployeesDisabled")}/{Id}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<Employee>>(Api.Content.ReadAsStringAsync().Result);
                //response.Data.BirthDate = DateTime.Parse(response.Data.BirthDate.ToString("yyyy-MM-dd"));
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

        //cargar foto al empleado
        /// <summary>
        /// Carga un archivo.
        /// </summary>
        /// <param name="file">Parametro file.</param>
        /// <param name="id">Parametro id.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> Uploadimage(IFormFile file, string id)
        {
            //Response<Department> DataApi = null;
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.GetUrl("Employees")}/uploadimage/{id}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Post, file);

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
                    byte[] data;
                    using (MemoryStream ms = new MemoryStream())
                    {
                        file.CopyTo(ms);
                        data = ms.ToArray();

                    }
                    responseUI.Message = String.Format("data:image/jpg;base64,{0}", Convert.ToBase64String(data, 0, data.Length));
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
                    if (Api.StatusCode == HttpStatusCode.Unauthorized)
                    {
                        var resulError = JsonConvert.DeserializeObject<Response<string>>(Api.Content.ReadAsStringAsync().Result);
                        string error = resulError.Errors.First();

                        responseUI.Type = "error";
                        responseUI.Errors = new List<string>() { error };
                    }
                    else
                    {

                        responseUI.Type = "error";
                        responseUI.Errors = new List<string>() { "La imagen es mayor a 2MB o se produjo un error procesando la solicitud." };
                    }
                    
                }

            }
            return responseUI;
        }

        // descargar foto de empleado
        /// <summary>
        /// Descarga.
        /// </summary>
        /// <param name="id">Parametro id.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> Downloadimage(string id)
        {
            //Response<Department> DataApi = null;
            ResponseUI responseUI = new ResponseUI();
            string urlData = $"{urlsServices.GetUrl("Employees")}/downloadimage/{id}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {

                var DataApi = JsonConvert.DeserializeObject<Response<string>>(Api.Content.ReadAsStringAsync().Result);
                if (!DataApi.Succeeded)
                {
                    responseUI.Type = "error";
                    responseUI.Errors = DataApi.Errors;
                }
                else
                {
                    responseUI.Message = !string.IsNullOrEmpty(DataApi.Data) ? string.Format("data:image/jpg;base64,{0}", DataApi.Data) : string.Empty;
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
                    if (Api.StatusCode == HttpStatusCode.Unauthorized)
                    {
                        var resulError = JsonConvert.DeserializeObject<Response<string>>(Api.Content.ReadAsStringAsync().Result);
                        string error = resulError.Errors.First();

                        responseUI.Type = "error";
                        responseUI.Errors = new List<string>() {error};
                    }
                    else
                    {

                        responseUI.Type = "error";
                        responseUI.Errors = new List<string>() { "Ocurrió un error procesando la solicitud, inténtelo más tarde o contacte con el administrador." };
                    }

                }



            }
            return responseUI;
        }

        //habilitar o deshabilitar
        /// <summary>
        /// Actualiza un registro existente.
        /// </summary>
        /// <param name="id">Parametro id.</param>
        /// <param name="option">Parametro option.</param>
        /// <param name="_isforDgt">Parametro _isforDgt.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> UpdateStatus(string id, int option,bool _isforDgt)
        {
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.GetUrl("EmployeesEnabled")}/updatestatus/{id}?isforDgt={_isforDgt}";
            if (option == 2)
                urlData = $"{urlsServices.GetUrl("EmployeesDisabled")}/updatestatus/{id}?isforDgt={_isforDgt}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Put);

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

        //Contratar empleado
        /// <summary>
        /// Contrata al empleado.
        /// </summary>
        /// <param name="hireEmployee">Parametro hireEmployee.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> HireEmployee(HireEmployee hireEmployee)
        {

            ResponseUI responseUI = new ResponseUI();
            string urlData = $"{urlsServices.GetUrl("HireEmployee")}/{hireEmployee.EmployeeId}/employ";

            var Api = await ServiceConnect.connectservice(Token, urlData, hireEmployee, HttpMethod.Post);

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

        //Desvincular empleado
        /// <summary>
        /// Ejecuta DissmisEmployee de forma asincrona.
        /// </summary>
        /// <param name="_dissmisemployee">Parametro _dissmisemployee.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> DissmisEmployee(HireEmployee _dissmisemployee)
        {

            ResponseUI responseUI = new ResponseUI();
            string urlData = $"{urlsServices.urlBaseOne}employees/{_dissmisemployee.EmployeeId}/dissmis";
            DissmisEmployee dissmisEmployee = new DissmisEmployee()
            {
                EmployeeId = _dissmisemployee.EmployeeId,
                ToDate = _dissmisemployee.ToDate,
                EmployeeAction = _dissmisemployee.EmployeeAction
            };
            var Api = await ServiceConnect.connectservice(Token, urlData, dissmisEmployee, HttpMethod.Post);

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
