(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        throw "Gaffa must be compiled with browserify";
    }
}(this, function(){
    "use strict";
    
    var Gaffa = require('gaffa'),
        crel = require('crel'),
        viewType = "heading";
        
    function Heading(){    }
    Heading = Gaffa.createSpec(Heading, Gaffa.View);
    Heading.prototype.type = viewType;
    
    Heading.prototype.render = function(){        
        var renderedElement = crel('h' + (parseInt(this.level) || 1));
        
        this.renderedElement = renderedElement;
        
        this.__super__.render.apply(this, arguments);
    };
    
    Heading.prototype.text = new Gaffa.Property(function(viewModel, value){
        viewModel.renderedElement.textContent = (value && typeof value === 'string') ? value : null;
    });

    return Heading;
    
}));