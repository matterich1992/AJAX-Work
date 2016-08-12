
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // MY CODE //
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    $greeting.text('So you want to live in, '+ address + '?');

    var streetView =  'http:maps.googleapis.com/maps/api/streetview?size=600x300&location='+ address + '';

    $body.append('<img class="bgimg" src="'+streetView+'">');

//NYT API Link//

var newyorktimesURL = ('https://api.nytimes.com/svc/search/v2/articlesearch.json?q='+ cityStr +'&sort=newest&api-key=1417dd42da464079b00dec84344d1428');

$.get(newyorktimesURL, function(data){

  $nytHeaderElem.text('Most recent articles frm the New York Times about: '+ cityStr);

  articles=data.response.docs;
    for(var i =0;i<articles.length;i++){
        var article = articles[i];
        $nytElem.append('<li class="article">'+
        '<a href="'+article.web_url+'">'+article.headline.main+
        '</a>'+
        '<p>'+article.snippet+'</p>'+
        '</li>');
    };
});


    return false;
};

$('#form-container').submit(loadData);
