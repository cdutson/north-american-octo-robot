/// Using https://github.com/jquery-boilerplate/jquery-patterns/blob/master/patterns/jquery.basic.plugin-boilerplate.js
// for this plugin to try a different pattern

;(function ( $, window, document, undefined ) {

    // Create the defaults once
    var pluginName = "commentModal",
        defaults = {
            loadMethod: 'GET',
            submitMethod: 'POST',
            template: 
                ['<aside class="'+pluginName+' hidden">',
                '<header>',
                '<h1>{{title}}</h1>',
                '<button class="{{closeButtonClass}}">{{closeButtonText}}</button>',
                '</header>',
                '<div class="{{commentSectionClass}}">',
                '</div>',
                '<div class="{{commentAreaClass}}">',
                '<textarea class="{{commentBoxClass}}">',
                '</textarea>',
                '</div>',
                '<footer>',
                '<button class="{{cancelButtonClass}}">{{cancelText}}</button>',
                '<button class="{{submitButtonClass}}">{{submitText}}</button>',
                '</footer>',
                '</aside>'].join(''),
            commentTemplate: 
                ['<ul class="{{commentListClass}}">',
                '{{#comments}}',
                '<li class="{{../commentItemClass}}"><p>{{comment}}</p></li>',
                '{{/comments}}',
                '</ul>'].join(''),
            templateVars: {title:'Comment', closeButtonText:'x', cancelText:'Cancel', submitText:'Submit'},
            templateClasses: {closeButtonClass: pluginName+'-close', commentSectionClass:pluginName+'-comments',
                                commentAreaClass:pluginName+'-comment-area', commentBoxClass:pluginName+'-comment-box',
                                cancelButtonClass:pluginName+'-cancel', submitButtonClass:pluginName+'-submit',
                                commentListClass:pluginName+'-comments-list'},
            hoganURL: "http://twitter.github.com/hogan.js/builds/2.0.0/hogan-2.0.0.js",
            onSubmit: null,
            onLoad: null
        },
        dataAttrs = {submitMethod:'data-submit-method', loadMethod:'data-load-method', 
                    submitUrl:'data-submit-url', loadUrl:'data-load-url'},
        announcedEvents = {preInit:pluginName+'.preInit', postInit:pluginName+'.postInit',
                            preDestroy:pluginName+'.preDestroy', postDestroy:pluginName+'.postDestroy',
                            preOpen:pluginName+'.preOpen', postOpen:pluginName+'.postOpen',
                            preClose:pluginName+'.preClose', postClose:pluginName+'.postClose',
                            preLoad:pluginName+'.preLoad', postLoad:pluginName+'.postLoad',
                            preSubmit:pluginName+'.preSubmit', postSubmit:pluginName+'.postSubmit',
                            error:pluginName+'.error'};

    // The actual plugin constructor
    function Plugin( element, opts, args ) {
        var me = this;
        this.element = element;
        this.options = $.extend( {}, defaults, opts) ;
        this._defaults = defaults;
        this._name = pluginName;

        this.$modal = null;
        
        this.f = {
            HELPERS: {
                loadHogan: function loadHogan(element){
                    $.ajaxSetup({cache: true});
                    $.getScript(defaults.hoganURL).done(function(){
                        $.ajaxSetup({cache: false});
                        $(document).trigger(pluginName+'.hoganLoaded');
                    })
                },
                createLoadObject: function createLoadObject(){
                    var returnVal = {};
                    returnVal.method = this.options.loadMethod;
                    returnVal.url = "";
                    returnVal.data = "";

                    if(this.element.is("["+dataAttrs.loadMethod+"]")
                        returnVal.method = this.element.attr(dataAttrs.loadMethod);
                    
                    if(this.element.is("["+dataAttrs.loadUrl+"]") {
                        returnVal.url = this.element.attr(dataAttrs.loadUrl);
                    }
                    else if(this.element.is("[href]")) {
                        returnVal.url = this.element.attr('href').split('?')[0];
                    }

                    // TODO: PARSE OUT DATA FROM URL

                    return returnVal;
                }
            },
            DOM: {
                addCommentModal: function addCommentModal(){
                    console.log(me);
                    var template = Hogan.compile(me.options.template);
                    var markup = template.render($.extend({}, me.options.templateVars, me.options.templateClasses));
                    me.$modal = $(markup).appendTo('body');
                },
                addComments: function addComments(commentJson) {
                    var template = Hogan.compile(me.options.commentTemplate);
                    var markup = template.render($.extend({}, me.options.templateClasses, commentJson));
                    me.$modal.find('.'+me.options.templateClasses.commentSectionClass).append(markup);
                }
            }
        };

        // bind events
        $(document).on(pluginName+'.hoganLoaded', function(){ 
            me.init(args);
        });
        /* Private functions*/
        if(typeof Hogan === 'undefined'){
            me.f.HELPERS.loadHogan()
        }
        else {
            this.init(args);
        }
    }

    /* public functions */
    Plugin.prototype = {

        init: function init(args) {
            // Place initialization logic here
            // You already have access to the DOM element and
            // the options via the instance, e.g. this.element
            // and this.options
            // you can add more functions like the one below and
            // call them like so: this.yourOtherFunction(this.element, this.options).
            if (args && args[0] instanceof jQuery){
                this.$modal = args[0];
            }
            else{
                this.f.DOM.addCommentModal();
            }
        },
        destroy: function destroy() {},
        open: function open(options, jsonObj) {
            if(!options && !jsonObj) {}

        },
        load: function load(args) {
            var data = {}, t = this;
            if (!args.json) {
                // fetch json
                // if data contains url, method, data
                // on success::
                $.ajax({
                    url: args.url,
                    method: args.method,
                    data: args.data
                }).done(function(data, textStatus, jqXHR){
                    t.load({json:data});
                });
            }
            else {
                data = args.json;
                if (this.options.onLoad !== null && $.isFunction(this.options.onLoad)) 
                    data = this.options.onLoad.call(this, data);
                this.f.DOM.addComments();
            }
            
            
            // render template for comments
            // inject html
        },
        submit: function submit(args) {
            var data = {};
            data.comment = ""; // textarea.val()
            if (this.options.onSubmit !== null && $.isFunction(this.options.onSubmit)) 
                data = this.options.onSubmit.call(this, data);
            // submit
        },
        close: function close() {}
    };

    /* Private utility functions */
    function loopInit(collection, options, args){
        if (!collection instanceof jQuery){
            return collection.each(function () {
                if (!$(this).data("plugin_" + pluginName)) {
                    $(this).data("plugin_" + pluginName, new Plugin(this, options,args));
                }
            });
        }
        else{
            // static call, attach to body
            $('body').data("plugin_" + pluginName, new Plugin($('body'), options,args));
        }
    }

    $.fn[pluginName] = function ( methodOrOptions ) {
        if (Plugin.prototype[methodOrOptions] && typeof Plugin.prototype[methodOrOptions] === 'function') {
            var e = $(this).data("plugin_" + pluginName), args = Array.prototype.slice.call( arguments, 1 );
            if(!e){
                loopInit(this, methodOrOptions, args);
            }
            if (this.length > 1){
                this.each(function(){
                    e = $(this).data("plugin_" + pluginName);
                    e[methodOrOptions](args);   
                });
            }
            else if(this.length == 1){
                e[methodOrOptions](args);
            }
        } 
        else if (typeof methodOrOptions === 'object' || ! methodOrOptions ) {
            // Default to "init"
            return loopInit(this, methodOrOptions, args);
        } 
        else {
            $.error( 'Method ' +  methodOrOptions + ' does not exist on GA.commentsModal' );
        }  

        return this;
    };
})( jQuery, window, document );