const PEXELS_KEY = 'vg18dQh7brL31B1NyUqnqCkefatWRLOysovlIFXNfxlo0Ax7xLRvUMdF'

// recupero l'imageId dalla barra degli indirizzi

const addressBarContent = new URLSearchParams(location.search)
const imageId = addressBarContent.get('imageId')

fetch('https://api.pexels.com/v1/photos/' + imageId, {
  headers: {
    authorization: PEXELS_KEY,
  },
})
  .then((response) => {
    console.log(response)
    if (response.ok) {
      return response.json()
    } else {
      throw new Error('ERRORE NELLA RESPONSE')
    }
  })
  .then((imageDetails) => {
    console.log(imageDetails)
    const row = document.getElementById('content-row')
    const newCol = document.createElement('div')
    newCol.classList.add('col', 'col-12', 'col-md-8')
    newCol.innerHTML = `
    <div class="card mb-4 shadow-sm">
        <img
            src="${imageDetails.src.large}"
            class="bd-placeholder-img card-img-top"
        />
        <div class="card-body">
            <h5 class="card-title">${imageDetails.alt}</h5>
            <a href="${imageDetails.photographer_url}"><h6 class="card-title">${imageDetails.photographer}</h6></a>
            <p class="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
            </p>
            </div>
        </div>
    </div>
    `
    row.appendChild(newCol)
  })
  .catch((err) => {
    console.log(err)
  })
