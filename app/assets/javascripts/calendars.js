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

date.setDate('1');
var first_day_of_month = date.getDay();

function clearCalendar(){
	$('td').css('background-color', '#AFEEEE')
	for(var i=0; i < 42; i++){
		$('#day_cell_' + i).html('');
	}
}

function getDaysInMonth(month,year) 
{
   //return new Date(year, month, 0).getDate();
   return new Date(year, month + 1, 0).getDate();
}

function fillCalendar(firstDay, days){
	var day_num = 1;
	for(var i = 0; i < days; i++){
		$('#day_cell_' + firstDay).append(day_num++);
		firstDay++;
	}	
	if($('#month').html() == months[currentMonth] && $('#year').html() == currentYear){
		$('#day_cell_'+ (currentDate+1)).css('background-color','#FF6633')
	}else $('.calendar td').css('background-color','#AFEEEE');
}

$(document).ready(function(){

	$('#month').append(months[monthIndex]);
	$('#year').append(currentYear);
	var daysInMonth = getDaysInMonth(monthIndex, currentYear);
	fillCalendar(first_day_of_month, daysInMonth);

	$('.calendar td').mouseenter(function(){
		var this_id = $(this).attr('id');
		//window.alert(this_id);
		if(this_id == 'day_cell_' + (currentDate+1) && $('#month').html() == months[currentMonth] && $('#year').html() == currentYear){
			$(this).css('background-color', '#FF3333');
			//window.alert('hovering over current date');
		}else
			$(this).css('background-color', '#B0C4DE');
	});

	$('.calendar td').mouseleave(function(){
		var this_id = $(this).attr('id');
		//window.alert(this_id);
		if(this_id == 'day_cell_' + (currentDate+1) && $('#month').html() == months[currentMonth] && $('#year').html() == currentYear){
			$(this).css('background-color', '#FF6633');
			//window.alert('hovering over current date');
		}else
		$(this).css('background-color', '#AFEEEE');
	});

	$('#previous_year').on("click", function(){
		year = year-1;
		$('#year').html(year);	
		date.setYear(year);
		date.setDate(1);
		first_day_of_month = date.getDay();
		clearCalendar();
		daysInMonth = getDaysInMonth(monthIndex, year);
		//window.alert("test");
		fillCalendar(first_day_of_month, daysInMonth);		
	});
	$('#previous_month').on("click", function(){
		if(monthIndex == 0){
			monthIndex = 11;
		}else monthIndex--;
		$('#month').html(months[monthIndex]);
		date.setMonth(monthIndex);
		date.setDate(1);
		first_day_of_month = date.getDay();
		clearCalendar();
		daysInMonth = getDaysInMonth(monthIndex, year);
		//window.alert("test");
		fillCalendar(first_day_of_month, daysInMonth);			
	});

	//click next year
	$('#next_year').on("click", function(){
		year = year+1;
		$('#year').html(year);		
		date.setYear(year);
		date.setDate(1);
		first_day_of_month = date.getDay();
		clearCalendar();
		daysInMonth = getDaysInMonth(monthIndex, year);
		//window.alert("test");
		fillCalendar(first_day_of_month, daysInMonth);	
	});


	//click next month
	$('#next_month').on("click", function(){
		if(monthIndex == 11){
			monthIndex = 0;
		}else monthIndex++;
		$('#month').html(months[monthIndex]);	
		
		date.setMonth(monthIndex);
		date.setDate(1);
		first_day_of_month = date.getDay();
		clearCalendar();
		daysInMonth = getDaysInMonth(monthIndex, currentYear);
		fillCalendar(first_day_of_month, daysInMonth);	
	});


	$("#description").keyup(function() {
    	formInput = $(this).val();
	});

	$('.calendar td').click(function(){
		if($(this).html()!=''){
			if(formInput != ""){
				$(this).append('<br><center>' + $('#time').val() +': ' + formInput + '</center>');
				formInput = "";
				$('#description').val("");
				$('#time').get(0).selectedIndex = 0;
			}
		}
	});

});