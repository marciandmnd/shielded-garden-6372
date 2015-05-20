var date = new Date();
var currentDate = new Date();
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var currentYear = currentDate.getFullYear();
var year = currentYear;
var currentMonth = currentDate.getMonth();
var month = currentDate.getMonth();
var monthIndex = currentDate.getMonth(); 
var formInput ="";

//day of week
var currentDay = currentDate.getDay();
//day of month
var currentDate = currentDate.getDate();
var callbacks = $.Callbacks();

date.setDate('1');
var first_day_of_month = date.getDay();
var daysInMonth = getDaysInMonth(monthIndex, currentYear);

function clearCalendar(){
	$('.calendar tbody').empty();
}

function getDaysInMonth(month,year){
   return new Date(year, month + 1, 0).getDate();
}

function fillCalendar(firstDayOfMonth, days){
	//generate cells for days
	var numRows = Math.ceil((days+firstDayOfMonth)/7);
	var day_num = 1;
	var day_cell_id = 0;
	for(var i=0; i < numRows; i++){
		$('.calendar tbody').append('<tr>');
		for(var j=0; j<7; j++){
			if(j == firstDayOfMonth && day_num == 1){
				$('.calendar tbody').append('<td valign = \"top\" id = "' + day_cell_id++ + '" data-day =' + day_num + '><strong>' + day_num++ + '</strong><ul></ul></td>');
			}
			else if(day_num <= days && day_num !=1){
				$('.calendar tbody').append('<td valign = \"top\" id = "' + day_cell_id++ + '" data-day =' + day_num + '><strong>' + day_num++ + '</strong><ul></ul></td>');
			}
			else{
				$('.calendar tbody').append('<td id = "' + day_cell_id++ + '" ></td>');
			}
		}
		$('.calendar tbody').append('</tr>');
	}

	//highlight current day
	if($('#month').html() == months[currentMonth] && $('#year').html() == currentYear){
		$('#'+ (currentDate+firstDayOfMonth-1)).css('background-color', '#FF6633');
	}

	$.getJSON( "/appointments/" + (monthIndex+1) +"/"+year+".json", function(data) {
		if(data.length >0)
			addEvents(data);
	});
}

function addEvents(data){
	//fill calendar with saved appointments
	//correct year and month?
	if(data[0].month == monthIndex && data[0].year == year){
	  for(var j = 0; j < data.length; j++){
		  	$("td[data-day ='" + data[j].day + "']").append("<li>" + data[j].time + ":<br><center> " + data[j].description +"</center></li>");
	  }
	}
}

$(document).ready(function(){
	$('.pointer').on("mouseenter", function(){
		$(this).css("background-color", "#FFA366")
	}).on("mouseleave", function(){
		$(this).css("background-color", "#FFFFFF")
	});
	//add month and year labels to view
	$('#month').append(months[monthIndex]);
	$('#year').append(currentYear);

	//get days in month and fill calendar
	fillCalendar(first_day_of_month, daysInMonth);
	//mouse cursor enters a day cell

	$( '.calendar tbody' ).delegate( "td", "mouseenter", function() {
		var this_day = $(this).attr('data-day');

		if(this_day == currentDate && $('#month').html() == months[currentMonth] && $('#year').html() == currentYear){
			$(this).css('background-color', '#FF3333');
		}else
			$(this).css('background-color', '#B0C4DE');
	});

	//mouse leaves a calendar day cell
	$( '.calendar tbody' ).delegate( "td", "mouseleave", function() {
		var this_day = $(this).attr('data-day');

		if(this_day == currentDate && $('#month').html() == months[currentMonth] && $('#year').html() == currentYear){
			$(this).css('background-color', '#FF6633');
		}else
			$(this).css('background-color', '#AFEEEE');
	});

	
	//click previous month
	$('#previous_month').on("click", function(){
		if(monthIndex == 0){
			monthIndex = 11;
			year-=1;
			$('#year').html(year);
			date.setYear(year);	
		}else monthIndex--;
		$('#month').html(months[monthIndex]);	
		date.setMonth(monthIndex);
		date.setDate(1);
		first_day_of_month = date.getDay();
		daysInMonth = getDaysInMonth(monthIndex, year);
		clearCalendar();
		fillCalendar(first_day_of_month, daysInMonth);		
	});


	//click next month
	$('#next_month').on("click", function(){
		if(monthIndex == 11){
			monthIndex = 0;
			year+=1;
			$('#year').html(year);
			date.setYear(year);	
		}else monthIndex++;
		$('#month').html(months[monthIndex]);	
		date.setMonth(monthIndex);
		date.setDate(1);
		first_day_of_month = date.getDay();
		daysInMonth = getDaysInMonth(monthIndex, currentYear);
		clearCalendar();
		fillCalendar(first_day_of_month, daysInMonth);		
	});


	//click next year
	$('#next_year').on("click", function(){
		year = year+1;
		$('#year').html(year);		
		date.setYear(year);
		date.setDate(1);
		first_day_of_month = date.getDay();
		daysInMonth = getDaysInMonth(monthIndex, year);
		clearCalendar();
		fillCalendar(first_day_of_month, daysInMonth);	
	});

	//click previous year
	$('#previous_year').on("click", function(){
		year = year-1;
		$('#year').html(year);	
		date.setYear(year);
		date.setDate(1);
		first_day_of_month = date.getDay();
		clearCalendar();
		daysInMonth = getDaysInMonth(monthIndex, year);
		fillCalendar(first_day_of_month, daysInMonth);		
	});

	//save description from text box into variable
	$("#description").keyup(function() {
    	formInput = $(this).val();
	});

	//add event to calendar cell and database
	$( '.calendar tbody' ).delegate( "td", "click", function() {
		if($(this).html()!=''){
			if(formInput != ""){
				$(this).append("<li>" + $('#time').val() + ":<br><center> " + formInput +"</center></li><br>");
				var dayNum = $(this).attr("data-day");
				//add calendar event to database
				$.ajax({
				  	type: "POST",
				  	url: "/appointments",
				  	data: JSON.stringify({ "appointment": {time: $('#time').val(), day: dayNum, month: monthIndex, year: year ,description: formInput} }),
    				contentType: "application/json",
			 		dataType: "json"
				})
				//reset event form fields
				formInput = "";
				$('#description').val("");
				$('#time').get(0).selectedIndex = 0;
			}
		}
	});
});