const fs = require("fs")
const UserAction = require('../models/UserAction')
const actions = []
const fileName = "./analytics-behavior.test.json"

exports.post = async ({body}, reply) => {
    try {
        if(!fs.existsSync(fileName)) {
            fs.writeFileSync(fileName, JSON.stringify([]))
        }
        const actionList = body.actionList || []
        const dataActions = JSON.parse(fs.readFileSync(fileName))
        actionList.forEach(({type, timestamp})=>{
            const userAction = new UserAction(type, timestamp)
            actions.push(userAction)
            dataActions.push(userAction)
            fs.writeFileSync(fileName, JSON.stringify(dataActions))
        })
        console.log(actions)
        return { status: 'ok' }
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
}