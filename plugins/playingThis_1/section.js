$.getJSON("plugins/playingThis_1/option.json", function(data) {
    var cnt = 0;
    $.each(data['section'], function(index, val) {
        ++cnt;
        var str = '<h3 id="playingThis_1_' + cnt + '">' + val['title'] + "</h3><div>" +
            val['description'] + '<a href="' + val['link'] + '"><div class="blackButton"><span>このゲームについて</span></div></a>';
        var strHead = '<li><a href="#playingThis_1_' + cnt + '">' + val["title"] + '</a></li>'
        $(".playingThis_1").append(str);
        $(".playingThisHeading_1").append(strHead);
    });
});