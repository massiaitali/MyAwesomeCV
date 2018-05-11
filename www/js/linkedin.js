window.Linkedin = {
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
    console.log(profiles);
  }
}