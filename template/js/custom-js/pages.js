/*!
 * Simple jQuery Equal Heights
 *
 * Copyright (c) 2013 Matt Banks
 * Dual licensed under the MIT and GPL licenses.
 * Uses the same license as jQuery, see:
 * http://docs.jquery.com/License
 *
 * @version 1.5.1
 */
!function(a){a.fn.equalHeights=function(){var b=0,c=a(this);return c.each(function(){var c=a(this).innerHeight();c>b&&(b=c)}),c.css("height",b)},a("[data-equal]").each(function(){var b=a(this),c=b.data("equal");b.find(c).equalHeights()})}(jQuery);
$.fn.isInViewport = function () {
  let elementTop = $(this).offset().top;
  let elementBottom = elementTop + $(this).outerHeight();

  let viewportTop = $(window).scrollTop();
  let viewportBottom = viewportTop + $(window).height();

  return elementBottom > viewportTop && elementTop < viewportBottom;
};


//Este código está limitando a busca

// window.sessionStorage.setItem('specSearch', JSON.stringify({
//  hasGroup: true,
//  spec: 'grupo',
//  value: '1'
// }))

const EcomPassport = require('@ecomplus/passport-client')
import loadCheckDoc from '../check-group'
loadCheckDoc()

window.ecomPassport.on('login', () => {
  console.log(window.ecomPassport.checkLogin()) // true
  loadCheckDoc()
})

const search = new EcomSearch()

let mouseDown = false;
let startX, scrollLeft;
const sliders = document.querySelectorAll('.breakline-false');

sliders.forEach(slider => {
  slider.addEventListener('mousedown', startDragging, false);
  slider.addEventListener('mousemove', move, false);
});

window.addEventListener('mouseup', stopDragging, false);
window.addEventListener('mouseleave', stopDragging, false);

function startDragging(e) {
  mouseDown = true;
  startX = e.pageX - this.offsetLeft;
  scrollLeft = this.scrollLeft;
}

function stopDragging() {
  mouseDown = false;
}

function move(e) {
  if (!mouseDown) return;
  const x = e.pageX - this.offsetLeft;
  const scroll = x - startX;
  this.scrollLeft = scrollLeft - scroll;
}

window.whatsappRedirect = function(type){
  //alert(type)
}

$(document).ready(function(){
  $(`.header__search  > div > input`).keyup(function(){
    $(this).focus()
    $('body .search__input').val($(this).val())[0].dispatchEvent(new Event('input'));
  })
  if($('.page--categories .category-banner').length > 0 && $(`.page--categories .category-description`).length > 0){
    $('.page--categories .category-banner, .page--categories .category-description, .page--categories .page-title').wrapAll('<div id=category_heading_box></div>');
    $(`.page--categories .category-description, .page--categories .page-title`).wrapAll('<div></div>');
  }

  $('.apx-banner_slider').addClass('owl-carousel')
  $('.apx-banner_slider').owlCarousel({
      loop:true,
      margin:0,
      items:1,
      dots:true,
      nav:false,
      autoplay:true,
      autoplayTimeout:4000
  });
  $('.products-carousel__list').each(function(){
    $(this).find('.product-card__name').equalHeights()
    $(this).find('.product-card__prices').equalHeights()
    $(this).find('.product-card').equalHeights()
  })
  if(window.innerWidth > 990){
    $('.products-carousel__list').each(function(){
      if($(this).find('.product-card').length > 5){
        $(this).addClass('owl-carousel')
        $(this).owlCarousel({
          loop:true,
          margin:20,
          responsiveClass:true,
          responsive:{
              0:{
                  items:2,
                  nav:false,
                  stagePadding:0,
                  margin:15
              },
              600:{
                  items:3,
                  nav:false
              },
              1000:{
                  items:5,
                  dots:false,
                  nav:false,
                  loop:true
              }
          },
          onInitialized: function(){        
            setTimeout(function(){ $(`.products-carousel__list`).trigger(`refresh.owl.carousel`) }, 750);
            $(window).scroll(function(){
              $(`.products-carousel__list`).each(function(){
                if($(this).isInViewport() && !$(this).hasClass(`reinitialized`)){
                  $(this).trigger(`refresh.owl.carousel`)
                  $(this).addClass('reinitialized')
                }
              })
            })
          }
        });
      }
    })
    
    
   
  }else{
    
  }

  $('.apx_banner-grid.grid-format-5 .row').attr('class','owl-carousel')
  $('.apx_banner-grid.grid-format-5 .owl-carousel').owlCarousel({
      loop:true,
      margin:30,
      items:3,
      dots:false,
      nav:false,
      autoplay:true,
      autoplayTimeout:4000,
      responsive:{
        0:{
            items:1,
            dots:true
        },
        600:{
            items:2,
            
        },
        1000:{
            items:3,
            
        }
    },
  });
  

  $('body').css('--header-vh-main', ($('header#header').innerHeight()) + 'px');
  $('body').css('--inner-width', ($('body').innerWidth()) + 'px');

  //adiciona nome do usuário aos elementos username
  const client = EcomPassport.ecomPassport.getCustomer();   
  $('[username]').text(client.display_name || `Visitante` )

  placeFavoritesAside();
});

$(window).resize(function(){
  $('body').css('--inner-width', ($('body').innerWidth()) + 'px');
})

$('body').on('click','#wishlist-button, .favorites__aside  .apx-side-heading button, #m-toggleFavorites', function(){
  $('#favorites-quickview').toggleClass('visible')
  $(`#m-toggleFavorites`).toggleClass(`active`)
});

$('body').on('click','.product-card__favorite-remove', function(){
  toggleFavoriteFront(this);
});

$('body').on('click','.product-card__favorite', function(){
  placeFavoritesAside();
})


async function placeFavoritesAside(){
  $(`.favorites__body`).empty();
  try {
    const { favorites } = await EcomPassport.ecomPassport.getCustomer();    
    search.setProductIds(favorites).fetch().then(result => {
      $.each(result.hits.hits, function(k,i){
        let item = i._source;
        $(`<div class="row item"><div class=col-12><div class="favorite-list product-card"data-sku=${item.sku} data-product-id=${item._id}><section><a class=product-card__link href=/${item.slug} title=${item.name}><div class=product-card__pictures><img alt="${item.pictures ? item.pictures[0].normal.alt : ''}"src="${item.pictures ? item.pictures[0].normal.url : '/assets/img-placeholder.png'}"></div></a><div class=product-card__content-group><div class='row align-items-start'><div class=col><a class=product-card__link href=/${item.slug} title=${item.name}><h3 class=product-card__name>${item.name}</h3></a></div><div class=col-auto><button class="btn product-card__favorite-remove"aria-label="Remover dos favoritos"><svg fill=none height=16 viewBox="0 0 16 16"width=16 xmlns=http://www.w3.org/2000/svg><g clip-path=url(#clip0_21_6728)><path d="M5.33331 8.00004H10.6666M14.6666 8.00004C14.6666 11.6819 11.6819 14.6667 7.99998 14.6667C4.31808 14.6667 1.33331 11.6819 1.33331 8.00004C1.33331 4.31814 4.31808 1.33337 7.99998 1.33337C11.6819 1.33337 14.6666 4.31814 14.6666 8.00004Z"stroke=#666666 stroke-linecap=round stroke-linejoin=round /></g><defs><clipPath id=clip0_21_6728><rect fill=white height=16 width=16 /></clipPath></defs></svg></button></div></div><div class="prices product-card__prices "><span class='prices__compare ${item.base_price ? '' : 'd-none'}'><s>${item.base_price ? (item.currency_symbol + ' ' +item.base_price.toLocaleString('pt-br', {style: 'decimal', maximumFractionDigits: 2,minimumFractionDigits: 2})) : ''}</s> </span><strong class=prices__value>${item.currency_symbol} ${item.price.toLocaleString('pt-br', {style: 'decimal', maximumFractionDigits: 2,minimumFractionDigits: 2})}</strong></div><div class="fade product-card__buy"><button class="btn btn-primary btn-sm"data-id=${item._id} type=button>Adicionar ao Carrinho</button></div></div></section><div></div></div></div>`).appendTo(`.favorites__body`);
      });      
    })
    
  }catch(e){
    console.log(e)
  }
}

async function toggleFavoriteFront(el){
  try {
    let productId = $(el).attr('data-id');
    const { favorites } = await EcomPassport.ecomPassport.getCustomer();   
    const favIndex = favorites.indexOf(productId)
    favorites.splice(favIndex, 1) 
    EcomPassport.ecomPassport.requestApi('/me.json', 'patch', { favorites })
    $(el).closest('.item').remove();
    
  }catch(e){
    console.log(e)
  }
}

const $timers = $('.timer_');
if ($timers.length) {
  const formatTime_ = timeNumber => timeNumber.toString().padStart(2, '0')
  $timers.each(function () {
    const { end, maxHours } = $(this)[0].dataset
    const diffSeconds = Math.min(
      (new Date(end).getTime() - Date.now()) / 1000,
      maxHours * 3600
    )

    if (diffSeconds > 0) {
      let hours = Math.floor(diffSeconds / 3600)
      const hoursAsSeconds_ = hours * 3600
      let minutes = Math.floor((diffSeconds - hoursAsSeconds_) / 60)
      let seconds = parseInt(diffSeconds - hoursAsSeconds_ - minutes * 60, 10)
      const $timerCount_ = $(this).find('.timer__count')

      const updateTimerCount_ = () => {
        if (seconds > 0) {
          seconds--
        } else if (minutes > 0) {
          minutes--
          seconds = 59
        } else if (hours > 0) {
          hours--
          seconds = minutes = 59
        } else {
          return clearInterval(stopwatch)
        }
        $timerCount_.html(`<span class="hh">${formatTime_(hours)}</span><span class="mm">${formatTime_(minutes)}</span><span class="ss">${formatTime_(seconds)}</span>`)
      }
      const stopwatch = setInterval(updateTimerCount_, 1000)
      updateTimerCount_()
    }
  })
}

