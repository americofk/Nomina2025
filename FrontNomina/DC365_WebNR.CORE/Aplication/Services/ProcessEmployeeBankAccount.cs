/// <summary>
/// Servicio para la gestión de cuentas bancarias de empleados.
/// Administra la información bancaria de los empleados para el pago de nómina.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Aplication.ProcessHelper;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.INFRASTRUCTURE.Services;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace DC365_WebNR.CORE.Aplication.Services
{
    /// <summary>
    /// Servicio de proceso para ProcessEmployeeBankAccount.
    /// </summary>
    public class ProcessEmployeeBankAccount : ServiceBase
    {

        public ProcessEmployeeBankAccount(string _token)
        {
            Token = _token;
        }


        //Lista
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="employeeid">Parametro employeeid.</param>
        /// <param name="_PageNumber">Parametro _PageNumber.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<IEnumerable<EmployeeBankAccount>> GetAllDataAsync(string employeeid, int _PageNumber = 1)
        {
            List<EmployeeBankAccount> _model = new List<EmployeeBankAccount>();


            string urlData = $"{urlsServices.GetUrl("EmployeeBankAccount")}/{employeeid}?PageNumber={_PageNumber}&PageSize=20";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<List<EmployeeBankAccount>>>(Api.Content.ReadAsStringAsync().Result);
                _model = response.Data;
            }
            else
            {
                //_model = new List<EmployeeBankAccount>(){
                //            new EmployeeBankAccount(){Error = ValidateRolHelper.validate(Api)}
                //        };

                return ValidateRolHelper<EmployeeBankAccount>.validate(Api, new EmployeeBankAccount());

            }

            return _model;
        }

        //guardar
        /// <summary>
        /// Crea o procesa.
        /// </summary>
        /// <param name="_model">Parametro _model.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> PostDataAsync(EmployeeBankAccount _model)
        {
            Response<EmployeeBankAccount> DataApi = null;
            ResponseUI responseUI = new ResponseUI();

            string urlData = urlsServices.GetUrl("EmployeeBankAccount");

            var Api = await ServiceConnect.connectservice(Token, urlData, _model, HttpMethod.Post);

            if (Api.IsSuccessStatusCode)
            {
                var response = Api.Content.ReadAsStringAsync().Result;
                DataApi = JsonConvert.DeserializeObject<Response<EmployeeBankAccount>>(Api.Content.ReadAsStringAsync().Result);
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
                if (Api.StatusCode != HttpStatusCode.ServiceUnavailable)
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
        /// <param name="InternalId">Parametro InternalId.</param>
        /// <param name="_model">Parametro _model.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> PutDataAsync(int InternalId, EmployeeBankAccount _model)
        {
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.GetUrl("EmployeeBankAccount")}/{InternalId}";

            var Api = await ServiceConnect.connectservice(Token, urlData, _model, HttpMethod.Put);


            if (Api.IsSuccessStatusCode)
            {
                var dato = Api.Content.ReadAsStringAsync().Result;
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
        /// <param name="employeeid">Parametro employeeid.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<ResponseUI> DeleteDataAsync(List<string> Obj, string employeeid)
        {
            ResponseUI responseUI = new ResponseUI();

            string urlData = $"{urlsServices.GetUrl("EmployeeBankAccount")}/{employeeid}";

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

        //buscar por id 
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="employeeid">Parametro employeeid.</param>
        /// <param name="internalId">Parametro internalId.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<EmployeeBankAccount> GetDataAsync(string employeeid, string internalId)
        {
            EmployeeBankAccount _model = new EmployeeBankAccount();

            string urlData = $"{urlsServices.GetUrl("EmployeeBankAccount")}/{employeeid}/{internalId}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<EmployeeBankAccount>>(Api.Content.ReadAsStringAsync().Result);
                _model = response.Data;
            }

            return _model;
        }

    }

}
