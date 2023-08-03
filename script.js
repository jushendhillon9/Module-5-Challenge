// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.



//once the document is opened, this will function will run continuously
$(function () {
  var currentDate = dayjs().format("dddd, MMMM D");
  $("#currentDay").text(currentDate);
  var currentTime = "hour-" + dayjs().format("hA");
  var blockItemsArray = [];
  //returns an array of indexes of the matched elements that are put in the variable
  var timeContainer = $(".container-lg").children("div");
  

  $(".btn").on("click", function(event) {
    var parentElement;
    event.preventDefault();
    var clicked = event.target;
    if (clicked.tagName == "I"){
      parentElement = $(clicked).parent().parent();
    }
    else {
      parentElement = $(clicked).parent();
    }
    var blockID = parentElement.attr("id");
    var userInput = parentElement.children().eq(1).val();
    //setting the localStorage key as the block's hourID and saving the text content
    //under that key the text content is saved
    localStorage.setItem(blockID, userInput);
  });
  
  
  for (var i = 0; i < timeContainer.length; i++) { 
    var presentClass;
    var copyArray1 = timeContainer.slice();
    var copyArray2 = timeContainer.slice();
    var pastItems;
    var futureItems;
  
    //the following 3 lines of code are use local storage item to ensure text content persists
    var thisBlockID = $(timeContainer[i]).attr("id");
    var textContent = localStorage.getItem(thisBlockID);
    $(timeContainer[i]).children().eq(1).text(textContent);
    //.eq() is used to traverse the returned array by narrowing down the set of matched element to 1
    var classList = timeContainer.eq(i).attr("class").split(" ");
    if (classList[2] == "present") {
      presentClass = timeContainer.eq(i);
      //this gets the block item element with the present class
      if (presentClass.attr("id") != currentTime) {
        //then find the class whose id matches the present time and make it the present class
        for (var j = 0; j < timeContainer.length; j++) {
          if ($(timeContainer[j]).attr("id") == currentTime) {  //the presentBlock is timeContainer[j]
            //must wrap timeContainer[j] in $ to access jQuery method .attr()
            $(timeContainer[j]).removeClass("past");
            //must wrap timeContainer[j] in $ to access jQuery methods .removeClass() and .addClass()
            $(timeContainer[j]).removeClass("future");
            $(timeContainer[j]).addClass("present");
            //gives the presentBlock the present class
            pastItems = copyArray1.splice(0,j);
            futureItems = copyArray2.splice(j+1);
            //blocks behind presentBlock are put into pastItems array
            //blocks in front of presentBlock are put into futureItems array
            for (var k = 0; k < timeContainer.length-1; k++) {
              //remove status class from pastItems and add present class
              $(pastItems[k]).removeClass("past");
              $(pastItems[k]).removeClass("present");
              $(pastItems[k]).removeClass("future");
              $(pastItems[k]).addClass("past");
              //remove status class from futureItems and add past class
              $(futureItems[k]).removeClass("past");
              $(futureItems[k]).removeClass("present");
              $(futureItems[k]).removeClass("future");
              $(futureItems[k]).addClass("future");
            }
          }
        }
      }
    }
  }
});
