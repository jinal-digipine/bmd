import {
    PiClipboardTextDuotone,
    PiBabyCarriageDuotone,
    PiHeartDuotone,
    PiBedDuotone,
    PiHandshakeDuotone,
    PiUserCircleDuotone,
    PiUserListDuotone,
    PiUsersFourFill,
    PiMapTrifoldDuotone,
    PiMapPinSimpleDuotone,
} from 'react-icons/pi'
import type { JSX } from 'react'
import { HiHome } from 'react-icons/hi'
import { MdOutlineMiscellaneousServices } from 'react-icons/md'
import { FaUsers } from 'react-icons/fa'
import { LiaSitemapSolid } from 'react-icons/lia'
import { RiAdminFill } from 'react-icons/ri'

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    applications: <PiClipboardTextDuotone />,
    services: <PiHandshakeDuotone />,
    birth: <PiBabyCarriageDuotone />,
    marriage: <PiHeartDuotone />,
    death: <PiBedDuotone />,
    user: <PiUserCircleDuotone />,
    clerk: <PiUserListDuotone />,
    admin: <RiAdminFill />,
    home: <HiHome />,
    manage: <MdOutlineMiscellaneousServices />,
    states: <PiMapTrifoldDuotone />,
    districts: <PiMapPinSimpleDuotone />,
    offices: <LiaSitemapSolid />,
    clerks: <FaUsers />,
    users: <PiUsersFourFill />,
}

export default navigationIcon
