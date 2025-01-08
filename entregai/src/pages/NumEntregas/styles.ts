import styled from "styled-components";

export const TextBox = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 15px 15px;
  font-size: 16px;
  font-weight: normal;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007BFF; /* Cor de destaque */
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }

  &::placeholder {
    color: #aaa; /* Cor do placeholder */
  }

  &:disabled {
    background-color: #f5f5f5;
    color: #999;
    cursor: not-allowed;
  }
`;

export const Button = styled.button`
  background-color: #0C1F71;
  color: #fff; /* Cor do texto */
  padding: 15px 15px;
  font-size: 16px;
  font-weight: 550;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  display: inline-block;

  &:hover {
    background-color: #0056b3; 
  }

  &:active {
    transform: scale(0.98); 
  }

  &:disabled {
    background-color: #d6d6d6;
    color: #888;
    cursor: not-allowed;
  }
`;


 