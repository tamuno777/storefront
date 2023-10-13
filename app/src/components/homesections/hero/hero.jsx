import React from 'react'
import styles from './hero.module.css'

function Hero() {
  return (
    <section className={styles.sectioncontainer}>
        <div className={styles.heroContainer}>
            <div className={styles.heroContent}>
              <div className={styles.heroheader}>
                <p>ENDLESS SUMMER SALE</p>
              </div>
              <div className={styles.herolargesubtext}>
                <p>
                Up to 60% off on all items till September 11
                </p>
              </div>
              <div>
                <button className={styles.herobtn}>
                  Shop now <span>ic</span>
                </button>
              </div>

            </div>
        </div>

    </section>
  )
}

export default Hero;