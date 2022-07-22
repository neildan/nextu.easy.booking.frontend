<script>
import API from '../Services/Api';
export default {
  data() {
    return {
      title: "Canciones Gratis para la comunidad",
      songs: [
        {
          name: "I Want to Break Free",
          song: "songs/uno.mp3",
          description:
            "Alegato de la diversidad y ruptura con todo lo establecido previamente. Este tema que, se ilustró en vídeo con una parodia de la acomodada sociedad británica, provocó unas cuantas polémicas donde FredyMercury, Brian May, John Deacon y Roger Taylor se lo pasaron de lo lindo",
          img: "img/icon_1.svg",
          link: "https://www.youtube.com/watch?v=f4Mc-NYPHaQ",
        },
        {
          name: "The Show Must Go On",
          song: "songs/dos.mp3",
          description:
            "Una premonición cuando Freddie Mercury sabía que el final se acercaba. Toda la potencia vocal de FreMercury puesta al servicio del espectáculo a pesar de saber que los días estaban contados en este single lanzado en Innuendo en 1991, (7) siete meses antes de la muerte de Freddie Mercury",
          img: "img/icon_4.svg",
          link: "https://www.youtube.com/watch?v=t99KH0TR-J4",
        },
        {
          name: "Under Pressure",
          song: "songs/tres.mp3",
          description:
            "Nos cuesta mucho intentar evitar poner imágenes de aquel par de días mágicos de agosto en Wembley en 1986, pero es que es inevitable. El torrente Mercury en todo su esplendor, junto a otro genio de la música, David Bowie, levantando a 70.000 personas literalmente al cielo.",
          img: "img/icon_3.svg",
          link: "https://www.youtube.com/watch?v=a01QQZyl-_I",
        },
      ],
    };
  },
  methods: {
    getMyData() {
      console.log(API.getData());
    }
  }
};
</script>

<template>
  <button type="button" @click="getMyData">Holaaa</button>

  <h2 class="text-center mt-4">Top 3 Canciones</h2>
  <hr />

  <div class="col-12 mt-4 mb-4">
    <div class="row">
      <span v-for="item in songs" :key="item" class="col-md-4 col-sm-12">
        <div class="card text-dark bg-light p-3 ml-3 mb-3">
          <img :src="item.img" class="card-img-top center-img" alt="Img 1" />
          <div class="card-body text-center">
            <h5 class="card-title">{{ item.name }}</h5>
            <p class="card-text">{{ item.description }}</p>
            <audio controls>
              <source :src="item.song" type="audio/mp3" />
            </audio>
            <a :href="item.link" target="_blank" class="btn btn-primary btn-sm"
              >Ver discografía del artista</a
            >
          </div>
        </div>
      </span>
    </div>
  </div>
</template>

<style scoped>
#img-background:hover {
  filter: brightness(1.3);
}

.card:hover {
  margin: 10px;
  box-shadow: 0px 0px 10px 2px #363636;
}
</style>