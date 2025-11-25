using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Infrastructure.Persistence.Configuration
{
    public class TaxDetailConfiguration : IEntityTypeConfiguration<TaxDetail>
    {
        public void Configure(EntityTypeBuilder<TaxDetail> builder)
        {
            builder.HasKey(x => new { x.InternalId, x.TaxId, x.DataAreaId });
            builder.Property(x => x.InternalId).ValueGeneratedNever();

            builder.HasOne<Tax>()
                .WithMany()
                .HasForeignKey(x => new { x.TaxId, x.DataAreaId })
                .IsRequired();
        }
    }
}
