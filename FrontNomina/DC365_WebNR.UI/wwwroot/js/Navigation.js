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
    // Persistir el estado del menú en localStorage
    const isCollapsed = $('.sidebar').hasClass('sidebar-collapse');
    localStorage.setItem('menuCollapsed', isCollapsed ? 'true' : 'false');
    // Actualizar clase en body para controlar el contenido
    if (isCollapsed) {
        $('body').addClass('menu-collapsed');
    }
    else {
        $('body').removeClass('menu-collapsed');
    }
});
// Restaurar el estado del menú al cargar la página
$(document).ready(function () {
    const menuCollapsed = localStorage.getItem('menuCollapsed');
    if (menuCollapsed === 'true') {
        $('.sidebar').addClass('sidebar-collapse');
        $('body').addClass('menu-collapsed');
    }
    else {
        $('.sidebar').removeClass('sidebar-collapse');
        $('body').removeClass('menu-collapsed');
    }
    // Restaurar estado de submenús desde localStorage
    const openMenus = JSON.parse(localStorage.getItem('openMenus') || '[]');
    openMenus.forEach(function (menuId) {
        $('#' + menuId).addClass('menu-open');
    });
    // Marcar como listo para mostrar el contenido sin pestañeo
    $('body').addClass('menu-ready');
});
// Toggle de submenús al hacer clic en menú principal
$('.sidebar .sidebar-menu .item .menu-btn').on('click', function (e) {
    e.preventDefault();
    const item = $(this).parent('.item');
    const menuId = item.attr('id');
    // Toggle clase menu-open
    item.toggleClass('menu-open');
    // Guardar estado en localStorage
    let openMenus = JSON.parse(localStorage.getItem('openMenus') || '[]');
    if (item.hasClass('menu-open')) {
        // Agregar al array si no existe
        if (openMenus.indexOf(menuId) === -1) {
            openMenus.push(menuId);
        }
    }
    else {
        // Quitar del array
        openMenus = openMenus.filter(function (id) {
            return id !== menuId;
        });
    }
    localStorage.setItem('openMenus', JSON.stringify(openMenus));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTmF2aWdhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL1R5cGVTY3JpcHRGaWxlL05hdmlnYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsOERBQThEO0FBQzlELENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFO0lBQzFCLDZDQUE2QztJQUM3QyxJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsc0JBQXNCLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUNqRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBQ3JELENBQUMsQ0FBQyxDQUFDO0FBRUgsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ3RCLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ2pFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLHNCQUFzQixDQUFDLENBQUM7QUFDeEQsQ0FBQyxDQUFDLENBQUM7QUFFSCx5Q0FBeUM7QUFDekMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUU7SUFDckIsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBRTlDLCtDQUErQztJQUMvQyxNQUFNLFdBQVcsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDL0QsWUFBWSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRXRFLHVEQUF1RDtJQUN2RCxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBQ2QsQ0FBQyxDQUFDLE1BQU0sQ0FB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QUFDO2dCQUM3RCxDQUFDO1lBQ0wsQ0FBQyxFQUFFLEtBQUssRUFBRSxVQUFVLEdBQUc7Z0JBQ25CLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzlCLENBQUM7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy0tLS0tLSBjbGljayBlbiBlbCB1c3VhcmlvIGFsIGZpbmFsIGRlIGxhIGNhYmVjZXJhIC0tLS0tLS0tLVxyXG4kKCcuZGl2MnVzdWFyaW8nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAvKiAkKCcuZGF0b3N1c3VhcmlvJykudG9nZ2xlQ2xhc3MoJ0FicmlyJyk7Ki9cclxuICAgIHZhciBzaWRlYmFyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInNpZGViYXItb3B0aW9uc1wiKTtcclxuICAgIHNpZGViYXJbMF0uY2xhc3NMaXN0LmFkZChcInNpZGViYXItb3B0aW9ucy1vcGVuXCIpO1xyXG59KTtcclxuXHJcbiQoXCIuY2xvc2Utb3B0aW9uc1wiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgc2lkZWJhciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzaWRlYmFyLW9wdGlvbnNcIik7XHJcbiAgICBzaWRlYmFyWzBdLmNsYXNzTGlzdC5yZW1vdmUoXCJzaWRlYmFyLW9wdGlvbnMtb3BlblwiKTtcclxufSk7XHJcblxyXG4vL1BhcmEgYWdyYW5kYXIgbyBlbmNvZ2VyIGVsIG1lbnUgbGF0ZXJhbFxyXG4kKCcuZGVsYWRvJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgJCgnLnNpZGViYXInKS50b2dnbGVDbGFzcygnc2lkZWJhci1jb2xsYXBzZScpO1xyXG5cclxuICAgIC8vIFBlcnNpc3RpciBlbCBlc3RhZG8gZGVsIG1lbsO6IGVuIGxvY2FsU3RvcmFnZVxyXG4gICAgY29uc3QgaXNDb2xsYXBzZWQgPSAkKCcuc2lkZWJhcicpLmhhc0NsYXNzKCdzaWRlYmFyLWNvbGxhcHNlJyk7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbWVudUNvbGxhcHNlZCcsIGlzQ29sbGFwc2VkID8gJ3RydWUnIDogJ2ZhbHNlJyk7XHJcblxyXG4gICAgLy8gQWN0dWFsaXphciBjbGFzZSBlbiBib2R5IHBhcmEgY29udHJvbGFyIGVsIGNvbnRlbmlkb1xyXG4gICAgaWYgKGlzQ29sbGFwc2VkKSB7XHJcbiAgICAgICAgJCgnYm9keScpLmFkZENsYXNzKCdtZW51LWNvbGxhcHNlZCcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ21lbnUtY29sbGFwc2VkJyk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLy8gUmVzdGF1cmFyIGVsIGVzdGFkbyBkZWwgbWVuw7ogYWwgY2FyZ2FyIGxhIHDDoWdpbmFcclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc3QgbWVudUNvbGxhcHNlZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdtZW51Q29sbGFwc2VkJyk7XHJcblxyXG4gICAgaWYgKG1lbnVDb2xsYXBzZWQgPT09ICd0cnVlJykge1xyXG4gICAgICAgICQoJy5zaWRlYmFyJykuYWRkQ2xhc3MoJ3NpZGViYXItY29sbGFwc2UnKTtcclxuICAgICAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ21lbnUtY29sbGFwc2VkJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgICQoJy5zaWRlYmFyJykucmVtb3ZlQ2xhc3MoJ3NpZGViYXItY29sbGFwc2UnKTtcclxuICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ21lbnUtY29sbGFwc2VkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmVzdGF1cmFyIGVzdGFkbyBkZSBzdWJtZW7DunMgZGVzZGUgbG9jYWxTdG9yYWdlXHJcbiAgICBjb25zdCBvcGVuTWVudXMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdvcGVuTWVudXMnKSB8fCAnW10nKTtcclxuICAgIG9wZW5NZW51cy5mb3JFYWNoKGZ1bmN0aW9uIChtZW51SWQ6IHN0cmluZykge1xyXG4gICAgICAgICQoJyMnICsgbWVudUlkKS5hZGRDbGFzcygnbWVudS1vcGVuJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBNYXJjYXIgY29tbyBsaXN0byBwYXJhIG1vc3RyYXIgZWwgY29udGVuaWRvIHNpbiBwZXN0YcOxZW9cclxuICAgICQoJ2JvZHknKS5hZGRDbGFzcygnbWVudS1yZWFkeScpO1xyXG59KTtcclxuXHJcbi8vIFRvZ2dsZSBkZSBzdWJtZW7DunMgYWwgaGFjZXIgY2xpYyBlbiBtZW7DuiBwcmluY2lwYWxcclxuJCgnLnNpZGViYXIgLnNpZGViYXItbWVudSAuaXRlbSAubWVudS1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIGNvbnN0IGl0ZW0gPSAkKHRoaXMpLnBhcmVudCgnLml0ZW0nKTtcclxuICAgIGNvbnN0IG1lbnVJZCA9IGl0ZW0uYXR0cignaWQnKTtcclxuXHJcbiAgICAvLyBUb2dnbGUgY2xhc2UgbWVudS1vcGVuXHJcbiAgICBpdGVtLnRvZ2dsZUNsYXNzKCdtZW51LW9wZW4nKTtcclxuXHJcbiAgICAvLyBHdWFyZGFyIGVzdGFkbyBlbiBsb2NhbFN0b3JhZ2VcclxuICAgIGxldCBvcGVuTWVudXMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdvcGVuTWVudXMnKSB8fCAnW10nKTtcclxuXHJcbiAgICBpZiAoaXRlbS5oYXNDbGFzcygnbWVudS1vcGVuJykpIHtcclxuICAgICAgICAvLyBBZ3JlZ2FyIGFsIGFycmF5IHNpIG5vIGV4aXN0ZVxyXG4gICAgICAgIGlmIChvcGVuTWVudXMuaW5kZXhPZihtZW51SWQpID09PSAtMSkge1xyXG4gICAgICAgICAgICBvcGVuTWVudXMucHVzaChtZW51SWQpO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gUXVpdGFyIGRlbCBhcnJheVxyXG4gICAgICAgIG9wZW5NZW51cyA9IG9wZW5NZW51cy5maWx0ZXIoZnVuY3Rpb24gKGlkOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGlkICE9PSBtZW51SWQ7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ29wZW5NZW51cycsIEpTT04uc3RyaW5naWZ5KG9wZW5NZW51cykpO1xyXG59KTtcclxuXHJcbi8vY2VycmFyIG1vZHVsb3MgcGFyYSBpciBhdHJhc1xyXG4kKFwiLkNsb3NlLWJhY2tcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgd2luZG93Lmhpc3RvcnkuZ28oLTEpO1xyXG59KTtcclxuXHJcbi8vY2VycmFyIG1vZHVsb3MgcGFyYSBpciBhbCBkYXNoYm9hcmRcclxuJChcIi5DZXJyYXJNb2R1bG9cIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9EYXNoYm9hcmQvUHJpbmNpcGFsXCI7XHJcbn0pO1xyXG5cclxuLy9cclxuJChcIi5UaXR1bG8xXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvRGFzaGJvYXJkL1ByaW5jaXBhbFwiO1xyXG59KTtcclxuXHJcblxyXG4vL0FjdHVhbGl6YXIgcGFnaW5hXHJcbiQoXCIuT3BjQWN0dWFsaXphclwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAkLmdldChsb2NhdGlvbi5ocmVmKVxyXG4gICAgICAgIC5kb25lKGZ1bmN0aW9uIChyKSB7XHJcbiAgICAgICAgICAgIHZhciBuZXdEb20gPSAkKHIpO1xyXG4gICAgICAgICAgICAkKCcjTWFpblRhYmxlJykucmVwbGFjZVdpdGgoJCgnI01haW5UYWJsZScsIG5ld0RvbSkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxufSk7XHJcblxyXG5cclxuLy9tb3N0cmFyIGxpc3RhIGRlIGNsaWVudGVzIGFzaWduYWRvc1xyXG4kKCcuY2hhbmdlQ29tcGFueScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICQoJy5Nb2RDb21wYW5pZXNBc2luZycpLm1vZGFsKFwic2hvd1wiKTtcclxufSk7XHJcblxyXG4vLy8vY2FtYmlhciBkZSBjb21wYcOxaWFcclxuLy9mdW5jdGlvbiBTZWxlY0NvbXBhbnkoX05hbWUsIF9jb21wYW55SWQpIHtcclxuLy8gICAgJCgnLk1vZEN1c3RvbWVycycpLm1vZGFsKCdoaWRlJyk7XHJcbi8vICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKHsgYmFja2Ryb3A6ICdzdGF0aWMnLCBrZXlib2FyZDogZmFsc2UgfSlcclxuXHJcbi8vICAgICQuYWpheCh7XHJcbi8vICAgICAgICB1cmw6IFwiL0Rhc2hib2FyZC9DaGFuZ2VDb21wYW55XCIsXHJcbi8vICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuLy8gICAgICAgIGRhdGE6IHtcclxuXHJcbi8vICAgICAgICAgICAgX25hbWU6IF9OYW1lLFxyXG4vLyAgICAgICAgICAgIF9jb2RlQ29tcGFueTogX2NvbXBhbnlJZFxyXG5cclxuXHJcbi8vICAgICAgICB9LFxyXG4vLyAgICAgICAgYXN5bmM6IHRydWUsXHJcbi8vICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4vLyAgICAgICAgICAgIGlmIChkYXRhID09IDEpIHtcclxuLy8gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9EYXNoYm9hcmQvUHJpbmNpcGFsXCI7XHJcblxyXG4vLyAgICAgICAgICAgIH0gZWxzZSB7XHJcbi8vICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIkVycm9yIGVuIGVsIGNhbWJpbyBkZSBlbXByZXNhXCIsIFwiZXJyb3JcIik7XHJcbi8vICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvRGFzaGJvYXJkL0luZGV4XCI7XHJcbi8vICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4vLyAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuLy8gICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4vLyAgICAgICAgfVxyXG4vLyAgICB9KTtcclxuLy99XHJcblxyXG4vL2lyIGFsIG1hZXN0cm8gZGUgZGVwYXJ0YW1lbnRvcyBhY3Rpdm9zIFxyXG4kKCcuTURlcGFydGFtZW50b3MnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL2RlcGFydGFtZW50b3NhY3Rpdm9zI1JlY3Vyc29zJTIwaHVtYW5vc1wiO1xyXG59KTtcclxuXHJcbi8vaXIgYWwgbGlzdGFkbyBkZSBjYXJnYSBtYXNpdmFcclxuJCgnLkNhcmdhTWFzaXZhJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9oaXN0b3JpYWxsb3RlcyNDb25maWd1cmFjacOzblwiO1xyXG59KTtcclxuXHJcbi8vaXIgYWwgbWFlc3RybyBkZSBpbXB1ZXN0b3NcclxuJCgnLlRheENvZGUnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL2ltcHVlc3RvcyNDb25maWd1cmFjacOzblwiO1xyXG59KTtcclxuXHJcbi8vaXIgYWwgbWFlc3RybyBkZSBkZXBhcnRhbWVudG9zIGluYWN0aXZvc1xyXG4kKCcuTWRlcGFydGFtZW50SW5hYycpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvZGVwYXJ0YW1lbnRvc2luYWN0aXZvcyNSZWN1cnNvcyUyMGh1bWFub3NcIjtcclxufSk7XHJcblxyXG4vL2lyIGEgbGlzdGEgZGUgcHJveWVjdG9zIGluYWN0aXZvc1xyXG4kKCcuUHJvamVjdC1kaXNhYmxlZCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvcHJveWVjdG9zaW5hY3Rpdm9zI0NvbmZpZ3VyYWNpw7NuXCI7XHJcbn0pO1xyXG5cclxuLy8gaXIgYWwgbWFlc3RybyBkZSBub21pbmFcclxuJCgnLk1Ob21pbmFzJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9ub21pbmEjQ29uZmlndXJhY2nDs25cIjtcclxufSk7XHJcblxyXG4vL2lyIGFsIG1hZXN0cm8gZGUgdXN1YXJpb1xyXG4kKCcuTVVzZXInKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL3VzdWFyaW9zI0NvbmZpZ3VyYWNpw7NuXCI7XHJcbn0pO1xyXG5cclxuLy9pciBhbCBtYWVzdHJvIGRlIHRpcG9zIGRlIGN1cnNvc1xyXG4kKCcuVHlwZUNvdXJzZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvdGlwb2N1cnNvcyNDdXJzb3NcIjtcclxufSk7XHJcblxyXG5cclxuXHJcbi8vaXIgYWwgbWFlc3RybyBkZSBpbnN0cnVjdG9yZXNcclxuJCgnLkluc3RydWN0b3JzQ291cnNlJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9pbnN0cnVjdG9yI0N1cnNvc1wiO1xyXG59KTtcclxuXHJcbi8vaXIgYWwgbWFlc3RybyBkZSB1YmljYWNpb24gZGUgY3Vyc29zXHJcbiQoJy5Db3Vyc2VMb2NhdGlvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvdWJpY2FjaW9uY3Vyc29zI0N1cnNvc1wiO1xyXG59KTtcclxuXHJcbi8vaXIgYWwgbWFlc3RybyBkZSB1YmljYWNpb24gZGUgY3Vyc29zXHJcbiQoJy5DbGFzc1Jvb20nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL3NhbG9uZXNjdXJzbyNDdXJzb3NcIjtcclxufSk7XHJcblxyXG4vL2lyIGFsIG1hZXN0cm8gZGUgIGN1cnNvc1xyXG4kKCcuQ291cnNlJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9jdXJzb3MjQ3Vyc29zXCI7XHJcbn0pO1xyXG5cclxuLy9pciBhbCBtYWVzdHJvIGRlIGNhcmdvcyBhY3Rpdm9zICBcclxuJCgnLkpvYnNFbmFibGUnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL2Nhcmdvc2FjdGl2b3MjUmVjdXJzb3MlMjBodW1hbm9zXCI7XHJcbn0pO1xyXG5cclxuLy9pciBhbCBtYWVzdHJvIGRlIGNhcmdvcyBpbmFjdGl2b3NcclxuJCgnLkpvYnNEaXNlYmxlZCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvY2FyZ29zaW5hY3Rpdm9zI1JlY3Vyc29zJTIwaHVtYW5vc1wiO1xyXG59KTtcclxuXHJcbi8vaXIgYWwgbWFlc3RybyBkZSBwdWVzdG9zIGFjdGl2b3NcclxuJCgnLlBvc2l0aW9uRW5hYmxlZCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvcHVlc3Rvc2FjdGl2b3MjUmVjdXJzb3MlMjBodW1hbm9zXCI7XHJcbn0pO1xyXG5cclxuLy9pciBhbCBtYWVzdHJvIGRlIHB1ZXN0b3MgaW5hY3Rpdm9zXHJcbiQoJy5Qb3NpdGlvbkRpc2VibGVkJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9wdWVzdG9zaW5hY3Rpdm9zI1JlY3Vyc29zJTIwaHVtYW5vc1wiO1xyXG59KTtcclxuXHJcbi8vaXIgYWwgbWFlc3RybyBkZSB2YWNhbnRlc1xyXG4kKCcuVmFjYW50cycpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvdmFjYW50ZXMjUmVjdXJzb3MlMjBodW1hbm9zXCI7XHJcbn0pO1xyXG5cclxuLy9pciBhbCBtYWVzdHJvIGRlIGVtcGxlYWRvc1xyXG4kKCcuRW1wbG95ZWUnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL2VtcGxlYWRvc2FjdGl2b3M/d29ya1N0YXR1cz0yI1JlY3Vyc29zJTIwaHVtYW5vc1wiO1xyXG59KTtcclxuXHJcbi8vaXIgYWwgbWFlc3RybyBkZSBjw7NkaWdvcyBkZSBnYW5hbmNpYXNcclxuJCgnLkVhcm5pbmctY29kZXMnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL2NvZGlnb3NnYW5hbmNpYXMjQ29uZmlndXJhY2nDs25cIjtcclxufSk7XHJcblxyXG5cclxuLy9pciBhbCBtYWVzdHJvIGRlIGPDs2RpZ29zIGRlIGRlZHVjY2lvbmVzXHJcbiQoJy5EZWR1Y3Rpb25Db2RlJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9jb2RpZ29zZGVkdWNjaW9uI0NvbmZpZ3VyYWNpw7NuXCI7XHJcbn0pO1xyXG5cclxuLy9pciBhbCBtYWVzdHJvIGRlIHByb2Nlc29zIGRlIG7Ds21pbmFcclxuJCgnLlByb2Nlc3NQYXlyb2xsJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9wcm9jZXNvbm9taW5hI07Ds21pbmFzXCI7XHJcbn0pO1xyXG5cclxuLy9pciBhbCBtYWVzdHJvIGRlIHByb3llY3Rvc1xyXG4kKCcuUHJvamVjdHMnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL3Byb3llY3Rvc2FjdGl2b3MjQ29uZmlndXJhY2nDs25cIjtcclxufSk7XHJcblxyXG4vL2lyIGEgY2F0ZWdvcmlhcyBkZSBwcm95ZWN0b3MgaW5hY3RpdmFzXHJcbiQoJy5Qcm9qZWN0LWNhdGVnb3J5LWRpc2FibGVkJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9jYXRlZ29yaWFwcm95ZWN0b2luYWN0aXZhcyNDb25maWd1cmFjacOzblwiO1xyXG59KTtcclxuXHJcbi8vaXIgYWwgbWFlc3RybyBkZSBjYW5kaWRhdG9zIGEgZW1wbGVhZG9zXHJcbiQoJy5FbXBsb3llZUNhbmRpZGF0ZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvZW1wbGVhZG9zYWN0aXZvcz93b3JrU3RhdHVzPTAjUmVjdXJzb3MlMjBodW1hbm9zXCI7XHJcbn0pO1xyXG5cclxuLy9pciBhbCBtYWVzdHJvIGV4IGVtcGxlYWRvc1xyXG4kKCcuRGlzbWlzc2VkRW1wbG95ZWUnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL2VtcGxlYWRvc2FjdGl2b3M/d29ya1N0YXR1cz0xI1JlY3Vyc29zJTIwaHVtYW5vc1wiO1xyXG59KTtcclxuXHJcblxyXG4vL2lyIGFsIG1hZXN0cm8gZGUgY2F0ZWdvcmlhcyBkZSBwcm95ZWN0b3NcclxuJCgnLlBvcmplY3RDYXRlZ29yeScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvY2F0ZWdvcmlhcHJveWVjdG9hY3RpdmFzI0NvbmZpZ3VyYWNpw7NuXCI7XHJcbn0pO1xyXG5cclxuLy9pciBhbCBtYWVzdHJvIGRlIGPDs2RpZ29zIGRlIHByZXN0YW1vcyBcclxuJCgnLkxvYW5zRW5hYmxlZCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvcHJlc3RhbW9zI0NvbmZpZ3VyYWNpw7NuXCI7XHJcbn0pO1xyXG5cclxuLy9pciBhbCBtYWVzdHJvIGRlIGRpYXMgZmVyaWFkb3NcclxuJCgnLk1ob2xpZGF5cycpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvY2FsZW5kYXJob2xpZGF5I0NvbmZpZ3VyYWNpw7NuXCI7XHJcbn0pO1xyXG5cclxuLy9pciBhbCByZXBvcnRlIGRlIHBhZ29zIGRlIG7Ds21pbmFcclxuJCgnLlBhZ29zZGVub21pbmEnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB3aW5kb3cub3BlbihcIi9yZXBvcnRlcy9wYWdvc2Rlbm9taW5hXCIsJ19ibGFuaycpO1xyXG59KTtcclxuXHJcbi8vaXIgYWwgcmVwb3J0ZSByZXN1bWVuIGRlIG7Ds21pbmFcclxuJCgnLkRheXJvbGxTdW1tYXJ5Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgd2luZG93Lm9wZW4oXCIvcmVwb3J0ZXMvcmVzdW1lbnBhZ29zZGVub21pbmFcIiwnX2JsYW5rJyk7XHJcbn0pO1xyXG5cclxuLy9pciBhbCByZXBvcnRlIGRlIHRzc1xyXG4kKCcucmVwb3J0LXRzcycpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIHdpbmRvdy5vcGVuKFwiL3JlcG9ydGVzL3Rzc1wiLCdfYmxhbmsnKTtcclxufSk7XHJcblxyXG4vL2lyIGFsIHJlcG9ydGUgZGUgbsOzbWluYVxyXG4kKCcuUGF5cm9sbFJlcG9ydCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIHdpbmRvdy5vcGVuKFwiL3JlcG9ydGVzL3JlcG9ydGVub21pbmFcIiwnX2JsYW5rJyk7XHJcbn0pO1xyXG5cclxuLy9pciBhbCByZXBvcnRlIGRlIERHVC00XHJcbiQoJy5yZXBvcnQtZGd0NCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIHdpbmRvdy5vcGVuKFwiL3JlcG9ydGVzL2RndDRcIiwgJ19ibGFuaycpO1xyXG59KTtcclxuXHJcbi8vaXIgYWwgcmVwb3J0ZSBkZSBER1QtMlxyXG4kKCcucmVwb3J0LWRndDInKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB3aW5kb3cub3BlbihcIi9yZXBvcnRlcy9kZ3QyXCIsICdfYmxhbmsnKTtcclxufSk7XHJcblxyXG4vL2lyIGFsIHJlcG9ydGUgZGUgREdULTNcclxuJCgnLnJlcG9ydC1kZ3QzJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgd2luZG93Lm9wZW4oXCIvcmVwb3J0ZXMvZGd0M1wiLCAnX2JsYW5rJyk7XHJcbn0pO1xyXG5cclxuLy9pciBhbCByZXBvcnRlIGRlIERHVC01XHJcbiQoJy5yZXBvcnQtZGd0NScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIHdpbmRvdy5vcGVuKFwiL3JlcG9ydGVzL2RndDVcIiwgJ19ibGFuaycpO1xyXG59KTtcclxuXHJcbi8vaXIgYWwgcmVwb3J0ZSBkZSBER1QtOVxyXG4kKCcucmVwb3J0LWRndDknKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB3aW5kb3cub3BlbihcIi9yZXBvcnRlcy9kZ3Q5XCIsICdfYmxhbmsnKTtcclxufSk7XHJcblxyXG4vL2lyIGFsIHJlcG9ydGUgZGUgREdULTExXHJcbiQoJy5yZXBvcnQtZGd0MTEnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB3aW5kb3cub3BlbihcIi9yZXBvcnRlcy9kZ3QxMVwiLCAnX2JsYW5rJyk7XHJcbn0pO1xyXG5cclxuLy9pciBhbCByZXBvcnRlIGRlIERHVC0xMlxyXG4kKCcucmVwb3J0LWRndDEyJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgd2luZG93Lm9wZW4oXCIvcmVwb3J0ZXMvZGd0MTJcIiwgJ19ibGFuaycpO1xyXG59KTtcclxuXHJcbi8vaXIgYWwgcmVwb3J0ZSBkZSB0b2RvcyBsb3MgZW1wbGVhZG9zXHJcbiQoJy5yZXBvcnQtYWxsLWVtcGxveWVlJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgd2luZG93Lm9wZW4oXCIvcmVwb3J0ZXMvcmVwb3J0ZWVtcGxlYWRvc1wiLCAnX2JsYW5rJyk7XHJcbn0pO1xyXG5cclxuXHJcbiQoJy5zYXZlLW9wdGlvbnNkZWZhdWx0cy1mb3JtJykuc3VibWl0KGZ1bmN0aW9uIChlKSB7XHJcbiAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB3aW5kb3dzX21lc3NhZ2UoXCLCv0Rlc2VhIGd1YXJkYXIgbG9zIGNhbWJpb3M/XCIsIFwiY29uZmlybVwiLCB7XHJcbiAgICAgICAgb25PazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCh7IGJhY2tkcm9wOiAnc3RhdGljJywga2V5Ym9hcmQ6IGZhbHNlIH0pXHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcblxyXG4gICAgICAgICAgICAgICAgdXJsOiBcIi9EYXNoYm9hcmQvU2F2ZU9wY2lvbmVzRGVmYXVsdFVzZXJcIixcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogJCh0aGF0KS5zZXJpYWxpemUoKSxcclxuICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IFJlc3BvbnNlVUkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5UeXBlID09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2Vycm9yczogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5FcnJvcnMuZm9yRWFjaChmdW5jdGlvbiAoeDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZXJyb3JzICs9IGAke3h9PGJyPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoX2Vycm9ycywgZGF0YS5UeXBlLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbk9rOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKGRhdGEuTWVzc2FnZSwgZGF0YS5UeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59KTtcclxuXHJcblxyXG4kKFwiLkltYWdlUGVyZmlsXCIpLmNoYW5nZShmdW5jdGlvbiAoZSkge1xyXG4gICAgbGV0IF9kYXRvID0gdGhpcyBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgaWYgKF9kYXRvLmZpbGVzICE9IG51bGwpIHtcclxuICAgICAgICBsZXQgb3JpZ2luYWxmb3JtOiBIVE1MRm9ybUVsZW1lbnQ7XHJcbiAgICAgICAgb3JpZ2luYWxmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zYXZlLW9wdGlvbnNpbWFnZXMtZm9ybVwiKTtcclxuXHJcbiAgICAgICAgbGV0IGRhdGFmb3JtID0gbmV3IEZvcm1EYXRhKG9yaWdpbmFsZm9ybSk7XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogXCIvRGFzaGJvYXJkL1VwbG9hZEltYWdlXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhOiBkYXRhZm9ybSxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBwcm9jZXNzRGF0YTogZmFsc2UsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogUmVzcG9uc2VVSSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuVHlwZSA9PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIEZvcm1hdEVycm9ycyhkYXRhKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5wZXJmaWxcIikuYXR0cihcInNyY1wiLCBkYXRhLk1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59KTtcclxuXHJcblxyXG4vL1BydWViYSBkZSBsYSBheXVkYVxyXG4vL0PDs2RpZ28gcGFyYSBtb3N0cmFyIGxhIGF5dWRhXHJcbiQoXCIjaWQtaGVscC11c2VyLW9wdGlvbnNcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBsZXQgdGhhdCA9ICQodGhpcylbMF07XHJcbiAgICBzaG93aGVscCh0aGF0LCBcIi9EYXNoYm9hcmQvSGVscFwiLCBcIi5oZWxwLXVzZXJvcHRpb25zXCIpO1xyXG59KTtcclxuXHJcblxyXG4vL2NhbWJpbyBkZSBlbXByZXNhXHJcbiQoJyNDaGFuZ2VDb21wYW55Rm9ybScpLnN1Ym1pdChmdW5jdGlvbiAoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdmFyIGNvbnRhZG9yOiBudW1iZXIgPSAwO1xyXG4gICAgJChcIi5zZWxlY3RPcHRpb25Db21wYW5pZXNDaGFuZ2VbdHlwZT1jaGVja2JveF1cIikuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSkge1xyXG4gICAgICAgICAgICBjb250YWRvcisrO1xyXG4gICAgICAgICAgICBsZXQgaW5wdXQgPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpO1xyXG4gICAgICAgICAgICBpbnB1dC5hdHRyKFwibmFtZVwiLCBcImNvbXBhbnlpZENoYW5nZVwiKTtcclxuICAgICAgICAgICAgaW5wdXQuYXR0cihcImNsYXNzXCIsIFwiY29tcGFueWlkQ2hhbmdlXCIpO1xyXG4gICAgICAgICAgICBpbnB1dC52YWwoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKFwiLmNvbXBhbnlJZHRibFwiKS5odG1sKCkudHJpbSgpKTtcclxuICAgICAgICAgICAgJChcIiNDaGFuZ2VDb21wYW55Rm9ybVwiKS5hcHBlbmQoaW5wdXQpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChjb250YWRvciA9PT0gMCkge1xyXG4gICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsKhRGViZSBzZWxlY2Npb25hciB1biByZWdpc3RybyFcIiwgXCJlcnJvclwiKTtcclxuICAgIH1cclxuXHJcbiAgICBlbHNlIGlmIChjb250YWRvciA+IDEpIHtcclxuICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCoURlYmUgc2VsZWNjaW9uYXIgc29sbyB1biByZWdpc3RybyFcIiwgXCJlcnJvclwiKTtcclxuXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKHsgYmFja2Ryb3A6ICdzdGF0aWMnLCBrZXlib2FyZDogZmFsc2UgfSlcclxuXHJcbiAgICAgICAgJC5hamF4KHtcclxuXHJcbiAgICAgICAgICAgIHVybDogXCIvRGFzaGJvYXJkL1NhdmVDaGFuZ2VDb21wYW55Rm9ybVwiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgZGF0YTogJChcIiNDaGFuZ2VDb21wYW55Rm9ybVwiKS5zZXJpYWxpemUoKSxcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBSZXNwb25zZVVJKSB7XHJcbiAgICAgICAgICAgICAgICAkKFwiLk1vZENvbXBhbmllc0FzaW5nXCIpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuVHlwZSA9PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBGb3JtYXRFcnJvcnMoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vaWYgKHdpbmRvdy5sb2NhdGlvbi5ocmVmLmluY2x1ZGVzKFwiRXJyb3JLZXlMaWNlbnNlXCIpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvRGFzaGJvYXJkL1ByaW5jaXBhbFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgbG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgU2VuZE5vdGlmaWNhdGlvbigkKFwiLmNvbXBhbnlpZENoYW5nZVwiKS52YWwoKS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSk7Il19