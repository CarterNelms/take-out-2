'use strict';
$(function() {
  var socket;
  initializeSocketIo();
  function initializeSocketIo() {
    socket = io.connect('/app');
  }
});
var main = {
  ajax: function(url, type) {
    var data = arguments[2] !== (void 0) ? arguments[2] : {};
    var success = arguments[3] !== (void 0) ? arguments[3] : (function(r) {
      return console.log(r);
    });
    var dataType = arguments[4] !== (void 0) ? arguments[4] : 'html';
    $.ajax({
      url: url,
      type: type,
      dataType: dataType,
      data: data,
      success: success
    });
  },
  clamp: function(num, min, max) {
    num = (num < min) ? min : num;
    num = (num > max) ? max : num;
    return num;
  }
};

//# sourceMappingURL=main.map
