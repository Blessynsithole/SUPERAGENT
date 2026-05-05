import express from 'express'
import { authenticateToken } from './auth.js'

const router = express.Router()

// Mock AI responses (in production, integrate with actual AI service)
const aiResponses: Record<string, string> = {
  'slow internet': 'For slow internet issues: 1) Check signal strength, 2) Restart router, 3) Clear browser cache, 4) Run speed test, 5) Contact support if persists',
  'billing': 'For billing issues: 1) Verify account details, 2) Check payment history, 3) Review current plan, 4) Contact billing department',
  'router setup': 'Router setup guide: 1) Connect power, 2) Connect to modem, 3) Access admin panel at 192.168.1.1, 4) Configure WiFi settings, 5) Test connection',
  'connection drops': 'Connection drops troubleshooting: 1) Check cable connections, 2) Update router firmware, 3) Change WiFi channel, 4) Reset router, 5) Check for interference',
  'password reset': 'Password reset process: 1) Go to account settings, 2) Click "Forgot Password", 3) Check email for reset link, 4) Create new password, 5) Login with new credentials'
}

// Ask AI question
router.post('/ask', authenticateToken, (req, res) => {
  try {
    const { question } = req.body

    if (!question) {
      return res.status(400).json({ error: 'Question is required' })
    }

    // Simple keyword matching (in production, use actual AI/ML service)
    const lowerQuestion = question.toLowerCase()
    let response = 'I\'m sorry, I don\'t have specific guidance for that scenario. Please contact a supervisor for assistance.'

    for (const [keyword, answer] of Object.entries(aiResponses)) {
      if (lowerQuestion.includes(keyword)) {
        response = answer
        break
      }
    }

    res.json({
      answer: response,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    res.status(500).json({ error: 'AI service unavailable' })
  }
})

export { router as aiRoutes }