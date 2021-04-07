export const plugin_customTable = {
    name: 'customTable',
    display: 'command',
    buttonClass: '',
    innerHTML: 'CT',

    add: function(core, targetElement) {
        const context = core.context;

        context.customTable = {
            targetButton: targetElement,
        }
    },

    active: function(element) {
        if(!element) {
            this.util.removeClass(this.context.customTable.targetButton, 'active')
        } else if(this.util.hasClass(element, '__se__format__table_custom')) {
            this.util.addClass(this.context.customTable.targetButton, 'active')
            return true
        }
        return false;
    },

    action: function() {
        this.functions.insertHTML('<table><thead><tr><th><div><br></div></th><th><div><br></div></th></tr></thead><tbody><tr><td><div><br></div></td><td><div><br></div></td></tr></tbody></table>', true);
    }
}