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
        crel = require('crel'),
        viewType = "group";
    
    function Group(){
        this.views.groups = new Gaffa.ViewContainer(this.views.groups);
        this.views.empty = new Gaffa.ViewContainer(this.views.empty);
    }
    Group = Gaffa.createSpec(Group, Gaffa.ContainerView);
    Group.prototype.type = viewType;
    Group.prototype.render = function(){
        
        var renderedElement = crel('div');
        
        this.views.groups.element = renderedElement;
        this.views.empty.element = renderedElement;
        
        this.renderedElement = renderedElement;
        
        this.__super__.render.apply(this, arguments);
    }

    function createNewView(property, templateKey, addedItem){
        if(!property.templateCache){
            property.templateCache= {};
        }
        var view = JSON.parse(
            property.templateCache[templateKey] || 
            (property.templateCache[templateKey] = JSON.stringify(property[templateKey]))
        );

        for(var key in addedItem){
            view[key] = addedItem[key];
        }

        return property.gaffa.initialiseViewItem(view, property.gaffa, property.gaffa.views.constructors);
    }
           
    Group.prototype.groups = new Gaffa.Property(Gaffa.propertyUpdaters.group(
        "groups",                     
        //increment
        function(viewModel, groups, addedItem){
            var listViews = viewModel.views.groups,
                property = viewModel.groups,
                groupContainer = new gaffa.views.container(),
                expression,
                newHeader,
                newList;

            for(var key in addedItem){
                groupContainer[key] = addedItem[key];
            }

            if(property.headerTemplate){
                newHeader = JSON.parse(JSON.stringify(property.headerTemplate));

                groupContainer.views.content.push(newHeader);
            }

            if(property.listTemplate){
                expression = '(filter [] {item (= (' + property.expression + ' item) "' + addedItem.group + '")})';
                addedItem


                addedItem.list = newList.list || {};
                addedItem.list.binding = expression;

                newList = createNewView(property, 'listTemplate', addedItem);

                groupContainer.views.content.add(newList);
            }

            listViews.add(groupContainer);
        },
        //decrement
        function(viewModel, groups, removedItem){
            removedItem.remove();
        },
        //empty
        function(viewModel, insert){
            var emptyViews = viewModel.views.empty,
                property = viewModel.groups;
                
            if(!property.emptyTemplate){
                return;
            }
            
            if(insert){
                if(!emptyViews.length){
                    emptyViews.add(createNewView(property, 'emptyTemplate'));
                }
            }else{
                while(emptyViews.length){
                    emptyViews[0].remove();
                }
            }
        }
    ));

    return Group;
    
}));