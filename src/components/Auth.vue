<script>
export default {
  data() {
    return {
      errorEmail: {
        show: false,
        message: "Obligatorio. No es un correo valido",
      },
      errorPassword: {
        show: false,
        message: "Obligatorio. Mínimo debe ser 8 caracteres",
      },
    };
  },
  methods: {
    submit() {
      const emailRegex =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      let next = true;
      try {
        let errorEmail = document.getElementById("emailAuth").value;
        if (errorEmail.length <= 0 || !errorEmail.match(emailRegex)) {
          this.errorEmail.show = true;
          throw false;
        } else {
          this.errorEmail.show = false;
        }

        let pass1 = document.getElementById("passwordAuth").value;
        if (pass1.length < 8) {
          this.errorPassword.show = true;
          throw false;
        } else {
          this.errorPassword.show = false;
        }
      } catch (error) {
        next = error;
      }
      if (next) {
        window.location.href = "http://localhost:3000";
      }
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
          <form>
            <div class="mb-3">
              <label for="emailAuth" class="form-label"
                >Correo Electrónico</label
              >
              <input
                type="email"
                class="form-control"
                id="emailAuth"
                aria-describedby="emailHelp"
              />
              <small class="error" v-show="this.errorEmail.show">{{
                this.errorEmail.message
              }}</small>
            </div>
            <div class="mb-3">
              <label for="passwordAuth" class="form-label">Contraseña</label>
              <input type="password" class="form-control" id="passwordAuth" />
              <small class="error" v-show="this.errorPassword.show">{{
                this.errorPassword.message
              }}</small>
            </div>
            <button @click="submit" type="button" class="btn btn-primary">
              Continuar
            </button>
          </form>
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
</style>