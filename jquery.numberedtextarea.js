/*
 * NumberedTextarea - jQuery Plugin
 * Textarea with line numbering
 *
 * Copyright (c) 2015 Dariusz Arciszewski
 *
 * Requires: jQuery v2.0+
 *
 * Licensed under the GPL licenses:
 *   http://www.gnu.org/licenses/gpl.html
 */

(function ($) {
 
    $.fn.numberedtextarea = function(options) {
 
        var settings = $.extend({
            color:			null,        // Font color
            borderColor:	null,    	 // Border color
            class:			null,        // Add class to the 'numberedtextarea-wrapper'
            allowTabChar:   false,		 // If true Tab key creates indentation
        }, options);
 
        this.each(function() {
            if(this.nodeName.toLowerCase() !== "textarea") {
                console.log('This is not a <textarea>, so no way Jose...');
                return false;
            }
            
            addWrapper(this, settings);
            addLineNumbers(this, settings);
            
            if(settings.allowTabChar) {
            	$(this).allowTabChar();
            }
        });
        
        return this;
    };
    
    function addWrapper(element, settings) {
        var wrapper = $('<div class="numberedtextarea-wrapper"></div>').insertAfter(element);
        $(element).detach().appendTo(wrapper);
    }
    
    function addLineNumbers(element, settings) {
        element = $(element);
        
        var wrapper = element.parents('.numberedtextarea-wrapper');
        
        // Get textarea styles to implement it on line numbers div
        var paddingLeft = parseFloat(element.css('padding-left'));
        var paddingTop = parseFloat(element.css('padding-top'));
        var paddingBottom = parseFloat(element.css('padding-bottom'));
        
        var lineNumbers = $('<div class="numberedtextarea-line-numbers"></div>').insertAfter(element);
        
        element.css({
            paddingLeft: paddingLeft + lineNumbers.width() + 'px'
        }).on('input propertychange change keyup paste', function() {
            renderLineNumbers(element, settings);
        }).on('scroll', function() {
            scrollLineNumbers(element, settings);
        }); 
        
        lineNumbers.css({
            paddingLeft: paddingLeft + 'px',
            paddingTop: paddingTop + 'px',
            paddingBottom: paddingBottom + 'px',
            lineHeight: element.css('line-height'),
            fontFamily: element.css('font-family'),
            width: lineNumbers.width() - paddingLeft + 'px',
        });
        
        element.trigger('change');
    }
    
    function renderLineNumbers(element, settings) {
        element = $(element);
        
        var linesDiv = element.parent().find('.numberedtextarea-line-numbers');
        var count = element.val().split("\n").length;
        
        linesDiv.find('.numberedtextarea-number').remove();
        
        for(i = 1; i<=count; i++) {
            $('<div class="numberedtextarea-number numberedtextarea-number-' + i + '">' + i + '</div>').appendTo(linesDiv);
        }
    }
    
    function scrollLineNumbers(element, settings) {
        element = $(element);
        var linesDiv = element.parent().find('.numberedtextarea-line-numbers');
        linesDiv.scrollTop(element.scrollTop());
    }
 
}(jQuery));