using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Infrastructure.Persistence.Configuration
{
    public class MenuAssignedToUserConfiguration : IEntityTypeConfiguration<MenuAssignedToUser>
    {
        public void Configure(EntityTypeBuilder<MenuAssignedToUser> builder)
        {
            builder.HasKey(x => new { x.Alias, x.MenuId });

            builder.HasOne<User>()
                .WithMany()
                .HasForeignKey(x => x.Alias)
                .IsRequired();

            builder.HasOne<MenuApp>()
                .WithMany()
                .HasForeignKey(x => x.MenuId)
                .IsRequired();
        }
    }
}
