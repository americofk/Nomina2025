/// <summary>
/// Configuración de Entity Framework para CalendarHoliday.
/// Define el mapeo de la entidad a la base de datos.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Infrastructure.Persistence.Configuration
{
    /// <summary>
    /// Configuracion de entidad CalendarHoliday.
    /// </summary>
    public class CalendarHolidayConfiguration : IEntityTypeConfiguration<CalendarHoliday>
    {
        /// <summary>
        /// Configura.
        /// </summary>
        /// <param name="builder">Parametro builder.</param>
        public void Configure(EntityTypeBuilder<CalendarHoliday> builder)
        {
            builder.HasKey(x => x.CalendarDate);

            builder.Property(x => x.Description).IsRequired().HasMaxLength(100);
        }
    }
}
