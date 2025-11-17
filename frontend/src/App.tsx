import AppRouter from '@routers/AppRouter';
import ToastProvider from '@shared/contexts/ToastProvider';
import { ThemeProvider } from './shared/contexts/ThemeContext';

function App() {
    return (
        <>
            <ThemeProvider>
                <AppRouter />
                <ToastProvider />
            </ThemeProvider>
        </>
    );
}

export default App;
