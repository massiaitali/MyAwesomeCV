<template>
  <div id="home">

    <div class="card">
      <div class="card-primary">
        <h1>Mes informations</h1>
      </div>
      <div class="card-secondary">
        Connectez-vous sur vos différents comptes afin de récupérer toutes vos données utiles à la génération de votre CV
        <div class="padding">
          <label for="select">Choix de la langue</label>
          <select id="select">
            <option value="fr" selected>Français</option>
            <option value="en">English</option>
          </select>
        </div>
        <table class="table full-width table-centered">
          <thead>
            <tr>
              <th>Réseau</th>
              <th>Action</th>
              <th>Avatar</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                LinkedIn
              </td>
              <td>
                <button class="btn btn-primary" v-on:click="logInLinkedin" v-if="!linkedin">Connexion</button>
                <button class="btn" v-on:click="logOutLinkedin" v-else>Déconnexion</button>
              </td>
              <td>
                <input type="radio" name="avatar" v-model="avatar" value="linkedin">
              </td>
            </tr>
            <tr>
              <td>Github</td>
              <td>
                <button class="btn btn-primary" v-on:click="setGithubUsername" v-if="!github">Connexion</button>
                <button class="btn" v-on:click="resetGithub" v-else>Déconnexion</button>
              </td>
              <td>
                <input type="radio" name="avatar" v-model="avatar" value="github">
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="card-actions">
        <button class="btn" v-on:click="logout" v-if="linkedin || github">Déconnexion</button>
        <button class="float-right btn btn-primary" v-on:click="nextStep">Générer mon CV</button>
      </div>
    </div>

    <div style="visibility: hidden">
      <script id="linkedinBtn" type="in/Login"></script>
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

    resetGithub() {
      sessionStorage.removeItem('github_username')
      this.github = undefined;
    },

    logInLinkedin() {
      document
        .getElementById('linkedinBtn')
        .previousSibling
        .getElementsByTagName('a')[0]
        .click()
    },

    logOutLinkedin() {
      let elt = this;
      Linkedin.logOut(() => {
        elt.linkedin = undefined;
      })
    },

    logout() {
      this.resetGithub()
      this.logOutLinkedin()
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
