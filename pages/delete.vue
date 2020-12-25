<template>
<div v-if="user && user.email=='g16908hn@gm.tsuda.ac.jp'">
  <v-btn @click="deleteAll">delete all</v-btn>
</div>
</template>

<script>
export default{
    computed: {
	user() {
	    return this.$store.state.user
	}
    },
    methods: {
	deleteAll() {
	    this.$store.dispatch('deleteAll')
	    this.$store.dispatch('stopGame')
	}
    }
}
</script>
