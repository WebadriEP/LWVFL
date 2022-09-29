
// components
import createAccountFields from '../components/createAccount/createAccountFields';
import '../components/createAccount/createAccount.css'

const createAccount = () => {
    return (
        <>
            <h1>Create Account</h1>
            <div className="list-container">
                <createAccountFields />
            </div>
        </>
    );
}

export default createAccount;