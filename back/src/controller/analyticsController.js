const actions = []
const UserAction = require('../models/UserAction')

exports.post = async ({body}, reply) => {
    try {
        const actionList = body.actionList || []
        actionList.forEach(({type, timestamp})=>{
            const userAction = new UserAction(type, timestamp)
            actions.push(userAction)
        })
        console.log(actions)
        return { status: 'ok' }
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
}