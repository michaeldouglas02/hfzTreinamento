<template>
  <DxChart
    id="chart"
    :rotated="true"
    data-source="$store.state.graficoGastoFornecedor"
    title="Gastos e Pagamentos por Fornecedor"
  >

    

    <DxValueAxis>
      <DxTick :visible="false"/>
      <DxLabel :visible="false"/>
    </DxValueAxis>

    <DxSeries
      argument-field="day"
      value-field="sales"
      type="bar"
      color="#79cac4"
    >
      <DxLabel
        :visible="true"
        background-color="#c18e92"
      />
    </DxSeries>

    <DxLegend :visible="false"/>

    <DxExport :enabled="true"/>

  </DxChart>
</template>
<script>

import DxChart, {
  DxArgumentAxis,
  DxExport,
  DxSeries,
  DxValueAxis,
  DxLabel,
  DxLegend,
  DxTick
} from 'devextreme-vue/chart'

export default {
  components: {
    DxChart,
    DxArgumentAxis,
    DxExport,
    DxSeries,
    DxValueAxis,
    DxLabel,
    DxLegend,
    DxTick
  },
  mounted () {
    this.$store.dispatch('loadGraficoGastoFornecedor')
  },
  data () {
    return {
      dataSource: [{
        fornecedor: 'Illinois',
        pago: 476.851,
        gasto: 528.904
      }, {
        fornecedor: 'Indiana',
        pago: 195.769,
        gasto: 227.271
      }, {
        fornecedor: 'Michigan',
        pago: 335.793,
        gasto: 372.576
      }, {
        fornecedor: 'Ohio',
        pago: 374.771,
        gasto: 418.258
      }, {
        fornecedor: 'Wisconsin',
        pago: 182.373,
        gasto: 211.727
      }]
    }
  },
  methods: {
    onPointClick ({ target }) {
      target.select()
    }
  }
}
</script>
<style>
#chart {
    height: 440px;
}
</style>
