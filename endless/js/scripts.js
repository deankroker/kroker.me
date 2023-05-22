/*
  DEVELOPER MODE JSON DATA
  Whatever JSON is here will be placed in the "developer mode" codeblock
  Syntax highlighting setup for strings, numbers, and booleans
*/
var productData = {
  "product_pk": "392kc83w217",
  "name": "Dean Legendary Guitar Series",
  "model": "DJK-1030",
  "manufacturer": "Dean",
  "average_price": 2489,
  "min_price": 1659,
  "max_price": 3499,
  "currency": "USD",
  "listings": [
    {
      "name": "Amazon.com",
      "average_price": 4469,
      "min_price": 1897,
      "max_price": 3499,
      "currently_listed": true,
    },
    {
      "name": "Guitar Center",
      "average_price": 2489,
      "min_price": 1659,
      "max_price": 3499,
      "currently_listed": false,
    }
  ]
}

$(document).ready(function(){ 
  // Initialize "animate on scroll" library
  AOS.init();
  
  // Initialize screenshot gallery
  $("#gallery").unitegallery({
    gallery_theme: "tiles",
    tiles_type:"justified"
  }); 
  
  
  // Setup the flowchart animation to begin when scrolled into view
  $('#made-for-music').bind('inview', function(event, visible) {
    if(visible == true) {
      
    } else {
      $("#svg-holder").addClass("show-item");
    }
  });
  
  var isCodeVisible = false; // Tracks if "Developer Mode" is on
  
  $("#toggleBtn").change(function(){ // Bind to dev mode switch
    $("#timelineImage").css("display", (isCodeVisible ? "block" : "none")); // Hide the image?
    $("#codeBlock").css("display", (isCodeVisible ? "none" : "inline-block")); // Show the code block?
    $("#devLabel").html(isCodeVisible ? "OFF" : "ON"); // Label the switch?
    isCodeVisible = !isCodeVisible; // Toggle boolean
  })
  
  var prettyData = JSON.stringify(productData, undefined, 2); // Pretty print JSON variable
  $("#productData").html("<pre>"+syntaxHighlight(prettyData)+"</pre>"); // Place it in a <pre> tag on page
  
  // Bind to window scroll to trigger flowchart animation
  $(window).scroll(function() {
    var topDivHeight = $("#made-for-music").height();
    var viewPortSize = $(window).height();

    var triggerAt = 1200;
    var triggerHeight = (topDivHeight - viewPortSize) + triggerAt;
    console.log(triggerHeight);
    if ($(window).scrollTop() >= triggerHeight) {
        $('#svg-holder').addClass("show-item");
        $(this).off("scroll");
    }
  });
  
  $("a[href^='#']").on('click', function(e) {

   // prevent default anchor click behavior
   e.preventDefault();

   // store hash
   var hash = this.hash;

   // animate
   $('html, body').animate({
       scrollTop: $(hash).offset().top
     }, 1000, function(){

       // when done, add hash to url
       // (default click behaviour)
       window.location.hash = hash;
     });

});
  var iframe = $("#vimeoVideo");
  var player = new Vimeo.Player(iframe);
  var hideModal = function(){
    player.pause();
  }
  
  $("#pauseVid").click(function(){
    player.pause();
  })
  
  $("#videoModal").on('hidden.bs.modal', function(){
    player.pause();
  });
  $("#videoModal").on("show.bs.modal", function(){
    player.play();
  })
  
  var submitted = false;
  
  $("#submitButton").click(function(){
    var name = $("#name").val();
    var email = $("#email").val();
    var message = $("#message").val();
    
    if(!submitted){
		$.ajax({
	      type: "POST",
	      url: "backend.php",
	      data: {name: name,email: email,message: message},
	      success: function(data){
		    console.log(data);
	        if(data=="Congratulations! You've fired the form_submitted event") {
	//           $("#formResponse").html("Thanks! Someone will be in touch soon.");
				$("#submitButton").html("Submitted!");
				$("#submitButton").attr("disabled", true);
				$("#contactForm").hide();
				submitted = true;
	        } else if(data=="Invalid email"){
				$("#submitButton").html("Invalid Email. Try Again.");
		    } else {
	          alert("Sorry! There was an error sending your message. Please try again later.");
	        }
	      }
	    });
    }

  });
  
}); 

// Syntax highlight for JSON data
// Uses regex to put different data types in <span> tags w/ classes
// Found this online!
function syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}