//Initial Page Setup
$(function(){
  $("input:first").focus();
  $('#other-title').hide();
  $('#color').prop('disabled', true);
  $('#credit-card').hide();
  $('#paypal').hide();
  $('#bitcoin').hide();
  $('#colors-js-puns').hide();
  $('.emsg').css('visibility', 'hidden');
});

//Create Textfield when choosing other as a job role
$('#title').on('change', function (e) {
    if(this.value === 'other') {
      $('#other-title').show();
    } else {
      $('#other-title').hide();
    }
});

//TShirt Design Selection
$('#design').on('change', function (e) {
  if(this.value === 'js puns'){
    $('#colors-js-puns').show();
    $('#color').prop('disabled', false);
    $('#color option[value=cornflowerblue]').prop('selected', 'selected').change();
    $('#color option[value="cornflowerblue"]').show();
    $('#color option[value="darkslategrey"]').show();
    $('#color option[value="gold"]').show();

    $('#color option[value="tomato"]').hide();
    $('#color option[value="steelblue"]').hide();
    $('#color option[value="dimgrey"]').hide();
  } else if(this.value === 'heart js') {
    $('#colors-js-puns').show();
    $('#color').prop('disabled', false);
    $('#color option[value=tomato]').prop('selected', 'selected').change();
    $('#color option[value="cornflowerblue"]').hide();
    $('#color option[value="darkslategrey"]').hide();
    $('#color option[value="gold"]').hide();

    $('#color option[value="tomato"]').show();
    $('#color option[value="steelblue"]').show();
    $('#color option[value="dimgrey"]').show();
  } else {
    $('#colors-js-puns').hide();
    $('#color').prop('disabled', true);
  }

})

//Activities Registration Section
$('.activities').on('change', function (e) {
  //Tuesday 9am-12pm
  if($('input[name="js-frameworks"]').prop('checked')) {
    $('input[name=express]').prop('disabled', true);
    $('input[name=express]').parent().css('color', 'red');
  } else if($('input[name="express"]').prop('checked')) {
    $('input[name=js-frameworks]').prop('disabled', true);
    $('input[name=js-frameworks]').parent().css('color', 'red');
  } else {
    $('input[name=js-frameworks]').prop('disabled', false);
    $('input[name=express]').prop('disabled', false);
    $('input[name=js-frameworks]').parent().css('color', '#000');
    $('input[name=express]').parent().css('color', '#000');
  }
  //Tuesday 1pm-4pm
  if($('input[name="js-libs"]').prop('checked')) {
    $('input[name=node]').prop('disabled', true);
    $('input[name=node]').parent().css('color', 'red');
  } else if($('input[name="node"]').prop('checked')) {
    $('input[name=js-libs]').prop('disabled', true);
    $('input[name=js-libs]').parent().css('color', 'red');
  } else {
    $('input[name=js-libs]').prop('disabled', false);
    $('input[name=node]').prop('disabled', false);
    $('input[name=js-libs]').parent().css('color', '#000');
    $('input[name=node]').parent().css('color', '#000');
  }
  $('#total-cost').remove();
  $('.activities').append('<p id="total-cost">Total Cost: $' + displayTotalCost() +'</p>');
})

function displayTotalCost(){
  var activityList = $('.activities input');
  var sum = 0;
  for(let i = 0; i < activityList.length; i++){
    if(activityList[i].name === 'all' && activityList[i].checked) {
      sum += 200;
    } else if(activityList[i].checked) {
      sum += 100;
    }
  }
  return sum;
}

//Payment Options
$('#payment').on('change', function (e) {
  if(this.value === 'credit card') {
    $('#credit-card').show();
    $('#paypal').hide();
    $('#bitcoin').hide();
  } else if(this.value === 'paypal') {
    $('#credit-card').hide();
    $('#paypal').show();
    $('#bitcoin').hide();
  } else {
    $('#credit-card').hide();
    $('#paypal').hide();
    $('#bitcoin').show();
  }
});


//Real Time Email Validation
var $regexname=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
$('#mail').on('keyup',function(){
       if (!$(this).val().match($regexname)) {
        // there is a mismatch, hence show the error message
          $('.emsg').css('visibility', 'visible');
       }
     else{
          // else, do not display message
          $('.emsg').css('visibility', 'hidden');
         }
   });

//Form Validation
function validateForm(){
  var isValidated = true;
  var errorMessage = '';
  //Check if name field is blank
  if($('#name').val() === ''){
    $('#name').css('border', 'solid 2px red');
    errorMessage += 'Please enter a valid name.\n';
    isValidated = false;
  }

  //Check for valid email format
  if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($('#mail').val())){
    $('#mail').css('border', 'solid 2px red');
    $('div.error').show();
    errorMessage += 'Please enter a valid email.\n';
    isValidated = false;
  }

  //Must select at least one checkbox
  const checkboxLength = $('.activities input').length;
  for(let i = 0; i < checkboxLength; i++){
    if($('.activities input')[i].checked){
      break;
    } else if(!$('.activities input')[i].checked && i === (checkboxLength - 1)){
      errorMessage += 'You have not registered for an activity.\n';
      $('.activities legend').css('color', 'red');
      isValidated = false;
    }
  }

  //Check for valid Credit Card Info
  if($('#credit-card').is(':visible')){
    //Credit card number between 13 and 16 digits
    if($('#cc-num').val() === ''){
      errorMessage += 'Please enter a credit card number.\n';
      $('#cc-num').css('border', 'solid 2px red');
      isValidated = false;
    } else if (!/^\d{13}(\d{3})?$/.test($('#cc-num').val())) {
      errorMessage += 'Please enter a card number that is between 13 and 16 digits long.\n';
      $('#cc-num').css('border', 'solid 2px red');
      isValidated = false;
    }

    //5 digit zip Code
    if(!/^\d{5}?$/.test($('#zip').val())){
      errorMessage += 'Enter a valid 5 digit zip code.\n';
      $('#zip').css('border', 'solid 2px red');
      isValidated = false;
    }

    //3 digit CVV
    if(!/^\d{3}?$/.test($('#cvv').val())){
      errorMessage += 'Enter a valid 3 digit CVV.';
      $('#cvv').css('border', 'solid 2px red');
      isValidated = false;
    }
  }
    if(!isValidated){
      displayErrorMessage(errorMessage);
    }
  return isValidated;
}

function displayErrorMessage(error){
  alert(error);
}
