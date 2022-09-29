
// components
import CreateAccountFields from '../components/createAccount/createAccountFields';
import '../components/createAccount/createAccount.css'


const CreateAccount = () => {
    return (
        <>
            <h1>Create Account</h1>
            <div className="list-container">
            <CreateAccountFields />
            </div>
        </>
    );
}

export default CreateAccount;