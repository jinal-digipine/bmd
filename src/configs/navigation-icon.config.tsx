import {
    PiClipboardTextDuotone,
    PiBabyCarriageDuotone,
    PiHeartDuotone,
    PiBedDuotone,
    PiHandshakeDuotone,
} from 'react-icons/pi'
import type { JSX } from 'react'

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    applications: <PiClipboardTextDuotone />,
    services: <PiHandshakeDuotone />,
    birth: <PiBabyCarriageDuotone />,
    marriage: <PiHeartDuotone />,
    death: <PiBedDuotone />,
}

export default navigationIcon
