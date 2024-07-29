import { getCacheData as getCacheTemplateData } from "@/hooks/useTemplate"
import { getCacheData as getCacheProjectData } from "@/hooks/useProject"

import { PROJECT_TYPE_BI, PROJECT_TYPE_EXCEL, PROJECT_TYPE_FLOW, PROJECT_TYPE_PAGE } from "@/pages/project/constant"
import Excel from "@packages/excel"
import Designer from "@/pages/designer"
import Flow from "@/pages/flow"
import Bi from "@/pages/bi"

type ConstrutorMapType = {
    [key: string]: any
}




export const construtorMap: ConstrutorMapType = {
    [PROJECT_TYPE_EXCEL]: {
        com: Excel,
        getData: (id: string) => {
            const result = getCacheProjectData(PROJECT_TYPE_EXCEL, id) || getCacheTemplateData(PROJECT_TYPE_EXCEL, id)
            return result?.schema?.data || [{ name: "新增1" }]
        }
    },
    [PROJECT_TYPE_PAGE]: {
        com: Designer,
        getData: (id:string) => {
            const result = getCacheProjectData(PROJECT_TYPE_PAGE, id) || getCacheTemplateData(PROJECT_TYPE_PAGE, id)
            console.log(result,'PROJECT_TYPE_PAGE')
            return JSON.stringify(result) 
        }
    },
    [PROJECT_TYPE_FLOW]: {
        com: Flow,
        getData: (id:string) => {
            const result = getCacheProjectData(PROJECT_TYPE_FLOW, id) || getCacheTemplateData(PROJECT_TYPE_FLOW, id)
            console.log(result,'PROJECT_TYPE_PAGE')
            return JSON.stringify(result?.schema?.data)
        }
    },
    [PROJECT_TYPE_BI]: {
        com: Bi,
        getData: (id:string) => {
            const result = getCacheProjectData(PROJECT_TYPE_BI, id) || getCacheTemplateData(PROJECT_TYPE_BI, id)
            console.log(result,'PROJECT_TYPE_PAGE')
            return JSON.stringify(result?.schema?.data)
        }
    }
}