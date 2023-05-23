import Head from 'next/head';
import styles from './styles.module.css';
import { Metadata } from 'next';
import { Form } from '@/components/calculadoras/ferias/form/form';
 
export const metadata: Metadata = {
  title: 'Calculadora de Férias',
  description: '...',
};
export default function CalculateVacation() {
  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <div className={styles.column}>
          <div className={styles.content_info}>
            <h1>Como utilizar a <br/> calculadora de férias</h1>
            <p>Para ficar tranquilo no seu descanso e com dinheiro no bolso, veja como fazer o cálculo de férias:</p>     
            <ol>
              <li>Preencha o valor do seu salário bruto;</li>
              <li>Preencha o valor médio da sua hora extra (Opcional);</li>
              <li>Informe o número de dependentes, caso tenha;</li>
              <li>Preencha a quantidade de dias de férias requisitados;</li>
              <li>Informe se vai ter abono pecuniário de 1/3;</li>
              <li>Marque se irá adiantar a 1ª parcela do 13º salário.</li>
            </ol>     
            <p>É previsto por lei que um funcionário CLT pode tirar férias após trabalhar um período de 12 meses (1 ano). Porém, é possível que dúvidas existam em relação ao cálculo de férias remuneradas. Dessa forma, confira um exemplo de como ele é realizado no caso de um trabalhador que recebe um salário de R$ 2400/mês.</p>
          </div>
        </div>
        <div className={styles.column}>
          <Form/>
        </div>
        </div>
    </div>
  )
}











