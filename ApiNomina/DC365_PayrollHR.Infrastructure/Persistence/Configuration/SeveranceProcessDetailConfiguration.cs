/// <summary>
/// Configuración de Entity Framework para SeveranceProcessDetail.
/// Define el mapeo de la entidad a la base de datos.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Infrastructure.Persistence.Configuration
{
    /// <summary>
    /// Configuración de entidad SeveranceProcessDetail.
    /// </summary>
    public class SeveranceProcessDetailConfiguration : IEntityTypeConfiguration<SeveranceProcessDetail>
    {
        /// <summary>
        /// Configura el mapeo de la entidad SeveranceProcessDetail.
        /// </summary>
        /// <param name="builder">Parametro builder.</param>
        public void Configure(EntityTypeBuilder<SeveranceProcessDetail> builder)
        {
            builder.HasKey(x => new { x.SeveranceProcessId, x.EmployeeId });

            builder.Property(x => x.SeveranceProcessId)
                .HasMaxLength(20)
                .IsRequired();

            builder.Property(x => x.EmployeeId)
                .HasMaxLength(20)
                .IsRequired();

            builder.Property(x => x.SeveranceRefRecId)
                .IsRequired();

            // RecId se genera automáticamente por la secuencia en SQL
            builder.Property(x => x.RecId)
                .ValueGeneratedOnAdd();

            builder.Property(x => x.EmployeeName)
                .HasMaxLength(150);

            builder.Property(x => x.Document)
                .HasMaxLength(50);

            builder.Property(x => x.TiempoLaborando)
                .HasMaxLength(100);

            builder.Property(x => x.Comments)
                .HasMaxLength(500);

            // Salarios mensuales
            builder.Property(x => x.SalarioMes1).HasColumnType("decimal(18,2)").HasDefaultValue(0);
            builder.Property(x => x.SalarioMes2).HasColumnType("decimal(18,2)").HasDefaultValue(0);
            builder.Property(x => x.SalarioMes3).HasColumnType("decimal(18,2)").HasDefaultValue(0);
            builder.Property(x => x.SalarioMes4).HasColumnType("decimal(18,2)").HasDefaultValue(0);
            builder.Property(x => x.SalarioMes5).HasColumnType("decimal(18,2)").HasDefaultValue(0);
            builder.Property(x => x.SalarioMes6).HasColumnType("decimal(18,2)").HasDefaultValue(0);
            builder.Property(x => x.SalarioMes7).HasColumnType("decimal(18,2)").HasDefaultValue(0);
            builder.Property(x => x.SalarioMes8).HasColumnType("decimal(18,2)").HasDefaultValue(0);
            builder.Property(x => x.SalarioMes9).HasColumnType("decimal(18,2)").HasDefaultValue(0);
            builder.Property(x => x.SalarioMes10).HasColumnType("decimal(18,2)").HasDefaultValue(0);
            builder.Property(x => x.SalarioMes11).HasColumnType("decimal(18,2)").HasDefaultValue(0);
            builder.Property(x => x.SalarioMes12).HasColumnType("decimal(18,2)").HasDefaultValue(0);

            // Comisiones mensuales
            builder.Property(x => x.ComisionMes1).HasColumnType("decimal(18,2)").HasDefaultValue(0);
            builder.Property(x => x.ComisionMes2).HasColumnType("decimal(18,2)").HasDefaultValue(0);
            builder.Property(x => x.ComisionMes3).HasColumnType("decimal(18,2)").HasDefaultValue(0);
            builder.Property(x => x.ComisionMes4).HasColumnType("decimal(18,2)").HasDefaultValue(0);
            builder.Property(x => x.ComisionMes5).HasColumnType("decimal(18,2)").HasDefaultValue(0);
            builder.Property(x => x.ComisionMes6).HasColumnType("decimal(18,2)").HasDefaultValue(0);
            builder.Property(x => x.ComisionMes7).HasColumnType("decimal(18,2)").HasDefaultValue(0);
            builder.Property(x => x.ComisionMes8).HasColumnType("decimal(18,2)").HasDefaultValue(0);
            builder.Property(x => x.ComisionMes9).HasColumnType("decimal(18,2)").HasDefaultValue(0);
            builder.Property(x => x.ComisionMes10).HasColumnType("decimal(18,2)").HasDefaultValue(0);
            builder.Property(x => x.ComisionMes11).HasColumnType("decimal(18,2)").HasDefaultValue(0);
            builder.Property(x => x.ComisionMes12).HasColumnType("decimal(18,2)").HasDefaultValue(0);

            // Campos de salario totales
            builder.Property(x => x.SumaSalarios)
                .HasColumnType("decimal(18,2)")
                .HasDefaultValue(0);

            builder.Property(x => x.SalarioPromedioMensual)
                .HasColumnType("decimal(18,2)")
                .HasDefaultValue(0);

            builder.Property(x => x.SalarioPromedioDiario)
                .HasColumnType("decimal(18,2)")
                .HasDefaultValue(0);

            // Preaviso
            builder.Property(x => x.WasNotified)
                .HasDefaultValue(false);

            builder.Property(x => x.DiasPreaviso)
                .HasDefaultValue(0);

            builder.Property(x => x.MontoPreaviso)
                .HasColumnType("decimal(18,2)")
                .HasDefaultValue(0);

            // Cesantía
            builder.Property(x => x.IncludeCesantia)
                .HasDefaultValue(true);

            builder.Property(x => x.DiasCesantia)
                .HasDefaultValue(0);

            builder.Property(x => x.MontoCesantia)
                .HasColumnType("decimal(18,2)")
                .HasDefaultValue(0);

            // Vacaciones
            builder.Property(x => x.TookVacations)
                .HasDefaultValue(false);

            builder.Property(x => x.DiasVacaciones)
                .HasColumnType("decimal(18,2)")
                .HasDefaultValue(0);

            builder.Property(x => x.MontoVacaciones)
                .HasColumnType("decimal(18,2)")
                .HasDefaultValue(0);

            // Navidad
            builder.Property(x => x.IncludeNavidad)
                .HasDefaultValue(true);

            builder.Property(x => x.MesesTrabajadosAnio)
                .HasDefaultValue(0);

            builder.Property(x => x.MontoNavidad)
                .HasColumnType("decimal(18,2)")
                .HasDefaultValue(0);

            // Total
            builder.Property(x => x.TotalARecibir)
                .HasColumnType("decimal(18,2)")
                .HasDefaultValue(0);

            // Foreign Keys
            builder.HasOne<SeveranceProcess>()
                .WithMany()
                .HasForeignKey(x => x.SeveranceProcessId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne<Employee>()
                .WithMany()
                .HasForeignKey(x => x.EmployeeId)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
