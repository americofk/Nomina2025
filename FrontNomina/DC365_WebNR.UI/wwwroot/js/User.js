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
            fn.funtionNewAndEditUsers("open");
        }
        else {
            $('.setiartitulo').text("Nuevo usuario");
            $("#Alias").removeAttr("readonly");
            $("#Email").removeAttr("readonly");
            $('.contImputDatosPersonalesFoto').addClass('collapse');
            $('.Contempresa').addClass('collapse');
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
        fn.funtionNewAndEditUsers("close");
    });
    $('#CreateAndEditUser').submit(function (e) {
        if ($(this).valid()) {
            e.preventDefault();
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
        }
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
                    $('.clickCheckver').on('click', function () {
                        let estado = $(this).find(".idCheckver").is(":checked");
                        if (estado) {
                            $(this).parent().parent().find(".idCheckeditar").prop('checked', !estado);
                            $(this).parent().parent().find(".idCheckeliminar").prop('checked', !estado);
                        }
                    });
                    $('.clickCheckeditar').on('click', function () {
                        let estado = $(this).find(".idCheckeditar").is(":checked");
                        if (estado) {
                            $(this).parent().parent().find(".idCheckver").prop('checked', !estado);
                            $(this).parent().parent().find(".idCheckeliminar").prop('checked', !estado);
                        }
                    });
                    $('.clickCheckeliminar').on('click', function () {
                        let estado = $(this).find(".idCheckeliminar").is(":checked");
                        if (estado) {
                            $(this).parent().parent().find(".idCheckver").prop('checked', !estado);
                            $(this).parent().parent().find(".idCheckeditar").prop('checked', !estado);
                        }
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL1R5cGVTY3JpcHRGaWxlL1VzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7R0FPRztBQUVILFNBQVMsRUFBRSxDQUFDO0lBQ1IsSUFBSSxZQUFZLEdBQVcsc0NBQXNDLENBQUM7SUFDbEUsSUFBSSxNQUFjLENBQUM7QUFDdkIsQ0FBQztBQUVELHNCQUFzQjtBQUN0QixNQUFNLEVBQUUsR0FBRztJQUNQLHNEQUFzRDtJQUN0RCxrQkFBa0IsRUFBRSxVQUFVLE1BQU07UUFDaEMsSUFBSSxNQUFNLElBQUksTUFBTSxFQUFFLENBQUM7WUFDbkIsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQzFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ3pDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ3pDLG1EQUFtRDtZQUNuRCxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzFDLENBQUMsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUMzRCxFQUFFLENBQUMsc0JBQXNCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEMsQ0FBQzthQUNJLENBQUM7WUFDRixDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ3pDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDbkMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNuQyxDQUFDLENBQUMsK0JBQStCLENBQUMsQ0FB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byBkZSBnZXN0acOzbiBkZSB1c3VhcmlvcyBkZWwgc2lzdGVtYS4gUGVybWl0ZSBjcmVhciwgZWRpdGFyLFxyXG4gKiAgICAgICAgICAgICAgZWxpbWluYXIgdXN1YXJpb3MgeSBhZG1pbmlzdHJhciByb2xlcyB5IHBlcm1pc29zIGRlIGFjY2Vzby5cclxuICogQGF1dGhvciBFcXVpcG8gZGUgRGVzYXJyb2xsb1xyXG4gKiBAZGF0ZSAyMDI1XHJcbiAqIEBtb2R1bGUgVXN1YXJpb3NcclxuICovXHJcblxyXG52YXJpYWJsZXM6IHtcclxuICAgIHZhciBkZWZhdWx0aW1hZ2U6IHN0cmluZyA9IFwiL0ltYWdlcy9EYXNoYm9hcmQvZGVmYXVsdF9wZXJmaWwucG5nXCI7XHJcbiAgICB2YXIgb3B0aW9uOiBudW1iZXI7XHJcbn1cclxuXHJcbi8vQXJyZWdsbyBkZSBmdW5jaW9uZXNcclxuY29uc3QgZm4gPSB7XHJcbiAgICAvL0NvbmZpZ3VyYXIgZWxlbWVudG9zIGRlbCBkb20gYWwgZWRpdGFyIG8gY3JlYXIgbnVldm9cclxuICAgIEVkaXRBbmROZXdTZXR0aW5nczogZnVuY3Rpb24gKG9wdGlvbikge1xyXG4gICAgICAgIGlmIChvcHRpb24gPT0gXCJlZGl0XCIpIHtcclxuICAgICAgICAgICAgJCgnLnNldGlhcnRpdHVsbycpLnRleHQoXCJFZGl0YXIgdXN1YXJpb1wiKTtcclxuICAgICAgICAgICAgJChcIiNBbGlhc1wiKS5hdHRyKFwicmVhZG9ubHlcIiwgXCJyZWFkb25seVwiKTtcclxuICAgICAgICAgICAgJChcIiNFbWFpbFwiKS5hdHRyKFwicmVhZG9ubHlcIiwgXCJyZWFkb25seVwiKTtcclxuICAgICAgICAgICAgLyogICAgICAgICAgICAkKFwiI0VtYWlsXCIpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7Ki9cclxuICAgICAgICAgICAgJCgnLkNvbnRlbXByZXNhJykucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgICAgICQoJy5jb250SW1wdXREYXRvc1BlcnNvbmFsZXNGb3RvJykucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgICAgIGZuLmZ1bnRpb25OZXdBbmRFZGl0VXNlcnMoXCJvcGVuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgJCgnLnNldGlhcnRpdHVsbycpLnRleHQoXCJOdWV2byB1c3VhcmlvXCIpO1xyXG4gICAgICAgICAgICAkKFwiI0FsaWFzXCIpLnJlbW92ZUF0dHIoXCJyZWFkb25seVwiKTtcclxuICAgICAgICAgICAgJChcIiNFbWFpbFwiKS5yZW1vdmVBdHRyKFwicmVhZG9ubHlcIik7XHJcbiAgICAgICAgICAgICQoJy5jb250SW1wdXREYXRvc1BlcnNvbmFsZXNGb3RvJykuYWRkQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgICAgICQoJy5Db250ZW1wcmVzYScpLmFkZENsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICBmbi5mdW50aW9uTmV3QW5kRWRpdFVzZXJzKFwib3BlblwiKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvL2Z1bmNpb24gYWJyaXIgbnVldm8gdXN1YXJpb1xyXG4gICAgZnVudGlvbk5ld0FuZEVkaXRVc2VyczogZnVuY3Rpb24gKF9vcGNpb24pIHtcclxuICAgICAgICBpZiAoX29wY2lvbiA9PSBcIm9wZW5cIikge1xyXG4gICAgICAgICAgICAkKCcuQ29udGVuZWRvckxpc3RFbnRpdHknKS5hZGRDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgJCgnLmNvbnROZXdFbnR5dGknKS5yZW1vdmVDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgJCgnLm9wY2lvbmVzbGlzdHBhZ2UnKS5hZGRDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgJCgnLm9wY2lvbmVzbGlzdHBhZ2VGb3JtJykucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQoJy5jb250ZW5kb3JSb2xhbmRDb21wYWllcycpLmFkZENsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAkKCcuQ29udGVuZWRvckxpc3RFbnRpdHknKS5yZW1vdmVDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgJCgnLmNvbnROZXdFbnR5dGknKS5hZGRDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgJCgnLm9wY2lvbmVzbGlzdHBhZ2UnKS5yZW1vdmVDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgJCgnLm9wY2lvbmVzbGlzdHBhZ2VGb3JtJykuYWRkQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvL0xpbXBpYSBlbCBmb3JtdWxhcmlvIGRlIGd1YXJkYXIgeSBlZGl0YXJcclxuICAgIENsZWFySW1wdXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgZm9ybTogSFRNTEZvcm1FbGVtZW50O1xyXG4gICAgICAgIGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIkNyZWF0ZUFuZEVkaXRVc2VyXCIpIGFzIEhUTUxGb3JtRWxlbWVudDtcclxuICAgICAgICBmb3JtLnJlc2V0KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vLy9mdW50aW9uIGNyZWFyIHkgZWRpdGFyIHVzdWFyaW9zXHJcbiAgICAvL0NyZWF0ZUFuZEVkaXRVc2VyczogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIC8vfSxcclxuXHJcbiAgICAvL0Z1bnRpb25Nb2RlbFVzZXJzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyAgICBsZXQgRWxldmF0aW9uVHlwZTogc3RyaW5nID0gXCIyXCI7XHJcbiAgICAvLyAgICBsZXQgX0NvbXBhbnlEZWZhdWx0SWQ6IHN0cmluZztcclxuICAgIC8vICAgIGlmICgkKCcuQ29tcGFueURlZmF1bHRJZCcpLnZhbCgpID09IG51bGwpXHJcbiAgICAvLyAgICAgICAgX0NvbXBhbnlEZWZhdWx0SWQgPSBcIlwiO1xyXG4gICAgLy8gICAgZWxzZVxyXG4gICAgLy8gICAgICAgIF9Db21wYW55RGVmYXVsdElkID0gJCgnLkNvbXBhbnlEZWZhdWx0SWQnKS52YWwoKS50b1N0cmluZygpO1xyXG5cclxuICAgIC8vICAgIGlmICgkKFwiLkVsZXZhdGlvblR5cGVcIikuaXMoXCI6Y2hlY2tlZFwiKSkge1xyXG4gICAgLy8gICAgICAgIEVsZXZhdGlvblR5cGUgPSBcIjBcIjtcclxuICAgIC8vICAgIH1cclxuICAgIC8vICAgIHZhciBNb2RlbFVzZXI6IElVc2VycyA9XHJcbiAgICAvLyAgICB7XHJcbiAgICAvLyAgICAgICAgTmFtZTogJCgnLk5hbWUnKS52YWwoKS50b1N0cmluZygpLFxyXG4gICAgLy8gICAgICAgIEFsaWFzOiAkKCcuQWxpYXMnKS52YWwoKS50b1N0cmluZygpLFxyXG4gICAgLy8gICAgICAgIEVtYWlsOiAkKCcuRW1haWwnKS52YWwoKS50b1N0cmluZygpLFxyXG4gICAgLy8gICAgICAgIEZvcm1hdENvZGVJZDogJCgnLkZvcm1hdENvZGVJZCcpLnZhbCgpLnRvU3RyaW5nKCksXHJcbiAgICAvLyAgICAgICAgRWxldmF0aW9uVHlwZTogRWxldmF0aW9uVHlwZSxcclxuICAgIC8vICAgICAgICBDb21wYW55RGVmYXVsdElkOiBfQ29tcGFueURlZmF1bHRJZFxyXG4gICAgLy8gICAgfTtcclxuXHJcbiAgICAvLyAgICByZXR1cm4gTW9kZWxVc2VyO1xyXG4gICAgLy99LFxyXG5cclxuICAgIFNlYXJjaFJvbHRvVXNlcnM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IFwiL3VzdWFyaW9zL0J1c2NhclJvbFVzdWFyaW9cIixcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgQWxpYXM6ICQoJyNBbGlhcycpLnZhbCgpLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNBbGxUYWJsZVJvbFwiKS5odG1sKCcnKTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI0FsbFRhYmxlUm9sXCIpLmFwcGVuZChkYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgU2VhcmNoQ29tcGFueXRvVXNlcnM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IFwiL3VzdWFyaW9zL0J1c2NhckVtcHJlc2FzVXN1YXJpb1wiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBBbGlhczogJCgnI0FsaWFzJykudmFsKCkudG9TdHJpbmcoKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI0FsbFRhYmxlQ29tcGFueVwiKS5odG1sKCcnKTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI0FsbFRhYmxlQ29tcGFueVwiKS5hcHBlbmQoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIFNlYXJjaENvbXBhbmllc0Ryb3BEb3duTGlzdDogZnVuY3Rpb24gKF9pZDogc3RyaW5nKSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBcIi91c3Vhcmlvcy9CdXNjYXJMaXN0YUVtcHJlc2FcIixcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgQWxpYXM6IF9pZFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBhc3luYzogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgJChcIi5Db21wYW55RGVmYXVsdElkXCIpLmh0bWwoJycpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBvcHRpb24gPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpKTtcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb24udGV4dChcIlNlbGVjY2lvbmUuLi5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnZhbChcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLkNvbXBhbnlEZWZhdWx0SWRcIikuYXBwZW5kKG9wdGlvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoZGF0YSkuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcHRpb24gPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnRleHQodGhpcy5Db21wYW55TmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi52YWwodGhpcy5jb21wYW55SWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiLkNvbXBhbnlEZWZhdWx0SWRcIikuYXBwZW5kKG9wdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBTZWFyY2hJbWFnZVVzZXI6IGZ1bmN0aW9uIChfYWxpYXM6IHN0cmluZykge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogXCIvdXN1YXJpb3MvZGVzY2FyZ2FyaW1hZ2VuXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIEFsaWFzOiBfYWxpYXNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBSZXNwb25zZVVJKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5NZXNzYWdlICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI0ZvdG9wZXJmaWxEUFwiKS5hdHRyKFwic3JjXCIsIGRhdGEuTWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI0ZvdG9wZXJmaWxEUFwiKS5hdHRyKFwic3JjXCIsIGRlZmF1bHRpbWFnZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5cclxuZXNjdWNoYWRvcmVzOiB7XHJcbiAgICAvL0NyZWFyIG51ZXZvIHVzdWFyaW9cclxuICAgICQoJy5OZXdVc2VyJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIG9wdGlvbiA9IDE7XHJcbiAgICAgICAgJChcIiNGb3RvcGVyZmlsRFBcIikuYXR0cihcInNyY1wiLCBkZWZhdWx0aW1hZ2UpO1xyXG4gICAgICAgIGZuLkNsZWFySW1wdXQoKTtcclxuICAgICAgICBmbi5FZGl0QW5kTmV3U2V0dGluZ3MoXCJuZXdcIik7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL0VkaXRhciB1c3VhcmlvXHJcbiAgICAkKFwiLkVkaXRVc2Vyc1wiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgaWQ6IHN0cmluZztcclxuICAgICAgICBsZXQgY29udGFkb3I6IG51bWJlciA9IDA7XHJcblxyXG4gICAgICAgIC8vIFJlY29ycmVtb3MgdG9kb3MgbG9zIGNoZWNrYm94IHBhcmEgY29udGFyIGxvcyBxdWUgZXN0YW4gc2VsZWNjaW9uYWRvc1xyXG4gICAgICAgICQoXCIuc2VsZWN0VXNlcnNbdHlwZT1jaGVja2JveF1cIikuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmlzKFwiOmNoZWNrZWRcIikpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRhZG9yKys7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29udGFkb3IgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsKhRGViZSBzZWxlY2Npb25hciB1biBzb2xvIHJlZ2lzdHJvIVwiLCBcImVycm9yXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZCA9ICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZChcIi5BbGlhc3RibFwiKS5odG1sKCkudHJpbSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChjb250YWRvciAhPSAyKSB7XHJcbiAgICAgICAgICAgIGlmIChjb250YWRvciA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCoURlYmUgc2VsZWNjaW9uYXIgdW4gcmVnaXN0cm8hXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IGAvdXN1YXJpb3MvJHtpZH1gLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IElVc2Vycykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uID0gMjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbi5TZWFyY2hDb21wYW5pZXNEcm9wRG93bkxpc3QoZGF0YS5BbGlhcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbi5TZWFyY2hJbWFnZVVzZXIoZGF0YS5BbGlhcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbi5FZGl0QW5kTmV3U2V0dGluZ3MoXCJlZGl0XCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEF1dG9tYXRpY0JpbmRpbmcoZGF0YSwgXCIjQ3JlYXRlQW5kRWRpdFVzZXJcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFkYXRhLkVsZXZhdGlvblR5cGVCb29sKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8kKCcjRWxldmF0aW9uVHlwZScpLnByb3AoXCJjaGVja2VkXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5jb250ZW5kb3JSb2xhbmRDb21wYWllcycpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuLlNlYXJjaFJvbHRvVXNlcnMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbi5TZWFyY2hDb21wYW55dG9Vc2VycygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8kKCcjRWxldmF0aW9uVHlwZScpLnByb3AoXCJjaGVja2VkXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuY29udGVuZG9yUm9sYW5kQ29tcGFpZXMnKS5hZGRDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCJObyBzZSBlbmNvbnRyw7MgZWwgdXN1YXJpb1wiLCBcImVycm9yXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5PcENsb3NlZm9ybScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmbi5mdW50aW9uTmV3QW5kRWRpdFVzZXJzKFwiY2xvc2VcIik7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcjQ3JlYXRlQW5kRWRpdFVzZXInKS5zdWJtaXQoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBpZiAoJCh0aGlzKS52YWxpZCgpKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKHsgYmFja2Ryb3A6ICdzdGF0aWMnLCBrZXlib2FyZDogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IFwiL3VzdWFyaW9zL2d1YXJkYXJcIixcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogJCh0aGlzKS5zZXJpYWxpemUoKSArIGAmb3BlcmFjaW9uPSR7b3B0aW9ufWAsXHJcbiAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBSZXNwb25zZVVJKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5UeXBlID09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBGb3JtYXRFcnJvcnMoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uID0gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm4uRWRpdEFuZE5ld1NldHRpbmdzKFwiZWRpdFwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghJCgnLkVsZXZhdGlvblR5cGUnKS5pcyhcIjpjaGVja2VkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuY29udGVuZG9yUm9sYW5kQ29tcGFpZXMnKS5yZW1vdmVDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuLlNlYXJjaFJvbHRvVXNlcnMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuLlNlYXJjaENvbXBhbnl0b1VzZXJzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuY29udGVuZG9yUm9sYW5kQ29tcGFpZXMnKS5hZGRDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkLmdldChsb2NhdGlvbi5ocmVmKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV3RG9tID0gJChyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcudGJsVXNlcicpLnJlcGxhY2VXaXRoKCQoJy50YmxVc2VyJywgbmV3RG9tKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKGRhdGEuTWVzc2FnZSwgZGF0YS5UeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIG1vc3RyYXIgbW9kYWwgZGUgdG9kYXMgbGFzIGVtcHJlc2FzXHJcbiAgICAkKCcuU2hvd01vZENvbXBhbmllcycpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IFwiL3VzdWFyaW9zL21vZGFsZW1wcmVzYXNcIixcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5Nb2RDb21wYW5pZXNcIikuaHRtbCgnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5Nb2RDb21wYW5pZXNcIikuYXBwZW5kKGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyoqKioqKioqKioqKioqKioqRm9ybSoqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICAgICAgICAgICAgICAgICAvL2d1YXJkYXIgZW1wcmVzYXMgZGUgdXN1YXJpb1xyXG4gICAgICAgICAgICAgICAgICAgICQoJyNTYXZlVXNlckNvbXBhbnlGb3JtJykuc3VibWl0KGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhZG9yOiBudW1iZXIgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBSZWNvcnJlbW9zIHRvZG9zIGxvcyBjaGVja2JveCBwYXJhIGNvbnRhciBsb3MgcXVlIGVzdGFuIHNlbGVjY2lvbmFkb3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5zZWxlY3RPcHRpb25Db21wYW5pZXNbdHlwZT1jaGVja2JveF1cIikuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbnB1dCA9ICQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcIm5hbWVcIiwgYGNvbXBhbmllc1ske2NvbnRhZG9yfV0uY29tcGFueUlkYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcImNsYXNzXCIsIFwiYXV0b21hdGljX2lucHV0X2VtcFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWwoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKFwiLmNvbXBhbnlJZHRibFwiKS5odG1sKCkudHJpbSgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiI1NhdmVVc2VyQ29tcGFueUZvcm1cIikuYXBwZW5kKGlucHV0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQgPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJuYW1lXCIsIGBjb21wYW5pZXNbJHtjb250YWRvcn1dLkFsaWFzYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcImNsYXNzXCIsIFwiYXV0b21hdGljX2lucHV0X2VtcFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWwoJChcIiNBbGlhc1wiKS52YWwoKS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiI1NhdmVVc2VyQ29tcGFueUZvcm1cIikuYXBwZW5kKGlucHV0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFkb3IrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWNvbnRhZG9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCoURlYmUgc2VsZWNjaW9uYXIgYWwgbWVub3MgdW4gcmVnaXN0cm8hXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogXCIvdXN1YXJpb3MvZ3VhcmRhckVtcHJlc2FzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogJChcIiNTYXZlVXNlckNvbXBhbnlGb3JtXCIpLnNlcmlhbGl6ZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBSZXNwb25zZVVJKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzbycpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLlR5cGUgPT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBGb3JtYXRFcnJvcnMoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiLmF1dG9tYXRpY19pbnB1dF9lbXBcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbi5TZWFyY2hDb21wYW55dG9Vc2VycygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm4uU2VhcmNoQ29tcGFuaWVzRHJvcERvd25MaXN0KCQoXCIjQWxpYXNcIikudmFsKCkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuTW9kQ29tcGFuaWVzJykubW9kYWwoXCJoaWRlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuc2VsZWN0T3B0aW9uQ29tcGFuaWVzJykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShkYXRhLk1lc3NhZ2UsIGRhdGEuVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiLmF1dG9tYXRpY19pbnB1dF9lbXBcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiLkJ1c2NhcnRibENvbXBhbmllc1wiKS5rZXl1cChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2hvdyBvbmx5IG1hdGNoaW5nIFRSLCBoaWRlIHJlc3Qgb2YgdGhlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5lYWNoKCQoXCIudGJsQ29tcGFuaWUgdGJvZHkgdHJcIiksIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS50ZXh0KCkudG9Mb3dlckNhc2UoKS5pbmRleE9mKCQoX3RoaXMpLnZhbCgpLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKSkgPT09IC0xKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9zZWxlY3QgYWxsIGNvbXBhbmllc1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjY2hlY2stdGFibGUtQXNpZ0N1c3RcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmlzKFwiOmNoZWNrZWRcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuc2VsZWN0T3B0aW9uQ29tcGFuaWVzW3R5cGU9Y2hlY2tib3hdXCIpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuc2VsZWN0T3B0aW9uQ29tcGFuaWVzW3R5cGU9Y2hlY2tib3hdXCIpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJCgnLk1vZENvbXBhbmllcycpLm1vZGFsKCdzaG93Jyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBtb3N0cmFyIG1vZGFsIGRlIHRvZG9zIGxhcyBvcGNpb25lcyBkZWwgbWVudVxyXG4gICAgJCgnLnNob3dSb2xlcycpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IFwiL3VzdWFyaW9zL21vZGFscm9sZXNcIixcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5Nb2RBc2lnUm9sZXNcIikuaHRtbCgnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5Nb2RBc2lnUm9sZXNcIikuYXBwZW5kKGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL09wY2nDs24gcGFyYSBhbHRlcm5hciBlbnRyZSBsb3Mgcm9sZXMgZGUgdmVyLCBlZGl0YXIgeSBlbGltaW5hciwgc2Vnw7puIHNlIG1hcnF1ZW5cclxuICAgICAgICAgICAgICAgICAgICAvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICAgICAgICAgICAgICAgICAkKCcuY2xpY2tDaGVja3ZlcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGVzdGFkbyA9ICQodGhpcykuZmluZChcIi5pZENoZWNrdmVyXCIpLmlzKFwiOmNoZWNrZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlc3RhZG8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZChcIi5pZENoZWNrZWRpdGFyXCIpLnByb3AoJ2NoZWNrZWQnLCAhZXN0YWRvKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKFwiLmlkQ2hlY2tlbGltaW5hclwiKS5wcm9wKCdjaGVja2VkJywgIWVzdGFkbylcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKCcuY2xpY2tDaGVja2VkaXRhcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGVzdGFkbyA9ICQodGhpcykuZmluZChcIi5pZENoZWNrZWRpdGFyXCIpLmlzKFwiOmNoZWNrZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlc3RhZG8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZChcIi5pZENoZWNrdmVyXCIpLnByb3AoJ2NoZWNrZWQnLCAhZXN0YWRvKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKFwiLmlkQ2hlY2tlbGltaW5hclwiKS5wcm9wKCdjaGVja2VkJywgIWVzdGFkbylcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmNsaWNrQ2hlY2tlbGltaW5hcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGVzdGFkbyA9ICQodGhpcykuZmluZChcIi5pZENoZWNrZWxpbWluYXJcIikuaXMoXCI6Y2hlY2tlZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVzdGFkbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKFwiLmlkQ2hlY2t2ZXJcIikucHJvcCgnY2hlY2tlZCcsICFlc3RhZG8pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoXCIuaWRDaGVja2VkaXRhclwiKS5wcm9wKCdjaGVja2VkJywgIWVzdGFkbylcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyoqKioqKioqKioqKioqKioqRm9ybSoqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICAgICAgICAgICAgICAgICAvL2d1YXJkYXIgcm9sZXMgZGUgdXN1YXJpb1xyXG4gICAgICAgICAgICAgICAgICAgICQoJyNTYXZlVXNlclJvbEZvcm0nKS5zdWJtaXQoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFkb3I6IG51bWJlciA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlY29ycmVtb3MgdG9kb3MgbG9zIGNoZWNrYm94IHBhcmEgY29udGFyIGxvcyBxdWUgZXN0YW4gc2VsZWNjaW9uYWRvc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiLnNlbGVjdEFzaWdSb2xbdHlwZT1jaGVja2JveF1cIikuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbnB1dCA9ICQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcIm5hbWVcIiwgYHJvbGVzWyR7Y29udGFkb3J9XS5NZW51SWRgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwiY2xhc3NcIiwgXCJhdXRvbWF0aWNfaW5wdXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZChcIi5NZW51SWR0Ymxyb2xcIikuaHRtbCgpLnRyaW0oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNTYXZlVXNlclJvbEZvcm1cIikuYXBwZW5kKGlucHV0KTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0ID0gJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwibmFtZVwiLCBgcm9sZXNbJHtjb250YWRvcn1dLkFsaWFzYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcImNsYXNzXCIsIFwiYXV0b21hdGljX2lucHV0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LnZhbCgkKCcjQWxpYXMnKS52YWwoKS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiI1NhdmVVc2VyUm9sRm9ybVwiKS5hcHBlbmQoaW5wdXQpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQgPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJuYW1lXCIsIGByb2xlc1ske2NvbnRhZG9yfV0uUHJpdmlsZWdlVmlld2ApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJjbGFzc1wiLCBcImF1dG9tYXRpY19pbnB1dFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwidHlwZVwiLCBcImNoZWNrYm94XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjU2F2ZVVzZXJSb2xGb3JtXCIpLmFwcGVuZChpbnB1dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQucHJvcChcImNoZWNrZWRcIiwgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKFwiLmlkQ2hlY2t2ZXJcIikuaXMoXCI6Y2hlY2tlZFwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsKCgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoXCIuaWRDaGVja3ZlclwiKS5pcyhcIjpjaGVja2VkXCIpKS50b1N0cmluZygpKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0ID0gJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwibmFtZVwiLCBgcm9sZXNbJHtjb250YWRvcn1dLlByaXZpbGVnZUVkaXRgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwiY2xhc3NcIiwgXCJhdXRvbWF0aWNfaW5wdXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcInR5cGVcIiwgXCJjaGVja2JveFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiI1NhdmVVc2VyUm9sRm9ybVwiKS5hcHBlbmQoaW5wdXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LnByb3AoXCJjaGVja2VkXCIsICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZChcIi5pZENoZWNrZWRpdGFyXCIpLmlzKFwiOmNoZWNrZWRcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LnZhbCgoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKFwiLmlkQ2hlY2tlZGl0YXJcIikuaXMoXCI6Y2hlY2tlZFwiKSkudG9TdHJpbmcoKSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dCA9ICQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcInR5cGVcIiwgXCJjaGVja2JveFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwibmFtZVwiLCBgcm9sZXNbJHtjb250YWRvcn1dLlByaXZpbGVnZURlbGV0ZWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJjbGFzc1wiLCBcImF1dG9tYXRpY19pbnB1dFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiI1NhdmVVc2VyUm9sRm9ybVwiKS5hcHBlbmQoaW5wdXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaW5wdXQucHJvcChcImNoZWNrZWRcIiwgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKFwiLmlkQ2hlY2tlbGltaW5hclwiKS5pcyhcIjpjaGVja2VkXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5wcm9wKFwiY2hlY2tlZFwiLCAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoXCIuaWRDaGVja2VsaW1pbmFyXCIpLmlzKFwiOmNoZWNrZWRcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LnZhbCgoJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKFwiLmlkQ2hlY2tlbGltaW5hclwiKS5pcyhcIjpjaGVja2VkXCIpKS50b1N0cmluZygpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFkb3IrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRhZG9yID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIsKhRGViZSBzZWxlY2Npb25hciBhbCBtZW5vcyB1biByZWdpc3RybyFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBcIi91c3Vhcmlvcy9ndWFyZGFyUm9sXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogJCh0aGlzKS5zZXJpYWxpemUoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogUmVzcG9uc2VVSSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5UeXBlID09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRm9ybWF0RXJyb3JzKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5hdXRvbWF0aWNfaW5wdXRcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoZGF0YS5NZXNzYWdlLCBkYXRhLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm4uU2VhcmNoUm9sdG9Vc2VycygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLk1vZEFzaWdSb2xlcycpLm1vZGFsKFwiaGlkZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qJChcIi50Ym9keVRhYmxlTWVudVwiKS5sb2FkKGxvY2F0aW9uLmhyZWYgKyBcIiAudGJvZHlUYWJsZU1lbnU+KlwiLCBcIlwiKTsqL1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuYXV0b21hdGljX2lucHV0XCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKFwiLkJ1c2NhcnRibHJvbGVzXCIpLmtleXVwKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2hvdyBvbmx5IG1hdGNoaW5nIFRSLCBoaWRlIHJlc3Qgb2YgdGhlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkLmVhY2goJChcIi50Ymxyb2xlcy1wYXJhLWFzaWduYXIgdGJvZHkgdHJcIiksIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnRleHQoKS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJChfdGhpcykudmFsKCkudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpKSA9PT0gLTEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL3NlbGVjdCBhbGwgcm9sc1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuc2VsZWN0T3B0aW9uQ29tcGFuaWVzQWxsXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiLnNlbGVjdEFzaWdSb2xbdHlwZT1jaGVja2JveF1cIikucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5zZWxlY3RBc2lnUm9sW3R5cGU9Y2hlY2tib3hdXCIpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJCgnLk1vZEFzaWdSb2xlcycpLm1vZGFsKCdzaG93Jyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI05hbWVcIikuY2hhbmdlKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgJCh0aGlzKS52YWwoRmlydHNjYXBpdGFsbGV0dGVyKCQodGhpcykudmFsKCkudG9TdHJpbmcoKSkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNFbWFpbFwiKS5jaGFuZ2UoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAkKHRoaXMpLnZhbChNYXl1c2N1bGEoJCh0aGlzKS52YWwoKS50b1N0cmluZygpKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI0FsaWFzXCIpLmNoYW5nZShmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICQodGhpcykudmFsKE1heXVzY3VsYSgkKHRoaXMpLnZhbCgpLnRvU3RyaW5nKCkpKTtcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAvLyoqKioqKioqKioqKioqKioqRm9ybSBEZWxldGUqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAvL0VsaW1pbmFyIHJvbGVzIGFzaWduYWRvcyBhIHVuIHVzdWFyaW9cclxuICAgICQoJyNEZWxldGVVc2VyUm9sRm9ybScpLnN1Ym1pdChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB2YXIgY29udGFkb3I6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICAvLyBSZWNvcnJlbW9zIHRvZG9zIGxvcyBjaGVja2JveCBwYXJhIGNvbnRhciBsb3MgcXVlIGVzdGFuIHNlbGVjY2lvbmFkb3NcclxuICAgICAgICAkKFwiLnNlbGVjUm9sQXNpZ25hZG9zW3R5cGU9Y2hlY2tib3hdXCIpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5wdXQgPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpO1xyXG4gICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcIm5hbWVcIiwgYHJvbGVzYCk7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwiY2xhc3NcIiwgXCJhdXRvbWF0aWNfaW5wdXRfZGVsXCIpO1xyXG4gICAgICAgICAgICAgICAgaW5wdXQudmFsKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZChcIi5NZW51SWRBc3NpZ25lZHRibFwiKS5odG1sKCkudHJpbSgpKTtcclxuICAgICAgICAgICAgICAgICQoXCIjRGVsZXRlVXNlclJvbEZvcm1cIikuYXBwZW5kKGlucHV0KTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb250YWRvciA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKCFjb250YWRvcikge1xyXG4gICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCoURlYmUgc2VsZWNjaW9uYXIgYWwgbWVub3MgdW4gcmVnaXN0cm8hXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCv0Rlc2VhIGVsaW1pbmFyIHJvbGVzIGFzaWduYWRhcz9cIiwgXCJjb25maXJtXCIsIHtcclxuICAgICAgICAgICAgICAgIG9uT2s6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLkFsaWFzRm9yUm9sZVwiKS52YWwoJCgnI0FsaWFzJykudmFsKCkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoeyBiYWNrZHJvcDogJ3N0YXRpYycsIGtleWJvYXJkOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFwiL3VzdWFyaW9zL2VsaW1pbmFyUm9sZXNBc2lnbmFkYXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ICQoXCIjRGVsZXRlVXNlclJvbEZvcm1cIikuc2VyaWFsaXplKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogUmVzcG9uc2VVSSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLlR5cGUgPT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRm9ybWF0RXJyb3JzKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbi5TZWFyY2hSb2x0b1VzZXJzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKGRhdGEuTWVzc2FnZSwgZGF0YS5UeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLmF1dG9tYXRpY19pbnB1dF9kZWxcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgb25DYW5jZWw6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLnNlbGVjUm9sQXNpZ25hZG9zW3R5cGU9Y2hlY2tib3hdXCIpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5hdXRvbWF0aWNfaW5wdXRfZGVsXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgLy8qKioqKioqKioqKioqKioqKkZvcm0gRGVsZXRlKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgLy9FbGltaW5hciBlbXByZXNhcyBhc2lnbmFkYSBhIHVuICB1c3VhcmlvXHJcbiAgICAkKCcjRGVsZXRlVXNlckNvbXBhbnlGb3JtJykuc3VibWl0KGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGxldCBjb250YWRvcjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIC8vIFJlY29ycmVtb3MgdG9kb3MgbG9zIGNoZWNrYm94IHBhcmEgY29udGFyIGxvcyBxdWUgZXN0YW4gc2VsZWNjaW9uYWRvc1xyXG4gICAgICAgICQoXCIuc2VsZWN0Q29tcGFuaWVzQXNzaWduZWRbdHlwZT1jaGVja2JveF1cIikuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmlzKFwiOmNoZWNrZWRcIikpIHtcclxuICAgICAgICAgICAgICAgIGxldCBpbnB1dCA9ICQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSk7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwibmFtZVwiLCBgY29tcGFuaWVzYCk7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwiY2xhc3NcIiwgXCJhdXRvbWF0aWNfaW5wdXRfZGVsX2VtcFwiKTtcclxuICAgICAgICAgICAgICAgIGlucHV0LnZhbCgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoXCIuY29tcGFueUlkQXNpZ3RibFwiKS5odG1sKCkudHJpbSgpKTtcclxuICAgICAgICAgICAgICAgICQoXCIjRGVsZXRlVXNlckNvbXBhbnlGb3JtXCIpLmFwcGVuZChpbnB1dCk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29udGFkb3IgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmICghY29udGFkb3IpIHtcclxuICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwqFEZWJlIHNlbGVjY2lvbmFyIHVuIFJlZ2lzdHJvIVwiLCBcImVycm9yXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiwr9EZXNlYSBlbGltaW5hciBlbXByZXNhcyBhc2lnbmFkYXM/XCIsIFwiY29uZmlybVwiLCB7XHJcbiAgICAgICAgICAgICAgICBvbk9rOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoeyBiYWNrZHJvcDogJ3N0YXRpYycsIGtleWJvYXJkOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLkFsaWFzRm9yQ29tcGFueVwiKS52YWwoJCgnI0FsaWFzJykudmFsKCkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBcIi91c3Vhcmlvcy9lbGltaW5hckVtcHJlc2FzQXNpZ25hZGFzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAkKFwiI0RlbGV0ZVVzZXJDb21wYW55Rm9ybVwiKS5zZXJpYWxpemUoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBSZXNwb25zZVVJKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuVHlwZSA9PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBGb3JtYXRFcnJvcnMoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuLlNlYXJjaENvbXBhbnl0b1VzZXJzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKGRhdGEuTWVzc2FnZSwgZGF0YS5UeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWNjaW9uYXJhbExvZ2luKHhocik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLmF1dG9tYXRpY19pbnB1dF9kZWxfZW1wXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG9uQ2FuY2VsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5zZWxlY3RDb21wYW5pZXNBc3NpZ25lZFt0eXBlPWNoZWNrYm94XVwiKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuYXV0b21hdGljX2lucHV0X2RlbF9lbXBcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAvL2NhcmdhciBpbWFnZW4gZGUgdXN1YXJpb1xyXG4gICAgJChcIi5JbWFnZVwiKS5jaGFuZ2UoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBsZXQgX2RhdG8gPSB0aGlzIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICAgICAgaWYgKCQoJyNBbGlhcycpLnZhbCgpID09IG51bGwpIHtcclxuICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiRWwgdXN1YXJpbyBkZWJlIHRlbmVyIHVuIGFsaWFzXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoX2RhdG8uZmlsZXMgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG9yaWdpbmFsZm9ybTogSFRNTEZvcm1FbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzYXZlLXVzZXJpbWFnZXMtZm9ybVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0YWZvcm0gPSBuZXcgRm9ybURhdGEob3JpZ2luYWxmb3JtKTtcclxuICAgICAgICAgICAgICAgIGRhdGFmb3JtLmFwcGVuZChcIkFsaWFzXCIsICQoJyNBbGlhcycpLnZhbCgpLnRvU3RyaW5nKCkpO1xyXG5cclxuICAgICAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBcIi91c3Vhcmlvcy9jYXJnYXJpbWFnZW5cIixcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhZm9ybSxcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50VHlwZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc0RhdGE6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBSZXNwb25zZVVJKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLlR5cGUgPT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBGb3JtYXRFcnJvcnMoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJvZ3Jlc28nKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNGb3RvcGVyZmlsRFBcIikuYXR0cihcInNyY1wiLCBkYXRhLk1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVkaXJlY2Npb25hcmFsTG9naW4oeGhyKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAkKFwiI3RvZ2dsZS1yb2xcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCB2YWx1ZSA9ICQodGhpcykuYXR0cihcImRhdGEtdmFsdWVcIikudG9TdHJpbmcoKTtcclxuICAgICAgICBpZiAodmFsdWUgPT0gXCIxXCIpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5hdHRyKFwiZGF0YS12YWx1ZVwiLCBcIjJcIik7XHJcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoXCJmYS1hbmdsZS11cFwiKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcyhcImZhLWFuZ2xlLWRvd25cIik7XHJcbiAgICAgICAgICAgICQoXCIjcm9sLWNvbnRhaW5lci10b2dnbGVcIikuYWRkQ2xhc3MoXCJjb2xsYXBzZVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICQodGhpcykuYXR0cihcImRhdGEtdmFsdWVcIiwgXCIxXCIpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKFwiZmEtYW5nbGUtdXBcIik7XHJcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoXCJmYS1hbmdsZS1kb3duXCIpO1xyXG4gICAgICAgICAgICAkKFwiI3JvbC1jb250YWluZXItdG9nZ2xlXCIpLnJlbW92ZUNsYXNzKFwiY29sbGFwc2VcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiN0b2dnbGUtY29tcGFueVwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IHZhbHVlID0gJCh0aGlzKS5hdHRyKFwiZGF0YS12YWx1ZVwiKS50b1N0cmluZygpO1xyXG4gICAgICAgIGlmICh2YWx1ZSA9PSBcIjFcIikge1xyXG4gICAgICAgICAgICAkKHRoaXMpLmF0dHIoXCJkYXRhLXZhbHVlXCIsIFwiMlwiKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcyhcImZhLWFuZ2xlLXVwXCIpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKFwiZmEtYW5nbGUtZG93blwiKTtcclxuICAgICAgICAgICAgJChcIiNjb21wYW5pZXMtY29udGFpbmVyLXRvZ2dsZVwiKS5hZGRDbGFzcyhcImNvbGxhcHNlXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5hdHRyKFwiZGF0YS12YWx1ZVwiLCBcIjFcIik7XHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoXCJmYS1hbmdsZS11cFwiKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcyhcImZhLWFuZ2xlLWRvd25cIik7XHJcbiAgICAgICAgICAgICQoXCIjY29tcGFuaWVzLWNvbnRhaW5lci10b2dnbGVcIikucmVtb3ZlQ2xhc3MoXCJjb2xsYXBzZVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgLy9lbGltaW5hciB1c3VhcmlvXHJcbiAgICAkKFwiI0RlbGV0ZVVzZXJcIikuc3VibWl0KGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHZhciBjb250YWRvcjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIC8vIFJlY29ycmVtb3MgdG9kb3MgbG9zIGNoZWNrYm94IHBhcmEgY29udGFyIGxvcyBxdWUgZXN0YW4gc2VsZWNjaW9uYWRvc1xyXG4gICAgICAgICQoXCIuc2VsZWN0VXNlcnNbdHlwZT1jaGVja2JveF1cIikuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmlzKFwiOmNoZWNrZWRcIikpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRhZG9yID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGxldCBpbnB1dCA9ICQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSk7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwibmFtZVwiLCBgdXNlcnNgKTtcclxuICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJjbGFzc1wiLCBcImF1dG9tYXRpY19pbnB1dF91c2VyXCIpO1xyXG4gICAgICAgICAgICAgICAgaW5wdXQudmFsKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZChcIi5BbGlhc3RibFwiKS5odG1sKCkudHJpbSgpKTtcclxuICAgICAgICAgICAgICAgICQoXCIjRGVsZXRlVXNlclwiKS5hcHBlbmQoaW5wdXQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmICghY29udGFkb3IpIHtcclxuICAgICAgICAgICAgd2luZG93c19tZXNzYWdlKFwiRGViZSBzZWxlY2Npb25hciB1biBSZWdpc3RybyEhXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB3aW5kb3dzX21lc3NhZ2UoXCLCv0Rlc2VhIGVsaW1pbmFyIHVzdWFyaW9zIHNlbGVjY2lvbmFkb3M/XCIsIFwiY29uZmlybVwiLCB7XHJcbiAgICAgICAgICAgICAgICBvbk9rOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoeyBiYWNrZHJvcDogJ3N0YXRpYycsIGtleWJvYXJkOiBmYWxzZSB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFwiL3VzdWFyaW9zL2VsaW1pbmFyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAkKFwiI0RlbGV0ZVVzZXJcIikuc2VyaWFsaXplKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogUmVzcG9uc2VVSSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLlR5cGUgPT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRm9ybWF0RXJyb3JzKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmdldChsb2NhdGlvbi5ocmVmKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5ld0RvbSA9ICQocik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcudGJsVXNlcicpLnJlcGxhY2VXaXRoKCQoJy50YmxVc2VyJywgbmV3RG9tKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShkYXRhLk1lc3NhZ2UsIGRhdGEuVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5hdXRvbWF0aWNfaW5wdXRfdXNlclwiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBvbkNhbmNlbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuc2VsZWN0VXNlcnNbdHlwZT1jaGVja2JveF1cIikucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLmF1dG9tYXRpY19pbnB1dF91c2VyXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL0PDs2RpZ28gcGFyYSBtb3N0cmFyIGxhIGF5dWRhXHJcbiAgICAkKFwiI2lkLWhlbHAtdXNlclwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgdGhhdCA9ICQodGhpcylbMF07XHJcbiAgICAgICAgc2hvd2hlbHAodGhhdCwgXCIvdXN1YXJpb3MvYXl1ZGFcIiwgXCIuaGVscC11c2VyXCIpO1xyXG4gICAgfSk7XHJcblxyXG5cclxuICAgICQoJy5vcHRpb25GaWx0ZXInKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIG9wdGlvbkZpbHRlckZ1bmN0aW9uKHRoaXMpO1xyXG4gICAgICAgIGlmICgkKCcudGV4dEZpbHRlcicpLnZhbCgpICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgRGF0YWZpbHRlcihcIi50Ym9keS1UYWJsZS11c2VyXCIsIFwiL3VzdWFyaW9zL0ZpbHRlck9yTW9yZURhdGFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnLnRleHRGaWx0ZXJNYXNrJykub24oJ2tleXVwJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICB2YXIga2V5Y29kZSA9IGUua2V5Q29kZSB8fCBlLndoaWNoO1xyXG4gICAgICAgIGlmIChrZXljb2RlID09IDEzKSB7XHJcbiAgICAgICAgICAgIHRleHRGaWx0ZXJNYXNrRnVuY3Rpb24odGhpcyk7XHJcbiAgICAgICAgICAgIERhdGFmaWx0ZXIoXCIudGJvZHktVGFibGUtdXNlclwiLCBcIi91c3Vhcmlvcy9GaWx0ZXJPck1vcmVEYXRhXCIpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI2NvbnRlbnQtc2Nyb2xsXCIpLnNjcm9sbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRzY3JvbGwgPSAkKFwiI2NvbnRlbnQtc2Nyb2xsXCIpLnNjcm9sbFRvcCgpO1xyXG5cclxuICAgICAgICBsZXQgbWF4c2Nyb2xsID0gJChcIi50YmxVc2VyXCIpLm91dGVySGVpZ2h0KHRydWUpIC0gJChcIiNjb250ZW50LXNjcm9sbFwiKS5vdXRlckhlaWdodCh0cnVlKTtcclxuICAgICAgICBpZiAoY3VycmVudHNjcm9sbCA9PSBNYXRoLnJvdW5kKG1heHNjcm9sbCkpIHtcclxuICAgICAgICAgICAgaWYgKCFpc0J1c3kpIHtcclxuICAgICAgICAgICAgICAgIG1vcmVkYXRhKG1heHNjcm9sbCwgXCJ1c3Vhcmlvc1wiLCBcIi50Ym9keS1UYWJsZS11c2VyXCIpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEhhYmlsaXRhciBkb2JsZSBjbGljIGVuIGZpbGFzIHBhcmEgZWRpdGFyXHJcbiAgICAkKGRvY3VtZW50KS5vbignZGJsY2xpY2snLCAnLnRib2R5LVRhYmxlLXVzZXIgLnJvdy1hcHAnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGlmICgkKGUudGFyZ2V0KS5pcygnaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJykgfHwgJChlLnRhcmdldCkuaXMoJ2xhYmVsJykpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCByb3dJZCA9ICQodGhpcykuZmluZCgnLkFsaWFzdGJsJykudGV4dCgpLnRyaW0oKTtcclxuICAgICAgICBpZiAoIXJvd0lkKSB7IHJldHVybjsgfVxyXG5cclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGAvdXN1YXJpb3MvJHtyb3dJZH1gLFxyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IElVc2Vycykge1xyXG4gICAgICAgICAgICAgICAgJCgnLnByb2dyZXNvJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb24gPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgIGZuLlNlYXJjaENvbXBhbmllc0Ryb3BEb3duTGlzdChkYXRhLkFsaWFzKTtcclxuICAgICAgICAgICAgICAgICAgICBmbi5TZWFyY2hJbWFnZVVzZXIoZGF0YS5BbGlhcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm4uRWRpdEFuZE5ld1NldHRpbmdzKFwiZWRpdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBBdXRvbWF0aWNCaW5kaW5nKGRhdGEsIFwiI0NyZWF0ZUFuZEVkaXRVc2VyXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWRhdGEuRWxldmF0aW9uVHlwZUJvb2wpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmNvbnRlbmRvclJvbGFuZENvbXBhaWVzJykucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZuLlNlYXJjaFJvbHRvVXNlcnMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm4uU2VhcmNoQ29tcGFueXRvVXNlcnMoKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuY29udGVuZG9yUm9sYW5kQ29tcGFpZXMnKS5hZGRDbGFzcygnY29sbGFwc2UnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvd3NfbWVzc2FnZShcIk5vIHNlIGVuY29udHLDsyBlbCB1c3VhcmlvXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgICAgICByZWRpcmVjY2lvbmFyYWxMb2dpbih4aHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBBcGxpY2FyIGVzdGlsbyBjbGlja2FibGUgYSBsYXMgZmlsYXNcclxuICAgICQoJy50Ym9keS1UYWJsZS11c2VyIC5yb3ctYXBwJykuYWRkQ2xhc3MoJ3Jvdy1jbGlja2FibGUnKTtcclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiJdfQ==