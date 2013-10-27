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
  describe('set up backbone model',function(){
    var model, Model;
    before(function(){
      Model = bb.Model.extend({
        urlRoot:"/api/modelUrl"
      });
      model = new Model();
    })

    describe('save/create it', function(){
      var spy;
      before(function(){
        model.save();
        spy = socketMock.serve.lastCall;
      });
      it('socket should be called with CREATE /api/modelUrl', function(){
        expect(spy.calledWith('CREATE /api/modelUrl')).to.be.ok;
      })
    })
    describe('fetch it', function(){
      var spy;
      before(function(){
        model.id = 1;
        model.fetch();
        spy = socketMock.serve.lastCall;
      });
      it('socket should be called with READ /api/modelUrl', function(){
        expect(spy.calledWith('READ /api/modelUrl/1')).to.be.ok;
      })
    })
 
    describe('save/update it', function(){
      var spy;
      before(function(){
        model.id = 1;
        model.save();
        spy = socketMock.serve.lastCall;
      });
      it('socket should be called with UPDATE /api/modelUrl', function(){
        expect(spy.calledWith('UPDATE /api/modelUrl/1')).to.be.ok;
      })
    })
    describe('save/update it', function(){
      var spy;
      before(function(){
        model.destroy();
        spy = socketMock.serve.lastCall;
      });
      it('socket should be called with DELETE /api/modelUrl', function(){
        expect(spy.calledWith('DELETE /api/modelUrl/1')).to.be.ok;
      })
    })
    describe('collection should read em all', function(){
      var spy, Collection, collection;
      before(function(){
        Collection = bb.Collection.extend({
            model: Model,
            url: "/api/collection"
        });
        collection = new Collection();
        collection.fetch();
        spy = socketMock.serve.lastCall;
      });
      it('socket should be called with READ /api/collection', function(){
        expect(spy.calledWith('READ /api/collection')).to.be.ok;
      })
    })
  })
})