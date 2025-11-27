/// <summary>
/// Helper para GenericSearch.
/// Provee funciones auxiliares para operaciones comunes.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Application.Common.Filter;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq.Expressions;

namespace DC365_PayrollHR.Core.Application.Common.Helper
{
    /// <summary>
    /// Clase auxiliar para GenericSearch.
    /// </summary>
    public static class GenericSearchHelper<T>
    {        
        /// <summary>
        /// Obtiene.
        /// </summary>
        /// <param name="searchFilter">Parametro searchFilter.</param>
        /// <returns>Resultado de la operacion.</returns>
        public static Expression<Func<T, bool>> GetLambdaExpession(SearchFilter<T> searchFilter)
        {
            Dictionary<Type, string> dictionaryMethods = new Dictionary<Type, string>();

            dictionaryMethods.Add(typeof(string), "Contains");
            dictionaryMethods.Add(typeof(decimal), "Equals");
            dictionaryMethods.Add(typeof(DateTime), "Equals");

            ParameterExpression parameterExpression = Expression.Parameter(typeof(T), "x");
            Expression propertyName = Expression.Property(parameterExpression, searchFilter.PropertyName);
            Expression propertyValue = Expression.Constant(searchFilter.ObjectPropertyValue, searchFilter.PropertyType);
            Expression containsMethod = Expression.Call(propertyName, dictionaryMethods[searchFilter.PropertyType], null, propertyValue);
            Expression<Func<T, bool>> functionLambda = Expression.Lambda<Func<T, bool>>(containsMethod, parameterExpression);
            
            return functionLambda; 
        }
    }
}
