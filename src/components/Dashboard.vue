<script>
let host = `http://localhost:1337`;
let routeEvents = "/api/events";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.js";

export default {
  props: ["message"],
  data() {
    return {
      title: "Easy Booking tu gran aliado para reservar",
      slogan: "Encuentra la mejor experiencia de tu vida",
      errorLoad: "",
      listEvents: [],
      showElement: false,
    };
  },
  methods: {
    searchEvents() {
      let search = document.getElementById("search-events").value.toLowerCase();
      this.listEvents.forEach(function (elem) {
        if (elem.content.name.toLowerCase().indexOf(search) == -1) {
          elem.className = "hide";
        } else {
          elem.className = "col-md-4 col-sm-12";
        }
      });
    },
    async getEvents() {
      let url = `${host}${routeEvents}`;
      try {
        const response = await fetch(url);
        const dataResponse = await response.json();
        if (!dataResponse.success || dataResponse.code != 200)
          throw dataResponse.msj;
        let result = [];
        dataResponse.data.forEach(function (elem) {
          result.push({
            content: elem,
            className: "col-md-4 col-sm-12",
          });
        });
        this.listEvents = result;
      } catch (e) {
        this.errorLoad = e;
      }
    },
  },
  mounted() {
    this.getEvents();
    if (this.message) {
      this.showElement = true;
      let successAlert = document.getElementById("successAlert");
      new bootstrap.Alert(successAlert);
    }
  },
};
</script>

<template>
  <div v-show="showElement">
    <div
      class="
        alert alert-success
        d-flex
        align-items-center
        alert-dismissible
        fade
        show
      "
      role="alert"
      id="successAlert"
    >
      <img
        src="checked.png"
        class="bi flex-shrink-0 me-2"
        width="24"
        height="24"
        role="img"
        aria-label="Success:"
      />
      <div><b>Felicidades, agendaste el evento: {{ this.message }}</b></div>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  </div>

  <div class="col-md-12 col-sm-12">
    <figure>
      <img id="img-background" src="/img/dashboard.png" alt="dashboard" />
    </figure>
  </div>
  <h1>{{ title }}</h1>
  <h3>{{ slogan }}</h3>

  <h3 v-show="errorLoad.length > 0" class="col-12 mt-4">
    {{ this.errorLoad }}
  </h3>

  <label id="label-search" class="mt-4" for="search-events"
    >Busca la obra que quieras</label
  >
  <input
    class="form-control me-2 mb-4"
    type="search"
    placeholder="Buscar"
    @input="searchEvents"
    id="search-events"
    aria-label="Search"
  />

  <div v-if="listEvents.length > 0" class="col-12 mb-5">
    <div class="row">
      <span v-for="item in listEvents" :key="item.id" :class="item.className">
        <div class="card mt-3 ml-4">
          <img :src="'/multimedia/'+item.content.url_image" class="card-img-top" />
          <div class="card-body">
            <h5 class="card-title">{{ item.content.name }}</h5>
            <p class="card-text">{{ item.content.theater_hall_id.theater }}</p>
            <div class="row">
              <div
                class="col-6"
                v-for="funtionContent in item.content.theFunction"
                :key="funtionContent.id"
              >
                <router-link
                  :to="{
                    name: 'schedule',
                    params: {
                      id: funtionContent.id,
                      eventId: item.content.id,
                    },
                  }"
                  class="col-12 ml-2 mb-2 btn btn-outline-success btn-sm"
                  id="funtionContent.id"
                  >{{ funtionContent.hour }}</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </span>
    </div>
  </div>
</template>

<style scoped>
figure > img {
  width: 100%;
}
.hide {
  display: none !important;
}
.card {
  box-shadow: 0px 0px 4px 4px grey;
}
.card:hover {
  box-shadow: 0px 0px 4px 4px #89743a;
}
#label-search {
  font-size: 1rem;
  font-weight: bold;
}

.alert-success{
  background-color: #aeffae !important;
}
</style>