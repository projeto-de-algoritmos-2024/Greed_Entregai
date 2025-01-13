import './styles.css';
import logo from '../../assets/Logo1.png';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Horarios: React.FC = () => {
    const location = useLocation();
    const { numEntregas } = location.state as { numEntregas: number };

    const navigate = useNavigate();

    const handleNext = () => {
        // Coleta os valores dos inputs de hora
        const startTimes = Array.from({ length: numEntregas }).map((_, index) =>
            (document.querySelector(`input[name="startTime-${index}"]`) as HTMLInputElement).value
        );
        const endTimes = Array.from({ length: numEntregas }).map((_, index) =>
            (document.querySelector(`input[name="endTime-${index}"]`) as HTMLInputElement).value
        );

        // Verifica se todos os campos de horário estão preenchidos
        const allFieldsFilled = startTimes.every(time => time !== "") && endTimes.every(time => time !== "");

        if (!allFieldsFilled) {
            alert('Por favor, preencha todos os horários.');
            return;
        }

        // Verifica se os horários de início são antes dos horários de fim
        const invalidTimes = startTimes.some((startTime, index) => {
            return new Date(`1970-01-01T${startTime}:00`) >= new Date(`1970-01-01T${endTimes[index]}:00`);
        });

        if (invalidTimes) {
            alert('O horário de início deve ser antes do horário de término em todas as entregas.');
            return;
        }

        // Cria o array de horarios para enviar para a página de resultados
        const horarios = startTimes.map((startTime, index) => ({
            startTime,
            endTime: endTimes[index],
        }));

        // Passa os dados para a página de resultados
        navigate('/resultado', { state: { numEntregas, horarios } });
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

              <br />
              <button type="submit" className="button" onClick={handleNext}>Criar cronograma</button>
            
        </div>
    );
};

export default Horarios;
