import {
  Fancybox,
  Carousel,
  Panzoom
} from "@fancyapps/ui";

// import inputmask from './libs/jquery.inputmask.min.js';

import $ from 'jquery';


import Swiper, {
  Navigation,
  Thumbs,
  Autoplay,
  Pagination
} from 'swiper'

import "bootstrap/js/dist/modal.js";
$(document).ready(function() {
  
  setTimeout(function () {
    $('body').addClass('load')
  }, 300);
  
  $('[data-class_toggler]').click(function () {
    let $attr = $(this).attr('data-class_toggler')
    $('[data-class_target="' + $attr + '"]').toggleClass('active')
  })
  
  $('[data-class_togglerOut]').each(function () {
    let $attr = $(this).attr('data-class_togglerOut'),
      $container = $('[data-class_target="' + $attr + '"]'),
      first = true;
    $(this).click(function () {
      
      $container.toggleClass('active')
      if (first === true) {
        $(document).click(function () {
          
          if (!$container.is(event.target) && !$container.has(event.target).length) {
            $container.removeClass('active')
            first = false
          }
        });
      }
    })
    
  });
  
  
  function handleInputDevice(event) {
    document.body.dataset.input =
      event.type === 'mousedown' ? 'mouse' : 'keyboard';
  }

  window.addEventListener('mousedown', handleInputDevice, false);
  window.addEventListener('keydown', handleInputDevice, false);



});