import request from 'supertest'
import express from 'express'
import { authRoutes } from '../routes/auth.js'

const app = express()
app.use(express.json())
app.use('/api/auth', authRoutes)

describe('Auth Routes', () => {
  test('POST /api/auth/login - successful login', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'agent@liquidhome.co.zw',
        password: 'password'
      })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('user')
    expect(response.body).toHaveProperty('token')
    expect(response.body.user.email).toBe('agent@liquidhome.co.zw')
  })

  test('POST /api/auth/login - invalid credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'invalid@email.com',
        password: 'wrongpassword'
      })

    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty('error')
  })

  test('GET /api/health - health check', async () => {
    const response = await request(app)
      .get('/api/health')

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('status', 'OK')
  })
})