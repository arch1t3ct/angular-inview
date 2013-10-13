// Generated by CoffeeScript 1.6.2
(function() {
    'use strict';
    var checkInView, checkInViewDebounced, checkInViewItems, getScrollTop, getViewportHeight, offsetTop, removeInViewItem;
    var inViewDelay = 100;

    angular.module('angular-inview', []).directive('inView', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var item;

                if (!attrs.inView) {
                    return;
                }
                item = {
                    element: element,
                    wasInView: false,
                    offset: 0,
                    callback: function($inview, $inviewpart) {
                        if ($inviewpart) {
                            $inviewpart = "'" + $inviewpart + "'";
                        }
                        return scope.$apply("$inview=" + $inview + ";$inviewpart=" + $inviewpart + ";" + attrs.inView);
                    }
                };
                if (attrs.inViewOffset != null) {
                    attrs.$observe('inViewOffset', function(offset) {
                        item.offset = offset;
                        return checkInViewDebounced();
                    });
                }
                if (attrs.inViewDelay != null) {
                    attrs.$observe('inViewDelay', function(delay) {
                        inViewDelay = delay;
                        return checkInViewDebounced();
                    });
                }
                checkInViewItems.push(item);
                checkInViewDebounced();
                return scope.$on('$destroy', function() {
                    return removeInViewItem(item);
                });
            }
        };
    });

    getScrollTop = function() {
        return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    };

    getViewportHeight = function() {
        var height, mode, _ref;

        height = window.innerHeight;
        if (height) {
            return height;
        }
        mode = document.compatMode;
        if (mode || !(typeof $ !== "undefined" && $ !== null ? (_ref = $.support) != null ? _ref.boxModel : void 0 : void 0)) {
            height = mode === 'CSS1Compat' ? document.documentElement.clientHeight : document.body.clientHeight;
        }
        return height;
    };

    offsetTop = function(el) {
        var curtop;

        curtop = 0;
        while (el) {
            curtop += el.offsetTop;
            el = el.offsetParent;
        }
        return curtop;
    };

    checkInViewItems = [];

    removeInViewItem = function(item) {
        return checkInViewItems = checkInViewItems.filter(function(i) {
            return i !== item;
        });
    };

    checkInView = function() {
        var elementBottom, elementHeight, elementTop, inView, inViewWithOffset, inviewpart, isBottomVisible, isTopVisible, item, viewportBottom, viewportTop, _i, _len, _results;

        viewportTop = getScrollTop();
        viewportBottom = viewportTop + getViewportHeight();
        _results = [];
        for (_i = 0, _len = checkInViewItems.length; _i < _len; _i++) {
            item = checkInViewItems[_i];
            elementTop = offsetTop(item.element[0]);
            elementHeight = item.element[0].offsetHeight;
            elementBottom = elementTop + elementHeight;
            inView = elementTop > viewportTop && elementBottom < viewportBottom;
            isBottomVisible = elementBottom + item.offset > viewportTop && elementTop < viewportTop;
            isTopVisible = elementTop - item.offset < viewportBottom && elementBottom > viewportBottom;
            inViewWithOffset = inView || isBottomVisible || isTopVisible || (elementTop < viewportTop && elementBottom > viewportBottom);
            if (inViewWithOffset) {
                inviewpart = (isTopVisible && 'top') || (isBottomVisible && 'bottom') || 'both';
                if (!(item.wasInView && item.wasInView === inviewpart)) {
                    item.wasInView = inviewpart;
                    _results.push(item.callback(true, inviewpart));
                } else {
                    _results.push(void 0);
                }
            } else if (!inView && item.wasInView) {
                item.wasInView = false;
                _results.push(item.callback(false));
            } else {
                _results.push(void 0);
            }
        }
        return _results;
    };

    checkInViewDebounced = (function() {
        var timer;

        timer = null;
        return function() {
            if (timer != null) {
                clearTimeout(timer);
            }
            return timer = setTimeout(checkInView, inViewDelay);
        };
    })();

    angular.element(window).bind('checkInView click ready scroll resize', checkInViewDebounced);

}).call(this);
