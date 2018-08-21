// ==================================== //
/* ===== Create by ZRQ 17089122g ===== */
// =================================== //
$(document).ready(function(){
	//Measure Tool
    $("#btn1").click(function(){
		$("#drawingtool").hide();
		$("#category").hide();
		$("#timer").hide();
        $("#measuretool").show();
		MeasureT_info();
    });
	//Drawing Tool
	$("#btn2").click(function(){
		$("#measuretool").hide();
		$("#category").hide();
		$("#timer").hide();
		DrawingT_info();
    });
	//Category
	$("#btn3").click(function(){
		$("#measuretool").hide();
		$("#drawingtool").hide();
		$("#timer").hide();
		$("#category").show();
		$("#legend").show();
		Category_info();
    });

	$("#point").click(function(){
	document.getElementById("point").style.cursor = "crosshair";
	flagpoint=1;
    });
	
	$("#line").click(function(){
	$("#timer").show();
	CountdownTimer();
	document.getElementById("info").innerHTML = "<center><p class="+"infotext"+"><br><br><br><br><br>This function<br>will<br>come in ...</p></center>";
    });
	
	$("#area").click(function(){
	$("#timer").show();
	CountdownTimer();
	document.getElementById("info").innerHTML = "<center><p class="+"infotext"+"><br><br><br><br><br>This function<br>will<br>come in ...</p></center>";
    });
	
	$("#search").click(function(){
	$("#timer").show();
	$("#measuretool").hide();
	$("#drawingtool").hide();
	$("#category").hide();
	CountdownTimer();
	document.getElementById("info").innerHTML = "<center><p class="+"infotext"+"><br><br><br><br><br>This function<br>will<br>come in ...</p></center>";
    });
	
	$("#Go").click(function(){
	Go_info();
    });
	
});

function firstopen_info(){
	var infotext="<p class="+"infotext"+"><br><br><br><br><br>Welcome to GeoInfo Map-zrq!<br><br>Please explore the tools by clicking the buttons on the green row:<br><ul class="+"infotext"+"><li>Measure Tool</li><li>Drawing Tool</li><li>Category</li></ul></p>";
	document.getElementById("info").innerHTML = infotext;
	$("#info").fadeIn("slow");
}

function MeasureT_info(){
	var infotext="<p class="+"infotext"+"><br><br><br><br><br>Please Click:<br><br><ul class="+"infotext"+"><li>Point</li><span>&nbsp -to get the coordinates of point</span><li>Line</li><span>&nbsp -to get the distance of polyline</span><li>Area</li><span>&nbsp -to get the area of polygon</span></ul></p>";
	document.getElementById("info").innerHTML = infotext;
	$("p").fadeIn("slow");
}

function DrawingT_info(){
	var infotext="<p class="+"infotext"+"><br><br><br><br><br>The hot key is add on the left top of the map,<br>please explore the function there...</p>";
	document.getElementById("info").innerHTML = infotext;
	$("#info").fadeIn("slow");
}

function Category_info(){
	var infotext="<p class="+"infotext"+"><br><br><br><br><br>Choose (a) category and click Go,<br>the locaitons will show on the map...<br><br><ul class="+"infotext"+"><li>Schools</li><span>&nbsp -5 famous universities in HK</span><li>Shopping Malls</li><span>&nbsp -4 popular shopping malls in HK</span></ul></p>";
	document.getElementById("info").innerHTML = infotext;
	$("#info").fadeIn("slow");
}

function Go_info(){
	var infotext="<p class="+"infotext"+"><br><br><br><br><br>You can click the icon on the map to see more details...<br><br></p>";
	document.getElementById("info").innerHTML = infotext;
	$("#info").fadeIn("slow");
}

function CountdownTimer(){
	// Set the date we're counting down to
	var countDownDate = new Date("Sep 1, 2018 15:00:00").getTime();

	// Update the count down every 1 second
	var x = setInterval(function() {

		// Get todays date and time
		var now = new Date().getTime();
		
		// Find the distance between now an the count down date
		var distance = countDownDate - now;
		
		// Time calculations for days, hours, minutes and seconds
		var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);
		
		// Output the result in an element with id="demo"
		document.getElementById("timer").innerHTML = days + "d " + hours + "h "
		+ minutes + "m " + seconds + "s ";
		
		// If the count down is over, write some text 
		if (distance < 0) {
			clearInterval(x);
			document.getElementById("timer").innerHTML = "EXPIRED";
		}
	}, 1000);
}