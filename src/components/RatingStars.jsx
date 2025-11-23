import { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

function RatingStars() {
  const [rating, setRating] = useState(0);

  const handleClick = (value) => {
    setRating(value);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <IconButton
          key={star}
          onClick={() => handleClick(star)}
          sx={{
            padding: 0.5,
            color: star <= rating ? '#9c27b0' : 'rgba(255, 255, 255, 0.7)',
            '&:hover': {
              color: '#9c27b0',
            },
          }}
        >
          {star <= rating ? (
            <StarIcon sx={{ fontSize: '1.2rem' }} />
          ) : (
            <StarBorderIcon sx={{ fontSize: '1.2rem' }} />
          )}
        </IconButton>
      ))}
    </Box>
  );
}

export default RatingStars;

