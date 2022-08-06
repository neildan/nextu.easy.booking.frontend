<script>
let host = `http://localhost:1337`;
let routeTheaterHalls = "/api/theaterHalls";
let routeEvents = "/api/events";
let routeFunctions = "/api/functions";
let routeSpectators = "/api/spectators";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.js";
import "fa-icons";

export default {
  data() {
    return {
      errorLoad: "",
      moduleTheaterHalls: false,
      moduleEvents: false,
      moduleFunctions: false,
      dataTheaters: [],
      dataEvents: [],
      dataFunctions: [],
      dataSpectators: [],
      titleModal: "",
      textModal: "",
      statusFormModal: "",
      isEditCreateEvent: false,
      isEditCreateTheater: false,
      isCreateFunction: false,
      idRoute: 0,
      formEvent: {
        name: "",
        url_image: "",
        theater_hall_id: 0,
      },
      formTheater: {
        theater: "",
        amount_chairs: 0,
      },
      formFunction: {
        hour: "",
        event_id: 0,
      },
      errorEventTheater: {
        show: false,
        message: "Seleccionar el teatro es obligatorio",
      },
      errorEventName: {
        show: false,
        message: "Escribir un evento que tenga más de 3 letras es obligatorio",
      },
      errorTheaterName: {
        show: false,
        message: "Escribir un teatro que tenga más de 3 letras es obligatorio",
      },
      errorTheaterChairs: {
        show: false,
        message: "Digitar por lo menos 1 silla es obligatorio",
      },
      errorFunctionHour: {
        show: false,
        message: "La hora de la función es obligatoria",
      },
      errorFunctionEvent: {
        show: false,
        message: "Seleccionar el evento es obligatorio",
      },
      messageModalErrorForm: "",
    };
  },
  methods: {
    //sessionStorage.token
    async getTheaters() {
      let url = `${host}${routeTheaterHalls}`;
      try {
        const response = await fetch(url);
        const dataResponse = await response.json();
        if (!dataResponse) throw "Fallo al intentar obtener los teatros";
        if (!dataResponse.success || dataResponse.data.length == 0)
          throw dataResponse.msj;
        this.dataTheaters = dataResponse.data;
      } catch (e) {
        this.errorLoad = e;
      }
    },
    async getEvents() {
      let url = `${host}${routeEvents}`;
      try {
        const response = await fetch(url);
        const dataResponse = await response.json();
        if (!dataResponse) throw "Fallo al intentar obtener los eventos";
        if (!dataResponse.success || dataResponse.data.length == 0)
          throw dataResponse.msj;
        this.dataEvents = dataResponse.data;
      } catch (e) {
        this.errorLoad = e;
      }
    },
    async getFunctions() {
      let url = `${host}${routeFunctions}`;
      try {
        const response = await fetch(url);
        const dataResponse = await response.json();
        if (!dataResponse) throw "Fallo al intentar obtener las funciones";
        if (!dataResponse.success || dataResponse.data.length == 0)
          throw dataResponse.msj;
        this.dataFunctions = dataResponse.data;
      } catch (e) {
        this.errorLoad = e;
      }
    },
    async getSpectators() {
      let url = `${host}${routeSpectators}`;
      try {
        const response = await fetch(url);
        const dataResponse = await response.json();
        if (!dataResponse) throw "Fallo al intentar obtener los espectadores";
        if (!dataResponse.success || dataResponse.data.length == 0)
          throw dataResponse.msj;
        this.dataSpectators = dataResponse.data;
      } catch (e) {
        this.errorLoad = e;
      }
    },
    async actionsForm() {
      let route = "";
      let params = {};
      try {
        switch (this.statusFormModal) {
          case "theater":
            if (!this.validateTheater()) throw false;
            route =
              this.idRoute == 0
                ? routeTheaterHalls
                : `${routeTheaterHalls}/${this.id}`;
            params = {
              method: this.idRoute == 0 ? "POST" : "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(this.formTheater),
            };
            break;
          case "event":
            if (!this.validateEvent()) throw false;
            route =
              this.idRoute == 0 ? routeEvents : `${routeEvents}/${this.id}`;
            params = {
              method: this.idRoute == 0 ? "POST" : "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(this.formEvent),
            };
            break;
          case "function":
            if (!this.validateFunction()) throw false;
            route = routeFunctions;
            params = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(this.formFunction),
            };
            break;
          case "d-theater":
            route = `${routeTheaterHalls}/${this.id}`;
            params = {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
            };
            break;
          case "d-event":
            route = `${routeEvents}/${this.id}`;
            params = {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
            };
            break;
          case "d-function":
            route = `${routeFunctions}/${this.id}`;
            params = {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
            };
            break;
        }
        if (route == "" || params == {}) throw false;
        try {
          const response = await fetch(`${host}${route}`, params);
          const dataResponse = await response.json();
          if (!dataResponse) throw "Fallo al intentar conectarse al Backend";
          if (!dataResponse.success || dataResponse.data.length == 0)
            throw dataResponse.msj;
          alert(dataResponse.data.id);
          document.getElementById("button-form-save").disabled = false;
        } catch (e) {
          this.errorLoad = e;
        }
      } catch (errorValidate) {
        console.log(errorValidate);
        document.getElementById("button-form-save").disabled = true;
      }
    },
    validateTheater() {
      try {
        if (this.formTheater.theater.length < 3) {
          this.errorTheaterName.show = true;
          throw false;
        } else {
          this.errorTheaterName.show = false;
        }
        if (this.formTheater.amount_chairs < 1) {
          this.errorTheaterChairs.show = true;
          throw false;
        } else {
          this.errorTheaterChairs.show = false;
        }
        return true;
      } catch (e) {
        this.messageModalErrorForm =
          "Dato incorrecto, por favor abrir de nuevo el formulario";
        return false;
      }
    },
    validateEvent() {
      try {
        if (this.formEvent.name.length < 3) {
          this.errorEventName.show = true;
          throw false;
        } else {
          this.errorEventName.show = false;
        }
        if (this.formEvent.theater_hall_id < 1) {
          this.errorEventTheater.show = true;
          throw false;
        } else {
          this.errorEventTheater.show = false;
        }
        //url_image
        return true;
      } catch (e) {
        this.messageModalErrorForm =
          "Dato incorrecto, por favor abrir de nuevo el formulario";
        return false;
      }
    },
    validateFunction() {
      try {
        if (this.formFunction.hour == "") {
          this.errorFunctionHour.show = true;
          throw false;
        } else {
          this.errorFunctionHour.show = false;
        }
        if (this.formFunction.event_id < 1) {
          this.errorFunctionEvent.show = true;
          throw false;
        } else {
          this.errorFunctionEvent.show = false;
        }
        return true;
      } catch (e) {
        this.messageModalErrorForm =
          "Dato incorrecto, por favor abrir de nuevo el formulario";
        return false;
      }
    },
    showModule(id) {
      switch (id) {
        case 2:
          if (this.dataEvents.length == 0) this.getEvents();
          this.moduleTheaterHalls = false;
          this.moduleEvents = true;
          this.moduleFunctions = false;
          break;
        case 3:
          if (this.dataFunctions.length == 0) this.getFunctions();
          this.moduleTheaterHalls = false;
          this.moduleEvents = false;
          this.moduleFunctions = true;
          break;
        default:
          if (this.dataTheaters.length == 0) this.getTheaters();
          if (this.dataSpectators.length == 0) this.getSpectators();
          this.moduleTheaterHalls = true;
          this.moduleEvents = false;
          this.moduleFunctions = false;
          break;
      }
    },
    getSpectator(id) {
      let spectators = this.dataSpectators;
      let newSpectator = spectators.find((spectator) => spectator.id == id);
      return newSpectator
        ? newSpectator.email + " - " + newSpectator.phone
        : "";
    },
    editCreateTheater(theater) {
      this.statusFormModal = "theater";
      this.textModal = "Formulario de teatros:";
      if (theater) {
        this.titleModal = "Editar Teatro";
        this.formTheater = {
          theater: theater.theater,
          amount_chairs: theater.amount_chairs,
        };
        this.idRoute = theater.id;
      } else {
        this.titleModal = "Crear Teatro";
        this.formTheater = {
          theater: "",
          amount_chairs: 0,
        };
        this.idRoute = 0;
      }
      this.activeFormTheater();
      this.openModal();
    },
    editCreateEvent(eventObject = null) {
      if (this.dataTheaters.length == 0) this.getTheaters();
      this.statusFormModal = "event";
      this.textModal = "Formulario de eventos:";
      if (eventObject) {
        this.titleModal = "Editar Evento";
        this.formEvent = {
          name: eventObject.name,
          url_image: eventObject.url_image,
          theater_hall_id: parseInt(eventObject.theater_hall_id.id),
        };
        this.idRoute = eventObject.id;
      } else {
        this.titleModal = "Crear Evento";
        this.formEvent = {
          name: "",
          url_image: "",
          theater_hall_id: 0,
        };
        this.idRoute = 0;
      }
      this.activeEventForm();
      this.openModal();
    },
    createFunction() {
      if (this.dataEvents.length == 0) this.getEvents();
      this.formFunction = {
        hour: "",
        event_id: 0,
      };
      this.idRoute = 0;
      this.statusFormModal = "function";
      this.textModal = "Formulario de funciones:";
      this.titleModal = "Crear Función";
      this.activeFormFunction();
      this.openModal();
    },
    deleteTheater(theater) {
      this.statusFormModal = "d-theater";
      this.titleModal = "Eliminar Teatro";
      this.textModal = `¿Está seguro que desea eliminar el teatro: ${theater.theater}?`;
      this.idRoute = theater.id;
      this.inactiveForm();
      this.openModal();
    },
    deleteEvent(eventObject) {
      this.statusFormModal = "d-event";
      this.titleModal = "Eliminar Evento";
      this.textModal = `¿Está seguro que desea eliminar el evento: ${eventObject.name}?`;
      this.idRoute = eventObject.id;
      this.inactiveForm();
      this.openModal();
    },
    deleteFunction(functionObject) {
      this.statusFormModal = "d-function";
      this.titleModal = "Eliminar Función";
      this.textModal = `¿Está seguro que desea eliminar la función: ${functionObject.hour}?`;
      this.idRoute = functionObject.id;
      this.inactiveForm();
      this.openModal();
    },
    activeEventForm() {
      this.isEditCreateEvent = true;
      this.isEditCreateTheater = false;
      this.isCreateFunction = false;
    },
    activeFormTheater() {
      this.isEditCreateEvent = false;
      this.isEditCreateTheater = true;
      this.isCreateFunction = false;
    },
    activeFormFunction() {
      this.isEditCreateEvent = false;
      this.isEditCreateTheater = false;
      this.isCreateFunction = true;
    },
    inactiveForm() {
      this.isEditCreateEvent = false;
      this.isEditCreateTheater = false;
      this.isCreateFunction = false;
    },
    openModal() {
      this.messageModalErrorForm = "";
      this.errorEventTheater.show = false;
      this.errorEventName.show = false;
      this.errorTheaterName.show = false;
      this.errorTheaterChairs.show = false;
      this.errorFunctionHour.show = false;
      this.errorFunctionEvent.show = false;
      document.getElementById("button-form-save").disabled = false;
      var modalActions = new bootstrap.Modal(
        document.getElementById("modalForms")
      );
      modalActions.show();
    },
  },
  mounted() {
    this.showModule();
    this.getTheaters();
  },
};
</script>

<template>
  <div class="row">
    <div class="col-md-3 col-sm-12 mb-4">
      <div id="list-menu" class="list-group">
        <button
          class="list-group-item list-group-item-action"
          @click="showModule(1)"
        >
          Teatros
        </button>
        <button
          class="list-group-item list-group-item-action"
          @click="showModule(2)"
        >
          Eventos
        </button>
        <button
          class="list-group-item list-group-item-action"
          @click="showModule(3)"
        >
          Funciones
        </button>
      </div>
      <p>{{ this.errorLoad }}</p>
    </div>
    <div class="col-md-9 col-sm-12">
      <div v-show="moduleTheaterHalls">
        <h2 class="mb-4">Teatros</h2>
        <p class="float-start">
          Los teatros son donde nace todo, son el lugar físico donde ocurre los
          eventos
        </p>
        <button
          type="button"
          class="btn btn-outline-success btn-sm float-end button-form"
          @click="editCreateTheater()"
        >
          Crear Nuevo Teatro
        </button>
        <div v-if="dataTheaters.length > 0" class="mt-5">
          <div class="table-responsive col-12 mb-5">
            <table class="table table-striped mt-3">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Sillas</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in dataTheaters" :key="item.id">
                  <td>{{ item.theater }}</td>
                  <td>{{ item.amount_chairs }}</td>
                  <td>
                    <fa-icon
                      @click="editCreateTheater(item)"
                      class="fas fa-edit iconTable"
                      color="#1b75bb"
                      size="1em"
                    ></fa-icon>
                    <fa-icon
                      @click="deleteTheater(item)"
                      class="fas fa-trash iconTable delete"
                      color="#c10000"
                      size="1em"
                    ></fa-icon>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div v-else>No hay registros disponibles</div>
      </div>
      <div v-show="moduleEvents">
        <h2 class="mb-4">Eventos</h2>
        <p class="float-start">Los eventos son el corazón, son la obra.</p>
        <button
          type="button"
          class="btn btn-outline-success btn-sm float-end button-form"
          @click="editCreateEvent()"
        >
          Crear Nuevo Evento
        </button>
        <div v-if="dataEvents.length > 0" class="mt-5">
          <div class="table-responsive col-12 mb-5">
            <table class="table table-striped mt-3">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Teatro</th>
                  <th>Funciones</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in dataEvents" :key="item.id">
                  <td>{{ item.name }}</td>
                  <td>{{ item.theater_hall_id.theater }}</td>
                  <td>{{ item.theFunction.length }}</td>
                  <td>
                    <fa-icon
                      @click="editCreateEvent(item)"
                      class="fas fa-edit iconTable"
                      color="#1b75bb"
                      size="1em"
                    ></fa-icon>
                    <fa-icon
                      @click="deleteEvent(item)"
                      class="fas fa-trash iconTable delete"
                      color="#c10000"
                      size="1em"
                    ></fa-icon>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div v-else>No hay registros disponibles</div>
      </div>
      <div v-show="moduleFunctions">
        <h2 class="mb-4">Funciones</h2>
        <p class="float-start">
          Las funciones son la cantidad de veces que se va a repetir un evento y
          en qué horario
        </p>
        <button
          type="button"
          class="btn btn-outline-success btn-sm float-end button-form"
          @click="createFunction()"
        >
          Crear Nueva Función
        </button>
        <div v-if="dataFunctions.length > 0" class="mt-5">
          <div class="table-responsive col-12 mb-5">
            <table class="table table-striped mt-3">
              <thead>
                <tr>
                  <th>Evento</th>
                  <th>Hora</th>
                  <th>Espectadores</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in dataFunctions" :key="item.id">
                  <td>{{ item.event_id.name }}</td>
                  <td>{{ item.hour }}</td>
                  <td>
                    <span
                      v-if="
                        item.spectatorFunction.length > 0 &&
                        dataSpectators.length > 0
                      "
                    >
                      <ol>
                        <li
                          v-for="spectatorF in item.spectatorFunction"
                          :key="spectatorF.id"
                        >
                          {{ getSpectator(spectatorF.id) }}
                        </li>
                      </ol>
                    </span>
                    <span v-else> No tiene espectadores </span>
                  </td>
                  <td>
                    <fa-icon
                      @click="deleteFunction(item)"
                      class="fas fa-trash iconTable delete"
                      color="#c10000"
                      size="1em"
                    ></fa-icon>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div v-else>No hay registros disponibles</div>
      </div>
    </div>
  </div>

  <div class="modal" id="modalForms" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ titleModal }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>{{ textModal }}</p>
          <div v-show="isEditCreateTheater">
            <div class="mb-3">
              <label for="nameTheater" class="form-label"
                >Nombre del teatro</label
              >
              <input
                v-model="formTheater.theater"
                type="text"
                class="form-control"
                id="nameTheater"
              />
              <small class="error" v-show="errorTheaterName.show">{{
                errorTheaterName.message
              }}</small>
            </div>
            <div class="mb-3">
              <label for="chairsTheater" class="form-label"
                >Cantidad de asientos</label
              >
              <input
                v-model="formTheater.amount_chairs"
                type="number"
                class="form-control"
                id="chairsTheater"
              />
              <small class="error" v-show="errorTheaterChairs.show">{{
                errorTheaterChairs.message
              }}</small>
            </div>
          </div>
          <div v-show="isEditCreateEvent">
            <div class="mb-3">
              <label for="nameEvent" class="form-label"
                >Nombre del evento</label
              >
              <input
                v-model="formEvent.name"
                type="text"
                class="form-control"
                id="nameEvent"
              />
              <small class="error" v-show="errorEventName.show">{{
                errorEventName.message
              }}</small>
            </div>
            <div class="mb-3">
              <label for="idTheater" class="form-label">Teatro</label>
              <select
                v-model="formEvent.theater_hall_id"
                id="idTheater"
                class="form-select"
              >
                <option selected value="0">Seleccione</option>
                <option
                  v-for="item in dataTheaters"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.theater }}
                </option>
              </select>
              <small class="error" v-show="errorEventTheater.show">{{
                errorEventTheater.message
              }}</small>
            </div>
          </div>
          <div v-show="isCreateFunction">
            <div class="mb-3">
              <label for="hourFunction" class="form-label"
                >Hora de la función</label
              >
              <input
                v-model="formFunction.hour"
                type="hour"
                class="form-control"
                id="hourFunction"
              />
              <small class="error" v-show="errorFunctionHour.show">{{
                errorFunctionHour.message
              }}</small>
            </div>
            <div class="mb-3">
              <label for="idEvent" class="form-label">Evento</label>
              <select
                v-model="formFunction.event_id"
                id="idEvent"
                class="form-select"
              >
                <option selected value="0">Seleccione</option>
                <option
                  v-for="item in dataEvents"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.name }}
                </option>
              </select>
              <small class="error" v-show="errorFunctionEvent.show">{{
                errorFunctionEvent.message
              }}</small>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <small class="error">{{ messageModalErrorForm }}</small>
          <button
            type="button"
            class="btn btn-primary"
            id="button-form-save"
            @click="actionsForm"
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.delete {
  margin-left: 10px !important;
}
.error {
  color: red;
  font-weight: bold;
}
th {
  font-weight: bold !important;
}
.button-form {
  margin-top: -5px;
}
</style>