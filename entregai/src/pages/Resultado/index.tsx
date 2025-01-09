import './styles.css';
import logo from '../../assets/Logo1.png'
import { useNavigate } from 'react-router-dom';

const Resultado : React.FC = () => {

    const navigate = useNavigate();

    const handleNext = () => {
      navigate('/');
    };

    return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        margin: 10
      }}>
   
       
   <img src={logo} alt="Logo" width="200" height="200" />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <button type="submit" className="button" onClick={handleNext}>Voltar</button>

      </div>
    );
  };

  export default Resultado;