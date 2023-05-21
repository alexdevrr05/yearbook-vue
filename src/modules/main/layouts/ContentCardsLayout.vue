<template>
    <section class="section">
        <div class="container-titles">
            <h1 class="title-cards-section">Nuestros agradecimientos</h1>
            <p class="pb-2">{{ msgInformative }}</p>
        </div>

        <div v-if="isLoading" class="container-spinner">
            <PulseLoader :color="colorPurple" />
        </div>

        <template v-else>
            <div class="container-cards">
                <customized-card v-for="agradecimiento of agradecimientosState" :key="agradecimiento._id"
                    :userName="agradecimiento.userName" :agradecimiento="agradecimiento.agradecimientos"
                    :color="agradecimiento.color" :image="agradecimiento.userImage" />
            </div>

            <div class="container-pagination">
                <div class="container-more-or-back">
                    <v-btn v-if="currentPage > 1" class="more-or-back-text" rounded="lg" color="grey-darken-4" size="small"
                        @click="prevPage">
                        Volver
                    </v-btn>
                </div>

                <div class="container-more-or-back">
                    <v-btn color="deep-purple" v-if="foundsAllsQtyState > 6 && currentPageQty >= 6"
                        class="more-or-back-text" rounded="lg" size="small" @click="nextPage">
                        Ver más
                    </v-btn>
                </div>
            </div>
        </template>
    </section>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
    components: {
        CustomizedCard: defineAsyncComponent(() =>
            import(
        /* webpackChunkName: "Card" */ '@/modules/main/components/CustomizedCard'
            )
        ),
        PulseLoader,
    },

    props: {
        agradecimientos: {
            type: Array,
        },
        foundsAllsQtyState: {
            type: Number,
        },
        currentPageQty: {
            type: Number,
        },
        currentPage: {
            type: Number,
        },
        nextPage: {
            type: Function,
        },
        prevPage: {
            type: Function,
        },
        isLoading: {
            type: Boolean,
        },
        agradecimientosState: {
            type: Array,
        }
    },

    setup() {

        return {
            msgInformative: 'Este semestre quiero dar gracias a...',
            colorPurple: "#673AB7",
        }
    },
};
</script>

<style scoped>
.section {
    margin-top: 6.5rem;
    color: white;
    padding: 0 2rem;
    margin-bottom: 5rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.title-cards-section {
    font-size: 2.5rem;
}

.container-titles {
    text-align: start;
}

.container-cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: 1rem 0;
    gap: 0.5rem;
    width: 100%;
}

@media (min-width: 768px) {
    .section {
        padding: unset;
    }

    .container-cards {
        grid-template-columns: repeat(5, 1fr);
        min-height: 440px;
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

    .container-spinner {
        display: flex;
        justify-content: center;
        /*padding: 15rem;*/
        padding: 5rem 0;
        width: 100%;
    }

    .more-or-back-text {
        color: white !important;
        font-weight: bold;
    }

    .container-pagination {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }

    .v-btn__content {
        color: white !important;
    }
}
</style>
