window.Linkedin = {

  profile: undefined,
  listeners: [],

  getProfile: function(ln) {
    if (!Linkedin.profiles) {
      Linkedin.listeners.push(ln)
    } else {
      ln(Linkedin.profile)
    }
  },

  init: function() {
    IN.Event.on(IN, "auth", Linkedin.OnLinkedInAuth);
  },

  logOut: function(fn) {
    IN.User.logout(fn);
  },

  OnLinkedInAuth: function() {
    IN.API
      .Profile("me")
      .fields([ 'first-name', 'last-name', 
                'industry', 'date-of-birth', 'educations',
                'positions', 'picture-url', 'email-address' 
      ])
      .result(Linkedin.ShowProfileData);
  },

  ShowProfileData: function(profiles) {
    let profile = profiles.values[0];

    Linkedin.profile = profile;

    Linkedin.listeners.forEach(ln => {
      ln(profile)
    })
  }

}