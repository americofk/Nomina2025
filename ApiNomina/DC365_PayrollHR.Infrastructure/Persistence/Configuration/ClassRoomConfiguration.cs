using DC365_PayrollHR.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Infrastructure.Persistence.Configuration
{
    public class ClassRoomConfiguration : IEntityTypeConfiguration<ClassRoom>
    {
        public void Configure(EntityTypeBuilder<ClassRoom> builder)
        {
            builder.HasKey(x =>x.ClassRoomId);
            builder.Property(x => x.ClassRoomId).HasDefaultValueSql("FORMAT((NEXT VALUE FOR dbo.ClassRoomId),'CR-00000000#')")
                .HasMaxLength(20);

            builder.Property(x => x.Name).IsRequired().HasMaxLength(50);
            builder.Property(x => x.MaxStudentQty).IsRequired();
            builder.Property(x => x.Comment).HasMaxLength(100);
            builder.Property(x => x.AvailableTimeStart).IsRequired();
            builder.Property(x => x.AvailableTimeEnd).IsRequired();

            builder.HasOne<CourseLocation>()
                .WithMany()
                .HasForeignKey(x => x.CourseLocationId)
                .IsRequired();
        }
    }
}
