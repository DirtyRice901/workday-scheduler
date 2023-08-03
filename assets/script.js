// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

const localeData ={}; // localeData=to localeSettings
dayjs.locale(localeData); // use  locale globally -day.js.org

// Specifies the function to run after the document is fully loaded 
$(function () {    
    const currentHour = dayjs().hour(); // retrieve current hour per day.js.org

//Add function to apply changes to respectful hue based on the past, present, or future class to each time// block by comparing the id to the current hour//
    function hourHue () {
        $('.time-block').each(function() {
            const blockHour =parseInt(this.id);
//toggleClass() = Toggles between adding/removing one or more classes from selected elements -https://www.w3schools.com/jquery/jquery_ref_html.asp//            
            $(this).toggleClass('past', blockHour < currentHour);
            $(this).toggleClass('present', blockHour === currentHour);
            $(this).toggleClass('future', blockHour > currentHour);
        });
    }

//Add a listener for click events on the save button for user's input in texarea to local storage//use the id in the containing time-block as a key to save the user input
    function textInput() {
        $('.saveBtn').on('click', function() {
            const key = $(this).parent().attr('id');
            const value = $(this).siblings('.description').val();
            localStorage.setItem(key, value);
        });
    }
// Function refreshHue will set the time block to past, present and futured, compared to the currentHour//
    function refreshHue() {
        $('time-block').each(function() {
            const blockHour = parseInt(this.id);
            if (blockHour == currentHour) {
                $(this).removeClass('past future').addClass('present');
            } else if (blockHour < currentHour) {
                $(this).removeClass('future present').addClass('past');
            } else {
                $(this).removeClass('past present').addClass('future');
            }  
        });
    }
//Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements//
    $('.time-block').each(function() {
        const key = $(this).attr('id');
        const value = localStorage.getItem(key);
        $(this).children('.description').val(value);
    });

//Add code to display the current date in the header of the page
    function updateClock() {
        const dateElement = $('#date');
        const timeElement = $('#time');
        const currentDate = dayjs().format('dddd, MMMM D, YYYY');
        const currentTime =dayjs().format('hh:mm:ss A');
        dateElement.text(currentDate);
        timeElement.text(currentTime);
    }
// These are the three main functions of this project that are called//
    hourHue();
    textInput();
    refreshHue();

//Activate setInterval()method to repeatedly call a function to update the time
    setInterval(updateClock, 1000);
});













  // TODO: . This code should
  //  in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO:  HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: . HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: .
