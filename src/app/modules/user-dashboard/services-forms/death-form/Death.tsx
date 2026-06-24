import DeathForm from './components/DeathForm'

export const DeathBase = () => {
    return (
        <div className=" w-6xl  mt-12 px-2 justify-self-center">
            <DeathForm />
        </div>
    )
}

const Death = () => {
    return <DeathBase />
}
export default Death
