<template>
  <div id="cvbase">
		CV Base

		<div class="mdc-layout-grid">
		  <div class="mdc-layout-grid__inner">
			  
		    <div class="mdc-layout-grid__cell--span-12 top">
     			<div class="mdc-layout-grid">
		  			<div class="mdc-layout-grid__inner">

			      	<div class="mdc-layout-grid__cell--span-12">
				  			<img v-bind:src="basicInformation.picture" v-if="basicInformation.picture" class="profile">
				      					    
					        <h2 >{{ basicInformation.title }}</h2>
					    		<p>
					      	{{ `${basicInformation.firstName} ${basicInformation.lastName}` }}
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
		  
			  <div class="mdc-layout-grid__cell--span-4 secRow">
			  	<div class="mdc-card">
			      <div class="mdc-card__primary">
			        <h2 class="demo-card__title mdc-typography--headline6">Competence</h2>
			      </div>
			      <div class="mdc-card__secondary">
			        Cette personne est competente
			      </div>
      		</div>
			  </div>
			  
			  <div class="mdc-layout-grid__cell--span-8 secRow">
			  	<div class="mdc-card">
			      <div class="mdc-card__primary">
			        <h2 class="demo-card__title mdc-typography--headline6">Experience</h2>
			      </div>
			      <div class="mdc-card__secondary" v-for="experience in experiences">
			      	<h1> {{ experience.title }} </h1> {{ experience.company }}, {{ experience.location }}
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
			        <span>{{ s.diploma }} {{ s.content }} </span>
			      </div>
      		</div>
			  </div>

			  <div class="mdc-layout-grid__cell--span-12">
					<div class="mdc-card">
			      <div class="mdc-card__primary">
			        <h2 class="demo-card__title mdc-typography--headline6">Project </h2>
			      </div>
			      <div class="mdc-card__secondary" v-for="p in projects">
			        <h1> {{p.title}} </h1>
			        <p>{{ p.description }}</p>
			        <span> {{ p.techno }}</span>
			      </div>
      		</div>
			  </div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: [ 'exp' ],
	created() {
		this.expreriences = this.exp;
	},
	data() {
		return {
			basicInformation : { 
				firstName 				: 'Gregoire',
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
				{ title: 'Lorem', content: 'ipsum...', company: 'Orange', location: 'Fr'
			}],
			projects     : [
				{ title: 'KEEPER', description: 'mieux que google KEEP', techno: 'NodeJS et vueJS' }
			],
			formation    : [
				{ school: 'ppS', diploma: 'ppS', content: 'lalalalalala' }
			]
		}
	},
	methods: {
		test() {

		}
	}
}
</script>


