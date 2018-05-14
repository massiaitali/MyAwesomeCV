<template>
  <div id="cvbase">
		CV Base

		<div class="mdc-layout-grid">
		  <div class="mdc-layout-grid__inner">
			  
		    <div class="mdc-layout-grid__cell--span-12 top">
     			<div class="mdc-layout-grid">
		  			<div class="mdc-layout-grid__inner">

			      	<div class="mdc-layout-grid__cell--span-12">
				  			<img v-bind:src="basicInformation.picture" v-if="basicInformation.picture" height="150">
				      					    
					        <h2 >{{ basicInformation.title }}</h2>
					    		<p>
					      	{{ `${basicInformation.firstName} ${basicInformation.lastName}` }}
					    		</p>
					      	<p>
					      	{{ basicInformation.mail }}
					      	</p>

					      	<p>
					      	{{ basicInformation.birthDate }}
					      	</p>

					      	<p>
					      	{{ `${experiences[0].company} ${formation[0].school}` }}
					    		</p>
					    		<p>
					      	{{ `${basicInformation.location} ${basicInformation.postCode} ${basicInformation.country}` }}
			    				</p>
			    		</div>

			    		<div class="mdc-layout-grid__cell--span-12 secRow">
			    			{{ basicInformation.simpleDescription }}
			    		</div>

		    		</div>
    			</div>
    	</div>
		  
			  <div class="mdc-layout-grid__cell--span-4">
			  	<div class="mdc-card">
			      <div class="mdc-card__primary">
			        <h2 class="demo-card__title mdc-typography--headline6"> Competence</h2>
			      </div>
			      <div class="mdc-card__secondary">
			        <ul id="example-1" class="mdc-list">
							  <li  class="mdc-list-item" v-for="s in skills">
							    {{ s }}
							  </li>
							</ul>
			      </div>
      		</div>
			  </div>
			  
			  <div class="mdc-layout-grid__cell--span-8">
			  	<div class="mdc-card">
			      <div class="mdc-card__primary">
			        <h2 class="demo-card__title mdc-typography--headline6"> Experience</h2>
			      </div>
			      <div class="mdc-card__secondary" v-for="experience in experiences">
			      	<h1> {{ experience.title }} <span class="infoExp"> {{ experience.start}} </span> </h1>
			      	<p class="infoExp"> {{ `${experience.company}, ${experience.location}` }} </p>
			      	<p> {{ experience.content }}</p>
			      </div>
      		</div>
			  </div>
			  
			  <div class="mdc-layout-grid__cell--span-12">
					<div class="mdc-card">
			      <div class="mdc-card__primary">
			        <h2 class="demo-card__title mdc-typography--headline6">Formation</h2>
			      </div>
			      <div class="mdc-card__secondary" v-for="s in formation">
			        <h1>{{ s.school }}</h1> 
			        <span class="infoExp">{{ s.diploma }}</span>
			        <p> {{ s.content }} </p> 
			      </div>
      		</div>
			  </div>

			  <div class="mdc-layout-grid__cell--span-12">
					<div class="mdc-card">
			      <div class="mdc-card__primary">
			        <h2 class="demo-card__title mdc-typography--headline6"> Project </h2>
			      </div>
			      <div class="mdc-card__secondary" v-for="p in projects">
			        <a v-bind:href="p.url" target="_blank"> <h1> {{p.title}} </h1> </a>
		       	 	<p>{{ p.description }}</p>
			        <span class="infoExp"> {{ p.techno }}</span>
			      </div>
      		</div>
			  </div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	created() {
		let user = localStorage.getItem('user');

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
			projects     : [
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
			formation    : [
				{ school: 'Polytech Paris Sud', diploma: 'Diplome de lingéneieur', content: 'Sed id diam eget dolor euismod fermentum id eget orci. Etiam ultrices, tortor convallis sollicitudin faucibus, libero dolor tempus odio, sit amet sodales lorem libero id velit. Sed at rhoncus massa. Ut a porta sem, ut dignissim tellus. Suspendisse id venenatis lectus. Ut ornare condimentum interdum. Etiam vitae justo volutpat, consequat purus aliquet, consequat risus. Integer non facilisis urna. Cras non laoreet orci. Sed faucibus malesuada nibh vitae dictum. Aliquam pretium tincidunt imperdiet. Nunc finibus imperdiet eros. Pellentesque varius lorem ut ante pellentesque tempor. ' },
				{ school: 'Polytech Paris Sud', diploma: 'Diplome obtenu en etude', content: 'Sed id diam eget dolor euismod fermentum id eget orci. Etiam ultrices, tortor convallis sollicitudin faucibus, libero dolor tempus odio, sit amet sodales lorem libero id velit. Sed at rhoncus massa. Ut a porta sem, ut dignissim tellus. Suspendisse id venenatis lectus. Ut ornare condimentum interdum. Etiam vitae justo volutpat, consequat purus aliquet, consequat risus. Integer non facilisis urna. Cras non laoreet orci. Sed faucibus malesuada nibh vitae dictum. Aliquam pretium tincidunt imperdiet. Nunc finibus imperdiet eros. Pellentesque varius lorem ut ante pellentesque tempor. ' },
				{ school: 'Polytech Paris Sud', diploma: 'Diplome obtenu en etude', content: 'Sed id diam eget dolor euismod fermentum id eget orci. Etiam ultrices, tortor convallis sollicitudin faucibus, libero dolor tempus odio, sit amet sodales lorem libero id velit. Sed at rhoncus massa. Ut a porta sem, ut dignissim tellus. Suspendisse id venenatis lectus. Ut ornare condimentum interdum. Etiam vitae justo volutpat, consequat purus aliquet, consequat risus. Integer non facilisis urna. Cras non laoreet orci. Sed faucibus malesuada nibh vitae dictum. Aliquam pretium tincidunt imperdiet. Nunc finibus imperdiet eros. Pellentesque varius lorem ut ante pellentesque tempor. ' },
				{ school: 'Polytech Paris Sud', diploma: 'Diplome obtenu en etude', content: 'Sed id diam eget dolor euismod fermentum id eget orci. Etiam ultrices, tortor convallis sollicitudin faucibus, libero dolor tempus odio, sit amet sodales lorem libero id velit. Sed at rhoncus massa. Ut a porta sem, ut dignissim tellus. Suspendisse id venenatis lectus. Ut ornare condimentum interdum. Etiam vitae justo volutpat, consequat purus aliquet, consequat risus. Integer non facilisis urna. Cras non laoreet orci. Sed faucibus malesuada nibh vitae dictum. Aliquam pretium tincidunt imperdiet. Nunc finibus imperdiet eros. Pellentesque varius lorem ut ante pellentesque tempor. ' }
			],
			skills				: ['Lorem', 'Ipsum','Lorem', 'Ipsum','Lorem', 'Ipsum','Lorem', 'Ipsum','Lorem', 'Ipsum','Lorem']
		}
	},
	methods: {
		test() {

		}
	}
}
</script>


