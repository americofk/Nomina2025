using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Infrastructure.Persistence.Configuration
{
    public class CompaniesAssignedToUserConfiguration : IEntityTypeConfiguration<CompaniesAssignedToUser>
    {
        public void Configure(EntityTypeBuilder<CompaniesAssignedToUser> builder)
        {
            builder.HasKey(x => new { x.Alias, x.CompanyId });

            builder.HasOne<Company>().WithMany().HasForeignKey(x => x.CompanyId);

            builder.HasOne<User>().WithMany().HasForeignKey(x => x.Alias);
        }
    }
}
