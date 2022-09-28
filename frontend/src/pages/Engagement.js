
// components
import EngagementList from '../components/engagement/EngagementList';
import '../components/engagement/engagementStyles.css'

const Engagement = () => {
    return (
        <>
            <h1>Engagement List</h1>
            <div className="list-container">
                <EngagementList />
            </div>
        </>
    );
}

export default Engagement;