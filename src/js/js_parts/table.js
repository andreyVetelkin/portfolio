import $ from "jquery";

$(document).ready(function () {
	function tableFixedCol() {
		let temp = '<div class="product-table__fixed_col"></div>'
		
		$('[data-table]').each(function () {
			let table = $(this);
			table.append(temp)
			$(this).find('tr *:first-child').each(function () {
				let css = $(this).css(['width', 'height']),
					tableItemVal = $(this).text(),
					tableItem = '<div class="product-table__fixed_item" style="width: ' + css.width + ';height: ' + css.height + '; ">' + tableItemVal + '</div>';
				
				if ($(this)[0].tagName === 'TH') {
					tableItem = '<div class="product-table__fixed_item product-table__fixed_item--title" style="width: ' + css.width + ';height: ' + css.height + '; ">' + tableItemVal + '</div>';
				}
				table.find('.product-table__fixed_col').append(tableItem)
			})
			
		})
	}
	
	tableFixedCol()
	
})