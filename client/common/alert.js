Template.alertMessage.events({
	'click #closeAlert': function(e){
		hideAlert();
	}
})

showAlert = function(message, type){
	$('#alertMessage').html(message)
	$('#alertMessage').removeClass('alert-danger alert-success').addClass('alert-'+type);
    $('#alert').show();
}

hideAlert = function(){
	$('#alertMessage').removeClass('alert-danger alert-success');
	$('#alertMessage').html('');
	$('#alert').hide();
}