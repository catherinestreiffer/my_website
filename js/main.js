//initialize all functions called when the script loads
function initialize(){
    cities();
    addEvents();
    clickme();
    jQueryAjax();
};


//function to create a table with cities and their populations
function cities(){
    //define two arrays for cities and population
    var cityPop = [
        {
            city: 'Memphis',
            population: 653450
        },
        {
            city: 'New Orleans',
            population: 378715
        },
        {
            city: 'St Louis',
            population: 318416
        },
        {
            city: 'Chicago',
            population: 2719000
        }
    ];

    //append the table element to the div
    $("#mydiv").append("<table>");

    //append a header row to the table
    $("table").append("<tr>");

    //add the "City" and "Population" columns to the header row
    $("tr").append("<th>City</th><th>Population</th>");

    //loop to add a new row for each city
    for (var i = 0; i < cityPop.length; i++){
        //assign longer html strings to a variable
        var rowHtml = "<tr><td>" + cityPop[i].city + "</td><td>" + cityPop[i].population + "</td></tr>";
        //add the row's html string to the table
        $("table").append(rowHtml);
    };
//}; commenting out the end of the cities function so I can add the addColumns function to it


//beginning of debug part
//function to add columns to the table that categorize the population by small, medium, and large
//Instead of having a function called addColumns I added it to the cities function,
//since it needed the local variable cityPop
//function addColumns(cityPop){
    //iterate over each row element
  $('tr').each(function(i){

    	if (i == 0){
              //add the city size column to the header row
              $(this).append('<th>City Size</th>');
    	   } else {
              //if it's not the header row, calculate the citySize based on the cityPop.population
              //this i is one off from the cityPop i because the header was added
              //differently, so do cityPop[i-1]
              var citySize;
                  if (cityPop[i-1].population < 100000){
    			             citySize = 'Small';
                  } else if (cityPop[i-1].population < 500000){
    			             citySize = 'Medium';
    		          } else {
    			             citySize = 'Large';
              	  };
      //put the calculated citySize in the table
    	$(this).append('<td>' + citySize + '</td>');
    };
});
};
//function to change the text color each time you mouseover the table
function addEvents(){
	$('table').mouseover(function(){
      //this is a pretty funny way to choose a color. You want to end up with a rgb color,
      //which has three parts to it, each integers up to 255. this randomly chooses them,
      //putting the commas and end parentheses in as it goes through the loop.
      var color = "rgb(";
      for (var i=0; i<3; i++){
          var random = Math.round(Math.random() * 255);
          color += random;
          if (i<2){
				        color += ",";
			    } else {
				        color += ")";
		  };

  //change the text color to whatever the var color is set to be
	$(this).css('color', color);
    };
  });
};

//when you click on the table a popup says Hey, you clicked me
function clickme(){
		alert('Hey, you clicked me!');
    $('table').on('click', clickme);
};

//define AJAX function
function jQueryAjax(){
    //define a variable to hold the data
    var mydata;
    //basic jQuery ajax method
    $.ajax("data/MegaCities.geojson", {
          dataType: "json",
          success: function(response){
              mydata = response;
              //check the data - data can be accessed, because this statement is
              //executed within the callback, so only after the data has been received
              //and assigned to mydata
              console.log(mydata);
              //appends stringified geoJSON data to the webpage along with a header
              $(mydiv).append('<br>GeoJSON data:<br>' + JSON.stringify(mydata));
          }
      });
      //check the data - data cannot be accessed, because this line is executed
      //by the interpreter before the data arrives and is assigned to the variable
      console.log(mydata);
  };

//call the initialize function when the document has loaded
$(document).ready(initialize);
