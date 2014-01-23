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
                            error:pluginName+'.error', hoganLoaded: pluginName+'.hoganLoaded'};

    // The actual plugin constructor
    function Plugin( element, opts, args ) {
        var me = this;
        this.element = element;
        this.$element = $(element);
        this.options = $.extend( {}, defaults, opts) ;
        this._defaults = defaults;
        this._name = pluginName;

        this.$modal = null;
        
        this.f = {
            HELPERS: {
                throwError: function throwError(error){
                    $(document).trigger(announcedEvents.error, [error,me]);
                },
                loadHogan: function loadHogan(element){
                    $.ajaxSetup({cache: true});
                    $.getScript(defaults.hoganURL).done(function(){
                        $.ajaxSetup({cache: false});
                        $(document).trigger(announcedEvents.hoganLoaded);
                    });
                },
                createLoadObject: function createLoadObject(){
                    var returnVal = {}, urlParts = null, partObj = {};
                    returnVal.method = me.options.loadMethod;
                    returnVal.url = "";
                    returnVal.data = "";

                    if(me.$element.is("["+dataAttrs.loadMethod+"]"))
                        returnVal.method = me.$element.attr(dataAttrs.loadMethod);
                    
                    if(me.$element.is("["+dataAttrs.loadUrl+"]")) {
                        urlParts = me.$element.attr(dataAttrs.loadUrl).split('?');
                    }
                    else if(me.$element.is("[href]")) {
                        urlParts = me.$element.attr('href').split('?');
                    }
                    if (urlParts !== null){
                        returnVal.url = urlParts[0];
                    

                        if (urlParts.length > 1){
                            urlParts = urlParts[1].split('&');
                            for (var i = 0; i < urlParts.length; i++){
                                var split = urlParts[i].split('=');
                                partObj[split[0]] = split[1];
                            }
                        }
                    }
                    returnVal.data = jQuery.extend({}, partObj);
                    return returnVal;
                },
                createSubmitObject: function createSubmitObject(){
                    var returnVal = {};
                    returnVal.method = me.options.submitMethod;
                    returnVal.url = "";

                    if(me.$element.is("["+dataAttrs.submitMethod+"]"))
                        returnVal.method = me.$element.attr(dataAttrs.submitMethod);
                    
                    if(me.$element.is("["+dataAttrs.submitUrl+"]")) {
                        returnVal.url = me.$element.attr(dataAttrs.loadUrl);
                    }
                    else if(me.$element.is("[href]")) {
                        returnVal.url = me.element.attr('href');
                    }
                    return returnVal;
                }
            },
            DOM: {
                // CHANGE THIS TO MORE ON THE FLY. NOT ON INIT
                addCommentModal: function addCommentModal(){
                    var template = Hogan.compile(me.options.template);
                    var markup = template.render($.extend({}, me.options.templateVars, me.options.templateClasses));
                    me.$modal = $(markup).appendTo('body');
                },
                addComments: function addComments(commentJson) {
                    var template = Hogan.compile(me.options.commentTemplate);
                    var markup = template.render($.extend({}, me.options.templateClasses, commentJson));
                    me.$modal.find('.'+me.options.templateClasses.commentSectionClass).append(markup);
                },
                getCommentText: function getCommentText(){
                    var returnVal = "";
                    // TODO: trycatch n stuff
                    returnVal = me.$modal.find('.'+me.options.templateClasses.commentBoxClass).val();
                    return returnVal;
                },
                toggleModal: function toggleModal(show) {
                    if(show)
                        me.$modal.removeClass('hidden');
                    else
                        me.$modal.addClass('hidden');
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
            $(document).trigger(announcedEvents.preInit, [this]);
            console.log(args);
            // Place initialization logic here
            // You already have access to the DOM element and
            // the options via the instance, e.g. this.element
            // and this.options
            // you can add more functions like the one below and
            // call them like so: this.yourOtherFunction(this.element, this.options).
            if (args && args.length > 0){
                this.$modal = args[0];
            }
            else{
                this.f.DOM.addCommentModal();
            }
            $(document).trigger(announcedEvents.postInit, [this]);
        },
        destroy: function destroy() {},
        open: function open(args) {
            console.log('h');
            $(document).trigger(announcedEvents.preOpen, [this]);
            this.load(args);
            this.f.DOM.toggleModal(true);
            $(document).trigger(announcedEvents.postOpen, [this]);
        },
        load: function load(args) {
            var data = {}, t = this, loadObj = this.f.HELPERS.createLoadObject();
            if (!args.json) {
                loadObj = $.extend({}, loadObj, args);
                $.ajax(loadObj).done(function(data, textStatus, jqXHR){
                    t.load({json:data});
                });
            }
            else {
                data = args.json;
                if (this.options.onLoad !== null && $.isFunction(this.options.onLoad)) 
                    data = this.options.onLoad.call(this, data);
                this.f.DOM.addComments(data);
            }
        },
        submit: function submit(args) {
            var data = {}, submitObj = this.f.HELPERS.createSubmitObject();
            submitObj = $.extend({}, submitObj, args);
            data.comment = ""; // textarea.val()
            if (this.options.onSubmit !== null && $.isFunction(this.options.onSubmit)) 
                data = this.options.onSubmit.call(this, data);
            // submit
        },
        close: function close() {}
    };

    /* Private utility functions */
    function loopInit(collection, options, args){
        console.log(collection.length);
        if (collection.length > 0){
            collection.each(function () {
                console.log(this);
                if (!$(this).data("plugin_" + pluginName)) {
                    $(this).data("plugin_" + pluginName, new Plugin(this, options,args));

                }
            });
        }
        else {
            // static call, attach to body
            $('body').data("plugin_" + pluginName, new Plugin($('body'), options,args));
        }
    }

    $.fn[pluginName] = function ( methodOrOptions ) {
        console.log(this, this.length);
        if (Plugin.prototype[methodOrOptions] && typeof Plugin.prototype[methodOrOptions] === 'function') {
            var e, args = Array.prototype.slice.call( arguments, 1 );
            
            loopInit(this, methodOrOptions, args);
            console.log($(this).data("plugin_" + pluginName));
            if (this.length <= 0){
                e = $('body').data("plugin_" + pluginName);
                e[methodOrOptions](args);
            }
            else if(this.length == 1){
                e = $(this).data("plugin_" + pluginName);
                e[methodOrOptions](args);
            }

            else if (this.length > 1){
                this.each(function(){
                    e = $(this).data("plugin_" + pluginName);
                    e[methodOrOptions](args);   
                });
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