import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from 'routes';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <BrowserRouter >
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;