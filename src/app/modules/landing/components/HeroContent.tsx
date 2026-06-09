import { motion } from 'framer-motion'
import TextGenerateEffect from './TextGenerateEffect'
import dashImage from '../../../../assets/images/dashboard_image.png'

const HeroContent = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 flex min-h-screen flex-col items-center justify-between">
            <div className="flex flex-col min-h-screen pt-20 md:pt-40 relative overflow-hidden">
                <div>
                    <TextGenerateEffect
                        wordClassName="text-2xl md:text-4xl lg:text-8xl font-bold max-w-7xl mx-auto text-center mt-6 relative z-10"
                        words="Digital Civil Registration & Certificate Services"
                    />
                    <motion.p
                        initial={{ opacity: 0, translateY: 40 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 }}
                        className="text-center mt-6 text-base md:text-xl text-muted dark:text-muted-dark max-w-5xl mx-auto relative z-10 font-normal"
                    >
                        Transforming essential civil services through digital
                        governance. BMD enables citizens to easily apply for
                        Birth, Marriage, and Death certificates online, track
                        applications in real time, and access verified documents
                        securely—eliminating lengthy paperwork and unnecessary
                        visits to government offices.
                    </motion.p>
                </div>
                <div>
                    <img
                        className="mt-8"
                        src={dashImage}
                        alt="dashboard image"
                    />
                </div>
            </div>
        </div>
    )
}

export default HeroContent
