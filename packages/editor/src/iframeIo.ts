
// host
// 检测iframe连通是否正常
export const MESSAGE_TYPE_CHECK_CONNECT = "check_connect"


// 连接正常
export const MESSAGE_TYPE_IS_CONNECT='connecting'

// 请求设置iframe数据
export const MESSAGE_TYPE_REQUEST_SET_VALUE = 'request_set_value'


// 请求获取Iframe数据
export const MESSAGE_TYPE_REQUEST_GET_VALUE = 'request_get_value'

// host保存iframe的数据
export const MESSAGE_TYPE_SAVE_IFRAME_VALUE = 'save_iframe_value'




// 身份 - 主应用
export const IDENTITY_HOST = "host"
// 身份 - iframe
export const IDENTITY_IFRAME = "iframe"



type IframeIoPropsType = {
    identity?: string;
    iframeRef?: any;
}
class IframeIo {
    identity: string;
    iframeRef: any
    constructor(props: IframeIoPropsType) {
        this.identity = props.identity as string
        this.iframeRef = props.iframeRef
    }

    send(type: string, data?: any) {
        console.log(type,data,'send',this.identity)
        if (this.identity === IDENTITY_IFRAME) {
            window.parent.postMessage({
                type,
                data
            }, "*")
        } else {
            this.iframeRef?.contentWindow?.postMessage({ type, data }, "*")

        }
    }
}

type IframeIoHostPropsType = {
    initialData: any // 初始化iframe传递的数据
    iframeRef: any,
    onMessage?: (type: string, data: any) => void
}

export class IframeIoHost extends IframeIo {
    props: IframeIoHostPropsType;
    data: any;
    identity: string;
    isConnecting: boolean;
    constructor(props: IframeIoHostPropsType) {
        super(props)
        this.props = props
        this.data = props.initialData
        this.isConnecting = false
        this.identity = IDENTITY_HOST
        this.init()
    }
    onConnect() {
        console.log('连接成功！---', this.identity)
        this.isConnecting = true
        this.send(MESSAGE_TYPE_CHECK_CONNECT)
    }

    init() {
        const _this = this
        console.log('IframeIoHost init')
        window.addEventListener('message', function (event) {
            const { type, data } = event.data
            _this.onReceive(type,data)
        }, false);
    }
    start(){
        console.log('iframe - host - iframe ，开始通信！')
        this.requestSetData(this.data)
    }

    requestSetData(data: any) {
        this.send(MESSAGE_TYPE_REQUEST_SET_VALUE, data)
    }

    requestGetData(params?: any) {
        this.send(MESSAGE_TYPE_REQUEST_GET_VALUE, params)
        return new Promise<void>((resolve) => {
            window.addEventListener('message', function (event) {
                const { type, data } = event.data
                if (type === MESSAGE_TYPE_SAVE_IFRAME_VALUE) {
                    resolve(data)
                }
            }, false);
        })
    }

    async onReceive(type: string, data?: any) {
        if (type === MESSAGE_TYPE_CHECK_CONNECT) {
            this.onConnect()
            return
        }
        if(type===MESSAGE_TYPE_IS_CONNECT){
            this.start()
            return 
        }
        if (type === MESSAGE_TYPE_SAVE_IFRAME_VALUE) {
            this.data=data
            return
        }
        if (this.props.onMessage) {
            console.log(type,data,'onReaceive',this.identity)
            this.props.onMessage(type, data)
        }
    }

}



type IframeIoIframePropsType = {
    iframeRef?: any,
    onSetData: (data: any) => void, // 更新iframe内部数据
    onRequestGetData: (params: any) => any
    onMessage?: (type: string, data: any) => void
}

export class IframeIoIframe extends IframeIo {
    props: IframeIoIframePropsType;
    identity: string
    isConnecting: boolean
    constructor(props: IframeIoIframePropsType) {
        const identity = IDENTITY_IFRAME
        super({
            ...props,
            identity
        })
        this.identity = IDENTITY_IFRAME
        this.props = props
        this.isConnecting = false
        this.init()

    }
    init() {
        console.log('IframeIoIframe init')
        const _this = this
        window.addEventListener('message', function (event) {
            const { type, data } = event.data
            _this.onReceive(type,data)
        }, false);
        this.startConnect()
    }

    startConnect() {
        this.send(MESSAGE_TYPE_CHECK_CONNECT)
    }
    onConnect() {
        console.log('连接成功！---', 'iframe')
        this.isConnecting = true
        this.send(MESSAGE_TYPE_IS_CONNECT)
    }
    async onReceive(type: string, data?: any) {
        if (type === MESSAGE_TYPE_CHECK_CONNECT) {
            this.onConnect()
            return
        }
        if (type === MESSAGE_TYPE_REQUEST_SET_VALUE) {
            this.props.onSetData(data)
            return
        }
        if (type === MESSAGE_TYPE_REQUEST_GET_VALUE) {
            const result = await this.props.onRequestGetData(data)
            this.send(MESSAGE_TYPE_SAVE_IFRAME_VALUE, result)

            return
        }
        if (this.props.onMessage) {
            this.props.onMessage(type, data)
        }
    }
}