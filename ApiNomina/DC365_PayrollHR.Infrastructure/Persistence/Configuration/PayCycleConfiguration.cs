using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Infrastructure.Persistence.Configuration
{
    public class PayCycleConfiguration : IEntityTypeConfiguration<PayCycle>
    {
        public void Configure(EntityTypeBuilder<PayCycle> builder)
        {
            builder.HasKey(x => new {x.PayCycleId, x.PayrollId});
            builder.Property(x => x.PayCycleId).ValueGeneratedNever();

            //Crea la relación uno a muchos
            builder.HasOne<Payroll>()
                .WithMany()
                .HasForeignKey(x => x.PayrollId)
                .IsRequired();
            
            
        }
    }
}
