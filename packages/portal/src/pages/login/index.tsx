import { Button } from "antd"
import { useEffect, useRef, useState } from "react"

const Login = () => {
    const [value, setValue] = useState('')
    const editorRef = useRef()
    const iframeIoRef=useRef()
    const testClick = async () => {
        setValue(2222)
    }

    useEffect(() => {
        iframeIoRef.current=editorRef.current.iframeIo
    }, [])

    return <div>
        <Button onClick={() => testClick()}>11</Button>
        <my-editor value={value}  ref={editorRef}></my-editor>
    </div>
}
export default Login