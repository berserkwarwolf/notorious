import React, {useState}  from 'react';
import styled from 'styled-components';
// import SplitPane, { Pane } from 'react-split-pane';
// import SplitterLayout from 'react-splitter-layout';

import MainMenuCont from '../../containers/MainMenu/MainMenuCont';
import CounterPage from '../../containers/CounterPage/CounterPage';
const Content = styled.div`
  margin-left: 500px;
  padding: 1px 16px;
  height: 100%;
`;
import MiddleMenuCont from '../../containers/MiddleMenu/MiddleMenuCont';
import ContentAreaCont from '../../containers/ContentAreaCont/ContentAreaCont';
import { Input, Modal } from 'antd';
import { Form, Formik } from 'formik';
import isElectron from 'is-electron';
import SplitPane from 'react-split-pane';
import Pane from 'react-split-pane'

const mapStateToProps = (state) => {
  return {
    settings: state.settings
  };
}
export default function Home(props) {
  const {resizeSidebarAction, resizeMainMenuAction, resizeMiddleMenuAction, settings, saveStoreConfig, sizeMain, sizeSidebar, sizeMiddle, config, setConfig} = props
// console.log("Home", props )
const [state, setstate] = useState({sizeMain: 0, sizeMiddle: 0})
const handleSizeChange = size => {
  setstate({sizeMain: size})
}

  return (<>
  { isElectron() && config && config.db === null ? <Formik
      enableReinitialize={true}
      initialValues={{connectionString: ""}}
      validate={values => {
          const errors = {};
          // if (!values.scheme || !values.endpointUrl || !values.username || !values.password) {
          //   errors["all"] = "All fields are mandatory"
          // }
          // console.log(errors)
          return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setConfig('db', values.connectionString)
        // saveStoreConfig('db', values.connectionString)
        location.reload()
      }}
  >
    {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
    }) => (
      <Modal
        title="Connect to a server"
        visible={config.db === null}
        onOk={handleSubmit}
      >
        <p>Let's get you started with Notorious! Enter the full connection string to your CouchDB backend. Examples are shown below:</p>
        <p>https://username:password@couchdb.example.com (no trailing slash)</p>
        <p>local_data/</p>
          {errors && <p>{errors["all"]}</p> }
            <Form>
              <Input className="ant-input"
                name="connectionString"
                placeholder="https://username:password@notorious.example.com"
                value={values.connectionString}
                onChange={handleChange}
              />

            </Form>
      </Modal>
    )}
    </Formik> :<></>
  }
    {/* <SplitterLayout id={sizeMain}
      percentage={true}
      secondaryInitialSize={sizeMain}
      onSecondaryPaneSizeChange={size => {
        setstate({...state, sizeMain: size})
      }}
      onDragEnd={e=>resizeMainMenuAction(sizeMain, state.sizeMain)}
      > */}
      <SplitPane split="vertical" style={{height: "100%"}}>
        <Pane initialSize="15%" maxWidth="25%" ><MainMenuCont /></Pane>
        <Pane initialSize="20%" maxWidth="25%"><MiddleMenuCont /></Pane>
        <Pane initialSize="65%"><ContentAreaCont /></Pane>

    {/* <SplitterLayout
      percentage={true}

      id={sizeMiddle}
      secondaryInitialSize={sizeMiddle}
      onSecondaryPaneSizeChange={size => {
        setstate({...state, sizeMiddle: size})
      }}
      onDragEnd={e=>resizeMiddleMenuAction(sizeMiddle, state.sizeMiddle)}
      > */}


      {/* </SplitterLayout>
    </SplitterLayout> */}

    {/* <SplitPane  split="vertical" >
      <Pane   >
        <MainMenuCont />
      </Pane>
      <Pane  >
      <SplitPane  split="vertical" >
        <Pane  >
          <MiddleMenuCont />
        </Pane>
        <Pane  >
            <p>Main</p>
        </Pane        </SplitPane>
      </Pane>
    </SplitPane>*/}
    </SplitPane>
</>
  );
}
