// Control site language
$( document ).ready(function() {
  create_lang_pop();
  sw_lang();

  $('.lang_pop span').click(function() {
    if($('.lang_pop:hover .content').is(':visible')) {$('.lang_pop:hover .content').hide();}
    else {$('.lang_pop:hover .content').show();}
  });
});
// Site code and language name array
var lang_code = {"ru":"русский", "ua":"українська"};

// Change content on user language
function ch_site_lang(lng='ru') {
  $.getJSON( "lng/"+lng+".json", function( data ) {

    var $lang_tags = $('[data=lng-txt]');

    $('[data=lng-txt]').each(function() {
      // var lang_content = $.trim($(this).text().toLowerCase());
      var lang_content = $(this).text().replace(/\s+/g, ' ').trim().toLowerCase();
      console.log(lang_content);
      $(this).html(data[lng][lang_content]);
    });

    $('[data=lng-place]').each(function() {
      var lang_content = $.trim($(this).attr("placeholder").toLowerCase());
      $(this).attr("placeholder", data[lng][lang_content]);
    });

  });
}

// Create popup for language choise button
function create_lang_pop() {
  $.each( lang_code, function( key, value ) {
    $('.lang_pop .selector ul').append('<li data-lang="'+key+'">'+value+'</li>');
    $('[data-lang='+key+']').click(function(){
      set_lang(key.toUpperCase());
    });
  });
}
// Set language manual
function set_lang(code="RU") {
  $.cookie("country", code);
  window.location = "/";
}

// Get language Code
function sw_lang() {
  var ccode = $.cookie("country");
  if(ccode == undefined) {
    // Get country region by IP
    $.getJSON("http://ip-api.com/json",
     function (data) {
       ccode = data.countryCode;
       $.cookie("country", ccode);
       window.location = "";
     }
   );
  }
  else if(ccode && lang_code[ccode.toLowerCase()] == undefined) {
    ccode = "RU";
  }
  $.cookie("country", ccode);
  if(ccode != "RU" && ccode != undefined) {
    $('.lang_pop span').text(ccode);
    ch_site_lang(ccode.toLowerCase());
  }
}
