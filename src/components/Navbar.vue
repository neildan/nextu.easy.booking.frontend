<script>
export default {
  data() {
    return {
      title: "Easy Booking",
    };
  },
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <figure>
          <img src="img/logo.png" alt="Logo" />
        </figure>
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link
              to="/"
              class="nav-link active"
              aria-current="page"
              id="title"
              >{{ title }}</router-link
            >
          </li>
        </ul>
        <router-link to="/auth" class="btn btn-outline-success">Administrador</router-link>
      </div>
    </div>
  </nav>
</template>

<style scoped>
#title {
  font-weight: bold;
  font-size: 2rem;
}
figure {
  margin: 0px;
}
.nav-link {
  color: white;
}
</style>
