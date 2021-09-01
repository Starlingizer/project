//Smooth scroll quand on clique sur le menu
   $(function() {
     $('a[href*="#"]:not([href="#"])').click(function() {
       if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
         var target = $(this.hash);
         target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
         if (target.length) {
           $('html, body').animate({
             scrollTop: target.offset().top - 110
           }, 1000);
           return false;
         }
       }
     });
   });

$(function(){
  // Utils
  var q = document.querySelector.bind(document);
  var qall = document.querySelectorAll.bind(document);
  var mkElt = document.createElement.bind(document);

  var FONT_SIZE_SELECTOR = '.masterstyle';
  // var FONT_SIZE_SELECTOR = '.typeface .fontdemo1 input';

  var body = document.body;
  var head = document.head;
  var cookieOpts = { expires: 31536e3 }; // a year
  var demo1Fields = qall('.demotext');
  var fontSizeSelector = q('.font-sizer input');
  var fontSizeValue = q('.font-sizer .value');
  var fontSizeStyle = head.appendChild(mkElt('style'));



  // Add browser class
  navigator.sayswho = (function(){
    var ua= navigator.userAgent, tem,
    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
        tem= ua.match(/\bOPR\/(\d+)/)
        if(tem!= null) return 'Opera '+tem[1];
    }
    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    return M[0];
  })();
  var browser = navigator.sayswho.toLowerCase();
	$('body').addClass(browser);



  function getHashFilter() {
    var hash = location.hash;
    // get filter=filterName
    var matches = location.hash.match( /filter=([^&]+)/i );
    var hashFilter = matches && matches[1];
    return hashFilter && decodeURIComponent( hashFilter );
  }

  // isotope
  // quick search regex
  var qsRegex;

    $('.centerside.home').isotope({
      // options
      itemSelector: '.typefaceBox',
      percentPosition: true,
      layoutMode: 'vertical',
      masonry: {
        // use element for option
        columnWidth: '.typefaceBox'
      },
      filter: function() {
        return qsRegex ? $(this).text().match( qsRegex ) : true;
      },

      getSortData: {
        name: '.fontname', // text from querySelector
        author: '.author',
        publisheddate: '.published_date',
        updatedate: '.update_date',
        stylecount: '.stylecount'
        // glyphcount: '.glyphcount'
      }

    });




// flatten object by concatting values
function concatValues( obj ) {
  var value = '';
  for ( var prop in obj ) {
    value += obj[ prop ];
  }
  return value;
}

    var $grid = $('.centerside.home').isotope({});

    // store filter for each group
    var filters = {};

    // use value of search field to filter
    var $quicksearch = $('.quicksearch').keyup( debounce( function() {
      qsRegex = new RegExp( $quicksearch.val(), 'gi' );
      $grid.isotope();
    }, 200 ) );

    // debounce so filtering doesn't happen every millisecond
    function debounce( fn, threshold ) {
      var timeout;
      threshold = threshold || 100;
      return function debounced() {
        clearTimeout( timeout );
        var args = arguments;
        var _this = this;
        function delayed() {
          fn.apply( _this, args );
        }
        timeout = setTimeout( delayed, threshold );
      };
    }

    $('.filters-button-group').on( 'click', 'button', function() {
      var filterValue = $(this).attr('data-filter');
      $grid.isotope({ filter: filterValue });
    });

    // bind filter on select change
    $('.filters-select').on( 'change', function() {
      // get filter value from option value
      var filterValue = this.value;
      $grid.isotope({ filter: filterValue });
    });

    // bind sort button click
    $('.sort-by-button-group').on( 'click', 'button', function() {
      var sortValue = $(this).attr('data-sort-by');
      if(sortValue != "original-order"){
        $(".announcementBox").hide();
      }else{
        $(".announcementBox").show();
      }
      var revert = false;
      if ($(this).hasClass("revert")){
        revert = false;
      }else{
        revert = true;
        }
      if ($(this).hasClass("is-checked") && $(this).attr('data-sort-by') !== "original-order"){
            revert = !revert;
          }

      $grid.isotope('updateSortData').isotope({ sortBy: sortValue, sortAscending: revert });


    });

    // change is-checked class on buttons
    $('.sort-by-button-group').each( function( i, buttonGroup ) {
      var $buttonGroup = $( buttonGroup );
      $buttonGroup.on( 'click', 'button', function() {
        $buttonGroup.find('.is-checked').removeClass('is-checked');
        $( this ).addClass('is-checked');
      });
    });




  // fittext
  $(".fitword").bigtext().each(function(){
    var fontsize = Math.round(parseInt($(this).children().first().css('font-size')));
    $(this).siblings(".legend").append("<span class='fontsize'> — " + fontsize + "px</span>");
  });

  $(window).on('resize', function(){
      $(".fitword").bigtext().each(function(){
        var fontsize = Math.round(parseInt($(this).children().first().css('font-size')));
        $(this).siblings(".legend").children(".fontsize").replaceWith("<span class='fontsize'> — " + fontsize + "px</span>");
  })});


  // Marquee
  // $('.marquee').marquee({
  //   duplicated: true,
  //   gap: 30,
  //   duration: 10000,
  //   delayBeforeStart: 0,
  //   startVisible: true
  // });
  //
  // $('.marqueenews').marquee({
  //   duplicated: true,
  //   gap: 0,
  //   duration: 4000,
  //   delayBeforeStart: 0,
  //   startVisible: true,
  //   pauseOnHover: true
  // });

  Marquee3k.init();



  // Active page
  var CurrentPath = window.location.pathname;
  // console.log(CurrentPath);
  $(".nav > li > a").each(function(){
    if($(this).attr('href') == CurrentPath) {
      $(this).addClass("active");
    }
  })
  $(".navfont > li > a").each(function(){
    if($(this).attr('href') == CurrentPath) {
      $(this).addClass("active");
    }
  })


  $('body').on('focus', '[contenteditable]', function() {
    const $this = $(this);
    $this.data('before', $this.html());
    $('html, body').animate({
       scrollTop: $this.offset().top - 110
     }, 1000);
     // var updateIsotope = $grid.isotope();
     // setTimeout(updateIsotope, 1000);

}).on('blur keyup paste input', '[contenteditable]', function() {
    const $this = $(this);
    if ($this.data('before') !== $this.html()) {
        $this.data('before', $this.html());
        $this.trigger('change');
        textUpdate($this.data('before'));
    }
}).on('blur', '[contenteditable]', function() {
    const $this = $(this);
    $grid.isotope({transitionDuration: '3s'});
    // var scrollTo = $('html, body').animate({
    //    scrollTop: $this.offset().top - 110
    //  }, 1000);
    //setTimeout(scrollTo, 1000);
  });


  // Demo text update
  function textUpdate(value, callback) {
    var i = demo1Fields.length;

    $(".demotext:not(:focus").html(value);
    // debounce($grid.isotope(), 10000);
    Cookies.set('demo-text-1', value, cookieOpts);

  }

  document.addEventListener('input', function(e) {
    if (!e.target.classList.contains('fontdemo1')) return;
    textUpdate(e.target.textContent)
    // const $this = e.target;
    // console.log($this);
    // $('html, body').animate({
    //   scrollTop: $this.offset().top - 110
    // }, 1000);

  });




  // Font size update
  function updateSize(size, force) {
      if (fontSizeValue!=null){
      fontSizeValue.innerHTML = size;

      $(".masterstyle > p").each(function(){
        var fontSizeFactor = $(this).closest(".typefaceBox").data('fontsizefactor');
        var modifiedSize = size * fontSizeFactor;
        $(this).css({'font-size': modifiedSize + 'px'});

      })
      $(".secondstyle > p").each(function(){
        var fontSizeFactor = $(this).closest(".typefaceBox").data('fontsizefactor');
        var modifiedSize = size * fontSizeFactor / 3;
        $(this).css({'font-size': modifiedSize + 'px'});

      })
      if (force) fontSizeSelector.value = size;
      Cookies.set('demo-size', size, cookieOpts);
      $('.centerside.home').isotope(); // Relaunch Isotope after the fontsize update
    }
  }
  updateSize(Cookies.get('demo-size') || 60, true);

  fontSizeSelector.addEventListener('input', function(e) {
    updateSize(e.target.value);
    // updateSize(e.target.value);
  });




  $.fn.strech_text = function(){
      var elmt          = $(this),
          cont_width    = elmt.width(),
          txt           = elmt.html(),
          one_line      = $('<span class="stretch">' + txt + '</span>'),
          nb_char       = elmt.text().length,
          spacing       = cont_width/nb_char,
          txt_width;

      elmt.html(one_line);
      txt_width = one_line.width();

      if (txt_width < cont_width){
          var  char_width     = txt_width/nb_char,
               ltr_spacing    = spacing - char_width + (spacing - char_width)/nb_char ;

          one_line.css({'letter-spacing': ltr_spacing - 10});
      } else {
          one_line.contents().unwrap();
          elmt.addClass('justify');
      }
  };

  $(document).ready(function () {
      $('.centerside.home h1').each(function(){
          $(this).strech_text();
      });


  });



  // news
  var news = $('.news');
  if (news.length > 0) {
    setTimeout(function(){ news.addClass('opened') }, 7000);
  }


});

// Display the size of the text in the specimen
  $(".specimen:not(:has(>.fitword))").each(function(){
    var fontsize = Math.round(parseInt($(this).children().first().css('font-size')));
    $(this).children(".legend").append("<span class='fontsize'> — " + fontsize + "px</span>");
  })

  $(window).load(function(){
    setTimeout(function(){
      $('.centerside.home').isotope();
      console.log("late isotope");
    }, 200);
    // var hasScrolled = 0;
    // if(hasScrolled == "0"){
    //   $(window).scroll(function(){
    //     $('.centerside.home').isotope();
    //     console.log("good");
    //     hasScrolled = 1;
    //   })
    // }
  })
