function OnLinkedInFrameworkLoad() {
  IN.Event.on(IN, "auth", OnLinkedInAuth);
}
function OnLinkedInAuth() 
{
  IN.API.Profile("me").fields([
                              'first-name', 'last-name', // Add these to get the name
                              'industry', 'date-of-birth', 'educations',
                              'positions' // Add this one to get the job history
                              ])
  .result(ShowProfileData);
}
function ShowProfileData(profiles) {
  console.log(profiles);
}