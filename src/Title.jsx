'use client'

import { useEffect, useState } from 'react'
import logo from '../public/logo.png'
import styles from './Title.module.css'
import PropTypes from 'prop-types'

const getRemainTime = (eventDate) => {
    const now = new Date()
    const eventTime = new Date(eventDate)

    if (eventTime < now) {
        return {
            remainTime: 0,
            remainSeconds: '00',
            remainMinutes: '00',
            remainHours: '00',
            remainDays: '00'
        }
    }
    const remainTime = eventTime - now
    const remainSeconds = Math.floor((remainTime / 1000) % 60).toString().padStart(2, '0')
    const remainMinutes = Math.floor((remainTime / 1000 / 60) % 60).toString().padStart(2, '0')
    const remainHours = Math.floor((remainTime / 1000 / 60 / 60) % 24).toString().padStart(2, '0')
    const remainDays = Math.floor(remainTime / (1000 * 60 * 60 * 24)).toString().padStart(2, '0')

    return {
        remainTime,
        remainSeconds,
        remainMinutes,
        remainHours,
        remainDays
    }
}

const Title = ({ eventDate }) => {
    
    const [time, setTime] = useState({
        remainTime: 0,
        remainSeconds: '00',
        remainMinutes: '00',
        remainHours: '00',
        remainDays: '00'
    })

    useEffect(() => {
        const updateRemainTime = () => {
            const t = getRemainTime(eventDate)
            setTime(t)
        }
        updateRemainTime()
        const timeUpdate = setInterval(updateRemainTime, 1000)
        return () => clearInterval(timeUpdate)
    }, [eventDate])

    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.container_left}`}>
                <div className={`${styles.container_image}`}>
                    <img className={`${styles.image}`} src={logo} alt='Logo del PostMaster'></img>
                </div>
                <span>Nos vemos el <strong>13 de setiembre</strong></span>
            </div>
            <div className={`${styles.container_right}`}>
                <div className={`${styles.container_chronometer}`}>
                    <div>{time.remainDays}</div>
                    <span>dias</span>
                </div>
                <div className={`${styles.container_chronometer}`}>
                    <div>{time.remainHours}</div>
                    <span>horas</span>
                </div>
                <div className={`${styles.container_chronometer}`}>
                    <div>{time.remainMinutes}</div>
                    <span>minutos</span>
                </div>
                <div className={`${styles.container_chronometer}`}>
                    <div>{time.remainSeconds}</div>
                    <span>segundos</span>
                </div>
            </div>
        </div>
    )
}

Title.propTypes = {
    eventDate: PropTypes.instanceOf(Date).isRequired,
}

export default Title