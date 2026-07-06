import React, { useState } from 'react'
import './Paste.css'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPaste } from "../redux/PasteSLice";
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerms, setsearchTerms] = useState('');
  const dispatch = useDispatch();

  function handleDelete(pasteId) {
    dispatch(removeFromPaste(pasteId));
  }

  const handleShare = async (paste) => {
    try {
      await navigator.share({
        title: paste.title || 'Shared Paste',
        text: paste.content,
        url: window.location.href,
      });
    } catch (err) {
      toast.error('Sharing failed or cancelled');
    }
  };

  const handleCopy = (content) => {
    navigator.clipboard.writeText(content);
    toast.success('Copied to clipboard!');
  };

  const formatDate = (iso) => {
    if (!iso) return '';
    return new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  };

  const getInitials = (title) => {
    if (!title) return '#';
    return title.trim().charAt(0).toUpperCase();
  };

  const filterData = pastes.filter(
    (paste) => paste.title.toLowerCase().includes(searchTerms.toLowerCase())
  );

  return (
    <div className="pastes-page animate-fade-up">
      {/* Header */}
      <div className="pastes-header">
        <div className="pastes-header-left">
          <h2>
            My Pastes
            <span className="pastes-count-badge">{filterData.length}</span>
          </h2>
          <p>All your saved pastes, searchable and ready to use.</p>
        </div>
      </div>

      {/* Search */}
      <div className="search-wrapper">
        <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          className="search-input"
          type="search"
          placeholder="Search pastes by title..."
          value={searchTerms}
          onChange={(e) => setsearchTerms(e.target.value)}
        />
      </div>

      {/* Empty State */}
      {filterData.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
          </div>
          <h3>{searchTerms ? 'No pastes found' : 'No pastes yet'}</h3>
          <p>
            {searchTerms
              ? `No results for "${searchTerms}". Try a different search.`
              : 'Create your first paste to get started.'}
          </p>
          <NavLink to="/" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-flex' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Create New Paste
          </NavLink>
        </div>
      )}

      {/* Cards Grid */}
      <div className="pastes-grid">
        {filterData.map((paste, index) => (
          <div
            className="paste-card"
            key={paste._id}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {/* Card Header */}
            <div className="paste-card-header">
              <div className="paste-card-title-row">
                <div className="paste-card-avatar">
                  {getInitials(paste.title)}
                </div>
                <div className="paste-card-info">
                  <div className="paste-card-title">{paste.title || 'Untitled'}</div>
                  <div className="paste-card-date">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    {formatDate(paste.createdAt)}
                  </div>
                </div>
              </div>
            </div>

            {/* Content Preview */}
            <div className="paste-card-content">
              {paste.content || <span style={{ opacity: 0.4, fontStyle: 'italic' }}>No content</span>}
            </div>

            {/* Actions */}
            <div className="paste-card-actions">
              <NavLink to={`/?pasteId=${paste._id}`}>
                <button className="action-btn action-btn-edit">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                  Edit
                </button>
              </NavLink>

              <NavLink to={`/pastes/${paste._id}`}>
                <button className="action-btn action-btn-view">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  View
                </button>
              </NavLink>

              <button className="action-btn action-btn-copy" onClick={() => handleCopy(paste.content)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>
                Copy
              </button>

              <button className="action-btn action-btn-share" onClick={() => handleShare(paste)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="5" r="3"/>
                  <circle cx="6" cy="12" r="3"/>
                  <circle cx="18" cy="19" r="3"/>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                </svg>
                Share
              </button>

              <button className="action-btn action-btn-delete" onClick={() => handleDelete(paste._id)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                  <path d="M10 11v6"/>
                  <path d="M14 11v6"/>
                  <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                </svg>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Paste
