import MonacoEditor from 'react-monaco-editor'
import { useFetchLanguages } from '../../hooks/useFetchLanguages'
import './Index.scss'

const Editor = () => {
  const LANGUAGES = useFetchLanguages()
  console.log(LANGUAGES)
  console.log(typeof (LANGUAGES))

  return (
    <div className="editor">
      <div className="select-bar">
        <div className="code-view">
          <select className="select">
            {Object.keys(LANGUAGES).map((item, index) => (
              <option key={index}>{item}</option>
            ))}
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
          language="cpp"
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
