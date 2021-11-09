import { useState } from "react"
import { API } from 'aws-amplify'

const apiName = 'contacts'
const apiPath = '/contacts'

const WaitingListForm = () => {
    const [formState, updateFormState] = useState({isLoading: false, error: false, msg: ''})

    const [email, setEmail] = useState('')

    const submitForm = (evt) => {
        evt.preventDefault()

        updateFormState((state) => ({...state, isLoading: true}))

        // Submit to API
        API.post(apiName, apiPath, { body: { user_email: email, updated_timestamp: new Date().toISOString() } })
            .then(() => {
                updateFormState((state) => ({...state, isLoading: false, msg: 'Success'}))
            })
            .catch(err => {
                if (err) {
                    updateFormState((state) => ({...state, isLoading: false, error: err}))
                }
            })

    }

    if (formState.isLoading) {
        return (
            <div>Loading</div>
        )
    }

    return (
        <form onSubmit={submitForm}>
            <input type="email" name="email" value={email} onChange={(evt) => setEmail(evt.target.value)}/>
            <input type="submit" />
        </form>
    )

}

export default WaitingListForm
