import MarriageForm from './components/MarriageForm'

export const MarriageBase = () => {
    return (
        <div className=" w-6xl  mt-12 px-2 justify-self-center">
            <MarriageForm />
        </div>
    )
}

const Marriage = () => {
    return <MarriageBase />
}

export default Marriage
