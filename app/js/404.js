$(document).ready(function() {

	//Цели для Яндекс.Метрики и Google Analytics
	$(".count_element").on("click", (function() {
		ga("send", "event", "goal", "goal");
		yaCounterXXXXXXXX.reachGoal("goal");
		return true;
	}));


	//Аякс отправка форм
	//Документация: http://api.jquery.com/jquery.ajax/
	$("#form").submit(function() {
		$.ajax({
			type: "POST",
			url: "mail.php",
			data: $(this).serialize()
		}).done(function() {
			alert("Спасибо за заявку!");
			setTimeout(function() {
				
				$("#form").trigger("reset");
			}, 1000);
		});
		return false;
	});

	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	}

	$("img, a").on("dragstart", function(event) { event.preventDefault(); });
});
// SCROLL TOP FUNCTION
jQuery(document).ready(function($){
    $(window).scroll(function(){
        if ($(this).scrollTop() > 300) {
            $('.to-top').fadeIn('slow');
        } else {
            $('.to-top').fadeOut('slow');
        }
    });
    $('.to-top').click(function(){
        $("html, body").animate({ scrollTop: 0 }, 500);
        return false;
    });
});

//FEEDBACK FORM
    function AjaxFormRequest(result_id,form_id,url,form) {

    var elems = form.elements;
    var errorStatus = true;

    resetError(document.getElementById('response'));

    if (!elems.name.value) {
        showError(document.getElementById('response'), ' Укажите имя');
        elems.name.style.border = '2px solid #db262c';
        errorStatus = false;
    } else {
        elems.name.style.border = '3px solid #d7d7d7';
    }

    if (!elems.email.value) {
        showError(document.getElementById('response'), ' Укажите почту');
        elems.email.style.border = '2px solid #db262c';
        errorStatus = false;
    } else {
        elems.email.style.border = '2px solid #d7d7d7';
    }

    if (!elems.theme.value) {
        showError(document.getElementById('response'), ' Укажите тему');
        elems.theme.style.border = '2px solid #db262c';
        errorStatus = false;
    } else {
        elems.theme.style.border = '2px solid #d7d7d7';
    }

    if (!elems.message.value) {
        showError(document.getElementById('response'), ' Введите сообщение');
        elems.message.style.border = '2px solid #db262c';
        errorStatus = false;
    } else{
        elems.message.style.border = '2px solid #d7d7d7';
    }

    if(errorStatus == false){
        return false;
    }

    jQuery.ajax({
        url:     url, //Адрес подгружаемой страницы
        type:     "POST", //Тип запроса
        dataType: "html", //Тип данных
        data: jQuery("#"+form_id).serialize(),
        success: function(response) { //Если все нормально
            document.getElementById(result_id).innerHTML = response;
        },
        error: function(response) { //Если ошибка
            document.getElementById(result_id).innerHTML = "Ошибка при отправке формы";
        }
    });
}

    // функция отображения ошибки
        function showError(container, errorMessage) {

        container.className = 'error';

        var msgElem = document.createElement('span');

        msgElem.className = "error-message";
        msgElem.innerHTML = errorMessage;

        container.appendChild(msgElem);
        container.innerHTML += '<br/>';
    }
    // функция сброса сообщений об ошибке
        function resetError(container) {

    container.className = '';

    if(container.lastChild){
        container.innerHTML = '';
    }
}

/** AJAX NAVIGATION BLOCK **/
    function showHideDiv(id, hash){
        //$(".create-site__details").toggle();
        $('.details').each(function(index) {
            if ($(this).attr("id") == id) {
                if(!$(this).is(':visible'))
                    $(this).show(600);
                else
                    $(this).hide(600);
                location.hash = '#' + hash;
            }
            else {
                $(this).hide(600);
            }
        });
    }

    function linkClick(thethis){
        if($(thethis).attr('class') == 'social'){
        } else{
            var isHash = thethis.href.indexOf('#');
            var localPath, hash;

            if(isHash == -1){
                localPath = thethis.href.substr(22);
                hash = '';
            } else{
                localPath = thethis.href.substr(22, thethis.href.indexOf('#') - 22);
                hash = thethis.href.substr(thethis.href.indexOf('#')+1);
            }
            if(window.location.pathname.substr(5,5-window.location.pathname.indexOf('#')+1) != localPath){
                $('span').removeClass('active');
                $('li').removeClass('active');
                $('.js-'+localPath).addClass('active');

                $.ajax({
                    method: "GET",
                    url: "_"+localPath+".html",
                    cache: false,
                    success: function (response) {
                        if (response == 0) {
                            $("#main").hide();
                        } else {
                            $("#main").empty().append(response).hide().fadeIn(750);
                            //$("#main").append(response);
                        }
                        window.history.pushState({path:localPath},'',localPath);
                        if(hash != ''){
                            window.scrollTo(0,0);
                            setTimeout(location.hash = '#' + hash, 1000);
                        } else{
                            window.scrollTo(0,0);
                        }
                        //alert('here we go:' + document.anchors['name1']);
                    },
                    complete: function(){
                        $('#loader-image').hide();
                    }
                });
            }
        }
    }

    // START PAGE LOAD

    var pathName = 'home';
    if(window.location.pathname != '/app/'){
        pathName = window.location.pathname.substr(5);
    }
    if(window.location.pathname == '/app/_404.html'){}
    else{
        $.ajax({
            method: "GET",
            url: "_"+pathName+".html",
            cache: false,
            success: function (response) {
                if (response == 0) {
                    $("#main").hide();
                } else {
                    $("#main").append(response);
                }
            },
            complete: function(){
                $('#loader-image').hide();
            }
        });
    }
/** AJAX NAVIGATION BLOCK **/

// DROPDOWN MENUES FIX FOR TOUCHSCREEN DEVICES
    $('body').bind('touchstart', function() {});
