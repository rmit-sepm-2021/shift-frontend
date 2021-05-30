import Vue from 'vue/dist/vue.esm.js';
import Confirm from "@/components/AlertDiolog/ComfirmDialog";
import vuetify from "@/plugins/vuetify";
import AlertDialog from "@/components/AlertDiolog/AlertDialog";
// title,content
let ConfirmConstructor = Vue.extend(Object.assign({vuetify}, Confirm))
let AlertConstructor = Vue.extend(Object.assign({vuetify}, AlertDialog))


export const confirm = function (content) {
    return new Promise((res, rej) => {

        const div = document.createElement('div')
        document.body.appendChild(div)
        let alertDom = new ConfirmConstructor({
            propsData: {
                content: {...content, show: true},
                ok: function () {
                    res()
                    alertDom.content.show = false
                },
                close: function () {
                    rej()
                    alertDom.content.show = false
                }

            }
        }).$mount(div)
    })
}

export const _alert = function (message) {
    const div = document.createElement('div')
    document.body.appendChild(div)
    new AlertConstructor({
        propsData: {
            message,
        }
    }).$mount(div)
}
