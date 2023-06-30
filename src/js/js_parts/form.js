import inputmask from '../libs/jquery.inputmask.min.js';
import $ from "jquery";

$(document).ready(function () {
	let $phone = $("[data-phone]");
	
	if ($phone.length) {
		let $mask = $phone.attr('data-phone')
		
		$phone.inputmask({
			mask: $mask,
			placeholder: '_',
			showMaskOnHover: false,
			showMaskOnFocus: true,
			
		});
	}
	
	
	$('[data-input_file]').each(function () {
		
		var label = $(this).siblings('label'),
			labelVal = label.html();
		
		$(this).on('change', function (e) {
			var fileName = '';
			if (this.files && this.files.length > 1)
				fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
			else
				fileName = 'Выбран файл: ' + e.target.value.split("\\").pop();
			
			if (fileName)
				label.html(fileName);
			else
				label.innerHTML = labelVal;
		});
	});
});