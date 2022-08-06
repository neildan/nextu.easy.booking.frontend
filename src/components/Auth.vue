<script>
let host = `http://localhost:1337`;
let routeLogin = "/api/login";

export default {
  data() {
    return {
      errorUsername: {
        show: false,
        message: "Obligatorio. No es un usuario valido",
      },
      errorPassword: {
        show: false,
        message: "Obligatorio. Mínimo debe ser 3 caracteres",
      },
      form: {
        username: "",
        password: "",
      },
      errorLoad: "",
    };
  },
  methods: {
    async authLogin() {
      let url = `${host}${routeLogin}`;
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: this.form.username,
            password: this.form.password,
          }),
        });
        const dataResponse = await response.json();
        if (!dataResponse) throw "Fallo al intentar ingresar";
        if (!dataResponse.success || dataResponse.data.length == 0)
          throw dataResponse.msj;
        sessionStorage.token = dataResponse.data;
        let redirectRoute = window.location.href.slice(0, 22);
        window.location.href = `${redirectRoute}admin`
      } catch (e) {
        this.errorLoad = e;
      }
    },
    submit() {
      try {
        if (this.form.username.length <= 0) {
          this.errorUsername.show = true;
          throw false;
        } else {
          this.errorUsername.show = false;
        }

        if (this.form.password.length < 3) {
          this.errorPassword.show = true;
          throw false;
        } else {
          this.errorPassword.show = false;
        }
        this.authLogin();
      } catch (e) {}
    },
  },
};
</script>

<template>
  <div class="row justify-content-md-center p-3">
    <div class="card text-white bg-dark col-md-6 col-sm-12">
      <h5 class="card-header">Inicio de sesión</h5>
      <div class="card-body">
        <span class="card-text">
          <div class="mb-3">
            <label for="usernameAuth" class="form-label">Usuario</label>
            <input
              type="text"
              class="form-control"
              v-model="form.username"
              aria-describedby="usernameHelp"
            />
            <small class="error" v-show="errorUsername.show">{{
              errorUsername.message
            }}</small>
          </div>
          <div class="mb-3">
            <label for="passwordAuth" class="form-label">Contraseña</label>
            <input
              v-model="form.password"
              type="password"
              class="form-control"
            />
            <small class="error" v-show="errorPassword.show">{{
              errorPassword.message
            }}</small>
          </div>
          <button @click="submit" type="button" class="btn btn-primary">
            Continuar
          </button>
          <p>{{ errorLoad }}</p>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.error {
  color: red;
  font-weight: bold;
}
input {
  background: #404040;
  color: white;
}
</style>