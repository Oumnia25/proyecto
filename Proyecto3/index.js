const ACCESS_KEY = '2p1mm-eBK-r3uo-HbbEj0xRy4g_AqVY3FqHtExeMTCg'

const header = document.createElement('header')
header.className = 'header'
const logo = document.createElement('img')
logo.src =
  'https://res.cloudinary.com/dbtc8nyvm/image/upload/v1697558137/pinterest/1200px-Pinterest.svg_lbkvwl.png'
logo.alt = 'Logo'
logo.className = 'logo'
header.appendChild(logo)

const searchArea = document.createElement('div')
searchArea.className = 'search-area'
const searchInput = document.createElement('input')
searchInput.id = 'searchInput'
searchInput.placeholder = 'Buscar imágenes...'
const searchButton = document.createElement('button')
searchButton.id = 'searchButton'
searchButton.innerText = 'Buscar'
searchArea.appendChild(searchInput)
searchArea.appendChild(searchButton)
header.appendChild(searchArea)

const imageLinks = document.createElement('section')
imageLinks.className = 'image-links'
const initialImages = [
  'https://res.cloudinary.com/dbtc8nyvm/image/upload/v1697558344/pinterest/3602145.png_kvrkls.png',
  'https://res.cloudinary.com/dbtc8nyvm/image/upload/v1730319870/message_rjjrvh.svg',
  'https://res.cloudinary.com/dbtc8nyvm/image/upload/v1697558420/pinterest/74472_dclmcc.png'
]

initialImages.forEach((src) => {
  const img = document.createElement('img')
  img.src = src
  img.alt = 'Imagen del menú'
  img.className = 'menu-image'
  imageLinks.appendChild(img)
})

header.appendChild(imageLinks)
document.body.appendChild(header)

const container = document.createElement('main')
container.className = 'container'
document.body.appendChild(container)
const mainImages = document.createElement('section')
mainImages.className = 'main-images'
container.appendChild(mainImages)

const fetchRandomImages = async () => {
  mainImages.innerHTML = ''
  const accessKey = ACCESS_KEY
  const response = await fetch(
    `https://api.unsplash.com/photos/random?count=9&client_id=${accessKey}`
  )
  const data = await response.json()

  data.forEach((photo) => {
    const img = document.createElement('img')
    img.src = photo.urls.small
    img.alt = photo.alt_description
    mainImages.appendChild(img)
  })
}

const searchImages = async () => {
  const searchTerm = searchInput.value.trim()
  if (!searchTerm) {
    alert('Por favor, ingrese un término de búsqueda.')
    return
  }

  const accessKey = ACCESS_KEY
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${searchTerm}&client_id=${accessKey}`
  )
  const data = await response.json()

  mainImages.innerHTML = ''
  if (data.results.length > 0) {
    data.results.forEach((photo) => {
      const img = document.createElement('img')
      img.src = photo.urls.small
      img.alt = photo.alt_description
      mainImages.appendChild(img)
    })
  } else {
    alert('No se encontraron imágenes, mostrando imágenes aleatorias.')
    fetchRandomImages()
  }

  searchInput.value = ''
}

searchButton.addEventListener('click', searchImages)
logo.addEventListener('click', fetchRandomImages)

fetchRandomImages()
