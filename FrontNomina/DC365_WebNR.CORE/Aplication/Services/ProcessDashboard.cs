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
    public class ProcessDashboard: ServiceBase
    {
        private const string Endpoint = "reportstxt";
        public ProcessDashboard(string _token)
        {
            Token = _token;

        }

        public class DashboardGraphicsInfo
        {
            public EmployeeByDepartments EmployeeByDepartments { get; set; }
            public DeductionsContributionsByYear DtbutionCtbutionByYear { get; set; }
            public AmountByAction AmountByAction { get; set; }   
            public TrimestralPayrollAmount TrimestralPayrollAmount { get; set; }
        }

        public class AmountByAction
        {
            public List<string> Keys { get; set; }
            public List<decimal> Values { get; set; }
        }

        public class EmployeeByDepartments
        {
            public List<string> Keys { get; set; }
            public List<int> Values { get; set; }
        }

        public class DeductionsContributionsByYear
        {
            public List<string> Keys { get; set; }
            public List<decimal> CtbutionValues { get; set; }
            public List<decimal> DtbutionValues { get; set; }
        }

        public class TrimestralPayrollAmount
        {
            public List<string> Keys { get; set; }
            public List<decimal> FirtBar { get; set; }
            public List<decimal> SecondBar { get; set; }
            public List<decimal> ThirtBar { get; set; }
        }



        public async Task<Stream> GetTxt()
        {

            string urlData = $"{urlsServices.urlBaseOne}{Endpoint}";

            var Api = await ServiceConnect.connect(Token, urlData);

            return Api;
        }
        
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
