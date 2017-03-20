// add item into basket > adds into cart
$(document).ready(function() {
    console.log("jQuery document ready");

	$('.products').click(function(e){
		 var target = e.target;
		 console.log(target);
		 console.log("add to basket clicked");

		var item = $(target).parents(".thumbnail").clone()
		console.log(item);
		var buttonlessItem = $(item).find('#addbasket').remove().end();
		console.log('have we lost you?', buttonlessItem);

		buttonlessItem.appendTo('#itemsbrought');

	
	});


});

	$('.navbar').onePageNav();


// checkout sotres location in database 

// $('#checkout').on('click', function(event){
// 	console.log("Checkout button clicked")
// });


// pulls data onto map




//total cost 