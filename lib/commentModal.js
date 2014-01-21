/// Using https://github.com/jquery-boilerplate/jquery-patterns/blob/master/patterns/jquery.basic.plugin-boilerplate.js
// for this plugin to try a different pattern

;(function ( $, window, document, undefined ) {

    // Create the defaults once
    var pluginName = "commentsModal",
        defaults = {
            pluginName: "GA_comments_modal",
            template: "<div>hello</div>",
            hoganURL: "http://twitter.github.com/hogan.js/builds/2.0.0/hogan-2.0.0.js"
        };

    // The actual plugin constructor
    function Plugin( element, opts ) {
        this.element = element;
        this.options = $.extend( {}, defaults, opts) ;

        this._defaults = defaults;
        this._name = pluginName;

        /* Private functions*/

        this.init();
    }

    /* public functions */
    Plugin.prototype = {

        init: function() {
            // Place initialization logic here
            // You already have access to the DOM element and
            // the options via the instance, e.g. this.element
            // and this.options
            // you can add more functions like the one below and
            // call them like so: this.yourOtherFunction(this.element, this.options).
            $(this.element).addClass('woop');
        },
        sayHi: function() {
            console.log('hi', this);
        }
    };

    /* Private utility functions */
    function loopInit(collection, options){
        return collection.each(function () {
            if (!$(this).data("plugin_" + pluginName)) {
                $(this).data("plugin_" + pluginName, new Plugin(this, options));
            }
        });
    }

    $.fn[pluginName] = function ( methodOrOptions ) {
        if (Plugin.prototype[methodOrOptions] && typeof Plugin.prototype[methodOrOptions] === 'function') {
            var e = $(this).data("plugin_" + pluginName);
            if(!e){
                loopInit(this);
            }
            if (this.length > 1){
                this.each(function(){
                    e = $(this).data("plugin_" + pluginName);
                    e[methodOrOptions](Array.prototype.slice.call( arguments, 1 ));   
                });
            }
            else if(this.length == 1){
                e[methodOrOptions](Array.prototype.slice.call( arguments, 1 ));
            }
        } 


        else if (typeof methodOrOptions === 'object' || ! methodOrOptions ) {
            // Default to "init"
            return loopInit(this, methodOrOptions);
        } 
        else {
            $.error( 'Method ' +  methodOrOptions + ' does not exist on GA.commentsModal' );
        }  

        return this;
    };
})( jQuery, window, document );