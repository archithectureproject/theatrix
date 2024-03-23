// nameCheckWorker.js

self.onmessage = function(e) {
    var name = e.data;
    var name_pattern = /[^a-zA-Z\u0590-\u05fe\s]/;
    var result = name_pattern.test(name);
    postMessage(result);
};