import { useState } from 'react'
import PhotoGallery from './components/PhotoGallery'
import Lightbox from './components/Lightbox'
import { photos } from './data/photos'
import './App.css'

function App() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)

  const handlePhotoClick = (index: number) => {
    setSelectedPhoto(index)
  }

  const handleClose = () => {
    setSelectedPhoto(null)
  }

  const handlePrevious = () => {
    if (selectedPhoto !== null && selectedPhoto > 0) {
      setSelectedPhoto(selectedPhoto - 1)
    }
  }

  const handleNext = () => {
    if (selectedPhoto !== null && selectedPhoto < photos.length - 1) {
      setSelectedPhoto(selectedPhoto + 1)
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>France 2024</h1>
        <p>A journey through the beauty of France</p>
      </header>

      <PhotoGallery photos={photos} onPhotoClick={handlePhotoClick} />

      {selectedPhoto !== null && (
        <Lightbox
          photo={photos[selectedPhoto]}
          onClose={handleClose}
          onPrevious={selectedPhoto > 0 ? handlePrevious : undefined}
          onNext={selectedPhoto < photos.length - 1 ? handleNext : undefined}
        />
      )}
    </div>
  )
}

export default App
