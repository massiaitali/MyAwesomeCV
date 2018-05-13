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
              <th>Etat</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                LinkedIn
              </td>
              <td>
                <script type="in/Login" v-if="!linkedin"></script>
                <span v-else>Connecté</span>
              </td>
              <td>
                <div class="mdc-form-field">
                  <div class="mdc-radio">
                    <input class="mdc-radio__native-control" type="radio" id="radio-linkedin" name="avatar" v-model="avatar" value="linkedin">
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
              <td>Github</td>
              <td>
                <button class="mdc-button mdc-card__action mdc-card__action--button" v-on:click="setGithubUsername" v-if="!github">Github</button>
                <span v-else>Connecté</span>
              </td>
              <td>
                <div class="mdc-form-field">
                  <div class="mdc-radio">
                    <input class="mdc-radio__native-control" type="radio" id="radio-github" name="avatar" v-model="avatar" value="github">
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
          <button class="mdc-button mdc-card__action mdc-card__action--button" v-on:click="nextStep">Générer mon CV</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
//import Linkedin from '../tools/Linkedin';
import Github from '../tools/Github';


export default {
  
  data() {
    return {
      avatar: 'github',
      linkedin: undefined,
      github: undefined
    }
  },

  created() {
    let githubUsername = sessionStorage.getItem('github_username'),
        elt = this;

    Linkedin.getProfile(profile => {
      elt.linkedin = profile;
    })

    if (githubUsername) {
      this.searchGithubInformations(githubUsername)
    }
  },

  methods: {
    searchGithubInformations(username) {
      let elt = this;

      Github.getAllUserDatas(username, (err, user) => {
        if (!err) {
          sessionStorage.setItem('github_username', username)
          elt.github = user;
        } else {
          console.log(err)
        }
      })
    },

    setGithubUsername() {
      const username = prompt('Quel est votre pseudo Github ?')

      this.searchGithubInformations(username)
    },

    nextStep() {
      console.log(this.linkedin);
      let user = {
          firstName: this.linkedin.firstName,
          lastName: this.linkedin.lastName,
          name: this.github.name,
          picture: this.avatar === 'github' ? this.github.image : this.linkedin.pictureUrl,
          experiences: this.linkedin.positions.values,
          projects: this.github.repos
        };

      sessionStorage.setItem('user', JSON.stringify(user))
      this.$router.push({ name: 'cvbase' })
    }
  }

}
</script>
