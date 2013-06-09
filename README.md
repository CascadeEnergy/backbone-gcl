# backbone-gcl

[![Build Status](https://secure.travis-ci.org/CascadeEnergy/backbone-gcl.png?branch=master)](https://travis-ci.org/CascadeEnergy/backbone-gcl)

Mixin for Backbone.View providing methods to free up list views for garbage collection.

gcl = garbage collection for lists.

Contributers:

- [Will Vaughn](https://github.com/nackjicholson)
- [Michael Schoenfelder](https://github.com/noTxt)

---
### [Contents](id:contents)
- [Usage](#usage)
- [Install](#install)
- [Why](#why)
- [Example](#example)
- [API](#api)
- [Tests](#tests)
- [Support](#support)

---
### [Usage](id:usage)

**AMD**  - MyView.js

    define([
      'jquery',
      'backbone',
      'path/to/backbone-gcl'
    ], function($, Backbone, gcl) {
      var MyView = Backbone.View.extend({
        initialize: function() {
          this.on('someEvent', this.destroy, this);
        }
      });
      _.extend(MyView.prototype, gcl);

      return MyView;
    });

You still have to manage when things should garbage collect. Do it with `someEvent`, which could be a built in backbone event.

**Browser Global** 

    <script type="text/javascript" src="path/to/backbone-gcl.js"></script>

then the mixin is available as global variable `gcl`

    _.extend(MyView.prototype, gcl);

---
[top](#contents)
### [Install](id:install)

Bower is a package manager for the web built by twitter, you should check it out, and download this package.

`$ npm install bower -g`  
`$ bower install backbone-gcl --save `

The `--save` flag will save backbone-gcl as a dependency in your project's `bower.json` file.

OR  

Download this project, take `backbone-gcl.js` or `backbone-gcl.min.js` files out and put them wherever you would like.

---
[top](#contents)
### [Why](id:why)

Because garbage collection is hard to understand, and when developing in Backbone, you will need to do it. This mixin can be added to any of your views that have a collection. Being a mixin, it favors composability, and will not interfere with any of your inheritance trees. Another approach is to create yourself a BaseViewClass with these methods, and then derive all your classes from that base class. I favor mixins because I can configure and compose views on an individual need basis, and don't have to deal with some of the pain that comes with classical inheritance.

For good information on javascript and Backbone garbage collection:

- [Zombie Views](http://lostechies.com/derickbailey/2011/09/15/zombies-run-managing-page-transitions-in-backbone-apps/): Derick Bailey
- [Preventing Memory Leaks](https://paydirtapp.com/blog/backbone-in-practice-memory-management-and-event-bindings/): Nicholas Firth-McCoy

---
[top](#contents)
### [Example](id:example)

There is a small how-to in this repository at [example/example.html](https://github.com/CascadeEnergy/backbone-gcl/blob/master/example/example.html). It allows you to click on some buttons and destroy a collection. If you look at the console you'll see the difference between the two buttons. It's not much but it might give you some idea how to use this mixin.

To run the example.

```
$ git clone git@github.com:CascadeEnergy/backbone-gcl.git
$ cd backbone-gcl/
$ bower install
$ node ./util/web-server.js
```

and then navigate to <http://localhost:8000/example/example.html>

---
[top](#contents)
### [API](id:api)

- **destroy()**: Destroys your view and sets it up for garbage collection by unbinding events on the view's collection, undelegating its own events, and removing it from the DOM.

- **destroyCollection()**: This method destroys your view, as well as destroying `this.collection` by delegating to each of it's models and calling `model.destroy()`. This built in Backbone.Model method `destroy()` will trigger a sync request to remove your model from the server. For details read the [Model-destroy documentation](http://backbonejs.org/#Model-destroy).

---
[top](#contents)
### [Tests](id:tests)

Tests are in the `test/` directory, they are written with mocha, and run via `testrunner.html`. To get the dependencies for testing, you must have npm and bower installed: `npm install -g bower`.

Single Test Run. This is how travis-ci runs the tests.

```
$ git clone git@github.com:CascadeEnergy/backbone-gcl.git  
$ cd backbone-gcl/
$ npm install
$ bower install
$ npm test
```

**OR**  

Run them in the terminal as you Develop!!!

```
$ git clone git@github.com:CascadeEnergy/backbone-gcl.git  
$ cd backbone-gcl/
$ npm install
$ bower install
```

Start a server in one terminal window.  
`$ grunt nodemon`

And then in another terminal window.

```   
$ cd backbone-gcl/ 
$ grunt watch
```

and then just start developing. Grunt will run automated tests with [mocha-phantomjs](https://github.com/metaskills/mocha-phantomjs), and JSHint whenever you save files.

Also tests in the browser at <http://localhost:8000/testrunner.html>

---
[top](#contents)
### [Support](id:support)

Make an issue.

Come talk to me on IRC freenode: `#sensei`