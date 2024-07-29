import { generateUUID } from "@/utils";
import { PROJECT_TYPE_EXCEL } from "../pages/project/constant";
import { ProjectItemType, TemplatesType } from "../pages/project/type";
import sheetCell from '@packages/excel/templates/sheetCell'
import sheetChart from '@packages/excel/templates/sheetChart'
import sheetDataVerification from '@packages/excel/templates/sheetDataVerification'
import sheetPivotTableData from '@packages/excel/templates/sheetPivotTableData'



export const mockData:TemplatesType={
    [PROJECT_TYPE_EXCEL]:[
        {
            id: generateUUID(),
            type:PROJECT_TYPE_EXCEL,
            name: "报表1",
            updateTime: "2022-1-2",
            schema:{
                data:sheetCell
            }
        },
        {
            id: generateUUID(),
            type:PROJECT_TYPE_EXCEL,
            name: "报表2",
            updateTime: "2022-1-2",
            schema:{
                data:sheetChart
            }
        },
        {
            id: generateUUID(),
            type:PROJECT_TYPE_EXCEL,
            name: "报表3",
            updateTime: "2022-1-2",
            schema:{
                data:sheetDataVerification
            }
        },
        {
            id: generateUUID(),
            type:PROJECT_TYPE_EXCEL,
            name: "报表4",
            updateTime: "2022-1-2",
            schema:{
                data:sheetPivotTableData
            }
        }
    ]
}