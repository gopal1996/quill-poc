export const plugin_submenu = {
    name: 'customSubmenu',
    display: 'submenu',
    title: 'Custom Plugin for SubMenu',
    buttonClass: '',
    innerHTML: 'SM',

    add: function(core, targetElement) {
        const context = core.context;
        context.customSubmenu = {
            targetButton: targetElement,
            textElement: null,
            currentSpan: null
        };

        let listDiv = this.setSubmenu(core);
        context.customSubmenu.textElement = listDiv.querySelector('input');

        listDiv.querySelector('.se-btn-primary').addEventListener('click', this.onClick.bind(core));
        listDiv.querySelector('.se-btn').addEventListener('click', this.onClickRemove.bind(core));

        core.initMenuTarget(this.name, targetElement, listDiv);
    },

    setSubmenu: function(core) {
        const listDiv = core.util.createElement('DIV');
        listDiv.className = 'se-submenu se-list-layer';
        listDiv.innerHTML = `<div class="se-list-inner" style="height: 20px;">Hello<ul class="se-list-basic" style="width: 230px;"><li><div class="se-form-group"><input class="se-input-form" type="text" placeholder="insert text" style="border: 1px solid #CCC;" /><button type="button" class="se-btn-primary se-tooltip"><strong>OK</strong><span class="se-tooltip-inner"><span class="se-tooltip-text">Append span</span></span></button><button type="button" class="se-btn se-tooltip"><strong>X</strong><span class="se-tooltip-inner"><span class="se-tooltip-text">Remove</span></span></button></div></li></ul></div>`;

        return listDiv;
    },

    active: function(element) {
        if (!element) {
            this.util.removeClass(this.context.customSubmenu.targetButton, 'active');
            this.context.customSubmenu.textElement.value = '';
            this.context.customSubmenu.currentSpan = null;
        } else if (this.util.hasClass(element, 'se-custom-tag')) {
            this.util.addClass(this.context.customSubmenu.targetButton, 'active');
            this.context.customSubmenu.textElement.value = element.textContent;
            this.context.customSubmenu.currentSpan = element;
            return true;
        }

        return false;
    },

    on: function() {
        this.context.customSubmenu.textElement.focus();
    },

    onClickRemove: function () {
        const span = this.context.customSubmenu.currentSpan;
        if (span) {
            this.util.removeItem(span);
            this.context.customSubmenu.currentSpan = null;

            this.submenuOff();
            this.focus();
        }
    },

    onClick: function () {
        console.log("Hello")
        const value = this.context.customSubmenu.textElement.value.trim();
        if (!value) return;

        const span = this.context.customSubmenu.currentSpan;
        if (span) {
            span.textContent = value;
            this.setRange(span, 1, span, 1);
        } else {
            this.functions.insertHTML('<table><tbody><tr><td><div><br></div></td><td><div><br></div></td></tr><tr><td><div><br></div></td><td><div><br></div></td></tr><tr><td><div><br></div></td><td><div><br></div></td></tr></tbody></table>', true);
            this.context.customSubmenu.textElement.value = '';
        }

        this.submenuOff();
    }
};