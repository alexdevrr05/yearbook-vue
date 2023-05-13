<script setup>
import useProjects from '../composables/projects/useProjects';

const { projects } = useProjects();


</script>

<template>
    <div class="section">
        <div class="container">
            <div class="titles-container">
                <h1 class="text-center">¿Quieres ver lo que nuestros estudiantes han estado creando?</h1>
                <h2 class="text-center">¡Mira nuestros proyectos del semestre!</h2>
            </div>

            <div class="cards-container">
                <div class="card" v-for="project in projects" :key="project._id">
                    <img :src="project.image" :alt="project.title + 'img'">
                    <h3>{{ project.title }}</h3>
                    <p>{{ project.description }}</p>
                    <p class="owner">{{ project.ownerProject }}</p>
                    <!-- <a href="#">Leer más</a> -->
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

.owner {
    text-align: center;
    font-weight: bold;
}
</style>