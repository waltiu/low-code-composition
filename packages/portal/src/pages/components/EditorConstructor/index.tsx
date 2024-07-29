import { FC, forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
import { construtorMap } from "./constant"

type EditorConstructorProps = {
    type: string,
    id: string
    templateId?: string
    ref?: any;
}



const EditorConstructor: FC<EditorConstructorProps> = forwardRef(({ type, id }, ref) => {
    const [data, setData] = useState()
    const editorRef = useRef<any>()
    const getConstrutor = (type: string, data: any) => {
        const { com: Compoment } = construtorMap[type]
        return <Compoment value={data} ref={editorRef} />
    }
    useImperativeHandle(ref, () => ({
        // 这里暴露的方法和属性可以由父组件访问
        getData: async () => {
            const result = await editorRef.current.getData()
            return result
        },
        setData:()=>{}
    }));
    const initData = async () => {
        if (!type) {
            return {}
        }
        const { getData } = construtorMap[type]
        const result = await getData(id)
        setData(result)
    }
    useEffect(() => {
        initData()
    }, [type, id])

    return (
        <div style={{ height: "100%", width: "100%" }}>
            {type && getConstrutor(type, data)}
        </div>
    )
})
export default EditorConstructor