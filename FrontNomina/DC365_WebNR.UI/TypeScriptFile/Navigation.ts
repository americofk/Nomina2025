//------ click en el usuario al final de la cabecera ---------
$('.div2usuario').on('click', function () {
    /* $('.datosusuario').toggleClass('Abrir');*/
    var sidebar = document.getElementsByClassName("sidebar-options");
    sidebar[0].classList.add("sidebar-options-open");
});

$(".close-options").click(function () {
    var sidebar = document.getElementsByClassName("sidebar-options");
    sidebar[0].classList.remove("sidebar-options-open");
});

//Para agrandar o encoger el menu lateral
$('.delado').on('click', function () {
    $('.sidebar').toggleClass('sidebar-collapse');
});

//cerrar modulos para ir atras
$(".Close-back").click(function () {
    window.history.go(-1);
});

//cerrar modulos para ir al dashboard
$(".CerrarModulo").click(function () {
    window.location.href = "/Dashboard/Principal";
});

//
$(".Titulo1").click(function () {
    window.location.href = "/Dashboard/Principal";
});


//Actualizar pagina
$(".OpcActualizar").click(function () {
    $.get(location.href)
        .done(function (r) {
            var newDom = $(r);
            $('#MainTable').replaceWith($('#MainTable', newDom));
        });

});


//mostrar lista de clientes asignados
$('.changeCompany').on('click', function () {
    $('.ModCompaniesAsing').modal("show");
});

////cambiar de compañia
//function SelecCompany(_Name, _companyId) {
//    $('.ModCustomers').modal('hide');
//    $('.progreso').modal({ backdrop: 'static', keyboard: false })

//    $.ajax({
//        url: "/Dashboard/ChangeCompany",
//        type: "POST",
//        data: {

//            _name: _Name,
//            _codeCompany: _companyId


//        },
//        async: true,
//        success: function (data) {
//            if (data == 1) {
//                window.location.href = "/Dashboard/Principal";

//            } else {
//                windows_message("Error en el cambio de empresa", "error");
//                window.location.href = "/Dashboard/Index";
//            }



//        }, error: function (xhr) {
//            redireccionaralLogin(xhr);
//        }
//    });
//}

//ir al maestro de departamentos activos 
$('.MDepartamentos').on('click', function () {
    window.location.href = "/departamentosactivos#Recursos%20humanos";
});

//ir al listado de carga masiva
$('.CargaMasiva').on('click', function () {
    window.location.href = "/historiallotes#Configuración";
});

//ir al maestro de impuestos
$('.TaxCode').on('click', function () {
    window.location.href = "/impuestos#Configuración";
});

//ir al maestro de departamentos inactivos
$('.MdepartamentInac').on('click', function () {
    window.location.href = "/departamentosinactivos#Recursos%20humanos";
});

//ir a lista de proyectos inactivos
$('.Project-disabled').on('click', function () {
    window.location.href = "/proyectosinactivos#Configuración";
});

// ir al maestro de nomina
$('.MNominas').on('click', function () {
    window.location.href = "/nomina#Configuración";
});

//ir al maestro de usuario
$('.MUser').on('click', function () {
    window.location.href = "/usuarios#Configuración";
});

//ir al maestro de tipos de cursos
$('.TypeCourse').on('click', function () {
    window.location.href = "/tipocursos#Cursos";
});



//ir al maestro de instructores
$('.InstructorsCourse').on('click', function () {
    window.location.href = "/instructor#Cursos";
});

//ir al maestro de ubicacion de cursos
$('.CourseLocation').on('click', function () {
    window.location.href = "/ubicacioncursos#Cursos";
});

//ir al maestro de ubicacion de cursos
$('.ClassRoom').on('click', function () {
    window.location.href = "/salonescurso#Cursos";
});

//ir al maestro de  cursos
$('.Course').on('click', function () {
    window.location.href = "/cursos#Cursos";
});

//ir al maestro de cargos activos  
$('.JobsEnable').on('click', function () {
    window.location.href = "/cargosactivos#Recursos%20humanos";
});

//ir al maestro de cargos inactivos
$('.JobsDisebled').on('click', function () {
    window.location.href = "/cargosinactivos#Recursos%20humanos";
});

//ir al maestro de puestos activos
$('.PositionEnabled').on('click', function () {
    window.location.href = "/puestosactivos#Recursos%20humanos";
});

//ir al maestro de puestos inactivos
$('.PositionDisebled').on('click', function () {
    window.location.href = "/puestosinactivos#Recursos%20humanos";
});

//ir al maestro de vacantes
$('.Vacants').on('click', function () {
    window.location.href = "/vacantes#Recursos%20humanos";
});

//ir al maestro de empleados
$('.Employee').on('click', function () {
    window.location.href = "/empleadosactivos?workStatus=2#Recursos%20humanos";
});

//ir al maestro de códigos de ganancias
$('.Earning-codes').on('click', function () {
    window.location.href = "/codigosganancias#Configuración";
});


//ir al maestro de códigos de deducciones
$('.DeductionCode').on('click', function () {
    window.location.href = "/codigosdeduccion#Configuración";
});

//ir al maestro de procesos de nómina
$('.ProcessPayroll').on('click', function () {
    window.location.href = "/procesonomina#Nóminas";
});

//ir al maestro de proyectos
$('.Projects').on('click', function () {
    window.location.href = "/proyectosactivos#Configuración";
});

//ir a categorias de proyectos inactivas
$('.Project-category-disabled').on('click', function () {
    window.location.href = "/categoriaproyectoinactivas#Configuración";
});

//ir al maestro de candidatos a empleados
$('.EmployeeCandidate').on('click', function () {
    window.location.href = "/empleadosactivos?workStatus=0#Recursos%20humanos";
});

//ir al maestro ex empleados
$('.DismissedEmployee').on('click', function () {
    window.location.href = "/empleadosactivos?workStatus=1#Recursos%20humanos";
});


//ir al maestro de categorias de proyectos
$('.PorjectCategory').on('click', function () {
    window.location.href = "/categoriaproyectoactivas#Configuración";
});

//ir al maestro de códigos de prestamos 
$('.LoansEnabled').on('click', function () {
    window.location.href = "/prestamos#Configuración";
});

//ir al maestro de dias feriados
$('.Mholidays').on('click', function () {
    window.location.href = "/calendarholiday#Configuración";
});

//ir al reporte de pagos de nómina
$('.Pagosdenomina').on('click', function () {
    window.open("/reportes/pagosdenomina",'_blank');
});

//ir al reporte resumen de nómina
$('.DayrollSummary').on('click', function () {
    window.open("/reportes/resumenpagosdenomina",'_blank');
});

//ir al reporte de tss
$('.report-tss').on('click', function () {
    window.open("/reportes/tss",'_blank');
});

//ir al reporte de nómina
$('.PayrollReport').on('click', function () {
    window.open("/reportes/reportenomina",'_blank');
});

//ir al reporte de DGT-4
$('.report-dgt4').on('click', function () {
    window.open("/reportes/dgt4", '_blank');
});

//ir al reporte de DGT-2
$('.report-dgt2').on('click', function () {
    window.open("/reportes/dgt2", '_blank');
});

//ir al reporte de DGT-3
$('.report-dgt3').on('click', function () {
    window.open("/reportes/dgt3", '_blank');
});

//ir al reporte de DGT-5
$('.report-dgt5').on('click', function () {
    window.open("/reportes/dgt5", '_blank');
});

//ir al reporte de DGT-9
$('.report-dgt9').on('click', function () {
    window.open("/reportes/dgt9", '_blank');
});

//ir al reporte de DGT-11
$('.report-dgt11').on('click', function () {
    window.open("/reportes/dgt11", '_blank');
});

//ir al reporte de DGT-12
$('.report-dgt12').on('click', function () {
    window.open("/reportes/dgt12", '_blank');
});

//ir al reporte de todos los empleados
$('.report-all-employee').on('click', function () {
    window.open("/reportes/reporteempleados", '_blank');
});


$('.save-optionsdefaults-form').submit(function (e) {
    let that = this;
    e.preventDefault();
    windows_message("¿Desea guardar los cambios?", "confirm", {
        onOk: function () {
            $('.progreso').modal({ backdrop: 'static', keyboard: false })
            $.ajax({

                url: "/Dashboard/SaveOpcionesDefaultUser",
                type: "POST",
                data: $(that).serialize(),
                async: true,
                success: function (data: ResponseUI) {
                    if (data.Type == "error") {
                        $('.progreso').modal('hide');
                        var _errors: string = "";
                        data.Errors.forEach(function (x: string) {
                            _errors += `${x}<br>`;
                        });
                        windows_message(_errors, data.Type, {
                            onOk: function () {
                                $('.progreso').modal('hide');
                            }
                        });
                    } else {
                        windows_message(data.Message, data.Type);
                        $('.progreso').modal('hide');                        
                    }
                }, error: function (xhr) {
                    redireccionaralLogin(xhr);
                }
            });
        }
    });
});


$(".ImagePerfil").change(function (e) {
    let _dato = this as HTMLInputElement;
    if (_dato.files != null) {
        let originalform: HTMLFormElement;
        originalform = document.querySelector(".save-optionsimages-form");

        let dataform = new FormData(originalform);

        $.ajax({
            url: "/Dashboard/UploadImage",
            type: "POST",
            data: dataform,
            contentType: false,
            processData: false,
            async: true,
            success: function (data: ResponseUI) {
                if (data.Type == "error") {
                    $('.progreso').modal('hide');
                    FormatErrors(data);
                } else {
                    $(".perfil").attr("src", data.Message);
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    }
});


//Prueba de la ayuda
//Código para mostrar la ayuda
$("#id-help-user-options").on("click", function () {
    let that = $(this)[0];
    showhelp(that, "/Dashboard/Help", ".help-useroptions");
});


//cambio de empresa
$('#ChangeCompanyForm').submit(function (e) {
    e.preventDefault();
    var contador: number = 0;
    $(".selectOptionCompaniesChange[type=checkbox]").each(function () {
        if ($(this).is(":checked")) {
            contador++;
            let input = $(document.createElement('input'));
            input.attr("name", "companyidChange");
            input.attr("class", "companyidChange");
            input.val($(this).parent().parent().find(".companyIdtbl").html().trim());
            $("#ChangeCompanyForm").append(input);
        }
    });

    if (contador === 0) {
        windows_message("¡Debe seleccionar un registro!", "error");
    }

    else if (contador > 1) {
        windows_message("¡Debe seleccionar solo un registro!", "error");

    } else {
        $('.progreso').modal({ backdrop: 'static', keyboard: false })

        $.ajax({

            url: "/Dashboard/SaveChangeCompanyForm",
            type: "POST",
            data: $("#ChangeCompanyForm").serialize(),
           
            async: true,
            success: function (data: ResponseUI) {
                $(".ModCompaniesAsing").modal('hide');
               
                if (data.Type == "error") {
                    FormatErrors(data);
                } else {
                    //if (window.location.href.includes("ErrorKeyLicense")) {

                    //    window.location.href = "/Dashboard/Principal";
                    //} else {
                    //     location.reload();
                    //}
                    SendNotification($(".companyidChange").val().toString());
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    }
});