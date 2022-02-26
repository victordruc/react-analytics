const fastify = require('fastify')({ logger: true })
const UserAction = require('./src/models/UserAction')

let actions = null

fastify.register(require('fastify-cors'), { 
    origin: '*',
    methods: ['POST']
  })

fastify.post('/api/analytics', async ({body:{type}}, reply) => {
    const userAction = new UserAction(type)
    actions.push(userAction)
    console.log(actions)
  return { status: 'ok' }
})

const start = async () => {
  try {
    await fastify.listen(4000)
    actions = []
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()

module.exports = actions