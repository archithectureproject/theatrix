// nameCheckWorker.js
/**
 * This is a web worker and when its called, it checks wether the first and last names are ilegal according to our pattern
 */
self.onmessage = function(dic) {
    var firstName = dic.data.firstName;
    var lastName = dic.data.lastName;
    var name_pattern = /[^a-zA-Z\u0590-\u05fe\s]/; //creates a ilegal pattern
    var resultFirstName = name_pattern.test(firstName) || firstName == ''; //checks if the first name is not valid or empty
    var resultLastName = name_pattern.test(lastName) || lastName == ''; //checks if the last name is not valid or empty
    postMessage(resultFirstName || resultLastName); // returns true if one or more of the names is not valid
};