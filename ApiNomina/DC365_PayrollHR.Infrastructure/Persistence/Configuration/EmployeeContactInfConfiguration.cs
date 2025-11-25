using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Infrastructure.Persistence.Configuration
{
    public class EmployeeContactInfConfiguration : IEntityTypeConfiguration<EmployeeContactInf>
    {
        public void Configure(EntityTypeBuilder<EmployeeContactInf> builder)
        {
            builder.HasKey(x => new { x.EmployeeId, x.InternalId });
            builder.Property(x => x.InternalId).ValueGeneratedNever();

            builder.Property(x => x.NumberAddress).HasMaxLength(200).IsRequired();
            builder.Property(x => x.ContactType);
            builder.Property(x => x.IsPrincipal);

            builder.Property(x => x.Comment).HasMaxLength(200);

            builder.HasOne<Employee>()
                .WithMany()
                .HasForeignKey(x => x.EmployeeId)
                .IsRequired();
        }
    }
}
