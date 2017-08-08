var isFadeing = false;
var dummy = $('<!-- content ready -->');

$(document).ready(function() {

    // ローディング
    $('[id^=view]').hide();

    // html構造ロード
    $.getJSON("plugins/tabs.json", function(data) {
        var isChange = false;
        $.each(data["tabs"], function(index, val) {
            $("div.wrapper").append('<section id=' + val['id'] + ' data-fieldtype="content_field"></section>');
            $("nav#fixedMenu").append('<div class="change_view index" data-viewname="' + val['id'] + '"><div>' + val['display_name'] + '</div></div>');
            if (!isChange) {
                isChange = true;
                $("section#" + val['id']).show();
                $("section#" + val['id']).attr('class', "fadein");
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
                    $("#" + val["parent"]).append("<!-- Plugin: " + val["name"] + " -->");
                    if (val["display_name"] !== false) {
                        $("#" + val["parent"]).append("<h2>" + val["display_name"] + "</h2>");
                    }
                    $("#" + val["parent"]).append(data);
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
    });

    $('body').append(dummy);
});



dummy.ready(function() {
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
        if (ScrTop < 210) {
            $('#fixedMenu').css({ 'position': 'absolute', 'top': '215px' });
            $('#fixedPagetop').css({ 'display': 'none' });
        }
    });

    // ふんわりフェードイン表示制御
    var inspectionView;
    var displayView;
    $(document).on("click", ".change_view", function() {
        if (displayView === void 0) {
            //  data-fieldtype
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
                    $(displayView).show();
                    $(displayView).attr('class', "fadein");
                    isFadeing = false;
                });
                displayView = displayTarget;
            }
        }
    });
});