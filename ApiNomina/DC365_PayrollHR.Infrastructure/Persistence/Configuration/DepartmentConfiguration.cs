/// <summary>
/// Configuración de Entity Framework para Department.
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
    /// Configuracion de entidad Department.
    /// </summary>
    public class DepartmentConfiguration : IEntityTypeConfiguration<Department>
    {
        /// <summary>
        /// Configura.
        /// </summary>
        /// <param name="builder">Parametro builder.</param>
        public void Configure(EntityTypeBuilder<Department> builder)
        {
            builder.HasKey(x => x.DepartmentId);

            builder.Property(x => x.Name).IsRequired().HasMaxLength(60);
            builder.Property(x => x.QtyWorkers).IsRequired();
            //builder.Property(x => x.ResponsibleId).IsRequired();
            builder.Property(x => x.StartDate).IsRequired();
            builder.Property(x => x.EndDate).IsRequired();
            builder.Property(x => x.Description).HasMaxLength(100);
            builder.Property(x => x.DepartamentStatus).IsRequired();

            builder.Property(x => x.DepartmentId).HasDefaultValueSql("FORMAT((NEXT VALUE FOR dbo.DepartmentId),'DPT-00000000#')")
                    .HasMaxLength(20);
            
        }
    }
}
