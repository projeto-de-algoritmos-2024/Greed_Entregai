import './styles.css';
import logo from '../../assets/Logo1.png';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Horarios: React.FC = () => {
    const location = useLocation();
    const { numEntregas } = location.state as { numEntregas: number };

    const navigate = useNavigate();

    const handleNext = () => {
        navigate('/resultado'); // Corrected navigation path
    };

    return (
        <div className="container">
            <div className="logo-section" style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '40vh',
                            marginTop: '20px',
                        }}>
                            <img src={logo} alt="Logo" width="200" height="200" />
                        </div>

            <div className="time-form">
                <h1 className="subtitle">Insira os horários de início e fim</h1>
                {Array.from({ length: numEntregas }).map((_, index) => (
                    <div key={index} className="time-row">
                        <input
                            type="time"
                            name={`startTime-${index}`}
                            className="time-input"
                            placeholder={`Início ${index + 1}`}
                        />
                        <input
                            type="time"
                            name={`endTime-${index}`}
                            className="time-input"
                            placeholder={`Fim ${index + 1}`}
                        />
                    </div>
                ))}
                
              </div>

            
        </div>
    );
};

export default Horarios;
