const actions = []
const UserAction = require('../models/UserAction')

exports.post = async ({body:{type}}, reply) => {
    try {
        const userAction = new UserAction(type)
        actions.push(userAction)
        console.log(actions)
        return { status: 'ok' }
    } catch (err) {
        throw new Error(err)
    }
}