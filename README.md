# InView Directive for AngularJS

A directive to evaluate an expression if a DOM element is or not in the current
visible browser viewport.

The directive is directly derived from the [jQuery.inview](https://github.com/zuk/jquery.inview)
plugin. However this implementation has no dependency on jQuery.

## Intallation

To install using [Bower](http://bower.io):

```
bower install angular-inview
```

## Setup

In your document include this scripts:

```
<script src="/bower_components/angular/angular.js"></script>
<script src="/bower_components/angular-inview/angular-inview.js"></script>
```

In your AngularJS app, you'll need to import the `angular-inview` module:

```
angular.module('myModule', ['angular-inview']);
```

## Usage

This module will define a single directive `inView` that may be used as an attribute.

```
<any in-view="{expression}" in-view-offset="{number}"></any>
```

The `in-view` attribute must contain a valid [AngularJS expression](http://docs.angularjs.org/guide/expression)
to work. When the DOM element enter or exits the viewport, the expression will
be evaluated. To actually check if the element is in view, the following data is
available in the expression:

- `$inview` is a boolean value indicating if the DOM element is in view
- `$inviewpart` is undefined or a string either `top`, `bottom` or `both`
indicating which part of the DOM element is visible.

An additional attribute `in-view-offset` can be speficied to add a virtual
offset to the element that will anticipate or delay the in view event.

A hack `in-view-delay` has been added. It allows to change the delay of in-view timer. Very useful when item skipping
occurs (most of the time - via using scrollbar). Beware of large values - the timer is BLOCKING! Beware of super low
values too. In fact - don't even think of using this hack. It's no good. A complete rewrite of timeout function is
needed.

## Testing

To run tests, [install Karma](http://karma-runner.github.io/) and run: `karma start`.
