/**
 * @file login.ts
 * @description Módulo de autenticación de usuarios. Maneja el formulario de login,
 *              validaciones del lado cliente y comunicación con el servidor.
 * @author Equipo de Desarrollo
 * @date 2025
 * @module Login
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9UeXBlU2NyaXB0RmlsZS9sb2dpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztHQU9HO0FBRUgsZ0NBQWdDO0FBQ2hDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDOztJQUM5QixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7SUFFbkIsTUFBTSxLQUFLLEdBQUcsTUFBQSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxFQUFFLDBDQUFFLFFBQVEsR0FBRyxJQUFJLEVBQUUsQ0FBQztJQUNuRCxNQUFNLFFBQVEsR0FBRyxNQUFBLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLEVBQUUsMENBQUUsUUFBUSxFQUFFLENBQUM7SUFFbEQsZUFBZTtJQUNmLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNULFNBQVMsQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO1FBQ2hELENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbkMsT0FBTztJQUNYLENBQUM7SUFFRCxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7UUFDdkIsU0FBUyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7UUFDbEQsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNuQyxPQUFPO0lBQ1gsQ0FBQztJQUVELElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNaLFNBQVMsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1FBQ3hDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDdEMsT0FBTztJQUNYLENBQUM7SUFFRCxrQkFBa0I7SUFDbEIsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsV0FBVyxDQUFDLFlB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S0FBSyxDQUFDLENBQUM7SUFDL0MsQ0FBQztBQUNMLENBQUM7QUFFRCxTQUFTLHNCQUFzQjs7SUFDM0IsV0FBVyxFQUFFLENBQUM7SUFDZCxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdkIsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDaEMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBLE1BQUEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBRSwwQ0FBRSxRQUFRLEVBQUUsS0FBSSxFQUFFLENBQUMsQ0FBQztBQUNoRSxDQUFDO0FBRUQsU0FBUyxhQUFhO0lBQ2xCLFdBQVcsRUFBRSxDQUFDO0lBQ2QsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDaEMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQzNCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGZpbGUgbG9naW4udHNcclxuICogQGRlc2NyaXB0aW9uIE3Ds2R1bG8gZGUgYXV0ZW50aWNhY2nDs24gZGUgdXN1YXJpb3MuIE1hbmVqYSBlbCBmb3JtdWxhcmlvIGRlIGxvZ2luLFxyXG4gKiAgICAgICAgICAgICAgdmFsaWRhY2lvbmVzIGRlbCBsYWRvIGNsaWVudGUgeSBjb211bmljYWNpw7NuIGNvbiBlbCBzZXJ2aWRvci5cclxuICogQGF1dGhvciBFcXVpcG8gZGUgRGVzYXJyb2xsb1xyXG4gKiBAZGF0ZSAyMDI1XHJcbiAqIEBtb2R1bGUgTG9naW5cclxuICovXHJcblxyXG4vLyBGb3JtdWxhcmlvIGRlIGxvZ2luIHByaW5jaXBhbFxyXG4kKFwiI2xvZ2luRm9ybVwiKS5zdWJtaXQoZnVuY3Rpb24gKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICBjb25zdCBlbWFpbCA9ICQoJyNlbWFpbCcpLnZhbCgpPy50b1N0cmluZygpLnRyaW0oKTtcclxuICAgIGNvbnN0IHBhc3N3b3JkID0gJCgnI3Bhc3N3b3JkJykudmFsKCk/LnRvU3RyaW5nKCk7XHJcblxyXG4gICAgLy8gVmFsaWRhY2lvbmVzXHJcbiAgICBpZiAoIWVtYWlsKSB7XHJcbiAgICAgICAgc2hvd0Vycm9yKCdFbCBjb3JyZW8gZWxlY3Ryb25pY28gZXMgcmVxdWVyaWRvJyk7XHJcbiAgICAgICAgJCgnI2VtYWlsJykuYWRkQ2xhc3MoJ2lzLWludmFsaWQnKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFpc1ZhbGlkRW1haWwoZW1haWwpKSB7XHJcbiAgICAgICAgc2hvd0Vycm9yKCdJbmdyZXNlIHVuIGNvcnJlbyBlbGVjdHJvbmljbyB2YWxpZG8nKTtcclxuICAgICAgICAkKCcjZW1haWwnKS5hZGRDbGFzcygnaXMtaW52YWxpZCcpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXBhc3N3b3JkKSB7XHJcbiAgICAgICAgc2hvd0Vycm9yKCdMYSBjb250cmFzZW5hIGVzIHJlcXVlcmlkYScpO1xyXG4gICAgICAgICQoJyNwYXNzd29yZCcpLmFkZENsYXNzKCdpcy1pbnZhbGlkJyk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIExpbXBpYXIgZXJyb3Jlc1xyXG4gICAgJCgnI2VtYWlsLCAjcGFzc3dvcmQnKS5yZW1vdmVDbGFzcygnaXMtaW52YWxpZCcpO1xyXG5cclxuICAgIC8vIE1vc3RyYXIgZXN0YWRvIGRlIGNhcmdhXHJcbiAgICBzZXRMb2FkaW5nU3RhdGUodHJ1ZSk7XHJcblxyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6IFwiL0xvZ2luL1ZhbGlkYXJ0ZVBhc3N3b3JkXCIsXHJcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBQYXNzd29yZDogcGFzc3dvcmQsXHJcbiAgICAgICAgICAgIGNvcnJlbzogZW1haWwsXHJcbiAgICAgICAgICAgIF9fUmVxdWVzdFZlcmlmaWNhdGlvblRva2VuOiAkKCdpbnB1dFtuYW1lPVwiX19SZXF1ZXN0VmVyaWZpY2F0aW9uVG9rZW5cIl0nKS52YWwoKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IFJlc3BvbnNlVUkpIHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuVHlwZSA9PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgICAgICAgIHNldExvYWRpbmdTdGF0ZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBzaG93RXJyb3IoZGF0YS5NZXNzYWdlIHx8ICdDcmVkZW5jaWFsZXMgaW52YWxpZGFzJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzaG93U3VjY2VzcygnQXV0ZW50aWNhY2lvbiBleGl0b3NhLiBDYXJnYW5kbyBzaXN0ZW1hLi4uJyk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gXCIvRGFzaGJvYXJkL1ByaW5jaXBhbFwiO1xyXG4gICAgICAgICAgICAgICAgfSwgODAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgc2V0TG9hZGluZ1N0YXRlKGZhbHNlKTtcclxuICAgICAgICAgICAgc2hvd0Vycm9yKCdFcnJvciBkZSBjb25leGlvbi4gSW50ZW50ZSBudWV2YW1lbnRlLicpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59KTtcclxuXHJcbi8vIEZvcm11bGFyaW8gZGUgcmVjdXBlcmFjaW9uIGRlIGNvbnRyYXNlbmFcclxuJChcIiNmb3Jnb3RQYXNzd29yZEZvcm1cIikuc3VibWl0KGZ1bmN0aW9uIChlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgY29uc3QgZW1haWwgPSAkKCcjZW1haWxSZWNvdmVyJykudmFsKCk/LnRvU3RyaW5nKCkudHJpbSgpO1xyXG5cclxuICAgIGlmICghZW1haWwpIHtcclxuICAgICAgICBzaG93RXJyb3IoJ0VsIGNvcnJlbyBlbGVjdHJvbmljbyBlcyByZXF1ZXJpZG8nKTtcclxuICAgICAgICAkKCcjZW1haWxSZWNvdmVyJykuYWRkQ2xhc3MoJ2lzLWludmFsaWQnKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFpc1ZhbGlkRW1haWwoZW1haWwpKSB7XHJcbiAgICAgICAgc2hvd0Vycm9yKCdJbmdyZXNlIHVuIGNvcnJlbyBlbGVjdHJvbmljbyB2YWxpZG8nKTtcclxuICAgICAgICAkKCcjZW1haWxSZWNvdmVyJykuYWRkQ2xhc3MoJ2lzLWludmFsaWQnKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgJCgnI2VtYWlsUmVjb3ZlcicpLnJlbW92ZUNsYXNzKCdpcy1pbnZhbGlkJyk7XHJcbiAgICBzZXRSZWNvdmVyTG9hZGluZ1N0YXRlKHRydWUpO1xyXG5cclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiBcIi9Mb2dpbi9SZXF1ZXN0Y2hhbmdlcGFzc3dvcmRcIixcclxuICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIF9lbWFpbDogZW1haWwsXHJcbiAgICAgICAgICAgIF9fUmVxdWVzdFZlcmlmaWNhdGlvblRva2VuOiAkKCcjZm9yZ290UGFzc3dvcmRGb3JtIGlucHV0W25hbWU9XCJfX1JlcXVlc3RWZXJpZmljYXRpb25Ub2tlblwiXScpLnZhbCgpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhc3luYzogdHJ1ZSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogUmVzcG9uc2VVSSkge1xyXG4gICAgICAgICAgICBzZXRSZWNvdmVyTG9hZGluZ1N0YXRlKGZhbHNlKTtcclxuICAgICAgICAgICAgaWYgKGRhdGEuVHlwZSA9PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgICAgICAgIHNob3dFcnJvcihkYXRhLk1lc3NhZ2UgfHwgJ0Vycm9yIGFsIGVudmlhciBzb2xpY2l0dWQnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNob3dTdWNjZXNzKGRhdGEuTWVzc2FnZSB8fCAnU2UgaGEgZW52aWFkbyB1bmEgY29udHJhc2VuYSB0ZW1wb3JhbCBhIHN1IGNvcnJlbycpO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd0xvZ2luRm9ybSgpO1xyXG4gICAgICAgICAgICAgICAgfSwgMjAwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XHJcbiAgICAgICAgICAgIHNldFJlY292ZXJMb2FkaW5nU3RhdGUoZmFsc2UpO1xyXG4gICAgICAgICAgICBzaG93RXJyb3IoJ0Vycm9yIGRlIGNvbmV4aW9uLiBJbnRlbnRlIG51ZXZhbWVudGUuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0pO1xyXG5cclxuLy8gTGluayBwYXJhIG1vc3RyYXIgZm9ybXVsYXJpbyBkZSBvbHZpZG8gZGUgY29udHJhc2VuYVxyXG4kKCcjbGlua0ZvcmdvdFBhc3N3b3JkJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHNob3dGb3Jnb3RQYXNzd29yZEZvcm0oKTtcclxufSk7XHJcblxyXG4vLyBMaW5rIHBhcmEgdm9sdmVyIGFsIGxvZ2luXHJcbiQoJyNsaW5rQmFja1RvTG9naW4nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgc2hvd0xvZ2luRm9ybSgpO1xyXG59KTtcclxuXHJcbi8vIExpbXBpYXIgZXJyb3JlcyBhbCBlc2NyaWJpclxyXG4kKCcjZW1haWwsICNwYXNzd29yZCwgI2VtYWlsUmVjb3ZlcicpLm9uKCdpbnB1dCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWludmFsaWQnKTtcclxuICAgIGNsZWFyQWxlcnRzKCk7XHJcbn0pO1xyXG5cclxuLy8gRnVuY2lvbmVzIGF1eGlsaWFyZXNcclxuZnVuY3Rpb24gaXNWYWxpZEVtYWlsKGVtYWlsOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgIGNvbnN0IGVtYWlsUmVnZXggPSAvXlteXFxzQF0rQFteXFxzQF0rXFwuW15cXHNAXSskLztcclxuICAgIHJldHVybiBlbWFpbFJlZ2V4LnRlc3QoZW1haWwpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93RXJyb3IobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAkKCcjYWxlcnRDb250YWluZXInKS5odG1sKGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtZGFuZ2VyIGZhZGUtaW5cIiBzdHlsZT1cIm1hcmdpbi1ib3R0b206IDE1cHg7XCI+XHJcbiAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtZXhjbGFtYXRpb24tY2lyY2xlXCI+PC9pPiAke21lc3NhZ2V9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICBgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd1N1Y2Nlc3MobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAkKCcjYWxlcnRDb250YWluZXInKS5odG1sKGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtc3VjY2VzcyBmYWRlLWluXCIgc3R5bGU9XCJtYXJnaW4tYm90dG9tOiAxNXB4O1wiPlxyXG4gICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLWNoZWNrLWNpcmNsZVwiPjwvaT4gJHttZXNzYWdlfVxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNwaW5uZXItYm9yZGVyIHNwaW5uZXItYm9yZGVyLXNtXCIgc3R5bGU9XCJmbG9hdDogcmlnaHQ7XCI+PC9zcGFuPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgYCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsZWFyQWxlcnRzKCk6IHZvaWQge1xyXG4gICAgJCgnI2FsZXJ0Q29udGFpbmVyJykuZW1wdHkoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0TG9hZGluZ1N0YXRlKGxvYWRpbmc6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgIGlmIChsb2FkaW5nKSB7XHJcbiAgICAgICAgJCgnI2J0blN1Ym1pdCcpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSkuaHRtbCgnPHNwYW4gY2xhc3M9XCJzcGlubmVyLWJvcmRlciBzcGlubmVyLWJvcmRlci1zbVwiPjwvc3Bhbj4gSW5ncmVzYW5kby4uLicpO1xyXG4gICAgICAgICQoJyNlbWFpbCwgI3Bhc3N3b3JkJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJCgnI2J0blN1Ym1pdCcpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpLmh0bWwoJ0luZ3Jlc2FyJyk7XHJcbiAgICAgICAgJCgnI2VtYWlsLCAjcGFzc3dvcmQnKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2V0UmVjb3ZlckxvYWRpbmdTdGF0ZShsb2FkaW5nOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICBpZiAobG9hZGluZykge1xyXG4gICAgICAgICQoJyNidG5SZWNvdmVyJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKS5odG1sKCc8c3BhbiBjbGFzcz1cInNwaW5uZXItYm9yZGVyIHNwaW5uZXItYm9yZGVyLXNtXCI+PC9zcGFuPiBFbnZpYW5kby4uLicpO1xyXG4gICAgICAgICQoJyNlbWFpbFJlY292ZXInKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAkKCcjYnRuUmVjb3ZlcicpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpLmh0bWwoJ0VudmlhcicpO1xyXG4gICAgICAgICQoJyNlbWFpbFJlY292ZXInKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd0ZvcmdvdFBhc3N3b3JkRm9ybSgpOiB2b2lkIHtcclxuICAgIGNsZWFyQWxlcnRzKCk7XHJcbiAgICAkKCcjbG9naW5Gb3JtJykuaGlkZSgpO1xyXG4gICAgJCgnI2ZvcmdvdFBhc3N3b3JkRm9ybScpLnNob3coKTtcclxuICAgICQoJyNlbWFpbFJlY292ZXInKS52YWwoJCgnI2VtYWlsJykudmFsKCk/LnRvU3RyaW5nKCkgfHwgJycpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93TG9naW5Gb3JtKCk6IHZvaWQge1xyXG4gICAgY2xlYXJBbGVydHMoKTtcclxuICAgICQoJyNmb3Jnb3RQYXNzd29yZEZvcm0nKS5oaWRlKCk7XHJcbiAgICAkKCcjbG9naW5Gb3JtJykuc2hvdygpO1xyXG59XHJcbiJdfQ==