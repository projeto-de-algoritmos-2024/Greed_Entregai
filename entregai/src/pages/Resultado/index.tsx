import React, { useEffect, useState } from 'react';
import './styles.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styled, { css, keyframes } from "styled-components";
import caminhao from '../../assets/Caminhao.png'



interface Delivery {
    startTime: string;
    endTime: string;
}

const moveToCenter = keyframes`
  from {
    transform: translateX(-50vw);
  }
  to {
    transform: translateX(0vw);
  }
`;

const AnimatedDiv = styled.div<{ isAnimating: boolean }>`
    display: flex;
    height: 100vh;
    width: 100vw;
    align-items: center;
    justify-content: center;
    ${({ isAnimating }) =>
        isAnimating &&
        css`
        animation: ${moveToCenter} 2s ease-in-out forwards;
    `}
`;

const Resultado: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { horarios } = location.state as { horarios: Delivery[] };
    const [isAnimating, setIsAnimating] = useState(true);
  
    useEffect(() => {
      if (isAnimating) {
        const timer = setTimeout(() => {
          setIsAnimating(false);
        }, 2000); // A duração da animação é 2s
        return () => clearTimeout(timer);
      }
    }, [isAnimating]);
  

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

    // Algoritmo de Interval Scheduling: Ordenar pelo horário de término e selecionar as não sobrepostas
    const sortedHorarios = [...horarios].sort((a, b) => {
        const aEnd = new Date(`1970-01-01T${a.endTime}:00`).getHours() * 60 + new Date(`1970-01-01T${a.endTime}:00`).getMinutes();
        const bEnd = new Date(`1970-01-01T${b.endTime}:00`).getHours() * 60 + new Date(`1970-01-01T${b.endTime}:00`).getMinutes();
        return aEnd - bEnd;
    });

    // Implementar o algoritmo de intervalo para descarte de entregas
    const selectedDeliveries: Delivery[] = [];
    const discardedDeliveries: Delivery[] = [];
    let lastEndTime = -Infinity; // Inicializar com um valor que nunca será válido

    sortedHorarios.forEach((delivery) => {
        const { startTime, endTime } = delivery;
        const startMinutes = new Date(`1970-01-01T${startTime}:00`).getHours() * 60 + new Date(`1970-01-01T${startTime}:00`).getMinutes();
        const endMinutes = new Date(`1970-01-01T${endTime}:00`).getHours() * 60 + new Date(`1970-01-01T${endTime}:00`).getMinutes();

        // Se a entrega não se sobrepõe com a anterior selecionada, adiciona à seleção
        if (startMinutes >= lastEndTime) {
            selectedDeliveries.push(delivery);
            lastEndTime = endMinutes; // Atualiza o tempo de término
        } else {
            discardedDeliveries.push(delivery); // Caso contrário, descarta
        }
    });

    const handleNext = () => {
        navigate('/');
    };

    return (
        <div className="container">
        {isAnimating ? ( 
            <div className='container'>
                <AnimatedDiv isAnimating={isAnimating} >
                    <img src={caminhao} alt="Caminhao" width="200" height="200" />
                </AnimatedDiv>
            </div>
        ):(
            <>
                <div className="graph">
                    {/* Linha do tempo */}
                    <div className="time-line">
                        {Array.from({ length: (latestTime - earliestTime) / 10 + 1 }).map((_, index) => {
                            const timeInMinutes = earliestTime + index * 10;
                            const hours = Math.floor(timeInMinutes / 60);
                            const minutes = timeInMinutes % 60;
                            return (
                                <div
                                    key={index}
                                    className="time-slot"
                                    style={{ width: `${slotWidth}%` }}
                                >
                                    {`${hours}:${minutes === 0 ? '00' : minutes}`}
                                </div>
                            );
                        })}
                    </div>

                    {/* Barras de entregas */}
                    <div className="delivery-bars">
                        {sortedHorarios.map((horario, index) => {
                            const { startMinutes, endMinutes } = getDeliveryPosition(horario.startTime, horario.endTime);
                            const isDiscarded = discardedDeliveries.some(
                                (discarded) => discarded.startTime === horario.startTime && discarded.endTime === horario.endTime
                            );

                            return (
                                <div
                                    key={index}
                                    className="delivery"
                                    style={{
                                        left: `${(startMinutes - earliestTime) / totalTimeSpan * 100}%`, // Posição horizontal
                                        width: `${(endMinutes - startMinutes) / totalTimeSpan * 100}%`, // Largura proporcional
                                        top: `${index * 50}px`, // Distância entre as entregas
                                        backgroundColor: isDiscarded ? 'red' : '#0C1F71', // Cor das entregas
                                        textDecoration: isDiscarded ? 'line-through' : 'none', 
                                    }}
                                >
                                    {`Entrega ${index + 1}`}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <br />
                <br />

                <h4 className='delivered'>Máximo de entregas possíveis: {sortedHorarios.filter((horario) =>  !discardedDeliveries.some(
                                (discarded) => discarded.startTime === horario.startTime && discarded.endTime === horario.endTime
                            )).length}</h4>
                <h4 className='discarded'>Entregas descartadas: {sortedHorarios.filter((horario) =>  discardedDeliveries.some(
                                (discarded) => discarded.startTime === horario.startTime && discarded.endTime === horario.endTime
                            )).length}</h4>
                <button type="submit" className="button2" onClick={handleNext}>Voltar</button>
            </>
        )}
        </div>
    );
};

export default Resultado;

