/// <summary>
/// Servicio para la gestión de detalles de proceso de nómina.
/// Administra la información detallada de los procesos de cálculo de nómina.
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
    /// Clase para gestion de ProceesPayrollProcessDetail.
    /// </summary>
    public class ProceesPayrollProcessDetail: ServiceBase
    {
        public ProceesPayrollProcessDetail(string _token)
        {
            Token = _token;
        }

        //Seleccionar novedades empleados
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="payrollprocessid">Parametro payrollprocessid.</param>
        /// <param name="employeeid">Parametro employeeid.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<IEnumerable<PayrollProcessAction>> GetAllDataAsync(string payrollprocessid, string employeeid)
        {
            List<PayrollProcessAction> payrollsProcess = new List<PayrollProcessAction>();

            string urlData = $"{urlsServices.GetUrl("Payrollprocessactions")}/{payrollprocessid}/{employeeid}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<List<PayrollProcessAction>>>(Api.Content.ReadAsStringAsync().Result);
                payrollsProcess = response.Data;
            }
            else
            {
                if (Api.StatusCode == HttpStatusCode.Forbidden)
                {
                    throw new Exception("Key-error");

                }
            }

            return payrollsProcess;
        }
    }
}
