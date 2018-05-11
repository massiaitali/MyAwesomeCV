<template>
  <div id="cvbase">
		CV Base

		<div class="mdc-layout-grid">
		  <div class="mdc-layout-grid__inner">
		    <div class="mdc-layout-grid__cell--span-12">
		      <div class="mdc-card">
			      <div class="mdc-card__primary">
			        <h2 class="demo-card__title mdc-typography--headline6">{{ basicInformation.title }}</h2>
			      </div>
			      <div class="mdc-card__secondary">
			      	{{ `${basicInformation.firstName} ${basicInformation.lastName}` }}
			      </div>
			      <div class="mdc-card__secondary">
			      	{{ basicInformation.birthDate }}
			      </div>
			      <div class="mdc-card__secondary">
			      	{{ `${basicInformation.location} ${basicInformation.postCode} ${basicInformation.country}` }}
			      </div>
      		</div>
    		</div>
		  
			  <div class="mdc-layout-grid__cell--span-4">
			  	<div class="mdc-card">
			      <div class="mdc-card__primary">
			        <h2 class="demo-card__title mdc-typography--headline6">Competence</h2>
			      </div>
			      <div class="mdc-card__secondary">
			        Cette personne est competente
			      </div>
      		</div>
			  </div>
			  
			  <div class="mdc-layout-grid__cell--span-8">
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
				location 					: 'Paris'
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


