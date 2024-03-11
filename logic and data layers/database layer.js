// Data Access Tier - logic related to the data access tier

function processOrderInfo(first_name, last_name, card_number, ticket_num, hour, movie_name, phone_number, final_price)
{
	var orderStr = stringify(first_name, last_name, card_number, ticket_num, hour, movie_name, phone_number, final_price);
	sessionStorage.setItem('order', orderStr);
}

function stringify(first_name, last_name, card_number, ticket_num, hour, movie_name, phone_number, final_price) {
	var firstnameStr = first_name;
	var lastNameStr = '™' + last_name;
	var cardStr = '™' + card_number;
	var ticketStr = '™' + ticket_num;
	var hourStr = '™' + hour;
	var movieStr = '™' + movie_name;
	var phoneStr = '™' + phone_number; 
	var finalPriceStr = '™' + final_price;
	var ordStr = firstnameStr + lastNameStr + cardStr + ticketStr + hourStr + movieStr + phoneStr + finalPriceStr;
	return ordStr;	
}

function getMovieName(id)
{
	var name =sessionStorage.getItem(id) 
	return name.split('™')[5];
}

function getMovieHour(id)
{
	var hour =sessionStorage.getItem(id) 
	return hour.split('™')[4];
}

function getTicketNum(id)
{
	return sessionStorage.getItem(id).split('™')[3];
}

function getFinalPrice(id)
{
	return sessionStorage.getItem(id).split('™')[7];
}

function setMovieInfo(movieName, time)
{
	details = "[" + movieName + "," + time + "]";
	sessionStorage.setItem('movie', details);
}

function getMovieInfo(id)
{
	return sessionStorage.getItem(id);
}