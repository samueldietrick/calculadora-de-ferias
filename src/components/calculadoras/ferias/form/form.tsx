'use client';

import { useState } from 'react';

import styles from './form.module.css'
import Image from "next/image";
import arrow from '../../../../../public/assets/arrow.svg';
export function Form() {

const [salario, setSalario] = useState('');
const [extra, setExtra] = useState('');

const Salario = (event) => {
  let inputValue = event.target.value;
  inputValue = inputValue.replace(/\D/g, '');
  inputValue = (parseInt(inputValue) / 100).toLocaleString('pt-BR', {
  style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
    setSalario(inputValue);
  };
  const Extra = (event) => {
    let inputValue = event.target.value;
    inputValue = inputValue.replace(/\D/g, '');
    inputValue = (parseInt(inputValue) / 100).toLocaleString('pt-BR', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
      setExtra(inputValue);
    };

    return (
        <div className={styles.content_form}>
        <h1>Calculadora de Férias Online</h1>
        <div className={styles.form}>
          <form action="/calculadoras/calculadora-ferias/resultado">
            <div className={styles.form_content}>

              <div className={styles.col_input}>
                <label>Salário bruto</label>
                <div className={styles.input_group}>
                  <div className={styles.input_cutom}>R$</div>
                  <input type="text" name="salario_bruto" value={salario} onChange={Salario} placeholder='0,00' required/>
                </div>
              </div>
              
              <div className={styles.col_input}>
                <label>Média de hora extra</label>
                <div className={styles.input_group}>
                  <div className={styles.input_cutom}>R$</div>
                  <input type="text" name="hora_extra"value={extra} onChange={Extra} placeholder='0,00'/>
                </div>
              </div>

              <div className={styles.col_input}>
                <label>Dependentes</label>
                <div className={styles.input_group2}>
                  <input type="number" name="dependentes" placeholder='0'/>
                </div>
              </div>

              <div className={styles.col_input}>
                <label>Dias de férias</label>
                <div className={styles.input_group2}>
                  <input type="number" name="dias_de_ferias" placeholder='0' required/>
                </div>
              </div>

              <div className={styles.col_input}>
                <label>Abono pecuniário 1/3</label>
                <div className={styles.input_group2} >
                  <select name="abono">
                    <option value="Não">Não</option>
                    <option value="Sim">Sim</option>
                  </select>
                </div>
                <div className={styles.arrow}><Image src={arrow} alt="Selecione uma opção"/></div>
              </div>

              <div className={styles.col_input}>
                <label>Adiantar 13 parcela?</label>
                <div className={styles.input_group2}>
                  <select name="parcela">
                    <option value="Não">Não</option>
                    <option value="Sim">Sim</option>
                  </select>
                </div>
                <div className={styles.arrow}><Image src={arrow} alt="Selecione uma opção"/></div>
              </div>

              <div className={styles.btn_form}>
                <button>Calcular</button>
              </div>
            </div>
          </form>
          <div className={styles.btn}>
                <a href="/calculadoras/calculadora-ferias"><button>Limpar</button></a>
          </div>
        </div>
      </div>
    )
}