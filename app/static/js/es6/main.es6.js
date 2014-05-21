/* jshint unused: false */
/* global io */

'use strict';

$(function()
{
  var socket;

  initializeSocketIo();

  function initializeSocketIo(){
    socket = io.connect('/app');
  }

});

var main = {
  ajax: function(url, type, data={}, success=r=>console.log(r), dataType='html')
  {
    $.ajax(
    {
      url: url,
      type: type,
      dataType: dataType,
      data: data,
      success: success
    });
  },
  clamp: function(num, min, max)
  {
    num = (num < min) ? min : num;
    num = (num > max) ? max : num;
    return num;
  }
};