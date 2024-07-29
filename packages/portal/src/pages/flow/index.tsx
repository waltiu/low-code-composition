import './webCom'
import { forwardRef, useImperativeHandle, useRef } from "react";

const Flow = forwardRef((props, ref) => {
  const editorRef = useRef<any>()
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
    <my-flow ref={editorRef} value={props.value} />
  );
});
export default Flow;
