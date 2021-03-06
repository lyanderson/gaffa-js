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
        actionType = "navigate";
    
    function Navigate(){}
    Navigate = Gaffa.createSpec(Navigate, Gaffa.Action);
    Navigate.prototype.type = actionType;
    Navigate.prototype.url = new Gaffa.Property();
    Navigate.prototype.target = new Gaffa.Property();
    Navigate.prototype.data = new Gaffa.Property();
    Navigate.prototype.pushstate = new Gaffa.Property();
    Navigate.prototype.external = new Gaffa.Property();    
    Navigate.prototype.trigger = function() {
        this.__super__.trigger.apply(this, arguments);

        if(this.external.value){
            window.location = this.url.value;
            return;
        }
        this.gaffa.navigate(this.url.value, this.target.value, this.pushstate.value, this.data.value);
    }

    return Navigate;

}));