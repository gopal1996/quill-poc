export const plugin_padding = {
    name: 'customPadding',
    display: 'submenu',
    title: 'Custom Padding',
    buttonClass: '',
    innerHTML: 'CP',

    add: function (core, targetElement) {
        const context = core.context;
        context.customPadding = {
            targetButton: targetElement,
        };

        let menuDiv = this.setSubmenu(core);

        menuDiv.querySelector('#wrap-left').addEventListener('change', this.onChangeLeft.bind(core))
        menuDiv.querySelector('#wrap-right').addEventListener('change', this.onChangeRight.bind(core))

        core.initMenuTarget(this.name, targetElement, menuDiv)
    },

    setSubmenu: function(core) {
        const menu = core.util.createElement('DIV');
        menu.className = 'se-submenu se-list-layer wrap-padding';
        menu.innerHTML = `
        <div>
            <div class="wrap">
                <input class="form-input" type="number">
            </div>
            <div class="wrap-two">
                <input id="wrap-left" class="form-input" type="number">
                <input id="wrap-right" class="form-input" type="number">
            </div>
            <div class="wrap">
                <input class="form-input" type="number">
            </div>
        </div>
        `;

        return menu;
    },

    onChangeLeft: function(e) {
        this.context.element.wysiwyg.style.paddingLeft = e.target.value + "px";
    },

    onChangeRight: function(e) {
        this.context.element.wysiwyg.style.paddingRight = e.target.value + "px";
    },
}