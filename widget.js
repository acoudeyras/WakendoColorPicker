WAF.define('WakendoColorPicker', ['waf-core/widget', 'wakendoCore'], function(widget, $) {
	'use strict';
	
    var KendoColorPicker = widget.create('WakendoColorPicker', {
    	
    	value: widget.property({
    		type: 'string'
    	}),
    	
    	flat: widget.property({
    		type: 'boolean',
    		defaultValue: false
    	}),
    	
        init: function() {
        	var self = this;

        	self.valueChangeSubscriber = self.value.onChange(function(newValue) {
        		self.kendoWidget.value(newValue);
        	});
        	self.flat.onChange(self.render);
        	
        	self.render();
        },
        
        render: function() {
        	var self = this;
        	$(self.node).empty();
			
			var options = {
        		change: function(event) {
        			self.valueChangeSubscriber.pause();
        			self.value(event.value);
        			self.valueChangeSubscriber.resume();
        		}
        	};
			
			if (self.flat()) {
				var $el = $(self.node);
        		$el.kendoFlatColorPicker(options);
				self.kendoWidget = $el.data("kendoFlatColorPicker");
			} else {
				var $el = $('<input />').appendTo(self.node);
				$el.kendoColorPicker(options);
				self.kendoWidget = $el.data("kendoColorPicker");
			}
        			        	
        },

        open: function() {
        	this.kendoWidget.open();
        },

        close: function() {
        	this.kendoWidget.close();
        },

        enable: function() {
        	this.kendoWidget.enable();
        },

        disable: function() {
        	this.kendoWidget.enable(false);
        }

    });

    return KendoColorPicker;

});

