const photos = [
  {
    url: 'https://images.pexels.com/photos/2132126/pexels-photo-2132126.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Bordeaux vineyard estate',
    location: 'Bordeaux',
    tags: ['bordeaux', 'countryside']
  },
  {
    url: 'https://images.pexels.com/photos/1456291/pexels-photo-1456291.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Wine barrels in cellar',
    location: 'Bordeaux',
    tags: ['bordeaux', 'countryside']
  },
  {
    url: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Eiffel Tower at dusk',
    location: 'Paris',
    tags: ['paris', 'architecture']
  },
  {
    url: 'https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Arc de Triomphe night',
    location: 'Paris',
    tags: ['paris', 'architecture']
  },
  {
    url: 'https://images.pexels.com/photos/2079438/pexels-photo-2079438.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Old Port of Marseille',
    location: 'Marseille',
    tags: ['marseille', 'port']
  },
  {
    url: 'https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Marseille harbor boats',
    location: 'Marseille',
    tags: ['marseille', 'port']
  },
  {
    url: 'https://images.pexels.com/photos/2422461/pexels-photo-2422461.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Provence countryside',
    location: 'Provence',
    tags: ['countryside', 'provence']
  },
  {
    url: 'https://images.pexels.com/photos/1630031/pexels-photo-1630031.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Rural French village',
    location: 'Provence',
    tags: ['countryside', 'provence']
  },
  {
    url: 'https://images.pexels.com/photos/2901215/pexels-photo-2901215.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Normandy coastal cliffs',
    location: 'Normandy',
    tags: ['normandy', 'coast']
  },
  {
    url: 'https://images.pexels.com/photos/220426/pexels-photo-220426.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Mont Saint-Michel',
    location: 'Normandy',
    tags: ['normandy', 'coast', 'architecture']
  },
  {
    url: 'https://images.pexels.com/photos/2097616/pexels-photo-2097616.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Louvre Museum pyramid',
    location: 'Paris',
    tags: ['paris', 'architecture']
  },
  {
    url: 'https://images.pexels.com/photos/1796730/pexels-photo-1796730.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Seine River bridges',
    location: 'Paris',
    tags: ['paris', 'architecture']
  },
  {
    url: 'https://images.pexels.com/photos/1461974/pexels-photo-1461974.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Montmartre cobblestone',
    location: 'Paris',
    tags: ['paris', 'architecture']
  },
  {
    url: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Notre-Dame Cathedral',
    location: 'Paris',
    tags: ['paris', 'architecture']
  },
  {
    url: 'https://images.pexels.com/photos/2739664/pexels-photo-2739664.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Lavender fields sunset',
    location: 'Provence',
    tags: ['countryside', 'provence']
  },
  {
    url: 'https://images.pexels.com/photos/208733/pexels-photo-208733.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Chateau de Chambord',
    location: 'Loire Valley',
    tags: ['countryside', 'architecture']
  }
];

class GalleryManager {
  constructor() {
    this.container = document.getElementById('gallery-container');
    this.lightbox = document.getElementById('lightbox');
    this.lightboxImage = document.querySelector('.lightbox-image');
    this.lightboxCaption = document.querySelector('.lightbox-caption');
    this.lightboxClose = document.querySelector('.lightbox-close');
    this.timestampEl = document.getElementById('timestamp');

    this.currentFeatured = 0;
    this.currentFilter = 'all';
    this.filteredPhotos = [...photos];
    this.init();
  }

  init() {
    this.createGallery();
    this.setupLightbox();
    this.setupFilters();
    this.updateTimestamp();
    this.startRotation();
    setInterval(() => this.updateTimestamp(), 1000);
  }

  updateTimestamp() {
    const now = new Date();
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'];
    const month = months[now.getMonth()];
    const day = now.getDate();
    const year = now.getFullYear();

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;

    this.timestampEl.innerHTML = `${month} ${day}, ${year}<br>${String(hours).padStart(2, '0')}:${minutes}:${seconds} <span class="am">${ampm}</span>`;
  }

  setupFilters() {
    const categories = document.querySelectorAll('.category');

    categories.forEach(cat => {
      cat.addEventListener('click', () => {
        const filter = cat.dataset.filter;

        if (filter) {
          categories.forEach(c => c.classList.remove('active'));
          cat.classList.add('active');

          this.applyFilter(filter);
        }
      });
    });
  }

  applyFilter(filter) {
    this.currentFilter = filter;

    if (filter === 'all') {
      this.filteredPhotos = [...photos];
    } else {
      this.filteredPhotos = photos.filter(photo =>
        photo.tags.includes(filter.toLowerCase())
      );
    }

    this.currentFeatured = 0;
    this.updateGalleryVisibility();
    this.updateFeatured();
  }

  updateGalleryVisibility() {
    const allCards = document.querySelectorAll('.image-card');

    allCards.forEach((card, index) => {
      const photo = photos[index];

      if (this.currentFilter === 'all' || photo.tags.includes(this.currentFilter.toLowerCase())) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  }

  createGallery() {
    const view = document.createElement('div');
    view.className = 'gallery-view';

    const leftStack = this.createStack(photos, 'stack-left');
    const rightStack = this.createStack(photos, 'stack-right');
    const featured = this.createFeaturedSection();

    view.appendChild(leftStack);
    view.appendChild(featured);
    view.appendChild(rightStack);

    this.container.appendChild(view);
  }

  createStack(photoList, className) {
    const stack = document.createElement('div');
    stack.className = `image-stack ${className}`;

    photoList.forEach((photo, index) => {
      const card = document.createElement('div');
      card.className = 'image-card';
      card.style.left = `${index * 2.5}px`;
      card.style.transform = `translateZ(${-index * 1.5}px)`;
      card.dataset.index = index;

      const img = document.createElement('img');
      img.src = photo.url;
      img.alt = photo.caption;

      const label = document.createElement('div');
      label.className = 'card-label';
      label.innerHTML = `${photo.caption}<div class="card-location">${photo.location}</div>`;

      card.appendChild(img);
      card.appendChild(label);

      card.addEventListener('click', () => {
        this.openLightbox(photo);
      });

      stack.appendChild(card);
    });

    return stack;
  }

  createFeaturedSection() {
    const section = document.createElement('div');
    section.className = 'featured-section';

    const featured = document.createElement('div');
    featured.className = 'featured-image';
    featured.id = 'featured';

    const img = document.createElement('img');
    img.src = photos[0].url;
    img.alt = photos[0].caption;

    featured.appendChild(img);

    featured.addEventListener('click', () => {
      this.openLightbox(this.filteredPhotos[this.currentFeatured]);
    });

    const caption = document.createElement('div');
    caption.className = 'featured-caption';
    caption.id = 'featured-caption';
    caption.innerHTML = `${photos[0].caption}<div class="featured-location">${photos[0].location}, France</div>`;

    section.appendChild(featured);
    section.appendChild(caption);

    return section;
  }

  startRotation() {
    setInterval(() => {
      if (this.filteredPhotos.length > 0) {
        this.currentFeatured = (this.currentFeatured + 1) % this.filteredPhotos.length;
        this.updateFeatured();
      }
    }, 5000);
  }

  updateFeatured() {
    const featured = document.getElementById('featured');
    const caption = document.getElementById('featured-caption');
    const photo = this.filteredPhotos[this.currentFeatured];

    if (!photo) return;

    const img = featured.querySelector('img');
    img.style.opacity = '0';

    setTimeout(() => {
      img.src = photo.url;
      img.alt = photo.caption;
      caption.innerHTML = `${photo.caption}<div class="featured-location">${photo.location}, France</div>`;

      setTimeout(() => {
        img.style.opacity = '1';
      }, 50);
    }, 600);
  }

  setupLightbox() {
    this.lightboxClose.addEventListener('click', () => {
      this.closeLightbox();
    });

    this.lightbox.addEventListener('click', (e) => {
      if (e.target === this.lightbox) {
        this.closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.lightbox.classList.contains('active')) {
        this.closeLightbox();
      }
    });
  }

  openLightbox(photo) {
    this.lightboxImage.src = photo.url;
    this.lightboxImage.alt = photo.caption;
    this.lightboxCaption.textContent = `${photo.caption} — ${photo.location}, France`;
    this.lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    this.lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new GalleryManager();
});
