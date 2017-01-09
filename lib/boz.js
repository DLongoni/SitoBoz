function refresh_i18n(){
  i18next.init({},function(){
    jqueryI18next.init(i18next, $);
    $('body').localize();
  });
};

function showHome() { $("#main_content").load("home.html",function(){refresh_i18n();});}
function showGruppo(){ $("#main_content").load("gruppo.html",function(){refresh_i18n();});}
function showMusica(){ $("#main_content").load("musica.html",function(){refresh_i18n();});}
function showConcerti(){ $("#main_content").load("concerti.html",function(){refresh_i18n();});}
function showContatti(){ $("#main_content").load("contatti.html",function(){refresh_i18n();});}
function showFoto(){ $("#main_content").load("foto.html",function(){refresh_i18n();});}
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

$( function() {
  showHome();
  $(".nav a").on("click", function(){
    $(".nav").find(".active").removeClass("active");
    $(this).parent().addClass("active");
  });
} );

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

$('.nav a').on('click', function(){
  $('#exCollapsingNavbar').collapse('hide');
});
