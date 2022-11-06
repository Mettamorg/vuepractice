<template lang="">
    <input :value="modelValue" @input="updateInput" type="text" class="input">
</template>
<script>
export default {
    name: 'my-input',
	props:{
		modelValue: [String, Number]
	},
	methods: {
		updateInput(event){
		this.$emit('update:modelValue', event.target.value)
		}
	}
}
</script>
<style scoped>
.input {
	width: 100%;
	border: 2px solid teal;
	margin-top: 10px;
	padding: 10px;
}
</style>