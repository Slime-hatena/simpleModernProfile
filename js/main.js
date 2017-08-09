var isFadeing = false;
var dummy = $('<!-- content ready -->');

$(document).ready(function() {
    // ハッシュからローディングを変化させる
    var urlHash = location.hash;
    switch (urlHash) {
        case "#c2":
            $("div#loader").prepend('<div class="balloon">名刺交換 ありがとうございました！</div><img src="resources/welcome_c2.png" style="width: 70%">');
            break;

        default:
            break;

    }

    // ローディング処理
    var h = $(window).height();
    $('#wrap').css('display', 'none');
    $('#loader-bg ,#loader').height(h).css('display', 'block');

    $('[id^=view]').hide();
    // html構造ロード
    $.getJSON("plugins/tabs.json", function(data) {
        var isChange = false;
        $.each(data["tabs"], function(index, val) {
            $("div.wrapper").append('<section id=' + val['id'] + ' data-fieldtype="content_field"><ul id="heading-' + val['id'] + '"></ul></section>');
            $("nav#fixedMenu").append('<div class="change_view index" data-viewname="' + val['id'] + '"><div>' + val['display_name'] + '</div></div>');
            if (!isChange) {
                isChange = true;
                $("section#" + val['id']).show();
                $("section#" + val['id']).attr('class', "fadein");
                $("[data-viewname='" + val['id'] + "']").removeClass("index");
                $("[data-viewname='" + val['id'] + "']").addClass("index_select");
            } else {
                $("section#" + val['id']).hide();
            }
        });
    });

    // プラグインロード
    $.getJSON("plugins/setting.json", function(data) {
        $.each(data["sections"], function(index, val) {
            $.getJSON("plugins/" + val["name"] + "/setting.json", function(data_) {
                // js Load
                $.each(data_["js"], function(index_, val_) {
                    $.getScript("plugins/" + val["name"] + "/" + val_);
                });
                // css Load
                $.each(data_["css"], function(index_, val_) {
                    $.get("plugins/" + val["name"] + "/" + val_, function(data) {
                        $("style").append("<!-- Plugin: " + val["name"] + " -->" + data);
                    });
                });
                // html Load
                $.get("plugins/" + val["name"] + "/" + data_["html"], function(data) {
                    $("#" + val["parent"]).append(("<!-- Plugin: " + val["name"] + ' --> <div class="content_area">'));
                    if (val["display_name"] !== false) {
                        $("#" + val["parent"]).append('<h2 id="' + val["name"] + '">' + val["display_name"] + "</h2>");
                        $("#heading-" + val["parent"]).append('<li><a href="#' + val["name"] + '">' + val["display_name"] + '</a></li>');
                    }
                    $("#" + val["parent"]).append(data + "</div>");
                });
            });
        });
    });

    var jsonPath = "";
    $.getJSON("plugins/master_data.json", function(data) {
        // マスターデータ
        $("div#field-icon_url").children('img').attr('src', data["icon_url"]);
        $("div#field-name").children('h1').text(data["name"]);
        $("div#field-bio").children('span').html(data["bio"]);
        if (data.hasOwnProperty('header_url')) {
            $("div#background_img").append('<img src="' + data["header_url"] + '">');
        }
    });

    $('body').append(dummy);
});


dummy.ready(function() {
    $('#wrap').css('display', 'block');
    $('#loader-bg').delay(900).fadeOut(800);
    $('#loader').delay(600).fadeOut(300);

    $(document).on('click', 'a[href^="#"]', function() {
        var speed = 600;
        var href = $(this).attr("href");
        var target = $(href == "#" || href == "" ? 'html' : href);
        var position = target.offset().top;
        $("html, body").animate({ scrollTop: position }, speed, "swing");
        return false;
    });

    $(window).scroll(function() {
        // メニュー制御
        var ScrTop = $(document).scrollTop();
        if (ScrTop > 50) {
            $('#fixedMenu').css({ 'position': 'fixed', 'top': '0' });
            if (!$.support.noCloneChecked) {
                $('#fixedMenu').css('position', 'absolute')
                    .css('top', ($(document).scrollTop()) + "px");
            }
            $('#fixedPagetop').css({ 'display': 'block' });
        }
        if (ScrTop < 260) {
            $('#fixedMenu').css({ 'position': 'absolute', 'top': '260px' });
            $('#fixedPagetop').css({ 'display': 'none' });
        }
    });

    // ふんわりフェードイン表示制御
    var inspectionView;
    var displayView;
    $(document).on("click", ".change_view", function() {
        if (displayView === void 0) {
            displayView = "section#" + $("[data-fieldtype='content_field']:eq(0)").attr("id");
        }
        if (!isFadeing) {
            var displayTarget = "section#" + $(this).attr('data-viewname');
            // console.log(displayView + " -> " + displayTarget);
            if (displayView != displayTarget) {
                isFadeing = true;
                $(displayView).attr('class', "fadeout");
                $(displayView).on('animationend webkitAnimationEnd oAnimationEnd mozAnimationEnd', function() {
                    $('[id^=view]').hide();
                    $(".change_view").removeClass("index_select");
                    $(".change_view").addClass("index");
                    $("[data-viewname='" + displayView.replace(/section#/g, "") + "']").removeClass("index");
                    $("[data-viewname='" + displayView.replace(/section#/g, "") + "']").addClass("index_select");
                    $(displayView).show();
                    $(displayView).attr('class', "fadein");
                    isFadeing = false;
                });
                displayView = displayTarget;
            }
        }
    });
});