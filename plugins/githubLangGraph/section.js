$.getJSON("plugins/githubLangGraph/option.json", function(data) {
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