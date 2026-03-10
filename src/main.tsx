import { createRoot } from 'react-dom/client'
import { createTheme, Container, ThemeProvider, CssBaseline } from '@mui/material'
import App from './App'

const container = document.getElementById('root')

const theme = createTheme()

if (!container) {
	throw new Error('Root container missing in index.html')
}



createRoot(container).render(
	<ThemeProvider theme={theme}>
		<CssBaseline />
		<Container maxWidth="md">
			<App />
		</Container>
	</ThemeProvider>
)
