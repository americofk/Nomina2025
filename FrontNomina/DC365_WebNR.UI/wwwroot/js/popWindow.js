


(function ($) {
	popWindow = window.popWindow || {};
	popWindow.dialog = function (popHtml, type, options) {
		var btnType = popWindow.dialog.btnEnum;
		var eventType = popWindow.dialog.eventEnum;
		var popType = {
			info: {
				title: "Info",
				icon: "0 0",
				btn: btnType.ok
			},
			success: {
				title: "Completado",
				icon: "0 -48px",
				btn: btnType.ok
			},
			error: {
				title: "Error",
				icon: "-48px -48px",
				btn: btnType.ok
			},
			confirm: {
				title: "Confirmar",
				icon: "-48px 0",
				btn: btnType.okcancel
			},
			warning: {
				title: "Advertencia",
				icon: "0 -96px",
				btn: btnType.okcancel
			},
			input: {
				title: "Prompt",
				icon: "",
				btn: btnType.ok
			},
			custom: {
				title: "",
				icon: "",
				btn: btnType.ok
			}
		};
		var mytpye = type ? type instanceof Object ? type : popType[type] || {} : {};
		var config = $.extend(true, {

			title: "",
			icon: "",
			btn: btnType.ok,

			onOk: $.noop,
			onCancel: $.noop,
			onClose: $.noop
		}, mytpye, options);

		var $txt = $("<p>").html(popHtml);
		var $title = $("<span>").addClass("title").text(config.title);
		var icon = config.icon;
		var $icon = icon ? $("<div>").addClass("bigIcon").css("backgroundPosition", icon) : "";
		var btn = config.btn;

		var popId = creatPopId();

		var $box = $("<div>").addClass("popWindow");
		var $layer = $("<div>").addClass("xc_layer");
		var $popBox = $("<div>").addClass("popBox");
		var $titleBox = $("<div>").addClass("titleBox");
		var $txtBox = $("<div>").addClass("txtBox");
		var $btnArea = $("<div>").addClass("btnArea");

		var $ok = $("<a>").addClass("myButton").addClass("ok").text("Aceptar");
		var $cancel = $("<a>").addClass("myButton").addClass("cancel").text("Cancel");
		var $input = $("<input>").addClass("inputBox");
		var $clsBtn = $("<a>").addClass("clsBtn");


		var btns = {
			ok: $ok,
			cancel: $cancel
		};

		init();
		setTimeout(function () {
			$('.popBox').addClass('efecto');
		}, 500);
		function init() {

			if (popType["input"] === mytpye) {
				$txt.append($input);
			}

			creatDom();
			bind();

		}

		function creatDom() {
			$popBox.append(
				$titleBox.append(
					$clsBtn
				).append(
					$title
				)
			).append(
				$txtBox.append($icon).append($txt)
			).append(
				$btnArea.append(creatBtnGroup(btn))
			);
			$box.attr("id", popId).append($layer).append($popBox);
			$("body").append($box);
		}

		function bind() {

			$ok.click(doOk);


			$(window).bind("keydown", function (e) {
				if (e.keyCode == 13) {
					if ($("#" + popId).length == 1) {
						doOk();
					}
				}
			});


			$cancel.click(doCancel);


			$clsBtn.click(doClose);
		}


		function doOk() {
			var $o = $(this);
			var v = $.trim($input.val());
			if ($input.is(":visible"))
				config.onOk(v);
			else
				config.onOk();
			$("#" + popId).remove();
			config.onClose(eventType.ok);
		}


		function doCancel() {
			var $o = $(this);
			config.onCancel();
			$("#" + popId).remove();
			config.onClose(eventType.cancel);
		}


		function doClose() {
			$("#" + popId).remove();
			config.onClose(eventType.close);
			$(window).unbind("keydown");
		}


		function creatBtnGroup(tp) {
			var $bgp = $("<div>").addClass("btnGroup");
			$.each(btns, function (i, n) {
				if (btnType[i] == (tp & btnType[i])) {
					$bgp.append(n);
				}
			});
			return $bgp;
		}


		function creatPopId() {
			var i = "pop_" + (new Date()).getTime() + parseInt(Math.random() * 100000);
			if ($("#" + i).length > 0) {
				return creatPopId();
			} else {
				return i;
			}
		}


	};


	popWindow.dialog.btnEnum = {
		ok: parseInt("0001", 2),
		cancel: parseInt("0010", 2),
		okcancel: parseInt("0011", 2)
	};


	popWindow.dialog.eventEnum = {
		ok: 1,
		cancel: 2,
		close: 3
	};

	popWindow.dialog.typeEnum = {
		info: "info",
		success: "success",
		error: "error",
		confirm: "confirm",
		warning: "warning",
		input: "input",
		custom: "custom"
	};


})(jQuery);


function mostrarMensaje(element, Mensaje) {

	var d = $(document).height()

	var p = $(element);
	var position = p.offset();

	var tooltip = $(".tooltipContainer");

	var tooltipMessage = $(".tooltipMessage");
	tooltipMessage.text(Mensaje);

	var tooltipMessageRefresh = $(".tooltipMessage");
	var widthMessage = tooltipMessageRefresh.width();
	var alto = tooltipMessageRefresh.height() + position.top + 30;
	if (alto > d) {

		var top = position.top - tooltipMessageRefresh.height();
		tooltip.css({ top: top - 20, left: position.left - widthMessage + 20 });
		tooltip.addClass('tooltipIndicatorUp');
		tooltip.removeClass('tooltipIndicatorDown');
	} else {

		tooltip.css({ top: position.top, left: position.left - widthMessage + 20 });
		tooltip.addClass('tooltipIndicatorDown');
		tooltip.removeClass('tooltipIndicatorUp');
	}

	//tooltip.css({ top: position.top - 230, left: position.left}); 
	tooltip.removeClass('tooltipContainer-close');

}

$(".tooltipMessage").on('click', function () {
	CerrarMensaje();
});

function CerrarMensaje() {
	var tooltip = $(".tooltipContainer");

	var tooltipMessage = $(".tooltipMessage");
	tooltipMessage.text("");
	tooltip.css({ top: 0, left: 0 });
	tooltip.addClass('tooltipContainer-close');

}


