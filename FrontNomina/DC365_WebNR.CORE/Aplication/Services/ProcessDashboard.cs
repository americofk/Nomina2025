/// <summary>
/// Servicio para la gestión del panel de control.
/// Proporciona datos y métricas para el dashboard del sistema.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.INFRASTRUCTURE.Services;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace DC365_WebNR.CORE.Aplication.Services
{
    /// <summary>
    /// Servicio de proceso para ProcessDashboard.
    /// </summary>
    public class ProcessDashboard: ServiceBase
    {
        private const string Endpoint = "reportstxt";
        public ProcessDashboard(string _token)
        {
            Token = _token;

        }

        /// <summary>

        /// Clase para gestion de DashboardGraphicsInfo.

        /// </summary>

        public class DashboardGraphicsInfo
        {
            /// <summary>
            /// Empleado.
            /// </summary>
            public EmployeeByDepartments EmployeeByDepartments { get; set; }
            /// <summary>
            /// Obtiene o establece DtbutionCtbutionByYear.
            /// </summary>
            public DeductionsContributionsByYear DtbutionCtbutionByYear { get; set; }
            /// <summary>
            /// Obtiene o establece AmountByAction.
            /// </summary>
            public AmountByAction AmountByAction { get; set; }   
            /// <summary>
            /// Monto.
            /// </summary>
            public TrimestralPayrollAmount TrimestralPayrollAmount { get; set; }
        }

        /// <summary>

        /// Clase para gestion de AmountByAction.

        /// </summary>

        public class AmountByAction
        {
            /// <summary>
            /// Valor de texto para Keys.
            /// </summary>
            public List<string> Keys { get; set; }
            /// <summary>
            /// Valor numerico para Values.
            /// </summary>
            public List<decimal> Values { get; set; }
        }

        /// <summary>

        /// Clase para gestion de EmployeeByDepartments.

        /// </summary>

        public class EmployeeByDepartments
        {
            /// <summary>
            /// Valor de texto para Keys.
            /// </summary>
            public List<string> Keys { get; set; }
            /// <summary>
            /// Valor numerico para Values.
            /// </summary>
            public List<int> Values { get; set; }
        }

        /// <summary>

        /// Clase para gestion de DeductionsContributionsByYear.

        /// </summary>

        public class DeductionsContributionsByYear
        {
            /// <summary>
            /// Valor de texto para Keys.
            /// </summary>
            public List<string> Keys { get; set; }
            /// <summary>
            /// Valor numerico para CtbutionValues.
            /// </summary>
            public List<decimal> CtbutionValues { get; set; }
            /// <summary>
            /// Valor numerico para DtbutionValues.
            /// </summary>
            public List<decimal> DtbutionValues { get; set; }
        }

        /// <summary>

        /// Clase para gestion de TrimestralPayrollAmount.

        /// </summary>

        public class TrimestralPayrollAmount
        {
            /// <summary>
            /// Valor de texto para Keys.
            /// </summary>
            public List<string> Keys { get; set; }
            /// <summary>
            /// Valor numerico para FirtBar.
            /// </summary>
            public List<decimal> FirtBar { get; set; }
            /// <summary>
            /// Valor numerico para SecondBar.
            /// </summary>
            public List<decimal> SecondBar { get; set; }
            /// <summary>
            /// Valor numerico para ThirtBar.
            /// </summary>
            public List<decimal> ThirtBar { get; set; }
        }



        /// <summary>



        /// Obtiene.



        /// </summary>



        /// <returns>Resultado de la operacion.</returns>



        public async Task<Stream> GetTxt()
        {

            string urlData = $"{urlsServices.urlBaseOne}{Endpoint}";

            var Api = await ServiceConnect.connect(Token, urlData);

            return Api;
        }
        
        /// <summary>
        
        /// Obtiene.
        
        /// </summary>
        
        /// <returns>Resultado de la operacion.</returns>
        
        public async Task<DashboardCardInfo> GetCardInformation()
        {
            DashboardCardInfo _model = new DashboardCardInfo();

            string urlData = $"{urlsServices.GetUrl("Dashboard")}/cardinformation";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<DashboardCardInfo>>(Api.Content.ReadAsStringAsync().Result);
                _model = response.Data;
            }
            else
            {
                throw new Exception("Key-error");
            }

            return _model;
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="_year">Parametro _year.</param>

        /// <param name="_payrollid">Parametro _payrollid.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<DashboardGraphicsInfo> GetGraphicsInformation(int _year,string _payrollid)
        {
            DashboardGraphicsInfo _model = new DashboardGraphicsInfo();

            string urlData = $"{urlsServices.GetUrl("Dashboard")}/graphicinformation?year={_year}&payrollid={_payrollid}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<DashboardGraphicsInfo>>(Api.Content.ReadAsStringAsync().Result);
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
    }
}
