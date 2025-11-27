/// <summary>
/// Manejador de consultas para obtenciÃ³n de datos de Course.
/// Facilita la recuperaciÃ³n de informaciÃ³n mediante consultas optimizadas.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Helper;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Application.Common.Model.Course;
using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.Courses
{
    /// <summary>
    /// Manejador para operaciones de CourseQuery.
    /// </summary>
    public class CourseQueryHandler : IQueryHandler<CourseResponse>
    {
        private readonly IApplicationDbContext _dbContext;

        public CourseQueryHandler(IApplicationDbContext applicationDbContext)
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

        public async Task<PagedResponse<IEnumerable<CourseResponse>>> GetAll(PaginationFilter filter, SearchFilter searchFilter, object queryfilter = null)
        {
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            var tempResponse = _dbContext.Courses
                .OrderBy(x => x.CourseId)
                .AsQueryable();

            SearchFilter<Course> validSearch = new SearchFilter<Course>(searchFilter.PropertyName, searchFilter.PropertyValue);
            if (validSearch.IsValid())
            {
                var lambda = GenericSearchHelper<Course>.GetLambdaExpession(validSearch);

                tempResponse = tempResponse.Where(lambda)
                                           .AsQueryable();
            }

            var response = await tempResponse
                            .Join(_dbContext.CourseTypes,
                                course => course.CourseTypeId,
                                coursetype => coursetype.CourseTypeId,
                                (course, coursetype) => new { Course = course, CourseType = coursetype })
                            .Join(_dbContext.ClassRooms,
                                course => course.Course.ClassRoomId,
                                classroom => classroom.ClassRoomId,
                                (course, classroom) => new { Course = course, ClassRoom = classroom })
                            .Select(x => SetObjectResponse(x.Course.Course, x.ClassRoom, x.Course.CourseType))
                            .Skip((validFilter.PageNumber - 1) * validFilter.PageSize)
                            .Take(validFilter.PageSize)
                            .ToListAsync();

            return new PagedResponse<IEnumerable<CourseResponse>>(response, validFilter.PageNumber, validFilter.PageSize);
        }

        private static CourseResponse SetObjectResponse(Course course, ClassRoom classRoom, CourseType courseType)
        {
            var a = BuildDtoHelper<CourseResponse>.OnBuild(course, new CourseResponse());
            a.ClassRoomName = classRoom.Name;
            a.CourseTypeName = courseType.Name;
            return a;
        }

        /// <summary>

        /// Obtiene.

        /// </summary>

        /// <param name="condition">Parametro condition.</param>

        /// <returns>Resultado de la operacion.</returns>

        public async Task<Response<CourseResponse>> GetId(object condition)
        {
            var response = await _dbContext.Courses
                .Join(_dbContext.CourseTypes,
                    course => course.CourseTypeId,
                    coursetype => coursetype.CourseTypeId,
                    (course, coursetype) => new { Course = course, CourseType = coursetype })
                .Join(_dbContext.ClassRooms,
                    course => course.Course.ClassRoomId,
                    classroom => classroom.ClassRoomId,
                    (course, classroom) => new { Course = course, ClassRoom = classroom })
                .Where(x=> x.Course.Course.CourseId == (string)condition)
                .Select(x => SetObjectResponse(x.Course.Course, x.ClassRoom, x.Course.CourseType))
                .FirstOrDefaultAsync();

            return new Response<CourseResponse>(response);
        }
    }

}
