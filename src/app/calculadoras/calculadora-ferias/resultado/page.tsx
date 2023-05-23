'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

import styles from './styles.module.css';
export default function Resultado() {


  const searchParams = useSearchParams();
 
  const salario_bruto = searchParams.get('salario_bruto');
  const hora_extra = searchParams.get('hora_extra');
  const dependentes = searchParams.get('dependentes');
  const dias_de_ferias = searchParams.get('dias_de_ferias');
  const abono = searchParams.get('abono');
  const parcela = searchParams.get('parcela');

  const dependente = dependentes > 0 ? dependentes * 189.59 : 0;
  // const valorDependente = parseFloat(dependente).toFixed(2);
  const valorDependente = dependentes > 0 ? dependentes * 189.59 : 0;



  function ConvertBRL(data) {
    let num;
      if(data.includes('.')) {
        const num = parseFloat(data);
        const formattedValue = num.toLocaleString('pt-BR', {
          style: 'currency',
            currency: 'BRL',
          });
          return formattedValue;
      } else {
        const num = parseFloat(data, 10);
        const formattedValue = num.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });
        return formattedValue;
        }        
    }

  
  const [receber, setReceber] = useState();

  function ValorFerias() { // Valor Férias
    if (hora_extra) {
      const brutoSalario = parseFloat(salario_bruto.replace(".", "").replace(",", "."));
      const horaExtra = parseFloat(hora_extra.replace(".", "").replace(",", "."));
      const x = brutoSalario;
      const y = horaExtra;
      const z = (parseFloat(x) + parseFloat(y)).toFixed(2);
      const d = z / 30;
      const resultado = (parseFloat(d) * parseFloat(dias_de_ferias)).toFixed(2);
      return resultado;
    } else {
      const brutoSalario = parseFloat(salario_bruto.replace(".", "").replace(",", "."));
      const x = brutoSalario.toFixed(3);
      const z = parseFloat(x);
      const d = z / 30;
      const resultado = (parseFloat(d) * parseFloat(dias_de_ferias)).toFixed(2);
      
      return resultado;
    }
  }
  function Ferias() { // 1/3 ferias
    const valor = ValorFerias();
    const terco = valor / 3;
    const tercoArredondado = terco.toFixed(2);
    return tercoArredondado;
  }

  function IRRF() {
    var valor = Total();
    if (valor <= 1903.98) {
      const porcentagem = 0;
      const result = 0;
      return {
          porcentagem: '0.00%',
          desconto: result,
        };
    }
    if (valor >= 1903.99 && valor <= 2826.65) {
      const porcentagem = 7.50;

      const result = (valor * porcentagem) / 100 - 142.80 - valorDependente;
      return {
          porcentagem: '7.50%',
          desconto: result.toFixed(2),
        };
    }
    if (valor >= 2826.66 && valor <= 3751.05) {
      const porcentagem = 15;
      const result = (valor * porcentagem) / 100 - 354.80 - valorDependente;
      return {
          porcentagem: '15%',
          desconto: result < 0 ? 0 : result.toFixed(2),
        };
    }
    if (valor >= 3751.06 && valor <= 4664.68) {
      const porcentagem = 22.5;
      const result = (valor * porcentagem) / 100 - 636.13 - valorDependente;
      return {
          porcentagem: '22.50%',
          desconto: result.toFixed(2),
        };
    }
    if (valor >= 4664.68) {
      const porcentagem = 27.50;
      const result = (valor * porcentagem) / 100 - 869.36 - valorDependente;
      return {
          porcentagem: '27.50%',
          desconto: result.toFixed(2),
        };
    }
    return {
      porcentagem: 0,
      desconto: 0,
    };
  }

  function INSS() {
    var valor = Total();
    if (valor < 1302.00) {
      var porcentagem = 0;
      var x = (valor * porcentagem) / 100;
      return {
          porcentagem: '7.5%',
          desconto: x.toFixed(2),
        };
    }
    if (valor > 1320.01 && valor < 2571.29) {
      var porcentagem = 9;
      var result = (valor * porcentagem) / 100 - 18.18;
      return {
          porcentagem: '9%',
          desconto: result.toFixed(2),
        };
    }
    if (valor > 2571.30 && valor <= 3856.94) {
      var porcentagem = 12;
      var x = (valor * porcentagem) / 100 - 91.01;
      var result = x - 91.01;
      return {
          porcentagem: '12%',
          desconto: result.toFixed(2),
        };
    }
    if (valor > 3856.95) {
      var porcentagem = 14;
      var result = (valor * porcentagem) / 100 - 163;
      return {
          porcentagem: '14%',
          desconto: result.toFixed(2),
        };
    }
    return {
      porcentagem: 0,
      desconto: 0,
    };
  }

  function Abono() {
    const valorFerias = ValorFerias();
    const valorFerias2 = Ferias();
    if(abono == 'Sim'){
      const x = parseFloat(valorFerias) + parseFloat(valorFerias2);
      const y = (x / 30);
      const i = y * dias_de_ferias;
      const z = i / 3;
      return {
        abono: i.toFixed(2),
        terAbono: z.toFixed(2)
      };
    } else {
      return {
        abono: 0,
        terAbono: 0
      };
    }

  }

  function Adiantamento13(){
    if(parcela == 'Sim'){
      const x = parseFloat(salario_bruto.replace(".", "").replace(",", "."));
      const y = x / 2;

      return y.toFixed(2);
    } else {
      return 0;
    }

  }

  function Total() {
    var valorFerias = ValorFerias();
    var valorFerias2 = Ferias();
    var abono = Abono();
    var adiantamento = Adiantamento13();
  

    var soma = parseFloat(valorFerias) + parseFloat(valorFerias2) + parseFloat(abono.abono) + parseFloat(abono.terAbono) + parseFloat(adiantamento);
  
    return soma.toFixed(2);
  }
  

  function Descontos() {
    const inss = INSS().desconto;
    const irrf = IRRF().desconto;
    var soma = parseFloat(inss) + parseFloat(irrf);
    return soma.toFixed(2);
  }

  function Liquido() {
    const descontos = Descontos();
    const total = Total();
    var soma =  parseFloat(total) - parseFloat(descontos);
    return soma.toFixed(2);
  }



  const vlFerias = ValorFerias();
  
 
    return (
      <div className={styles.section}>
        
        <div className={styles.container}>
          <div className={styles.section_prev}>
            <a href='/calculadoras/calculadora-ferias'><button>Fazer outro calculo</button></a>
            <h1>Cálculo</h1>
            <div className={styles.content}>

              <div className={styles.column}>
                <div className={styles.row}>
                  <p>Salário bruto:</p>
                  <p>R$ {salario_bruto}</p>
                </div>
                <div className={styles.row}>
                  <p>Dependentes:</p>
                  <p>{dependentes ? dependentes : '0'}</p>
                </div>
                <div className={styles.row}>
                  <p>Abono pecuniário:</p>
                  <p>{abono}</p>
                </div>
              </div>

              <div className={styles.column}>
                <div className={styles.row}>
                  <p>Média de hora extra:</p>
                  <p>R$ {hora_extra ? hora_extra : '0,00'}</p>
                </div>
                <div className={styles.row}>
                  <p>Dias de férias:</p>
                  <p>{dias_de_ferias ? dias_de_ferias : '0'}</p>
                </div>
                <div className={styles.row}>
                  <p>Adiantar 1ª parcela 13º:</p>
                  <p>{parcela}</p>
                </div>
              </div>

            </div>
          </div>

          <div className={styles.section_summary}>
            <h1>Resultado</h1>
            <div className={styles.content}>

              <div className={styles.row}>
                <div className={styles.col_4}><p><b>Evento</b></p></div>
                <div className={styles.col_2}><p><b>Ref</b></p></div>
                <div className={styles.col_2}><p><b>Proventos</b></p></div>
                <div className={styles.col_2}><p><b>Descontos</b></p></div>
              </div>

              <div className={styles.row}>
                <div className={styles.col_4}><p>Valor férias</p></div>
                <div className={styles.col_2}><p></p></div>
                <div className={styles.col_2}><p>{ConvertBRL(vlFerias)}</p></div>
                <div className={styles.col_2}><p></p></div>
              </div>

              <div className={styles.row}>
                <div className={styles.col_4}><p>1/3 férias</p></div>
                <div className={styles.col_2}><p></p></div>
                <div className={styles.col_2}><p>{ConvertBRL(Ferias(receber))}</p></div>
                <div className={styles.col_2}><p></p></div>
              </div>

              <div className={styles.row}>
                <div className={styles.col_4}><p>Abono pecuniário</p></div>
                <div className={styles.col_2}><p></p></div>
                <div className={styles.col_2}><p>{Abono().abono != 0 ? ConvertBRL(Abono().abono) : ''}</p></div>
                <div className={styles.col_2}><p></p></div>
              </div>

              <div className={styles.row}>
                <div className={styles.col_4}><p>1/3 abono pecuniário</p></div>
                <div className={styles.col_2}><p></p></div>
                <div className={styles.col_2}><p>{Abono().terAbono != 0 ? ConvertBRL(Abono().terAbono) : ''}</p></div>
                <div className={styles.col_2}><p></p></div>
              </div>

              <div className={styles.row}>
                <div className={styles.col_4}><p>Adiantamento 1 parcela 13</p></div>
                <div className={styles.col_2}><p></p></div>
                <div className={styles.col_2}><p>{Adiantamento13() != 0 ? ConvertBRL(Adiantamento13()) : ''}</p></div>
                <div className={styles.col_2}><p></p></div>
              </div>

              <div className={styles.row}>
                <div className={styles.col_4}><p>INSS</p></div>
                <div className={styles.col_2}><p>{INSS().porcentagem != 0 ? INSS().porcentagem : '-'}</p></div>
                <div className={styles.col_2}><p></p></div>
                <div className={styles.col_2}><p>{INSS().desconto != 0 ? ConvertBRL(INSS().desconto) : '-'}</p></div>
              </div>

              <div className={styles.row}>
                <div className={styles.col_4}><p>IRRF</p></div>
                <div className={styles.col_2}><p>{IRRF().porcentagem != 0 ? IRRF().porcentagem : ''}</p></div>
                <div className={styles.col_2}><p></p></div>
                <div className={styles.col_2}><p>{IRRF().desconto != 0 ? ConvertBRL(IRRF().desconto) : 'R$ 00,00'}</p></div>
              </div>

              <div className={styles.row}>
                <div className={styles.col_4}><p>Totais</p></div>
                <div className={styles.col_2}><p></p></div>
                <div className={styles.col_2}><p>{ConvertBRL(Total())}</p></div>
                <div className={styles.col_2}><p>{Descontos() != 0 ? ConvertBRL(Descontos()) : ''}</p></div>
              </div>

              <div className={styles.row}>
                <div className={styles.col_6}><p>Valor líquido de férias</p></div>
                <div className={styles.col_5}><p>{Liquido() != 0 ? ConvertBRL(Liquido()) : 'R$ 00,00'}</p></div>
              </div>

            </div>
          </div>

        </div>

      </div>
    )
  }
  