$(document).ready(function() {
    // ローディング
    $('[id^=view]').hide();

    var css = "";
    // プラグインロード
    $.getJSON("plugins/setting.json", function(data) {
        $.each(data["sections"], function(index, val) {
            $.getJSON("plugins/" + val["name"] + "/setting.json", function(data_) {
                $.each(data_["js"], function(index_, val_) {
                    $.getScript("plugins/" + val["name"] + "/" + val_);
                });
                $.each(data_["css"], function(index_, val_) {
                    $.get("plugins/" + val["name"] + "/" + val_, function(data) {
                        $("style").append("<!-- Plugin: " + val["name"] + " -->" + data);
                    });
                });
                $.get("plugins/" + val["name"] + "/" + data_["html"], function(data) {
                    $("#" + val["parent"]).append("<!-- Plugin: " + val["name"] + " -->" + data);
                });
            });
        });
    });



    var jsonPath = "profile_data/";
    $.getJSON(jsonPath + "personal.json", function(data) {
        console.log(data);

        // main
        $("div#field-icon_url").children('img').attr('src', data["icon_url"]);
        $("div#field-name").children('h1').text(data["name"]);
        $("div#field-bio").children('span').html(data["bio"]);
        $("div#field-location").children('span').text(data["location"]);
        $("div#field-mail").children('span').text(data["mail"]);
        $("div#field-url").children('a').children('span').text(data["url"]);
        $("div#field-url").children('a').attr('href', data["url"]);
        $("div#field-birthdate").children('span').text(data["birthdate"]);
    });

    $.getJSON(jsonPath + "works.json", function(data) {
        console.log(data);
        $.getJSON("https://api.github.com/users/" + data["github"] + "/repos", function(github) {
            var length;
            var langData = {};
            $.each(github, function(index, val) {
                if (val["language"] in langData) {
                    ++langData[val["language"]];
                } else {
                    langData[val["language"]] = 1;
                }
                length = index + 1;
            });

            var g = 0;
            $.each(langData, function(index, val) {
                langData[index] = val / length;
                g += val / length;
            });

            var str = '<div class="barchart">';
            $.each(langData, function(index, val) {
                var cl = index.replace(/#/g, "s");
                cl = cl.replace(/¥+/g, "p");
                str += '<div class="data lang_color ' + cl + '" style="width: ' + val * 100 + '%"></div><div class="data_char">' + index + '<span>(' + Math.round(val * 100) + '%)</span></div>';
            });
            str += '</div>';

            $("div#field-langages").html(str);
            $("div#field-detail").children('span').html(data["detail"]);
            $("div#field-github").children('a').children('span').text(data["github"]);
            $("div#field-github").children('a').attr('href', "https://github.com/" + data["github"]);


        });


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