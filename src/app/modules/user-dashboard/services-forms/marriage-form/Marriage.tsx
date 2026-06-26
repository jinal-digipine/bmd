import MarriageForm from './components/MarriageForm'

export const MarriageBase = () => {
    return (
        <div className="flex justify-center">
            <MarriageForm />
        </div>
    )
}

const Marriage = () => {
    return <MarriageBase />
}

export default Marriage
