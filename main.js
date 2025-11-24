const photos = [
  {
    url: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Eiffel Tower at sunset',
    location: 'Paris'
  },
  {
    url: 'https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Arc de Triomphe',
    location: 'Paris'
  },
  {
    url: 'https://images.pexels.com/photos/2097616/pexels-photo-2097616.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Louvre Museum',
    location: 'Paris'
  },
  {
    url: 'https://images.pexels.com/photos/1796730/pexels-photo-1796730.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Seine River view',
    location: 'Paris'
  },
  {
    url: 'https://images.pexels.com/photos/1461974/pexels-photo-1461974.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Montmartre streets',
    location: 'Paris'
  },
  {
    url: 'https://images.pexels.com/photos/2422461/pexels-photo-2422461.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'French countryside',
    location: 'Provence'
  },
  {
    url: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Notre-Dame',
    location: 'Paris'
  },
  {
    url: 'https://images.pexels.com/photos/2104152/pexels-photo-2104152.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Versailles Palace',
    location: 'Versailles'
  },
  {
    url: 'https://images.pexels.com/photos/1308940/pexels-photo-1308940.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'French Riviera coast',
    location: 'Nice'
  },
  {
    url: 'https://images.pexels.com/photos/2422461/pexels-photo-2422461.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Wine vineyards',
    location: 'Bordeaux'
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
    this.init();
  }

  init() {
    this.createGallery();
    this.setupLightbox();
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

  createGallery() {
    const view = document.createElement('div');
    view.className = 'gallery-view';

    const leftStack = this.createStack(photos.slice(0, 30), 'stack-left');
    const rightStack = this.createStack(photos.slice(0, 30), 'stack-right');
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
      card.style.left = `${index * 3}px`;
      card.style.transform = `translateZ(${-index * 2}px)`;

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
      this.openLightbox(photos[this.currentFeatured]);
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
      this.currentFeatured = (this.currentFeatured + 1) % photos.length;
      this.updateFeatured();
    }, 4000);
  }

  updateFeatured() {
    const featured = document.getElementById('featured');
    const caption = document.getElementById('featured-caption');
    const photo = photos[this.currentFeatured];

    featured.style.opacity = '0';

    setTimeout(() => {
      const img = featured.querySelector('img');
      img.src = photo.url;
      img.alt = photo.caption;
      caption.innerHTML = `${photo.caption}<div class="featured-location">${photo.location}, France</div>`;
      featured.style.opacity = '1';
    }, 400);
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
