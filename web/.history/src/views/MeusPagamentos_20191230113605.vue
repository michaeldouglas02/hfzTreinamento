<template>
  <div class="pagamentos">
    <app-crud
      url="/financeiro/pagamentos/"
      :colunas="colunas"
      :formulario="[]"
      :carregar-dados="carregar"
      :permite-editar="false"
      :permite-adicionar="false"
      @instanciaFormulario="recebeFormulario"
      @instancia="getTasks"
    />
  </div>
</template>

<script>
import ArrayStore from 'devextreme/data/array_store'
import DataSource from 'devextreme/data/data_source'
export default {
  methods: {
    async carregar () {
      await this.$store.dispatch('loadContas')
      await this.$store.dispatch('loadTitulos')
    },
    getTitulos (options) {
      return {
        store: this.$store.state.titulos,
        paginate: true
      }
    },
    getContas (options) {
      return {
        store: this.$store.state.contas,
        paginate: true
      }
    },
    getTasks (key) {
      return new DataSource({
        store: new ArrayStore({
          key: 'id'
        }),
        filter: ['id', '=', key]
      })
    },
    recebeFormulario (instancia) {
      this.form = instancia
    }
  },
  data () {
    return {
      form: null
    }
  },
  computed: {
    colunas () {
      const self = this
      return [
        {
          dataField: 'id',
          caption: '#',
          width: 50
        },
        {
          dataField: 'data',
          dataType: 'date'
        },
        {
          dataField: 'valor',
          format: {
            type: 'fixedPoint',
            precision: 2
          }
        },
        {
          dataField: 'titulo',
          lookup: {
            dataSource: this.getTitulos,
            valueExpr: 'id',
            displayExpr: v => `${v.fornecedor_display.nome}, ${v.numero_documento}`
          },
          setCellValue (rowData, value) {
            this.defaultSetCellValue(rowData, value)
            self.titulo = self.$store.state.titulos.filter(f => f.id === value)[0]
            rowData.valor = self.titulo.valor
          }
        },
        {
          dataField: 'conta',
          lookup: {
            dataSource: this.getContas,
            valueExpr: 'id',
            displayExpr: 'descricao'
          }
        }
      ]
    }
  }
}
</script>
