# Admin Panel Setup Guide

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables (optional):
   - Create a `.env` file in the project root
   - Add: `ADMIN_PASSWORD=your_secure_password`
   - Or add: `ADMIN_PASSWORD_HASH=your_bcrypt_hash` (more secure)

3. Start the server:
```bash
npm start
```

The server will run on port 3001 (or the PORT environment variable).

## Default Login

- **URL**: `http://localhost:3001/admin`
- **Default Password**: `admin`

**⚠️ IMPORTANT**: Change the default password in production by setting `ADMIN_PASSWORD` in your `.env` file!

## Features

### Analytics Tracking
- **Visitor Count**: Tracks unique visitors and total visits
- **Session Duration**: Average time spent on site
- **Game Plays**: Tracks games played for 1+ minutes
- **Active Sessions**: Real-time count of active users (last 5 minutes)

### Time-based Statistics
View statistics for:
- 1 Hour
- 12 Hours
- Day
- 3 Days
- Week
- 2 Weeks
- Month
- 6 Months
- Year
- Total (since website started)

### Top Games
Shows the top 10 most played games with play counts.

### Charts
Interactive charts showing visitor trends over time.

## Security

- Passwords are hashed using bcrypt (salt rounds: 10)
- Session-based authentication
- Password hash stored in environment variable (not in code)
- SQL injection prevention (parameterized queries)

## Database

The analytics data is stored in `analytics.db` (SQLite database). This file is automatically created on first run.

**Note**: The database file is excluded from git (see `.gitignore`).

## Game Play Tracking

Games are only counted as "played" if:
- User clicks on a game
- User plays for at least 1 minute
- System tracks time spent away from main page

## API Endpoints

- `POST /api/visit` - Track page visits
- `POST /api/game-play` - Track game plays
- `POST /api/session` - Update session data
- `GET /api/stats/:timeframe` - Get statistics
- `GET /api/top-games` - Get top games
- `GET /api/chart/:timeframe` - Get chart data
- `GET /api/active-sessions` - Get active sessions
- `POST /api/admin/login` - Admin login
- `GET /api/admin/verify` - Verify admin session
- `POST /api/admin/logout` - Admin logout

## Production Deployment

For production (e.g., Render, Heroku):

1. Set `ADMIN_PASSWORD` or `ADMIN_PASSWORD_HASH` in your environment variables
2. Set `PORT` environment variable (most platforms do this automatically)
3. The database file (`analytics.db`) will persist on the server

## Troubleshooting

- **Can't login**: Check that the server is running and verify the password
- **No data showing**: Make sure visitors have accessed the main site (analytics only tracks when users visit)
- **Database errors**: Ensure the `analytics.db` file has write permissions

