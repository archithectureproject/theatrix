// nameCheckWorker.js

self.onmessage = function(Name) {
    var name = Name.data;
    var name_pattern = /[^a-zA-Z\u0590-\u05fe\s]/;
    var result = name_pattern.test(name);
    postMessage(result);
};