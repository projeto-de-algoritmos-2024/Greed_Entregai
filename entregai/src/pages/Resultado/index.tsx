import React from 'react';
import './styles.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/Logo1.png';

const Resultado: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { numEntregas, horarios } = location.state as { numEntregas: number, horarios: { startTime: string, endTime: string }[] };

    // Função para calcular a posição e a largura da entrega no gráfico
    const getDeliveryPosition = (startTime: string, endTime: string) => {
        const start = new Date(`1970-01-01T${startTime}:00`);
        const end = new Date(`1970-01-01T${endTime}:00`);
        const startMinutes = start.getHours() * 60 + start.getMinutes();
        const endMinutes = end.getHours() * 60 + end.getMinutes();
        return { startMinutes, endMinutes };
    };

    // Função para calcular os horários mais extremos
    const getEarliestAndLatestTimes = () => {
        let earliestTime = Infinity;
        let latestTime = -Infinity;

        horarios.forEach(({ startTime, endTime }) => {
            const start = new Date(`1970-01-01T${startTime}:00`);
            const end = new Date(`1970-01-01T${endTime}:00`);

            const startMinutes = start.getHours() * 60 + start.getMinutes();
            const endMinutes = end.getHours() * 60 + end.getMinutes();

            if (startMinutes < earliestTime) earliestTime = startMinutes;
            if (endMinutes > latestTime) latestTime = endMinutes;
        });

        return { earliestTime, latestTime };
    };

    const { earliestTime, latestTime } = getEarliestAndLatestTimes();

    // Calcular a largura dos slots
    const totalTimeSpan = latestTime - earliestTime; // Em minutos
    const slotWidth = (100 / (totalTimeSpan / 30)); // A largura de cada slot (em %)

    const handleNext = () => {
      navigate('/');
  };

    return (
        <div className="container">
            <div className="graph">
                {/* Linha do tempo */}
                <div className="time-line">
                    {Array.from({ length: (latestTime - earliestTime) / 30 + 1 }).map((_, index) => {
                        const timeInMinutes = earliestTime + index * 30;
                        const hours = Math.floor(timeInMinutes / 60);
                        const minutes = timeInMinutes % 60;
                        return (
                            <div
                                key={index}
                                className="time-slot"
                                style={{ width: `${slotWidth}%` }}
                            >
                                {`${hours}:${minutes === 0 ? '00' : '30'}`}
                            </div>
                        );
                    })}
                </div>

                {/* Barras de entregas */}
                <div className="delivery-bars">
                    {horarios.map((horario, index) => {
                        const { startMinutes, endMinutes } = getDeliveryPosition(horario.startTime, horario.endTime);
                        return (
                            <div
                                key={index}
                                className="delivery"
                                style={{
                                    left: `${(startMinutes - earliestTime) / totalTimeSpan * 100}%`, // Posição horizontal
                                    width: `${(endMinutes - startMinutes) / totalTimeSpan * 100}%`, // Largura proporcional
                                    top: `${index * 40}px`, // Distância entre as entregas
                                }}
                            >
                                Entrega {index + 1}
                            </div>
                        );
                    })}
                </div>
            </div>
            <br></br>
            <br></br>
            <button type="submit" className="button" onClick={handleNext} >Voltar</button>
        </div>
    );
};

export default Resultado;