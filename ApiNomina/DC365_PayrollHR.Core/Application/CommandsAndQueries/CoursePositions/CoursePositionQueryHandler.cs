/// <summary>
/// Manejador de consultas para obtenciÃ³n de datos de CoursePosition.
/// Facilita la recuperaciÃ³n de informaciÃ³n mediante consultas optimizadas.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Helper;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Application.Common.Model.CoursePositons;
using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.CoursePositions
{
    /// <summary>
    /// Manejador para operaciones de CoursePositionQuery.
    /// </summary>
    public class CoursePositionQueryHandler : IQueryHandler<CoursePositionResponse>
    {
        private readonly IApplicationDbContext _dbContext;

        public CoursePositionQueryHandler(IApplicationDbContext applicationDbContext)
        {
            _dbContext = applicationDbContext;
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="filter">Parametro filter.</param>

        /// <param name="searchFilter">Parametro searchFilter.</param>

        /// <param name="queryfilter">Parametro queryfilter.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<PagedResponse<IEnumerable<CoursePositionResponse>>> GetAll(PaginationFilter filter, SearchFilter searchFilter, object queryfilter = null)
        {
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            var tempResponse = _dbContext.CoursePositions
                .OrderBy(x => x.PositionId)
                .Where(x => x.CourseId == (string)queryfilter)
                .AsQueryable();

            SearchFilter<CoursePosition> validSearch = new SearchFilter<CoursePosition>(searchFilter.PropertyName, searchFilter.PropertyValue);
            if (validSearch.IsValid())
            {
                var lambda = GenericSearchHelper<CoursePosition>.GetLambdaExpession(validSearch);

                tempResponse = tempResponse.Where(lambda)
                                           .AsQueryable();
            }

            var response = await tempResponse
                            .Join(_dbContext.Positions,
                                courseposition => courseposition.PositionId,
                                position => position.PositionId,
                                (courseposition, position) => new { CoursePosition = courseposition, Position = position })
                            .Join(_dbContext.Departments,
                                join => join.Position.DepartmentId,
                                department => department.DepartmentId,
                                (join, department) => new { Join = join, Department = department })
                            .Select(x => SetObjectResponse(x.Join.CoursePosition, x.Join.Position, x.Department))
                            .Skip((validFilter.PageNumber - 1) * validFilter.PageSize)
                            .Take(validFilter.PageSize)
                            .ToListAsync();

            return new PagedResponse<IEnumerable<CoursePositionResponse>>(response, validFilter.PageNumber, validFilter.PageSize);
        }

        private static CoursePositionResponse SetObjectResponse(CoursePosition coursePosition, Position position, Department department)
        {
            var a = BuildDtoHelper<CoursePositionResponse>.OnBuild(coursePosition, new CoursePositionResponse());
            a.PositionName = position.PositionName;
            a.DepartmentName = department.Name;
            return a;
        }

        //Condition 0 = courseid, 1 = Positionid
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="condition">Parametro condition.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<Response<CoursePositionResponse>> GetId(object condition)
        {
            string[] a = (string[])condition;

            var response = await _dbContext.CoursePositions
                .Where(x => x.CourseId == a[0] && x.PositionId == a[1])
                .Join(_dbContext.Positions,
                    courseposition => courseposition.PositionId,
                    position => position.PositionId,
                    (courseposition, position) => new { CoursePosition = courseposition, Position = position })
                .Join(_dbContext.Departments,
                    join => join.Position.DepartmentId,
                    department => department.DepartmentId,
                    (join, department) => new { Join = join, Department = department })
                .Select(x => SetObjectResponse(x.Join.CoursePosition, x.Join.Position, x.Department))
                .FirstOrDefaultAsync();

            return new Response<CoursePositionResponse>(response);
        }
    }

}
