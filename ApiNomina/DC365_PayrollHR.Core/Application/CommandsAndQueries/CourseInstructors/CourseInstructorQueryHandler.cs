/// <summary>
/// Manejador de consultas para obtenciÃ³n de datos de CourseInstructor.
/// Facilita la recuperaciÃ³n de informaciÃ³n mediante consultas optimizadas.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_PayrollHR.Core.Application.Common.Filter;
using DC365_PayrollHR.Core.Application.Common.Helper;
using DC365_PayrollHR.Core.Application.Common.Interface;
using DC365_PayrollHR.Core.Application.Common.Model;
using DC365_PayrollHR.Core.Application.Common.Model.CourseInstructors;
using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DC365_PayrollHR.Core.Application.CommandsAndQueries.CourseInstructors
{
    /// <summary>
    /// Manejador para operaciones de CourseInstructorQuery.
    /// </summary>
    public class CourseInstructorQueryHandler : IQueryHandler<CourseInstructorResponse>
    {
        private readonly IApplicationDbContext _dbContext;

        public CourseInstructorQueryHandler(IApplicationDbContext applicationDbContext)
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


        public async Task<PagedResponse<IEnumerable<CourseInstructorResponse>>> GetAll(PaginationFilter filter, SearchFilter searchFilter, object queryfilter = null)
        {
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            var tempResponse = _dbContext.CourseInstructors
                                    .OrderBy(x => x.InstructorId)
                                    .Where(x => x.CourseId == (string)queryfilter)
                                    .AsQueryable();

            SearchFilter<CourseInstructor> validSearch = new SearchFilter<CourseInstructor>(searchFilter.PropertyName, searchFilter.PropertyValue);
            if (validSearch.IsValid())
            {
                var lambda = GenericSearchHelper<CourseInstructor>.GetLambdaExpession(validSearch);

                tempResponse = tempResponse.Where(lambda)
                                           .AsQueryable();
            }

            var response = await tempResponse
                                .Join(_dbContext.Instructors,
                                    courseinstructor => courseinstructor.InstructorId,
                                    instructor => instructor.InstructorId,
                                    (courseinstructor, instructor) => new { CourseInstructor = courseinstructor, Instructor = instructor })
                                .Join(_dbContext.Courses,
                                    join => join.CourseInstructor.CourseId,
                                    course => course.CourseId,
                                    (join, course) => new { Join = join, Course = course })
                                .Select(x => SetObjectResponse(x.Join.CourseInstructor, x.Join.Instructor, x.Course))
                                .Skip((validFilter.PageNumber - 1) * validFilter.PageSize)
                                .Take(validFilter.PageSize)
                                .ToListAsync();

            return new PagedResponse<IEnumerable<CourseInstructorResponse>>(response, validFilter.PageNumber, validFilter.PageSize);
        }


        private static CourseInstructorResponse SetObjectResponse(CourseInstructor courseInstructor, Instructor instructor, Course course)
        {
            var a = BuildDtoHelper<CourseInstructorResponse>.OnBuild(courseInstructor, new CourseInstructorResponse());
            a.InstructorName = instructor.Name;
            a.CourseName = course.CourseName;
            return a;
        }

        //condition 0 = courseid, 1 = instructor
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="condition">Parametro condition.</param>
        /// <returns>Resultado de la operacion.</returns>
        public async Task<Response<CourseInstructorResponse>> GetId(object condition)
        {
            string[] a = (string[])condition;

            var response = await _dbContext.CourseInstructors
                .Where(x => x.CourseId == a[0] && x.InstructorId == a[1])
                .Join(_dbContext.Instructors,
                        courseinstructor => courseinstructor.InstructorId,
                        instructor => instructor.InstructorId,
                        (courseinstructor, instructor) => new { CourseInstructor = courseinstructor, Instructor = instructor })
                .Join(_dbContext.Courses,
                        join => join.CourseInstructor.CourseId,
                        course => course.CourseId,
                        (join, course) => new { Join = join, Course = course })
                .Select(x => SetObjectResponse(x.Join.CourseInstructor, x.Join.Instructor, x.Course))
                .FirstOrDefaultAsync();

            return new Response<CourseInstructorResponse>(response);
        }
    }
}
