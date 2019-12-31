<template>
  <DxChart
    id="chart"
    :rotated="true"
    :data-source="$store.state.graficoGastoFornecedor"
    title="Gastos e Pagamentos por Fornecedor"
    @pointClick="onPointClick"
  >
    <DxCommonSeriesSettings
      argument-field="fornecedor"
      type="bar"
      hover-mode="allArgumentPoints"
      selection-mode="allArgumentPoints"
    >
      <DxLabel :visible="true">
        <DxFormat
          :precision="0"
          type="fixedPoint"
        />
      </DxLabel>
    </DxCommonSeriesSettings>
    <DxSeries
      value-field="gasto"
      name="Gastos"
      color="054f77"
    />
    <DxSeries
      value-field="pago"
      name="Pagamentos"
    />

    <DxLegend :visible="false"/>
    <DxExport :enabled="true"/>

  </DxChart>
</template>
<script>

import DxChart, {
  DxExport,
  DxSeries,
  DxLabel,
  DxLegend,
  DxCommonSeriesSettings,
  DxFormat
} from 'devextreme-vue/chart'

export default {
  components: {
    DxChart,
    DxExport,
    DxSeries,
    DxLabel,
    DxLegend,
    DxCommonSeriesSettings,
    DxFormat
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
