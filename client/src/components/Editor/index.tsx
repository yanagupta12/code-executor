import MonacoEditor from 'react-monaco-editor'
import { useFetchLanguages } from '../../hooks/useFetchLanguages'
import React from 'react'
import './Index.scss'

const Editor = () => {
  const languages = useFetchLanguages()
  const [language, setLanguage] = React.useState<string>('')

  return (
    <div className="editor">
      <div className="select-bar">
        <div className='code-view'> 
          <select className="select">
            <option value="1">Americano</option>
            <option value="2">Latte</option>
            <option value="3">Green Tea</option>
          </select>

          <button className="button">
            <i className="fa fa-play"></i>
          </button>
        </div>

        <div className="theme">
          <div>theme1</div>
          <div>theme2</div>
        </div>
      </div>

      <div className="code-editor">
        <MonacoEditor
          theme="vs-dark"
          language="javascript"
          height="90vh"
          width="75vw"
        />
        <div className="terminal">
          <div className="t-1">
            <h1 className="heading">Output Terminal</h1>
            <div className="output"></div>
          </div>
          <div className="t-2">
            <h1 className="heading">Input Terminal</h1>
            <div className="output"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Editor
