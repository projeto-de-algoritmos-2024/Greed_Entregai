import './styles.css';
import logo from '../../assets/Logo1.png'

const NumEntregas: React.FC = () => {
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
        <input className="text-box" placeholder="Insira o número de entregas" />
        <br />
        <button className="button">Próximo</button>
      </div>
    );
  };

export default NumEntregas