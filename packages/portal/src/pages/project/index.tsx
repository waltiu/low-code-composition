import { Tabs } from 'antd';
import {
  PROJECT_TYPE_BI,
  PROJECT_TYPE_EXCEL,
  PROJECT_TYPE_FLOW,
  PROJECT_TYPE_PAGE,
  PROJECT_TYPE_SITE,
  getProjectTypes,
} from './constant';
import { useState } from 'react';
import Site from './sites';
import List from './components/list'
import styles from './index.module.less'
import PageWrapper from '@/layouts/pageWrapper';

const Project = () => {
  const projects = getProjectTypes();
  const [projectType, setProjectType] = useState(PROJECT_TYPE_PAGE);
  return (
    <PageWrapper>
      <div className={styles.project}>
        <Tabs
          activeKey={projectType}
          items={projects}
          onChange={(e) => {
            setProjectType(e);
          }}
        />
        <div className={styles.content}>
          {(projectType === PROJECT_TYPE_PAGE
            || projectType === PROJECT_TYPE_EXCEL
            || projectType === PROJECT_TYPE_FLOW || projectType === PROJECT_TYPE_BI) && <List type={projectType} />}
          {projectType === PROJECT_TYPE_SITE && <Site />}
        </div>

      </div>
    </PageWrapper>
  );
};
export default Project;
