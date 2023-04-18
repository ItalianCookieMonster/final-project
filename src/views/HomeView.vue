<script>
import supabase from '../supabase/index'
export default {
  name: 'HomeView',
  async created() {
    const { data: { user } } = await supabase.auth.getUser()
    console.log(user)
  }
}
</script>

<template>
  <h1>
    Home View
  </h1>
</template>
