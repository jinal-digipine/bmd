import Container from './HomeContainer'
import logo from '../../../../assets/images/logobmd.png'

const HomeFooter = () => {
    const year = new Date().getFullYear()

    return (
        <div
            id="footer"
            className="min-w-full  mx-auto px-4 z-20 mt-16 justify-self-center"
        >
            <Container className="max-w-11xl mx-auto ">
                <div className="pb-4 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4">
                        <a href="/">
                            <img src={logo} width={60} height={30} alt="logo" />
                        </a>
                        <p className="text-center">
                            Copyright © {year} BMD. All rights reserved.
                            Government of Gujarat | Digital Civil Registration
                            Services
                        </p>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default HomeFooter
