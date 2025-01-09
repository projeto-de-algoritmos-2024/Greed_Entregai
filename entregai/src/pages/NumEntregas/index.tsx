import './styles.css';
import logo from '../../assets/Logo1.png'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const NumEntregas: React.FC = () => {
    const [numEntregas, setNumEntregas] = useState<number | ''>('');
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setNumEntregas(value ? Number.parseInt(value, 10) : '');
    };

    const handleNext = () => {
      if(numEntregas && numEntregas > 0){
        navigate('/horarios', {state: {numEntregas} });
      }
      else {
        alert('Por favor, insira um número válido de entregas');
      }
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
        <input
              type="number"
              value={numEntregas}
              onChange={handleChange}
              className="text-box" 
              placeholder="Insira o número de entregas" />
        <br />
        <button type="submit" className="button" onClick={handleNext}>Próximo</button>
      </div>
    );
  };

export default NumEntregas;