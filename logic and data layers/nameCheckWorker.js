// nameCheckWorker.js

self.onmessage = function(e) {
    var firstName = e.data.firstName;
    var lastName = e.data.lastName;
    var name_pattern = /[^a-zA-Z\u0590-\u05fe\s]/;
    var resultFirstName = name_pattern.test(firstName) || firstName == '';
    var resultLastName = name_pattern.test(lastName) || lastName == '';
    postMessage(resultFirstName || resultLastName);
};