import React, { useEffect, useState } from 'react'
import './Home.css'
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToPaste, updateToPaste } from '../redux/PasteSLice';

const Home = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allpastes = useSelector((state) => state.paste.pastes);

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    }
    if (pasteId) {
      dispatch(updateToPaste(paste));
    } else {
      dispatch(addToPaste(paste));
    }
    setTitle('');
    setValue('');
    setSearchParams({});
  }

  useEffect(() => {
    if (pasteId) {
      const paste = allpastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId]);

  const charCount = value.length;
  const lineCount = value ? value.split('\n').length : 0;
  const isEditing = Boolean(pasteId);

  return (
    <div className="home-page animate-fade-up">
      {/* Hero Header */}
      <div className="home-header">
        <div className="home-badge">
          <span className="home-badge-dot" />
          {isEditing ? 'Editing Paste' : 'New Paste'}
        </div>
        <h1 className="home-title">
          {isEditing ? 'Update your ' : 'Create a new '}
          <span>paste</span>
        </h1>
        <p className="home-subtitle">
          {isEditing
            ? 'Make your changes and hit update to save them.'
            : 'Write or paste your content below and save it instantly.'}
        </p>
      </div>

      {/* Editor Card */}
      <div className="editor-card">
        {/* Mac-style top bar */}
        <div className="editor-card-topbar">
          <div className="editor-dots">
            <span className="editor-dot" />
            <span className="editor-dot" />
            <span className="editor-dot" />
          </div>
          <span className="editor-lang-tag">Plain Text</span>
        </div>

        {/* Title */}
        <div className="editor-title-row">
          <div className="editor-title-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
          </div>
          <input
            className="editor-title-input"
            type="text"
            placeholder="Untitled paste..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Content */}
        <div className="editor-textarea-wrap">
          <textarea
            className="editor-textarea"
            value={value}
            placeholder="// Start typing or paste your content here..."
            onChange={(e) => setValue(e.target.value)}
            rows={14}
            spellCheck={false}
          />
        </div>

        {/* Footer */}
        <div className="editor-footer">
          <div className="editor-footer-meta">
            <span className="editor-char-count">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="4 7 4 4 20 4 20 7"/>
                <line x1="9" y1="20" x2="15" y2="20"/>
                <line x1="12" y1="4" x2="12" y2="20"/>
              </svg>
              {charCount} chars
            </span>
            <span>·</span>
            <span>{lineCount} lines</span>
          </div>

          <button
            onClick={createPaste}
            className={`btn-primary ${isEditing ? 'btn-update' : ''}`}
            disabled={!title.trim() && !value.trim()}
          >
            {isEditing ? (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                  <polyline points="17 21 17 13 7 13 7 21"/>
                  <polyline points="7 3 7 8 15 8"/>
                </svg>
                Update Paste
              </>
            ) : (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                  <polyline points="17 21 17 13 7 13 7 21"/>
                  <polyline points="7 3 7 8 15 8"/>
                </svg>
                Save Paste
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
