//logic tier for ticket orders

var current_ticket_price = 35; //global variable, represents the price of a single ticket currently

/**
 * Verifies the input values and displays an error message if any of the input fields are invalid.
 * If all input fields are valid, it calls the processInfo function with the provided input values.
 */
function verifyInput()
{
    var first_name = document.getElementById('fname').value;
    var last_name = document.getElementById('lname').value;
    var card_number = document.getElementById('creditCard').value;
    var phone_number = document.getElementById('phone').value;
    var ticket_num = document.getElementById('numTickets').value;
    var movie_name = document.getElementById('movie-name').innerText;
    var hour = document.getElementById('time').innerText;
    var final_price = document.getElementById('cost').innerText;
    var error_message = "";

    if(nameCheck(first_name) || nameCheck(last_name))
    {
        error_message += "\nשם פרטי או שם משפחה לא תקינים ";
    }
    if(!cardChecker(card_number))
    {
        error_message += "\nפרטי אשראי לא תקינים";
    }
    if(!CheckPhoneNumber(phone_number))
    {
        error_message += "\nמספר טלפון לא תקין";
    }
    if(grecaptcha.getResponse() == "")
    {
        error_message += "\nהשלם-אני לא רובוט ";
    }
    if(error_message != '')
    {
        clientDetailsUnsuccessful(error_message)
    }
    else
    {
        processOrderInfo(first_name, last_name, card_number, ticket_num, hour, movie_name, phone_number, final_price);
        movePage('orderdonepage.html');
    }
    
}

/**
 * Checks the given name by for special characters, numbers, space included for those with space in their name
 */
function nameCheck(name)
{
    var name_pattern = /[^a-zA-Z\u0590-\u05fe\s]/;
    return name_pattern.test(name);
}

/**
 * Checks the validity of a credit card number.
 */
function cardChecker(card_num) 
{
    // Checks for the content and length of card_num 
    if (/[^0-9-\s]+/.test(card_num) || card_num.length != 16)
    { 
        return false; // usage of invalid characters or invalid length
    }
  
    //n_check is the sum that needs to be checked by the algorithm
    var num_check = 0;
    var is_even = false;
  
    for (var i = card_num.length - 1; i >= 0; i--) 
    {
        var char_digit = card_num.charAt(i);
        var int_digit = parseInt(char_digit, 10);
  
        if (is_even && (int_digit *= 2) > 9)
        {
            int_digit -= 9;
        }
        
        num_check += int_digit;
        is_even = !is_even;
    }
  
    return (num_check % 10) == 0;
}
/**
 * Checks the validity of a a phone number
 */
function CheckPhoneNumber(phone_number)
{
    var israeli_phone_pattern = /^0(50|52|53|54|58)\d{7}$/; //creates a pattern to check (05XYYYYYYY)
    if (israeli_phone_pattern.test(phone_number)) // crosses pattern against the number that was sent 
    {
        return true;
    }
    return false;
}

/**
 * Calculates the total cost of tickets based on the number of tickets selected.
 */
function ticketSum()
{
    var ticket_sum = current_ticket_price * document.getElementById('numTickets').value;
    document.getElementById('cost').innerText ='מחיר סופי:' + ticket_sum + '₪';
    return ticket_sum;
}

/**
 * Sets the movie name and time based on the values stored in the session storage.
 */
function setTimeAndMovie()
{
    document.getElementById('movie-name').innerText = getMovieName('movie');
    document.getElementById('time').innerText = getMovieHour('movie');
}

/**
 * Navigates to the order page and stores the selected movie and hour in session storage.
 */
function order(movie, hour)
{
    setMovieInfo(movie, hour);
    movePage('orderpage.html');
}

/**
 * Prints the successful order details and removes the order from the session storage
 */
function loadOrderData()
{
    var name = getMovieName('order');
    document.getElementById('movieName').innerText = name;
    document.getElementById('time').innerText = getMovieHour('order');
    document.getElementById('numTickets').innerText = getTicketNum('order');
    document.getElementById('final_price').innerText = getFinalPrice('order');
}

/**
 * Checks if inputed discount code is valid (at the moment only IDF4U code is valid)
 */
function checkDiscount()
{
    var dis_code = document.getElementById('discount-code').value;
    
    if(dis_code == "IDF4U")
    {
        current_ticket_price = 28;
        DiscountSuccessful();
    }

    else
    {
        current_ticket_price = 35;
        DiscountUnsuccessful();
    }
}

/**
 * Dicount code is valid - prints the successful outcome and changes the cost to the discounted one
 */
function DiscountSuccessful(){
    ticketSum();
    document.getElementById('discount-code').value = '';
    document.getElementById('discount-code-applied-msg').innerText = "קוד הוזן בהצלחה";
    document.getElementById('discount-code-applied-msg').style.color = 'green';
    document.getElementById('discount-code-applied-msg').style.fontWeight = bold;
}

/**
 * Dicount code is invalid - prints the not - successful outcome, no discount
 */
function DiscountUnsuccessful(){
    ticketSum();
    document.getElementById('discount-code').value = '';
    document.getElementById('discount-code-applied-msg').innerText = "קוד שגוי";
    document.getElementById('discount-code-applied-msg').style.color = 'red';
    document.getElementById('discount-code-applied-msg').style.fontWeight = bold;
}

function movePage(address)
{
    window.location = address;
}

/**
 * Client details is invalid - prints the not - successful outcome
 */
function clientDetailsUnsuccessful(error_message) {
    document.getElementById('error-client-details').value = '';
    document.getElementById('error-client-details-msg').innerText = error_message;
    document.getElementById('error-client-details-msg').style.color = 'red';
    document.getElementById('error-client-details-msg').style.fontWeight = bold;
}

function resetFields() {
    document.getElementById('fname').value = '';
    document.getElementById('lname').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('creditCard').value = '';
    document.getElementById('error-client-details-msg').innerText = '';
}

function Clock() 
{
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://bringthemhomenow.net/1.0.8/hostages-ticker.js";
    script.setAttribute(
      "integrity",
      "sha384-jQVW0E+wZK5Rv1fyN+b89m7cYY8txH4s3uShzHf1T51hdBTPo7yKL6Yizgr+Gp8C"
    );
    script.setAttribute("crossorigin", "anonymous");
    document.getElementsByTagName("head")[0].appendChild(script);
}