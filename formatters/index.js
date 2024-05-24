const {stylish} = require('./stylish')
const {plain} = require('./plain')

const format = (obj, style) => {
    switch(style){
        case 'stylish':
            return stylish(obj)
        case 'plain':
            return plain(obj)
        case 'json':
            return JSON.stringify(obj)
    }
}
module.exports = {format}