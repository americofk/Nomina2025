// ============================================================================
// Archivo: login.ts
// Proyecto: DC365_WebNR.UI
// Descripcion:
//   - Script TypeScript para manejo del formulario de login
//   - Validaciones client-side y llamadas AJAX al controller
// ============================================================================
// Formulario de login principal
$("#loginForm").submit(function (e) {
    var _a, _b;
    e.preventDefault();
    const email = (_a = $('#email').val()) === null || _a === void 0 ? void 0 : _a.toString().trim();
    const password = (_b = $('#password').val()) === null || _b === void 0 ? void 0 : _b.toString();
    // Validaciones
    if (!email) {
        showError('El correo electronico es requerido');
        $('#email').addClass('is-invalid');
        return;
    }
    if (!isValidEmail(email)) {
        showError('Ingrese un correo electronico valido');
        $('#email').addClass('is-invalid');
        return;
    }
    if (!password) {
        showError('La contrasena es requerida');
        $('#password').addClass('is-invalid');
        return;
    }
    // Limpiar errores
    $('#email, #password').removeClass('is-invalid');
    // Mostrar estado de carga
    setLoadingState(true);
    $.ajax({
        url: "/Login/ValidartePassword",
        type: "POST",
        data: {
            Password: password,
            correo: email,
            __RequestVerificationToken: $('input[name="__RequestVerificationToken"]').val()
        },
        async: true,
        success: function (data) {
            if (data.Type == "error") {
                setLoadingState(false);
                showError(data.Message || 'Credenciales invalidas');
            }
            else {
                showSuccess('Autenticacion exitosa. Cargando sistema...');
                setTimeout(function () {
                    location.href = "/Dashboard/Principal";
                }, 800);
            }
        },
        error: function (xhr) {
            setLoadingState(false);
            showError('Error de conexion. Intente nuevamente.');
        }
    });
});
// Formulario de recuperacion de contrasena
$("#forgotPasswordForm").submit(function (e) {
    var _a;
    e.preventDefault();
    const email = (_a = $('#emailRecover').val()) === null || _a === void 0 ? void 0 : _a.toString().trim();
    if (!email) {
        showError('El correo electronico es requerido');
        $('#emailRecover').addClass('is-invalid');
        return;
    }
    if (!isValidEmail(email)) {
        showError('Ingrese un correo electronico valido');
        $('#emailRecover').addClass('is-invalid');
        return;
    }
    $('#emailRecover').removeClass('is-invalid');
    setRecoverLoadingState(true);
    $.ajax({
        url: "/Login/Requestchangepassword",
        type: "POST",
        data: {
            _email: email,
            __RequestVerificationToken: $('#forgotPasswordForm input[name="__RequestVerificationToken"]').val()
        },
        async: true,
        success: function (data) {
            setRecoverLoadingState(false);
            if (data.Type == "error") {
                showError(data.Message || 'Error al enviar solicitud');
            }
            else {
                showSuccess(data.Message || 'Se ha enviado una contrasena temporal a su correo');
                setTimeout(function () {
                    showLoginForm();
                }, 2000);
            }
        },
        error: function (xhr) {
            setRecoverLoadingState(false);
            showError('Error de conexion. Intente nuevamente.');
        }
    });
});
// Link para mostrar formulario de olvido de contrasena
$('#linkForgotPassword').on('click', function (e) {
    e.preventDefault();
    showForgotPasswordForm();
});
// Link para volver al login
$('#linkBackToLogin').on('click', function (e) {
    e.preventDefault();
    showLoginForm();
});
// Limpiar errores al escribir
$('#email, #password, #emailRecover').on('input', function () {
    $(this).removeClass('is-invalid');
    clearAlerts();
});
// Funciones auxiliares
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function showError(message) {
    $('#alertContainer').html(`
        <div class="alert alert-danger fade-in" style="margin-bottom: 15px;">
            <i class="fa fa-exclamation-circle"></i> ${message}
        </div>
    `);
}
function showSuccess(message) {
    $('#alertContainer').html(`
        <div class="alert alert-success fade-in" style="margin-bottom: 15px;">
            <i class="fa fa-check-circle"></i> ${message}
            <span class="spinner-border spinner-border-sm" style="float: right;"></span>
        </div>
    `);
}
function clearAlerts() {
    $('#alertContainer').empty();
}
function setLoadingState(loading) {
    if (loading) {
        $('#btnSubmit').prop('disabled', true).html('<span class="spinner-border spinner-border-sm"></span> Ingresando...');
        $('#email, #password').prop('disabled', true);
    }
    else {
        $('#btnSubmit').prop('disabled', false).html('Ingresar');
        $('#email, #password').prop('disabled', false);
    }
}
function setRecoverLoadingState(loading) {
    if (loading) {
        $('#btnRecover').prop('disabled', true).html('<span class="spinner-border spinner-border-sm"></span> Enviando...');
        $('#emailRecover').prop('disabled', true);
    }
    else {
        $('#btnRecover').prop('disabled', false).html('Enviar');
        $('#emailRecover').prop('disabled', false);
    }
}
function showForgotPasswordForm() {
    var _a;
    clearAlerts();
    $('#loginForm').hide();
    $('#forgotPasswordForm').show();
    $('#emailRecover').val(((_a = $('#email').val()) === null || _a === void 0 ? void 0 : _a.toString()) || '');
}
function showLoginForm() {
    clearAlerts();
    $('#forgotPasswordForm').hide();
    $('#loginForm').show();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9UeXBlU2NyaXB0RmlsZS9sb2dpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwrRUFBK0U7QUFDL0Usb0JBQW9CO0FBQ3BCLDJCQUEyQjtBQUMzQixlQUFlO0FBQ2YsNERBQTREO0FBQzVELDZEQUE2RDtBQUM3RCwrRUFBK0U7QUFFL0UsZ0NBQWdDO0FBQ2hDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDOztJQUM5QixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7SUFFbkIsTUFBTSxLQUFLLEdBQUcsTUFBQSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxFQUFFLDBDQUFFLFFBQVEsR0FBRyxJQUFJLEVBQUUsQ0FBQztJQUNuRCxNQUFNLFFBQVEsR0FBRyxNQUFBLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLEVBQUUsMENBQUUsUUFBUSxFQUFFLENBQUM7SUFFbEQsZUFBZTtJQUNmLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNULFNBQVMsQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO1FBQ2hELENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbkMsT0FBTztJQUNYLENBQUM7SUFFRCxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7UUFDdkIsU0FBUyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7UUFDbEQsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNuQyxPQUFPO0lBQ1gsQ0FBQztJQUVELElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNaLFNBQVMsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1FBQ3hDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDdEMs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LENBQUMsUUFBUSxDQUFDLENBQUM7UUFDeEQsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDL0MsQ0FBQztBQUNMLENBQUM7QUFFRCxTQUFTLHNCQUFzQjs7SUFDM0IsV0FBVyxFQUFFLENBQUM7SUFDZCxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdkIsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDaEMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBLE1BQUEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBRSwwQ0FBRSxRQUFRLEVBQUUsS0FBSSxFQUFFLENBQUMsQ0FBQztBQUNoRSxDQUFDO0FBRUQsU0FBUyxhQUFhO0lBQ2xCLFdBQVcsRUFBRSxDQUFDO0lBQ2QsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDaEMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQzNCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIEFyY2hpdm86IGxvZ2luLnRzXHJcbi8vIFByb3llY3RvOiBEQzM2NV9XZWJOUi5VSVxyXG4vLyBEZXNjcmlwY2lvbjpcclxuLy8gICAtIFNjcmlwdCBUeXBlU2NyaXB0IHBhcmEgbWFuZWpvIGRlbCBmb3JtdWxhcmlvIGRlIGxvZ2luXHJcbi8vICAgLSBWYWxpZGFjaW9uZXMgY2xpZW50LXNpZGUgeSBsbGFtYWRhcyBBSkFYIGFsIGNvbnRyb2xsZXJcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuLy8gRm9ybXVsYXJpbyBkZSBsb2dpbiBwcmluY2lwYWxcclxuJChcIiNsb2dpbkZvcm1cIikuc3VibWl0KGZ1bmN0aW9uIChlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgY29uc3QgZW1haWwgPSAkKCcjZW1haWwnKS52YWwoKT8udG9TdHJpbmcoKS50cmltKCk7XHJcbiAgICBjb25zdCBwYXNzd29yZCA9ICQoJyNwYXNzd29yZCcpLnZhbCgpPy50b1N0cmluZygpO1xyXG5cclxuICAgIC8vIFZhbGlkYWNpb25lc1xyXG4gICAgaWYgKCFlbWFpbCkge1xyXG4gICAgICAgIHNob3dFcnJvcignRWwgY29ycmVvIGVsZWN0cm9uaWNvIGVzIHJlcXVlcmlkbycpO1xyXG4gICAgICAgICQoJyNlbWFpbCcpLmFkZENsYXNzKCdpcy1pbnZhbGlkJyk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghaXNWYWxpZEVtYWlsKGVtYWlsKSkge1xyXG4gICAgICAgIHNob3dFcnJvcignSW5ncmVzZSB1biBjb3JyZW8gZWxlY3Ryb25pY28gdmFsaWRvJyk7XHJcbiAgICAgICAgJCgnI2VtYWlsJykuYWRkQ2xhc3MoJ2lzLWludmFsaWQnKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFwYXNzd29yZCkge1xyXG4gICAgICAgIHNob3dFcnJvcignTGEgY29udHJhc2VuYSBlcyByZXF1ZXJpZGEnKTtcclxuICAgICAgICAkKCcjcGFzc3dvcmQnKS5hZGRDbGFzcygnaXMtaW52YWxpZCcpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBMaW1waWFyIGVycm9yZXNcclxuICAgICQoJyNlbWFpbCwgI3Bhc3N3b3JkJykucmVtb3ZlQ2xhc3MoJ2lzLWludmFsaWQnKTtcclxuXHJcbiAgICAvLyBNb3N0cmFyIGVzdGFkbyBkZSBjYXJnYVxyXG4gICAgc2V0TG9hZGluZ1N0YXRlKHRydWUpO1xyXG5cclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiBcIi9Mb2dpbi9WYWxpZGFydGVQYXNzd29yZFwiLFxyXG4gICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgUGFzc3dvcmQ6IHBhc3N3b3JkLFxyXG4gICAgICAgICAgICBjb3JyZW86IGVtYWlsLFxyXG4gICAgICAgICAgICBfX1JlcXVlc3RWZXJpZmljYXRpb25Ub2tlbjogJCgnaW5wdXRbbmFtZT1cIl9fUmVxdWVzdFZlcmlmaWNhdGlvblRva2VuXCJdJykudmFsKClcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBSZXNwb25zZVVJKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLlR5cGUgPT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRMb2FkaW5nU3RhdGUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgc2hvd0Vycm9yKGRhdGEuTWVzc2FnZSB8fCAnQ3JlZGVuY2lhbGVzIGludmFsaWRhcycpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2hvd1N1Y2Nlc3MoJ0F1dGVudGljYWNpb24gZXhpdG9zYS4gQ2FyZ2FuZG8gc2lzdGVtYS4uLicpO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9IFwiL0Rhc2hib2FyZC9QcmluY2lwYWxcIjtcclxuICAgICAgICAgICAgICAgIH0sIDgwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgIHNldExvYWRpbmdTdGF0ZShmYWxzZSk7XHJcbiAgICAgICAgICAgIHNob3dFcnJvcignRXJyb3IgZGUgY29uZXhpb24uIEludGVudGUgbnVldmFtZW50ZS4nKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSk7XHJcblxyXG4vLyBGb3JtdWxhcmlvIGRlIHJlY3VwZXJhY2lvbiBkZSBjb250cmFzZW5hXHJcbiQoXCIjZm9yZ290UGFzc3dvcmRGb3JtXCIpLnN1Ym1pdChmdW5jdGlvbiAoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIGNvbnN0IGVtYWlsID0gJCgnI2VtYWlsUmVjb3ZlcicpLnZhbCgpPy50b1N0cmluZygpLnRyaW0oKTtcclxuXHJcbiAgICBpZiAoIWVtYWlsKSB7XHJcbiAgICAgICAgc2hvd0Vycm9yKCdFbCBjb3JyZW8gZWxlY3Ryb25pY28gZXMgcmVxdWVyaWRvJyk7XHJcbiAgICAgICAgJCgnI2VtYWlsUmVjb3ZlcicpLmFkZENsYXNzKCdpcy1pbnZhbGlkJyk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghaXNWYWxpZEVtYWlsKGVtYWlsKSkge1xyXG4gICAgICAgIHNob3dFcnJvcignSW5ncmVzZSB1biBjb3JyZW8gZWxlY3Ryb25pY28gdmFsaWRvJyk7XHJcbiAgICAgICAgJCgnI2VtYWlsUmVjb3ZlcicpLmFkZENsYXNzKCdpcy1pbnZhbGlkJyk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgICQoJyNlbWFpbFJlY292ZXInKS5yZW1vdmVDbGFzcygnaXMtaW52YWxpZCcpO1xyXG4gICAgc2V0UmVjb3ZlckxvYWRpbmdTdGF0ZSh0cnVlKTtcclxuXHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogXCIvTG9naW4vUmVxdWVzdGNoYW5nZXBhc3N3b3JkXCIsXHJcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBfZW1haWw6IGVtYWlsLFxyXG4gICAgICAgICAgICBfX1JlcXVlc3RWZXJpZmljYXRpb25Ub2tlbjogJCgnI2ZvcmdvdFBhc3N3b3JkRm9ybSBpbnB1dFtuYW1lPVwiX19SZXF1ZXN0VmVyaWZpY2F0aW9uVG9rZW5cIl0nKS52YWwoKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IFJlc3BvbnNlVUkpIHtcclxuICAgICAgICAgICAgc2V0UmVjb3ZlckxvYWRpbmdTdGF0ZShmYWxzZSk7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLlR5cGUgPT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgICBzaG93RXJyb3IoZGF0YS5NZXNzYWdlIHx8ICdFcnJvciBhbCBlbnZpYXIgc29saWNpdHVkJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzaG93U3VjY2VzcyhkYXRhLk1lc3NhZ2UgfHwgJ1NlIGhhIGVudmlhZG8gdW5hIGNvbnRyYXNlbmEgdGVtcG9yYWwgYSBzdSBjb3JyZW8nKTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNob3dMb2dpbkZvcm0oKTtcclxuICAgICAgICAgICAgICAgIH0sIDIwMDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKHhocikge1xyXG4gICAgICAgICAgICBzZXRSZWNvdmVyTG9hZGluZ1N0YXRlKGZhbHNlKTtcclxuICAgICAgICAgICAgc2hvd0Vycm9yKCdFcnJvciBkZSBjb25leGlvbi4gSW50ZW50ZSBudWV2YW1lbnRlLicpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59KTtcclxuXHJcbi8vIExpbmsgcGFyYSBtb3N0cmFyIGZvcm11bGFyaW8gZGUgb2x2aWRvIGRlIGNvbnRyYXNlbmFcclxuJCgnI2xpbmtGb3Jnb3RQYXNzd29yZCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBzaG93Rm9yZ290UGFzc3dvcmRGb3JtKCk7XHJcbn0pO1xyXG5cclxuLy8gTGluayBwYXJhIHZvbHZlciBhbCBsb2dpblxyXG4kKCcjbGlua0JhY2tUb0xvZ2luJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHNob3dMb2dpbkZvcm0oKTtcclxufSk7XHJcblxyXG4vLyBMaW1waWFyIGVycm9yZXMgYWwgZXNjcmliaXJcclxuJCgnI2VtYWlsLCAjcGFzc3dvcmQsICNlbWFpbFJlY292ZXInKS5vbignaW5wdXQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1pbnZhbGlkJyk7XHJcbiAgICBjbGVhckFsZXJ0cygpO1xyXG59KTtcclxuXHJcbi8vIEZ1bmNpb25lcyBhdXhpbGlhcmVzXHJcbmZ1bmN0aW9uIGlzVmFsaWRFbWFpbChlbWFpbDogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICBjb25zdCBlbWFpbFJlZ2V4ID0gL15bXlxcc0BdK0BbXlxcc0BdK1xcLlteXFxzQF0rJC87XHJcbiAgICByZXR1cm4gZW1haWxSZWdleC50ZXN0KGVtYWlsKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd0Vycm9yKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgJCgnI2FsZXJ0Q29udGFpbmVyJykuaHRtbChgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LWRhbmdlciBmYWRlLWluXCIgc3R5bGU9XCJtYXJnaW4tYm90dG9tOiAxNXB4O1wiPlxyXG4gICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLWV4Y2xhbWF0aW9uLWNpcmNsZVwiPjwvaT4gJHttZXNzYWdlfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgYCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dTdWNjZXNzKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgJCgnI2FsZXJ0Q29udGFpbmVyJykuaHRtbChgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LXN1Y2Nlc3MgZmFkZS1pblwiIHN0eWxlPVwibWFyZ2luLWJvdHRvbTogMTVweDtcIj5cclxuICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1jaGVjay1jaXJjbGVcIj48L2k+ICR7bWVzc2FnZX1cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzcGlubmVyLWJvcmRlciBzcGlubmVyLWJvcmRlci1zbVwiIHN0eWxlPVwiZmxvYXQ6IHJpZ2h0O1wiPjwvc3Bhbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIGApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjbGVhckFsZXJ0cygpOiB2b2lkIHtcclxuICAgICQoJyNhbGVydENvbnRhaW5lcicpLmVtcHR5KCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldExvYWRpbmdTdGF0ZShsb2FkaW5nOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICBpZiAobG9hZGluZykge1xyXG4gICAgICAgICQoJyNidG5TdWJtaXQnKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpLmh0bWwoJzxzcGFuIGNsYXNzPVwic3Bpbm5lci1ib3JkZXIgc3Bpbm5lci1ib3JkZXItc21cIj48L3NwYW4+IEluZ3Jlc2FuZG8uLi4nKTtcclxuICAgICAgICAkKCcjZW1haWwsICNwYXNzd29yZCcpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgICQoJyNidG5TdWJtaXQnKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKS5odG1sKCdJbmdyZXNhcicpO1xyXG4gICAgICAgICQoJyNlbWFpbCwgI3Bhc3N3b3JkJykucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldFJlY292ZXJMb2FkaW5nU3RhdGUobG9hZGluZzogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgaWYgKGxvYWRpbmcpIHtcclxuICAgICAgICAkKCcjYnRuUmVjb3ZlcicpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSkuaHRtbCgnPHNwYW4gY2xhc3M9XCJzcGlubmVyLWJvcmRlciBzcGlubmVyLWJvcmRlci1zbVwiPjwvc3Bhbj4gRW52aWFuZG8uLi4nKTtcclxuICAgICAgICAkKCcjZW1haWxSZWNvdmVyJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJCgnI2J0blJlY292ZXInKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKS5odG1sKCdFbnZpYXInKTtcclxuICAgICAgICAkKCcjZW1haWxSZWNvdmVyJykucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dGb3Jnb3RQYXNzd29yZEZvcm0oKTogdm9pZCB7XHJcbiAgICBjbGVhckFsZXJ0cygpO1xyXG4gICAgJCgnI2xvZ2luRm9ybScpLmhpZGUoKTtcclxuICAgICQoJyNmb3Jnb3RQYXNzd29yZEZvcm0nKS5zaG93KCk7XHJcbiAgICAkKCcjZW1haWxSZWNvdmVyJykudmFsKCQoJyNlbWFpbCcpLnZhbCgpPy50b1N0cmluZygpIHx8ICcnKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd0xvZ2luRm9ybSgpOiB2b2lkIHtcclxuICAgIGNsZWFyQWxlcnRzKCk7XHJcbiAgICAkKCcjZm9yZ290UGFzc3dvcmRGb3JtJykuaGlkZSgpO1xyXG4gICAgJCgnI2xvZ2luRm9ybScpLnNob3coKTtcclxufVxyXG4iXX0=