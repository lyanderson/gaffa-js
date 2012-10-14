(function (undefined) {

    var viewType = "fileInput",
        cachedElement;

    window.gaffa.views = window.gaffa.views || {};
    window.gaffa.views[viewType] = window.gaffa.views[viewType] || newView();
		
	gaffa.addDefaultStyle('.fileInput{position:relative; min-height:200px;background-color:white;border:solid 1px gray;}.fileInput:before{content:"Click to upload a file";text-align:center;padding-top:100px;position:absolute;top:0;left:0;right:0;bottom:0;opacity:.4;font-weight:bold;font-size:1.5em;}.fileInput input[type="file"]{position:absolute;top:0;left:0;right:0;bottom:0;opacity:0;width:auto;height:auto}');
	
	function imageToBytes(image, callback) {
        var reader = new window.FileReader();
        reader.onload = function(event) {
            callback(event.target.result);
        };
        reader.readAsBinaryString(image);
	}

    function setValue(event){    
        var input = this,
			viewModel = input.parentNode.viewModel;
                
        window.gaffa.model.set(viewModel.properties.file.binding, input.files[0], viewModel);
		imageToBytes(input.files[0],function(bytes){
			window.gaffa.model.set(viewModel.properties.bytes.binding, bytes, viewModel);		
		});
    }  
    
    function createElement(viewModel) {
        var classes = viewType;

        var renderedElement = cachedElement || (function(){
				var input = document.createElement('input');
				
				input.type = 'file';
					
				cachedElement = document.createElement('div');
				
				cachedElement.appendChild(input);
				
				return cachedElement;
			})();

        renderedElement = $(renderedElement.cloneNode(true)).addClass(classes)[0];
                
        $(renderedElement).on("change", 'input[type="file"]', setValue);
		
        viewModel.viewContainers.content.element = renderedElement;

        return renderedElement;
    }

    function newView() {

        function view() {
        }

        view.prototype = {
            update: {
                file: window.gaffa.propertyUpdaters.object("file", function(viewModel, value){
                    //Do Nothing.
                }),
				bytes: window.gaffa.propertyUpdaters.object("bytes", function(viewModel, value){
                    //Do Nothing.
                }),
                disabled: window.gaffa.propertyUpdaters.bool("disabled", function(viewModel, value){
                    if (value){
                        viewModel.renderedElement.setAttribute('disabled', 'disabled');
                    }else{
                        viewModel.renderedElement.removeAttribute('disabled');
                    }
                })
            },
            defaults: {
                viewContainers:{
                    content:[]
                },
                properties: {
                    value: {}
                }
            }
        };

        $.extend(true, view.prototype, window.gaffa.views.base(viewType, createElement), view.prototype);

        return new view();
    }
})();