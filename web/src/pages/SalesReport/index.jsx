import { useEffect } from 'react';
import { Container } from "./styles";
import { api } from '../../services/api';

export function SalesReport() {
  useEffect(() => {
    api
      .get('/sales', { withCredentials: true }) // sempre usar o withCredentials para trabalhar com cookies entre front-end e back-end
      .then(response => console.log(response.data))
  }, [])

  return (
    <Container>
      <h1>Relatório de Vendas</h1>
    </Container>

  )
}