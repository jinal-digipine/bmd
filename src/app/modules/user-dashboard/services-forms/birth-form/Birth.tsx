import BirthForm from './components/BirthForm'

export const BirthBase = () => {
    return (
        <div className="flex justify-center">
            <BirthForm />
        </div>
    )
}

const Birth = () => {
    return <BirthBase />
}

export default Birth
