import './ViewPaste.css'
import React from 'react'
import { useParams, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const ViewPaste = () => {
  const { id } = useParams();
  const allpastes = useSelector((state) => state.paste.pastes);
  const paste = allpastes.find((p) => p._id === id);

  if (!paste) {
    return (
      <div className="view-paste-page animate-fade-up" style={{ textAlign: 'center', paddingTop: 80 }}>
        <div className="empty-icon" style={{ margin: '0 auto 20px' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Paste not found</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>This paste may have been deleted.</p>
        <NavLink to="/pastes" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-flex' }}>
          ← Back to Pastes
        </NavLink>
      </div>
    );
  }

  const formatDate = (iso) => {
    if (!iso) return '';
    return new Date(iso).toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });
  };

  const charCount = paste.content?.length || 0;
  const lineCount = paste.content ? paste.content.split('\n').length : 0;

  const handleCopy = () => {
    navigator.clipboard.writeText(paste.content || '');
    toast.success('Copied to clipboard!');
  };

  return (
    <div className="view-paste-page animate-fade-up">
      {/* Back */}
      <NavLink to="/pastes" className="view-back-btn">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
        Back to Pastes
      </NavLink>

      {/* Header */}
      <div className="view-header">
        <div className="view-header-left">
          <div className="view-read-only-badge">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            Read Only
          </div>
          <h1 className="view-title">{paste.title || 'Untitled Paste'}</h1>
          <div className="view-meta">
            <span>Created {formatDate(paste.createdAt)}</span>
            <span className="view-meta-dot" />
            <span>{charCount} characters</span>
            <span className="view-meta-dot" />
            <span>{lineCount} lines</span>
          </div>
        </div>

        <div className="view-actions">
          <NavLink to={`/?pasteId=${paste._id}`} style={{ textDecoration: 'none' }}>
            <button className="btn-secondary">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
              Edit
            </button>
          </NavLink>
          <button
            className="btn-primary"
            onClick={handleCopy}
            style={{ padding: '8px 18px', fontSize: '13px' }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
            Copy
          </button>
        </div>
      </div>

      {/* Code Card */}
      <div className="view-code-card">
        <div className="view-code-topbar">
          <div className="view-code-dots">
            <span className="view-code-dot" />
            <span className="view-code-dot" />
            <span className="view-code-dot" />
          </div>
          <span className="view-code-label">Plain Text · Read Only</span>
        </div>

        <textarea
          className="view-textarea"
          value={paste.content || ''}
          readOnly
          rows={Math.max(lineCount + 2, 16)}
          spellCheck={false}
        />

        <div className="view-code-footer">
          <div className="view-footer-stats">
            <span>{charCount} characters</span>
            <span>·</span>
            <span>{lineCount} lines</span>
          </div>
          <span>PasteIt</span>
        </div>
      </div>
    </div>
  )
}

export default ViewPaste
