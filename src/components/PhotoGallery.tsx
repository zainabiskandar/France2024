import { Photo } from '../types'
import './PhotoGallery.css'

interface PhotoGalleryProps {
  photos: Photo[]
  onPhotoClick: (index: number) => void
}

function PhotoGallery({ photos, onPhotoClick }: PhotoGalleryProps) {
  return (
    <div className="gallery-container">
      <div className="gallery-grid">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className="gallery-item"
            onClick={() => onPhotoClick(index)}
          >
            <img src={photo.url} alt={photo.title} loading="lazy" />
            <div className="gallery-item-overlay">
              <h3>{photo.title}</h3>
              <p>{photo.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PhotoGallery
