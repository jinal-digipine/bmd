import classNames from '@/utils/classNames'
import useScrollTop from '@/utils/hooks/useScrollTop'
import logo from '../../../../assets/images/logobmd.png'
import Avatar from '@/components/ui/Avatar'
import Dropdown from '@/components/ui/Dropdown'
import { HiOutlineUser } from 'react-icons/hi'
import { PiPasswordFill, PiPulseDuotone, PiUserDuotone } from 'react-icons/pi'
import { Link } from 'react-router'

const dropdownItemList = ([] = [
    {
        label: 'Profile',
        path: '/user-home/my-profile',
        icon: <PiUserDuotone />,
    },

    {
        label: 'My Applications',
        path: '/user-home/my-applications',
        icon: <PiPulseDuotone />,
    },
    {
        label: 'Change Password',
        path: '/reset-password',
        icon: <PiPasswordFill />,
    },
])

const Navigation = ({ toggleMode }) => {
    const { isSticky } = useScrollTop()

    return (
        <div
            style={{ transition: 'all 0.2s ease-in-out' }}
            className={classNames(
                'w-full fixed inset-x-0 z-[50] ',
                isSticky ? 'top-4' : 'top-0',
            )}
        >
            <div
                className={classNames(
                    'flex flex-row self-start items-center justify-between py-3 max-w-11xl px-6 lg:px-8 mx-auto  rounded-xl relative z-[60] w-full transition duration-200',
                    isSticky
                        ? 'bg-white dark:bg-gray-800 shadow-lg'
                        : 'bg-transparent dark:bg-transparent',
                )}
            >
                <a href="/user-home">
                    <img src={logo} width={70} height={30} alt="logo" />
                </a>

                <div className="flex items-center gap-2">
                    <button
                        className="relative flex cursor-pointer items-center justify-center rounded-xl p-2 text-neutral-500 hover:shadow-input dark:text-neutral-500"
                        onClick={toggleMode}
                    >
                        <svg
                            className="lucide lucide-sun rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                            fill="none"
                            height="16"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            width="16"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle cx="12" cy="12" r="4" />
                            <path d="M12 2v2" />
                            <path d="M12 20v2" />
                            <path d="m4.93 4.93 1.41 1.41" />
                            <path d="m17.66 17.66 1.41 1.41" />
                            <path d="M2 12h2" />
                            <path d="M20 12h2" />
                            <path d="m6.34 17.66-1.41 1.41" />
                            <path d="m19.07 4.93-1.41 1.41" />
                        </svg>
                        <svg
                            className="lucide lucide-moon absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                            fill="none"
                            height="16"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            width="16"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                        </svg>
                        <span className="sr-only">Toggle theme</span>
                    </button>

                    <Dropdown
                        className="flex"
                        toggleClassName="flex items-center"
                        renderTitle={
                            <div className="cursor-pointer flex items-center">
                                <Avatar
                                    className="mr-4"
                                    icon={<HiOutlineUser />}
                                />
                            </div>
                        }
                        placement="bottom-end"
                    >
                        <Dropdown.Item variant="header">
                            <div className="py-2 px-3 flex items-center gap-3">
                                <Avatar
                                    className="mr-4"
                                    icon={<HiOutlineUser />}
                                />
                                <div>
                                    <div className="font-bold text-gray-900 dark:text-gray-100">
                                        <p>john</p>
                                    </div>
                                    <div className="text-xs">
                                        <p>john@gmail.com</p>
                                    </div>
                                </div>
                            </div>
                        </Dropdown.Item>
                        <Dropdown.Item variant="divider" />
                        {dropdownItemList.map((item) => (
                            <Dropdown.Item
                                key={item.label}
                                eventKey={item.label}
                                className="px-0"
                            >
                                <Link
                                    className="flex h-full w-full px-2"
                                    to={item.path}
                                >
                                    <span className="flex gap-2 items-center w-full">
                                        <span className="text-xl">
                                            {item.icon}
                                        </span>
                                        <span>{item.label}</span>
                                    </span>
                                </Link>
                            </Dropdown.Item>
                        ))}
                        <Dropdown.Item variant="divider" />
                    </Dropdown>
                </div>
            </div>
        </div>
    )
}

export default Navigation
