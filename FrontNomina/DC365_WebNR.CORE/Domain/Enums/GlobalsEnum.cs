using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DC365_WebNR.CORE.Domain.Models.Enums
{
    /// <summary>
    /// Clase para gestion de GlobalsEnum.
    /// </summary>
    public class GlobalsEnum
    {
        /// <summary>
        /// Enumeracion de valores para PayFrecuency.
        /// </summary>
        public enum PayFrecuency
        {
            Diario = 0,
            Semanal = 1,
            Bisemanal = 2,
            Quincenal = 3,
            Mensual = 4,
            Trimestral = 5,
            Cuatrimestral = 6,
            Semestral = 7,
            Anual = 8
        }
    }
    /// <summary>
    /// Enumeracion de valores para EmployeeAction.
    /// </summary>
    public enum EmployeeAction
    {
        Ninguno = 0,
        Desahucio = 1,
        Renuncia = 2,
        TerminoContratoTemporal = 3,
        Muerte = 4,
        Transferencia = 5,
        TerminoContratoPeriodoProbatorio = 6,
        Promocion = 7,
        TransferenciaDepartamento = 8,
        TransferenciaEmpresas = 9,
        ContratoTemporero = 10,
        TerminoContrato = 11,
        Despido = 12,
        Enfermedad = 13
    }


    /// <summary>


    /// Enumeracion de valores para StatusPeriod.


    /// </summary>


    public enum StatusPeriod
    {
        [Display(Name = "Abierto")]
        Abierto = 0,
        [Display(Name = "Procesado")]
        Procesado = 1,
        [Display(Name = "Pagado")]
        Pagado = 2,
        [Display(Name = "Registrado")]
        Registrado = 3
    }

    /// <summary>

    /// Enumeracion de valores para AdminType.

    /// </summary>

    public enum AdminType
    {
        AdministradorLocal = 0,
        AdministradorGlobal = 1,
        Usuario = 2
    }

    /// <summary>

    /// Enumeracion de valores para CourseStatus.

    /// </summary>

    public enum CourseStatus
    {
        Creado = 0,
        EnProceso = 1,
        Cerrado = 2
    }

    /// <summary>

    /// Enumeracion de valores para InternalExternal.

    /// </summary>

    public enum InternalExternal
    {
        [Display(Name = "Interno")]
        Interno = 0,
        [Display(Name = "Externo")]
        Externo = 1,
    }

    /// <summary>

    /// Enumeracion de valores para Gender.

    /// </summary>

    public enum Gender
    {
        [Display(Name = "Masculino")]
        Masculino = 0,
        [Display(Name = "Femenino")]
        Femenino = 1,
        [Display(Name = "No especificado")]
        NoEspecificado = 2
    }

    /// <summary>

    /// Enumeracion de valores para MaritalStatus.

    /// </summary>

    public enum MaritalStatus
    {
        [Display(Name = "Casado/a")]
        Casado = 0,
        [Display(Name = "Soltero/a")]
        Soltero = 1,
        [Display(Name = "Viudo/a")]
        Viudo = 2,
        [Display(Name = "Divorciado/a")]
        Divorciado = 3,
        [Display(Name = "Separado/a")]
        Separado = 4
    }

    /// <summary>

    /// Enumeracion de valores para EmployeeType.

    /// </summary>

    public enum EmployeeType
    {
        [Display(Name = "Empleado")]
        Empleado = 0,
        [Display(Name = "Contratista")]
        Contratista = 1,
        //[Display(Name = "Pendiente por suspender")]
        //PendienteSuspension = 2
    }

    /// <summary>

    /// Enumeracion de valores para ContactType.

    /// </summary>

    public enum ContactType
    {
        [Display(Name = "Celular")]
        Celular = 0,

        [Display(Name = "Correo")]
        Correo = 1,

        [Display(Name = "Teléfono")]
        Telefono = 2,

        [Display(Name = "Otro")]
        Otro = 3
    }

    /// <summary>

    /// Clase base para IndexBase.

    /// </summary>

    public enum IndexBase
    {
        [Display(Name = "Hora")]
        Hora = 0,
        [Display(Name = "Período de pago")]
        PeriodoPago = 1,
        [Display(Name = "Mensual")]
        Mensual = 2,
        [Display(Name = "Anual")]
        Anual = 3,
        [Display(Name = "Monto fijo")]
        MontoFijo = 4,
        [Display(Name = "Retroactivo")]
        Retroactivo = 5,
        [Display(Name = "Indice salarial estándar")]
        IndiceSalarial = 6,
        [Display(Name = "Porcentaje de ganancia")]
        PorcentajeIngreso = 7,
        [Display(Name = "Horas de trabajo")]
        HorasTrabajo = 8
    }

    /// <summary>

    /// Enumeracion de valores para WorkStatus.

    /// </summary>

    public enum WorkStatus
    {
        [Display(Name = "Candidato")]
        Candidato = 0,
        [Display(Name = "Desvinculado")]
        Desvinculado = 1,
        [Display(Name = "Empleado")]
        Empleado = 2,
        [Display(Name = "Deshabilitado")]
        Deshabilitado = 3
    }

    /// <summary>

    /// Enumeracion de valores para IndexBaseTwo.

    /// </summary>

    public enum IndexBaseTwo
    {
        [Display(Name = "Hora")]
        Hora = 0,
        [Display(Name = "Monto fijo")]
        MontoFijo = 4

    }

    /// <summary>

    /// Enumeracion de valores para PayrollAction.

    /// </summary>

    public enum PayrollAction
    {
        [Display(Name = "Deducción")]
        Deduccion = 0,
        [Display(Name = "Aporte")]
        Aporte = 1,
        [Display(Name = "Ambos")]
        Ambos = 2
    }

    /// <summary>

    /// Enumeracion de valores para PayFrecuency.

    /// </summary>

    public enum PayFrecuency
    {
        [Display(Name = "Seleccione...")]
        NoSeleccionado = -1,
        [Display(Name = "Diario")]
        Diario = 0,
        [Display(Name = "Semanal")]
        Semanal = 1,
        [Display(Name = "Bisemanal")]
        Bisemanal = 2,
        [Display(Name = "Quincenal")]
        Quincenal = 3,
        [Display(Name = "Mensual")]
        Mensual = 4,
        [Display(Name = "Trimestral")]
        Trimestral = 5,
        [Display(Name = "Cuatrimestral")]
        Cuatrimestral = 6,
        [Display(Name = "Semestral")]
        Semestral = 7,
        [Display(Name = "Anual")]
        Anual = 8
    }

    /// <summary>

    /// Enumeracion de valores para AccountType.

    /// </summary>

    public enum AccountType
    {
        [Display(Name = "Ahorro")]
        Ahorro = 0,
        [Display(Name = "Corriente")]
        Corriente = 1
    }

    /// <summary>

    /// Enumeracion de valores para DocumentType.

    /// </summary>

    public enum DocumentType
    {
        [Display(Name = "Cédula")]
        Cedula = 0,
        [Display(Name = "Pasaporte")]
        Pasaporte = 1,
        [Display(Name = "NSS")]
        NSS = 2,
        [Display(Name = "Carnet Migratorio")]
        CarnetMigratorio = 3,
        [Display(Name = "Interior y Policía")]
        InteriorYPolicia = 4
    }

    /// <summary>

    /// Enumeracion de valores para PayrollProcessStatus.

    /// </summary>

    public enum PayrollProcessStatus
    {
        [Display(Name = "Creado")]
        Creado = 0,

        [Display(Name = "Procesado")]
        Procesado = 1,

        [Display(Name = "Calculado")]
        Calculado = 2,

        [Display(Name = "Pagado")]
        Pagado = 3,

        [Display(Name = "Cerrado")]
        Cerrado = 4,

        [Display(Name = "Cancelado")]
        Cancelado = 5
    }

    /// <summary>

    /// Enumeracion de valores para SelectListOptions.

    /// </summary>

    public enum SelectListOptions
    {
        FormatCode = 0,
        Currency = 1,
        Payroll = 2,
        Project = 3,
        ProjCategory = 4,
        Company = 5,
        PayCycles = 6,
        Department = 7,
        DeductionCode = 8,
        Loan = 9,
        Tax = 10,
        Job = 11,
        Position = 12,
        EarningCode = 13,
        EarningCodehours = 14,
        CourseType = 15,
        ClassRoomId = 16,
        CourseParentId = 17,
        InstructorId = 18,
        EmployeeId = 19,
        EarningCodeEarning = 20,
        EducationLevel = 21,
        DisabilityType = 22,
        Occupation = 23,
        Country = 24,
        PositionVacant = 25,
        Province = 26

    }

    /// <summary>

    /// Enumeracion de valores para StatusExtraHour.

    /// </summary>

    public enum StatusExtraHour
    {
        [Display(Name = "Abierto")]
        Abierto = 0,
        [Display(Name = "Pagado")]
        Pagado = 1
    }

    /// <summary>

    /// Enumeracion de valores para PayMethod.

    /// </summary>

    public enum PayMethod
    {
        [Display(Name = "Efectivo")]
        Efectivo = 0,
        [Display(Name = "Transferencia")]
        Transferencia = 1,
        [Display(Name = "Cheque")]
        Cheque = 2
    }
    /// <summary>
    /// Enumeracion de valores para TypeDTG.
    /// </summary>
    public enum TypeDTG
    {

        Dgt2 = 0,
        Dgt3 = 1,
        Dgt4 = 2,
        Dgt5 = 3,
        Dgt9 = 4,
        Dgt12 = 5,
        TSS = 6
    }

    /// <summary>

    /// Enumeracion de valores para PayrollActionType.

    /// </summary>

    public enum PayrollActionType
    {
        [Display(Name = "Ingreso")]
        Ingreso = 0,
        [Display(Name = "Deducción")]
        Deduccion = 1,
        [Display(Name = "Impuesto")]
        Impuesto = 2,
        [Display(Name = "Préstamo")]
        Prestamo = 3,
        [Display(Name = "Cooperativa")]
        Cooperativa = 4,
        [Display(Name = "Aporte")]
        Aporte = 5,
        [Display(Name = "Horas extras")]
        HorasExtras = 6
    }

    /// <summary>

    /// Enumeracion de valores para IndexBaseDeduction.

    /// </summary>

    public enum IndexBaseDeduction
    {
        [Display(Name = "Monto fijo")]
        MontoFijo = 4,
        [Display(Name = "Porcentaje de ganancia")]
        PorcentajeIngreso = 7
    }

    /// <summary>

    /// Enumeracion de valores para BatchEntity.

    /// </summary>

    public enum BatchEntity
    {
        [Display(Name = "Empleados")]
        Employee = 0,

        [Display(Name = "Dirección de empleados")]
        Employeeaddress = 1,

        [Display(Name = "Contacto de empleados")]
        EmployeeContactInfo = 2,

        [Display(Name = "Documentos de empleados")]
        EmployeeDocument = 3,

        [Display(Name = "Horas extras de empleados")]
        EmployeeExtraHours = 4,

        [Display(Name = "Ganancias de empleados")]
        EmployeeEarningCode = 5,

        [Display(Name = "Préstamos de empleados")]
        EmployeeLoans = 6,

        [Display(Name = "Bancos de empleados")]
        EmployeeBanks = 7,

        [Display(Name = "Impuestos de empleados")]
        EmployeeTax = 8,

        [Display(Name = "Deducciones de empleados")]
        EmployeeDeductionCode = 9,
        
        [Display(Name = "Horarios de empleados")]
        EmployeeWorkCalendars = 10,
        
        [Display(Name = "Control asistencia de empleados")]
        EmployeeWorkControlCalendar = 11,
    }

    /// <summary>

    /// Enumeracion de valores para StatusWorkControl.

    /// </summary>

    public enum StatusWorkControl
    {
        [Display(Name = "Pendiente")]
        Pendiente = 0,
        [Display(Name = "Pagado")]
        Pagado = 1,
        [Display(Name = "En Proceso")]
        EnProceso = 2
    }

    /// <summary>
    /// Enumeracion de valores para SeveranceProcessStatus (Estado de Proceso de Prestaciones).
    /// </summary>
    public enum SeveranceProcessStatus
    {
        [Display(Name = "Creado")]
        Created = 0,

        [Display(Name = "Calculado")]
        Calculated = 1,

        [Display(Name = "Aprobado")]
        Approved = 2,

        [Display(Name = "Pagado")]
        Paid = 3,

        [Display(Name = "Cancelado")]
        Canceled = 4
    }

    /// <summary>
    /// Enumeracion de valores para SeveranceCalculationType (Tipo de cálculo de prestaciones).
    /// </summary>
    public enum SeveranceCalculationType
    {
        [Display(Name = "Desahucio")]
        Desahucio = 0,

        [Display(Name = "Despido justificado")]
        DespidoJustificado = 1,

        [Display(Name = "Renuncia")]
        Renuncia = 2,

        [Display(Name = "Dimisión justificada")]
        DimisionJustificada = 3
    }

}
