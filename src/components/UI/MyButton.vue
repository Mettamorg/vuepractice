<template lang="">
    <button class="btn">
        <slot></slot>
    </button>
</template>
<script>
export default {
    name: 'my-button'
}
</script>
<style scoped>
.btn{
	border: 2px solid teal;
	padding: 10px 15px;
	background: none;
	color: teal;	
	}
</style>