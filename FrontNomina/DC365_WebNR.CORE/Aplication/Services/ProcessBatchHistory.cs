using DC365_WebNR.CORE.Aplication.ProcessHelper;
using DC365_WebNR.CORE.Domain.Const;
using DC365_WebNR.CORE.Domain.Models;
using DC365_WebNR.CORE.Domain.Models.Enums;
using DC365_WebNR.INFRASTRUCTURE.Services;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace DC365_WebNR.CORE.Aplication.Services
{
    public class ProcessBatchHistory : ServiceBase
    {
        private const string Endpoint = "importbatch/";
        private string OptionSeparator = string.Empty;

        public ProcessBatchHistory(string _token)
        {
            Token = _token;
        }

        //guardar
        public async Task<ResponseUI> PostDataAsync(IFormFile file, BatchEntity _entity,string _optionSeparator)
        {
            ResponseUI responseUI = new ResponseUI();
            OptionSeparator = _optionSeparator;
            switch (_entity)
            {
                case BatchEntity.Employee:
                    responseUI = await PostDataAsyncEmployee(file);
                    break;

                case BatchEntity.Employeeaddress:
                    responseUI = await PostDataAsyncEmployeeaddress(file);
                    break;

                case BatchEntity.EmployeeContactInfo:
                    responseUI = await PostDataAsyncEmployeeContactInfo(file);
                    break;
                
                case BatchEntity.EmployeeDocument:
                    responseUI = await PostDataAsyncEmployeeDocument(file);
                    break;
                
                case BatchEntity.EmployeeBanks:
                    responseUI = await PostDataAsyncEmployeebankaccount(file);
                    break;
                
                case BatchEntity.EmployeeTax:
                    responseUI = await PostDataAsyncEmployeeTax(file);
                    break;
                
                case BatchEntity.EmployeeExtraHours:
                    responseUI = await PostDataAsyncEmployeeextrahours(file);
                    break;
               
                
                case BatchEntity.EmployeeEarningCode:
                    responseUI = await PostDataAsyncEmployeeearningcodes(file);
                    break;
                
                case BatchEntity.EmployeeLoans:
                    responseUI = await PostDataAsyncEmployeeloans(file);
                    break;
                
                case BatchEntity.EmployeeDeductionCode:
                    responseUI = await PostDataAsyncEmployeedeductions(file);
                    break;
                
                case BatchEntity.EmployeeWorkCalendars:
                    responseUI = await PostDataAsyncEmployeeWorkCalendars(file);
                    break;
                case BatchEntity.EmployeeWorkControlCalendar:
                    responseUI = await PostDataAsyncEmployeeWorkControlCalendar(file);
                    break;
               
            }
            return responseUI;
        }

        //guardar Employee batch
        public async Task<ResponseUI> PostDataAsyncEmployee(IFormFile file)
        {
            Response<Employee> DataApi = null;
            ResponseUI responseUI = new ResponseUI();
            List<EmployeeBatch> employees = new List<EmployeeBatch>();
            int realValue = 0;
            using (MemoryStream ms = new MemoryStream())
            {
                var fs = file.OpenReadStream();
                fs.CopyTo(ms);
                ms.Position = 0;
                bool endLine = false;
                int cont = 1;
                DateTime datatime;
                TimeSpan timeSpan;
                StreamReader sr = new StreamReader(ms);
                string result = sr.ReadLine();
                string[] header = result.Split(OptionSeparator);
                var a= ValidateLengthFile(header.Length, BatchEntity.Employee);
                if (a!=null) return a;

                while (!endLine)
                {
                    cont++;
                    result = sr.ReadLine();
                    if (!string.IsNullOrEmpty(result))
                    {
                        string[] splitResult = result.Split(OptionSeparator);
                        EmployeeBatch employee = new EmployeeBatch()
                        {
                            Name = splitResult[0],
                            LastName = splitResult[1],
                            BirthDate = string.IsNullOrEmpty(splitResult[2]) ? default : DateTime.TryParse(splitResult[2], CultureInfo.CreateSpecificCulture("es-MX"), DateTimeStyles.None, out datatime) ? datatime : throw new Exception($"Fecha nacimiento - Formato de fecha incorrecto, debe ingresar (dd/MM/yyyy) - Línea {cont}"),
                            Gender = EnumAttributeHelper<Gender>.GetAttributeName(splitResult[3], out realValue) == 9999 ? throw new Exception($"Género no existe - Línea {cont}") : (Gender)realValue,
                            Age = string.IsNullOrEmpty(splitResult[4]) ? 0 : int.Parse(splitResult[4]),
                            DependentsNumbers = int.Parse(splitResult[5]),
                            MaritalStatus = EnumAttributeHelper<MaritalStatus>.GetAttributeName(splitResult[6], out realValue) == 9999 ? throw new Exception($"Estado civil no existe - Línea {cont}") : (MaritalStatus)realValue,
                            NSS = splitResult[7],
                            ARS = splitResult[8],
                            AFP = splitResult[9],
                            AdmissionDate = string.IsNullOrEmpty(splitResult[10]) ? default : DateTime.TryParse(splitResult[10], CultureInfo.CreateSpecificCulture("es-MX"), DateTimeStyles.None, out datatime) ? datatime : throw new Exception($"Fecha registro - Formato de fecha incorrecto,debe ingresar (dd/MM/yyyy) - Línea {cont}"),
                            Country = splitResult[11],
                            EmployeeType = EnumAttributeHelper<EmployeeType>.GetAttributeName(splitResult[12], out realValue) == 9999 ? throw new Exception($"Tipo de empleado no existe - Línea {cont}") : (EmployeeType)realValue,
                            HomeOffice = ValidateFormatBool(splitResult[13], cont, "Trabaja en casa"),
                            OwnCar = ValidateFormatBool(splitResult[14], cont, "Auto propio"),
                            HasDisability = ValidateFormatBool(splitResult[15], cont, "Discapacidad"),
                            WorkFrom = TimeSpan.TryParse(splitResult[16], out timeSpan) ? timeSpan : throw new Exception($"Trabaja desde tiene un formato de hora incorrecto, debe ingresar el siguiente formato (hh:mm:ss) - Línea {cont}"),
                            WorkTo = TimeSpan.TryParse(splitResult[17], out timeSpan) ? timeSpan : throw new Exception($"Trabaja hasta tiene un formato de hora incorrecto, debe ingresar el siguiente formato (hh:mm:ss) - Línea {cont}"),
                            BreakWorkFrom = TimeSpan.TryParse(splitResult[18], out timeSpan) ? timeSpan : throw new Exception($"Descanso desde tiene un formato de hora incorrecto, debe ingresar el siguiente formato (hh:mm:ss) - Línea {cont}"),
                            BreakWorkTo = TimeSpan.TryParse(splitResult[19], out timeSpan) ? timeSpan : throw new Exception($"Descanso hasta tiene formato de hora incorrecto, debe ingresar el siguiente formato (hh:mm:ss) - Línea {cont}"),
                            PayMethod = EnumAttributeHelper<PayMethod>.GetAttributeName(splitResult[20], out realValue) == 9999 ? throw new Exception($"Metodo de pago no existe - Línea {cont}") : (PayMethod)realValue,
                            OccupationId = string.IsNullOrEmpty(splitResult[21]) ? "01" : splitResult[21].Split("|")[0].Trim(),
                            EducationLevelId = string.IsNullOrEmpty(splitResult[22]) ? "01" : splitResult[22].Split("|")[0].Trim(),
                            DisabilityTypeId = string.IsNullOrEmpty(splitResult[23]) ? "4717" : splitResult[23].Split("|")[0].Trim(),
                            LocationId = splitResult[24],
                            PositionId = splitResult[25],
                            PositionFromDate = string.IsNullOrEmpty(splitResult[26]) ? default : DateTime.TryParse(splitResult[26], CultureInfo.CreateSpecificCulture("es-MX"), DateTimeStyles.None, out datatime) ? datatime : throw new Exception($"Fecha inicio puesto - Formato de fecha incorrecto, debe ingresar (dd/MM/yyyy) - Línea {cont}"),
                            PositionToDate = string.IsNullOrEmpty(splitResult[27]) ? default : DateTime.TryParse(splitResult[27], CultureInfo.CreateSpecificCulture("es-MX"), DateTimeStyles.None, out datatime) ? datatime : throw new Exception($"Fecha final puesto - Formato de fecha incorrecto, debe ingresar (dd/MM/yyyy) - Línea {cont}"),

                        };
                        employees.Add(employee);
                    }
                    else
                        endLine = true;
                }
            }
            string urlData = $"{urlsServices.urlBaseOne}{Endpoint}employees";
            var Api = await ServiceConnect.connectservice(Token, urlData, employees, HttpMethod.Post);

            if (Api.IsSuccessStatusCode)
            {
                DataApi = JsonConvert.DeserializeObject<Response<Employee>>(Api.Content.ReadAsStringAsync().Result);
                responseUI.Message = DataApi.Message;
                responseUI.Type = ErrorMsg.TypeOk;
            }
            else
            {
                return CatchError(Api);
            }

            return responseUI;
        }

        private bool ValidateFormatBool(string v,int cont,string caller)
        {

            switch (v.ToLower())
            {
                case "si":
                    return true;
                
                case "no":
                    return false;

                default:
                    return false;

            }

        }


        //guardar Employee adress batch
        public async Task<ResponseUI> PostDataAsyncEmployeeaddress(IFormFile file)
        {
            Response<EmployeeAddressBatch> DataApi = null;
            ResponseUI responseUI = new ResponseUI();
            List<EmployeeAddressBatch> employees = new List<EmployeeAddressBatch>();
            using (MemoryStream ms = new MemoryStream())
            {
                var fs = file.OpenReadStream();
                fs.CopyTo(ms);
                ms.Position = 0;
                bool endLine = false;
                int cont = 1;
                StreamReader sr = new StreamReader(ms);
                string result = sr.ReadLine();
                string[] header = result.Split(OptionSeparator);
                var a = ValidateLengthFile(header.Length, BatchEntity.Employeeaddress);
                if (a != null) return a;

                while (!endLine)
                {
                    cont++;
                    result = sr.ReadLine();
                    if (!string.IsNullOrEmpty(result))
                    {
                        
                        string[] splitResult = result.Split(OptionSeparator);
                        EmployeeAddressBatch employee = new EmployeeAddressBatch()
                        {
                            EmployeeId = splitResult[0],
                            EmployeeName = splitResult[1],
                            Street = splitResult[2],
                            Home = splitResult[3],
                            Sector = splitResult[4],
                            City = splitResult[5],
                            Province = splitResult[6],
                            IsPrincipal = ValidateFormatBool(splitResult[7], cont, "Es principal"),
                            CountryId = splitResult[8]
                        };
                        employees.Add(employee);
                    }
                    else
                        endLine = true;
                }
            }

            string urlData = $"{urlsServices.urlBaseOne}{Endpoint}employeeaddress";

            var Api = await ServiceConnect.connectservice(Token, urlData, employees, HttpMethod.Post);

            if (Api.IsSuccessStatusCode)
            {
                DataApi = JsonConvert.DeserializeObject<Response<EmployeeAddressBatch>>(Api.Content.ReadAsStringAsync().Result);
                responseUI.Message = DataApi.Message;
                responseUI.Type = ErrorMsg.TypeOk;
            }
            else
            {
                return CatchError(Api);
            }

            return responseUI;
        }

        //guardar Employee contactInfo batch
        public async Task<ResponseUI> PostDataAsyncEmployeeContactInfo(IFormFile file)
        {
            Response<EmployeeContactInfoBatch> DataApi = null;
            ResponseUI responseUI = new ResponseUI();
            List<EmployeeContactInfoBatch> employees = new List<EmployeeContactInfoBatch>();
            using (MemoryStream ms = new MemoryStream())
            {
                var fs = file.OpenReadStream();
                fs.CopyTo(ms);
                ms.Position = 0;
                bool endLine = false;
                int cont = 1;
                int realValue = 0;

                StreamReader sr = new StreamReader(ms);
                string result = sr.ReadLine();
                string[] header = result.Split(OptionSeparator);
                var a = ValidateLengthFile(header.Length, BatchEntity.EmployeeContactInfo);
                if (a != null) return a;
                while (!endLine)
                {
                    cont++;
                    result = sr.ReadLine();
                    if (!string.IsNullOrEmpty(result))
                    {

                        string[] splitResult = result.Split(OptionSeparator);
                        EmployeeContactInfoBatch employee = new EmployeeContactInfoBatch()
                        {
                            EmployeeId = splitResult[0],
                            EmployeeName = splitResult[1],
                            NumberAddress = splitResult[2],
                            ContactType = EnumAttributeHelper<ContactType>.GetAttributeName(splitResult[3], out realValue) == 9999 ? throw new Exception($"Tipo de contacto no existe - Línea {cont}") : (ContactType)realValue,
                            IsPrincipal = ValidateFormatBool(splitResult[4], cont, "Es principal")
                        };
                        employees.Add(employee);
                    }
                    else
                        endLine = true;
                }
            }

            string urlData = $"{urlsServices.urlBaseOne}{Endpoint}employeecontactinfo";

            var Api = await ServiceConnect.connectservice(Token, urlData, employees, HttpMethod.Post);

            if (Api.IsSuccessStatusCode)
            {
                DataApi = JsonConvert.DeserializeObject<Response<EmployeeContactInfoBatch>>(Api.Content.ReadAsStringAsync().Result);
                responseUI.Message = DataApi.Message;
                responseUI.Type = ErrorMsg.TypeOk;
            }
            else
            {
                return CatchError(Api);
            }

            return responseUI;
        }

        //guardar Employee Document batch
        public async Task<ResponseUI> PostDataAsyncEmployeeDocument(IFormFile file)
        {
            Response<EmployeeDocumentBatch> DataApi = null;
            ResponseUI responseUI = new ResponseUI();
            List<EmployeeDocumentBatch> employees = new List<EmployeeDocumentBatch>();
            using (MemoryStream ms = new MemoryStream())
            {
                var fs = file.OpenReadStream();
                fs.CopyTo(ms);
                ms.Position = 0;
                bool endLine = false;
                int cont=0;
                DateTime datatime;
                int realValue = 0;
                StreamReader sr = new StreamReader(ms);
                string result = sr.ReadLine();
                string[] header = result.Split(OptionSeparator);
                var a = ValidateLengthFile(header.Length, BatchEntity.EmployeeDocument);
                if (a != null) return a;
                while (!endLine)
                {
                    cont++;
                    result = sr.ReadLine();
                    if (!string.IsNullOrEmpty(result))
                    {

                        string[] splitResult = result.Split(OptionSeparator);
                        EmployeeDocumentBatch employee = new EmployeeDocumentBatch()
                        {
                            EmployeeId = splitResult[0],
                            EmployeeName = splitResult[1],
                            DocumentNumber = splitResult[2],
                            DueDate = string.IsNullOrEmpty(splitResult[3]) ? default : DateTime.TryParse(splitResult[3], CultureInfo.CreateSpecificCulture("es-MX"), DateTimeStyles.None, out datatime) ? datatime : throw new Exception($"Fecha de vencimiento - Formato de fecha incorrecto, debe ingresar (dd/MM/yyyy) - Línea {cont}"),
                            DocumentType = EnumAttributeHelper<DocumentType>.GetAttributeName(splitResult[4], out realValue) == 9999 ? throw new Exception($"Tipo de documento no existe - Línea {cont}") : (DocumentType)realValue,
                            IsPrincipal = ValidateFormatBool(splitResult[5], cont, "Es principal")
                        };
                        employees.Add(employee);
                    }
                    else
                        endLine = true;
                }
            }

            string urlData = $"{urlsServices.urlBaseOne}{Endpoint}employeedocument";

            var Api = await ServiceConnect.connectservice(Token, urlData, employees, HttpMethod.Post);

            if (Api.IsSuccessStatusCode)
            {
                DataApi = JsonConvert.DeserializeObject<Response<EmployeeDocumentBatch>>(Api.Content.ReadAsStringAsync().Result);
                responseUI.Message = DataApi.Message;
                responseUI.Type = ErrorMsg.TypeOk;
            }
            else
            {
                return CatchError(Api);
            }

            return responseUI;
        }

        //save Employee bankaccount batch
        public async Task<ResponseUI> PostDataAsyncEmployeebankaccount(IFormFile file)
        {
            Response<EmployeebankaccountBatch> DataApi = null;
            ResponseUI responseUI = new ResponseUI();
            List<EmployeebankaccountBatch> employees = new List<EmployeebankaccountBatch>();
            using (MemoryStream ms = new MemoryStream())
            {
                var fs = file.OpenReadStream();
                fs.CopyTo(ms);
                ms.Position = 0;
                bool endLine = false;
                int cont = 0;
                int realValue = 0;
                StreamReader sr = new StreamReader(ms);
                string result = sr.ReadLine();
                string[] header = result.Split(OptionSeparator);
                var a = ValidateLengthFile(header.Length, BatchEntity.EmployeeBanks);
                if (a != null) return a;
                while (!endLine)
                {
                    cont++;
                    result = sr.ReadLine();
                    if (!string.IsNullOrEmpty(result))
                    {

                        string[] splitResult = result.Split(OptionSeparator);
                        EmployeebankaccountBatch employee = new EmployeebankaccountBatch()
                        {
                            EmployeeId = splitResult[0],
                            EmployeeName = splitResult[1],
                            AccountNum = splitResult[2],
                            BankName = splitResult[3],
                            AccountType = EnumAttributeHelper<AccountType>.GetAttributeName(splitResult[4], out realValue) == 9999 ? throw new Exception($"Tipo de cuenta no existe - Línea {cont}") : (AccountType)realValue,
                            Currency = splitResult[5],
                            IsPrincipal = ValidateFormatBool(splitResult[6], cont, "Es principal")
                        };
                        employees.Add(employee);
                    }
                    else
                        endLine = true;
                }
            }

            string urlData = $"{urlsServices.urlBaseOne}{Endpoint}employeebankaccount";

            var Api = await ServiceConnect.connectservice(Token, urlData, employees, HttpMethod.Post);

            if (Api.IsSuccessStatusCode)
            {
                DataApi = JsonConvert.DeserializeObject<Response<EmployeebankaccountBatch>>(Api.Content.ReadAsStringAsync().Result);
                responseUI.Message = DataApi.Message;
                responseUI.Type = ErrorMsg.TypeOk;
            }
            else
            {
                return CatchError(Api);
            }

            return responseUI;
        }

        //save Employee extrahours batch
        public async Task<ResponseUI> PostDataAsyncEmployeeextrahours(IFormFile file)
        {
            Response<EmployeeextrahoursBatch> DataApi = null;
            ResponseUI responseUI = new ResponseUI();
            List<EmployeeextrahoursBatch> employees = new List<EmployeeextrahoursBatch>();
            using (MemoryStream ms = new MemoryStream())
            {
                var fs = file.OpenReadStream();
                fs.CopyTo(ms);
                ms.Position = 0;
                bool endLine = false;
                int cont = 0;
                DateTime datatime;
                TimeSpan timeSpan;
                StreamReader sr = new StreamReader(ms);
                string result = sr.ReadLine();
                string[] header = result.Split(OptionSeparator);
                var a = ValidateLengthFile(header.Length, BatchEntity.EmployeeExtraHours);
                if (a != null) return a;
                while (!endLine)
                {
                    cont++;
                    result = sr.ReadLine();
                    if (!string.IsNullOrEmpty(result))
                    {

                        string[] splitResult = result.Split(OptionSeparator);
                        EmployeeextrahoursBatch employee = new EmployeeextrahoursBatch()
                        {
                            EmployeeId = splitResult[0],
                            EmployeeName = splitResult[1],
                            WorkedDay = string.IsNullOrEmpty(splitResult[2]) ? default : DateTime.TryParse(splitResult[2], CultureInfo.CreateSpecificCulture("es-MX"), DateTimeStyles.None, out datatime) ? datatime : throw new Exception($"Fecha de dia trabajado - Formato de fecha incorrecto, debe ingresar (dd/MM/yyyy) - Línea {cont}"),
                            StartHour = TimeSpan.TryParse(splitResult[3], out timeSpan) ? timeSpan : throw new Exception($"Hora de entreda tiene un formato de hora incorrecto, debe ingresar el siguiente formato (hh:mm:ss) - Línea {cont}"),
                            EndHour = TimeSpan.TryParse(splitResult[4], out timeSpan) ? timeSpan : throw new Exception($"Hora de salida tiene un formato de hora incorrecto, debe ingresar el siguiente formato (hh:mm:ss) - Línea {cont}"),
                            Quantity = int.Parse(splitResult[5]),
                            EarningCodeId = splitResult[6],
                            EarningCodeName = splitResult[7],
                            PayrollId = splitResult[8]
                        };
                        employees.Add(employee);
                    }
                    else
                        endLine = true;
                }
            }

            string urlData = $"{urlsServices.urlBaseOne}{Endpoint}employeetax";

            var Api = await ServiceConnect.connectservice(Token, urlData, employees, HttpMethod.Post);

            if (Api.IsSuccessStatusCode)
            {
                DataApi = JsonConvert.DeserializeObject<Response<EmployeeextrahoursBatch>>(Api.Content.ReadAsStringAsync().Result);
                responseUI.Message = DataApi.Message;
                responseUI.Type = ErrorMsg.TypeOk;
            }
            else
            {
                return CatchError(Api);
            }

            return responseUI;
        }
        
        //save Employee Taxt batch
        public async Task<ResponseUI> PostDataAsyncEmployeeTax(IFormFile file)
        {
            Response<EmployeeTaxBatch> DataApi = null;
            ResponseUI responseUI = new ResponseUI();
            List<EmployeeTaxBatch> employees = new List<EmployeeTaxBatch>();
            using (MemoryStream ms = new MemoryStream())
            {
                var fs = file.OpenReadStream();
                fs.CopyTo(ms);
                ms.Position = 0;
                bool endLine = false;
                DateTime datatime;
                int cont = 0;
                StreamReader sr = new StreamReader(ms);
                string result = sr.ReadLine();
                string[] header = result.Split(OptionSeparator);
                var a = ValidateLengthFile(header.Length, BatchEntity.EmployeeTax);
                if (a != null) return a;
                while (!endLine)
                {
                    cont++;
                    result = sr.ReadLine();
                    if (!string.IsNullOrEmpty(result))
                    {

                        string[] splitResult = result.Split(OptionSeparator);
                        EmployeeTaxBatch employee = new EmployeeTaxBatch()
                        {
                            EmployeeId = splitResult[0],
                            EmployeeName = splitResult[1],
                            TaxId = splitResult[2],
                            ValidFrom = string.IsNullOrEmpty(splitResult[3]) ? default : DateTime.TryParse(splitResult[3], CultureInfo.CreateSpecificCulture("es-MX"), DateTimeStyles.None, out datatime) ? datatime : throw new Exception($"Fecha valida desde - Formato de fecha incorrecto, debe ingresar (dd/MM/yyyy) - Línea {cont}"),
                            ValidTo = string.IsNullOrEmpty(splitResult[4]) ? default : DateTime.TryParse(splitResult[4], CultureInfo.CreateSpecificCulture("es-MX"), DateTimeStyles.None, out datatime) ? datatime : throw new Exception($"Fecha valida hasta - Formato de fecha incorrecto, debe ingresar (dd/MM/yyyy) - Línea {cont}"),
                            PayrollId = splitResult[5]
                        };
                        employees.Add(employee);
                    }
                    else
                        endLine = true;
                }
            }

            string urlData = $"{urlsServices.urlBaseOne}{Endpoint}employeetax";

            var Api = await ServiceConnect.connectservice(Token, urlData, employees, HttpMethod.Post);

            if (Api.IsSuccessStatusCode)
            {
                DataApi = JsonConvert.DeserializeObject<Response<EmployeeTaxBatch>>(Api.Content.ReadAsStringAsync().Result);
                responseUI.Message = DataApi.Message;
                responseUI.Type = ErrorMsg.TypeOk;
            }
            else
            {
                return CatchError(Api);
            }

            return responseUI;
        }

        //save Employee Earningcodes batch
        public async Task<ResponseUI> PostDataAsyncEmployeeearningcodes(IFormFile file)
        {
            Response<EmployeeearningcodesBatch> DataApi = null;
            ResponseUI responseUI = new ResponseUI();
            List<EmployeeearningcodesBatch> employees = new List<EmployeeearningcodesBatch>();
            using (MemoryStream ms = new MemoryStream())
            {
                var fs = file.OpenReadStream();
                fs.CopyTo(ms);
                ms.Position = 0;
                bool endLine = false;
                DateTime datatime;
                int cont = 0;
                StreamReader sr = new StreamReader(ms);
                string result = sr.ReadLine();
                string[] header = result.Split(OptionSeparator);
                var a = ValidateLengthFile(header.Length, BatchEntity.EmployeeEarningCode);
                if (a != null) return a;
                while (!endLine)
                {
                    cont++;
                    result = sr.ReadLine();
                    if (!string.IsNullOrEmpty(result))
                    {

                        string[] splitResult = result.Split(OptionSeparator);
                        EmployeeearningcodesBatch employee = new EmployeeearningcodesBatch()
                        {
                            EmployeeId = splitResult[0],
                            EmployeeName = splitResult[1],
                            EarningCodeId = splitResult[2],
                            IndexEarning = string.IsNullOrEmpty(splitResult[4]) ? 0 : decimal.Parse(splitResult[4]),
                            IndexEarningMonthly = string.IsNullOrEmpty(splitResult[5]) ? 0 : decimal.Parse(splitResult[5]),
                            FromDate = string.IsNullOrEmpty(splitResult[6]) ? default : DateTime.TryParse(splitResult[6], CultureInfo.CreateSpecificCulture("es-MX"), DateTimeStyles.None, out datatime) ? datatime : throw new Exception($"Fecha valida desde - Formato de fecha incorrecto, debe ingresar (dd/MM/yyyy) - Línea {cont}"),
                            ToDate = string.IsNullOrEmpty(splitResult[7]) ? default : DateTime.TryParse(splitResult[7], CultureInfo.CreateSpecificCulture("es-MX"), DateTimeStyles.None, out datatime) ? datatime : throw new Exception($"Fecha valida hasta - Formato de fecha incorrecto, debe ingresar (dd/MM/yyyy) - Línea {cont}"),
                            StartPeriodForPaid = string.IsNullOrEmpty(splitResult[8]) ? 0 : int.Parse(splitResult[8]),
                            QtyPeriodForPaid = string.IsNullOrEmpty(splitResult[9]) ? 0 : int.Parse(splitResult[9]),
                            PayrollId = splitResult[10],
                        };
                        employees.Add(employee);
                    }
                    else
                        endLine = true;
                }
            }

            string urlData = $"{urlsServices.urlBaseOne}{Endpoint}employeeearningcodes";

            var Api = await ServiceConnect.connectservice(Token, urlData, employees, HttpMethod.Post);

            if (Api.IsSuccessStatusCode)
            {
                DataApi = JsonConvert.DeserializeObject<Response<EmployeeearningcodesBatch>>(Api.Content.ReadAsStringAsync().Result);
                responseUI.Message = DataApi.Message;
                responseUI.Type = ErrorMsg.TypeOk;
            }
            else
            {
                return CatchError(Api);
            }

            return responseUI;
        }

        //save Employee Loans batch
        public async Task<ResponseUI> PostDataAsyncEmployeeloans(IFormFile file)
        {
            Response<EmployeeloansBatch> DataApi = null;
            ResponseUI responseUI = new ResponseUI();
            List<EmployeeloansBatch> employees = new List<EmployeeloansBatch>();
            using (MemoryStream ms = new MemoryStream())
            {
                var fs = file.OpenReadStream();
                fs.CopyTo(ms);
                ms.Position = 0;
                bool endLine = false;
                DateTime datatime;
                int cont = 0;
                StreamReader sr = new StreamReader(ms);
                string result = sr.ReadLine();
                string[] header = result.Split(OptionSeparator);
                var a = ValidateLengthFile(header.Length, BatchEntity.EmployeeLoans);
                if (a != null) return a;
                while (!endLine)
                {
                    cont++;
                    result = sr.ReadLine();
                    if (!string.IsNullOrEmpty(result))
                    {

                        string[] splitResult = result.Split(OptionSeparator);
                        EmployeeloansBatch employee = new EmployeeloansBatch()
                        {
                            EmployeeId = splitResult[0],
                            LoanId = splitResult[2],
                            LoanAmount = string.IsNullOrEmpty(splitResult[4]) ? 0 : decimal.Parse(splitResult[4]),
                            TotalDues = string.IsNullOrEmpty(splitResult[5]) ? 0 : int.Parse(splitResult[5]),
                            AmountByDues = string.IsNullOrEmpty(splitResult[6]) ? 0 : decimal.Parse(splitResult[6]),
                            PaidAmount = string.IsNullOrEmpty(splitResult[7]) ? 0 : decimal.Parse(splitResult[7]),
                            PendingAmount = string.IsNullOrEmpty(splitResult[8]) ? 0 : decimal.Parse(splitResult[8]),
                            ValidFrom = string.IsNullOrEmpty(splitResult[9]) ? default : DateTime.TryParse(splitResult[9], CultureInfo.CreateSpecificCulture("es-MX"), DateTimeStyles.None, out datatime) ? datatime : throw new Exception($"Fecha válida desde - Formato de fecha incorrecto, debe ingresar (dd/MM/yyyy) - Línea {cont}"),
                            ValidTo = string.IsNullOrEmpty(splitResult[10]) ? default : DateTime.TryParse(splitResult[10], CultureInfo.CreateSpecificCulture("es-MX"), DateTimeStyles.None, out datatime) ? datatime : throw new Exception($"Fecha válida hasta - Formato de fecha incorrecto, debe ingresar (dd/MM/yyyy) - Línea {cont}"),
                            StartPeriodForPaid = string.IsNullOrEmpty(splitResult[11]) ? 0 : int.Parse(splitResult[11]),
                            QtyPeriodForPaid = string.IsNullOrEmpty(splitResult[12]) ? 0 : int.Parse(splitResult[12]),
                            PayrollId = splitResult[13]
                        };
                        employees.Add(employee);
                    }
                    else
                        endLine = true;
                }
            }

            string urlData = $"{urlsServices.urlBaseOne}{Endpoint}employeeloans";

            var Api = await ServiceConnect.connectservice(Token, urlData, employees, HttpMethod.Post);

            if (Api.IsSuccessStatusCode)
            {
                DataApi = JsonConvert.DeserializeObject<Response<EmployeeloansBatch>>(Api.Content.ReadAsStringAsync().Result);
                responseUI.Message = DataApi.Message;
                responseUI.Type = ErrorMsg.TypeOk;
            }
            else
            {
                return CatchError(Api);
            }

            return responseUI;
        }

        //save Employee deductions batch
        public async Task<ResponseUI> PostDataAsyncEmployeedeductions(IFormFile file)
        {
            Response<EmployeedeductionsBatch> DataApi = null;
            ResponseUI responseUI = new ResponseUI();
            List<EmployeedeductionsBatch> employees = new List<EmployeedeductionsBatch>();
            using (MemoryStream ms = new MemoryStream())
            {
                var fs = file.OpenReadStream();
                fs.CopyTo(ms);
                ms.Position = 0;
                bool endLine = false;
                DateTime datatime;
                StreamReader sr = new StreamReader(ms);
                string result = sr.ReadLine();
                string[] header = result.Split(OptionSeparator);
                var a = ValidateLengthFile(header.Length, BatchEntity.EmployeeDeductionCode);
                if (a != null) return a;
                int cont = 0;
                while (!endLine)
                {
                    cont++;
                    result = sr.ReadLine();
                    if (!string.IsNullOrEmpty(result))
                    {

                        string[] splitResult = result.Split(OptionSeparator);
                        EmployeedeductionsBatch employee = new EmployeedeductionsBatch()
                        {
                            EmployeeId = splitResult[0],
                            DeductionCodeId = splitResult[2],
                            DeductionAmount = string.IsNullOrEmpty(splitResult[4]) ? 0 : decimal.Parse(splitResult[4]),
                            FromDate = string.IsNullOrEmpty(splitResult[5]) ? default : DateTime.TryParse(splitResult[5], CultureInfo.CreateSpecificCulture("es-MX"), DateTimeStyles.None, out datatime) ? datatime : throw new Exception($"Fecha valida desde - Formato de fecha incorrecto, debe ingresar (dd/MM/yyyy) - Línea {cont}"),
                            ToDate = string.IsNullOrEmpty(splitResult[6]) ? default : DateTime.TryParse(splitResult[6], CultureInfo.CreateSpecificCulture("es-MX"), DateTimeStyles.None, out datatime) ? datatime : throw new Exception($"Fecha valida hasta - Formato de fecha incorrecto, debe ingresar (dd/MM/yyyy) - Línea {cont}"),
                            StartPeriodForPaid = string.IsNullOrEmpty(splitResult[7]) ? 0 : int.Parse(splitResult[8]),
                            QtyPeriodForPaid = string.IsNullOrEmpty(splitResult[8]) ? 0 : int.Parse(splitResult[9]),
                            PayrollId = splitResult[9]

                        };
                        employees.Add(employee);
                    }
                    else
                        endLine = true;
                }
            }

            string urlData = $"{urlsServices.urlBaseOne}{Endpoint}employeedeductions";

            var Api = await ServiceConnect.connectservice(Token, urlData, employees, HttpMethod.Post);

            if (Api.IsSuccessStatusCode)
            {
                DataApi = JsonConvert.DeserializeObject<Response<EmployeedeductionsBatch>>(Api.Content.ReadAsStringAsync().Result);
                responseUI.Message = DataApi.Message;
                responseUI.Type = ErrorMsg.TypeOk;
            }
            else
            {
                return CatchError(Api);
            }

            return responseUI;
        }

        //save Employee Work calendars
        public async Task<ResponseUI> PostDataAsyncEmployeeWorkCalendars(IFormFile file)
        {
            Response<BatchEmployeeWorkCalendarRequest> DataApi = null;
            ResponseUI responseUI = new ResponseUI();
            List<BatchEmployeeWorkCalendarRequest> employees = new List<BatchEmployeeWorkCalendarRequest>();
            using (MemoryStream ms = new MemoryStream())
            {
                var fs = file.OpenReadStream();
                fs.CopyTo(ms);
                ms.Position = 0;
                bool endLine = false;
                DateTime datatime;
                TimeSpan timeSpan;
                StreamReader sr = new StreamReader(ms);
                string result = sr.ReadLine();
                string[] header = result.Split(OptionSeparator);
                var a = ValidateLengthFile(header.Length, BatchEntity.EmployeeWorkCalendars);
                if (a != null) return a;
                int cont = 0;
                while (!endLine)
                {
                    cont++;
                    result = sr.ReadLine();
                    if (!string.IsNullOrEmpty(result))
                    {

                        string[] splitResult = result.Split(OptionSeparator);
                        BatchEmployeeWorkCalendarRequest employee = new BatchEmployeeWorkCalendarRequest()
                        {
                            EmployeeId = splitResult[0],
                            EmployeeName = splitResult[1],
                            CalendarDate = string.IsNullOrEmpty(splitResult[2]) ? default : DateTime.TryParse(splitResult[2], CultureInfo.CreateSpecificCulture("es-MX"), DateTimeStyles.None, out datatime) ? datatime : throw new Exception($"Fecha inicio puesto - Formato de fecha incorrecto, debe ingresar (dd/MM/yyyy) - Línea {cont}"),
                            WorkFrom = TimeSpan.TryParse(splitResult[3], out timeSpan) ? timeSpan : throw new Exception($"Trabaja desde tiene un formato de hora incorrecto, debe ingresar el siguiente formato (hh:mm:ss) - Línea {cont}"),
                            WorkTo = TimeSpan.TryParse(splitResult[4], out timeSpan) ? timeSpan : throw new Exception($"Trabaja hasta tiene un formato de hora incorrecto, debe ingresar el siguiente formato (hh:mm:ss) - Línea {cont}"),
                            BreakWorkFrom = TimeSpan.TryParse(splitResult[5], out timeSpan) ? timeSpan : throw new Exception($"Descanso desde tiene un formato de hora incorrecto, debe ingresar el siguiente formato (hh:mm:ss) - Línea {cont}"),
                            BreakWorkTo = TimeSpan.TryParse(splitResult[6], out timeSpan) ? timeSpan : throw new Exception($"Descanso hasta tiene formato de hora incorrecto, debe ingresar el siguiente formato (hh:mm:ss) - Línea {cont}"),

                        };
                        employees.Add(employee);
                    }
                    else
                        endLine = true;
                }
            }

            string urlData = $"{urlsServices.urlBaseOne}{Endpoint}employeeworkcalendars";

            var Api = await ServiceConnect.connectservice(Token, urlData, employees, HttpMethod.Post);

            if (Api.IsSuccessStatusCode)
            {
                DataApi = JsonConvert.DeserializeObject<Response<BatchEmployeeWorkCalendarRequest>>(Api.Content.ReadAsStringAsync().Result);
                responseUI.Message = DataApi.Message;
                responseUI.Type = ErrorMsg.TypeOk;
            }
            else
            {
                return CatchError(Api);
            }

            return responseUI;
        }

        //save Employee Work control calendars
        public async Task<ResponseUI> PostDataAsyncEmployeeWorkControlCalendar(IFormFile file)
        {
            Response<BatchEmployeeWorkControlCalendarRequest> DataApi = null;
            ResponseUI responseUI = new ResponseUI();
            List<BatchEmployeeWorkControlCalendarRequest> employees = new List<BatchEmployeeWorkControlCalendarRequest>();
            using (MemoryStream ms = new MemoryStream())
            {
                var fs = file.OpenReadStream();
                fs.CopyTo(ms);
                ms.Position = 0;
                bool endLine = false;
                DateTime datatime;
                TimeSpan timeSpan;
                StreamReader sr = new StreamReader(ms);
                string result = sr.ReadLine();
                string[] header = result.Split(OptionSeparator);
                var a = ValidateLengthFile(header.Length, BatchEntity.EmployeeWorkCalendars);
                if (a != null) return a;
                int cont = 0;
                while (!endLine)
                {
                    cont++;
                    result = sr.ReadLine();
                    if (!string.IsNullOrEmpty(result))
                    {

                        string[] splitResult = result.Split(OptionSeparator);
                        BatchEmployeeWorkControlCalendarRequest employee = new BatchEmployeeWorkControlCalendarRequest()
                        {
                            EmployeeId = splitResult[0],
                            EmployeeName = splitResult[1],
                            CalendarDate = string.IsNullOrEmpty(splitResult[2]) ? default : DateTime.TryParse(splitResult[2], CultureInfo.CreateSpecificCulture("es-MX"), DateTimeStyles.None, out datatime) ? datatime : throw new Exception($"Fecha inicio puesto - Formato de fecha incorrecto, debe ingresar (dd/MM/yyyy) - Línea {cont}"),
                            WorkFrom = TimeSpan.TryParse(splitResult[3], out timeSpan) ? timeSpan : throw new Exception($"Trabaja desde tiene un formato de hora incorrecto, debe ingresar el siguiente formato (hh:mm:ss) - Línea {cont}"),
                            WorkTo = TimeSpan.TryParse(splitResult[4], out timeSpan) ? timeSpan : throw new Exception($"Trabaja hasta tiene un formato de hora incorrecto, debe ingresar el siguiente formato (hh:mm:ss) - Línea {cont}"),
                            BreakWorkFrom = TimeSpan.TryParse(splitResult[5], out timeSpan) ? timeSpan : throw new Exception($"Descanso desde tiene un formato de hora incorrecto, debe ingresar el siguiente formato (hh:mm:ss) - Línea {cont}"),
                            BreakWorkTo = TimeSpan.TryParse(splitResult[6], out timeSpan) ? timeSpan : throw new Exception($"Descanso hasta tiene formato de hora incorrecto, debe ingresar el siguiente formato (hh:mm:ss) - Línea {cont}"),

                        };
                        employees.Add(employee);
                    }
                    else
                        endLine = true;
                }
            }

            string urlData = $"{urlsServices.urlBaseOne}{Endpoint}employeeworkcontrolcalendars";

            var Api = await ServiceConnect.connectservice(Token, urlData, employees, HttpMethod.Post);

            if (Api.IsSuccessStatusCode)
            {
                DataApi = JsonConvert.DeserializeObject<Response<BatchEmployeeWorkControlCalendarRequest>>(Api.Content.ReadAsStringAsync().Result);
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
        public async Task<IEnumerable<BatchHistory>> GetAllDataAsync(string PropertyName = "", string PropertyValue = "", int _PageNumber = 1)
        {
            List<BatchHistory> courseType = new List<BatchHistory>();

            string urlData = $"{urlsServices.GetUrl("BatchHistory")}?PageNumber={_PageNumber}&PageSize=20&PropertyName={PropertyName}&PropertyValue={PropertyValue}";

            var Api = await ServiceConnect.connectservice(Token, urlData, null, HttpMethod.Get);

            if (Api.IsSuccessStatusCode)
            {
                var response = JsonConvert.DeserializeObject<Response<List<BatchHistory>>>(Api.Content.ReadAsStringAsync().Result);
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

        //eliminar
        public async Task<ResponseUI> DeleteDataAsync(List<string> Obj)
        {
            ResponseUI responseUI = new ResponseUI();

            //string urlData = $"{urlsServices.GetUrl("Employeepositions")}";
            string urlData = $"{urlsServices.urlBaseOne}importbatch";

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


        private ResponseUI ValidateLengthFile(int _Length, BatchEntity _BatchEntity)
        {
            ResponseUI responseUI = new ResponseUI();
            int[] Columns = new int[11] { 28, 9, 5, 6, 9, 12, 15, 7, 6, 9,7};
            //var data = Columns[(int)_BatchEntity];

            if (Columns[(int)_BatchEntity] != _Length)
            {
                responseUI.Type = ErrorMsg.TypeError;
                responseUI.Errors = new List<string>() { "Existe un error en el número de columnas en el archivo, verifique la plantilla" };
                return responseUI;
            }

            return null;


        }
    }
}
