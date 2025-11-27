/// <summary>
/// Configuración de Entity Framework para EmployeeDepartment.
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
    /// Configuracion de entidad EmployeeDepartment.
    /// </summary>
    public class EmployeeDepartmentConfiguration : IEntityTypeConfiguration<EmployeeDepartment>
    {
        /// <summary>
        /// Configura.
        /// </summary>
        /// <param name="builder">Parametro builder.</param>
        public void Configure(EntityTypeBuilder<EmployeeDepartment> builder)
        {
            builder.HasKey(x => new {x.EmployeeId, x.DepartmentId });

            builder.Property(x => x.FromDate).IsRequired();
            builder.Property(x => x.ToDate).IsRequired();

            builder.Property(x => x.Comment).HasMaxLength(200);
        }
    }
}
