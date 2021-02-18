import MainHeader from "./component/mainHeader/mainHeader";
import MainFooter from "./component/mainFooter";
import Chat from "./containers/chat";

import styles from './styles.module.scss';

function App() {
    const apiUrl = 'https://edikdolynskyi.github.io/react_sources/messages.json';
    const user = {
        userId: Date.now().toString(),
        avatar: 'https://styles.redditmedia.com/t5_rg2br/styles/profileIcon_snooead9969d-77dc-43a2-9ec4-56f6bfe040e6-headshot.png?width=256&height=256&crop=256:256,smart&s=1ee5302ed85fee1c1df54504eb3b8174460b38f7',
        user: 'TestUser'
    }
  return (
    <div className={styles.app}>
        <MainHeader/>
        <Chat
            userInfo={user}
            apiAddres={apiUrl}
        />
        <MainFooter/>
    </div>
  );
}

export default App;
