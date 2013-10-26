var bb = require('backbone');
var bbsocker = require('../bbsocker.sync.js');

describe('set up sockerMock', function(){
  var socketMock;
  before(function(){
    socketMock = {
      serve: sinon.spy()
    }
    bb.socket = socketMock;
    bbsocker(bb);
  })
  
  it('ajax should become null', function(){
    expect(bb.ajax).to.be.null;
  })
  
})
    //be able to setup standalone to be able to build standalone compoennts and generate components.json along with standalone versions of librabry