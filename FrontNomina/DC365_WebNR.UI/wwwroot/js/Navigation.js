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
    window.open("/reportes/pagosdenomina", '_blank');
});
//ir al reporte resumen de nómina
$('.DayrollSummary').on('click', function () {
    window.open("/reportes/resumenpagosdenomina", '_blank');
});
//ir al reporte de tss
$('.report-tss').on('click', function () {
    window.open("/reportes/tss", '_blank');
});
//ir al reporte de nómina
$('.PayrollReport').on('click', function () {
    window.open("/reportes/reportenomina", '_blank');
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
            $('.progreso').modal({ backdrop: 'static', keyboard: false });
            $.ajax({
                url: "/Dashboard/SaveOpcionesDefaultUser",
                type: "POST",
                data: $(that).serialize(),
                async: true,
                success: function (data) {
                    if (data.Type == "error") {
                        $('.progreso').modal('hide');
                        var _errors = "";
                        data.Errors.forEach(function (x) {
                            _errors += `${x}<br>`;
                        });
                        windows_message(_errors, data.Type, {
                            onOk: function () {
                                $('.progreso').modal('hide');
                            }
                        });
                    }
                    else {
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
    let _dato = this;
    if (_dato.files != null) {
        let originalform;
        originalform = document.querySelector(".save-optionsimages-form");
        let dataform = new FormData(originalform);
        $.ajax({
            url: "/Dashboard/UploadImage",
            type: "POST",
            data: dataform,
            contentType: false,
            processData: false,
            async: true,
            success: function (data) {
                if (data.Type == "error") {
                    $('.progreso').modal('hide');
                    FormatErrors(data);
                }
                else {
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
    var contador = 0;
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
    }
    else {
        $('.progreso').modal({ backdrop: 'static', keyboard: false });
        $.ajax({
            url: "/Dashboard/SaveChangeCompanyForm",
            type: "POST",
            data: $("#ChangeCompanyForm").serialize(),
            async: true,
            success: function (data) {
                $(".ModCompaniesAsing").modal('hide');
                if (data.Type == "error") {
                    FormatErrors(data);
                }
                else {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTmF2aWdhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL1R5cGVTY3JpcHRGaWxlL05hdmlnYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsOERBQThEO0FBQzlELENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFO0lBQzFCLDZDQUE2QztJQUM3QyxJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsc0JBQXNCLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUNqRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBQ3JELENBQUMsQ0FBQyxDQUFDO0FBRUgsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ3RCLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ2pFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLHNCQUFzQixDQUFDLENBQUM7QUFDeEQsQ0FBQyxDQUFDLENBQUM7QUFFSCx5Q0FBeUM7QUFDekMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUU7SUFDckIsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQ2xELENBQUMsQ0FBQyxDQUFDO0FBRUgsOEJBQThCO0FBQzlCLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDbkIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMxQixDQUFDLENBQUMsQ0FBQztBQUVILHFDQUFxQztBQUNyQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ3JCLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFH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QUFDO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8tLS0tLS0gY2xpY2sgZW4gZWwgdXN1YXJpbyBhbCBmaW5hbCBkZSBsYSBjYWJlY2VyYSAtLS0tLS0tLS1cclxuJCgnLmRpdjJ1c3VhcmlvJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgLyogJCgnLmRhdG9zdXN1YXJpbycpLnRvZ2dsZUNsYXNzKCdBYnJpcicpOyovXHJcbiAgICB2YXIgc2lkZWJhciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzaWRlYmFyLW9wdGlvbnNcIik7XHJcbiAgICBzaWRlYmFyWzBdLmNsYXNzTGlzdC5hZGQoXCJzaWRlYmFyLW9wdGlvbnMtb3BlblwiKTtcclxufSk7XHJcblxyXG4kKFwiLmNsb3NlLW9wdGlvbnNcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHNpZGViYXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwic2lkZWJhci1vcHRpb25zXCIpO1xyXG4gICAgc2lkZWJhclswXS5jbGFzc0xpc3QucmVtb3ZlKFwic2lkZWJhci1vcHRpb25zLW9wZW5cIik7XHJcbn0pO1xyXG5cclxuLy9QYXJhIGFncmFuZGFyIG8gZW5jb2dlciBlbCBtZW51IGxhdGVyYWxcclxuJCgnLmRlbGFkbycpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICQoJy5zaWRlYmFyJykudG9nZ2xlQ2xhc3MoJ3NpZGViYXItY29sbGFwc2UnKTtcclxufSk7XHJcblxyXG4vL2NlcnJhciBtb2R1bG9zIHBhcmEgaXIgYXRyYXNcclxuJChcIi5DbG9zZS1iYWNrXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgIHdpbmRvdy5oaXN0b3J5LmdvKC0xKTtcclxufSk7XHJcblxyXG4vL2NlcnJhciBtb2R1bG9zIHBhcmEgaXIgYWwgZGFzaGJvYXJkXHJcbiQoXCIuQ2VycmFyTW9kdWxvXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvRGFzaGJvYXJkL1ByaW5jaXBhbFwiO1xyXG59KTtcclxuXHJcbi8vXHJcbiQoXCIuVGl0dWxvMVwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL0Rhc2hib2FyZC9QcmluY2lwYWxcIjtcclxufSk7XHJcblxyXG5cclxuLy9BY3R1YWxpemFyIHBhZ2luYVxyXG4kKFwiLk9wY0FjdHVhbGl6YXJcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgJC5nZXQobG9jYXRpb24uaHJlZilcclxuICAgICAgICAuZG9uZShmdW5jdGlvbiAocikge1xyXG4gICAgICAgICAgICB2YXIgbmV3RG9tID0gJChyKTtcclxuICAgICAgICAgICAgJCgnI01haW5UYWJsZScpLnJlcGxhY2VXaXRoKCQoJyNNYWluVGFibGUnLCBuZXdEb20pKTtcclxuICAgICAgICB9KTtcclxuXHJcbn0pO1xyXG5cclxuXHJcbi8vbW9zdHJhciBsaXN0YSBkZSBjbGllbnRlcyBhc2lnbmFkb3NcclxuJCgnLmNoYW5nZUNvbXBhbnknKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAkKCcuTW9kQ29tcGFuaWVzQXNpbmcnKS5tb2RhbChcInNob3dcIik7XHJcbn0pO1xyXG5cclxuLy8vL2NhbWJpYXIgZGUgY29tcGHDsWlhXHJcbi8vZnVuY3Rpb24gU2VsZWNDb21wYW55KF9OYW1lLCBfY29tcGFueUlkKSB7XHJcbi8vICAgICQoJy5Nb2RDdXN0b21lcnMnKS5tb2RhbCgnaGlkZScpO1xyXG4vLyAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCh7IGJhY2tkcm9wOiAnc3RhdGljJywga2V5Ym9hcmQ6IGZhbHNlIH0pXHJcblxyXG4vLyAgICAkLmFqYXgoe1xyXG4vLyAgICAgICAgdXJsOiBcIi9EYXNoYm9hcmQvQ2hhbmdlQ29tcGFueVwiLFxyXG4vLyAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbi8vICAgICAgICBkYXRhOiB7XHJcblxyXG4vLyAgICAgICAgICAgIF9uYW1lOiBfTmFtZSxcclxuLy8gICAgICAgICAgICBfY29kZUNvbXBhbnk6IF9jb21wYW55SWRcclxuXHJcblxyXG4vLyAgICAgICAgfSxcclxuLy8gICAgICAgIGFzeW5jOiB0cnVlLFxyXG4vLyAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuLy8gICAgICAgICAgICBpZiAoZGF0YSA9PSAxKSB7XHJcbi8vICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvRGFzaGJvYXJkL1ByaW5jaXBhbFwiO1xyXG5cclxuLy8gICAgICAgICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCJFcnJvciBlbiBlbCBjYW1iaW8gZGUgZW1wcmVzYVwiLCBcImVycm9yXCIpO1xyXG4vLyAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL0Rhc2hib2FyZC9JbmRleFwiO1xyXG4vLyAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuLy8gICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbi8vICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuLy8gICAgICAgIH1cclxuLy8gICAgfSk7XHJcbi8vfVxyXG5cclxuLy9pciBhbCBtYWVzdHJvIGRlIGRlcGFydGFtZW50b3MgYWN0aXZvcyBcclxuJCgnLk1EZXBhcnRhbWVudG9zJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9kZXBhcnRhbWVudG9zYWN0aXZvcyNSZWN1cnNvcyUyMGh1bWFub3NcIjtcclxufSk7XHJcblxyXG4vL2lyIGFsIGxpc3RhZG8gZGUgY2FyZ2EgbWFzaXZhXHJcbiQoJy5DYXJnYU1hc2l2YScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvaGlzdG9yaWFsbG90ZXMjQ29uZmlndXJhY2nDs25cIjtcclxufSk7XHJcblxyXG4vL2lyIGFsIG1hZXN0cm8gZGUgaW1wdWVzdG9zXHJcbiQoJy5UYXhDb2RlJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9pbXB1ZXN0b3MjQ29uZmlndXJhY2nDs25cIjtcclxufSk7XHJcblxyXG4vL2lyIGFsIG1hZXN0cm8gZGUgZGVwYXJ0YW1lbnRvcyBpbmFjdGl2b3NcclxuJCgnLk1kZXBhcnRhbWVudEluYWMnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL2RlcGFydGFtZW50b3NpbmFjdGl2b3MjUmVjdXJzb3MlMjBodW1hbm9zXCI7XHJcbn0pO1xyXG5cclxuLy9pciBhIGxpc3RhIGRlIHByb3llY3RvcyBpbmFjdGl2b3NcclxuJCgnLlByb2plY3QtZGlzYWJsZWQnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL3Byb3llY3Rvc2luYWN0aXZvcyNDb25maWd1cmFjacOzblwiO1xyXG59KTtcclxuXHJcbi8vIGlyIGFsIG1hZXN0cm8gZGUgbm9taW5hXHJcbiQoJy5NTm9taW5hcycpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvbm9taW5hI0NvbmZpZ3VyYWNpw7NuXCI7XHJcbn0pO1xyXG5cclxuLy9pciBhbCBtYWVzdHJvIGRlIHVzdWFyaW9cclxuJCgnLk1Vc2VyJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi91c3VhcmlvcyNDb25maWd1cmFjacOzblwiO1xyXG59KTtcclxuXHJcbi8vaXIgYWwgbWFlc3RybyBkZSB0aXBvcyBkZSBjdXJzb3NcclxuJCgnLlR5cGVDb3Vyc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL3RpcG9jdXJzb3MjQ3Vyc29zXCI7XHJcbn0pO1xyXG5cclxuXHJcblxyXG4vL2lyIGFsIG1hZXN0cm8gZGUgaW5zdHJ1Y3RvcmVzXHJcbiQoJy5JbnN0cnVjdG9yc0NvdXJzZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvaW5zdHJ1Y3RvciNDdXJzb3NcIjtcclxufSk7XHJcblxyXG4vL2lyIGFsIG1hZXN0cm8gZGUgdWJpY2FjaW9uIGRlIGN1cnNvc1xyXG4kKCcuQ291cnNlTG9jYXRpb24nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL3ViaWNhY2lvbmN1cnNvcyNDdXJzb3NcIjtcclxufSk7XHJcblxyXG4vL2lyIGFsIG1hZXN0cm8gZGUgdWJpY2FjaW9uIGRlIGN1cnNvc1xyXG4kKCcuQ2xhc3NSb29tJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9zYWxvbmVzY3Vyc28jQ3Vyc29zXCI7XHJcbn0pO1xyXG5cclxuLy9pciBhbCBtYWVzdHJvIGRlICBjdXJzb3NcclxuJCgnLkNvdXJzZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvY3Vyc29zI0N1cnNvc1wiO1xyXG59KTtcclxuXHJcbi8vaXIgYWwgbWFlc3RybyBkZSBjYXJnb3MgYWN0aXZvcyAgXHJcbiQoJy5Kb2JzRW5hYmxlJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9jYXJnb3NhY3Rpdm9zI1JlY3Vyc29zJTIwaHVtYW5vc1wiO1xyXG59KTtcclxuXHJcbi8vaXIgYWwgbWFlc3RybyBkZSBjYXJnb3MgaW5hY3Rpdm9zXHJcbiQoJy5Kb2JzRGlzZWJsZWQnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL2Nhcmdvc2luYWN0aXZvcyNSZWN1cnNvcyUyMGh1bWFub3NcIjtcclxufSk7XHJcblxyXG4vL2lyIGFsIG1hZXN0cm8gZGUgcHVlc3RvcyBhY3Rpdm9zXHJcbiQoJy5Qb3NpdGlvbkVuYWJsZWQnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL3B1ZXN0b3NhY3Rpdm9zI1JlY3Vyc29zJTIwaHVtYW5vc1wiO1xyXG59KTtcclxuXHJcbi8vaXIgYWwgbWFlc3RybyBkZSBwdWVzdG9zIGluYWN0aXZvc1xyXG4kKCcuUG9zaXRpb25EaXNlYmxlZCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvcHVlc3Rvc2luYWN0aXZvcyNSZWN1cnNvcyUyMGh1bWFub3NcIjtcclxufSk7XHJcblxyXG4vL2lyIGFsIG1hZXN0cm8gZGUgdmFjYW50ZXNcclxuJCgnLlZhY2FudHMnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL3ZhY2FudGVzI1JlY3Vyc29zJTIwaHVtYW5vc1wiO1xyXG59KTtcclxuXHJcbi8vaXIgYWwgbWFlc3RybyBkZSBlbXBsZWFkb3NcclxuJCgnLkVtcGxveWVlJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9lbXBsZWFkb3NhY3Rpdm9zP3dvcmtTdGF0dXM9MiNSZWN1cnNvcyUyMGh1bWFub3NcIjtcclxufSk7XHJcblxyXG4vL2lyIGFsIG1hZXN0cm8gZGUgY8OzZGlnb3MgZGUgZ2FuYW5jaWFzXHJcbiQoJy5FYXJuaW5nLWNvZGVzJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9jb2RpZ29zZ2FuYW5jaWFzI0NvbmZpZ3VyYWNpw7NuXCI7XHJcbn0pO1xyXG5cclxuXHJcbi8vaXIgYWwgbWFlc3RybyBkZSBjw7NkaWdvcyBkZSBkZWR1Y2Npb25lc1xyXG4kKCcuRGVkdWN0aW9uQ29kZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvY29kaWdvc2RlZHVjY2lvbiNDb25maWd1cmFjacOzblwiO1xyXG59KTtcclxuXHJcbi8vaXIgYWwgbWFlc3RybyBkZSBwcm9jZXNvcyBkZSBuw7NtaW5hXHJcbiQoJy5Qcm9jZXNzUGF5cm9sbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvcHJvY2Vzb25vbWluYSNOw7NtaW5hc1wiO1xyXG59KTtcclxuXHJcbi8vaXIgYWwgbWFlc3RybyBkZSBwcm95ZWN0b3NcclxuJCgnLlByb2plY3RzJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9wcm95ZWN0b3NhY3Rpdm9zI0NvbmZpZ3VyYWNpw7NuXCI7XHJcbn0pO1xyXG5cclxuLy9pciBhIGNhdGVnb3JpYXMgZGUgcHJveWVjdG9zIGluYWN0aXZhc1xyXG4kKCcuUHJvamVjdC1jYXRlZ29yeS1kaXNhYmxlZCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvY2F0ZWdvcmlhcHJveWVjdG9pbmFjdGl2YXMjQ29uZmlndXJhY2nDs25cIjtcclxufSk7XHJcblxyXG4vL2lyIGFsIG1hZXN0cm8gZGUgY2FuZGlkYXRvcyBhIGVtcGxlYWRvc1xyXG4kKCcuRW1wbG95ZWVDYW5kaWRhdGUnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL2VtcGxlYWRvc2FjdGl2b3M/d29ya1N0YXR1cz0wI1JlY3Vyc29zJTIwaHVtYW5vc1wiO1xyXG59KTtcclxuXHJcbi8vaXIgYWwgbWFlc3RybyBleCBlbXBsZWFkb3NcclxuJCgnLkRpc21pc3NlZEVtcGxveWVlJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9lbXBsZWFkb3NhY3Rpdm9zP3dvcmtTdGF0dXM9MSNSZWN1cnNvcyUyMGh1bWFub3NcIjtcclxufSk7XHJcblxyXG5cclxuLy9pciBhbCBtYWVzdHJvIGRlIGNhdGVnb3JpYXMgZGUgcHJveWVjdG9zXHJcbiQoJy5Qb3JqZWN0Q2F0ZWdvcnknKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL2NhdGVnb3JpYXByb3llY3RvYWN0aXZhcyNDb25maWd1cmFjacOzblwiO1xyXG59KTtcclxuXHJcbi8vaXIgYWwgbWFlc3RybyBkZSBjw7NkaWdvcyBkZSBwcmVzdGFtb3MgXHJcbiQoJy5Mb2Fuc0VuYWJsZWQnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL3ByZXN0YW1vcyNDb25maWd1cmFjacOzblwiO1xyXG59KTtcclxuXHJcbi8vaXIgYWwgbWFlc3RybyBkZSBkaWFzIGZlcmlhZG9zXHJcbiQoJy5NaG9saWRheXMnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL2NhbGVuZGFyaG9saWRheSNDb25maWd1cmFjacOzblwiO1xyXG59KTtcclxuXHJcbi8vaXIgYWwgcmVwb3J0ZSBkZSBwYWdvcyBkZSBuw7NtaW5hXHJcbiQoJy5QYWdvc2Rlbm9taW5hJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgd2luZG93Lm9wZW4oXCIvcmVwb3J0ZXMvcGFnb3NkZW5vbWluYVwiLCdfYmxhbmsnKTtcclxufSk7XHJcblxyXG4vL2lyIGFsIHJlcG9ydGUgcmVzdW1lbiBkZSBuw7NtaW5hXHJcbiQoJy5EYXlyb2xsU3VtbWFyeScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIHdpbmRvdy5vcGVuKFwiL3JlcG9ydGVzL3Jlc3VtZW5wYWdvc2Rlbm9taW5hXCIsJ19ibGFuaycpO1xyXG59KTtcclxuXHJcbi8vaXIgYWwgcmVwb3J0ZSBkZSB0c3NcclxuJCgnLnJlcG9ydC10c3MnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB3aW5kb3cub3BlbihcIi9yZXBvcnRlcy90c3NcIiwnX2JsYW5rJyk7XHJcbn0pO1xyXG5cclxuLy9pciBhbCByZXBvcnRlIGRlIG7Ds21pbmFcclxuJCgnLlBheXJvbGxSZXBvcnQnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB3aW5kb3cub3BlbihcIi9yZXBvcnRlcy9yZXBvcnRlbm9taW5hXCIsJ19ibGFuaycpO1xyXG59KTtcclxuXHJcbi8vaXIgYWwgcmVwb3J0ZSBkZSBER1QtNFxyXG4kKCcucmVwb3J0LWRndDQnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB3aW5kb3cub3BlbihcIi9yZXBvcnRlcy9kZ3Q0XCIsICdfYmxhbmsnKTtcclxufSk7XHJcblxyXG4vL2lyIGFsIHJlcG9ydGUgZGUgREdULTJcclxuJCgnLnJlcG9ydC1kZ3QyJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgd2luZG93Lm9wZW4oXCIvcmVwb3J0ZXMvZGd0MlwiLCAnX2JsYW5rJyk7XHJcbn0pO1xyXG5cclxuLy9pciBhbCByZXBvcnRlIGRlIERHVC0zXHJcbiQoJy5yZXBvcnQtZGd0MycpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIHdpbmRvdy5vcGVuKFwiL3JlcG9ydGVzL2RndDNcIiwgJ19ibGFuaycpO1xyXG59KTtcclxuXHJcbi8vaXIgYWwgcmVwb3J0ZSBkZSBER1QtNVxyXG4kKCcucmVwb3J0LWRndDUnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB3aW5kb3cub3BlbihcIi9yZXBvcnRlcy9kZ3Q1XCIsICdfYmxhbmsnKTtcclxufSk7XHJcblxyXG4vL2lyIGFsIHJlcG9ydGUgZGUgREdULTlcclxuJCgnLnJlcG9ydC1kZ3Q5Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgd2luZG93Lm9wZW4oXCIvcmVwb3J0ZXMvZGd0OVwiLCAnX2JsYW5rJyk7XHJcbn0pO1xyXG5cclxuLy9pciBhbCByZXBvcnRlIGRlIERHVC0xMVxyXG4kKCcucmVwb3J0LWRndDExJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgd2luZG93Lm9wZW4oXCIvcmVwb3J0ZXMvZGd0MTFcIiwgJ19ibGFuaycpO1xyXG59KTtcclxuXHJcbi8vaXIgYWwgcmVwb3J0ZSBkZSBER1QtMTJcclxuJCgnLnJlcG9ydC1kZ3QxMicpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIHdpbmRvdy5vcGVuKFwiL3JlcG9ydGVzL2RndDEyXCIsICdfYmxhbmsnKTtcclxufSk7XHJcblxyXG4vL2lyIGFsIHJlcG9ydGUgZGUgdG9kb3MgbG9zIGVtcGxlYWRvc1xyXG4kKCcucmVwb3J0LWFsbC1lbXBsb3llZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIHdpbmRvdy5vcGVuKFwiL3JlcG9ydGVzL3JlcG9ydGVlbXBsZWFkb3NcIiwgJ19ibGFuaycpO1xyXG59KTtcclxuXHJcblxyXG4kKCcuc2F2ZS1vcHRpb25zZGVmYXVsdHMtZm9ybScpLnN1Ym1pdChmdW5jdGlvbiAoZSkge1xyXG4gICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgd2luZG93c19tZXNzYWdlKFwiwr9EZXNlYSBndWFyZGFyIGxvcyBjYW1iaW9zP1wiLCBcImNvbmZpcm1cIiwge1xyXG4gICAgICAgIG9uT2s6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoeyBiYWNrZHJvcDogJ3N0YXRpYycsIGtleWJvYXJkOiBmYWxzZSB9KVxyXG4gICAgICAgICAgICAkLmFqYXgoe1xyXG5cclxuICAgICAgICAgICAgICAgIHVybDogXCIvRGFzaGJvYXJkL1NhdmVPcGNpb25lc0RlZmF1bHRVc2VyXCIsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgIGRhdGE6ICQodGhhdCkuc2VyaWFsaXplKCksXHJcbiAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBSZXNwb25zZVVJKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuVHlwZSA9PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9lcnJvcnM6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuRXJyb3JzLmZvckVhY2goZnVuY3Rpb24gKHg6IHN0cmluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2Vycm9ycyArPSBgJHt4fTxicj5gO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKF9lcnJvcnMsIGRhdGEuVHlwZSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25PazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShkYXRhLk1lc3NhZ2UsIGRhdGEuVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKCdoaWRlJyk7ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSk7XHJcblxyXG5cclxuJChcIi5JbWFnZVBlcmZpbFwiKS5jaGFuZ2UoZnVuY3Rpb24gKGUpIHtcclxuICAgIGxldCBfZGF0byA9IHRoaXMgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIGlmIChfZGF0by5maWxlcyAhPSBudWxsKSB7XHJcbiAgICAgICAgbGV0IG9yaWdpbmFsZm9ybTogSFRNTEZvcm1FbGVtZW50O1xyXG4gICAgICAgIG9yaWdpbmFsZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2F2ZS1vcHRpb25zaW1hZ2VzLWZvcm1cIik7XHJcblxyXG4gICAgICAgIGxldCBkYXRhZm9ybSA9IG5ldyBGb3JtRGF0YShvcmlnaW5hbGZvcm0pO1xyXG5cclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IFwiL0Rhc2hib2FyZC9VcGxvYWRJbWFnZVwiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgZGF0YTogZGF0YWZvcm0sXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBmYWxzZSxcclxuICAgICAgICAgICAgcHJvY2Vzc0RhdGE6IGZhbHNlLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IFJlc3BvbnNlVUkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLlR5cGUgPT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICBGb3JtYXRFcnJvcnMoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIucGVyZmlsXCIpLmF0dHIoXCJzcmNcIiwgZGF0YS5NZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSk7XHJcblxyXG5cclxuLy9QcnVlYmEgZGUgbGEgYXl1ZGFcclxuLy9Dw7NkaWdvIHBhcmEgbW9zdHJhciBsYSBheXVkYVxyXG4kKFwiI2lkLWhlbHAtdXNlci1vcHRpb25zXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IHRoYXQgPSAkKHRoaXMpWzBdO1xyXG4gICAgc2hvd2hlbHAodGhhdCwgXCIvRGFzaGJvYXJkL0hlbHBcIiwgXCIuaGVscC11c2Vyb3B0aW9uc1wiKTtcclxufSk7XHJcblxyXG5cclxuLy9jYW1iaW8gZGUgZW1wcmVzYVxyXG4kKCcjQ2hhbmdlQ29tcGFueUZvcm0nKS5zdWJtaXQoZnVuY3Rpb24gKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHZhciBjb250YWRvcjogbnVtYmVyID0gMDtcclxuICAgICQoXCIuc2VsZWN0T3B0aW9uQ29tcGFuaWVzQ2hhbmdlW3R5cGU9Y2hlY2tib3hdXCIpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICgkKHRoaXMpLmlzKFwiOmNoZWNrZWRcIikpIHtcclxuICAgICAgICAgICAgY29udGFkb3IrKztcclxuICAgICAgICAgICAgbGV0IGlucHV0ID0gJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKTtcclxuICAgICAgICAgICAgaW5wdXQuYXR0cihcIm5hbWVcIiwgXCJjb21wYW55aWRDaGFuZ2VcIik7XHJcbiAgICAgICAgICAgIGlucHV0LmF0dHIoXCJjbGFzc1wiLCBcImNvbXBhbnlpZENoYW5nZVwiKTtcclxuICAgICAgICAgICAgaW5wdXQudmFsKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZChcIi5jb21wYW55SWR0YmxcIikuaHRtbCgpLnRyaW0oKSk7XHJcbiAgICAgICAgICAgICQoXCIjQ2hhbmdlQ29tcGFueUZvcm1cIikuYXBwZW5kKGlucHV0KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoY29udGFkb3IgPT09IDApIHtcclxuICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCoURlYmUgc2VsZWNjaW9uYXIgdW4gcmVnaXN0cm8hXCIsIFwiZXJyb3JcIik7XHJcbiAgICB9XHJcblxyXG4gICAgZWxzZSBpZiAoY29udGFkb3IgPiAxKSB7XHJcbiAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwqFEZWJlIHNlbGVjY2lvbmFyIHNvbG8gdW4gcmVnaXN0cm8hXCIsIFwiZXJyb3JcIik7XHJcblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCh7IGJhY2tkcm9wOiAnc3RhdGljJywga2V5Ym9hcmQ6IGZhbHNlIH0pXHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcblxyXG4gICAgICAgICAgICB1cmw6IFwiL0Rhc2hib2FyZC9TYXZlQ2hhbmdlQ29tcGFueUZvcm1cIixcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6ICQoXCIjQ2hhbmdlQ29tcGFueUZvcm1cIikuc2VyaWFsaXplKCksXHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogUmVzcG9uc2VVSSkge1xyXG4gICAgICAgICAgICAgICAgJChcIi5Nb2RDb21wYW5pZXNBc2luZ1wiKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLlR5cGUgPT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgRm9ybWF0RXJyb3JzKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvL2lmICh3aW5kb3cubG9jYXRpb24uaHJlZi5pbmNsdWRlcyhcIkVycm9yS2V5TGljZW5zZVwiKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL0Rhc2hib2FyZC9QcmluY2lwYWxcIjtcclxuICAgICAgICAgICAgICAgICAgICAvL30gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgICAgIFNlbmROb3RpZmljYXRpb24oJChcIi5jb21wYW55aWRDaGFuZ2VcIikudmFsKCkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0pOyJdfQ==