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

String.prototype.capitalizeFirstLetter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

function updateNavbarSelection(hash) {
  $(".nav a").each(function(){ 
    var elem = $(this);
    elem[elem.attr('href')===hash ? 'addClass':'removeClass']('active');
  });
};

// {{{ On page load
$( function() {
  $(window).hashchange( function(){
    var hash = location.hash;
    var boztrippattern=/#\/boztrip\/(\d{4})\/([a-z0-9]+)\??/g;
    var page,regexmatch,boztrippage;

    if (hash=="")
    {
      page="home";
      hash="#/home";
    }
    else if(hash.match(boztrippattern))
    {
      regexmatch=boztrippattern.exec(hash); 
      boztrippage="./content/boztrip/" + regexmatch[1] + "/menu";
      page="/boztrip/" + regexmatch[1] + "/content/" + regexmatch[2];
    }
    else
    {
      page=hash.replace( /^#/, '' );
    }
    document.title = 'Boz Trio - ' + page.capitalizeFirstLetter();
    $("#main_content").load("./content/" + page + ".html",function(){refresh_i18n();});
    if (boztrippage != undefined)
    {
      $("#left-bar").load(boztrippage + ".html",function(){
        refresh_i18n();
        updateBtNavbarSelection(hash);
      });
    }
    else
    {
      $("#left-bar").empty();
    }
  })
  $(window).hashchange();

  $(".fancybox").fancybox();
});

function updateBtNavbarSelection(hash) {
  $("#left-bar p a").each(function(){ 
    var elem = $(this);
    if (elem.attr('href')===hash)
    {
      elem.removeClass("boztrip-unactive");
      elem.addClass("boztrip-active");
    }
    else
    {
      elem.removeClass("boztrip-active");
      elem.addClass("boztrip-unactive");
    }
  });
};
// }}}

// {{{ Navbar Collapse on element click
$('.nav a').on('click', function(){
  $('#exCollapsingNavbar').collapse('hide');
});
// }}}
