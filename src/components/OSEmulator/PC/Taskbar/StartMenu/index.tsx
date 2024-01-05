// import styles from './../../styles-win98.module.css'
import Image from 'next/image'

import styles_win98 from '@/components/OSEmulator/PC/styles-win98.module.css'
import styles_winxp from '@/components/OSEmulator/PC/styles-winxp.module.css'

import aboutMeIcon from '@/assets/images/icons/user_card.png'
import helpIcon from '@/assets/images/icons/help_book_big-0.png'
import settingsIcon from '@/assets/images/icons/gears-0.png'
import gamesIcon from '@/assets/images/icons/joystick-2.png'
import shutdownIcon from '@/assets/images/icons/shut_down_cool-4.png'
import searchIcon from '@/assets/images/icons/search_file-1.png'
import contactIcon from '@/assets/images/icons/contact_icon.png'
import welcomeIcon from '@/assets/images/icons/welcome_icon.png'
import haIcon from '@/assets/images/icons/ha_icon.png'
import windowsLogo from '@/assets/images/windows92-logo.png'
import winxpLogo from '@/assets/images/icons/winxp-logo.png'
import monitorGear from '@/assets/images/icons/monitor_gear.png'
import minesGameIcon from '@/assets/images/icons/game_mine_1-0.png'
import kodakIcon from '@/assets/images/icons/kodak_imaging-0.png'
import toolsGear from '@/assets/images/icons/tools_gear-0.png'

import { useWindowStore } from '@/stores/windowStore'

import WelcomeWindow from '../../Windows/Welcome'
import AboutMeWindow from '../../Windows/AboutMe'
import ContactWindow from '../../Windows/Contact'
import { isTouch } from '@/lib/utils'
import { findParentWithClass, isMouseEvent } from '@/lib/util_DOM'

export interface StartMenuProps {
    toggleStartMenu: Function
}
const StartMenu = (props: StartMenuProps) => {
    const { toggleStartMenu } = props
    const { openWindow, setStyles, styles } = useWindowStore()

    const click = (event: React.MouseEvent<HTMLLIElement> | React.TouchEvent<HTMLLIElement>) => {
        const target = event.target
        if (target instanceof HTMLLIElement) {
            const btnItem: string = target.getAttribute('data-item') as string

            switch (btnItem) {
                case 'welcome':
                    openWindow(<WelcomeWindow />)
                    break
                case 'about':
                    openWindow(<AboutMeWindow />)
                    break
                case 'contact':
                    openWindow(<ContactWindow />)
                    break
                case 'computer':
                    console.log('computer clicked!')
                    break
                case 'shutdown':
                    location.reload()
                    break
                case 'project-ha-cards':
                    window.open('https://github.com/AnthonMS/my-cards', '_blank')
                    break
                case 'this':
                    window.open('https://github.com/AnthonMS/my-windows-website', '_blank')
                    break
                case 'settings-styles-win98':
                    setStyles(styles_win98)
                    break
                case 'settings-styles-winxp':
                    setStyles(styles_winxp)
                    break
                default:
                    console.error('Start Menu click unhandled:', btnItem, target)
                    break;
            }


            toggleStartMenu()
        }
    }

    const handleStartMenuInput = (event: React.MouseEvent<HTMLLIElement> | React.TouchEvent<HTMLLIElement>) => {
        const target = event.target
        if (target instanceof HTMLLIElement) {
            const clickedMenuItem: Element = findParentWithClass(target, styles.item) as Element
            const clickedDropdownItem: Element = findParentWithClass(target, styles.dropdownItem) as Element
            const activeBtns = document.querySelectorAll(`.${styles.item}.${styles.active}, .${styles.dropdownItem}.${styles.active}`)
            activeBtns.forEach(element => {
                if (element !== clickedMenuItem &&
                    element !== clickedDropdownItem) {
                    element.classList.remove(styles.active)
                }
            })

            if (!target.classList.contains(styles.active)) {
                target.classList.add(styles.active)
            }
            else {
                target.classList.remove(styles.active)
            }

            if (!target.classList.contains(styles.more)) {
                click(event)
            }
        }
    }


    const startmenuMouseEvents = !isTouch() ? {
        onMouseDown: handleStartMenuInput
    } : {}
    const startmenuTouchEvents = isTouch() ? {
        onTouchStart: handleStartMenuInput
    } : {}

    if (!styles.startMenu) return <></>
    return (
        <div className={styles.startMenu}>
            <div className={styles.blueBar}></div>
            <div className={styles.headline}>
                <div className={styles.accountImage}></div>
                Anthon<span>Mølgaard Steiness</span>
            </div>

            <ul className={styles.menuContent}>

                <li className={`${styles.item} ${styles.more}`} data-item='projects' {...startmenuMouseEvents} {...startmenuTouchEvents}>
                    <Image className={styles.itemIcon} src={gamesIcon} alt={`projects-icon`} />
                    <p className={styles.itemText}>Projects</p>

                    <ul className={styles.dropdownContent}>
                        <li className={styles.dropdownItem} data-item='this'>
                            <Image className={styles.dropdownItemIcon} src={windowsLogo} alt={`game-icon`} />
                            <p className={styles.dropdownItemText}>This (Repo)</p>
                        </li>
                        <li className={styles.dropdownItem} data-item='project-ha-cards'>
                            <Image className={styles.dropdownItemIcon} src={haIcon} alt={`game-icon`} />
                            <p className={styles.dropdownItemText}>Home Assistant UI Bundle (Repo)</p>
                        </li>
                    </ul>
                </li>

                <li className={`${styles.item} ${styles.more}`} data-item='games' {...startmenuMouseEvents} {...startmenuTouchEvents}>
                    <Image className={styles.itemIcon} src={gamesIcon} alt='icon' />
                    <p className={styles.itemText}>Games</p>

                    <ul className={styles.dropdownContent}>
                        <li className={styles.dropdownItem} data-item='minesweeper'>
                            <Image className={styles.dropdownItemIcon} src={minesGameIcon} alt='icon' />
                            <p className={styles.dropdownItemText}>Minesweeper</p>
                        </li>
                    </ul>
                </li>


                <li className={styles.item} data-item='about' {...startmenuMouseEvents} {...startmenuTouchEvents}>
                    <Image className={styles.itemIcon} src={aboutMeIcon} alt='icon' />
                    <p className={styles.itemText}>About</p>
                </li>

                <li className={styles.item} data-item='contact' {...startmenuMouseEvents} {...startmenuTouchEvents}>
                    <Image className={styles.itemIcon} src={contactIcon} alt='icon' />
                    <p className={styles.itemText}>Contact</p>
                </li>

                <li className={styles.item} data-item='welcome' {...startmenuMouseEvents} {...startmenuTouchEvents}>
                    <Image className={styles.itemIcon} src={welcomeIcon} alt='icon' />
                    <p className={styles.itemText}>Welcome</p>
                </li>

                {/* <li className={styles.item} onClick={click} data-item='find'>
                    <Image className={styles.itemIcon} src={searchIcon} alt='icon' />
                    <p className={styles.itemText}>Find</p>
                </li> */}

                {/* <li className={styles.item} onClick={click} data-item='settings'>
                    <Image className={styles.itemIcon} src={settingsIcon} alt='icon' />
                    <p className={styles.itemText}>Settings</p>
                </li> */}

                {/* <li className={styles.item} onClick={click} data-item='help'>
                    <Image className={styles.itemIcon} src={helpIcon} alt='icon' />
                    <p className={styles.itemText}>Help</p>
                </li> */}

                <li className={`${styles.item} ${styles.more}`} data-item='settings' {...startmenuMouseEvents} {...startmenuTouchEvents}>
                    <Image className={styles.itemIcon} src={monitorGear} alt={`settings-icon`} />
                    <p className={styles.itemText}>Settings</p>

                    <ul className={styles.dropdownContent}>

                        <li className={`${styles.dropdownItem} ${styles.more}`} data-item='settings-styles'>
                            <Image className={styles.itemIcon} src={kodakIcon} alt={`settings-styles-icon`} />
                            <p className={styles.itemText}>Style</p>

                            <ul className={styles.dropdownContent}>
                                <li className={styles.dropdownItem} data-item='settings-styles-win98'>
                                    <Image className={styles.dropdownItemIcon} src={windowsLogo} alt={`settings-styles-win98-icon`} />
                                    <p className={styles.dropdownItemText}>Windows 98/95</p>
                                </li>
                                <li className={styles.dropdownItem} data-item='settings-styles-winxp'>
                                    <Image className={styles.dropdownItemIcon} src={winxpLogo} alt={`settings-styles-winxp-icon`} />
                                    <p className={styles.dropdownItemText}>Windows XP</p>
                                </li>
                            </ul>
                        </li>

                    </ul>
                </li>



                <li className={styles.item} data-item='shutdown' {...startmenuMouseEvents} {...startmenuTouchEvents}>
                    <Image className={styles.itemIcon} src={shutdownIcon} alt='icon' />
                    <p className={styles.itemText}>Shutdown</p>
                </li>
            </ul>

        </div>
    )
}

export default StartMenu