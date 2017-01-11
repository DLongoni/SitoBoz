// {{{ Localization
function toIt(){
  i18next.init({'lng':'it'},function(){
    jqueryI18next.init(i18next, $);
    $('body').localize();
  });
};

function toEn(){
  i18next.init({'lng':'en'},function(){
    jqueryI18next.init(i18next, $);
    $('body').localize();
  });
};

function refresh_i18n(){
  i18next.init({},function(){
    jqueryI18next.init(i18next, $);
    $('body').localize();
  });
};

i18next.use(i18nextXHRBackend);
i18next.init({
  'debug': true,
  'lng': window.navigator.userLanguage || window.navigator.language,
  'load':'languageOnly',
  'fallbackLng': 'en',
  backend: {
    loadPath: 'locales/{{lng}}.json'
  }
}, function() {
  jqueryI18next.init(i18next, $);
  $('body').localize();
});

$("#btnEn").click(function(){
  toEn();
});
$("#btnIt").click(function(){
  toIt();
});
// }}}

// {{{ On page load
$( function() {
  $(".nav a").on("click", function(){
    $(".nav").find(".active").removeClass("active");
    $(this).parent().addClass("active");
  });

  $.address.state('/').init(function(){
    $('.navbar .nav-item a').address();
  }).change(function(event) {  
    var page;
    if (event.path=="/")
    {
      page="home";
    }
    else
    {
      page=event.path.substr(1,event.path.length-1);
    }
    $("#main_content").load("./content/" + page + ".html",function(){refresh_i18n();});
  });  
});
// }}}

// {{{ Navbar Collapse on element click
$('.nav a').on('click', function(){
  $('#exCollapsingNavbar').collapse('hide');
});
// }}}
