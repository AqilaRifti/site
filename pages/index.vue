<script setup>
import { onMounted } from 'vue';
onMounted(() => {
  // Access the hash from the URL
  const hash = window.location.hash;

  if (hash) {
    console.log("there is a ahash")
    
  }
});
useHead({
  title: `API | Beranda`,
  meta: [
    { name: 'Halaman Utama', content: 'Halaman utama asisten pelajar indonesia' }
  ],
})


const layout = "basic";
</script>

<script>
export default {
  data() {
    return {
      tiles: Array(200).fill("tile-default"), // More tiles (400 tiles)
    };
  },
  mounted() {
    this.startTileChange();
  },
  methods: {
    startTileChange() {
      setInterval(() => {
        const newTiles = this.tiles.map(() =>
          Math.random() > 0.9 ? "tile-active" : "tile-default"
        ); // Fewer tiles light up (10% probability)
        this.tiles = newTiles;
      }, 2000); // Change tiles every 2 seconds
    },
  },
};
</script>

<template>
  <NuxtLayout :name="layout">
    <div></div>
    <div class="landing-page">
      <div class="background">
        <div
          v-for="(tile, index) in tiles"
          :key="index"
          :class="['tile', tile]"
        ></div>
      </div>

      <div class="content">
        <span class="badge">BIMBINGAN BELAJAR 100% GRATIS!</span>
        <h1>Membawa Pelajar Menuju Indonesia Emas 2045</h1>
        <p>
          Akademi Ilmu Remaja adalah sebuah <i>platform</i> yang menyediakan bimbingan belajar dan lingkungan belajar dengan menggunakan <i>Artificial Intelligence</i>
          yang bertujuan untuk membantu para pelajar dalam pencarian ilmunya
        </p>
        <NuxtLink to="/register"><button class="get-started">Daftar →</button></NuxtLink>
        <div class="wrap">
        <div class="browser-window">
            <div class="browser-header">
                <div class="browser-buttons">
                    <div class="browser-button close"></div>
                    <div class="browser-button minimize"></div>
                    <div class="browser-button zoom"></div>
                </div>
                <div>Chat Akademi Ilmu Remaja</div>
                <div></div>
            </div>
            <div class="browser-content">
              <iframe src="https://echat.up.railway.app/Milarian_Jawaban" frameborder="0"></iframe>
            </div>
          </div>
        </div>
      </div>
      
  </div>
  </NuxtLayout>
</template>

<style scoped>
iframe {
  width: 100%;
  height: 100%;
}
.landing-page {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(20, 1fr); /* More columns */
  grid-template-rows: repeat(10, 1fr); /* More rows */
  gap: 0.5px; /* Less gap between tiles */
  background-color: #f88197; /* Color of the gap */

}

.tile {
  width: 100%;
  height: 100%;
  background-color: #f4f4f4;
  transition: background-color 0.5s;
}

.tile-active {
  background-color: #fad5da; /* Fire-like effect */
}

.content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: #333;
  margin-top: 10vh; 
}

.badge {
  display: inline-block;
  background-color: #ff6b81;
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  margin-bottom: 16px;
}

h1 {
  font-size: 48px;
  color: #2c3e50;
  margin: 0;
  font-weight: 800;
}

p {
  font-size: 18px;
  margin: 16px 0;
  color: #7f8c8d;
}

.get-started {
  background-color: #ff6b81;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.get-started:hover {
  background-color: #ff3b5e;
}
@media (max-width : 400px) {
    h1 {
      font-size: 30px;
      font-weight: 700;
    }
}
.wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}
.browser-window {
            margin-top: 5rem;
            margin-bottom: 3rem;
            width: 84vw;
            border: 2px solid #ebbdbd;
            border-radius: 10px;
            background-color: white;
            box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
        }

        .browser-header {
            background-color: #f9f9f9;
            padding: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #f9f9f9;
            border-radius: 10px 10px 0 0;
        }

        .browser-buttons {
            display: flex;
            gap: 8px;
        }

        .browser-button {
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: rgb(255, 95, 87);
            display: inline-block;
            cursor: pointer;
        }

        .browser-button.minimize {
            background-color: rgb(254, 186, 46);
        }

        .browser-button.zoom {
            background-color: rgb(40, 200, 46);
        }

        .browser-content {
            height: 90vh;
            overflow: auto;
        }
</style>

