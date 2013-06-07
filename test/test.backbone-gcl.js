define([
  'jquery',
  'backbone',
  'chai',
  'lib/backbone-gcl'
], function($, Backbone, chai, gcl) { 
  'use strict';

  var expect = chai.expect;

  describe('backbone-gcl', function() {
    var HeroModel
      , HeroesCollection 
      , HeroesList
      , view;

    // Model class
    HeroModel = Backbone.Model.extend({});

    // Collection
    HeroesCollection = Backbone.Collection.extend({
      model: HeroModel
    });

    // View class extending gcl
    HeroesList = Backbone.View.extend({
      className: 'heroes-list',

      chopcalled: false,

      events: {
        "karate-chop": "chop"
      },

      chop: function() {
        this.chopcalled = true;
      }
    });
    _.extend(HeroesList.prototype, gcl);

    beforeEach(function() {
      var heroes = new HeroesCollection([
        {name: 'Mr. Miyagi'},
        {name: 'Daniel San'},
        {name: 'Will Vaughn'}
      ]);
      view = new HeroesList({collection: heroes});
    });

    afterEach(function() {
      view.off();
      view = undefined;
    });

    describe('.destroy', function() {
      it('calls `this.collection.off`', function(done) {
        view.collection.off = function() {
          done();
        };

        view.destroy();
      });

      it('calls `this.undelegateEvents`', function(done) {
        view.undelegateEvents = function() {
          done();
        };

        view.destroy();
      });

      it('calls `this.remove`', function(done) {
        view.remove = function() {
          done();
        };

        view.destroy();
      });

      it('`this.collection` does not accept events', function() {
        var collectionChop = false;

        view.collection.on('karate-chop', function() {
          collectionChop = true;
        });

        view.collection.trigger('karate-chop');
        expect(collectionChop).to.be.true;

        collectionChop = false;

        // Call destroy.
        view.destroy();

        // check again.
        expect(collectionChop).to.be.false;
        view.collection.trigger('karate-chop');
        expect(collectionChop).to.be.false;
      });

      it('does not accept events', function() {
        expect(view.chopcalled).to.be.false;
        view.$el.trigger('karate-chop');
        expect(view.chopcalled).to.be.true;

        view.chopcalled = false;

        expect(view.chopcalled).to.be.false;

        // Call Destroy.
        view.destroy();

        // check again.
        view.$el.trigger('karate-chop');
        expect(view.chopcalled).to.be.false;
      });

      it('removes view from the DOM', function() {
        var $fixture = $('<div></div>');

        $fixture.html(view.el);

        expect($fixture.find('.heroes-list')).to.have.length(1);

        view.destroy();

        expect($fixture.find('.heroes-list')).to.have.length(0);
      });
    });

    describe('.destroyCollection', function() {
      it('calls `this.destroy()`', function(done) {
        view.destroy = function() {
          done();
        };

        view.destroyCollection();
      });

      it('destroys the models', function() {
        var modelsDestroyed = 0
          , length = view.collection.length;

        // Before destroying, set up listener on each model.
        view.collection.each(function(model) {
          model.on('destroy', function() {
            modelsDestroyed++;
          });
        });

        // Now destroy.
        view.destroyCollection();

        expect(modelsDestroyed).to.equal(length);
      });
    });
  });
});