import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import RefreshIcon from '@mui/icons-material/Refresh';

export default function Fallback({
  title = 'Nothing to show',
  description = 'No data found or something went wrong.',
  icon,
  action,
  onRetry,
}: {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  onRetry?: () => void;
}) {
  const defaultIcon = <SentimentDissatisfiedIcon color="primary" sx={{ fontSize: 48 }} />;
  const defaultAction = onRetry ? (
    <button
      className="px-4 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow flex items-center gap-2"
      onClick={onRetry}
    >
      <RefreshIcon sx={{ fontSize: 20 }} /> Try Again
    </button>
  ) : null;
  return (
  <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" py={{ xs: 4, sm: 8 }} px={{ xs: 2, sm: 0 }}>
      <Box mb={2}>{icon ?? defaultIcon}</Box>
  <Typography variant="h6" color="text.secondary" fontWeight={600} mb={1} sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
        {title}
      </Typography>
  <Typography variant="body2" color="text.secondary" mb={3} sx={{ fontSize: { xs: '0.95rem', sm: '1rem' } }}>
        {description}
      </Typography>
      <Box>{action ?? defaultAction}</Box>
    </Box>
  );
}
