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

  OnLinkedInAuth: function() {
    IN.API
      .Profile("me")
      .fields([ 'first-name', 'last-name', // Add these to get the name
                'industry', 'date-of-birth', 'educations',
                'positions' // Add this one to get the job history
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