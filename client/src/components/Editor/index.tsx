import MonacoEditor from '@monaco-editor/react'
import './Index.scss'
import React from 'react'
import { LanguageContext } from '../../context/LanguageContext'
import { AuthContext } from '../../context/AuthContext'
import { Avatar, Box, Icon, IconButton, Tooltip } from '@mui/material'

const Editor = () => {
  const LanuguageRef = React.useRef<any>(null)

  const { LANGUAGES, setLanguage, language } = React.useContext<any>(LanguageContext)
  const { userData } = React.useContext<any>(AuthContext)

  const blob = new Blob([userData.image], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)

  return (
    <div className="editor">
      <div className="select-bar">
        <div className="code-view">
          <select
            className="select"
            ref={LanuguageRef}
            onChange={(e) => {
              setLanguage((e.target.value).toLowerCase())
              console.log(language)
            }}
          >
            {Object.keys(LANGUAGES).map((key, index) => (
              <option key={index}>{LANGUAGES[key]}</option>
            ))}
          </select>
          <button className="button">
            <i className="fa fa-play"></i>
          </button>
        </div>

        <div className="theme">
          <IconButton>X</IconButton>
          <IconButton>X</IconButton>
          <IconButton>X</IconButton>
          <IconButton>X</IconButton>
        </div>

        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Profile Summary">
            <IconButton
              sx={{ textTransform: 'uppercase', height: 50, width: 50 }}
            >
              <Avatar
                alt={`${userData.first_name} ${userData.last_name}`}
                src={url}
              />
            </IconButton>
          </Tooltip>
        </Box>
      </div>

      <div className="code-editor">
        <MonacoEditor
          theme="vs-dark"
          language={language}
          height="90vh"
          width="75vw"
        />

        <div className="terminal">
          <div className="t-1">
            <h1 className="heading">Output Terminal</h1>
            <div className="output">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore,
            </div>
          </div>

          <div className="t-2">
            <h1 className="heading">Input Terminal</h1>
            <div className="output">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.o. Sunt,
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Editor
