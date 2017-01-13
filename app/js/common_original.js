$(document).ready(function() {

	//Цели для Яндекс.Метрики и Google Analytics
	$(".count_element").on("click", (function() {
		ga("send", "event", "goal", "goal");
		yaCounterXXXXXXXX.reachGoal("goal");
		return true;
	}));

	//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};

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

// JQUERY LAZY LOAD PLUGIN
    $(function() {
        $("img.js-lazy-image").lazyload({
            threshold : 100,
            effect : "fadeIn",
            skip_invisible : true
        });
        // FOR IMAGED BACKGROUNDS
        $("article.js-lazy-image").lazyload({
            threshold : 100,
            effect : "fadeIn",
            skip_invisible : true
        });
    });
     //MAKE AJAX LOADED IMAGES WORK
    $(document).ajaxStop(function(){
        $("img.js-lazy-image").lazyload({
            threshold : 100,
            effect : "fadeIn",
            skip_invisible : true
        }).removeClass("js-lazy-image");
        $("article.js-lazy-image").lazyload({
            threshold : 100,
            effect : "fadeIn",
            skip_invisible : true
        }).removeClass("js-lazy-image");
    });

// SOCIAL SHARING BLOCK
    Share = {
    vkontakte: function(purl, ptitle, pimg, text) {
        url  = 'http://vkontakte.ru/share.php?';
        url += 'url='          + encodeURIComponent(purl);
        url += '&title='       + encodeURIComponent(ptitle);
        url += '&description=' + encodeURIComponent(text);
        url += '&image='       + encodeURIComponent(pimg);
        url += '&noparse=true';
        Share.popup(url);
    },
    odnoklassniki: function(purl, text) {
        url  = 'http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1';
        url += '&st.comments=' + encodeURIComponent(text);
        url += '&st._surl='    + encodeURIComponent(purl);
        Share.popup(url);
    },
    facebook: function(purl, ptitle, pimg, text) {
        url  = 'http://www.facebook.com/sharer.php?s=100';
        url += '&p[title]='     + encodeURIComponent(ptitle);
        url += '&p[summary]='   + encodeURIComponent(text);
        url += '&p[url]='       + encodeURIComponent(purl);
        url += '&p[images][0]=' + encodeURIComponent(pimg);
        Share.popup(url);
    },
    twitter: function(purl, ptitle) {
        url  = 'http://twitter.com/share?';
        url += 'text='      + encodeURIComponent(ptitle);
        url += '&url='      + encodeURIComponent(purl);
        url += '&counturl=' + encodeURIComponent(purl);
        Share.popup(url);
    },
    mailru: function(purl, ptitle, pimg, text) {
        url  = 'http://connect.mail.ru/share?';
        url += 'url='          + encodeURIComponent(purl);
        url += '&title='       + encodeURIComponent(ptitle);
        url += '&description=' + encodeURIComponent(text);
        url += '&imageurl='    + encodeURIComponent(pimg);
        Share.popup(url)
    },

    popup: function(url) {
        window.open(url,'','toolbar=0,status=0,width=626,height=436');
    }
};
// SOCIAL SHARING BLOCK

/** METRICS BLOCK BEGIN **/
    // YANDEX METRICS
    (function (d, w, c) {
        (w[c] = w[c] || []).push(function() {
            try {
                w.yaCounter31812201 = new Ya.Metrika({
                    id:31812201,
                    clickmap:true,
                    trackLinks:true,
                    accurateTrackBounce:true,
                    webvisor:true
                });
            } catch(e) { }
        });

        var n = d.getElementsByTagName("script")[0],
            s = d.createElement("script"),
            f = function () { n.parentNode.insertBefore(s, n); };
        s.type = "text/javascript";
        s.async = true;
        s.src = "https://mc.yandex.ru/metrika/watch.js";

        if (w.opera == "[object Opera]") {
            d.addEventListener("DOMContentLoaded", f, false);
        } else { f(); }
    })(document, window, "yandex_metrika_callbacks");;
    // GOOGLE METRICS
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-66014450-1', 'auto');
    ga('send', 'pageview');
/** METRICS BLOCK END **/