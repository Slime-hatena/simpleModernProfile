$(document).ready(function() {
    var jsonPath = "profile_data/";
    $.getJSON(jsonPath + "personal.json", function(data) {
        console.log(data);


        $("div#field-icon_url").children('img').attr('src', data["icon_url"]);
        $("div#field-name").children('span').text(data["name"]);
        $("div#field-bio").children('span').text(data["bio"]);
        $("div#field-location").children('span').text(data["location"]);
        $("div#field-mail").children('span').text(data["mail"]);
        $("div#field-url").children('a').children('span').text(data["url"]);
        $("div#field-url").children('a').attr('href', data["url"]);
        $("div#field-birthdate").children('span').text(data["birthdate"]);

    });
});

$(function() {
    $(window).scroll(function() {
        var ScrTop = $(document).scrollTop();
        if (ScrTop > 50) {
            $('#fixedMenu').css({ 'position': 'fixed', 'top': '0' });
            if (!$.support.noCloneChecked) {
                $('#fixedMenu').css('position', 'absolute')
                    .css('top', ($(document).scrollTop()) + "px");
            }
            $('#fixedPagetop').css({ 'display': 'block' });
        }
        if (ScrTop < 50) {
            $('#fixedMenu').css({ 'position': 'absolute', 'top': '50px' });
            $('#fixedPagetop').css({ 'display': 'none' });
        }
    });
    $('#fixedPagetop a').click(function() {
        $('html,body').animate({ scrollTop: 0 }, 1000);
        return false;
    });
});