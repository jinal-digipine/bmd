import BirthForm from './components/BirthForm'

export const BirthBase = () => {
    return (
        <div className=" w-6xl  mt-12 px-2 justify-self-center">
            <BirthForm />
        </div>
    )
}

const Birth = () => {
    return <BirthBase />
}

export default Birth
