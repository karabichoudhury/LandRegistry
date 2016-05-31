Template.landRegistry.rendered=function(){
	//console.log("this in rendered",this);
	  hideAlert();
	  $('#example').hide();
	  $('#results-preview').hide();
}

Template.landRegistry.events({
	'click #fetch':function(e){
		e.preventDefault();
		var pincode = $('#pincode').val();
		if(pincode.length<=0){
			showAlert('Please enter a valid pincode', 'danger');
		}
		else
		{
			showModal('spinner');
			Meteor.call('addquery',pincode,function(error,results){
				if(error){
					showAlert('Error fetching data.Please try later', 'danger');
				}
				else
				{
					drawDataTable(results.results.bindings);
					hideModal('spinner');
				}
				
    		});
		}
		
		
	}
})

function showModal(modalId){
	$('#' + modalId).addClass('in');
    $('#' + modalId).show();
    /*$('#' + modalId).modal({
        backdrop: 'static',
        keyboard: false
    });*/
    $('body').append('<div class="modal-backdrop fade in"> </div>')
}

function hideModal(modalId){

	 $('#' + modalId).removeClass('in');
    $('#' + modalId).hide();
    $('.modal-backdrop').remove();
    $('body').removeClass('modal-open');
}


function transformData(data){

	var transformedData =[];

	for (i=0;i<data.length;i++){
		//console.log("data",data[i]);
		var street = data[i].street.value;
		var town = data[i].town.value;
		var country = data[i].county.value;
		var postcode = data[i].postcode.value;
		var amount = data[i].amount.value;
		var date= data[i].date.value;
		var category = data[i].category.value;

		var obj={
			"street":street,
			"town":town,
			"country":country,
			"postcode":postcode,
			"amount":amount,
			"date":date,
			"category":category
		}

		transformedData.push(obj);
	}
	return transformedData;
}

function drawDataTable(data){
		$('#example').dataTable().fnClearTable();
		var newData = transformData(data);
		

		console.log("length",newData.length);
		
        
        for (var i = 0; i < newData.length; i++) {
            $("#example").dataTable().fnAddData([
                [newData[i].street, newData[i].town,newData[i].country,newData[i].postcode,newData[i].amount,newData[i].date,newData[i].category]
            ]);

        }

       

         $('#example').show();
         $('#results-preview').show();
}