<template>
  <header class="header">
    <b-container>


    <b-navbar toggleable="lg">
    <b-navbar-brand href="#"><img src="~/assets/img/logo.png" /></b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/">Home</b-nav-item>
        <b-nav-item to="/product">Products</b-nav-item>
        <b-nav-item href="#">Industries</b-nav-item>
        <b-nav-item href="#">Solutions</b-nav-item>
        <b-nav-item to="/resources">Resources</b-nav-item>
        <b-nav-item to="/support">Support</b-nav-item>
        <b-nav-item v-if="isLogin===true" @click="logout">Logout</b-nav-item>
        
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="lang-bdr">
        <b-nav-item-dropdown text="EN" right>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">ES</b-dropdown-item>
          <b-dropdown-item href="#">RU</b-dropdown-item>
          <b-dropdown-item href="#">FA</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
    </b-container>
  </header>
</template>
<script>
export default {
  computed: {
    isLogin() {
      return this.$store.state.isLoggedIn;
    }
  },
  methods:{
    logout(){
      this.$store.dispatch('logout')
      this.$toast.success('Logout Successful')
    }
  }
}
</script>