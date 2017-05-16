// JavaScript Document for FlatDuplex Landingpage

function sendAnother(){

	$('#encrypt-success').fadeOut();
	$('#encrypt-error').fadeOut();
	$('#encrypt_form').fadeIn("slow");
	
	$('#encrypt-email').val('');
	$('#encrypt-passphrase').val('');
	$('#encrypt-subject').val('');
	$('#encrypt-message').val('');

}

function decryptAnother(){

	$('#decrypt-success').fadeOut();
	$('#decrypt-error').fadeOut();
	$('#decrypt_form').fadeIn("slow");
	
	$('#decrypt-passphrase').val('');
	$('#decrypt-message').val('');

}

$(document).ready(function(){

	$('#encrypt-email').keypad({keypadOnly: false, layout: $.keypad.qwertyLayout, showOn: 'button', buttonImageOnly: true, buttonImage: 'js/jquery.keypad/keypad.png'});
	$('#encrypt-passphrase').keypad({keypadOnly: false, layout: $.keypad.qwertyLayout, showOn: 'button', buttonImageOnly: true, buttonImage: 'js/jquery.keypad/keypad.png'});
	$('#encrypt-subject').keypad({keypadOnly: false, layout: $.keypad.qwertyLayout, showOn: 'button', buttonImageOnly: true, buttonImage: 'js/jquery.keypad/keypad.png'});
	$('#encrypt-message').keypad({keypadOnly: false, layout: $.keypad.qwertyLayout, showOn: 'button', buttonImageOnly: true, buttonImage: 'js/jquery.keypad/keypad.png'});

	$('#decrypt-passphrase').keypad({keypadOnly: false, layout: $.keypad.qwertyLayout, showOn: 'button', buttonImageOnly: true, buttonImage: 'js/jquery.keypad/keypad.png'});
	
	$('.scroll').click(function(){
		var mark = $(this).attr('id');
		var position = $('.'+mark).offset().top;
		$('html, body').animate({scrollTop:position - 90}, 'slow');
		return false;
		});
	
	// Header Slider
	$('.flexslider.notebookslider').flexslider({
		controlNav: true,
		directionNav: false
	});

	// Hover Actions
	$('.hover').css('opacity', '1');
	  $('.hover').hover(
	    function () {
	       $(this).stop().animate({ opacity: 0.7 }, 'slow');
	    },
	    function () {  
	       $(this).stop().animate({ opacity: 1 }, 'slow');
	  });
	  
	  // Scroll Top Button
	  $('.scroll-top').click(function(){
		  $("html, body").animate({ scrollTop: 0 }, 'slow');
		  return false;
	  });
	  
	  
	  // Disable form submit on enter
	  $(window).keydown(function(event){
	  	
	    if(event.keyCode == 13 && event.target.nodeName != "TEXTAREA") {
	      event.preventDefault();
	      return false;
	    }
	    
	  });
	  
	  
	  // Newsletter validate and send
	  var emailReg = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+\.)+[a-zA-Z0-9.-]{2,4}$/;

	  // Validate
	  function validateNewsletterEmail(email,regex){
		  if (!regex.test(email.val()))
				{
					email.addClass('validation-error',500);
					$('#newsletter-form').addClass('validation-error',500);
					return false;
				}
				else
				{
					email.removeClass('validation-error',500);
					$('#newsletter-form').removeClass('validation-error',500);
					return true;
				}
	  }
	  

	  // Check and Send
	  $('#send-newsletter').click(function(){
		  // result of action
		  var result=true;

		  //Get the data from all the fields
		  var email = $('input[name=newsletter-email]');

		  // validate of name input
		  if(!validateNewsletterEmail(email,emailReg)) result=false;

		  if(result==false) return false;

		  var data = 'email=' + email.val();

		  //start the ajax
		  $.ajax({
			  //this is the php file that processes the data and send mail
			  url: "newsletter.php", 
			  //POST method is used
			  type: "POST",
			  //pass the data     
			  data: data,   
			  //Do not cache the page
			  cache: false,
			  //success
			  success: function(data) {
				  $('.newsletter-form').html('<h3 class="subscribe-message">Thank you!</h3>');
			  }
		  });

		  return false;

	  });

	  // Check and Send
	  $('#send-contact').click(function(){
		  // result of action
		  var result=true;

		  //Get the data from all the fields
		  var name = $('input[name=contact-name]');
		  var email = $('input[name=contact-email]');
		  var subject = $('input[name=contact-subject]');
		  var message = $('#contact-message');

		  // validate of name input
		  if(!validateNewsletterEmail(email,emailReg)) result=false;
		  if(!validateString(name)) result=false;
		  if(!validateString(message)) result=false;
		  if(!validateString(subject)) result=false;
		  
		  if(result==false) return false;

		  var data = 'email=' + email.val() + '&name=' + name.val() + '&subject=' + subject.val() + '&message=' + message.val();

		  //start the ajax
		  $.ajax({
			  //this is the php file that processes the data and send mail
			  url: "contact.php", 
			  //POST method is used
			  type: "POST",
			  //pass the data     
			  data: data,   
			  //Do not cache the page
			  cache: false,
			  //success
			  success: function(data) {
				  $('#contact-form').html('<h3 class="subscribe-message">Thank you! Your message has been successfully sent</h3>');
			  }
		  });

		  return false;

	  });
		
	  // Highlight Input Field
	  $('input[name=newsletter-email]').blur(function(){
		  validateNewsletterEmail($(this),emailReg); 
	  });
	  
	  
	  // Contact validate and send
	  var emailReg = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+\.)+[a-zA-Z0-9.-]{2,4}$/;

	  // Validate
	  function validateEmail(email,regex){
		  if (!regex.test(email.val()))
				{
					email.addClass('validation-error',500);
					return false;
				}
				else
				{
					email.removeClass('validation-error',500);
					return true;
				}
	  }
	  
	  function validateString(name){
		  if (name.val()=='') 
          	{
            	name.addClass('validation-error',500);
            	return false;
            }
            else
            {
            	name.removeClass('validation-error',500);
            	return true;
            }
       }

	  // Check and Send
	  $('#send-encrypt').click(function(){

	  	$('#encrypt-error').fadeOut();

		  // result of action
		  var result=true;

		  //Get the data from all the fields
		  var passphrase = $('input[name=encrypt-passphrase]');
		  var email = $('input[name=encrypt-email]');
		  var subject = $('input[name=encrypt-subject]');
		  var message = $('#encrypt-message');

		  // validate of name input
		  if(!validateString(passphrase)) result=false;
		  if(!validateString(message)) result=false;
		  if(!validateString(subject)) result=false;
		  if(!validateEmail(email,emailReg)) result=false;
		  if(!validateEmail(email,emailReg)) result=false;

		  if(result==false) return false;

		  var encrypted = doEncrypt();

		  var data = 'email=' + email.val() + '&subject=' + subject.val() + '&message=' + encrypted;

		  //start the ajax
		  $.ajax({
			  //this is the php file that processes the data and send mail
			  url: "sendEncryptedEmail.php", 
			  //POST method is used
			  type: "POST",
			  //pass the data     
			  data: data,   
			  //Do not cache the page
			  cache: false,
			  //success
			  success: function(data) {
			  	if(data == 0){
			  		$('#encrypt_form').fadeOut();			  		
					$('#encrypt-success').fadeIn("slow");
				}else{
					$('#encrypt-success').fadeOut();
        			$('#encrypt-error').fadeIn("slow");
				}
			  },
			  error: function (request, status, error) {
			  		$('#encrypt-success').fadeOut();
        			$('#encrypt-error').fadeIn("slow");
    			}
		  });

		  return false;

	  });

// Check and Send
	  $('#send-encrypt-only').click(function(){

	  	$('#encrypt-error').fadeOut();

		  // result of action
		  var result=true;

		  //Get the data from all the fields
		  var passphrase = $('input[name=encrypt-passphrase]');
		  var message = $('#encrypt-message');

		  // validate of name input
		  if(!validateString(passphrase)) result=false;
		  if(!validateString(message)) result=false;
		  
		  if(result==false) return false;

		  var encrypted = doEncrypt();

		  $('#encrypt_form').fadeOut();			  		
		  $('#encrypt-success').fadeIn("slow");

		  return false;

	  });

	// Check and Send
	  $('#send-decrypt').click(function(){

	  	$('#decrypt-error').fadeOut();

		  // result of action
		  var result=true;

		  //Get the data from all the fields
		  var passphrase = $('input[name=decrypt-passphrase]');
		  var message = $('#decrypt-message');

		  // validate of name input
		  if(!validateString(passphrase)) result=false;
		  if(!validateString(message)) result=false;
		  
		  if(result==false) return false;

		  var decrypted = doDecrypt(message, passphrase);

		  if(decrypted == ''){
		  	$('#decrypt-success').fadeOut();
        	$('#decrypt-error').fadeIn("slow");	
		  }else{
		  	$('#decrypt_form').fadeOut();
		  	$('#div-decrypt-encrypted_message').val(decrypted);
			$('#decrypt-success').fadeIn("slow");
		  }
		  
		  return false;

	  });
		
	  // Highlight Input Field
	  $('input[name=email]').blur(function(){
		  validateEmail($(this),emailReg); 
	  });
	  
	  $('input[name=name]').blur(function(){
		  validateName($(this)); 
	  });
	  
	  if(bData){
	  	$('#decrypt-anchor').click();
	  }

});

function doEncrypt(){

    var message     = $('#encrypt-message').val();
    var passphrase  = $('#encrypt-passphrase').val();

    var ciphertext = Aes.Ctr.encrypt(message, passphrase, 256);
    var base64textencode = Base64.encode(ciphertext);
    
    if(base64textencode != ''){

        $('#encrypt-encrypted_message').val(base64textencode);
        $('#div-encrypt-encrypted_message').val($('#encrypt-encrypted_message').val());

    }

    return $('#encrypt-encrypted_message').val();
    
}

function doDecrypt(message, passphrase){

	var base64textdecode = Base64.decode(message.val());
    var origmessage = Aes.Ctr.decrypt(base64textdecode, passphrase.val(), 256);

    return origmessage;

}
