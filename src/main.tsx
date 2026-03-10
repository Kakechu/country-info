import { createRoot } from 'react-dom/client'
import { Container, ThemeProvider, CssBaseline } from '@mui/material'
import App from './App'
import { theme } from './theme'

const container = document.getElementById('root')

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
