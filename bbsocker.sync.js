var _ = require('underscore');

module.exports = function(bb){
  bb.sync = function(method, model, options){
    var type = methodMap[method] || method.toUpperCase();
    options = options || {};
    params = {type : type};
    
    if(!options.url){
      params.url = _.result(model, 'url');
    }
    
    var data = _.extend(params, options);
    
    if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
      var modelData = options.attrs || model;
      return bb.socket.serve(data.type + " " + data.url, modelData, function(err, response){
        if(err){
          return data.error(err);
        }
        data.success && data.success(response);
      });
    }
    
    
    
    bb.socket.serve(data.type + " " + data.url,  function(err, response){
      if(err){
        return data.error(err);
      }
      data.success && data.success(response);
    });
    
    model.trigger('request', model, bb.socket, options);
  }
  var methodMap = {
    'create':'CREATE',
    'update':'UPDATE',
    'patch':'PATCH',
    'delete':'DELETE',
    'read':'READ'
  };
  bb.ajax = null;
}