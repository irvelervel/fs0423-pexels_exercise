const PEXELS_KEY = 'vg18dQh7brL31B1NyUqnqCkefatWRLOysovlIFXNfxlo0Ax7xLRvUMdF'
// funziona anche con 'ciao'?

const getImages = function (query) {
  fetch('https://api.pexels.com/v1/search?query=' + query, {
    headers: {
      authorization: PEXELS_KEY,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error('Errore nella response')
      }
    })
    .then((data) => {
      console.log(data)
      // potremmo cercare solamente le imgs e sostituirne le src
      //   const allTheImages = document.querySelectorAll(
      //     '.bd-placeholder-img.card-img-top'
      //   )
      //   for (let i = 0; i < allTheImages.length; i++) {
      //     // ciclo tutte le img della pagina
      //     allTheImages[i].src = data.photos[i].src.medium
      //   }
      // esempio con forEach
      //   allTheImages.forEach((image, i) => {
      //     image.src = data.photos[i].src.medium
      //   })
      // un modo alternativo era quello di cancellare tutte le card e ricrearle da zero con i gatti invece dei cani
      const row = document.querySelector('#content-row')
      console.log(row)
      row.innerHTML = ''
      data.photos.forEach((photo) => {
        const newCol = document.createElement('div')
        newCol.classList.add('col', 'col-md-4')
        newCol.innerHTML = `
            <div class="card mb-4 shadow-sm">
                <img
                src="${photo.src.medium}"
                class="bd-placeholder-img card-img-top"
                />
                <div class="card-body">
                <a href="./detail.html?imageId=${photo.id}"><h5 class="card-title">Lorem Ipsum</h5></a>
                <p class="card-text">
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                </p>
                <div
                    class="d-flex justify-content-between align-items-center"
                >
                    <div class="btn-group">
                    <button
                        type="button"
                        class="btn btn-sm btn-outline-secondary"
                    >
                        View
                    </button>
                    <button
                        type="button"
                        class="btn btn-sm btn-outline-secondary"
                    >
                        Edit
                    </button>
                    </div>
                    <small class="text-muted">${photo.id}</small>
                </div>
                </div>
            </div>
            `
        row.appendChild(newCol)
      })
      // cambiamo tutti gli edit in hide
      const allTheEditButtons = document.querySelectorAll(
        '.card .btn:nth-of-type(2)'
      )
      allTheEditButtons.forEach((button) => {
        button.innerText = 'Hide'
        button.addEventListener('click', function (e) {
          // questo avviene al click di uno qualsiasi dei nuovi bottoni Hide
          console.log('click!', e.target)
          // cerco, risalendo il DOM, la col che contiene questo bottone
          e.target.closest('.col').remove()
        })
      })
    })
    .catch((err) => console.log(err))
}

const primaryButton = document.querySelector('.btn-primary')
primaryButton.addEventListener('click', () => getImages('kittens'))

const secondaryButton = document.querySelector('.btn-secondary')
secondaryButton.addEventListener('click', () => getImages('hamsters'))

const searchForm = document.getElementById('custom-search')
searchForm.addEventListener('submit', function (e) {
  e.preventDefault()
  // dovrei prendere il valore attuale della barra di ricerca,
  // e lanciare la funzione getImages con il suo contenuto
  // cerchiamo il valore della barra search
  const searchBar = document.getElementById('search-field')
  const searchValue = searchBar.value
  getImages(searchValue)
})
