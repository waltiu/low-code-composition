import useTemplates from "@/hooks/useTemplate"
import PageWrapper from "@/layouts/pageWrapper"
import styles from './index.module.less'
import { getProjectInfoByType } from "../project/constant"
import { TemplateItemType } from "../project/type"
import Logo from '@/layouts/logo.png'
import { Button, message } from "antd"
import { generateUUID } from "@/utils"
import { useState } from "react"
import Edit from "./Edit"
import EditorModal from "../components/EditorModal"

const Material = () => {
    const [templates, setTemplates] = useTemplates()
    const onPriview = (projectItem: TemplateItemType) => {
        window.open(`${window.location.origin}/preview?id=${projectItem.id}&type=${projectItem.type}`)
    }
    const [templateRecord, setTemplateRecord] = useState<TemplateItemType | null>(null);
    const [editorRecord,setEditorRecord]=useState<TemplateItemType|null>(null)

    const onSave = (data?: TemplateItemType) => {
        if(data){
            const newList =(templates[data.type as string]||[])
            const newTemplate={
                ...data,
                id:generateUUID(),
                updateTime:new Date().toLocaleString()
            }
            newList.push(newTemplate)
            let newTemplates={
                ...templates,
                [data.type as string]:newList
            }
            setTemplates(newTemplates)
            setTemplateRecord(null)
            message.success("保存成功！")
        }else{
            setTemplateRecord(null)
        }
    };


    const onSaveTemplateSchema=(data?:TemplateItemType)=>{
        if(data){
            const newList =(templates[data.type as string]||[])
            const oldIndex=newList.findIndex(item=>item.id===data.id)
            newList[oldIndex]=data
            let newTemplates={
                ...templates,
                [data.type as string]:newList
            }
            setTemplates(newTemplates)
            setEditorRecord(null)
            message.success("保存成功！")

        }else{
            setEditorRecord(null)
        }
    }


    return <PageWrapper hasBg={false}>
        <div className={styles.templates}>
            <Button className={styles['add-template']} type="primary" onClick={() => setTemplateRecord({})}>新建模板</Button>
            {
                Object.entries(templates).map(([type, projects]) => {
                    const label = getProjectInfoByType(type)?.title
                    return <div key={type} className={styles.module}>
                        <div className={styles.label}>
                            {label} <span className={styles.count}>{projects.length}</span>
                        </div>
                        <div className={styles.details}>
                            {
                                (projects as TemplateItemType[]).map(projectItem => {
                                    return <div key={projectItem.id} className={styles['project-item']} onClick={() => {
                                        setEditorRecord(projectItem)
                                        // onPriview(projectItem)
                                    }}>
                                        <div className={styles.header}>
                                            <img src={projectItem.icon || Logo} className={styles.icon} />
                                            <div className={styles.title}>
                                                <div className={styles.name}>{projectItem.name}</div>
                                                <div className={styles.author}>{projectItem.author || 'jzn'}</div>
                                            </div>
                                        </div>
                                        <div className={styles.desc}>
                                            {projectItem.desc || "暂无该模板的相关描述，抓紧添加一些吧！"}
                                        </div>
                                        <div className={styles.tags}>
                                            <div className={styles['tag-item']}>某项目专用</div>
                                            {(projectItem.tags || []).map(tagItem => {
                                                return <div className={styles['tag-item']}>{tagItem}</div>
                                            })}
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                })
            }</div>
            <Edit editRecord={templateRecord as TemplateItemType} onSave={onSave}/>
            <EditorModal editRecord={editorRecord as TemplateItemType} onSave={onSaveTemplateSchema}/>
    </PageWrapper>
}
export default Material