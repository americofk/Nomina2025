/// <summary>
/// Configuración de Entity Framework para ViewSeveranceInfo.
/// Define el mapeo de la vista a la entidad.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DC365_PayrollHR.Infrastructure.Persistence.Configuration
{
    /// <summary>
    /// Configuración de entidad ViewSeveranceInfo.
    /// </summary>
    public class ViewSeveranceInfoConfiguration : IEntityTypeConfiguration<ViewSeveranceInfo>
    {
        /// <summary>
        /// Configura el mapeo de la entidad ViewSeveranceInfo.
        /// </summary>
        /// <param name="builder">Parametro builder.</param>
        public void Configure(EntityTypeBuilder<ViewSeveranceInfo> builder)
        {
            // Mapear a la vista
            builder.ToView("View_SeveranceInfo");

            // No tiene clave primaria definida
            builder.HasNoKey();

            // Mapear columnas
            builder.Property(x => x.EmployeeId).HasColumnName("EmployeeId");
            builder.Property(x => x.StartWorkDate).HasColumnName("StartWorkDate");
            builder.Property(x => x.CodigoDeGanancia).HasColumnName("Codigo de Ganacia");
            builder.Property(x => x.IsSeverance).HasColumnName("IsSeverance");
            builder.Property(x => x.ActionAmount).HasColumnName("ActionAmount");
            builder.Property(x => x.PaymentDate).HasColumnName("PaymentDate");
            builder.Property(x => x.PayrollProcessStatus).HasColumnName("PayrollProcessStatus");
            builder.Property(x => x.DocumentNumber).HasColumnName("DocumentNumber");
        }
    }
}
