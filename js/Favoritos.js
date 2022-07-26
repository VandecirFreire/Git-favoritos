// classe que vai conter a lógica dos dados
// como os dados serão estruturados
export class Favoritos {
  constructor(root) {
    this.root = document.querySelector(root)
    this.load()
  }

  load() {
     this.entries = [
      {
        login: 'vandecirfreire',
        name: 'Vandecir Freire',
        public_repos: '33',
        followers: '100'
      },
      {
        login: 'maykbrito',
        name: 'Mayk Brito',
        public_repos: '76',
        followers: '120000'
      }
    ]
  }

  delete(user) {
    const filteredEntries = this.entries.filter(entry => entry.login !== user.login)
  }
}

// classe que vai criar a visualização e eventos do HTML
export class FavoritosView extends Favoritos {
  constructor(root) {
    super(root)

    this.tbody = this.root.querySelector('table tbody')

    this.update()
  }

  update() {
    this.removeAllTr()

    this.entries.forEach( user => {
      const row = this.createRow()

      row.querySelector('.user img').src = `https://github.com/${user.login}.png`
      row.querySelector('.user img').alt = `Imagem de ${user.name}`
      row.querySelector('.user p').textContent = user.name
      row.querySelector('.user span').textContent = user.login
      row.querySelector('.repositorios').textContent = user.public_repos
      row.querySelector('.followers').textContent = user.followers

      row.querySelector('.remove').onclick = () => {
        const isOk = confirm('Tem certeza que deseja deletar essa linha')
        if(isOk) {
          this.delete(user)
        }
      }

      this.tbody.append(row)
    })
  }

  createRow() {
    const tr = document.createElement('tr')

    tr.innerHTML = `
      <td class="user">
        <img src="https://github.com/vandecirfreire.png" alt="imagem de vandecir freire">
        <a href="https://github.com/vandecirfreire" target="_blank">
          <p>Vandecir Freire</p>
          <span>vandecirfreire</span>
        </a>
      </td>
      <td class="repositorios">
        33
      </td>
      <td class="followers">
        46
      </td>
      <td>
        <button class="remove">&times;</button>
      </td>
    `

    return tr
  }

  removeAllTr() {
    this.tbody.querySelectorAll('tr')
      .forEach((tr) => {
        tr.remove()
      })
  }
}