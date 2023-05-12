<template>
    <div class="overlay">
        <div class="container">
            <h2 class="title">Oops!</h2>
            <p class="text"> Page not found </p>
            <div class="img-container">
            </div>
            <button class="btn" @click="_redirectHome">Go back home</button>
        </div>
    </div>
</template>

<script>

export default {
    name: 'NotFound',

    methods: {
        _redirectHome() {
            this.$router.push({ name: 'home' })
        }
    }
}

</script>

<style scoped> 
.overlay {
     background-color: rgb(0 0 0 / 75%);
 }

 .title {
     font-size: 3rem;
     font-weight: 800;
 }

 .text {
     font-size: 2rem;
     font-weight: 700;
 }

 .container {
     position: relative;
     display: flex;
     flex-direction: column;
     justify-content: space-between;
     align-items: center;
     padding: 10px;
     width: 90%;
     top: 5%;
     margin-bottom: 20px;
     margin-top: 20px;
 }


 .img-container {
     background-image: url('../assets/images/notFound.jpg');
     background-size: cover;
     background-position: center;
     background-repeat: no-repeat;
     margin: 20px;
     width: 300px;
     height: 300px;
 }

 @media (min-width: 768px) {
     .title {
         font-size: 4rem;
         font-weight: 800;
     }

     .text {
         font-size: 3rem;
         font-weight: 800;
     }

 }

 @media (min-width: 992px) {

    .container {
        top: 0
    }
   .img-container{
    width: 400px;
    height: 400px;
   }

}

</style>