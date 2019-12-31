<template>
  <div class="home">
    <v-content>
      <v-row>
        <app-agenda-pagamento />
      </v-row>
      <v-row>
        <v-col cols="4">
          <app-grafico-contas />
        </v-col>
        <v-col>
          <app-grafico-gastos />
        </v-col>
      </v-row>
    </v-content>
  </div>
</template>
