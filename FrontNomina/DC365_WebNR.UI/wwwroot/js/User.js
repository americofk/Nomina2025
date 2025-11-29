/**
 * @file User.ts
 * @description Módulo de gestión de usuarios del sistema. Permite crear, editar,
 *              eliminar usuarios y administrar roles y permisos de acceso.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module Usuarios
 */
variables: {
    var defaultimage = "/Images/Dashboard/default_perfil.png";
    var option;
}
//Arreglo de funciones
const fn = {
    //Configurar elementos del dom al editar o crear nuevo
    EditAndNewSettings: function (option) {
        if (option == "edit") {
            $('.setiartitulo').text("Editar usuario");
            $("#Alias").attr("readonly", "readonly");
            $("#Email").attr("readonly", "readonly");
            /*            $("#Email").prop('disabled', true);*/
            $('.Contempresa').removeClass('collapse');
            $('.contImputDatosPersonalesFoto').removeClass('collapse');
            $('.Showid').removeClass('collapse');
            fn.funtionNewAndEditUsers("open");
        }
        else {
            $('.setiartitulo').text("Nuevo usuario");
            $("#Alias").removeAttr("readonly");
            $("#Email").removeAttr("readonly");
            $('.contImputDatosPersonalesFoto').addClass('collapse');
            $('.Contempresa').addClass('collapse');
            $('.Showid').addClass('collapse');
            fn.funtionNewAndEditUsers("open");
        }
    },
    //funcion abrir nuevo usuario
    funtionNewAndEditUsers: function (_opcion) {
        if (_opcion == "open") {
            $('.ContenedorListEntity').addClass('collapse');
            $('.contNewEntyti').removeClass('collapse');
            $('.opcioneslistpage').addClass('collapse');
            $('.opcioneslistpageForm').removeClass('collapse');
        }
        else {
            $('.contendorRolandCompaies').addClass('collapse');
            $('.ContenedorListEntity').removeClass('collapse');
            $('.contNewEntyti').addClass('collapse');
            $('.opcioneslistpage').removeClass('collapse');
            $('.opcioneslistpageForm').addClass('collapse');
        }
    },
    //Limpia el formulario de guardar y editar
    ClearImput: function () {
        let form;
        form = document.getElementById("CreateAndEditUser");
        form.reset();
    },
    ////funtion crear y editar usuarios
    //CreateAndEditUsers: function () {
    //},
    //FuntionModelUsers: function () {
    //    let ElevationType: string = "2";
    //    let _CompanyDefaultId: string;
    //    if ($('.CompanyDefaultId').val() == null)
    //        _CompanyDefaultId = "";
    //    else
    //        _CompanyDefaultId = $('.CompanyDefaultId').val().toString();
    //    if ($(".ElevationType").is(":checked")) {
    //        ElevationType = "0";
    //    }
    //    var ModelUser: IUsers =
    //    {
    //        Name: $('.Name').val().toString(),
    //        Alias: $('.Alias').val().toString(),
    //        Email: $('.Email').val().toString(),
    //        FormatCodeId: $('.FormatCodeId').val().toString(),
    //        ElevationType: ElevationType,
    //        CompanyDefaultId: _CompanyDefaultId
    //    };
    //    return ModelUser;
    //},
    SearchRoltoUsers: function () {
        $.ajax({
            url: "/usuarios/BuscarRolUsuario",
            type: "GET",
            data: {
                Alias: $('#Alias').val().toString()
            },
            async: true,
            success: function (data) {
                if (data.length > 0) {
                    $("#AllTableRol").html('');
                    $("#AllTableRol").append(data);
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    },
    SearchCompanytoUsers: function () {
        $.ajax({
            url: "/usuarios/BuscarEmpresasUsuario",
            type: "GET",
            data: {
                Alias: $('#Alias').val().toString()
            },
            async: true,
            success: function (data) {
                if (data.length > 0) {
                    $("#AllTableCompany").html('');
                    $("#AllTableCompany").append(data);
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    },
    SearchCompaniesDropDownList: function (_id) {
        $.ajax({
            url: "/usuarios/BuscarListaEmpresa",
            type: "GET",
            data: {
                Alias: _id
            },
            async: false,
            success: function (data) {
                $(".CompanyDefaultId").html('');
                if (data.length > 0) {
                    var option = $(document.createElement('option'));
                    option.text("Seleccione...");
                    option.val("");
                    $(".CompanyDefaultId").append(option);
                    $(data).each(function () {
                        var option = $(document.createElement('option'));
                        option.text(this.CompanyName);
                        option.val(this.companyId);
                        $(".CompanyDefaultId").append(option);
                    });
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    },
    SearchImageUser: function (_alias) {
        $.ajax({
            url: "/usuarios/descargarimagen",
            type: "GET",
            data: {
                Alias: _alias
            },
            async: true,
            success: function (data) {
                if (data.Message != "") {
                    $("#FotoperfilDP").attr("src", data.Message);
                }
                else {
                    $("#FotoperfilDP").attr("src", defaultimage);
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    }
};
escuchadores: {
    //Crear nuevo usuario
    $('.NewUser').on('click', function () {
        option = 1;
        $("#FotoperfilDP").attr("src", defaultimage);
        fn.ClearImput();
        fn.EditAndNewSettings("new");
    });
    //Editar usuario
    $(".EditUsers").on("click", function () {
        let id;
        let contador = 0;
        // Recorremos todos los checkbox para contar los que estan seleccionados
        $(".selectUsers[type=checkbox]").each(function () {
            if ($(this).is(":checked")) {
                contador++;
                if (contador == 2) {
                    windows_message("¡Debe seleccionar un solo registro!", "error");
                    return false;
                }
                id = $(this).parent().parent().find(".Aliastbl").html().trim();
            }
        });
        if (contador != 2) {
            if (contador == 0) {
                windows_message("¡Debe seleccionar un registro!", "error");
            }
            else {
                $.ajax({
                    url: `/usuarios/${id}`,
                    type: "GET",
                    async: true,
                    success: function (data) {
                        $('.progreso').modal('hide');
                        if (data != null) {
                            option = 2;
                            fn.SearchCompaniesDropDownList(data.Alias);
                            fn.SearchImageUser(data.Alias);
                            fn.EditAndNewSettings("edit");
                            AutomaticBinding(data, "#CreateAndEditUser");
                            if (!data.ElevationTypeBool) {
                                //$('#ElevationType').prop("checked", true);
                                $('.contendorRolandCompaies').removeClass('collapse');
                                fn.SearchRoltoUsers();
                                fn.SearchCompanytoUsers();
                            }
                            else {
                                //$('#ElevationType').prop("checked", false);
                                $('.contendorRolandCompaies').addClass('collapse');
                            }
                        }
                        else {
                            windows_message("No se encontró el usuario", "error");
                        }
                    }, error: function (xhr) {
                        redireccionaralLogin(xhr);
                    }
                });
            }
        }
    });
    $('.OpCloseform').on('click', function () {
        $('.Showid').addClass('collapse');
        fn.funtionNewAndEditUsers("close");
    });
    // Variable para controlar si debe cerrar después de guardar
    var shouldCloseAfterSave = false;
    $('#CreateAndEditUser').submit(function (e) {
        e.preventDefault(); // Siempre prevenir el envío nativo del formulario
        if ($(this).valid()) {
            // Asignar DataAreaId desde el contenedor de la página
            var dataAreaId = $('#user-page').data('dataarea');
            if (dataAreaId) {
                $('#DataAreaId').val(dataAreaId);
            }
            $('.progreso').modal({ backdrop: 'static', keyboard: false });
            $.ajax({
                url: "/usuarios/guardar",
                type: "POST",
                data: $(this).serialize() + `&operacion=${option}`,
                async: true,
                success: function (data) {
                    $('.progreso').modal('hide');
                    if (data.Type == "error") {
                        FormatErrors(data);
                    }
                    else {
                        $.get(location.href)
                            .done(function (r) {
                            var newDom = $(r);
                            $('.tblUser').replaceWith($('.tblUser', newDom));
                        });
                        windows_message(data.Message, data.Type);
                        // Si era creacion y se devolvio el ID, cambiar a modo edicion
                        if (option === 1 && data.IdType) {
                            $('#Alias').val(data.IdType);
                            option = 2;
                            $('.Showid').removeClass('collapse');
                            $('.seteartitulo').text('Editar usuario');
                        }
                        if (shouldCloseAfterSave) {
                            fn.funtionNewAndEditUsers("close");
                            shouldCloseAfterSave = false;
                        }
                        else {
                            option = 2;
                            fn.EditAndNewSettings("edit");
                            if (!$('.ElevationType').is(":checked")) {
                                $('.contendorRolandCompaies').removeClass('collapse');
                                fn.SearchRoltoUsers();
                                fn.SearchCompanytoUsers();
                            }
                            else {
                                $('.contendorRolandCompaies').addClass('collapse');
                            }
                        }
                    }
                }, error: function (xhr) {
                    redireccionaralLogin(xhr);
                }
            });
        }
    });
    // Guardar y cerrar
    $('.btnSaveAndClose').on('click', function () {
        shouldCloseAfterSave = true;
        $("#CreateAndEditUser").submit();
    });
    // mostrar modal de todas las empresas
    $('.ShowModCompanies').on('click', function () {
        $.ajax({
            url: "/usuarios/modalempresas",
            type: "GET",
            async: true,
            success: function (data) {
                if (data.length > 0) {
                    $(".ModCompanies").html('');
                    $(".ModCompanies").append(data);
                    //*****************Form****************************
                    //guardar empresas de usuario
                    $('#SaveUserCompanyForm').submit(function (e) {
                        e.preventDefault();
                        let contador = 0;
                        // Recorremos todos los checkbox para contar los que estan seleccionados
                        $(".selectOptionCompanies[type=checkbox]").each(function () {
                            if ($(this).is(":checked")) {
                                let input = $(document.createElement('input'));
                                input.attr("name", `companies[${contador}].companyId`);
                                input.attr("class", "automatic_input_emp");
                                input.val($(this).parent().parent().find(".companyIdtbl").html().trim());
                                $("#SaveUserCompanyForm").append(input);
                                input = $(document.createElement('input'));
                                input.attr("name", `companies[${contador}].Alias`);
                                input.attr("class", "automatic_input_emp");
                                input.val($("#Alias").val().toString());
                                $("#SaveUserCompanyForm").append(input);
                                contador++;
                            }
                        });
                        if (!contador) {
                            windows_message("¡Debe seleccionar al menos un registro!", "error");
                        }
                        else {
                            $.ajax({
                                url: "/usuarios/guardarEmpresas",
                                type: "POST",
                                data: $("#SaveUserCompanyForm").serialize(),
                                async: true,
                                success: function (data) {
                                    $('.progreso').modal('hide');
                                    if (data.Type == "error") {
                                        FormatErrors(data);
                                        $(".automatic_input_emp").remove();
                                    }
                                    else {
                                        fn.SearchCompanytoUsers();
                                        fn.SearchCompaniesDropDownList($("#Alias").val().toString());
                                        $('.ModCompanies').modal("hide");
                                        $('.selectOptionCompanies').prop('checked', false);
                                        windows_message(data.Message, data.Type);
                                        $(".automatic_input_emp").remove();
                                    }
                                }, error: function (xhr) {
                                    redireccionaralLogin(xhr);
                                }
                            });
                        }
                    });
                    $(".BuscartblCompanies").keyup(function () {
                        var _this = this;
                        // Show only matching TR, hide rest of them
                        $.each($(".tblCompanie tbody tr"), function () {
                            if ($(this).text().toLowerCase().indexOf($(_this).val().toString().toLowerCase()) === -1)
                                $(this).hide();
                            else
                                $(this).show();
                        });
                    });
                    //select all companies
                    $("#check-table-AsigCust").on("click", function () {
                        if ($(this).is(":checked")) {
                            $(".selectOptionCompanies[type=checkbox]").prop('checked', true);
                        }
                        else {
                            $(".selectOptionCompanies[type=checkbox]").prop('checked', false);
                        }
                    });
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
        $('.ModCompanies').modal('show');
    });
    // mostrar modal de todos las opciones del menu
    $('.showRoles').on('click', function () {
        $.ajax({
            url: "/usuarios/modalroles",
            type: "GET",
            async: true,
            success: function (data) {
                if (data.length > 0) {
                    $(".ModAsigRoles").html('');
                    $(".ModAsigRoles").append(data);
                    //Opción para alternar entre los roles de ver, editar y eliminar, según se marquen
                    //**********************************************
                    // Función para actualizar el estado del checkbox de la fila
                    function updateRowSelection(row) {
                        let hasAnyChecked = row.find(".idCheckver").is(":checked") ||
                            row.find(".idCheckeditar").is(":checked") ||
                            row.find(".idCheckeliminar").is(":checked");
                        row.find(".selectAsigRol").prop('checked', hasAnyChecked);
                    }
                    $('.clickCheckver').on('click', function () {
                        let row = $(this).closest('tr');
                        let estado = $(this).find(".idCheckver").is(":checked");
                        if (estado) {
                            row.find(".idCheckeditar").prop('checked', false);
                            row.find(".idCheckeliminar").prop('checked', false);
                        }
                        updateRowSelection(row);
                    });
                    $('.clickCheckeditar').on('click', function () {
                        let row = $(this).closest('tr');
                        let estado = $(this).find(".idCheckeditar").is(":checked");
                        if (estado) {
                            row.find(".idCheckver").prop('checked', false);
                            row.find(".idCheckeliminar").prop('checked', false);
                        }
                        updateRowSelection(row);
                    });
                    $('.clickCheckeliminar').on('click', function () {
                        let row = $(this).closest('tr');
                        let estado = $(this).find(".idCheckeliminar").is(":checked");
                        if (estado) {
                            row.find(".idCheckver").prop('checked', false);
                            row.find(".idCheckeditar").prop('checked', false);
                        }
                        updateRowSelection(row);
                    });
                    //*************************************************
                    //*****************Form****************************
                    //guardar roles de usuario
                    $('#SaveUserRolForm').submit(function (e) {
                        e.preventDefault();
                        let contador = 0;
                        // Recorremos todos los checkbox para contar los que estan seleccionados
                        $(".selectAsigRol[type=checkbox]").each(function () {
                            if ($(this).is(":checked")) {
                                let input = $(document.createElement('input'));
                                input.attr("name", `roles[${contador}].MenuId`);
                                input.attr("class", "automatic_input");
                                input.val($(this).parent().parent().find(".MenuIdtblrol").html().trim());
                                $("#SaveUserRolForm").append(input);
                                input = $(document.createElement('input'));
                                input.attr("name", `roles[${contador}].Alias`);
                                input.attr("class", "automatic_input");
                                input.val($('#Alias').val().toString());
                                $("#SaveUserRolForm").append(input);
                                input = $(document.createElement('input'));
                                input.attr("name", `roles[${contador}].PrivilegeView`);
                                input.attr("class", "automatic_input");
                                input.attr("type", "checkbox");
                                $("#SaveUserRolForm").append(input);
                                input.prop("checked", $(this).parent().parent().find(".idCheckver").is(":checked"));
                                input.val(($(this).parent().parent().find(".idCheckver").is(":checked")).toString());
                                input = $(document.createElement('input'));
                                input.attr("name", `roles[${contador}].PrivilegeEdit`);
                                input.attr("class", "automatic_input");
                                input.attr("type", "checkbox");
                                $("#SaveUserRolForm").append(input);
                                input.prop("checked", $(this).parent().parent().find(".idCheckeditar").is(":checked"));
                                input.val(($(this).parent().parent().find(".idCheckeditar").is(":checked")).toString());
                                input = $(document.createElement('input'));
                                input.attr("type", "checkbox");
                                input.attr("name", `roles[${contador}].PrivilegeDelete`);
                                input.attr("class", "automatic_input");
                                $("#SaveUserRolForm").append(input);
                                //input.prop("checked", $(this).parent().parent().find(".idCheckeliminar").is(":checked"));
                                input.prop("checked", $(this).parent().parent().find(".idCheckeliminar").is(":checked"));
                                input.val(($(this).parent().parent().find(".idCheckeliminar").is(":checked")).toString());
                                contador++;
                            }
                        });
                        if (contador == 0) {
                            windows_message("¡Debe seleccionar al menos un registro!", "error");
                        }
                        else {
                            $.ajax({
                                url: "/usuarios/guardarRol",
                                type: "POST",
                                data: $(this).serialize(),
                                async: true,
                                success: function (data) {
                                    $('.progreso').modal('hide');
                                    if (data.Type == "error") {
                                        FormatErrors(data);
                                        $(".automatic_input").remove();
                                    }
                                    else {
                                        windows_message(data.Message, data.Type);
                                        fn.SearchRoltoUsers();
                                        $('.ModAsigRoles').modal("hide");
                                        /*$(".tbodyTableMenu").load(location.href + " .tbodyTableMenu>*", "");*/
                                        $(".automatic_input").remove();
                                    }
                                }, error: function (xhr) {
                                    redireccionaralLogin(xhr);
                                }
                            });
                        }
                    });
                    $(".Buscartblroles").keyup(function () {
                        var _this = this;
                        // Show only matching TR, hide rest of them
                        $.each($(".tblroles-para-asignar tbody tr"), function () {
                            if ($(this).text().toLowerCase().indexOf($(_this).val().toString().toLowerCase()) === -1)
                                $(this).hide();
                            else
                                $(this).show();
                        });
                    });
                    //select all rols
                    $(".selectOptionCompaniesAll").on("click", function () {
                        if ($(this).is(":checked")) {
                            $(".selectAsigRol[type=checkbox]").prop('checked', true);
                        }
                        else {
                            $(".selectAsigRol[type=checkbox]").prop('checked', false);
                        }
                    });
                }
            }, error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
        $('.ModAsigRoles').modal('show');
    });
    $("#Name").change(function (e) {
        $(this).val(Firtscapitalletter($(this).val().toString()));
    });
    $("#Email").change(function (e) {
        $(this).val(Mayuscula($(this).val().toString()));
    });
    $("#Alias").change(function (e) {
        $(this).val(Mayuscula($(this).val().toString()));
    });
    //*****************Form Delete****************************
    //Eliminar roles asignados a un usuario
    $('#DeleteUserRolForm').submit(function (e) {
        e.preventDefault();
        var contador = false;
        // Recorremos todos los checkbox para contar los que estan seleccionados
        $(".selecRolAsignados[type=checkbox]").each(function () {
            if ($(this).is(":checked")) {
                let input = $(document.createElement('input'));
                input.attr("name", `roles`);
                input.attr("class", "automatic_input_del");
                input.val($(this).parent().parent().find(".MenuIdAssignedtbl").html().trim());
                $("#DeleteUserRolForm").append(input);
                contador = true;
            }
        });
        if (!contador) {
            windows_message("¡Debe seleccionar al menos un registro!", "error");
        }
        else {
            windows_message("¿Desea eliminar roles asignadas?", "confirm", {
                onOk: function () {
                    $(".AliasForRole").val($('#Alias').val().toString());
                    $('.progreso').modal({ backdrop: 'static', keyboard: false });
                    $.ajax({
                        url: "/usuarios/eliminarRolesAsignadas",
                        type: "POST",
                        data: $("#DeleteUserRolForm").serialize(),
                        async: true,
                        success: function (data) {
                            $('.progreso').modal('hide');
                            if (data.Type == "error") {
                                FormatErrors(data);
                            }
                            else {
                                fn.SearchRoltoUsers();
                                windows_message(data.Message, data.Type);
                            }
                        }, error: function (xhr) {
                            redireccionaralLogin(xhr);
                        }
                    });
                    $(".automatic_input_del").remove();
                },
                onCancel: function () {
                    $(".selecRolAsignados[type=checkbox]").prop('checked', false);
                    $(".automatic_input_del").remove();
                }
            });
        }
    });
    //*****************Form Delete****************************
    //Eliminar empresas asignada a un  usuario
    $('#DeleteUserCompanyForm').submit(function (e) {
        e.preventDefault();
        let contador = false;
        // Recorremos todos los checkbox para contar los que estan seleccionados
        $(".selectCompaniesAssigned[type=checkbox]").each(function () {
            if ($(this).is(":checked")) {
                let input = $(document.createElement('input'));
                input.attr("name", `companies`);
                input.attr("class", "automatic_input_del_emp");
                input.val($(this).parent().parent().find(".companyIdAsigtbl").html().trim());
                $("#DeleteUserCompanyForm").append(input);
                contador = true;
            }
        });
        if (!contador) {
            windows_message("¡Debe seleccionar un Registro!", "error");
        }
        else {
            windows_message("¿Desea eliminar empresas asignadas?", "confirm", {
                onOk: function () {
                    $('.progreso').modal({ backdrop: 'static', keyboard: false });
                    $(".AliasForCompany").val($('#Alias').val().toString());
                    $.ajax({
                        url: "/usuarios/eliminarEmpresasAsignadas",
                        type: "POST",
                        data: $("#DeleteUserCompanyForm").serialize(),
                        async: true,
                        success: function (data) {
                            $('.progreso').modal('hide');
                            if (data.Type == "error") {
                                FormatErrors(data);
                            }
                            else {
                                fn.SearchCompanytoUsers();
                                windows_message(data.Message, data.Type);
                            }
                        }, error: function (xhr) {
                            redireccionaralLogin(xhr);
                        }
                    });
                    $(".automatic_input_del_emp").remove();
                },
                onCancel: function () {
                    $(".selectCompaniesAssigned[type=checkbox]").prop('checked', false);
                    $(".automatic_input_del_emp").remove();
                }
            });
        }
    });
    //cargar imagen de usuario
    $(".Image").change(function (e) {
        let _dato = this;
        if ($('#Alias').val() == null) {
            windows_message("El usuario debe tener un alias", "error");
        }
        else {
            if (_dato.files != null) {
                let originalform;
                originalform = document.querySelector("#save-userimages-form");
                let dataform = new FormData(originalform);
                dataform.append("Alias", $('#Alias').val().toString());
                $.ajax({
                    url: "/usuarios/cargarimagen",
                    type: "POST",
                    data: dataform,
                    contentType: false,
                    processData: false,
                    async: true,
                    success: function (data) {
                        if (data.Type == "error") {
                            FormatErrors(data);
                            $('.progreso').modal('hide');
                        }
                        else {
                            $("#FotoperfilDP").attr("src", data.Message);
                        }
                    }, error: function (xhr) {
                        redireccionaralLogin(xhr);
                    }
                });
            }
        }
    });
    $("#toggle-rol").click(function () {
        let value = $(this).attr("data-value").toString();
        if (value == "1") {
            $(this).attr("data-value", "2");
            $(this).removeClass("fa-angle-up");
            $(this).addClass("fa-angle-down");
            $("#rol-container-toggle").addClass("collapse");
        }
        else {
            $(this).attr("data-value", "1");
            $(this).addClass("fa-angle-up");
            $(this).removeClass("fa-angle-down");
            $("#rol-container-toggle").removeClass("collapse");
        }
    });
    $("#toggle-company").click(function () {
        let value = $(this).attr("data-value").toString();
        if (value == "1") {
            $(this).attr("data-value", "2");
            $(this).removeClass("fa-angle-up");
            $(this).addClass("fa-angle-down");
            $("#companies-container-toggle").addClass("collapse");
        }
        else {
            $(this).attr("data-value", "1");
            $(this).addClass("fa-angle-up");
            $(this).removeClass("fa-angle-down");
            $("#companies-container-toggle").removeClass("collapse");
        }
    });
    //eliminar usuario
    $("#DeleteUser").submit(function (e) {
        e.preventDefault();
        var contador = false;
        // Recorremos todos los checkbox para contar los que estan seleccionados
        $(".selectUsers[type=checkbox]").each(function () {
            if ($(this).is(":checked")) {
                contador = true;
                let input = $(document.createElement('input'));
                input.attr("name", `users`);
                input.attr("class", "automatic_input_user");
                input.val($(this).parent().parent().find(".Aliastbl").html().trim());
                $("#DeleteUser").append(input);
            }
        });
        if (!contador) {
            windows_message("Debe seleccionar un Registro!!", "error");
        }
        else {
            windows_message("¿Desea eliminar usuarios seleccionados?", "confirm", {
                onOk: function () {
                    $('.progreso').modal({ backdrop: 'static', keyboard: false });
                    $.ajax({
                        url: "/usuarios/eliminar",
                        type: "POST",
                        data: $("#DeleteUser").serialize(),
                        async: true,
                        success: function (data) {
                            $('.progreso').modal('hide');
                            if (data.Type == "error") {
                                FormatErrors(data);
                            }
                            else {
                                $.get(location.href)
                                    .done(function (r) {
                                    var newDom = $(r);
                                    $('.tblUser').replaceWith($('.tblUser', newDom));
                                });
                                windows_message(data.Message, data.Type);
                            }
                        }, error: function (xhr) {
                            redireccionaralLogin(xhr);
                        }
                    });
                    $(".automatic_input_user").remove();
                },
                onCancel: function () {
                    $(".selectUsers[type=checkbox]").prop('checked', false);
                    $(".automatic_input_user").remove();
                }
            });
        }
    });
    //Código para mostrar la ayuda
    $("#id-help-user").on("click", function () {
        let that = $(this)[0];
        showhelp(that, "/usuarios/ayuda", ".help-user");
    });
    $('.optionFilter').on('change', function () {
        optionFilterFunction(this);
        if ($('.textFilter').val() != "") {
            Datafilter(".tbody-Table-user", "/usuarios/FilterOrMoreData");
        }
    });
    $('.textFilterMask').on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            textFilterMaskFunction(this);
            Datafilter(".tbody-Table-user", "/usuarios/FilterOrMoreData");
        }
    });
    $("#content-scroll").scroll(function () {
        let currentscroll = $("#content-scroll").scrollTop();
        let maxscroll = $(".tblUser").outerHeight(true) - $("#content-scroll").outerHeight(true);
        if (currentscroll == Math.round(maxscroll)) {
            if (!isBusy) {
                moredata(maxscroll, "usuarios", ".tbody-Table-user");
            }
        }
    });
    // Habilitar doble clic en filas para editar
    $(document).on('dblclick', '.tbody-Table-user .row-app', function (e) {
        if ($(e.target).is('input[type="checkbox"]') || $(e.target).is('label')) {
            return;
        }
        const rowId = $(this).find('.Aliastbl').text().trim();
        if (!rowId) {
            return;
        }
        $.ajax({
            url: `/usuarios/${rowId}`,
            type: "GET",
            async: true,
            success: function (data) {
                $('.progreso').modal('hide');
                if (data != null) {
                    option = 2;
                    fn.SearchCompaniesDropDownList(data.Alias);
                    fn.SearchImageUser(data.Alias);
                    fn.EditAndNewSettings("edit");
                    AutomaticBinding(data, "#CreateAndEditUser");
                    if (!data.ElevationTypeBool) {
                        $('.contendorRolandCompaies').removeClass('collapse');
                        fn.SearchRoltoUsers();
                        fn.SearchCompanytoUsers();
                    }
                    else {
                        $('.contendorRolandCompaies').addClass('collapse');
                    }
                }
                else {
                    windows_message("No se encontró el usuario", "error");
                }
            },
            error: function (xhr) {
                redireccionaralLogin(xhr);
            }
        });
    });
    // Aplicar estilo clickable a las filas
    $('.tbody-Table-user .row-app').addClass('row-clickable');
    // Inicializar modal de auditoría
    initAuditListPage('.selectUsers', '.Aliastbl', '/usuarios/getbyid', 'Alias');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL1R5cGVTY3JpcHRGaWxlL1VzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7R0FPRztBQUVILFNBQVMsRUFBRSxDQUFDO0lBQ1IsSUFBSSxZQUFZLEdBQVcsc0NBQXNDLENBQUM7SUFDbEUsSUFBSSxNQUFjLENBQUM7QUFDdkIsQ0FBQztBQUVELHNCQUFzQjtBQUN0QixNQUFNLEVBQUUsR0FBRztJQUNQLHNEQUFzRDtJQUN0RCxrQkFBa0IsRUFBRSxVQUFVLE1BQU07UUFDaEMsSUFBSSxNQUFNLElBQUksTUFBTSxFQUFFLENBQUM7WUFDbkIsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQzFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ3pDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ3pDLG1EQUFtRDtZQUNuRCxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzFDLENBQUMsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUMzRCxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3JDLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0QyxDQUFDO2FBQ0ksQ0FBQztZQUNGLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDekMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNuQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMs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QkFBb0IsRUFBRSxDQUFDO29CQUM5QixDQUFDO3lCQUFNLENBQUM7d0JBQ0osQ0FBQyxDQUFDLDBCQUEwQixDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUN2RCxDQUFDO2dCQUNMLENBQUM7cUJBQU0sQ0FBQztvQkFDSixlQUFlLENBQUMsMkJBQTJCLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQzFELENBQUM7WUFDTCxDQUFDO1lBQ0QsS0FBSyxFQUFFLFVBQVUsR0FBRztnQkFDaEIsb0JBQW9CLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDOUIsQ0FBQztTQUNKLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBRUgsdUNBQXVDO0lBQ3ZDLENBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUUxRCxpQ0FBaUM7SUFDakMsaUJBQWlCLENBQUMsY0FBYyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNqRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBmaWxlIFVzZXIudHNcclxuICogQGRlc2NyaXB0aW9uIE3Ds2R1bG8gZGUgZ2VzdGnDs24gZGUgdXN1YXJpb3MgZGVsIHNpc3RlbWEuIFBlcm1pdGUgY3JlYXIsIGVkaXRhcixcclxuICogICAgICAgICAgICAgIGVsaW1pbmFyIHVzdWFyaW9zIHkgYWRtaW5pc3RyYXIgcm9sZXMgeSBwZXJtaXNvcyBkZSBhY2Nlc28uXHJcbiAqIEBhdXRob3IgRXF1aXBvIGRlIERlc2Fycm9sbG9cclxuICogQGRhdGUgMjAyNVxyXG4gKiBAbW9kdWxlIFVzdWFyaW9zXHJcbiAqL1xyXG5cclxudmFyaWFibGVzOiB7XHJcbiAgICB2YXIgZGVmYXVsdGltYWdlOiBzdHJpbmcgPSBcIi9JbWFnZXMvRGFzaGJvYXJkL2RlZmF1bHRfcGVyZmlsLnBuZ1wiO1xyXG4gICAgdmFyIG9wdGlvbjogbnVtYmVyO1xyXG59XHJcblxyXG4vL0FycmVnbG8gZGUgZnVuY2lvbmVzXHJcbmNvbnN0IGZuID0ge1xyXG4gICAgLy9Db25maWd1cmFyIGVsZW1lbnRvcyBkZWwgZG9tIGFsIGVkaXRhciBvIGNyZWFyIG51ZXZvXHJcbiAgICBFZGl0QW5kTmV3U2V0dGluZ3M6IGZ1bmN0aW9uIChvcHRpb24pIHtcclxuICAgICAgICBpZiAob3B0aW9uID09IFwiZWRpdFwiKSB7XHJcbiAgICAgICAgICAgICQoJy5zZXRpYXJ0aXR1bG8nKS50ZXh0KFwiRWRpdGFyIHVzdWFyaW9cIik7XHJcbiAgICAgICAgICAgICQoXCIjQWxpYXNcIikuYXR0cihcInJlYWRvbmx5XCIsIFwicmVhZG9ubHlcIik7XHJcbiAgICAgICAgICAgICQoXCIjRW1haWxcIikuYXR0cihcInJlYWRvbmx5XCIsIFwicmVhZG9ubHlcIik7XHJcbiAgICAgICAgICAgIC8qICAgICAgICAgICAgJChcIiNFbWFpbFwiKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpOyovXHJcbiAgICAgICAgICAgICQoJy5Db250ZW1wcmVzYScpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcuY29udEltcHV0RGF0b3NQZXJzb25hbGVzRm90bycpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcuU2hvd2lkJykucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgICAgIGZuLmZ1bnRpb25OZXdBbmRFZGl0VXNlcnMoXCJvcGVuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgJCgnLnNldGlhcnRpdHVsbycpLnRleHQoXCJOdWV2byB1c3VhcmlvXCIpO1xyXG4gICAgICAgICAgICAkKFwiI0FsaWFzXCIpLnJlbW92ZUF0dHIoXCJyZWFkb25seVwiKTtcclxuICAgICAgICAgICAgJChcIiNFbWFpbFwiKS5yZW1vdmVBdHRyKFwicmVhZG9ubHlcIik7XHJcbiAgICAgICAgICAgICQoJy5jb250SW1wdXREYXRvc1BlcnNvbmFsZXNGb3RvJykuYWRkQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgICAgICQoJy5Db250ZW1wcmVzYScpLmFkZENsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcuU2hvd2lkJykuYWRkQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgICAgIGZuLmZ1bnRpb25OZXdBbmRFZGl0VXNlcnMoXCJvcGVuXCIpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vZnVuY2lvbiBhYnJpciBudWV2byB1c3VhcmlvXHJcbiAgICBmdW50aW9uTmV3QW5kRWRpdFVzZXJzOiBmdW5jdGlvbiAoX29wY2lvbikge1xyXG4gICAgICAgIGlmIChfb3BjaW9uID09IFwib3BlblwiKSB7XHJcbiAgICAgICAgICAgICQoJy5Db250ZW5lZG9yTGlzdEVudGl0eScpLmFkZENsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcuY29udE5ld0VudHl0aScpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcub3BjaW9uZXNsaXN0cGFnZScpLmFkZENsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcub3BjaW9uZXNsaXN0cGFnZUZvcm0nKS5yZW1vdmVDbGFzcygnY29sbGFwc2UnKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCgnLmNvbnRlbmRvclJvbGFuZENvbXBhaWVzJykuYWRkQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgICAgICQoJy5Db250ZW5lZG9yTGlzdEVudGl0eScpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcuY29udE5ld0VudHl0aScpLmFkZENsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcub3BjaW9uZXNsaXN0cGFnZScpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcub3BjaW9uZXNsaXN0cGFnZUZvcm0nKS5hZGRDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vTGltcGlhIGVsIGZvcm11bGFyaW8gZGUgZ3VhcmRhciB5IGVkaXRhclxyXG4gICAgQ2xlYXJJbXB1dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBmb3JtOiBIVE1MRm9ybUVsZW1lbnQ7XHJcbiAgICAgICAgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiQ3JlYXRlQW5kRWRpdFVzZXJcIikgYXMgSFRNTEZvcm1FbGVtZW50O1xyXG4gICAgICAgIGZvcm0ucmVzZXQoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8vL2Z1bnRpb24gY3JlYXIgeSBlZGl0YXIgdXN1YXJpb3NcclxuICAgIC8vQ3JlYXRlQW5kRWRpdFVzZXJzOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgLy99LFxyXG5cclxuICAgIC8vRnVudGlvbk1vZGVsVXNlcnM6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vICAgIGxldCBFbGV2YXRpb25UeXBlOiBzdHJpbmcgPSBcIjJcIjtcclxuICAgIC8vICAgIGxldCBfQ29tcGFueURlZmF1bHRJZDogc3RyaW5nO1xyXG4gICAgLy8gICAgaWYgKCQoJy5Db21wYW55RGVmYXVsdElkJykudmFsKCkgPT0gbnVsbClcclxuICAgIC8vICAgICAgICBfQ29tcGFueURlZmF1bHRJZCA9IFwiXCI7XHJcbiAgICAvLyAgICBlbHNlXHJcbiAgICAvLyAgICAgICAgX0NvbXBhbnlEZWZhdWx0SWQgPSAkKCcuQ29tcGFueURlZmF1bHRJZCcpLnZhbCgpLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgLy8gICAgaWYgKCQoXCIuRWxldmF0aW9uVHlwZVwiKS5pcyhcIjpjaGVja2VkXCIpKSB7XHJcbiAgICAvLyAgICAgICAgRWxldmF0aW9uVHlwZSA9IFwiMFwiO1xyXG4gICAgLy8gICAgfVxyXG4gICAgLy8gICAgdmFyIE1vZGVsVXNlcjogSVVzZXJzID1cclxuICAgIC8vICAgIHtcclxuICAgIC8vICAgICAgICBOYW1lOiAkKCcuTmFtZScpLnZhbCgpLnRvU3RyaW5nKCksXHJcbiAgICAvLyAgICAgICAgQWxpYXM6ICQoJy5BbGlhcycpLnZhbCgpLnRvU3RyaW5nKCksXHJcbiAgICAvLyAgICAgICAgRW1haWw6ICQoJy5FbWFpbCcpLnZhbCgpLnRvU3RyaW5nKCksXHJcbiAgICAvLyAgICAgICAgRm9ybWF0Q29kZUlkOiAkKCcuRm9ybWF0Q29kZUlkJykudmFsKCkudG9TdHJpbmcoKSxcclxuICAgIC8vICAgICAgICBFbGV2YXRpb25UeXBlOiBFbGV2YXRpb25UeXBlLFxyXG4gICAgLy8gICAgICAgIENvbXBhbnlEZWZhdWx0SWQ6IF9Db21wYW55RGVmYXVsdElkXHJcbiAgICAvLyAgICB9O1xyXG5cclxuICAgIC8vICAgIHJldHVybiBNb2RlbFVzZXI7XHJcbiAgICAvL30sXHJcblxyXG4gICAgU2VhcmNoUm9sdG9Vc2VyczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogXCIvdXN1YXJpb3MvQnVzY2FyUm9sVXN1YXJpb1wiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBBbGlhczogJCgnI0FsaWFzJykudmFsKCkudG9TdHJpbmcoKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI0FsbFRhYmxlUm9sXCIpLmh0bWwoJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjQWxsVGFibGVSb2xcIikuYXBwZW5kKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBTZWFyY2hDb21wYW55dG9Vc2VyczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogXCIvdXN1YXJpb3MvQnVzY2FyRW1wcmVzYXNVc3VhcmlvXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIEFsaWFzOiAkKCcjQWxpYXMnKS52YWwoKS50b1N0cmluZygpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjQWxsVGFibGVDb21wYW55XCIpLmh0bWwoJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjQWxsVGFibGVDb21wYW55XCIpLmFwcGVuZChkYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgU2VhcmNoQ29tcGFuaWVzRHJvcERvd25MaXN0OiBmdW5jdGlvbiAoX2lkOiBzdHJpbmcpIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IFwiL3VzdWFyaW9zL0J1c2Nhckxpc3RhRW1wcmVzYVwiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBBbGlhczogX2lkXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGFzeW5jOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAkKFwiLkNvbXBhbnlEZWZhdWx0SWRcIikuaHRtbCgnJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9wdGlvbiA9ICQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJykpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbi50ZXh0KFwiU2VsZWNjaW9uZS4uLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb24udmFsKFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuQ29tcGFueURlZmF1bHRJZFwiKS5hcHBlbmQob3B0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJChkYXRhKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9wdGlvbiA9ICQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb24udGV4dCh0aGlzLkNvbXBhbnlOYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnZhbCh0aGlzLmNvbXBhbnlJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuQ29tcGFueURlZmF1bHRJZFwiKS5hcHBlbmQob3B0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIFNlYXJjaEltYWdlVXNlcjogZnVuY3Rpb24gKF9hbGlhczogc3RyaW5nKSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBcIi91c3Vhcmlvcy9kZXNjYXJnYXJpbWFnZW5cIixcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgQWxpYXM6IF9hbGlhc1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IFJlc3BvbnNlVUkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLk1lc3NhZ2UgIT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjRm90b3BlcmZpbERQXCIpLmF0dHIoXCJzcmNcIiwgZGF0YS5NZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjRm90b3BlcmZpbERQXCIpLmF0dHIoXCJzcmNcIiwgZGVmYXVsdGltYWdlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcblxyXG5lc2N1Y2hhZG9yZXM6IHtcclxuICAgIC8vQ3JlYXIgbnVldm8gdXN1YXJpb1xyXG4gICAgJCgnLk5ld1VzZXInKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgb3B0aW9uID0gMTtcclxuICAgICAgICAkKFwiI0ZvdG9wZXJmaWxEUFwiKS5hdHRyKFwic3JjXCIsIGRlZmF1bHRpbWFnZSk7XHJcbiAgICAgICAgZm4uQ2xlYXJJbXB1dCgpO1xyXG4gICAgICAgIGZuLkVkaXRBbmROZXdTZXR0aW5ncyhcIm5ld1wiKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vRWRpdGFyIHVzdWFyaW9cclxuICAgICQoXCIuRWRpdFVzZXJzXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBpZDogc3RyaW5nO1xyXG4gICAgICAgIGxldCBjb250YWRvcjogbnVtYmVyID0gMDtcclxuXHJcbiAgICAgICAgLy8gUmVjb3JyZW1vcyB0b2RvcyBsb3MgY2hlY2tib3ggcGFyYSBjb250YXIgbG9zIHF1ZSBlc3RhbiBzZWxlY2Npb25hZG9zXHJcbiAgICAgICAgJChcIi5zZWxlY3RVc2Vyc1t0eXBlPWNoZWNrYm94XVwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgY29udGFkb3IrKztcclxuICAgICAgICAgICAgICAgIGlmIChjb250YWRvciA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwqFEZWJlIHNlbGVjY2lvbmFyIHVuIHNvbG8gcmVnaXN0cm8hXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlkID0gJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKFwiLkFsaWFzdGJsXCIpLmh0bWwoKS50cmltKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGNvbnRhZG9yICE9IDIpIHtcclxuICAgICAgICAgICAgaWYgKGNvbnRhZG9yID09IDApIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsKhRGViZSBzZWxlY2Npb25hciB1biByZWdpc3RybyFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogYC91c3Vhcmlvcy8ke2lkfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogSVVzZXJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKCdoaWRlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb24gPSAyO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuLlNlYXJjaENvbXBhbmllc0Ryb3BEb3duTGlzdChkYXRhLkFsaWFzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuLlNlYXJjaEltYWdlVXNlcihkYXRhLkFsaWFzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuLkVkaXRBbmROZXdTZXR0aW5ncyhcImVkaXRcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQXV0b21hdGljQmluZGluZyhkYXRhLCBcIiNDcmVhdGVBbmRFZGl0VXNlclwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWRhdGEuRWxldmF0aW9uVHlwZUJvb2wpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyQoJyNFbGV2YXRpb25UeXBlJykucHJvcChcImNoZWNrZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmNvbnRlbmRvclJvbGFuZENvbXBhaWVzJykucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm4uU2VhcmNoUm9sdG9Vc2VycygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuLlNlYXJjaENvbXBhbnl0b1VzZXJzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyQoJyNFbGV2YXRpb25UeXBlJykucHJvcChcImNoZWNrZWRcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5jb250ZW5kb3JSb2xhbmRDb21wYWllcycpLmFkZENsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIk5vIHNlIGVuY29udHLDsyBlbCB1c3VhcmlvXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnLk9wQ2xvc2Vmb3JtJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoJy5TaG93aWQnKS5hZGRDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICBmbi5mdW50aW9uTmV3QW5kRWRpdFVzZXJzKFwiY2xvc2VcIik7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBWYXJpYWJsZSBwYXJhIGNvbnRyb2xhciBzaSBkZWJlIGNlcnJhciBkZXNwdcOpcyBkZSBndWFyZGFyXHJcbiAgICB2YXIgc2hvdWxkQ2xvc2VBZnRlclNhdmUgPSBmYWxzZTtcclxuXHJcbiAgICAkKCcjQ3JlYXRlQW5kRWRpdFVzZXInKS5zdWJtaXQoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7IC8vIFNpZW1wcmUgcHJldmVuaXIgZWwgZW52w61vIG5hdGl2byBkZWwgZm9ybXVsYXJpb1xyXG4gICAgICAgIGlmICgkKHRoaXMpLnZhbGlkKCkpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIEFzaWduYXIgRGF0YUFyZWFJZCBkZXNkZSBlbCBjb250ZW5lZG9yIGRlIGxhIHDDoWdpbmFcclxuICAgICAgICAgICAgdmFyIGRhdGFBcmVhSWQgPSAkKCcjdXNlci1wYWdlJykuZGF0YSgnZGF0YWFyZWEnKTtcclxuICAgICAgICAgICAgaWYgKGRhdGFBcmVhSWQpIHtcclxuICAgICAgICAgICAgICAgICQoJyNEYXRhQXJlYUlkJykudmFsKGRhdGFBcmVhSWQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCh7IGJhY2tkcm9wOiAnc3RhdGljJywga2V5Ym9hcmQ6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBcIi91c3Vhcmlvcy9ndWFyZGFyXCIsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgIGRhdGE6ICQodGhpcykuc2VyaWFsaXplKCkgKyBgJm9wZXJhY2lvbj0ke29wdGlvbn1gLFxyXG4gICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogUmVzcG9uc2VVSSkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuVHlwZSA9PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgRm9ybWF0RXJyb3JzKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQuZ2V0KGxvY2F0aW9uLmhyZWYpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXdEb20gPSAkKHIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy50YmxVc2VyJykucmVwbGFjZVdpdGgoJCgnLnRibFVzZXInLCBuZXdEb20pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoZGF0YS5NZXNzYWdlLCBkYXRhLlR5cGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2kgZXJhIGNyZWFjaW9uIHkgc2UgZGV2b2x2aW8gZWwgSUQsIGNhbWJpYXIgYSBtb2RvIGVkaWNpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbiA9PT0gMSAmJiBkYXRhLklkVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnI0FsaWFzJykudmFsKGRhdGEuSWRUeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbiA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuU2hvd2lkJykucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuc2V0ZWFydGl0dWxvJykudGV4dCgnRWRpdGFyIHVzdWFyaW8nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzaG91bGRDbG9zZUFmdGVyU2F2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm4uZnVudGlvbk5ld0FuZEVkaXRVc2VycyhcImNsb3NlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvdWxkQ2xvc2VBZnRlclNhdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbiA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbi5FZGl0QW5kTmV3U2V0dGluZ3MoXCJlZGl0XCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghJCgnLkVsZXZhdGlvblR5cGUnKS5pcyhcIjpjaGVja2VkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmNvbnRlbmRvclJvbGFuZENvbXBhaWVzJykucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm4uU2VhcmNoUm9sdG9Vc2VycygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuLlNlYXJjaENvbXBhbnl0b1VzZXJzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5jb250ZW5kb3JSb2xhbmRDb21wYWllcycpLmFkZENsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBHdWFyZGFyIHkgY2VycmFyXHJcbiAgICAkKCcuYnRuU2F2ZUFuZENsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHNob3VsZENsb3NlQWZ0ZXJTYXZlID0gdHJ1ZTtcclxuICAgICAgICAkKFwiI0NyZWF0ZUFuZEVkaXRVc2VyXCIpLnN1Ym1pdCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gbW9zdHJhciBtb2RhbCBkZSB0b2RhcyBsYXMgZW1wcmVzYXNcclxuICAgICQoJy5TaG93TW9kQ29tcGFuaWVzJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogXCIvdXN1YXJpb3MvbW9kYWxlbXByZXNhc1wiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLk1vZENvbXBhbmllc1wiKS5odG1sKCcnKTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLk1vZENvbXBhbmllc1wiKS5hcHBlbmQoZGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vKioqKioqKioqKioqKioqKipGb3JtKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgICAgICAgICAgICAgICAgIC8vZ3VhcmRhciBlbXByZXNhcyBkZSB1c3VhcmlvXHJcbiAgICAgICAgICAgICAgICAgICAgJCgnI1NhdmVVc2VyQ29tcGFueUZvcm0nKS5zdWJtaXQoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFkb3I6IG51bWJlciA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlY29ycmVtb3MgdG9kb3MgbG9zIGNoZWNrYm94IHBhcmEgY29udGFyIGxvcyBxdWUgZXN0YW4gc2VsZWNjaW9uYWRvc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiLnNlbGVjdE9wdGlvbkNvbXBhbmllc1t0eXBlPWNoZWNrYm94XVwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmlzKFwiOmNoZWNrZWRcIikpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGlucHV0ID0gJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwibmFtZVwiLCBgY29tcGFuaWVzWyR7Y29udGFkb3J9XS5jb21wYW55SWRgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwiY2xhc3NcIiwgXCJhdXRvbWF0aWNfaW5wdXRfZW1wXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LnZhbCgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoXCIuY29tcGFueUlkdGJsXCIpLmh0bWwoKS50cmltKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjU2F2ZVVzZXJDb21wYW55Rm9ybVwiKS5hcHBlbmQoaW5wdXQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dCA9ICQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcIm5hbWVcIiwgYGNvbXBhbmllc1ske2NvbnRhZG9yfV0uQWxpYXNgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwiY2xhc3NcIiwgXCJhdXRvbWF0aWNfaW5wdXRfZW1wXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LnZhbCgkKFwiI0FsaWFzXCIpLnZhbCgpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjU2F2ZVVzZXJDb21wYW55Rm9ybVwiKS5hcHBlbmQoaW5wdXQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWRvcisrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY29udGFkb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsKhRGViZSBzZWxlY2Npb25hciBhbCBtZW5vcyB1biByZWdpc3RybyFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBcIi91c3Vhcmlvcy9ndWFyZGFyRW1wcmVzYXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAkKFwiI1NhdmVVc2VyQ29tcGFueUZvcm1cIikuc2VyaWFsaXplKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IFJlc3BvbnNlVUkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuVHlwZSA9PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZvcm1hdEVycm9ycyhkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuYXV0b21hdGljX2lucHV0X2VtcFwiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuLlNlYXJjaENvbXBhbnl0b1VzZXJzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbi5TZWFyY2hDb21wYW5pZXNEcm9wRG93bkxpc3QoJChcIiNBbGlhc1wiKS52YWwoKS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5Nb2RDb21wYW5pZXMnKS5tb2RhbChcImhpZGVcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zZWxlY3RPcHRpb25Db21wYW5pZXMnKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKGRhdGEuTWVzc2FnZSwgZGF0YS5UeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuYXV0b21hdGljX2lucHV0X2VtcFwiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuQnVzY2FydGJsQ29tcGFuaWVzXCIpLmtleXVwKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTaG93IG9ubHkgbWF0Y2hpbmcgVFIsIGhpZGUgcmVzdCBvZiB0aGVtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmVhY2goJChcIi50YmxDb21wYW5pZSB0Ym9keSB0clwiKSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnRleHQoKS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJChfdGhpcykudmFsKCkudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpKSA9PT0gLTEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL3NlbGVjdCBhbGwgY29tcGFuaWVzXHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNjaGVjay10YWJsZS1Bc2lnQ3VzdFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5zZWxlY3RPcHRpb25Db21wYW5pZXNbdHlwZT1jaGVja2JveF1cIikucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5zZWxlY3RPcHRpb25Db21wYW5pZXNbdHlwZT1jaGVja2JveF1cIikucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKCcuTW9kQ29tcGFuaWVzJykubW9kYWwoJ3Nob3cnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIG1vc3RyYXIgbW9kYWwgZGUgdG9kb3MgbGFzIG9wY2lvbmVzIGRlbCBtZW51XHJcbiAgICAkKCcuc2hvd1JvbGVzJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogXCIvdXN1YXJpb3MvbW9kYWxyb2xlc1wiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLk1vZEFzaWdSb2xlc1wiKS5odG1sKCcnKTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLk1vZEFzaWdSb2xlc1wiKS5hcHBlbmQoZGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vT3BjacOzbiBwYXJhIGFsdGVybmFyIGVudHJlIGxvcyByb2xlcyBkZSB2ZXIsIGVkaXRhciB5IGVsaW1pbmFyLCBzZWfDum4gc2UgbWFycXVlblxyXG4gICAgICAgICAgICAgICAgICAgIC8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIEZ1bmNpw7NuIHBhcmEgYWN0dWFsaXphciBlbCBlc3RhZG8gZGVsIGNoZWNrYm94IGRlIGxhIGZpbGFcclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiB1cGRhdGVSb3dTZWxlY3Rpb24ocm93KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBoYXNBbnlDaGVja2VkID0gcm93LmZpbmQoXCIuaWRDaGVja3ZlclwiKS5pcyhcIjpjaGVja2VkXCIpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cuZmluZChcIi5pZENoZWNrZWRpdGFyXCIpLmlzKFwiOmNoZWNrZWRcIikgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5maW5kKFwiLmlkQ2hlY2tlbGltaW5hclwiKS5pcyhcIjpjaGVja2VkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3cuZmluZChcIi5zZWxlY3RBc2lnUm9sXCIpLnByb3AoJ2NoZWNrZWQnLCBoYXNBbnlDaGVja2VkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoJy5jbGlja0NoZWNrdmVyJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcm93ID0gJCh0aGlzKS5jbG9zZXN0KCd0cicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZXN0YWRvID0gJCh0aGlzKS5maW5kKFwiLmlkQ2hlY2t2ZXJcIikuaXMoXCI6Y2hlY2tlZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVzdGFkbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93LmZpbmQoXCIuaWRDaGVja2VkaXRhclwiKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93LmZpbmQoXCIuaWRDaGVja2VsaW1pbmFyXCIpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlUm93U2VsZWN0aW9uKHJvdyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoJy5jbGlja0NoZWNrZWRpdGFyJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcm93ID0gJCh0aGlzKS5jbG9zZXN0KCd0cicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZXN0YWRvID0gJCh0aGlzKS5maW5kKFwiLmlkQ2hlY2tlZGl0YXJcIikuaXMoXCI6Y2hlY2tlZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVzdGFkbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93LmZpbmQoXCIuaWRDaGVja3ZlclwiKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93LmZpbmQoXCIuaWRDaGVja2VsaW1pbmFyXCIpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlUm93U2VsZWN0aW9uKHJvdyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoJy5jbGlja0NoZWNrZWxpbWluYXInKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByb3cgPSAkKHRoaXMpLmNsb3Nlc3QoJ3RyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlc3RhZG8gPSAkKHRoaXMpLmZpbmQoXCIuaWRDaGVja2VsaW1pbmFyXCIpLmlzKFwiOmNoZWNrZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlc3RhZG8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5maW5kKFwiLmlkQ2hlY2t2ZXJcIikucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5maW5kKFwiLmlkQ2hlY2tlZGl0YXJcIikucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVSb3dTZWxlY3Rpb24ocm93KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8qKioqKioqKioqKioqKioqKkZvcm0qKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAgICAgICAgICAgICAgICAgLy9ndWFyZGFyIHJvbGVzIGRlIHVzdWFyaW9cclxuICAgICAgICAgICAgICAgICAgICAkKCcjU2F2ZVVzZXJSb2xGb3JtJykuc3VibWl0KGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhZG9yOiBudW1iZXIgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBSZWNvcnJlbW9zIHRvZG9zIGxvcyBjaGVja2JveCBwYXJhIGNvbnRhciBsb3MgcXVlIGVzdGFuIHNlbGVjY2lvbmFkb3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5zZWxlY3RBc2lnUm9sW3R5cGU9Y2hlY2tib3hdXCIpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW5wdXQgPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJuYW1lXCIsIGByb2xlc1ske2NvbnRhZG9yfV0uTWVudUlkYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcImNsYXNzXCIsIFwiYXV0b21hdGljX2lucHV0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LnZhbCgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoXCIuTWVudUlkdGJscm9sXCIpLmh0bWwoKS50cmltKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjU2F2ZVVzZXJSb2xGb3JtXCIpLmFwcGVuZChpbnB1dCk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dCA9ICQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcIm5hbWVcIiwgYHJvbGVzWyR7Y29udGFkb3J9XS5BbGlhc2ApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJjbGFzc1wiLCBcImF1dG9tYXRpY19pbnB1dFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWwoJCgnI0FsaWFzJykudmFsKCkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNTYXZlVXNlclJvbEZvcm1cIikuYXBwZW5kKGlucHV0KTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0ID0gJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwibmFtZVwiLCBgcm9sZXNbJHtjb250YWRvcn1dLlByaXZpbGVnZVZpZXdgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwiY2xhc3NcIiwgXCJhdXRvbWF0aWNfaW5wdXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcInR5cGVcIiwgXCJjaGVja2JveFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiI1NhdmVVc2VyUm9sRm9ybVwiKS5hcHBlbmQoaW5wdXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LnByb3AoXCJjaGVja2VkXCIsICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZChcIi5pZENoZWNrdmVyXCIpLmlzKFwiOmNoZWNrZWRcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LnZhbCgoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKFwiLmlkQ2hlY2t2ZXJcIikuaXMoXCI6Y2hlY2tlZFwiKSkudG9TdHJpbmcoKSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dCA9ICQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcIm5hbWVcIiwgYHJvbGVzWyR7Y29udGFkb3J9XS5Qcml2aWxlZ2VFZGl0YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcImNsYXNzXCIsIFwiYXV0b21hdGljX2lucHV0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJ0eXBlXCIsIFwiY2hlY2tib3hcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNTYXZlVXNlclJvbEZvcm1cIikuYXBwZW5kKGlucHV0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5wcm9wKFwiY2hlY2tlZFwiLCAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoXCIuaWRDaGVja2VkaXRhclwiKS5pcyhcIjpjaGVja2VkXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWwoKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZChcIi5pZENoZWNrZWRpdGFyXCIpLmlzKFwiOmNoZWNrZWRcIikpLnRvU3RyaW5nKCkpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQgPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJ0eXBlXCIsIFwiY2hlY2tib3hcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcIm5hbWVcIiwgYHJvbGVzWyR7Y29udGFkb3J9XS5Qcml2aWxlZ2VEZWxldGVgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwiY2xhc3NcIiwgXCJhdXRvbWF0aWNfaW5wdXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNTYXZlVXNlclJvbEZvcm1cIikuYXBwZW5kKGlucHV0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2lucHV0LnByb3AoXCJjaGVja2VkXCIsICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZChcIi5pZENoZWNrZWxpbWluYXJcIikuaXMoXCI6Y2hlY2tlZFwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQucHJvcChcImNoZWNrZWRcIiwgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKFwiLmlkQ2hlY2tlbGltaW5hclwiKS5pcyhcIjpjaGVja2VkXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWwoKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZChcIi5pZENoZWNrZWxpbWluYXJcIikuaXMoXCI6Y2hlY2tlZFwiKSkudG9TdHJpbmcoKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhZG9yKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250YWRvciA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCoURlYmUgc2VsZWNjaW9uYXIgYWwgbWVub3MgdW4gcmVnaXN0cm8hXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogXCIvdXN1YXJpb3MvZ3VhcmRhclJvbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ICQodGhpcykuc2VyaWFsaXplKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IFJlc3BvbnNlVUkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuVHlwZSA9PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZvcm1hdEVycm9ycyhkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuYXV0b21hdGljX2lucHV0XCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKGRhdGEuTWVzc2FnZSwgZGF0YS5UeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuLlNlYXJjaFJvbHRvVXNlcnMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5Nb2RBc2lnUm9sZXMnKS5tb2RhbChcImhpZGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiQoXCIudGJvZHlUYWJsZU1lbnVcIikubG9hZChsb2NhdGlvbi5ocmVmICsgXCIgLnRib2R5VGFibGVNZW51PipcIiwgXCJcIik7Ki9cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiLmF1dG9tYXRpY19pbnB1dFwiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5CdXNjYXJ0Ymxyb2xlc1wiKS5rZXl1cChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNob3cgb25seSBtYXRjaGluZyBUUiwgaGlkZSByZXN0IG9mIHRoZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgJC5lYWNoKCQoXCIudGJscm9sZXMtcGFyYS1hc2lnbmFyIHRib2R5IHRyXCIpLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS50ZXh0KCkudG9Mb3dlckNhc2UoKS5pbmRleE9mKCQoX3RoaXMpLnZhbCgpLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKSkgPT09IC0xKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9zZWxlY3QgYWxsIHJvbHNcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLnNlbGVjdE9wdGlvbkNvbXBhbmllc0FsbFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5zZWxlY3RBc2lnUm9sW3R5cGU9Y2hlY2tib3hdXCIpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuc2VsZWN0QXNpZ1JvbFt0eXBlPWNoZWNrYm94XVwiKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoJy5Nb2RBc2lnUm9sZXMnKS5tb2RhbCgnc2hvdycpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNOYW1lXCIpLmNoYW5nZShmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICQodGhpcykudmFsKEZpcnRzY2FwaXRhbGxldHRlcigkKHRoaXMpLnZhbCgpLnRvU3RyaW5nKCkpKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjRW1haWxcIikuY2hhbmdlKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgJCh0aGlzKS52YWwoTWF5dXNjdWxhKCQodGhpcykudmFsKCkudG9TdHJpbmcoKSkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNBbGlhc1wiKS5jaGFuZ2UoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAkKHRoaXMpLnZhbChNYXl1c2N1bGEoJCh0aGlzKS52YWwoKS50b1N0cmluZygpKSk7XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgLy8qKioqKioqKioqKioqKioqKkZvcm0gRGVsZXRlKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgLy9FbGltaW5hciByb2xlcyBhc2lnbmFkb3MgYSB1biB1c3VhcmlvXHJcbiAgICAkKCcjRGVsZXRlVXNlclJvbEZvcm0nKS5zdWJtaXQoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgdmFyIGNvbnRhZG9yOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgLy8gUmVjb3JyZW1vcyB0b2RvcyBsb3MgY2hlY2tib3ggcGFyYSBjb250YXIgbG9zIHF1ZSBlc3RhbiBzZWxlY2Npb25hZG9zXHJcbiAgICAgICAgJChcIi5zZWxlY1JvbEFzaWduYWRvc1t0eXBlPWNoZWNrYm94XVwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGlucHV0ID0gJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKTtcclxuICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJuYW1lXCIsIGByb2xlc2ApO1xyXG4gICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcImNsYXNzXCIsIFwiYXV0b21hdGljX2lucHV0X2RlbFwiKTtcclxuICAgICAgICAgICAgICAgIGlucHV0LnZhbCgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoXCIuTWVudUlkQXNzaWduZWR0YmxcIikuaHRtbCgpLnRyaW0oKSk7XHJcbiAgICAgICAgICAgICAgICAkKFwiI0RlbGV0ZVVzZXJSb2xGb3JtXCIpLmFwcGVuZChpbnB1dCk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29udGFkb3IgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmICghY29udGFkb3IpIHtcclxuICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwqFEZWJlIHNlbGVjY2lvbmFyIGFsIG1lbm9zIHVuIHJlZ2lzdHJvIVwiLCBcImVycm9yXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwr9EZXNlYSBlbGltaW5hciByb2xlcyBhc2lnbmFkYXM/XCIsIFwiY29uZmlybVwiLCB7XHJcbiAgICAgICAgICAgICAgICBvbk9rOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5BbGlhc0ZvclJvbGVcIikudmFsKCQoJyNBbGlhcycpLnZhbCgpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKHsgYmFja2Ryb3A6ICdzdGF0aWMnLCBrZXlib2FyZDogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBcIi91c3Vhcmlvcy9lbGltaW5hclJvbGVzQXNpZ25hZGFzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAkKFwiI0RlbGV0ZVVzZXJSb2xGb3JtXCIpLnNlcmlhbGl6ZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IFJlc3BvbnNlVUkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5UeXBlID09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZvcm1hdEVycm9ycyhkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm4uU2VhcmNoUm9sdG9Vc2VycygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShkYXRhLk1lc3NhZ2UsIGRhdGEuVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5hdXRvbWF0aWNfaW5wdXRfZGVsXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG9uQ2FuY2VsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5zZWxlY1JvbEFzaWduYWRvc1t0eXBlPWNoZWNrYm94XVwiKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuYXV0b21hdGljX2lucHV0X2RlbFwiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIC8vKioqKioqKioqKioqKioqKipGb3JtIERlbGV0ZSoqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgIC8vRWxpbWluYXIgZW1wcmVzYXMgYXNpZ25hZGEgYSB1biAgdXN1YXJpb1xyXG4gICAgJCgnI0RlbGV0ZVVzZXJDb21wYW55Rm9ybScpLnN1Ym1pdChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBsZXQgY29udGFkb3I6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICAvLyBSZWNvcnJlbW9zIHRvZG9zIGxvcyBjaGVja2JveCBwYXJhIGNvbnRhciBsb3MgcXVlIGVzdGFuIHNlbGVjY2lvbmFkb3NcclxuICAgICAgICAkKFwiLnNlbGVjdENvbXBhbmllc0Fzc2lnbmVkW3R5cGU9Y2hlY2tib3hdXCIpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5wdXQgPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpO1xyXG4gICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcIm5hbWVcIiwgYGNvbXBhbmllc2ApO1xyXG4gICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcImNsYXNzXCIsIFwiYXV0b21hdGljX2lucHV0X2RlbF9lbXBcIik7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC52YWwoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKFwiLmNvbXBhbnlJZEFzaWd0YmxcIikuaHRtbCgpLnRyaW0oKSk7XHJcbiAgICAgICAgICAgICAgICAkKFwiI0RlbGV0ZVVzZXJDb21wYW55Rm9ybVwiKS5hcHBlbmQoaW5wdXQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnRhZG9yID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoIWNvbnRhZG9yKSB7XHJcbiAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsKhRGViZSBzZWxlY2Npb25hciB1biBSZWdpc3RybyFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsK/RGVzZWEgZWxpbWluYXIgZW1wcmVzYXMgYXNpZ25hZGFzP1wiLCBcImNvbmZpcm1cIiwge1xyXG4gICAgICAgICAgICAgICAgb25PazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKHsgYmFja2Ryb3A6ICdzdGF0aWMnLCBrZXlib2FyZDogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5BbGlhc0ZvckNvbXBhbnlcIikudmFsKCQoJyNBbGlhcycpLnZhbCgpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogXCIvdXN1YXJpb3MvZWxpbWluYXJFbXByZXNhc0FzaWduYWRhc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogJChcIiNEZWxldGVVc2VyQ29tcGFueUZvcm1cIikuc2VyaWFsaXplKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogUmVzcG9uc2VVSSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLlR5cGUgPT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRm9ybWF0RXJyb3JzKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbi5TZWFyY2hDb21wYW55dG9Vc2VycygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShkYXRhLk1lc3NhZ2UsIGRhdGEuVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5hdXRvbWF0aWNfaW5wdXRfZGVsX2VtcFwiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBvbkNhbmNlbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuc2VsZWN0Q29tcGFuaWVzQXNzaWduZWRbdHlwZT1jaGVja2JveF1cIikucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLmF1dG9tYXRpY19pbnB1dF9kZWxfZW1wXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgLy9jYXJnYXIgaW1hZ2VuIGRlIHVzdWFyaW9cclxuICAgICQoXCIuSW1hZ2VcIikuY2hhbmdlKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgbGV0IF9kYXRvID0gdGhpcyBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgICAgIGlmICgkKCcjQWxpYXMnKS52YWwoKSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIkVsIHVzdWFyaW8gZGViZSB0ZW5lciB1biBhbGlhc1wiLCBcImVycm9yXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKF9kYXRvLmZpbGVzICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGxldCBvcmlnaW5hbGZvcm06IEhUTUxGb3JtRWxlbWVudDtcclxuICAgICAgICAgICAgICAgIG9yaWdpbmFsZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2F2ZS11c2VyaW1hZ2VzLWZvcm1cIik7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGFmb3JtID0gbmV3IEZvcm1EYXRhKG9yaWdpbmFsZm9ybSk7XHJcbiAgICAgICAgICAgICAgICBkYXRhZm9ybS5hcHBlbmQoXCJBbGlhc1wiLCAkKCcjQWxpYXMnKS52YWwoKS50b1N0cmluZygpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogXCIvdXN1YXJpb3MvY2FyZ2FyaW1hZ2VuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YWZvcm0sXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudFR5cGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3NEYXRhOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogUmVzcG9uc2VVSSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5UeXBlID09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRm9ybWF0RXJyb3JzKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjRm90b3BlcmZpbERQXCIpLmF0dHIoXCJzcmNcIiwgZGF0YS5NZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgJChcIiN0b2dnbGUtcm9sXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgdmFsdWUgPSAkKHRoaXMpLmF0dHIoXCJkYXRhLXZhbHVlXCIpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgaWYgKHZhbHVlID09IFwiMVwiKSB7XHJcbiAgICAgICAgICAgICQodGhpcykuYXR0cihcImRhdGEtdmFsdWVcIiwgXCIyXCIpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKFwiZmEtYW5nbGUtdXBcIik7XHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoXCJmYS1hbmdsZS1kb3duXCIpO1xyXG4gICAgICAgICAgICAkKFwiI3JvbC1jb250YWluZXItdG9nZ2xlXCIpLmFkZENsYXNzKFwiY29sbGFwc2VcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAkKHRoaXMpLmF0dHIoXCJkYXRhLXZhbHVlXCIsIFwiMVwiKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcyhcImZhLWFuZ2xlLXVwXCIpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKFwiZmEtYW5nbGUtZG93blwiKTtcclxuICAgICAgICAgICAgJChcIiNyb2wtY29udGFpbmVyLXRvZ2dsZVwiKS5yZW1vdmVDbGFzcyhcImNvbGxhcHNlXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjdG9nZ2xlLWNvbXBhbnlcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCB2YWx1ZSA9ICQodGhpcykuYXR0cihcImRhdGEtdmFsdWVcIikudG9TdHJpbmcoKTtcclxuICAgICAgICBpZiAodmFsdWUgPT0gXCIxXCIpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5hdHRyKFwiZGF0YS12YWx1ZVwiLCBcIjJcIik7XHJcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoXCJmYS1hbmdsZS11cFwiKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcyhcImZhLWFuZ2xlLWRvd25cIik7XHJcbiAgICAgICAgICAgICQoXCIjY29tcGFuaWVzLWNvbnRhaW5lci10b2dnbGVcIikuYWRkQ2xhc3MoXCJjb2xsYXBzZVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICQodGhpcykuYXR0cihcImRhdGEtdmFsdWVcIiwgXCIxXCIpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKFwiZmEtYW5nbGUtdXBcIik7XHJcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoXCJmYS1hbmdsZS1kb3duXCIpO1xyXG4gICAgICAgICAgICAkKFwiI2NvbXBhbmllcy1jb250YWluZXItdG9nZ2xlXCIpLnJlbW92ZUNsYXNzKFwiY29sbGFwc2VcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIC8vZWxpbWluYXIgdXN1YXJpb1xyXG4gICAgJChcIiNEZWxldGVVc2VyXCIpLnN1Ym1pdChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB2YXIgY29udGFkb3I6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICAvLyBSZWNvcnJlbW9zIHRvZG9zIGxvcyBjaGVja2JveCBwYXJhIGNvbnRhciBsb3MgcXVlIGVzdGFuIHNlbGVjY2lvbmFkb3NcclxuICAgICAgICAkKFwiLnNlbGVjdFVzZXJzW3R5cGU9Y2hlY2tib3hdXCIpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBjb250YWRvciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5wdXQgPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpO1xyXG4gICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcIm5hbWVcIiwgYHVzZXJzYCk7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwiY2xhc3NcIiwgXCJhdXRvbWF0aWNfaW5wdXRfdXNlclwiKTtcclxuICAgICAgICAgICAgICAgIGlucHV0LnZhbCgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoXCIuQWxpYXN0YmxcIikuaHRtbCgpLnRyaW0oKSk7XHJcbiAgICAgICAgICAgICAgICAkKFwiI0RlbGV0ZVVzZXJcIikuYXBwZW5kKGlucHV0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoIWNvbnRhZG9yKSB7XHJcbiAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIkRlYmUgc2VsZWNjaW9uYXIgdW4gUmVnaXN0cm8hIVwiLCBcImVycm9yXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwr9EZXNlYSBlbGltaW5hciB1c3VhcmlvcyBzZWxlY2Npb25hZG9zP1wiLCBcImNvbmZpcm1cIiwge1xyXG4gICAgICAgICAgICAgICAgb25PazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKHsgYmFja2Ryb3A6ICdzdGF0aWMnLCBrZXlib2FyZDogZmFsc2UgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBcIi91c3Vhcmlvcy9lbGltaW5hclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogJChcIiNEZWxldGVVc2VyXCIpLnNlcmlhbGl6ZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IFJlc3BvbnNlVUkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5UeXBlID09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZvcm1hdEVycm9ycyhkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5nZXQobG9jYXRpb24uaHJlZilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXdEb20gPSAkKHIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnRibFVzZXInKS5yZXBsYWNlV2l0aCgkKCcudGJsVXNlcicsIG5ld0RvbSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoZGF0YS5NZXNzYWdlLCBkYXRhLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuYXV0b21hdGljX2lucHV0X3VzZXJcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgb25DYW5jZWw6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLnNlbGVjdFVzZXJzW3R5cGU9Y2hlY2tib3hdXCIpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5hdXRvbWF0aWNfaW5wdXRfdXNlclwiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy9Dw7NkaWdvIHBhcmEgbW9zdHJhciBsYSBheXVkYVxyXG4gICAgJChcIiNpZC1oZWxwLXVzZXJcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IHRoYXQgPSAkKHRoaXMpWzBdO1xyXG4gICAgICAgIHNob3doZWxwKHRoYXQsIFwiL3VzdWFyaW9zL2F5dWRhXCIsIFwiLmhlbHAtdXNlclwiKTtcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAkKCcub3B0aW9uRmlsdGVyJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBvcHRpb25GaWx0ZXJGdW5jdGlvbih0aGlzKTtcclxuICAgICAgICBpZiAoJCgnLnRleHRGaWx0ZXInKS52YWwoKSAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgIERhdGFmaWx0ZXIoXCIudGJvZHktVGFibGUtdXNlclwiLCBcIi91c3Vhcmlvcy9GaWx0ZXJPck1vcmVEYXRhXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoJy50ZXh0RmlsdGVyTWFzaycpLm9uKCdrZXl1cCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgdmFyIGtleWNvZGUgPSBlLmtleUNvZGUgfHwgZS53aGljaDtcclxuICAgICAgICBpZiAoa2V5Y29kZSA9PSAxMykge1xyXG4gICAgICAgICAgICB0ZXh0RmlsdGVyTWFza0Z1bmN0aW9uKHRoaXMpO1xyXG4gICAgICAgICAgICBEYXRhZmlsdGVyKFwiLnRib2R5LVRhYmxlLXVzZXJcIiwgXCIvdXN1YXJpb3MvRmlsdGVyT3JNb3JlRGF0YVwiKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNjb250ZW50LXNjcm9sbFwiKS5zY3JvbGwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBjdXJyZW50c2Nyb2xsID0gJChcIiNjb250ZW50LXNjcm9sbFwiKS5zY3JvbGxUb3AoKTtcclxuXHJcbiAgICAgICAgbGV0IG1heHNjcm9sbCA9ICQoXCIudGJsVXNlclwiKS5vdXRlckhlaWdodCh0cnVlKSAtICQoXCIjY29udGVudC1zY3JvbGxcIikub3V0ZXJIZWlnaHQodHJ1ZSk7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRzY3JvbGwgPT0gTWF0aC5yb3VuZChtYXhzY3JvbGwpKSB7XHJcbiAgICAgICAgICAgIGlmICghaXNCdXN5KSB7XHJcbiAgICAgICAgICAgICAgICBtb3JlZGF0YShtYXhzY3JvbGwsIFwidXN1YXJpb3NcIiwgXCIudGJvZHktVGFibGUtdXNlclwiKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBIYWJpbGl0YXIgZG9ibGUgY2xpYyBlbiBmaWxhcyBwYXJhIGVkaXRhclxyXG4gICAgJChkb2N1bWVudCkub24oJ2RibGNsaWNrJywgJy50Ym9keS1UYWJsZS11c2VyIC5yb3ctYXBwJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBpZiAoJChlLnRhcmdldCkuaXMoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXScpIHx8ICQoZS50YXJnZXQpLmlzKCdsYWJlbCcpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgcm93SWQgPSAkKHRoaXMpLmZpbmQoJy5BbGlhc3RibCcpLnRleHQoKS50cmltKCk7XHJcbiAgICAgICAgaWYgKCFyb3dJZCkgeyByZXR1cm47IH1cclxuXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBgL3VzdWFyaW9zLyR7cm93SWR9YCxcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBJVXNlcnMpIHtcclxuICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uID0gMjtcclxuICAgICAgICAgICAgICAgICAgICBmbi5TZWFyY2hDb21wYW5pZXNEcm9wRG93bkxpc3QoZGF0YS5BbGlhcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm4uU2VhcmNoSW1hZ2VVc2VyKGRhdGEuQWxpYXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZuLkVkaXRBbmROZXdTZXR0aW5ncyhcImVkaXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgQXV0b21hdGljQmluZGluZyhkYXRhLCBcIiNDcmVhdGVBbmRFZGl0VXNlclwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFkYXRhLkVsZXZhdGlvblR5cGVCb29sKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5jb250ZW5kb3JSb2xhbmRDb21wYWllcycpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbi5TZWFyY2hSb2x0b1VzZXJzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZuLlNlYXJjaENvbXBhbnl0b1VzZXJzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmNvbnRlbmRvclJvbGFuZENvbXBhaWVzJykuYWRkQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCJObyBzZSBlbmNvbnRyw7MgZWwgdXN1YXJpb1wiLCBcImVycm9yXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQXBsaWNhciBlc3RpbG8gY2xpY2thYmxlIGEgbGFzIGZpbGFzXHJcbiAgICAkKCcudGJvZHktVGFibGUtdXNlciAucm93LWFwcCcpLmFkZENsYXNzKCdyb3ctY2xpY2thYmxlJyk7XHJcblxyXG4gICAgLy8gSW5pY2lhbGl6YXIgbW9kYWwgZGUgYXVkaXRvcsOtYVxyXG4gICAgaW5pdEF1ZGl0TGlzdFBhZ2UoJy5zZWxlY3RVc2VycycsICcuQWxpYXN0YmwnLCAnL3VzdWFyaW9zL2dldGJ5aWQnLCAnQWxpYXMnKTtcclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiJdfQ==