import MonacoEditor from '@monaco-editor/react'
import './Index.scss'
import React, { useEffect, useState } from 'react'
import { LanguageContext } from '../../context/LanguageContext'
import { AuthContext } from '../../context/AuthContext'
import { CodeContext } from '../../context/CodeContext'
import { Avatar, Box, IconButton, Tooltip } from '@mui/material'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import { Link } from 'react-router-dom'
import { deepOrange } from '@mui/material/colors'

function getKeyByValue<T>(
  object: Record<string, T>,
  value: T
): string | undefined {
  for (const key in object) {
    if (
      Object.prototype.hasOwnProperty.call(object, key) &&
      object[key] === value
    ) {
      return key
    }
  }
}

const Editor = () => {
  const LanuguageRef = React.useRef<any>(null)
  const editorRef = React.useRef<any>(null)

  function handleEditorDidMount(editor: any) {
    editorRef.current = editor
  }

  const {
    LANGUAGES,
    setLanguage,
    language,
    languageCode,
    setLanguageCode,
    response,
    setResponse,
  } = React.useContext<any>(LanguageContext)
  const { userData, auth } = React.useContext<any>(AuthContext)
  const { code, setCode } = React.useContext<any>(CodeContext)

  const [stdout, setStdout] = useState<string>('')
  const [stderr, setStderr] = useState<string>('')

  useEffect(() => {
    // console.log(languageCode)
    // console.log(LanuguageRef.current.value)
    if (language.toLowerCase() == 'java')
      return alert('Please use Main class only for java')
  }, [response, language, languageCode])

  // To get the image of user from the database, the image is in svg format
  const blob = new Blob([userData.image], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)

  const handleSubmit = async () => {
    if (!editorRef.current || language == '') {
      alert('Please Select a Language')
      return
    }
    if (editorRef.current) {
      const data = {
        source_code: code,
        language_code: languageCode,
      }

      try {
        const response = await fetch('http://localhost:8000/code/execute/', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }).then((res) => res.json())

        setResponse(response)

        setStdout(
          response.result.split('\n').map((line: any, index: number) => {
            return (
              <React.Fragment key={index}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: line.replace(/ /g, '&nbsp;') + '&nbsp;',
                  }}
                />
              </React.Fragment>
            )
          })
        )

        setStderr(
          response.error.split('\n').map((line: any, index: number) => {
            return (
              <React.Fragment key={index}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: line.replace(/ /g, '&nbsp;'),
                  }}
                />
              </React.Fragment>
            )
          })
        )
      } catch (error) {
        console.error('An error occurred:', error)
      }
    }
  }

  return (
    <div className="editor">
      <div className="select-bar">
        <div className="code-view">
          <Tooltip title="Go to home">
            <Link className="link" to="/">
              <i className="fas fa-angle-left"></i>
            </Link>
          </Tooltip>
          <select
            className="select"
            ref={LanuguageRef}
            placeholder="Select Language"
            defaultChecked={language}
            onChange={(e) => {
              setLanguageCode(
                getKeyByValue(LANGUAGES, e.target.value.toLowerCase())
              )
              setLanguage(e.target.value.toLowerCase())
            }}
          >
            {Object.keys(LANGUAGES).map((key, index) => (
              <option key={index}>
                {LANGUAGES[key].charAt(0).toUpperCase() +
                  LANGUAGES[key].slice(1)}
              </option>
            ))}
          </select>

          <div className="language">
            {language ? language.toUpperCase() : 'Language Not Selected'}
          </div>

          {/* Submit Button  */}
          <div className="buttons">
            <Tooltip title="Run Code">
              <button className="button" onClick={() => handleSubmit()}>
                <i className="fa fa-play"></i>
              </button>
            </Tooltip>
          </div>
        </div>

        <div className="theme">
          <IconButton>
            <FiberManualRecordIcon sx={{ color: 'green' }} />
          </IconButton>
          <IconButton>
            <FiberManualRecordIcon sx={{ color: 'red' }} />
          </IconButton>
          <IconButton>
            <FiberManualRecordIcon sx={{ color: 'yellow' }} />
          </IconButton>
          <IconButton>
            <FiberManualRecordIcon sx={{ color: 'blue' }} />
          </IconButton>
        </div>

        {auth && (
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Profile Summary">
              <IconButton
                sx={{ textTransform: 'uppercase', height: 50, width: 50 }}
              >
                <Avatar
                  alt={`${userData.first_name} ${userData.last_name}`}
                  src={url}
                  sx={{
                    width: 50,
                    height: 50,
                    bgcolor: deepOrange[500],
                  }}
                />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </div>

      <div className="code-editor">
        <MonacoEditor
          theme="vs-dark"
          language={language}
          height="90vh"
          width="75vw"
          onMount={handleEditorDidMount}
          onChange={(value) => setCode(value)}
        />

        <div className="terminal">
          <div className="t-1">
            <h1 className="heading">Output Terminal</h1>
            <div className="output">
              <br />
              {stdout}
              <div className="error">{stderr}</div>
            </div>
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
