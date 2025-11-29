/// <summary>
/// Manejador de comandos para operaciones CRUD de EmployeeDocument.
/// Gestiona creaciÃ³n, actualizaciÃ³n y eliminaciÃ³n de registros.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_PayrollHR.Core.Application.Common.Helper;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Application.Common.Model.EmployeeDocuments;
using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.EmployeeDocuments
{
    public interface IEmployeeDocumentCommandHandler :
        ICreateCommandHandler<EmployeeDocumentRequest>,
        IUpdateCommandHandler<EmployeeDocumentRequest>
    {
        public Task<Response<bool>> DeleteByEmployee(List<string> ids, string employeeid);
        public Task<Response<object>> UploadDocument(EmplDocFileRequest request, string employeeid, int internalid);
        public Task<Response<object>> DownloadDocument(string employeeid, int internalid);
        public Task<Response<bool>> DeleteAttachment(string employeeid, int internalid);
    }

    /// <summary>

    /// Manejador para operaciones de EmployeeDocumentCommand.

    /// </summary>

    public class EmployeeDocumentCommandHandler : IEmployeeDocumentCommandHandler
    {
        private readonly IApplicationDbContext _dbContext;

        public EmployeeDocumentCommandHandler(IApplicationDbContext applicationDbContext)
        {
            _dbContext = applicationDbContext;
        }

        /// <summary>

        /// Crea un nuevo registro.

        /// </summary>

        /// <param name="model">Parametro model.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<Response<object>> Create(EmployeeDocumentRequest model)
        {
            EmployeeDocument principalEntity = null;

            var document = await _dbContext.EmployeeDocuments.Where(x => x.EmployeeId == model.EmployeeId)
                            .OrderByDescending(x => x.InternalId).FirstOrDefaultAsync();

            var entity = BuildDtoHelper<EmployeeDocument>.OnBuild(model, new EmployeeDocument());

            entity.InternalId = document == null ? 1 : document.InternalId + 1;

            if (model.IsPrincipal)
            {
                principalEntity = await _dbContext.EmployeeDocuments.Where(x => x.EmployeeId == model.EmployeeId
                                                                           && x.IsPrincipal == true
                                                                           && x.DocumentType == model.DocumentType).FirstOrDefaultAsync();
            }

            //Guardo el nuevo
            _dbContext.EmployeeDocuments.Add(entity);
            await _dbContext.SaveChangesAsync();

            //Actualizo la entidad que era principal
            if (principalEntity != null)
            {
                principalEntity.IsPrincipal = false;
                await _dbContext.SaveChangesAsync();
            }

            return new Response<object>(entity)
            {
                Message = "Registro creado correctamente"
            };
        }


        /// <summary>


        /// Elimina un registro.


        /// </summary>


        /// <param name="ids">Parametro ids.</param>


        /// <param name="employeeid">Parametro employeeid.</param>


        /// <returns>Resultado de la operacion.</returns>


        public async Task<Response<bool>> DeleteByEmployee(List<string> ids, string employeeid)
        {
            using var transaction = _dbContext.Database.BeginTransaction();

            try
            {
                foreach (var item in ids)
                {
                    var response = await _dbContext.EmployeeDocuments.Where(x => x.EmployeeId == employeeid
                                                                            && x.InternalId == int.Parse(item)).FirstOrDefaultAsync();

                    if (response == null)
                    {
                        throw new Exception($"El registro seleccionado no existe - id {item}");
                    }

                    _dbContext.EmployeeDocuments.Remove(response);
                    await _dbContext.SaveChangesAsync();
                }
                transaction.Commit();
                return new Response<bool>(true) { Message = "Registros elimandos con éxito" };
            }
            catch (Exception ex)
            {
                transaction.Rollback();

                return new Response<bool>(false)
                {
                    Succeeded = false,
                    Errors = new List<string>() { ex.Message }
                };
            }
        }


        /// <summary>


        /// Actualiza un registro existente.


        /// </summary>


        /// <param name="id">Parametro id.</param>


        /// <param name="model">Parametro model.</param>


        /// <returns>Resultado de la operacion.</returns>


        public async Task<Response<object>> Update(string id, EmployeeDocumentRequest model)
        {
            EmployeeDocument principalEntity = null;

            var response = await _dbContext.EmployeeDocuments.Where(x => x.InternalId == int.Parse(id) && x.EmployeeId == model.EmployeeId).FirstOrDefaultAsync();

            if (response == null)
            {
                return new Response<object>(false)
                {
                    Succeeded = false,
                    Errors = new List<string>() { "El registro seleccionado no existe" },
                    StatusHttp = 404
                };
            }

            if (model.IsPrincipal)
            {
                principalEntity = await _dbContext.EmployeeDocuments.Where(x => x.EmployeeId == model.EmployeeId
                                                                           && x.IsPrincipal == true
                                                                           && x.DocumentType == model.DocumentType).FirstOrDefaultAsync();
            }

            var entity = BuildDtoHelper<EmployeeDocument>.OnBuild(model, response);
            await _dbContext.SaveChangesAsync();

            //Actualizo la entidad que era principal
            if (principalEntity != null)
            {
                principalEntity.IsPrincipal = false;
                await _dbContext.SaveChangesAsync();
            }

            return new Response<object>(true) { Message = "Registro actualizado con éxito" };
        }

        /// <summary>

        /// Carga un archivo.

        /// </summary>

        /// <param name="request">Parametro request.</param>

        /// <param name="employeeid">Parametro employeeid.</param>

        /// <param name="internalid">Parametro internalid.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<Response<object>> UploadDocument(EmplDocFileRequest request, string employeeid, int internalid)
        {
            byte[] data;

            var entity = await _dbContext.EmployeeDocuments.Where(x => x.EmployeeId == employeeid && x.InternalId == internalid).FirstOrDefaultAsync();

            if (entity == null)
            {
                return new Response<object>(true)
                {
                    Errors = new List<string>() { "El registro seleccionado no existe" },
                };
            }
            else
            {
                using (MemoryStream ms = new MemoryStream())
                {
                    request.File.CopyTo(ms);
                    data = ms.ToArray();
                }

                entity.FileAttach = data;
                entity.FileName = request.File.FileName;

                await _dbContext.SaveChangesAsync();
            }

            return new Response<object>(true)
            {
                Message = "Archivo cargado correctamente"
            };
        }

        /// <summary>

        /// Descarga.

        /// </summary>

        /// <param name="employeeid">Parametro employeeid.</param>

        /// <param name="internalid">Parametro internalid.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<Response<object>> DownloadDocument(string employeeid, int internalid)
        {
            var document = await _dbContext.EmployeeDocuments.Where(x => x.EmployeeId == employeeid && x.InternalId == internalid).FirstOrDefaultAsync();

            string string64 = string.Empty;
            string fileName = $"{employeeid}_{internalid}.pdf";

            if (document != null)
            {
                string64 = Convert.ToBase64String(document.FileAttach, 0, document.FileAttach.Length);
                // Usar el nombre del archivo guardado si existe
                if (!string.IsNullOrEmpty(document.FileName))
                {
                    fileName = document.FileName;
                }
            }

            return new Response<object>(new { Content = string64, FileName = fileName });
        }

        /// <summary>
        /// Elimina el archivo adjunto de un documento.
        /// </summary>
        /// <param name="employeeid">ID del empleado.</param>
        /// <param name="internalid">ID interno del documento.</param>
        /// <returns>Resultado de la operación.</returns>
        public async Task<Response<bool>> DeleteAttachment(string employeeid, int internalid)
        {
            var entity = await _dbContext.EmployeeDocuments.Where(x => x.EmployeeId == employeeid && x.InternalId == internalid).FirstOrDefaultAsync();

            if (entity == null)
            {
                return new Response<bool>(false)
                {
                    Succeeded = false,
                    Errors = new List<string>() { "El registro seleccionado no existe" }
                };
            }

            if (entity.FileAttach == null || entity.FileAttach.Length == 0)
            {
                return new Response<bool>(false)
                {
                    Succeeded = false,
                    Errors = new List<string>() { "El registro no tiene archivo adjunto" }
                };
            }

            entity.FileAttach = null;
            entity.FileName = null;

            await _dbContext.SaveChangesAsync();

            return new Response<bool>(true) { Message = "Archivo adjunto eliminado correctamente" };
        }
    }

}
