import { useState, useEffect, useRef } from 'react'
import './ConsentPanel.css'

function Popup({ term, definition, anchorEl, onClose }) {
  const popupRef = useRef(null)

  const pos = (() => {
    if (!anchorEl) return { top: 0, left: 0 }
    const rect = anchorEl.getBoundingClientRect()
    const popupWidth = 260
    let left = rect.left
    let top = rect.bottom + 8
    if (left + popupWidth > window.innerWidth - 12) {
      left = window.innerWidth - popupWidth - 12
    }
    return { top, left }
  })()

  useEffect(() => {
    const handleClick = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [onClose])

  return (
    <div
      ref={popupRef}
      className="popup"
      style={{ top: pos.top, left: pos.left }}
    >
      <span className="popup-term">{term}</span>
      <span className="popup-def">
        {typeof definition === 'object' ? definition.definition : definition}
      </span>
    </div>
  )
}

function renderSegment(text, jargonData, onHighlightClick, activePopup, segIndex) {
  const parts = text.split(/__(.*?)__/g)

  return parts.map((part, i) => {
    if (i % 2 === 1) {
      const entry = jargonData
        ? Object.entries(jargonData).find(
            ([key]) => key.toLowerCase() === part.toLowerCase()
          )
        : null
      const definition = entry?.[1]
      const popupId = `${part}-${segIndex}-${i}`

      return (
        <span key={i} className="highlight-wrap">
          <span
            className={`highlight ${definition ? 'highlight-clickable' : ''}`}
            onClick={(e) => {
              if (!definition) return
              onHighlightClick(activePopup?.id === popupId ? null : { id: popupId, term: part, definition, el: e.currentTarget })
            }}
          >
            {part}
          </span>
        </span>
      )
    }
    return <span key={i}>{part}</span>
  })
}

function renderText(text, jargonData, onHighlightClick, activePopup, sectionIndex) {
  const trimmed = text.trim()

  if (trimmed.startsWith('*')) {
    const items = trimmed.split(/\n?\s*\*\s+/).filter(Boolean)
    return (
      <ul className="panel-list">
        {items.map((item, i) => (
          <li key={i} className="panel-list-item">
            {renderSegment(item.trim(), jargonData, onHighlightClick, activePopup, `${sectionIndex}-${i}`)}
          </li>
        ))}
      </ul>
    )
  }

  return (
    <p className="panel-text">
      {renderSegment(trimmed, jargonData, onHighlightClick, activePopup, sectionIndex)}
    </p>
  )
}

export default function ConsentPanel({ title, paragraphs, jargonData, isPlain }) {
  const [activePopup, setActivePopup] = useState(null)

  return (
    <div className={`panel ${isPlain ? 'panel-plain' : ''}`}>
      <h2 className="panel-title">{title}</h2>
      <div className="panel-body">
        {paragraphs.map((section, i) => {
          if (section && typeof section === 'object' && section.title) {
            return (
              <div key={i} className="panel-section">
                <h3 className="section-title">{section.title}</h3>
                {renderText(section.text || '', jargonData, setActivePopup, activePopup, i)}
              </div>
            )
          }
          return (
            <div key={i}>
              {renderText(typeof section === 'string' ? section : '', jargonData, setActivePopup, activePopup, i)}
            </div>
          )
        })}
      </div>

      {activePopup && (
        <Popup
          term={activePopup.term}
          definition={activePopup.definition}
          anchorEl={activePopup.el}
          onClose={() => setActivePopup(null)}
        />
      )}
    </div>
  )
}
