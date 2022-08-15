import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="page">
      <div className="main-area">
        <div className="banner title">Simple Hangman</div>
        <div className="button big-button" onClick={() => navigate('play')}>
          Play
        </div>
        <div className="button big-button" onClick={() => navigate('create')}>
          Create
        </div>
      </div>
    </div>
  );
};

export default HomePage;
