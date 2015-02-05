$USALabel = 'State:<span class="red">*</span>';
$CALabel = 'Province:<span class="red">*</span>';

$successPage = 'http://response.emcp.com/Email/DFS/redemption/PESESAMPLE.php?code=';

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var $code = getParameterByName('code');

$(document).ready(function () {
    $('#__successPage').val($successPage + $code);
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
	
	$('#OrgType').change(function() {
		if( $(this).val() == 'OrgType1' ) {
			$('#Lead_Type__c').val('K-12');
		}
		if( $(this).val() == 'OrgType2' ) {
			$('#Lead_Type__c').val('Post-Secondary');
		}
		if( $(this).val() == 'OrgType3' ) {
			$('#Lead_Type__c').val('Federally Funded');
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

// Combine selected products and insert into 'Sample_Requested__c' field in Salesforce
// Note: product checkbox options must use the 'products' class
$(document).submit(function () {
    var sampleRequested = $(":checked.products")
        .map(function () {
        return this.value;
    })
    .get()
    .join("\n");
    $('#Sample_Requested__c').attr('value',sampleRequested);
});