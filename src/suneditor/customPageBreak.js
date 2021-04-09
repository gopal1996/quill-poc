export const plugin_pageBreak = {
    name: 'customPageBreak',
    display: 'command',
    buttonClass: '',
    innerHTML: 'PB',

    add: function(core, targetElement) {
        const context = core.context;
        const breakTag = core.util.createElement('div')
        core.util.addClass(breakTag, 'page-break')

        context.customPageBreak = {
            targetButton: targetElement,
            tag: breakTag
        }
    },

    active: function(element) {
        if(!element) {
            this.util.removeClass(this.context.customPageBreak.targetButton, 'active')
        } else if(this.util.hasClass(element, '__se__format__pagebreak_custom')) {
            this.util.addClass(this.context.customPageBreak.targetButton, 'active')
            return true
        }
        return false;
    },

    action: function() {
        // this.functions.insertHTML('<div class="page-break" style="page-break-before: always;"></div>', true)
        // this.functions.insertHTML('<br>', true)
        // this.insertComponent(this.context.customPageBreak.tag)
        // this.functions.insertHTML('<p><br></p>', true)

        let newNode = this.util.createElement('hr')
        // let newNode1 = this.util.createElement('hr')
        // newNode.style.breakAfter = "always";
        newNode.style.pageBreakBefore = "always";
        newNode.style.display = "block";
        newNode.className = "page-break"
        // this.nodeChange(newNode, ['break-after'], null, null);
        this.focus()
        return this.insertComponent(newNode, false, true, false)

    }
}