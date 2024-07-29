import Excel from "@packages/excel"
import styles from './index.module.less'
import { useRef } from "react"
import { Button } from "antd"

const Excels =()=>{
    const excelRef=useRef<any>(null)
    const getData=()=>{
        const excelInstance=excelRef.current?.getRef()
        console.log(excelInstance.getAllSheets(),'excelInstance')
    }
    return (
        <div className={styles.excel}>
            <Button onClick={()=>getData()}>222</Button>
            <Excel value={[{}]}  ref={excelRef}/>
        </div>
    )
}

export default Excels