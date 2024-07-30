import { useEffect, useState } from "react";
import EditorConstructor from "@/components/EditorConstructor";
import { getUrlParams } from "@/utils";

const PreWrapper = () => {
  const [data,setData]=useState<any>({})
  useEffect(()=>{
    const params=getUrlParams(window.location.href)
    setData(params)
  },[])
  return (
      <EditorConstructor id={data?.id} type={data?.type} />
  );
};
export default PreWrapper;
