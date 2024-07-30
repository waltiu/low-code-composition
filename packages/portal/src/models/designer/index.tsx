import { forwardRef, useImperativeHandle, useRef } from "react";
import './webCom'

const Designer = forwardRef((props, ref) => {
  const editorRef = useRef<any>()
  console.log(editorRef,'editorRef')
  useImperativeHandle(ref, () => ({
    // 这里暴露的方法和属性可以由父组件访问
    getRef: () => {
      return editorRef?.current
    },
    setData:()=>{

    },
    getData:async ()=>{
      return await editorRef?.current?.iframeIo?.requestGetData()
    }
  }));
  return (
    <my-editor ref={editorRef} value={props.value}  name="111"/>
  );
});
export default Designer;
