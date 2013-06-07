// ## backbone-gcl.js
// 
// // author: Will Vaughn
//
// > description
// 
// The below Use Anywhere setup was so graciously provided to me by:
// <https://github.com/umdjs/umd/blob/master/returnExports.js>

(function (root, factory) {
    if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports, like Node.
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else {
        // Browser globals (root is window)
        root.gcl = factory();
  }
}(this, function () {
  'use strict';

  // This is backbone-gcl.
  return {
    // destroy all models in the collection and the view.
    destroyCollection: function() {
      this.destroy();
      while (this.collection.first()) {
        this.collection.first().destroy();
      }
    },

    // keep model, destroy view
    destroy: function() {
      this.collection.off();
      this.undelegateEvents();
      this.remove();
    }
  };
}));