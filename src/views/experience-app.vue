<template>
    <h1>Hello</h1>
</template>

<script>
export default {
    created(){
       this.$store.dispatch({type: 'loadExps'})
    }
}


</script>