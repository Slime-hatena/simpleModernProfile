$(document).ready(function() {
    // ローディング
    $('[id^=view]').hide();

    var css = "";
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

    $("section#view-main").show();
    $("section#view-main").attr('class', "fadein")

});

var isFadeing = false;
$(function() {
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
    $('#fixedPagetop a').click(function() {
        $('html,body').animate({ scrollTop: 0 }, 1000);
        return false;
    });

    // ふんわりフェードイン表示制御
    var inspectionView;
    var displayView = "section#view-main";
    $(".change_view").on('click', function(event) {
        if (!isFadeing) {
            var display = "section#" + $(this).attr('data-viewname');
            if (displayView != display) {
                displayView = display;
                inspectionView = displayView != "section#view-main" ? "section#view-main" : "section#view-works";

                $('[id^=view]').attr('class', "fadeout");
                isFadeing = true;
                $(inspectionView).on('animationend webkitAnimationEnd oAnimationEnd mozAnimationEnd', function() {
                    $('[id^=view]').hide();
                    $(displayView).show();
                    $(displayView).attr('class', "fadein");
                    isFadeing = false;
                });
            }
        }
    });
});