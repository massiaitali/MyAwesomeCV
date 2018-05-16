<style scoped>
	
	* {  box-sizing: border-box;	}

/* Set a background color */
	body {
	  background-color: #474e5d;
	  font-family: Helvetica, sans-serif;
	}

/* The actual timeline (the vertical ruler) */
	.timeline {
	  position: relative;
	  max-width: 1200px;
	  margin: 0 auto;
	}

/* The actual timeline (the vertical ruler) */
	.timeline::after {
	  content: '';
	  position: absolute;
	  width: 6px;
	  background-color: white;
	  top: 0;
	  bottom: 0;
	  left: 50%;
	  margin-left: -3px;
	}

/* Container around content */
	.container {
	  padding: 10px 40px;
	  position: relative;
	  background-color: inherit;
	  width: 50%;
	}

/* The circles on the timeline */
	.container::after {
	  content: '';
	  position: absolute;
	  width: 25px;
	  height: 25px;
	  right: -17px;
	  background-color: white;
	  border: 4px solid #FF9F55;
	  top: 15px;
	  border-radius: 50%;
	  z-index: 1;
	}

/* Place the container to the left */
	.left {
	  left: 0;
	}

/* Place the container to the right */
	.right {
	  left: 50%;
	}

/* Add arrows to the left container (pointing right) */
	.left::before {
	  content: " ";
	  height: 0;
	  position: absolute;
	  top: 22px;
	  width: 0;
	  z-index: 1;
	  right: 30px;
	  border: medium solid white;
	  border-width: 10px 0 10px 10px;
	  border-color: transparent transparent transparent white;
	}

/* Add arrows to the right container (pointing left) */
	.right::before {
	  content: " ";
	  height: 0;
	  position: absolute;
	  top: 22px;
	  width: 0;
	  z-index: 1;
	  left: 30px;
	  border: medium solid white;
	  border-width: 10px 10px 10px 0;
	  border-color: transparent white transparent transparent;
	}

/* Fix the circle for containers on the right side */
	.right::after {
	  left: -16px;
	}

/* The actual content */
	.content {
	  padding: 20px 30px;
	  background-color: white;
	  position: relative;
	  border-radius: 6px;
	}

/* Media queries - Responsive timeline on screens less than 600px wide */
	@media screen and (max-width: 600px) {
	/* Place the timelime to the left */
	  .timeline::after {
	    left: 31px;
	  }

	/* Full-width containers */
	  .container {
	    width: 100%;
	    padding-left: 70px;
	    padding-right: 25px;
	  }

	/* Make sure that all arrows are pointing leftwards */
	  .container::before {
	    left: 60px;
	    border: medium solid white;
	    border-width: 10px 10px 10px 0;
	    border-color: transparent white transparent transparent;
	  }

	/* Make sure all circles are at the same spot */
	  .left::after, .right::after {
	    left: 15px;
	  }

	/* Make all right containers behave like the left ones */
	  .right {
	    left: 0%;
	  }
	}
</style>

<template>
  <div id="cvtimeline">
		CV Timeline
		<div class="timeline">
  		<div class="container left">
    		<div class="content">
      		<h2>{{merged[0].start }}</h2>
      		<p>Lorem ipsum..</p>
    		</div>
  		</div>
  		
  		<div class="container right">
    		<div class="content">
      		<h2>2016</h2>
      		<p>Lorem ipsum..</p>
    		</div>
  		</div>
		</div> 		
	</div>
</template>

<script>
export default {
	created() {
		let user = sessionStorage.getItem('user');

		if (user) {
			user = JSON.parse(user)
			console.log(user)

			this.basicInformation.firstName = user.firstName;
			this.basicInformation.lastName =  user.lastName;
			this.basicInformation.picture = user.picture;
			this.basicInformation.mail = user.mail;
			
			let elt = this;

			this.experiences = [];
			user.experiences.forEach(function(exp) {
				let res = { title : exp.title, content : exp.summary, company : exp.company.name, location : exp.location.name, start: exp.startDate.year};
				elt.experiences.push(res);
			});

			this.projects = [];
			user.projects.forEach(function (p) {
				let res = {title : p.name, description : p.description, url : p.html_url}

				elt.projects.push(res);
			});

			this.merged = this.experiences.concat(this.formation);
			this.merged.sort(function(a,b) {return (a.start > b.start) ? -1 : ((b.start > a.start) ? 1 : 0);} ); 

		} else {
			console.log('No user found')
		}
	},
	data() {
		return {
			basicInformation : { 
				firstName 					: 'Gregoire',
				lastName 					: 'Harba',
				birthDate					: '21/03/1995',
				title 						: 'Apprenti ingénieur',
				currentOccupation : 'Apprenti',
				formation 				: 'polydouille',
				country 					: 'France',
				postCode 					: '75015',
				location 					: 'Paris',
				simpleDescription : "Développeur Web depuis 3 ans au sein d\'Orange, j\'aime être force de proposition pour répondre à des problématiques techniques et humaines. Investi dans les relation client, je suis toujours actif pour recueillir leur avis et j\'ai l\'habitude de présenter les projets de façon claire et concise. La formation des utilisateurs est aussi pour moi un point capital et je suis à l\'écoute de toutes personnes avec qui je suis amené à avoir des interactions.Les challenges techniques sont pour moi les plus importants vecteurs de motivation",
				picture						: 'https://media.licdn.com/dms/image/C5603AQF6jp70EP7KnA/profile-displayphoto-shrink_200_200/0?e=1531353600&v=beta&t=kRgNoDYxcnE44fdlFm68fLWLR9XrGm7mnu4n-89Tu-A'
			},
			experiences : [
				{ title: 'Developpeur Full de la Stack qui stack le stackement de la stack', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ultricies commodo aliquam. Vestibulum sed dui eros. Integer et pretium nunc. Cras ornare odio id fermentum viverra. Suspendisse id tortor quis lectus laoreet aliquet quis nec justo. Duis iaculis dui rutrum pulvinar consequat. Sed bibendum mattis nisi vitae aliquam. Nulla tristique erat et quam hendrerit, et vestibulum nisl sodales. Etiam ac dictum elit, non dapibus nisi. Curabitur tortor lectus, elementum at sodales a, fermentum imperdiet velit. Aliquam in pharetra elit. Donec sodales, metus id ultricies scelerisque, nunc dui pulvinar lectus, ut pharetra diam nisi eu turpis. Vestibulum placerat pellentesque mauris id facilisis. Vivamus porta et nunc ac hendrerit. Sed a ex at dolor molestie placerat. Sed fermentum nisi at enim varius, a commodo risus tempor.', company: 'Orange', location: 'France'},
				{ title: 'Developpeur Full de la Stack qui stack le stackement de la stack', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ultricies commodo aliquam. Vestibulum sed dui eros. Integer et pretium nunc. Cras ornare odio id fermentum viverra. Suspendisse id tortor quis lectus laoreet aliquet quis nec justo. Duis iaculis dui rutrum pulvinar consequat. Sed bibendum mattis nisi vitae aliquam. Nulla tristique erat et quam hendrerit, et vestibulum nisl sodales. Etiam ac dictum elit, non dapibus nisi. Curabitur tortor lectus, elementum at sodales a, fermentum imperdiet velit. Aliquam in pharetra elit. Donec sodales, metus id ultricies scelerisque, nunc dui pulvinar lectus, ut pharetra diam nisi eu turpis. Vestibulum placerat pellentesque mauris id facilisis. Vivamus porta et nunc ac hendrerit. Sed a ex at dolor molestie placerat. Sed fermentum nisi at enim varius, a commodo risus tempor.', company: 'Orange', location: 'France'},
				{ title: 'Developpeur Full de la Stack qui stack le stackement de la stack', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ultricies commodo aliquam. Vestibulum sed dui eros. Integer et pretium nunc. Cras ornare odio id fermentum viverra. Suspendisse id tortor quis lectus laoreet aliquet quis nec justo. Duis iaculis dui rutrum pulvinar consequat. Sed bibendum mattis nisi vitae aliquam. Nulla tristique erat et quam hendrerit, et vestibulum nisl sodales. Etiam ac dictum elit, non dapibus nisi. Curabitur tortor lectus, elementum at sodales a, fermentum imperdiet velit. Aliquam in pharetra elit. Donec sodales, metus id ultricies scelerisque, nunc dui pulvinar lectus, ut pharetra diam nisi eu turpis. Vestibulum placerat pellentesque mauris id facilisis. Vivamus porta et nunc ac hendrerit. Sed a ex at dolor molestie placerat. Sed fermentum nisi at enim varius, a commodo risus tempor.', company: 'Orange', location: 'France'},
				{ title: 'Developpeur Full de la Stack qui stack le stackement de la stack', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ultricies commodo aliquam. Vestibulum sed dui eros. Integer et pretium nunc. Cras ornare odio id fermentum viverra. Suspendisse id tortor quis lectus laoreet aliquet quis nec justo. Duis iaculis dui rutrum pulvinar consequat. Sed bibendum mattis nisi vitae aliquam. Nulla tristique erat et quam hendrerit, et vestibulum nisl sodales. Etiam ac dictum elit, non dapibus nisi. Curabitur tortor lectus, elementum at sodales a, fermentum imperdiet velit. Aliquam in pharetra elit. Donec sodales, metus id ultricies scelerisque, nunc dui pulvinar lectus, ut pharetra diam nisi eu turpis. Vestibulum placerat pellentesque mauris id facilisis. Vivamus porta et nunc ac hendrerit. Sed a ex at dolor molestie placerat. Sed fermentum nisi at enim varius, a commodo risus tempor.', company: 'Orange', location: 'France'},
				{ title: 'Developpeur Full de la Stack qui stack le stackement de la stack', content: 'Sed id diam eget dolor euismod fermentum id eget orci. Etiam ultrices, tortor convallis sollicitudin faucibus, libero dolor tempus odio, sit amet sodales lorem libero id velit. Sed at rhoncus massa. Ut a porta sem, ut dignissim tellus. Suspendisse id venenatis lectus. Ut ornare condimentum interdum. Etiam vitae justo volutpat, consequat purus aliquet, consequat risus. Integer non facilisis urna. Cras non laoreet orci. Sed faucibus malesuada nibh vitae dictum. Aliquam pretium tincidunt imperdiet. Nunc finibus imperdiet eros. Pellentesque varius lorem ut ante pellentesque tempor. ', company: 'Orange', location: 'France'}
			],
			projects    : [
				{ title: 'KEEPER', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ultricies commodo aliquam. Vestibulum sed dui eros. Integer et pretium nunc. Cras ornare odio id fermentum viverra. Suspendisse id tortor quis lectus laoreet aliquet quis nec justo. Duis iaculis dui rutrum pulvinar consequat. Sed bibendum mattis nisi vitae aliquam. Nulla tristique erat et quam hendrerit, et vestibulum nisl sodales. ', techno: 'NodeJS et vueJS' },
				{ title: 'SUPER PROJET', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ultricies commodo aliquam. Vestibulum sed dui eros. Integer et pretium nunc. Cras ornare odio id fermentum viverra. Suspendisse id tortor quis lectus laoreet aliquet quis nec justo. Duis iaculis dui rutrum pulvinar consequat. Sed bibendum mattis nisi vitae aliquam. Nulla tristique erat et quam hendrerit, et vestibulum nisl sodales. ', techno: 'NodeJS et vueJS' },
				{ title: 'SUPER PROJET', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ultricies commodo aliquam. Vestibulum sed dui eros. Integer et pretium nunc. Cras ornare odio id fermentum viverra. Suspendisse id tortor quis lectus laoreet aliquet quis nec justo. Duis iaculis dui rutrum pulvinar consequat. Sed bibendum mattis nisi vitae aliquam. Nulla tristique erat et quam hendrerit, et vestibulum nisl sodales. ', techno: 'NodeJS et vueJS' },
				{ title: 'SUPER PROJET', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ultricies commodo aliquam. Vestibulum sed dui eros. Integer et pretium nunc. Cras ornare odio id fermentum viverra. Suspendisse id tortor quis lectus laoreet aliquet quis nec justo. Duis iaculis dui rutrum pulvinar consequat. Sed bibendum mattis nisi vitae aliquam. Nulla tristique erat et quam hendrerit, et vestibulum nisl sodales. ', techno: 'NodeJS et vueJS' },
				{ title: 'SUPER PROJET', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ultricies commodo aliquam. Vestibulum sed dui eros. Integer et pretium nunc. Cras ornare odio id fermentum viverra. Suspendisse id tortor quis lectus laoreet aliquet quis nec justo. Duis iaculis dui rutrum pulvinar consequat. Sed bibendum mattis nisi vitae aliquam. Nulla tristique erat et quam hendrerit, et vestibulum nisl sodales. ', techno: 'NodeJS et vueJS' },
				{ title: 'SUPER PROJET', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ultricies commodo aliquam. Vestibulum sed dui eros. Integer et pretium nunc. Cras ornare odio id fermentum viverra. Suspendisse id tortor quis lectus laoreet aliquet quis nec justo. Duis iaculis dui rutrum pulvinar consequat. Sed bibendum mattis nisi vitae aliquam. Nulla tristique erat et quam hendrerit, et vestibulum nisl sodales. ', techno: 'NodeJS et vueJS' },
				{ title: 'SUPER PROJET', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ultricies commodo aliquam. Vestibulum sed dui eros. Integer et pretium nunc. Cras ornare odio id fermentum viverra. Suspendisse id tortor quis lectus laoreet aliquet quis nec justo. Duis iaculis dui rutrum pulvinar consequat. Sed bibendum mattis nisi vitae aliquam. Nulla tristique erat et quam hendrerit, et vestibulum nisl sodales. ', techno: 'NodeJS et vueJS' },
				{ title: 'SUPER PROJET', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ultricies commodo aliquam. Vestibulum sed dui eros. Integer et pretium nunc. Cras ornare odio id fermentum viverra. Suspendisse id tortor quis lectus laoreet aliquet quis nec justo. Duis iaculis dui rutrum pulvinar consequat. Sed bibendum mattis nisi vitae aliquam. Nulla tristique erat et quam hendrerit, et vestibulum nisl sodales. ', techno: 'NodeJS et vueJS' },
				{ title: 'SUPER PROJET', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ultricies commodo aliquam. Vestibulum sed dui eros. Integer et pretium nunc. Cras ornare odio id fermentum viverra. Suspendisse id tortor quis lectus laoreet aliquet quis nec justo. Duis iaculis dui rutrum pulvinar consequat. Sed bibendum mattis nisi vitae aliquam. Nulla tristique erat et quam hendrerit, et vestibulum nisl sodales. ', techno: 'NodeJS et vueJS' }
			],
			formation   : [
				{ school: 'Polytech Paris Sud', diploma: 'Diplome de lingéneieur', content: 'Sed id diam eget dolor euismod fermentum id eget orci. Etiam ultrices, tortor convallis sollicitudin faucibus, libero dolor tempus odio, sit amet sodales lorem libero id velit. Sed at rhoncus massa. Ut a porta sem, ut dignissim tellus. Suspendisse id venenatis lectus. Ut ornare condimentum interdum. Etiam vitae justo volutpat, consequat purus aliquet, consequat risus. Integer non facilisis urna. Cras non laoreet orci. Sed faucibus malesuada nibh vitae dictum. Aliquam pretium tincidunt imperdiet. Nunc finibus imperdiet eros. Pellentesque varius lorem ut ante pellentesque tempor.', start : '2015' },
				{ school: 'Polytech Paris Sud', diploma: 'Diplome obtenu en etude', content: 'Sed id diam eget dolor euismod fermentum id eget orci. Etiam ultrices, tortor convallis sollicitudin faucibus, libero dolor tempus odio, sit amet sodales lorem libero id velit. Sed at rhoncus massa. Ut a porta sem, ut dignissim tellus. Suspendisse id venenatis lectus. Ut ornare condimentum interdum. Etiam vitae justo volutpat, consequat purus aliquet, consequat risus. Integer non facilisis urna. Cras non laoreet orci. Sed faucibus malesuada nibh vitae dictum. Aliquam pretium tincidunt imperdiet. Nunc finibus imperdiet eros. Pellentesque varius lorem ut ante pellentesque tempor. ', start : '2016' },
				{ school: 'Polytech Paris Sud', diploma: 'Diplome obtenu en etude', content: 'Sed id diam eget dolor euismod fermentum id eget orci. Etiam ultrices, tortor convallis sollicitudin faucibus, libero dolor tempus odio, sit amet sodales lorem libero id velit. Sed at rhoncus massa. Ut a porta sem, ut dignissim tellus. Suspendisse id venenatis lectus. Ut ornare condimentum interdum. Etiam vitae justo volutpat, consequat purus aliquet, consequat risus. Integer non facilisis urna. Cras non laoreet orci. Sed faucibus malesuada nibh vitae dictum. Aliquam pretium tincidunt imperdiet. Nunc finibus imperdiet eros. Pellentesque varius lorem ut ante pellentesque tempor. ' , start : '2017'},
				{ school: 'Polytech Paris Sud', diploma: 'Diplome obtenu en etude', content: 'Sed id diam eget dolor euismod fermentum id eget orci. Etiam ultrices, tortor convallis sollicitudin faucibus, libero dolor tempus odio, sit amet sodales lorem libero id velit. Sed at rhoncus massa. Ut a porta sem, ut dignissim tellus. Suspendisse id venenatis lectus. Ut ornare condimentum interdum. Etiam vitae justo volutpat, consequat purus aliquet, consequat risus. Integer non facilisis urna. Cras non laoreet orci. Sed faucibus malesuada nibh vitae dictum. Aliquam pretium tincidunt imperdiet. Nunc finibus imperdiet eros. Pellentesque varius lorem ut ante pellentesque tempor. ', start : '2018' }
			],
			skills		  : ['Lorem', 'Ipsum','Lorem', 'Ipsum','Lorem', 'Ipsum','Lorem', 'Ipsum','Lorem', 'Ipsum','Lorem'],
			merged 			: []
		}
	},
	methods: {
		test() {

		}
	}
}
</script>


