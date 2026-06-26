import DeathForm from './components/DeathForm'

export const DeathBase = () => {
    return (
        <div className="flex justify-center">
            <DeathForm />
        </div>
    )
}

const Death = () => {
    return <DeathBase />
}
export default Death
