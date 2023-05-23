import styles from './header.module.css';
import Image from "next/image";
import logo from '../../../public/assets/logo.svg';
export function Header(){
    return(
        <header className={styles.header}>
            <div className={styles.container}>
                <section className={styles.logo}>
                    <a href='/calculadoras/calculadora-ferias'><Image className={styles.logo} src={logo} alt="Logo Controlle"/></a>
                </section>                
            </div>
        </header>
    )
}