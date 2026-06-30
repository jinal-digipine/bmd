import {
    PiClipboardTextDuotone,
    PiBabyCarriageDuotone,
    PiHeartDuotone,
    PiBedDuotone,
    PiHandshakeDuotone,
    PiUserCircleDuotone,
    PiUserListDuotone,
} from 'react-icons/pi'
import type { JSX } from 'react'
import { HiHome } from 'react-icons/hi'

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    applications: <PiClipboardTextDuotone />,
    services: <PiHandshakeDuotone />,
    birth: <PiBabyCarriageDuotone />,
    marriage: <PiHeartDuotone />,
    death: <PiBedDuotone />,
    user: <PiUserCircleDuotone />,
    clerk: <PiUserListDuotone />,
    home: <HiHome />,
}

export default navigationIcon
