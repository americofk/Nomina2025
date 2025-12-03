/**
 * @file Navigation.ts
 * @description Módulo de navegación del sistema. Maneja el menú lateral,
 *              opciones de usuario y navegación entre módulos.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module Navegacion
 */
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
//ir al listado de auditoría ISO 27001
$('.auditoria').on('click', function () {
    window.location.href = "/auditoria#Configuración";
});
//ir al módulo de prestaciones laborales
$('.prestacioneslaborales').on('click', function () {
    window.location.href = "/prestacioneslaborales#Recursos%20humanos";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTmF2aWdhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL1R5cGVTY3JpcHRGaWxlL05hdmlnYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7R0FPRztBQUVILDhEQUE4RDtBQUM5RCxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRTtJQUMxQiw2Q0FBNkM7SUFDN0MsSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLHNCQUFzQixDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDakUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUNyRCxDQUFDLENBQUMsQ0FBQztBQUVILENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUN0QixJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsc0JBQXNCLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUNqRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBQ3hELENBQUMsQ0FBQyxDQUFDO0FBRUgseUNBQXlDO0FBQ3pDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFO0lBQ3JCLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUU5QywrQ0FBK0M7SUFDL0MsTUFBTSxXQUFXLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQy9ELFlBQVksQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUV0RSx1REFBdUQ7SUFDdkQsSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUNkLENB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QUFvQixDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUV0QyxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksT0FBTyxFQUFFLENBQUM7b0JBQ3ZCLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdkIsQ0FBQztxQkFBTSxDQUFDO29CQUNKLHlEQUF5RDtvQkFFekQsb0RBQW9EO29CQUNwRCxVQUFVO29CQUNWLHlCQUF5QjtvQkFDekIsR0FBRztvQkFDSCxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO2dCQUM3RCxDQUFDO1lBQ0wsQ0FBQyxFQUFFLEtBQUssRUFBRSxVQUFVLEdBQUc7Z0JBQ25CLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzlCLENBQUM7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGZpbGUgTmF2aWdhdGlvbi50c1xyXG4gKiBAZGVzY3JpcHRpb24gTcOzZHVsbyBkZSBuYXZlZ2FjacOzbiBkZWwgc2lzdGVtYS4gTWFuZWphIGVsIG1lbsO6IGxhdGVyYWwsXHJcbiAqICAgICAgICAgICAgICBvcGNpb25lcyBkZSB1c3VhcmlvIHkgbmF2ZWdhY2nDs24gZW50cmUgbcOzZHVsb3MuXHJcbiAqIEBhdXRob3IgRXF1aXBvIGRlIERlc2Fycm9sbG9cclxuICogQGRhdGUgMjAyNVxyXG4gKiBAbW9kdWxlIE5hdmVnYWNpb25cclxuICovXHJcblxyXG4vLy0tLS0tLSBjbGljayBlbiBlbCB1c3VhcmlvIGFsIGZpbmFsIGRlIGxhIGNhYmVjZXJhIC0tLS0tLS0tLVxyXG4kKCcuZGl2MnVzdWFyaW8nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAvKiAkKCcuZGF0b3N1c3VhcmlvJykudG9nZ2xlQ2xhc3MoJ0FicmlyJyk7Ki9cclxuICAgIHZhciBzaWRlYmFyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInNpZGViYXItb3B0aW9uc1wiKTtcclxuICAgIHNpZGViYXJbMF0uY2xhc3NMaXN0LmFkZChcInNpZGViYXItb3B0aW9ucy1vcGVuXCIpO1xyXG59KTtcclxuXHJcbiQoXCIuY2xvc2Utb3B0aW9uc1wiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgc2lkZWJhciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzaWRlYmFyLW9wdGlvbnNcIik7XHJcbiAgICBzaWRlYmFyWzBdLmNsYXNzTGlzdC5yZW1vdmUoXCJzaWRlYmFyLW9wdGlvbnMtb3BlblwiKTtcclxufSk7XHJcblxyXG4vL1BhcmEgYWdyYW5kYXIgbyBlbmNvZ2VyIGVsIG1lbnUgbGF0ZXJhbFxyXG4kKCcuZGVsYWRvJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgJCgnLnNpZGViYXInKS50b2dnbGVDbGFzcygnc2lkZWJhci1jb2xsYXBzZScpO1xyXG5cclxuICAgIC8vIFBlcnNpc3RpciBlbCBlc3RhZG8gZGVsIG1lbsO6IGVuIGxvY2FsU3RvcmFnZVxyXG4gICAgY29uc3QgaXNDb2xsYXBzZWQgPSAkKCcuc2lkZWJhcicpLmhhc0NsYXNzKCdzaWRlYmFyLWNvbGxhcHNlJyk7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbWVudUNvbGxhcHNlZCcsIGlzQ29sbGFwc2VkID8gJ3RydWUnIDogJ2ZhbHNlJyk7XHJcblxyXG4gICAgLy8gQWN0dWFsaXphciBjbGFzZSBlbiBib2R5IHBhcmEgY29udHJvbGFyIGVsIGNvbnRlbmlkb1xyXG4gICAgaWYgKGlzQ29sbGFwc2VkKSB7XHJcbiAgICAgICAgJCgnYm9keScpLmFkZENsYXNzKCdtZW51LWNvbGxhcHNlZCcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ21lbnUtY29sbGFwc2VkJyk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLy8gUmVzdGF1cmFyIGVsIGVzdGFkbyBkZWwgbWVuw7ogYWwgY2FyZ2FyIGxhIHDDoWdpbmFcclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc3QgbWVudUNvbGxhcHNlZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdtZW51Q29sbGFwc2VkJyk7XHJcblxyXG4gICAgaWYgKG1lbnVDb2xsYXBzZWQgPT09ICd0cnVlJykge1xyXG4gICAgICAgICQoJy5zaWRlYmFyJykuYWRkQ2xhc3MoJ3NpZGViYXItY29sbGFwc2UnKTtcclxuICAgICAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ21lbnUtY29sbGFwc2VkJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgICQoJy5zaWRlYmFyJykucmVtb3ZlQ2xhc3MoJ3NpZGViYXItY29sbGFwc2UnKTtcclxuICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ21lbnUtY29sbGFwc2VkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmVzdGF1cmFyIGVzdGFkbyBkZSBzdWJtZW7DunMgZGVzZGUgbG9jYWxTdG9yYWdlXHJcbiAgICBjb25zdCBvcGVuTWVudXMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdvcGVuTWVudXMnKSB8fCAnW10nKTtcclxuICAgIG9wZW5NZW51cy5mb3JFYWNoKGZ1bmN0aW9uIChtZW51SWQ6IHN0cmluZykge1xyXG4gICAgICAgICQoJyMnICsgbWVudUlkKS5hZGRDbGFzcygnbWVudS1vcGVuJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBNYXJjYXIgY29tbyBsaXN0byBwYXJhIG1vc3RyYXIgZWwgY29udGVuaWRvIHNpbiBwZXN0YcOxZW9cclxuICAgICQoJ2JvZHknKS5hZGRDbGFzcygnbWVudS1yZWFkeScpO1xyXG59KTtcclxuXHJcbi8vIFRvZ2dsZSBkZSBzdWJtZW7DunMgYWwgaGFjZXIgY2xpYyBlbiBtZW7DuiBwcmluY2lwYWxcclxuJCgnLnNpZGViYXIgLnNpZGViYXItbWVudSAuaXRlbSAubWVudS1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIGNvbnN0IGl0ZW0gPSAkKHRoaXMpLnBhcmVudCgnLml0ZW0nKTtcclxuICAgIGNvbnN0IG1lbnVJZCA9IGl0ZW0uYXR0cignaWQnKTtcclxuXHJcbiAgICAvLyBUb2dnbGUgY2xhc2UgbWVudS1vcGVuXHJcbiAgICBpdGVtLnRvZ2dsZUNsYXNzKCdtZW51LW9wZW4nKTtcclxuXHJcbiAgICAvLyBHdWFyZGFyIGVzdGFkbyBlbiBsb2NhbFN0b3JhZ2VcclxuICAgIGxldCBvcGVuTWVudXMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdvcGVuTWVudXMnKSB8fCAnW10nKTtcclxuXHJcbiAgICBpZiAoaXRlbS5oYXNDbGFzcygnbWVudS1vcGVuJykpIHtcclxuICAgICAgICAvLyBBZ3JlZ2FyIGFsIGFycmF5IHNpIG5vIGV4aXN0ZVxyXG4gICAgICAgIGlmIChvcGVuTWVudXMuaW5kZXhPZihtZW51SWQpID09PSAtMSkge1xyXG4gICAgICAgICAgICBvcGVuTWVudXMucHVzaChtZW51SWQpO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gUXVpdGFyIGRlbCBhcnJheVxyXG4gICAgICAgIG9wZW5NZW51cyA9IG9wZW5NZW51cy5maWx0ZXIoZnVuY3Rpb24gKGlkOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGlkICE9PSBtZW51SWQ7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ29wZW5NZW51cycsIEpTT04uc3RyaW5naWZ5KG9wZW5NZW51cykpO1xyXG59KTtcclxuXHJcbi8vY2VycmFyIG1vZHVsb3MgcGFyYSBpciBhdHJhc1xyXG4kKFwiLkNsb3NlLWJhY2tcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgd2luZG93Lmhpc3RvcnkuZ28oLTEpO1xyXG59KTtcclxuXHJcbi8vY2VycmFyIG1vZHVsb3MgcGFyYSBpciBhbCBkYXNoYm9hcmRcclxuJChcIi5DZXJyYXJNb2R1bG9cIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9EYXNoYm9hcmQvUHJpbmNpcGFsXCI7XHJcbn0pO1xyXG5cclxuLy9cclxuJChcIi5UaXR1bG8xXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvRGFzaGJvYXJkL1ByaW5jaXBhbFwiO1xyXG59KTtcclxuXHJcblxyXG4vL0FjdHVhbGl6YXIgcGFnaW5hXHJcbiQoXCIuT3BjQWN0dWFsaXphclwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAkLmdldChsb2NhdGlvbi5ocmVmKVxyXG4gICAgICAgIC5kb25lKGZ1bmN0aW9uIChyKSB7XHJcbiAgICAgICAgICAgIHZhciBuZXdEb20gPSAkKHIpO1xyXG4gICAgICAgICAgICAkKCcjTWFpblRhYmxlJykucmVwbGFjZVdpdGgoJCgnI01haW5UYWJsZScsIG5ld0RvbSkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxufSk7XHJcblxyXG5cclxuLy9tb3N0cmFyIGxpc3RhIGRlIGNsaWVudGVzIGFzaWduYWRvc1xyXG4kKCcuY2hhbmdlQ29tcGFueScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICQoJy5Nb2RDb21wYW5pZXNBc2luZycpLm1vZGFsKFwic2hvd1wiKTtcclxufSk7XHJcblxyXG4vLy8vY2FtYmlhciBkZSBjb21wYcOxaWFcclxuLy9mdW5jdGlvbiBTZWxlY0NvbXBhbnkoX05hbWUsIF9jb21wYW55SWQpIHtcclxuLy8gICAgJCgnLk1vZEN1c3RvbWVycycpLm1vZGFsKCdoaWRlJyk7XHJcbi8vICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKHsgYmFja2Ryb3A6ICdzdGF0aWMnLCBrZXlib2FyZDogZmFsc2UgfSlcclxuXHJcbi8vICAgICQuYWpheCh7XHJcbi8vICAgICAgICB1cmw6IFwiL0Rhc2hib2FyZC9DaGFuZ2VDb21wYW55XCIsXHJcbi8vICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuLy8gICAgICAgIGRhdGE6IHtcclxuXHJcbi8vICAgICAgICAgICAgX25hbWU6IF9OYW1lLFxyXG4vLyAgICAgICAgICAgIF9jb2RlQ29tcGFueTogX2NvbXBhbnlJZFxyXG5cclxuXHJcbi8vICAgICAgICB9LFxyXG4vLyAgICAgICAgYXN5bmM6IHRydWUsXHJcbi8vICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4vLyAgICAgICAgICAgIGlmIChkYXRhID09IDEpIHtcclxuLy8gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9EYXNoYm9hcmQvUHJpbmNpcGFsXCI7XHJcblxyXG4vLyAgICAgICAgICAgIH0gZWxzZSB7XHJcbi8vICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIkVycm9yIGVuIGVsIGNhbWJpbyBkZSBlbXByZXNhXCIsIFwiZXJyb3JcIik7XHJcbi8vICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvRGFzaGJvYXJkL0luZGV4XCI7XHJcbi8vICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4vLyAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuLy8gICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4vLyAgICAgICAgfVxyXG4vLyAgICB9KTtcclxuLy99XHJcblxyXG4vL2lyIGFsIG1hZXN0cm8gZGUgZGVwYXJ0YW1lbnRvcyBhY3Rpdm9zIFxyXG4kKCcuTURlcGFydGFtZW50b3MnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL2RlcGFydGFtZW50b3NhY3Rpdm9zI1JlY3Vyc29zJTIwaHVtYW5vc1wiO1xyXG59KTtcclxuXHJcbi8vaXIgYWwgbGlzdGFkbyBkZSBjYXJnYSBtYXNpdmFcclxuJCgnLkNhcmdhTWFzaXZhJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9oaXN0b3JpYWxsb3RlcyNDb25maWd1cmFjacOzblwiO1xyXG59KTtcclxuXHJcbi8vaXIgYWwgbWFlc3RybyBkZSBpbXB1ZXN0b3NcclxuJCgnLlRheENvZGUnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL2ltcHVlc3RvcyNDb25maWd1cmFjacOzblwiO1xyXG59KTtcclxuXHJcbi8vaXIgYWwgbWFlc3RybyBkZSBkZXBhcnRhbWVudG9zIGluYWN0aXZvc1xyXG4kKCcuTWRlcGFydGFtZW50SW5hYycpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvZGVwYXJ0YW1lbnRvc2luYWN0aXZvcyNSZWN1cnNvcyUyMGh1bWFub3NcIjtcclxufSk7XHJcblxyXG4vL2lyIGEgbGlzdGEgZGUgcHJveWVjdG9zIGluYWN0aXZvc1xyXG4kKCcuUHJvamVjdC1kaXNhYmxlZCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvcHJveWVjdG9zaW5hY3Rpdm9zI0NvbmZpZ3VyYWNpw7NuXCI7XHJcbn0pO1xyXG5cclxuLy8gaXIgYWwgbWFlc3RybyBkZSBub21pbmFcclxuJCgnLk1Ob21pbmFzJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9ub21pbmEjQ29uZmlndXJhY2nDs25cIjtcclxufSk7XHJcblxyXG4vL2lyIGFsIG1hZXN0cm8gZGUgdXN1YXJpb1xyXG4kKCcuTVVzZXInKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL3VzdWFyaW9zI0NvbmZpZ3VyYWNpw7NuXCI7XHJcbn0pO1xyXG5cclxuLy9pciBhbCBtYWVzdHJvIGRlIHRpcG9zIGRlIGN1cnNvc1xyXG4kKCcuVHlwZUNvdXJzZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvdGlwb2N1cnNvcyNDdXJzb3NcIjtcclxufSk7XHJcblxyXG5cclxuXHJcbi8vaXIgYWwgbWFlc3RybyBkZSBpbnN0cnVjdG9yZXNcclxuJCgnLkluc3RydWN0b3JzQ291cnNlJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9pbnN0cnVjdG9yI0N1cnNvc1wiO1xyXG59KTtcclxuXHJcbi8vaXIgYWwgbWFlc3RybyBkZSB1YmljYWNpb24gZGUgY3Vyc29zXHJcbiQoJy5Db3Vyc2VMb2NhdGlvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvdWJpY2FjaW9uY3Vyc29zI0N1cnNvc1wiO1xyXG59KTtcclxuXHJcbi8vaXIgYWwgbWFlc3RybyBkZSB1YmljYWNpb24gZGUgY3Vyc29zXHJcbiQoJy5DbGFzc1Jvb20nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL3NhbG9uZXNjdXJzbyNDdXJzb3NcIjtcclxufSk7XHJcblxyXG4vL2lyIGFsIG1hZXN0cm8gZGUgIGN1cnNvc1xyXG4kKCcuQ291cnNlJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9jdXJzb3MjQ3Vyc29zXCI7XHJcbn0pO1xyXG5cclxuLy9pciBhbCBtYWVzdHJvIGRlIGNhcmdvcyBhY3Rpdm9zICBcclxuJCgnLkpvYnNFbmFibGUnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL2Nhcmdvc2FjdGl2b3MjUmVjdXJzb3MlMjBodW1hbm9zXCI7XHJcbn0pO1xyXG5cclxuLy9pciBhbCBtYWVzdHJvIGRlIGNhcmdvcyBpbmFjdGl2b3NcclxuJCgnLkpvYnNEaXNlYmxlZCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvY2FyZ29zaW5hY3Rpdm9zI1JlY3Vyc29zJTIwaHVtYW5vc1wiO1xyXG59KTtcclxuXHJcbi8vaXIgYWwgbWFlc3RybyBkZSBwdWVzdG9zIGFjdGl2b3NcclxuJCgnLlBvc2l0aW9uRW5hYmxlZCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvcHVlc3Rvc2FjdGl2b3MjUmVjdXJzb3MlMjBodW1hbm9zXCI7XHJcbn0pO1xyXG5cclxuLy9pciBhbCBtYWVzdHJvIGRlIHB1ZXN0b3MgaW5hY3Rpdm9zXHJcbiQoJy5Qb3NpdGlvbkRpc2VibGVkJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9wdWVzdG9zaW5hY3Rpdm9zI1JlY3Vyc29zJTIwaHVtYW5vc1wiO1xyXG59KTtcclxuXHJcbi8vaXIgYWwgbWFlc3RybyBkZSB2YWNhbnRlc1xyXG4kKCcuVmFjYW50cycpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvdmFjYW50ZXMjUmVjdXJzb3MlMjBodW1hbm9zXCI7XHJcbn0pO1xyXG5cclxuLy9pciBhbCBtYWVzdHJvIGRlIGVtcGxlYWRvc1xyXG4kKCcuRW1wbG95ZWUnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL2VtcGxlYWRvc2FjdGl2b3M/d29ya1N0YXR1cz0yI1JlY3Vyc29zJTIwaHVtYW5vc1wiO1xyXG59KTtcclxuXHJcbi8vaXIgYWwgbWFlc3RybyBkZSBjw7NkaWdvcyBkZSBnYW5hbmNpYXNcclxuJCgnLkVhcm5pbmctY29kZXMnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL2NvZGlnb3NnYW5hbmNpYXMjQ29uZmlndXJhY2nDs25cIjtcclxufSk7XHJcblxyXG5cclxuLy9pciBhbCBtYWVzdHJvIGRlIGPDs2RpZ29zIGRlIGRlZHVjY2lvbmVzXHJcbiQoJy5EZWR1Y3Rpb25Db2RlJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9jb2RpZ29zZGVkdWNjaW9uI0NvbmZpZ3VyYWNpw7NuXCI7XHJcbn0pO1xyXG5cclxuLy9pciBhbCBtYWVzdHJvIGRlIHByb2Nlc29zIGRlIG7Ds21pbmFcclxuJCgnLlByb2Nlc3NQYXlyb2xsJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9wcm9jZXNvbm9taW5hI07Ds21pbmFzXCI7XHJcbn0pO1xyXG5cclxuLy9pciBhbCBtYWVzdHJvIGRlIHByb3llY3Rvc1xyXG4kKCcuUHJvamVjdHMnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL3Byb3llY3Rvc2FjdGl2b3MjQ29uZmlndXJhY2nDs25cIjtcclxufSk7XHJcblxyXG4vL2lyIGEgY2F0ZWdvcmlhcyBkZSBwcm95ZWN0b3MgaW5hY3RpdmFzXHJcbiQoJy5Qcm9qZWN0LWNhdGVnb3J5LWRpc2FibGVkJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9jYXRlZ29yaWFwcm95ZWN0b2luYWN0aXZhcyNDb25maWd1cmFjacOzblwiO1xyXG59KTtcclxuXHJcbi8vaXIgYWwgbWFlc3RybyBkZSBjYW5kaWRhdG9zIGEgZW1wbGVhZG9zXHJcbiQoJy5FbXBsb3llZUNhbmRpZGF0ZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvZW1wbGVhZG9zYWN0aXZvcz93b3JrU3RhdHVzPTAjUmVjdXJzb3MlMjBodW1hbm9zXCI7XHJcbn0pO1xyXG5cclxuLy9pciBhbCBtYWVzdHJvIGV4IGVtcGxlYWRvc1xyXG4kKCcuRGlzbWlzc2VkRW1wbG95ZWUnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL2VtcGxlYWRvc2FjdGl2b3M/d29ya1N0YXR1cz0xI1JlY3Vyc29zJTIwaHVtYW5vc1wiO1xyXG59KTtcclxuXHJcblxyXG4vL2lyIGFsIG1hZXN0cm8gZGUgY2F0ZWdvcmlhcyBkZSBwcm95ZWN0b3NcclxuJCgnLlBvcmplY3RDYXRlZ29yeScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvY2F0ZWdvcmlhcHJveWVjdG9hY3RpdmFzI0NvbmZpZ3VyYWNpw7NuXCI7XHJcbn0pO1xyXG5cclxuLy9pciBhbCBtYWVzdHJvIGRlIGPDs2RpZ29zIGRlIHByZXN0YW1vcyBcclxuJCgnLkxvYW5zRW5hYmxlZCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvcHJlc3RhbW9zI0NvbmZpZ3VyYWNpw7NuXCI7XHJcbn0pO1xyXG5cclxuLy9pciBhbCBtYWVzdHJvIGRlIGRpYXMgZmVyaWFkb3NcclxuJCgnLk1ob2xpZGF5cycpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvY2FsZW5kYXJob2xpZGF5I0NvbmZpZ3VyYWNpw7NuXCI7XHJcbn0pO1xyXG5cclxuLy9pciBhbCByZXBvcnRlIGRlIHBhZ29zIGRlIG7Ds21pbmFcclxuJCgnLlBhZ29zZGVub21pbmEnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB3aW5kb3cub3BlbihcIi9yZXBvcnRlcy9wYWdvc2Rlbm9taW5hXCIsJ19ibGFuaycpO1xyXG59KTtcclxuXHJcbi8vaXIgYWwgcmVwb3J0ZSByZXN1bWVuIGRlIG7Ds21pbmFcclxuJCgnLkRheXJvbGxTdW1tYXJ5Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgd2luZG93Lm9wZW4oXCIvcmVwb3J0ZXMvcmVzdW1lbnBhZ29zZGVub21pbmFcIiwnX2JsYW5rJyk7XHJcbn0pO1xyXG5cclxuLy9pciBhbCByZXBvcnRlIGRlIHRzc1xyXG4kKCcucmVwb3J0LXRzcycpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIHdpbmRvdy5vcGVuKFwiL3JlcG9ydGVzL3Rzc1wiLCdfYmxhbmsnKTtcclxufSk7XHJcblxyXG4vL2lyIGFsIHJlcG9ydGUgZGUgbsOzbWluYVxyXG4kKCcuUGF5cm9sbFJlcG9ydCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIHdpbmRvdy5vcGVuKFwiL3JlcG9ydGVzL3JlcG9ydGVub21pbmFcIiwnX2JsYW5rJyk7XHJcbn0pO1xyXG5cclxuLy9pciBhbCByZXBvcnRlIGRlIERHVC00XHJcbiQoJy5yZXBvcnQtZGd0NCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIHdpbmRvdy5vcGVuKFwiL3JlcG9ydGVzL2RndDRcIiwgJ19ibGFuaycpO1xyXG59KTtcclxuXHJcbi8vaXIgYWwgcmVwb3J0ZSBkZSBER1QtMlxyXG4kKCcucmVwb3J0LWRndDInKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB3aW5kb3cub3BlbihcIi9yZXBvcnRlcy9kZ3QyXCIsICdfYmxhbmsnKTtcclxufSk7XHJcblxyXG4vL2lyIGFsIHJlcG9ydGUgZGUgREdULTNcclxuJCgnLnJlcG9ydC1kZ3QzJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgd2luZG93Lm9wZW4oXCIvcmVwb3J0ZXMvZGd0M1wiLCAnX2JsYW5rJyk7XHJcbn0pO1xyXG5cclxuLy9pciBhbCByZXBvcnRlIGRlIERHVC01XHJcbiQoJy5yZXBvcnQtZGd0NScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIHdpbmRvdy5vcGVuKFwiL3JlcG9ydGVzL2RndDVcIiwgJ19ibGFuaycpO1xyXG59KTtcclxuXHJcbi8vaXIgYWwgcmVwb3J0ZSBkZSBER1QtOVxyXG4kKCcucmVwb3J0LWRndDknKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB3aW5kb3cub3BlbihcIi9yZXBvcnRlcy9kZ3Q5XCIsICdfYmxhbmsnKTtcclxufSk7XHJcblxyXG4vL2lyIGFsIHJlcG9ydGUgZGUgREdULTExXHJcbiQoJy5yZXBvcnQtZGd0MTEnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB3aW5kb3cub3BlbihcIi9yZXBvcnRlcy9kZ3QxMVwiLCAnX2JsYW5rJyk7XHJcbn0pO1xyXG5cclxuLy9pciBhbCByZXBvcnRlIGRlIERHVC0xMlxyXG4kKCcucmVwb3J0LWRndDEyJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgd2luZG93Lm9wZW4oXCIvcmVwb3J0ZXMvZGd0MTJcIiwgJ19ibGFuaycpO1xyXG59KTtcclxuXHJcbi8vaXIgYWwgbGlzdGFkbyBkZSBhdWRpdG9yw61hIElTTyAyNzAwMVxyXG4kKCcuYXVkaXRvcmlhJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9hdWRpdG9yaWEjQ29uZmlndXJhY2nDs25cIjtcclxufSk7XHJcblxyXG4vL2lyIGFsIG3Ds2R1bG8gZGUgcHJlc3RhY2lvbmVzIGxhYm9yYWxlc1xyXG4kKCcucHJlc3RhY2lvbmVzbGFib3JhbGVzJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9wcmVzdGFjaW9uZXNsYWJvcmFsZXMjUmVjdXJzb3MlMjBodW1hbm9zXCI7XHJcbn0pO1xyXG5cclxuLy9pciBhbCByZXBvcnRlIGRlIHRvZG9zIGxvcyBlbXBsZWFkb3NcclxuJCgnLnJlcG9ydC1hbGwtZW1wbG95ZWUnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB3aW5kb3cub3BlbihcIi9yZXBvcnRlcy9yZXBvcnRlZW1wbGVhZG9zXCIsICdfYmxhbmsnKTtcclxufSk7XHJcblxyXG5cclxuJCgnLnNhdmUtb3B0aW9uc2RlZmF1bHRzLWZvcm0nKS5zdWJtaXQoZnVuY3Rpb24gKGUpIHtcclxuICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHdpbmRvd3NfbWVzc2FnZShcIsK/RGVzZWEgZ3VhcmRhciBsb3MgY2FtYmlvcz9cIiwgXCJjb25maXJtXCIsIHtcclxuICAgICAgICBvbk9rOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKHsgYmFja2Ryb3A6ICdzdGF0aWMnLCBrZXlib2FyZDogZmFsc2UgfSlcclxuICAgICAgICAgICAgJC5hamF4KHtcclxuXHJcbiAgICAgICAgICAgICAgICB1cmw6IFwiL0Rhc2hib2FyZC9TYXZlT3BjaW9uZXNEZWZhdWx0VXNlclwiLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiAkKHRoYXQpLnNlcmlhbGl6ZSgpLFxyXG4gICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogUmVzcG9uc2VVSSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLlR5cGUgPT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfZXJyb3JzOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLkVycm9ycy5mb3JFYWNoKGZ1bmN0aW9uICh4OiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9lcnJvcnMgKz0gYCR7eH08YnI+YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShfZXJyb3JzLCBkYXRhLlR5cGUsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uT2s6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoZGF0YS5NZXNzYWdlLCBkYXRhLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpOyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0pO1xyXG5cclxuXHJcbiQoXCIuSW1hZ2VQZXJmaWxcIikuY2hhbmdlKGZ1bmN0aW9uIChlKSB7XHJcbiAgICBsZXQgX2RhdG8gPSB0aGlzIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICBpZiAoX2RhdG8uZmlsZXMgIT0gbnVsbCkge1xyXG4gICAgICAgIGxldCBvcmlnaW5hbGZvcm06IEhUTUxGb3JtRWxlbWVudDtcclxuICAgICAgICBvcmlnaW5hbGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNhdmUtb3B0aW9uc2ltYWdlcy1mb3JtXCIpO1xyXG5cclxuICAgICAgICBsZXQgZGF0YWZvcm0gPSBuZXcgRm9ybURhdGEob3JpZ2luYWxmb3JtKTtcclxuXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBcIi9EYXNoYm9hcmQvVXBsb2FkSW1hZ2VcIixcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6IGRhdGFmb3JtLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHByb2Nlc3NEYXRhOiBmYWxzZSxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBSZXNwb25zZVVJKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5UeXBlID09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgRm9ybWF0RXJyb3JzKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLnBlcmZpbFwiKS5hdHRyKFwic3JjXCIsIGRhdGEuTWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuXHJcbi8vUHJ1ZWJhIGRlIGxhIGF5dWRhXHJcbi8vQ8OzZGlnbyBwYXJhIG1vc3RyYXIgbGEgYXl1ZGFcclxuJChcIiNpZC1oZWxwLXVzZXItb3B0aW9uc1wiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCB0aGF0ID0gJCh0aGlzKVswXTtcclxuICAgIHNob3doZWxwKHRoYXQsIFwiL0Rhc2hib2FyZC9IZWxwXCIsIFwiLmhlbHAtdXNlcm9wdGlvbnNcIik7XHJcbn0pO1xyXG5cclxuXHJcbi8vY2FtYmlvIGRlIGVtcHJlc2FcclxuJCgnI0NoYW5nZUNvbXBhbnlGb3JtJykuc3VibWl0KGZ1bmN0aW9uIChlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB2YXIgY29udGFkb3I6IG51bWJlciA9IDA7XHJcbiAgICAkKFwiLnNlbGVjdE9wdGlvbkNvbXBhbmllc0NoYW5nZVt0eXBlPWNoZWNrYm94XVwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpKSB7XHJcbiAgICAgICAgICAgIGNvbnRhZG9yKys7XHJcbiAgICAgICAgICAgIGxldCBpbnB1dCA9ICQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSk7XHJcbiAgICAgICAgICAgIGlucHV0LmF0dHIoXCJuYW1lXCIsIFwiY29tcGFueWlkQ2hhbmdlXCIpO1xyXG4gICAgICAgICAgICBpbnB1dC5hdHRyKFwiY2xhc3NcIiwgXCJjb21wYW55aWRDaGFuZ2VcIik7XHJcbiAgICAgICAgICAgIGlucHV0LnZhbCgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoXCIuY29tcGFueUlkdGJsXCIpLmh0bWwoKS50cmltKCkpO1xyXG4gICAgICAgICAgICAkKFwiI0NoYW5nZUNvbXBhbnlGb3JtXCIpLmFwcGVuZChpbnB1dCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKGNvbnRhZG9yID09PSAwKSB7XHJcbiAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwqFEZWJlIHNlbGVjY2lvbmFyIHVuIHJlZ2lzdHJvIVwiLCBcImVycm9yXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGVsc2UgaWYgKGNvbnRhZG9yID4gMSkge1xyXG4gICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsKhRGViZSBzZWxlY2Npb25hciBzb2xvIHVuIHJlZ2lzdHJvIVwiLCBcImVycm9yXCIpO1xyXG5cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoeyBiYWNrZHJvcDogJ3N0YXRpYycsIGtleWJvYXJkOiBmYWxzZSB9KVxyXG5cclxuICAgICAgICAkLmFqYXgoe1xyXG5cclxuICAgICAgICAgICAgdXJsOiBcIi9EYXNoYm9hcmQvU2F2ZUNoYW5nZUNvbXBhbnlGb3JtXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhOiAkKFwiI0NoYW5nZUNvbXBhbnlGb3JtXCIpLnNlcmlhbGl6ZSgpLFxyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IFJlc3BvbnNlVUkpIHtcclxuICAgICAgICAgICAgICAgICQoXCIuTW9kQ29tcGFuaWVzQXNpbmdcIikubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5UeXBlID09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIEZvcm1hdEVycm9ycyhkYXRhKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9pZiAod2luZG93LmxvY2F0aW9uLmhyZWYuaW5jbHVkZXMoXCJFcnJvcktleUxpY2Vuc2VcIikpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9EYXNoYm9hcmQvUHJpbmNpcGFsXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgLy99IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgICAgICBTZW5kTm90aWZpY2F0aW9uKCQoXCIuY29tcGFueWlkQ2hhbmdlXCIpLnZhbCgpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59KTsiXX0=