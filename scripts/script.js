
// const motApplication = "Hello"
// let motUser = prompt("Entrez un mot : " + motApplication)

// if (motUser === motApplication) {
//     console.log("Bravo !")
// } else {
//     console.log("Echec, le mot n\'est pas correct")
// }


function afficherResultat(score, nbr_total_mots) {

    let spanScore = document.querySelector(".zoneScore span")

    let affichageScore = `${score} / ${nbr_total_mots}`

    spanScore.innerText = affichageScore

    console.log("Votre score est " + score + " sur " + nbr_total_mots)
}

function afficheProposition(proposition) {
    //Afficher la liste de mots ou de phrases que le user doit recopier
    let zoneProposition = document.querySelector(".zoneProposition")
    zoneProposition.innerText = proposition
}

//Cette fonction construit et envoie l'email
function afficherEmail(nom, email, score) {
    let mailto = `mailto:${email}?subject=Partage du score Azertype&body=Salut, je suis ${nom} et je viens de réaliser le score ${score} sur le site d'Azertype !`
    location.href = mailto
}

/**
 * Cette fonction prend un nom en paramètre et valide qu'il est au bon format
 * ici : deux caractères au minimum
 * @param {string} nom 
 * @throws {Error}
 */
function validerNom(nom) {
    if (nom.length < 2) {
        throw new Error("Le nom est trop court. ")
    }

}

/**
 * Cette fonction prend un email en paramètre et valide qu'il est au bon format. 
 * @param {string} email 
 * @throws {Error}
 * regex101.com
 * regexper.com
 * pour tester les expressions régulières
 */
function validerEmail(email) {
    let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+")
    if (!emailRegExp.test(email)) {
        throw new Error("L'email n'est pas valide.")
    }

}

/**
 * Cette fonction affiche le message d'erreur passé en paramètre. 
 * Si le span existe déjà, alors il est réutilisé pour ne pas multiplier
 * les messages d'erreurs. 
 * @param {string} message 
 */
function afficherMessageErreur(message) {

    let spanErreurMessage = document.getElementById("erreurMessage")

    if (!spanErreurMessage) {
        let popup = document.querySelector(".popup")
        spanErreurMessage = document.createElement("span")
        spanErreurMessage.id = "erreurMessage"

        popup.append(spanErreurMessage)
    }

    spanErreurMessage.innerText = message
}
/*
* Cette fonction permet de récupérer les informations dans le formulaire
* de la popup de partage et d'appeler l'affichage de l'email avec les bons paramètres.
* @param {string} scoreEmail 
*/
function gererFormulaire(scoreEmail) {
    try {
        //On récupère les données insérées dans les champs

        let baliseNom = document.getElementById("nom")
        let nom = baliseNom.value
        validerNom(nom)

        let baliseEmail = document.getElementById("email")
        let email = baliseEmail.value
        validerEmail(email)
        afficherMessageErreur("")
        afficherEmail(nom, email, scoreEmail)

    } catch (erreur) {
        afficherMessageErreur(erreur.message)
    }

}

function lancerJeu() {

    // Initialisation
    initAddEventListenerPopup()
    let score = 0
    let i = 0
    let listeProposition = listeMots

    let btnEnvoyer = document.getElementById("btnValiderMot")
    let inputEcriture = document.getElementById("inputEcriture")

    afficheProposition(listeProposition[i])

    btnEnvoyer.addEventListener("click", () => {
        // console.log("J'ai cliqué !")
        console.log(inputEcriture.value)
        // console.log(listeMots[i])

        if (inputEcriture.value === listeProposition[i]) {
            score++
        }
        i++
        afficherResultat(score, i)

        inputEcriture.value = ''
        if (listeProposition[i] === undefined) {
            afficheProposition("Le jeu est fini !")
            btnEnvoyer.disabled = true
        } else {
            afficheProposition(listeProposition[i])
        }

    })

    //dynamiser les input radio pour savoir quelle option a choisi le user  
    // entre mot et phrase afin de lui afficher quoi copier
    let listeRadio = document.querySelectorAll('.optionSource input')

    for (let index = 0; index < listeRadio.length; index++) {
        listeRadio[index].addEventListener("change", (event) => {
            console.log(event.target.value)

            if (event.target.value === "mots") {
                listeProposition = listeMots
            } else {
                listeProposition = listePhrases

            }
            afficheProposition(listeProposition[i])

        })
    }

    // Gestion de l'événement submit sur le formulaire de partage. 
    let form = document.querySelector("form")
    form.addEventListener("submit", (event) => {
        //On empêche le comportement par défaut, i.e le chargement de la page
        event.preventDefault()
        let scoreEmail = `${score} / ${i}`
        gererFormulaire(scoreEmail)
    })

    afficherResultat(score, i)

}








