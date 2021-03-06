import Vue from 'vue';
import Toast from './Toast.vue';
let toast = (opts) => {
    let timeout = opts.timeout || 2500;
    let Toast = document.createElement('div');
    const instance = new ToastConstructor().$mount(Toast);
    instance.init(opts,instance);
    document.body.appendChild(instance.$el);
    Vue.nextTick(() => {
        const timer = setTimeout(function() {
            instance.close();
        }, timeout);
    })
}

class ToastConstructor extends Vue.extend(Toast) {
   constructor() {
        super();
        this.message = '';
        this.instance = null;
        this.callback = null;
    }
    init(opts,instance){
        this.message = typeof opts === 'string' ? opts : opts.message;
        this.visible = true;
        this.instance = instance;
        this.callback = opts.callback || {};
    }
    close(){
        this.visible = false;
        const el = this.instance.$el;
        el.parentNode && el.parentNode.removeChild(el);
        typeof this.callback == 'function' && this.callback();
    }
}
export default toast;