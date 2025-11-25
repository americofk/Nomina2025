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
    public class ProceesPayrollProcessDetail: ServiceBase
    {
        public ProceesPayrollProcessDetail(string _token)
        {
            Token = _token;
        }

        //Seleccionar novedades empleados
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
