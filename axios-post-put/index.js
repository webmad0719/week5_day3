/*
document.getElementById('post-wall-e').onclick = () => {

    const robot = {
        name: 'Wall-o',
        occupation: 'Recogedor de basura espacial',
        weapon: 'escupe'
    }

    axios.post('https://ih-crud-api.herokuapp.com/characters', robot)
        .then(response => {
            const { id, name, occupation } = response.data
            const characterLi = `<li>Nombre: ${name} (id ${id}), ocupación: ${occupation}`
            document.getElementById('characters-list').innerHTML += characterLi
        })
        .catch(err => console.log(err))
}
*/


const charactersApp = axios.create({
    baseURL: 'https://ih-crud-api.herokuapp.com/characters'
})


const theName = document.getElementsByClassName("the-name")
const theOccupation = document.getElementsByClassName("the-occupation")
const theWeapon = document.getElementsByClassName("the-weapon")

document.getElementById('character-form').onsubmit = e => {

    e.preventDefault()

    const characterToCreate = {
        name: theName[0].value,
        occupation: theOccupation[0].value,
        weapon: theWeapon[0].value
    }

    charactersApp.post('/', characterToCreate)
        .then(response => {
            const { id, name, occupation } = response.data
            const characterLi = `<li><strong>Personaje creado</strong><br>Nombre: ${name} (id ${id}), ocupación: ${occupation}`
            document.getElementById('characters-list').innerHTML += characterLi

            document.getElementById("character-form").reset()
            updateAllCharacters()
        })
        .catch(err => console.log(err))
}



document.getElementById('getButton').onclick = () => {

    const theId = document.getElementById('theCharId').value

    charactersApp.get(`/${theId}`)
        .then(theCharacter => {
            theName[1].value = theCharacter.data.name
            theOccupation[1].value = theCharacter.data.occupation
            theWeapon[1].value = theCharacter.data.weapon
            document.getElementById('character-id-input').value = theCharacter.data.id
        })
        .catch(err => console.log(err))
}



document.getElementById('update-form').onsubmit = e => {

    e.preventDefault()

    const theId = document.getElementById('character-id-input').value
    const characterToUpdate = {
        name: theName[1].value,
        occupation: theOccupation[1].value,
        weapon: theWeapon[1].value
    }
    charactersApp.put(`/${theId}`, characterToUpdate)
        .then(response => {
            const { name, id, occupation } = response.data
            const characterLi = `<li><strong>Personaje actualizado</strong><br> | Nombre: ${name} (id ${id}), ocupación: ${occupation}`
            document.getElementById('characters-list').innerHTML += characterLi

            document.getElementById("update-form").reset()
            updateAllCharacters()
        })
        .catch(err => console.log(err))
}



window.onload = () => updateAllCharacters()


function updateAllCharacters() {

    charactersApp.get('/')
        .then(allCharacters => {
            allCharacters.data.forEach(elm => document.getElementById('characters-list-updated').innerHTML += `<li>${elm.name}</li>`)
        })
        .catch(err => console.log(err))
}