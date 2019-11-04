$.extend( $.validator.messages, {
	required: "Это поле необходимо заполнить.",
	remote: "Пожалуйста, введите правильное значение.",
	email: "Пожалуйста, введите корректный адрес электронной почты.",
	url: "Пожалуйста, введите корректный URL.",
	date: "Пожалуйста, введите корректную дату.",
	dateISO: "Пожалуйста, введите корректную дату в формате ISO.",
	number: "Пожалуйста, введите число.",
	digits: "Пожалуйста, вводите только цифры.",
	creditcard: "Пожалуйста, введите правильный номер кредитной карты.",
	equalTo: "Пожалуйста, введите такое же значение ещё раз.",
	extension: "Пожалуйста, выберите файл с правильным расширением.",
	maxlength: $.validator.format( "Пожалуйста, введите не больше {0} символов." ),
	minlength: $.validator.format( "Пожалуйста, введите не меньше {0} символов." ),
	rangelength: $.validator.format( "Пожалуйста, введите значение длиной от {0} до {1} символов." ),
	range: $.validator.format( "Пожалуйста, введите число от {0} до {1}." ),
	max: $.validator.format( "Пожалуйста, введите число, меньшее или равное {0}." ),
	min: $.validator.format( "Пожалуйста, введите число, большее или равное {0}." )
} );

/**
   * Serialize object
   * @returns {{}}
*/

  $.fn.serializeObject = function()
  {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
      if (o[this.name] !== undefined) {
        if (!o[this.name].push) {
          o[this.name] = [o[this.name]];
        }
        o[this.name].push(this.value || '');
      } else {
        o[this.name] = this.value || '';
      }
    });
    return o;
  };


$(function(){
  
  $('.subscr-form-bg').on('submit', function(e){
   e.preventDefault();
    if ($('.subscr-form-bg form input[placeholder="email"]').val() != '') {
     alertify.success('Ваша заявка успешно отправлена');
    } else {
     alertify.error('Вы не указали email адрес');
    }
  });


  $('.js-phone, input[name="phone"], [type="tel"]').inputmask('+9(999)999-99-99');

  var $callbackForm = $('.js-callback-form');

$callbackForm.validate({
  errorClass: 'is-error',
  rules: {
    'phone': {
      required: true
    }
  },
  submitHandler: function (form) {
    Shop.sendMessage(
      $callbackForm.serializeObject()
      )
      .done(function (response) {
        //alertify.set('notifier','delay', 100);
        alertify.success(response.notice);
        $callbackForm.trigger('reset');
        $.fancybox.close();
      })
      .fail(function (response) {
        $.each(response.errors, function (i, val) {
          alertify.error(val[0]);
        });
      });
  }
});




});

$.extend($.validator.messages, {
    required: "Это поле необходимо заполнить.",
    remote: "Пожалуйста, введите правильное значение.",
    email: "Пожалуйста, введите корректный адрес электронной почты.",
    url: "Пожалуйста, введите корректный URL.",
    date: "Пожалуйста, введите корректную дату.",
    dateISO: "Пожалуйста, введите корректную дату в формате ISO.",
    number: "Пожалуйста, введите число.",
    digits: "Пожалуйста, вводите только цифры.",
    creditcard: "Пожалуйста, введите правильный номер кредитной карты.",
    equalTo: "Пожалуйста, введите такое же значение ещё раз.",
    extension: "Пожалуйста, выберите файл с правильным расширением.",
    maxlength: $.validator.format("Пожалуйста, введите не больше {0} символов."),
    minlength: $.validator.format("Пожалуйста, введите не меньше {0} символов."),
    rangelength: $.validator.format("Пожалуйста, введите значение длиной от {0} до {1} символов."),
    range: $.validator.format("Пожалуйста, введите число от {0} до {1}."),
    max: $.validator.format("Пожалуйста, введите число, меньшее или равное {0}."),
    min: $.validator.format("Пожалуйста, введите число, большее или равное {0}.")
});

/** 
 * Serialize object
 * @returns {{}}
 */

$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};


$(function() {

    var $fastcheckoutForm = $('.js-fastcheckout-form');

    $fastcheckoutForm.validate({
        errorClass: 'is-error',
        rules: {
            'phone': {
                required: true
            },
            'name': {

            },
            'email': {
                required: true,
                email: true
            }
        },
        submitHandler: function(form) {
            ajaxAPI.checkout.order($fastcheckoutForm.serializeObject(), {
                'delivery': delivery_variant_id,
                'payment': payment_gateway_id
            }).done(function(response) {
                alertify.success('Заказ успешно отправлен');
                $fastcheckoutForm.trigger('reset');
                $.fancybox.close();
                location.href = response.location;
            }).fail(function(response) {
                console.log(response);
                $.each(response.errors, function(i, val) {
                    alertify.error(val[0]);
                });
            });
        }
    });
});

$.fancybox.defaults.touch = false;

$(document).ready(function() {
  $('[data-count]').each(function(){

      var number = parseInt($(this).attr('data-count'));

      $(this).text(declOfNum(number, ['товар', 'товара', 'товаров']));
   });

   $('[data-article-count]').each(function(){

       var number = parseInt($(this).attr('data-article-count'));

       $(this).text(declOfNum(number, ['статья', 'статьи', 'статей']));
    });



  EventBus.subscribe('update_items:insales:cart', function (cart) {

   $('.js-cart-price').html(Shop.money.format(cart.items_price));

    if (cart.items_count > 0) {
      $('[data-items-count]').text(cart.items_count);
    }
      var number = parseInt(cart.items_count);
    $('.js-count-product').text(declOfNum(number, ['товар', 'товара', 'товаров']));
  });
});


function setUsercity(city) {
  
  $('.js-usercity').text(city);
  localforage.setItem('usercity', city).then(function (value) {
  }).catch(function(err) {
    console.log(err);
  });
  $('[data-usercity]').hide();
  $('[data-usercity="'+city+'"]').show();
  $('.address-cell').removeClass('is-open');
  
  if (city == 'Москва') {
  //если Москва
  $('.js-moscow-toggle').show();
  $('.js-region-toggle').hide();
  } else {
  //если регионы
  $('.js-moscow-toggle').hide();
  $('.js-region-toggle').show();
  }
  
}


$(document).ready(function() {



  localforage.getItem('usercity', function(err, value) {
    if (value) {
      setUsercity(value);
    } else {
      $.ajax({
      url: '//kladr.insales.ru/current_location.json',
      type: 'get',
      dataType: 'jsonp',
      success: function(data){
        if (data.region == 'Москва') {
          setUsercity('Москва');
        } else if (data.region == 'Санкт-Петербург') {
          setUsercity('Санкт-Петербург');
        } else {
            setUsercity('Регионы');
        }
      }
      });
    }
  });

 $('.address-dropdown li').on('click', function(e){
 e.preventDefault();
  var usercity = $(this).data('city');
  setUsercity(usercity);
  $.fancybox.close();
 });
});

$(function(){
  if ($('#instafeed').length > 0) {
  var feed = new Instafeed({
   get: 'user',  
   userId: '1990211688',
   accessToken: '1990211688.1677ed0.e027455292424e0aabba4b59fea34496',
   resolution: 'standard_resolution',
    /*filter: function(image) {
        console.log(image.tags);
        return image.tags.indexOf('bakerhouse') >= 0;
    },*/
   template: '<div class="swiper-slide"><a href="{{link}}"><img src="{{image}}" /></a></div>',
   after: function(){
     var mySwiperInsta = new Swiper ('.instagram-feed_swiper-container', {
       autoHeight: true,
       slidesPerView: 'auto',
       centeredSlides: true,
       spaceBetween: 4,
       loop: true
      })
   }
   });
   feed.run();
 }
});

$(document).ready(function() {
  EventBus.subscribe('add_items:insales:cart', function (cart) {
    $.magnificPopup.open({
      items: {
        src: '#cart-add',
        type: 'inline'
      }
    });
  });
  $(document).on('click', '.added-close', function(event) {
    event.preventDefault();
    $.magnificPopup.close();
  });
});

$(document).ready(function() {
    var photoSlider = new Swiper('.js-photo-slider', {
        slidesPerView: 1,
        setWrapperSize: true,
        paginationClickable: true,
        loop: true,
        preventClicks: true,
        controlBy: 'container',
        spaceBetween: 0,
        nextButton: '.photo-control-next',
        prevButton: '.photo-control-prev'
    });

    var gallerySlider = new Swiper('.js-gallery-slider', {
        slidesPerView: 3,
        setWrapperSize: true,
        paginationClickable: true,
        loop: true,
        preventClicks: true,
        controlBy: 'container',
        nextButton: '.gallery-control-next',
        prevButton: '.gallery-control-prev',
        spaceBetween: 10,
        breakpoints: {
            124: {
                slidesPerView: 6
            },
            100: {
                slidesPerView: 4
            },
            160: {
                slidesPerView: 3
            }
        }
    });

    $('.photo-slider .swiper-wrapper').magnificPopup({
        delegate: 'a',
        type: 'image',
        gallery: {
            enabled: true
        }
    });
  $('.photo-slider-wrapper').magnificPopup({
        delegate: 'a',
        type: 'image',
        gallery: {
            enabled: true
        }
    });
    $('.gallery-slider a').on('click', function(e) {
        e.preventDefault();
        var $target = $(this).attr('href');
        var index = $('.photo-slider a[href="' + $target + '"]:first').parents('.swiper-slide').index();
        photoSlider.slideTo(index);

    });
});

$(document).ready(function() {

  $('.js-products-slider').each(function(i){
    var $slider = $(this);
    var $next = $(this).parents('.products-slider-wrapper:first').find('.products-control-next');
    var $prev = $(this).parents('.products-slider-wrapper:first').find('.products-control-prev');

    var indexSliders = new Swiper($slider, {
      slidesPerView: 3,
      setWrapperSize: true,
      paginationClickable: false,
      loop: true,
      preventClicks: true,
      controlBy: 'container',
      nextButton: $(this).parents('.products-slider-wrapper:first').find('.products-control-next'),
      prevButton: $(this).parents('.products-slider-wrapper:first').find('.products-control-prev'),
      spaceBetween: 20,
      breakpoints: {
        1024: {
          slidesPerView: 2
        },
        480: {
          slidesPerView: 1
        }
      }
    });
  });



 var recipeSliders = new Swiper('.js-recipes-slider', {
   slidesPerView: 2,
   setWrapperSize: true,
   paginationClickable: false,
   preventClicks: true,
   controlBy: 'container',
   nextButton: '.recipes-control-next',
   prevButton: '.recipes-control-prev',
   spaceBetween: 20,
   breakpoints: {
     768: {
       slidesPerView: 1
     }
   }
 });
});

$(document).ready(function() {
  var promoSlider = new Swiper('.js-promo', {
    pagination: '.promo-slider-pagination',
    nextButton: '.promo-slider-next',
    prevButton: '.promo-slider-prev',
    loop: true,
    paginationClickable: true,
    autoHeight: true,
    slidesPerView: 'auto',
    centeredSlides: true
  });
});
