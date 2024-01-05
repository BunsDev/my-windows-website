import { useState } from 'react'

// import globalStyles from './../../styles.module.css'
import myStyles from './styles.module.css'

import Window from '@/components/OSEmulator/PC/Window'

import contactIcon from '@/assets/images/icons/contact_icon.png'
import sendmailIcon from '@/assets/images/icons/sendmail_icon.png'

import PopupWindow from '../Popup'
import Button from '../../UI/Button'

import { useWindowStore } from '@/stores/windowStore'

import axios from 'axios'

import { isMobile, isTouch } from '@/lib/utils'

export interface ContactWindowProps {
}
const ContactWindow = (props: ContactWindowProps) => {
    const { } = props
    const { openWindow, styles } = useWindowStore()

    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [subject, setSubject] = useState<string>('')
    const [content, setContent] = useState<string>('')

    // console.log('ContactMe isMobile:', isMobile())
    // console.log('ContactMe isTouch:', isTouch())

    const click = async (event: React.MouseEvent<HTMLDivElement>) => {
        if (name === '') {
            openWindow(<PopupWindow error={true} title='Name missing' text='Your name is required.' />)
            return
        }
        if (email === '') {
            openWindow(<PopupWindow error={true} title='Email missing' text='Your email is required.' />)
            return
        }
        if (phone === '') {
            openWindow(<PopupWindow error={true} title='Phone missing' text='Your phone is required.' />)
            return
        }
        if (subject === '') {
            openWindow(<PopupWindow error={true} title='Subject missing' text='Subject is required.' />)
            return
        }
        if (content === '') {
            openWindow(<PopupWindow error={true} title='Content missing' text='Content is required.' />)
            return
        }

        const res = await axios.post('/api/sendEmail', {
            nameFrom: name,
            emailFrom: email,
            phoneFrom: phone,
            subject: subject,
            content: content
        })
        const data = await res.data
        if (res.status === 200) {
            openWindow(<PopupWindow title='Message sent!' text='Message was succesfully sent!' />)
        }
        else {
            openWindow(<PopupWindow error={true} title='Failed sending message...' text='There was an error when trying to send your message.' />)
            console.error(data)
        }
    }

    // TODO: Create logic to see if mobile or not and set width/height based on that.
    if (!styles.window) return <></>
    return <Window title='Contact' icon={contactIcon} fullscreen={isTouch() || isMobile()}
        width={Math.min(window.innerWidth - 25, 600)} height={Math.min(window.innerHeight - 25, 820)}>

        <div className={myStyles.windowContainer}>
            <p className={myStyles.mainTitle}>
                <span className={myStyles.small}>Contact</span> Anthon Mølgaard Steiness
            </p>

            <div className={`${styles.border} ${myStyles.content}`}>
                <div className={myStyles.centerDiv}>
                    <p className={myStyles.label}>Your name:</p>
                    <input type='text' className={`${styles.inverseBoxShadow} ${styles.input} ${myStyles.input}`} onChange={e => setName(e.target.value)} />
                    <p className={myStyles.label}>Your e-mail:</p>
                    <input type='email' className={`${styles.inverseBoxShadow} ${styles.input} ${myStyles.input}`} onChange={e => setEmail(e.target.value)} />
                    <p className={myStyles.label}>Your phone number:</p>
                    <input type='tel' className={`${styles.inverseBoxShadow} ${styles.input} ${myStyles.input}`} onChange={e => setPhone(e.target.value)} />

                    <p className={myStyles.label}>Subject:</p>
                    <input type='text' className={`${styles.inverseBoxShadow} ${styles.input} ${myStyles.input}`} onChange={e => setSubject(e.target.value)} />
                    <p className={myStyles.label}>What&apos;s it all about?</p>
                    <textarea className={`${styles.inverseBoxShadow} ${styles.textarea} ${myStyles.textarea}`} onChange={e => setContent(e.target.value)} />

                    <div className={styles.divider} />
                    <Button className={myStyles.button} icon={sendmailIcon} text='Send!' onClick={click} />
                    <div className={styles.divider} />
                </div>
                <div className={styles.divider}></div>
            </div>
        </div>

    </Window>
}

export default ContactWindow