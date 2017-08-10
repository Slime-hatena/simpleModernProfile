$.getJSON("plugins/playingThis_1/option.json", function(data) {

    $.each(data['section'], function(index, val) {
        str = "<h3>" + val['title'] + "</h3><div>" +
            val['description'] + '<a href="' + val['link'] + '"><div class="blackButton"><span>このゲームについて</span></div></a>';
        $(".playingThis_1").append(str);
    });
});