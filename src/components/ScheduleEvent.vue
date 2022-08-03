<script>
let host = `http://localhost:1337`;
let routeSpectatorFunctions = "/api/spectatorFunctions";
let routeEvents = "/api/events";

export default {
  props: ["id", "eventId"],
  data() {
    return {
      title: "¡Ya casi son tuyas!",
      cardHeader: "Separa tus entradas",
      cardTitle: "Registra tus datos de contacto",
      spectatorFunctions: [],
      errorLoad: "",
      nameEvent: "",
      hourFunction: "",
      amountChair: 0,
      chairsDescription: "0 Puestos",
      emojisIcons: "",
      sumChair: 0,
      form: {
        chairs: 0,
        email: "",
        phone: "",
      },
      timerSecCount: 59,
      timerMinCount: 4,
      classTimer: 'timer-good'
    };
  },
  methods: {
    async getEventById() {
      let url = `${host}${routeEvents}`;
      try {
        const response = await fetch(`${url}/${parseInt(this.eventId)}`);
        const dataResponse = await response.json();
        if (!dataResponse.success || dataResponse.code != 200)
          throw dataResponse.msj;
        let data = dataResponse.data;
        this.nameEvent = data.name;
        let funtion = data.theFunction.find((elem) => {
          return elem.id == parseInt(this.id);
        });
        this.hourFunction = funtion.hour;
        this.amountChair = data.theater_hall_id.amount_chairs;
      } catch (e) {
        this.errorLoad = e;
      }
    },
    async getInputFuntions() {
      let url = `${host}${routeSpectatorFunctions}`;
      try {
        const response = await fetch(url);
        const dataResponse = await response.json();
        if (!dataResponse.success || dataResponse.code != 200)
          throw dataResponse.msj;
        let funtions = dataResponse.data.filter((elem) => {
          return parseInt(elem.function_id) === parseInt(this.id);
        });
        let sum = 0;
        if (Object.values(funtions).length > 0) {
          funtions.forEach((elem) => {
            sum += elem.chair;
          });
        }
        this.sumChair = sum;
        let chairsAvailable = parseInt(this.amountChair - this.sumChair);
        let chairs = [];
        for (let i = 1; i <= chairsAvailable; i++) {
          chairs.push({
            number: i,
            name: i > 1 ? i + " Sillas" : i + " Silla",
          });
        }
        document.getElementById("chairsInput").disabled = false;
        this.spectatorFunctions = chairs;
      } catch (e) {
        this.errorLoad = e;
      }
    },
    updateDescriptionChairs() {
      let chairs = this.form.chairs;
      let description = "";
      let icons = "";
      if (chairs > 0) {
        for (let i = 1; i <= chairs; i++) {
          let coma = i == 1 ? "" : ", ";
          description += `${coma} Puesto ${i + this.sumChair}`;
          icons += "🎟";
        }
        this.chairsDescription = description;
        this.emojisIcons = `Tickets: ${icons} (${chairs})`;
      } else {
        this.chairsDescription = "0 Puestos";
        this.emojisIcons = "";
      }
    },
    sendForm() {
      console.log(this.form);
    },
  },
  mounted() {
    this.getEventById();
    this.getInputFuntions();
  },
  watch: {
    timerSecCount: {
      handler() {
        if(this.timerMinCount == 2 && this.classTimer == 'timer-good') this.classTimer = 'timer-bad';
        if (this.timerMinCount >= 0 && this.timerSecCount > 0 ) {
          setTimeout(() => {
            this.timerSecCount--;
            if(this.timerSecCount == 0) {
              this.timerMinCount--;
              this.timerSecCount = 59
            }
          }, 1000);
        } else {
          window.location.href = window.location.href.slice(0,22);
        }
      },
      immediate: true,
    },
  },
};
</script>
<template>
  <h1 class="text-center">{{ title }}</h1>
  <div class="row mt-4">
    <div class="col-sm-12 col-md-8 mb-4">
      <div class="card">
        <div class="card-header">{{ cardHeader }}</div>
        <div class="card-body">
          <h5 class="card-title">{{ cardTitle }}</h5>
          <div class="mb-3">
            <label for="email" class="form-label">Correo</label>
            <input
              v-model="form.email"
              type="email"
              class="form-control"
              id="email"
            />
          </div>
          <div class="mb-3">
            <label for="phone" class="form-label">Numero telefonico</label>
            <input
              v-model="form.phone"
              type="text"
              class="form-control"
              id="phone"
            />
          </div>
          <div class="mb-3">
            <label for="chairs" class="form-label">Cantidad de sillas</label>
            <select
              @change="updateDescriptionChairs"
              v-model="form.chairs"
              id="chairsInput"
              class="form-select"
              disabled
            >
              <option selected value="0">Seleccione</option>
              <option
                v-for="item in spectatorFunctions"
                :key="item.id"
                :value="item.number"
              >
                {{ item.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="col-sm-12 col-md-4 mb-3">
      <h5>Tiempo restante</h5>
      <p class="timer">
        <span :class="classTimer">
          {{ timerMinCount }} : {{ timerSecCount }}
        </span>
      </p>
      <h5 class="mt-3">Resumen de la compra</h5>
      <p class="mt-3"><b>Nombre Evento: </b> {{ nameEvent }}</p>
      <p><b>Hora de la función: </b> {{ hourFunction }}</p>
      <p><b>Cantidad de sillas: </b> {{ chairsDescription }}</p>
      <p>
        {{ emojisIcons }}
      </p>
      <button
        type="button"
        @click="sendForm"
        class="col-12 btn btn-primary btn-sm"
      >
        Guardar
      </button>
    </div>
  </div>
</template>

<style scoped>
.timer {
  font-family: monospace;
  font-weight: bold;
  font-size: 3rem;
  text-align: center;
  margin-bottom: 0px;
}

.timer-good {
  color: green;
}

.timer-bad {
  color: red;
}
</style>