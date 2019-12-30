import 'axios'
const { data } = this.axios.get('http://localhost:8080/financeiro/pagamentos')

export default {
  getEmployees () {
    return data
  }
}
