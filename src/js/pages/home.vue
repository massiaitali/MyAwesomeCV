<template>
  <div id="home">
    <div class="mdc-card">
      <div class="mdc-card__primary">
        <h2 class="demo-card__title mdc-typography--headline6">Mes informations</h2>
      </div>
      <div class="mdc-card__secondary">
        Connectez-vous sur vos différents comptes afin de récupérer toutes vos données utiles à la génération de votre CV
        <div class="mdc-select">
          <select class="mdc-select__native-control">
            <option value="" disabled selected></option>
            <option value="fr">Français</option>
            <option value="en">English</option>
          </select>
          <label class="mdc-floating-label">Choix de la langue</label>
          <div class="mdc-line-ripple"></div>
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
                <button class="mdc-button mdc-card__action mdc-card__action--button" type="in/Login">Linkedin</button>
              </td>
              <td>
                <div class="mdc-form-field">
                  <div class="mdc-radio">
                    <input class="mdc-radio__native-control" type="radio" id="radio-1" name="radios">
                    <div class="mdc-radio__background">
                      <div class="mdc-radio__outer-circle"></div>
                      <div class="mdc-radio__inner-circle"></div>
                    </div>
                  </div>
                  <label for="radio-1">Utiliser la photo de profil</label>
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


export default {
  created() {
    const select = new mdc.select.MDCSelect(document.querySelector('.mdc-select'));

    select.listen('change', () => {
      alert(`Selected option at index ${select.selectedIndex} with value "${select.value}"`);
    });
  }
}
</script>
