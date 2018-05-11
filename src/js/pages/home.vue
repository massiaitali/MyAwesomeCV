<template>
  <div id="home">
    <div class="mdc-card">
      <div class="mdc-card__primary">
        <h2 class="demo-card__title mdc-typography--headline6">Mes informations</h2>
      </div>
      <div class="mdc-card__secondary">
        Connectez-vous sur vos différents comptes afin de récupérer toutes vos données utiles à la génération de votre CV
        <div class="padding">
          <label for="select">Choix de la langue</label>
          <select id="select">
            <option value="" disabled selected></option>
            <option value="fr">Français</option>
            <option value="en">English</option>
          </select>
        </div>
        <table>
          <thead>
            <tr>
              <th>Réseau</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <script type="in/Login"></script>
              </td>
              <td>
                <div class="mdc-form-field">
                  <div class="mdc-radio">
                    <input class="mdc-radio__native-control" type="radio" id="radio-linkedin" name="radios">
                    <div class="mdc-radio__background">
                      <div class="mdc-radio__outer-circle"></div>
                      <div class="mdc-radio__inner-circle"></div>
                    </div>
                  </div>
                  <label for="radio-linkedin">Utiliser la photo de profil</label>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <button class="mdc-button mdc-card__action mdc-card__action--button" v-on:click="setGithubUsername">Github</button>
              </td>
              <td>
                <div class="mdc-form-field">
                  <div class="mdc-radio">
                    <input class="mdc-radio__native-control" type="radio" id="radio-github" name="radios">
                    <div class="mdc-radio__background">
                      <div class="mdc-radio__outer-circle"></div>
                      <div class="mdc-radio__inner-circle"></div>
                    </div>
                  </div>
                  <label for="radio-github">Utiliser la photo de profil</label>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mdc-card__actions">
        <div class="mdc-card__action-buttons">
          <button class="mdc-button mdc-card__action mdc-card__action--button">Générer mon CV</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
//import Linkedin from '../tools/Linkedin';
import Github from '../tools/Github';


export default {

  methods: {
    setGithubUsername() {
      const username = prompt('Quel est votre pseudo Github ?')

      Github.getAllUserDatas(username, (err, user) => {
        if (!err) {
          console.log(user)
        } else {
          console.log(err)
        }
      })
    }
  }

}
</script>
