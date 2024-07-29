// this.dispatchEvent(new CustomEvent('onChange', {
//     detail:this.iframeIo
// }))
import { IframeIoHost } from '@packages/utils/iframeIo'
class Editor extends HTMLElement {
    iframeIo: any
    value:any
    constructor(props) {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        this.iframeIo = null
        this.value=null
        shadowRoot.innerHTML = `
            <style>
                iframe{
                    height:100%;
                    width:100%;
                }
            </style>
            <iframe  src='http://localhost:5556/' ></iframe>
        `
    }

    getRef() {
        return this.shadowRoot?.querySelector('iframe')
    }

    onMessage(type: string, data: any) {
        console.log('onMessage', type, data)
    }

    init() {
        this.iframeIo = new IframeIoHost({
            initialData: this.value,
            iframeRef: this.getRef(),
            onMessage: this.onMessage
        })

    }

    onChange(data: any) {
        this.value=data
        this.iframeIo.setInitialData(data)

    }

    connectedCallback() {
        const values=this.getAttribute('value')
        console.log('connectedCallback',values, this.attributes)
        this.init()
    }

    attributeChangedCallback(name: string, oldValue: any, newValue: any) {
        if (name === 'value') {
            this.onChange(newValue)
        }
    }

    static get observedAttributes() {
        // 返回一个数组，包含需要监听的属性
        return ['value'];
    }
}

customElements.define('my-editor', Editor)