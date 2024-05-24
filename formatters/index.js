const {stylish} = require('./stylish')
const {plain} = require('./plain')

const format = (obj, style) => {
    switch(style){
        case 'stylish':
            return stylish(obj)
        case 'plain':
            return plain(obj)
    }
}
module.exports = {format}