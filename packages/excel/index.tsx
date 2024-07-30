import { Workbook, WorkbookInstance } from "@fortune-sheet/react";
import "@fortune-sheet/react/dist/index.css"
import { useRef, useImperativeHandle, forwardRef } from "react";

type ExcelPropsType = {
    value: any
}

const Excel = forwardRef(({ value }: ExcelPropsType, ref) => {
    const excelRef = useRef<WorkbookInstance>(null);
    useImperativeHandle(ref, () => ({
        // 这里暴露的方法和属性可以由父组件访问
        getRef: () => {
            return excelRef?.current
        },
        getData: async () => {
            const data = await excelRef?.current?.getAllSheets() || []
            return data.map((item: any) => ({
                ...item,
                celldata: excelRef?.current?.dataToCelldata(item.data)
            }))
        },
        setData: () => {

        }
    }));
    return (
        <div style={{ height: "100%", width: "100%" }}>
            {value && <Workbook ref={excelRef} data={Array.isArray(value) ? value : [value] || [{}]} />}
        </div>
    )
})
export default Excel