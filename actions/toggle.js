(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        throw "Gaffa must be compiled with browserify";
    }
}(this, function(){
    var Gaffa = require('gaffa'),
        actionType = "toggle";
    
    function Toggle(){}
    Toggle = Gaffa.createSpec(Toggle, Gaffa.Action);
    Toggle.prototype.type = actionType;
    Toggle.prototype.trigger = function(){
        this.__super__.trigger.apply(this, arguments);

        this.target.set(!this.target.value, this);
    };
    Toggle.prototype.target = new Gaffa.Property();

    return Toggle;

}));