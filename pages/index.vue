<template>
<div v-if="user">
  <playingfield> </playingfield>
</div>
</template>

<script>
import playingfield from "~/components/playingField.vue"
export default {
    data() {
	return{
	    message:null,
	}
    },
    methods: {
	
    },
    computed: {
	user() {
	    return this.$store.state.user
	}
    },
    
    components: {
	playingfield
	
    }  
}
</script>
