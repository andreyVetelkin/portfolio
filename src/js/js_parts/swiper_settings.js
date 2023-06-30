import $ from "jquery";
import Swiper, {Navigation, Thumbs} from 'swiper';

$(document).ready(function () {
	const slider_main = new Swiper('[data-slider_main]', {
		modules: [Navigation],
		speed: 700,
		grabCursor: true,
		slidesPerView: 1,
		roundLengths: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	})
	
	if ($('body').width() <= 767) {
		
		const main_services = new Swiper('[data-main_services]', {
			modules: [Navigation],
			speed: 700,
			grabCursor: true,
			slidesPerView: 1,
			spaceBetween: 24,
			roundLengths: true,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		})
		const main_news = new Swiper('[data-main_news]', {
			modules: [Navigation],
			speed: 700,
			grabCursor: true,
			spaceBetween: 24,
			slidesPerView: 1,
			roundLengths: true,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		})
	}
	
	
	if ($('[data-text_slider]')) {
		let $prev = $('[data-text_slider_thumbs]').siblings('.swiper-button-prev'),
			$next = $('[data-text_slider_thumbs]').siblings('.swiper-button-next');
		
		const text_slider = new Swiper('[data-text_slider]', {
			modules: [Navigation, Thumbs],
			speed: 700,
			grabCursor: true,
			slidesPerView: 1,
			spaceBetween: 24,
			roundLengths: true,
			navigation: {
				nextEl: $next.get(0),
				prevEl: $prev.get(0),
			},
			thumbs: {
				autoScrollOffset: 1,
				swiper: {
					el: '[data-text_slider_thumbs]',
					speed: 700,
					
					slidesPerView: 6,
					spaceBetween: 8,
					breakpoints: {
						
						0: {
							slidesPerView: 4,
							
						},
						992: {
							slidesPerView: 6,
						}
					}
				}
			},
			
			on: {
				slideChange: function () {
					$(this.$el).find('video').each(function () {
						this.pause()
					})
				},
			},
		});
	}
	if ($('[data-product_slider]')) {
		let $prev = $('[data-product_slider_thumbs]').siblings('.swiper-button-prev'),
			$next = $('[data-product_slider_thumbs]').siblings('.swiper-button-next');
		
		
		const product_slider = new Swiper('[data-product_slider]', {
			modules: [Navigation, Thumbs],
			speed: 700,
			grabCursor: true,
			slidesPerView: 1,
			spaceBetween: 24,
			navigation: {
				nextEl: $next.get(0),
				prevEl: $prev.get(0),
			},
			thumbs: {
				autoScrollOffset: 1,
				swiper: {
					el: '[data-product_slider_thumbs]',
					speed: 700,
					
					slidesPerView: 4,
					spaceBetween: 12,
					
				}
			},
			
			on: {
				slideChange: function () {
					$(this.$el).find('video').each(function () {
						this.pause()
					})
				},
			},
		})
	}
});