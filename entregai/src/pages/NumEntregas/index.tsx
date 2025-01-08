import { Button, TextBox } from './styles';


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
        <h1>ENTREGAÍ</h1>
        <h3>Seu tempo, nossa prioridade</h3>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <TextBox placeholder="Insira o número de entregas" />
        <br></br>
        <br></br>
        <Button>Próximo</Button>
    </div>
    );
  };

export default NumEntregas