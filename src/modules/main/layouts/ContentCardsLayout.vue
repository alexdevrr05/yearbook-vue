<template>
    <section class="section">
        <div class="container" v-motion :initial="{ opacity: 0, y: 300 }" :visibleOnce="{ opacity: 1, y: 0 }">
            <h1 class="title-cards-section">Nuestros agradecimientos</h1>
            <p class="">Este semestre quiero dar gracias a...</p>
            <div class="container-cards">
                <!-- color crema -->
                <customized-card username="Alex" cardColor="#E4CDC5" />

                <!-- color verde -->
                <customized-card username="Libni" cardColor="#4CAF50" />

                <!-- color rojo -->
                <customized-card username="Ramón" cardColor="#C22F3B" />

                <!-- color amarillo -->
                <customized-card username="Cristian" cardColor="#FA983F" />

                <!-- color deep gray -->
                <customized-card username="Juan" cardColor="#12151b" />

                <!-- color morado -->
                <customized-card username="Daniela" cardColor="#673AB7" />
            </div>
        </div>
    </section>
</template>

<script>

import { defineAsyncComponent } from 'vue';

export default {
    components: {
        CustomizedCard: defineAsyncComponent(() => import(/* webpackChunkName: "Card" */ '@/modules/main/components/CustomizedCard'))
    }
}
</script>

<style scoped>
.section {
    margin-top: 2.5rem;
    color: white;
    padding: 0 2rem;
}

.title-cards-section {
    font-size: 2rem;
}

.container-cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: 1rem 0;
    gap: .5rem;
    margin-bottom: 10rem;
}

@media (min-width: 768px) {

    .section {
        padding: unset;
    }

    .container-cards {
        grid-template-columns: repeat(5, 1fr);
    }

    .card:nth-child(2) {
        display: grid;
        grid-column: 2 / 4;
        grid-row: 1 / 3;
    }

    .card:last-child {
        grid-column: 4 / 6;
    }
}
</style>

