$USALabel = 'State:<span class="red">*</span>';
$CALabel = 'Province:<span class="red">*</span>';

$JISTSuccess = 'http://jist.emcp.com/jist-lp-thank-you';
$PESSuccess = 'http://paradigm.emcp.com/pes-lp-thank-you';
$EMCSuccess = 'http://store.emcp.com/emc-lp-thank-you';

var d = new Date();

var month = d.getMonth()+1;
var day = d.getDate();

var TodaysDate = d.getFullYear() + '-' +
    ((''+month).length<2 ? '0' : '') + month + '-' +
    ((''+day).length<2 ? '0' : '') + day;

// Datepicker
$(document).ready(function () {
   $('#Decision_Date__c').datepicker({ dateFormat: 'yy-mm-dd' });
   $('#Decision_Date__c').val(TodaysDate);
});

$(document).ready(function () {
	$('#StateCode-CA').hide();
	$('#CountryCode').change(function(){
		if( $(this).val() == 'US' ) {
			$('#StateCode-US').show();
			$('#StateCode-CA').hide();
			$('#StateCodeLabel').show().html($USALabel);
			$('#StateCode').val( $('#StateCode-US').val() );
		} 
		if( $(this).val() == 'CA' ) {
			$('#StateCode-US').hide();
			$('#StateCode-CA').show();
			$('#StateCodeLabel').show().html($CALabel);
			$('#StateCode').val( $('#StateCode-CA').val() );
		} 
		if ( $(this).val() != 'US' && $(this).val() != 'CA' ) {
			$('#StateCode-US').hide();
			$('#StateCode-CA').hide();
			$('#StateCodeLabel').hide();
			$('#StateCode').val('');
		}
	});

	
	$('#StateCode-US').change(function(){
		$val = $(this).val();
		$('#StateCode').val($val);
	});
	$('#StateCode-CA').change(function(){
		$val = $(this).val();
		$('#StateCode').val($val);	
	});
});

// Form validation
$(document).ready(function () {
	// Enable h5Validate plugin
	$('form').h5Validate({
		errorClass: 'validationError',
		validClass: 'validationValid'
	});

	// Prevent form submission when errors
	$('form').submit(function (evt) {
		if ($('form').h5Validate("allValid") === false) {
			evt.preventDefault();
		}
	});
});
