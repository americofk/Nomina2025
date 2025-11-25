using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Infrastructure.Persistence.Configuration
{
    public class EmployeeDeductionCodeConfiguration : IEntityTypeConfiguration<EmployeeDeductionCode>
    {
        public void Configure(EntityTypeBuilder<EmployeeDeductionCode> builder)
        {
            builder.HasKey(x => new { x.DeductionCodeId, x.EmployeeId, x.PayrollId });

            builder.Property(x => x.FromDate).IsRequired();
            builder.Property(x => x.ToDate).IsRequired();
            //builder.Property(x => x.IndexDeduction).IsRequired();
            //builder.Property(x => x.PercentContribution).IsRequired();
            //builder.Property(x => x.PercentDeduction).IsRequired();

            builder.Property(x => x.Comment)
                .HasMaxLength(200);

            builder.HasOne<Employee>()
                .WithMany()
                .HasForeignKey(x => x.EmployeeId)
                .IsRequired();

            builder.HasOne<Payroll>()
                .WithMany()
                .HasForeignKey(x => x.PayrollId)
                .IsRequired();

            builder.HasOne<DeductionCode>()
                .WithMany()
                .HasForeignKey(x => x.DeductionCodeId)
                .IsRequired();
        }
    }
}
