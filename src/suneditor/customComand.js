export const plugin_command = {
    name: 'customCommand',
    display: 'command',
    title: 'Add Range tag',
    buttonClass: '',
    innerHTML: 'CC',
    add: function(core, targetElement) {
        const context = core.context;
        const rangeTag = core.util.createElement('p');
        core.util.addClass(rangeTag, '__se__format__range_custom')

        context.customCommand = {
            targetButton: targetElement,
            tag: rangeTag
        }
    },
    active: function(element) {
        if(!element) {
            this.util.removeClass(this.context.customCommand.targetButton, 'active')
        } else if(this.util.hasClass(element, '__se__format__range_custom')) {
            this.util.addClass(this.context.customCommand.targetButton, 'active')
            return true
        }
        return false;
    },
    action: function() {
        const rangeTag = this.util.getRangeFormatElement(this.getSelectionNode())

        if(this.util.hasClass(rangeTag, '__se__format__range_custom')) {
            this.detachRangeFormatElement(rangeTag, null, null, false, false)
        } else {
            this.applyRangeFormatElement(this.context.customCommand.tag.cloneNode(false))
        }
    }
}