import styled from 'styled-components';
export default function ErrorMessage({ message }) {
  return <StyledAside>{message}</StyledAside>;
}

const StyledAside = styled.aside({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  padding: '1.5rem',
  fontSize: '22px',
  color: '000',
  backgroundColor: '#fff',
});
