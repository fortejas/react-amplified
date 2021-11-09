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
            <h2>Are you interested in trying it out?</h2>
            <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={(evt) => setEmail(evt.target.value)}
            />
            <input type="submit" value="Sign me up!!"/>

            <br/>
            { (formState.msg !== '') ? formState.msg : '' }
            { (formState.error !== '') ? formState.error : '' }
        </form>
    )

}

export default WaitingListForm
