/// <summary>
/// Manejador de consultas para obtenciÃ³n de datos de LicenseValidation.
/// Facilita la recuperaciÃ³n de informaciÃ³n mediante consultas optimizadas.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_PayrollHR.Core.Application.Common.Helper;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.LicenseValidations
{
    /// <summary>
    /// Manejador para operaciones de ILicenseValidationQuery.
    /// </summary>
    public interface ILicenseValidationQueryHandler
    {
        public Task<Response<object>> ValidateLicense(string licensekey);
        public Task<Response<object>> ValidateNroControl(string licensekey, int currentControlNum);
    }

    /// <summary>

    /// Manejador para operaciones de LicenseValidationQuery.

    /// </summary>

    public class LicenseValidationQueryHandler : ILicenseValidationQueryHandler
    {
        private readonly IConnectThirdServices _ConnectThirdServices;
        private readonly AppSettings _configuration;

        private const string thirdpartyurl = "http://localhost:9191/api/v2.0/licensevalidation";

        public LicenseValidationQueryHandler(IConnectThirdServices connectThirdServices, IOptions<AppSettings> configuration)
        {
            _ConnectThirdServices = connectThirdServices;
            _configuration = configuration.Value;
        }

        /// <summary>

        /// Valida los datos.

        /// </summary>

        /// <param name="licensekey">Parametro licensekey.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<Response<object>> ValidateLicense(string licensekey)
        {
            Response<object> objectReturn = new Response<object>();
            string endpoint = $"?licensekey={licensekey}&&apikeyvalue={_configuration.SecretConfig}";

            var response = await _ConnectThirdServices.CallAsync(thirdpartyurl + endpoint, null, HttpMethod.Get);

            if (!response.IsSuccessStatusCode)
            {
                if (response.StatusCode != HttpStatusCode.ServiceUnavailable)
                {
                    var resulError = JsonConvert.DeserializeObject<Response<bool>>(response.Content.ReadAsStringAsync().Result);
                    objectReturn.StatusHttp = resulError.StatusHttp;
                    objectReturn.Errors = (List<string>)resulError.Errors;
                    objectReturn.Data = false;
                }
                else
                {
                    objectReturn.StatusHttp = 500;
                    objectReturn.Errors = new List<string>() { "El servidor cliente no responde" };
                    objectReturn.Data = false;

                }

                return objectReturn;
            }

            return new Response<object>(true);
        }

        /// <summary>

        /// Valida los datos.

        /// </summary>

        /// <param name="licensekey">Parametro licensekey.</param>

        /// <param name="currentControlNum">Parametro currentControlNum.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<Response<object>> ValidateNroControl(string licensekey, int currentControlNum)
        {
            Response<object> objectReturn = new Response<object>();
            string endpoint = $"/controlnum?licensekey={licensekey}&controlnum={currentControlNum}&apikeyvalue={_configuration.SecretConfig}";

            var response = await _ConnectThirdServices.CallAsync(thirdpartyurl + endpoint, null, HttpMethod.Get);

            if (!response.IsSuccessStatusCode)
            {
                if (response.StatusCode != HttpStatusCode.ServiceUnavailable)
                {
                    var resulError = JsonConvert.DeserializeObject<Response<bool>>(response.Content.ReadAsStringAsync().Result);
                    objectReturn.StatusHttp = resulError.StatusHttp;
                    objectReturn.Errors = (List<string>)resulError.Errors;
                    objectReturn.Data = false;
                }
                else
                {
                    objectReturn.StatusHttp = 500;
                    objectReturn.Errors = new List<string>() { "El servidor cliente no responde" };
                    objectReturn.Data = false;
                }

                return objectReturn;
            }

            return new Response<object>(true);
        }
    }
}
