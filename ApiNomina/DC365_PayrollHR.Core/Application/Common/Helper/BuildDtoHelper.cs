/// <summary>
/// Helper para BuildDto.
/// Provee funciones auxiliares para operaciones comunes.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DC365_PayrollHR.Core.Application.Common.Helper
{
    public static class BuildDtoHelper<T> where T: class
    { 
        /// <summary>
        /// Ejecuta la operacion OnBuild.
        /// </summary>
        /// <param name="_FromClass">Parametro _FromClass.</param>
        /// <param name="_ToClass">Parametro _ToClass.</param>
        /// <returns>Resultado de la operacion.</returns>
        public static T OnBuild(object _FromClass , T _ToClass)
        {
            var propertiesFrom = _FromClass.GetType().GetProperties();
            var propertiesTo = _ToClass.GetType().GetProperties();

            foreach (var propertyInfo in propertiesFrom)
            {
                var propertyInfoTo = propertiesTo.Where(x => x.Name == propertyInfo.Name).FirstOrDefault();

                if(propertyInfoTo != null)
                {
                    propertyInfoTo.SetValue(_ToClass, propertyInfo.GetValue(_FromClass));
                }

            }

            return _ToClass;
        }
    }
}
