import { useState, useMemo } from 'react'
import { photos } from './data/photos'
import './App.css'

function App() {
  const [selectedPhoto, setSelectedPhoto] = useState<number>(10)
  const [activeTag, setActiveTag] = useState<string>('all')
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const allTags = useMemo(() => {
    const tags = new Set<string>()
    tags.add('all')
    photos.forEach(photo => {
      photo.tags.forEach(tag => tags.add(tag))
    })
    return Array.from(tags)
  }, [])

  const filteredPhotos = useMemo(() => {
    if (activeTag === 'all') return photos
    return photos.filter(photo => photo.tags.includes(activeTag))
  }, [activeTag])

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }) + '\n' + date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    })
  }

  const leftStackPhotos = filteredPhotos.slice(0, Math.floor(filteredPhotos.length / 2))
  const rightStackPhotos = filteredPhotos.slice(Math.floor(filteredPhotos.length / 2))

  return (
    <div className="app-3d">
      <div className="timestamp">
        {formatTimestamp(photos[selectedPhoto].timestamp)}
      </div>

      <div className="title-label">every : France 2024</div>

      <div className="photo-stacks-container">
        <div className="photo-stack left-stack">
          {leftStackPhotos.map((photo, index) => (
            <div
              key={photo.id}
              className={`photo-card ${hoveredIndex === index ? 'hovered' : ''}`}
              style={{
                transform: `translateZ(${index * -2}px) translateX(${index * 0.5}px)`,
                zIndex: leftStackPhotos.length - index
              }}
              onClick={() => setSelectedPhoto(photos.indexOf(photo))}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img src={photo.url} alt={photo.title} loading="lazy" />
            </div>
          ))}
        </div>

        <div className="center-preview">
          <div className="preview-card">
            <img
              src={photos[selectedPhoto].url}
              alt={photos[selectedPhoto].title}
            />
            <div className="preview-info">
              <h2>{photos[selectedPhoto].title}</h2>
              <p>{photos[selectedPhoto].location}</p>
            </div>
          </div>
        </div>

        <div className="photo-stack right-stack">
          {rightStackPhotos.map((photo, index) => (
            <div
              key={photo.id}
              className={`photo-card ${hoveredIndex === (index + leftStackPhotos.length) ? 'hovered' : ''}`}
              style={{
                transform: `translateZ(${index * -2}px) translateX(${-index * 0.5}px)`,
                zIndex: rightStackPhotos.length - index
              }}
              onClick={() => setSelectedPhoto(photos.indexOf(photo))}
              onMouseEnter={() => setHoveredIndex(index + leftStackPhotos.length)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img src={photo.url} alt={photo.title} loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      <div className="filter-tags">
        {allTags.map(tag => (
          <button
            key={tag}
            className={`tag ${activeTag === tag ? 'active' : ''}`}
            onClick={() => setActiveTag(tag)}
          >
            {tag}
            <sup>{activeTag === tag ? 'on' : 'off'}</sup>
          </button>
        ))}
      </div>

      <div className="control-icons">
        <button className="icon-btn" aria-label="Grid view">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
        </button>
        <button className="icon-btn" aria-label="Share">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
        </button>
        <button className="icon-btn" aria-label="Info">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default App
