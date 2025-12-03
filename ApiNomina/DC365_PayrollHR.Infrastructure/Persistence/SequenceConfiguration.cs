/// <summary>
/// Configuración de Entity Framework para Sequence.
/// Define el mapeo de la entidad a la base de datos.
/// </summary>
/// <author>Equipo de Desarrollo</author>
/// <date>2025</date>
﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace DC365_PayrollHR.Infrastructure.Persistence.Configuration
{
    /// <summary>
    /// Configuracion de entidad Sequence.
    /// </summary>
    public static class SequenceConfiguration
    {
        /// <summary>
        /// Configura.
        /// </summary>
        /// <param name="modelBuilder">Parametro modelBuilder.</param>
        public static void ConfigureSequences(ModelBuilder modelBuilder)
        {
            // Secuencia general para RecId (auditoría)
            modelBuilder.HasSequence<long>("RecId")
                .HasMax(999999999999)
                .HasMin(1)
                .StartsAt(20260000);

            modelBuilder.HasSequence<int>("PayrollId")
                .HasMax(999999999)
                .HasMin(1)
                .StartsAt(1);

            modelBuilder.HasSequence<int>("EarningCodeId")
                .HasMax(999999999)
                .HasMin(1)
                .StartsAt(1);

            modelBuilder.HasSequence<int>("DeductionCodeId")
                .HasMax(999999999)
                .HasMin(1)
                .StartsAt(1);

            modelBuilder.HasSequence<int>("DepartmentId")
                .HasMax(999999999)
                .HasMin(1)
                .StartsAt(1);

            modelBuilder.HasSequence<int>("JobId")
                .HasMax(999999999)
                .HasMin(1)
                .StartsAt(1);

            modelBuilder.HasSequence<int>("PositionId")
                .HasMax(999999999)
                .HasMin(1)
                .StartsAt(1);

            modelBuilder.HasSequence<int>("ClassRoomId")
                .HasMax(999999999)
                .HasMin(1)
                .StartsAt(1);

            modelBuilder.HasSequence<int>("CourseLocationId")
                .HasMax(999999999)
                .HasMin(1)
                .StartsAt(1);            
            
            modelBuilder.HasSequence<int>("CourseTypeId")
                .HasMax(999999999)
                .HasMin(1)
                .StartsAt(1);

            modelBuilder.HasSequence<int>("IntructorId")
                .HasMax(999999999)
                .HasMin(1)
                .StartsAt(1);
            
            modelBuilder.HasSequence<int>("CourseId")
                .HasMax(999999)
                .HasMin(1)
                .StartsAt(1);
            
            modelBuilder.HasSequence<int>("MenuId")
                .HasMax(9999)
                .HasMin(1)
                .StartsAt(1);

            modelBuilder.HasSequence<int>("EmployeeId")
                .HasMax(999999999)
                .HasMin(1)
                .StartsAt(1);

            modelBuilder.HasSequence<int>("ProjId")
                .HasMax(999999999)
                .HasMin(1)
                .StartsAt(1);
            
            modelBuilder.HasSequence<int>("ProjCategoryId")
                .HasMax(999999999)
                .HasMin(1)
                .StartsAt(1);
            
            modelBuilder.HasSequence<int>("LoanId")
                .HasMax(999999999)
                .HasMin(1)
                .StartsAt(1);
            
            modelBuilder.HasSequence<int>("PayrollProcessId")
                .HasMax(999999999)
                .HasMin(1)
                .StartsAt(1);
            
            modelBuilder.HasSequence<int>("ProcessDetailsId")
                .HasMax(999999999)
                .HasMin(1)
                .StartsAt(1);
            
            modelBuilder.HasSequence<int>("EmployeeHistoryId")
                .HasMax(999999999)
                .HasMin(1)
                .StartsAt(1);

            modelBuilder.HasSequence<int>("SeveranceProcessId")
                .HasMax(999999999)
                .HasMin(1)
                .StartsAt(1);

            modelBuilder.HasSequence<int>("SeveranceProcessDetailId")
                .HasMax(999999999)
                .HasMin(1)
                .StartsAt(1);
        }
    }
}
