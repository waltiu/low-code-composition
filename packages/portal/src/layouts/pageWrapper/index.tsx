import { FC } from "react"
import classNames from "classnames"
import styles from './index.module.less'

type PageWrapperPropsType={
    children:React.ReactNode,
    hasBg?:boolean
}
const PageWrapper:FC<PageWrapperPropsType> =({children,hasBg=true})=>{
    return <div className={classNames(styles.page,hasBg&&styles["has-bg"])}>{children}</div>
}
export default PageWrapper