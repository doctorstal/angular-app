[![Build Status](https://secure.travis-ci.org/angular-app/angular-app.png)](http://travis-ci.org/angular-app/angular-app)

# [AngularJS](http://www.angularjs.org/) CRUD application demo upgrade to Angular4+, using [official upgrade guide](https://angular.io/guide/upgrade)

***

## Purpose

As stated in [angular.io site](https://angular.io/guide/upgrade):
> Angular is the name for the Angular of today and tomorrow. AngularJS is the name for all v1.x versions of Angular.

Today and tomorrow is great, we live in today and will live in tomorrow, but AngularJS is a past. C'mon, new is always better!
Upgrade proces can be frustrating, but it is possible if you know how to do it and where to start from. I've done it before, but I can't show the code due to it's a licensed product, so I'll migrate this great academical project instead.
I'll try to give this project hour or two per day to fully upgrade it's client side to Angular. Let's see, how long it will take. **Main goal is to keep app fully functional on all stages of development.**

## Steps

1. Module loader
    - [guide](https://angular.io/guide/upgrade#using-a-module-loader) will be polite and let you choose from SystemJS, Webpack or Browserify, but hey, Angular and angular-cli is fully on [Webpack](http://webpack.github.io/), so other options is just for an illusion of choise.
2. [TypeScript](https://angular.io/guide/upgrade#migrating-to-typescript) (**We are here.** And also we are still at step 1, as we'll move every build step to webpack piece by piece)
    - rename *.js to *.ts;
    - add imports;
    - TS classes should replace every function that possible to replace with function. It realy siplifies further steps;
3. [Component directives](https://angular.io/guide/upgrade#using-component-directives)
    - thit step could be skipped until needed. Only directives could be upgraded, but you can do each only when you want to.
4. [Bootstraping hybrid application](https://angular.io/guide/upgrade#bootstrapping-hybrid-applications)
    - here you'll need to learn some tricks to make everything work together
5. Upgrade and temprorary downgrade everything
    - this is best part. You pulling it up and down, trying not to brak things and not to set everything on fire, when AoT is enabled. It's fun. Just trust me.
6. Upgrade your dependencies
    - worst part of upgrade process is that on some stage you are required to use ng2 versions of everything.
7. Remove hybrid app bootstrap.
8. Celebrate!

## Current step(s)

Now I am migrating build to _webpack_. But not rapidly. It allows me to always keep a project alive.
As all good rules, this one also has an exception. I've rapidly updated _Karma_ to newer version (old was failing on my non-english windows os due to known issue).
But back to _webpack_ migration. _Webpack_ will not pack `.js` files - only `.ts`. Thus I can easily split _grunt_ and _webpack_ responsibilities.
Check out how all modules is getting imported into `app.ts` (our entry point). Each angularjs module has a name and we need that name in dependency list. So why don't we import a module and use its `name` property in dependency list instead of _string_? It also makes things more DRY, as you do not need to copy-paste that module names.