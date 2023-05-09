<script setup>
import { ref } from 'vue';

const proyectosSemestre = ref([
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1655501459517-3e0953fc9ab3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        title: "Proyecto 1",
        ownerProject: "Juan Pérez",
        description: 'Este proyecto me gustó porque...',
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1655501459517-3e0953fc9ab3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        title: "Proyecto 2",
        ownerProject: "María Gutiérrez",
        description: 'Este proyecto me gustó porque...',
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1655501459517-3e0953fc9ab3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        title: "Proyecto 3",
        ownerProject: "Pedro García",
        description: 'Este proyecto me gustó porque...',
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1655501459517-3e0953fc9ab3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        title: "Proyecto 4",
        ownerProject: "Ana Rodríguez",
        description: 'Este proyecto me gustó porque...',
    },
    {
        id: 5,
        image: "https://images.unsplash.com/photo-1655501459517-3e0953fc9ab3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        title: "Proyecto 5",
        ownerProject: "Carlos Torres",
        description: 'Este proyecto me gustó porque...',
    },
    {
        id: 6,
        image: "https://images.unsplash.com/photo-1655501459517-3e0953fc9ab3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        title: "Proyecto 6",
        ownerProject: "Laura Martínez",
        description: 'Este proyecto me gustó porque...',
    }
]);
</script>

<template>
    <div class="section">
        <div class="container">
            <div class="titles-container">
                <h1 class="text-center">¿Quieres ver lo que nuestros estudiantes han estado creando?</h1>
                <h2 class="text-center">¡Mira nuestros proyectos del semestre!</h2>
            </div>

            <div class="cards-container">
                <div class="card" v-for="project in proyectosSemestre" :key="project.id">
                    <img :src="project.image" :alt="project.title + 'img'">
                    <h3>{{ project.title }}</h3>
                    <p>{{ project.description }}</p>
                    <a href="#">Leer más</a>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped>
.section {
    color: white;
    margin-bottom: 5rem;
}

.cards-container {
    margin-top: 3rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 10px;
}

h1 {
    font-size: 2.2rem;
}

h2 {
    font-size: 1.8rem;
}

.card {
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    padding: 20px;
    flex: 0 1 calc(100% - 1rem);
    margin-top: 1rem;
}

@media (min-width: 463px) {
    .card {
        flex: 0 1 calc(33% - 1rem);
    }
}

.card img {
    max-width: 100%;
    height: auto;
    border-radius: 5px;
    margin-bottom: 10px;
}

.card h3 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
}

.card p {
    font-size: 16px;
    line-height: 1.5;
    margin-bottom: 20px;
}

.card a {
    display: inline-block;
    background-color: #007bff;
    color: #fff;
    text-decoration: none;
    padding: 10px 20px;
    border-radius: 5px;
    transition: background-color 0.3s ease-in-out;
}

.card a:hover {
    background-color: #0062cc;
}
</style>