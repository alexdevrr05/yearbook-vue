<template>
    <section class="section">
        <div class="container" v-motion :initial="{ opacity: 0, y: 300 }" :visibleOnce="{ opacity: 1, y: 0 }">
            <div v-if="agradecimientos.length <= 0" class="without-acknowledgments">
                <h1>Comienza a dar gracias a tu maestro favorito</h1>
            </div>

            <template v-else>
                <h1 class="title-cards-section">Nuestros agradecimientos</h1>
                <p class="pb-2">{{ msgInformative }}</p>
                <div class="container-cards">
                    <customized-card v-for="agradecimiento of agradecimientos" :key="agradecimiento._id"
                        :userName="agradecimiento.userName" :agradecimiento="agradecimiento.agradecimientos"
                        :color="agradecimiento.color" />
                </div>

                <v-btn v-if="foundsQty > 6" color="black" class="show-more" rounded="lg" size="small">Ver
                    más</v-btn>

            </template>
        </div>
    </section>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
    components: {
        CustomizedCard: defineAsyncComponent(() =>
            import(
        /* webpackChunkName: "Card" */ '@/modules/main/components/CustomizedCard'
            )
        ),
    },

    props: {
        agradecimientos: {
            type: Array,
        },

        foundsQty: {
            type: Number,
        }
    },

    setup() {

        return {
            msgInformative: 'Este semestre quiero dar gracias a...',
        }
    },
};
</script>

<style scoped>
.section {
    margin-top: 6.5rem;
    color: white;
    padding: 0 2rem;
    margin-bottom: 10rem;
}

.title-cards-section {
    font-size: 2.5rem;
}

.container-cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: 1rem 0;
    gap: 0.5rem;
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

    .without-acknowledgments {
        padding-bottom: 5rem;
    }


    .show-more {}

}
</style>
